
const px2 = require('..')
const should = require('should')

describe('Event', function() {
  it('should emit an event without data', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('human:event')
      done()
    })

    px2.event('something special')
  })

  it('should emit an event with data', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('human:event')
      should(dt.data.yes).eql(true)
      done()
    })

    px2.event('something special', { yes : true })
  })

})
