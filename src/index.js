
const Events = require('./events.js')
const Actions = require('./actions.js')
const Metrics = require('./metrics.js')
const Issues = require('./issues.js')

const EventEmitter = require('events')

const stringify = require('json-stringify-safe')

class PX2 extends EventEmitter {
  constructor() {
    super()

    Object.assign(this, Events)
    Object.assign(this, Actions)
    Object.assign(this, Metrics)
    Object.assign(this, Issues)

    var p_interval = setInterval(() => {
      this.send({
        type : 'axm:monitor',
        data : Metrics.prepareData()
      })
    }, 990)

    p_interval.unref()
  }

  send(args) {
    this.emit('data', args)
    if (!process.send) {
      var output = args.data
      delete output.__name
      return false
    }

    try {
      process.send(JSON.parse(stringify(args)))
    } catch(e) {
      console.error('Process disconnected from parent !')
      console.error(e.stack || e)
      process.exit(1)
    }
  }
}



module.exports = PX2
