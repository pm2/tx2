
var Counter   = require('./utils/probes/Counter.js')
var Histogram = require('./utils/probes/Histogram.js')
var Meter     = require('./utils/probes/Meter.js')

function getValue(value) {
  if (typeof(value) == 'function')
    return value()
  return value
}

const DEFAULT_AGGREGATION = 'avg'
const AVAILABLE_AGG_TYPES = ['avg', 'min', 'max', 'sum', 'none']
const AVAILABLE_MEASUREMENTS = ['min', 'max','sum','count','variance','mean','stddev','median','p75','p95','p99','p999']

module.exports = {
  _metrics: {},
  prepareData: function() {
    var cooked_data = {}

    Object.keys(this._metrics).forEach((probe_name) => {

      if (typeof(this._metrics[probe_name].value) == 'undefined')
        return false

      cooked_data[probe_name] = {
        value: getValue(this._metrics[probe_name].value)
      }

      if (this._metrics[probe_name].unit)
        cooked_data[probe_name].unit = this._metrics[probe_name].unit

      /**
       * Attach aggregation mode
       */
      if (this._metrics[probe_name].agg_type &&
          this._metrics[probe_name].agg_type != 'none')
        cooked_data[probe_name].agg_type = this._metrics[probe_name].agg_type

      if (this._metrics[probe_name].unit)
        cooked_data[probe_name].unit = this._metrics[probe_name].unit
    })
    return cooked_data
  },

  /**
   * This reflect data to keymetrics
   * pmx.transpose('prop name', fn)
   *
   * or
   *
   * pmx.transpose({
   *   name : 'variable name',
   *   data : function() { return value }
   * })
   */
  transpose : function(variable_name, reporter) {
    if (typeof variable_name === 'object') {
      reporter = variable_name.data
      variable_name = variable_name.name
    }

    if (typeof reporter !== 'function') {
      return console.error('[PMX] reporter is not a function')
    }

    this._metrics[variable_name] = {
      value: reporter
    }
  },
  metricExists: function(metric_name) {
    return !!this._metrics[metric_name]
  },
  metric : function(opts, val) {
    let name, value, unit

    if (typeof(opts) == 'string') {
      name = opts
      value = val
    }
    else if (typeof(opts) === 'object') {
      name = opts.name
      value = opts.val || opts.value
      unit = opts.unit || null
    }

    if (!name)
      return console.error('[PX2][Metric] Name not defined')

    this._metrics[name] = {
      value: value,
      unit: unit
    }

    return {
      val : () => {
        var value = this._metrics[name].value

        if (typeof(value) == 'function')
          value = value()

        return value
      },
      set : (dt) => {
        this._metrics[name].value = dt
      }
    }
  },
  histogram : function(opts) {
    if (!opts.name)
      return console.error('[Metric][Histogram] Name not defined')

    opts.measurement = opts.measurement || 'mean'
    opts.unit = opts.unit || ''

    if (AVAILABLE_MEASUREMENTS.indexOf(opts.measurement) == -1)
      return console.error('[Metric][Histogram] Measure type %s does not exists', opts.measurement)

    var histogram = new Histogram(opts)

    this._metrics[opts.name] = {
      value: () => {

        if (opts.val || opts.value) {
          var value = opts.val || opts.value
          if (typeof(value) == 'function')
            value = value()
          histogram.update(value)
        }

        return (Math.round(histogram.val() * 100) / 100)
      },
      unit : opts.unit
    }

    return histogram
  },
  meter : function(opts) {
    if (!opts.name)
      return console.error('[Metric][Meter] Name not defined')

    opts.unit = opts.unit || ''

    var meter = new Meter(opts)

    this._metrics[opts.name] = {
      value: function() {
        return meter.val() + '' + opts.unit
      },
      unit : opts.unit
    }

    return meter
  },
  counter : function(opts) {
    if (!opts.name)
      return console.error('[Metric][Counter] Name not defined')

    var counter = new Counter()

    this._metrics[opts.name] = {
      value: function() { return counter.val() },
      agg_type: opts.agg_type || DEFAULT_AGGREGATION,
      unit : opts.unit
    }

    return counter
  }
}
