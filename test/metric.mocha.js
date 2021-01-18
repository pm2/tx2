
const px2 = require('..')
const should = require('should')

describe('Metric', function() {
  this.timeout(4000)

  it('should register a metric', () => {
    px2.metric({
      name: 'test',
      val: () => {
        return 20
      }
    })
  })

  it('should metric exists', () => {
    should(px2.metricExists('test')).eql(true)
  })

  it('should unknown metric not exists', () => {
    should(px2.metricExists('unknowsss')).eql(false)
  })

  it('should have metric present', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('axm:monitor')
      should(dt.data.test.value).eql(20)
      done()
    })
  })

  it('should register metric v2', () => {
    px2.metric('test2', () => {
      return 30
    })
  })

  it('should have metric present', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('axm:monitor')
      should(dt.data.test2.value).eql(30)
      done()
    })
  })

  it('should register metric v3', () => {
    let m = px2.metric('test3', 0)
    m.set(45)
  })

  it('should have metric present', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('axm:monitor')
      should(dt.data.test3.value).eql(45)
      done()
    })
  })

})
