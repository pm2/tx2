
const px2 = require('..')
const should = require('should')

describe('Issue', function() {
  it('should trigger an issue', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('process:exception')
      should(dt.stack).not.eql(null)
      done()
    })

    px2.issue(new Error('shit happens'))
  })

  it('should trigger an issue v2', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('process:exception')
      should(dt.stack).not.eql(null)
      done()
    })

    px2.issue('shit happens')
  })
})
