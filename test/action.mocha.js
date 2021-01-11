
const px2 = require('..')
const should = require('should')

describe('Action', function() {
  it('should notify about new action', (done) => {
    px2.once('data', (dt) => {
      should(dt.type).eql('axm:action')
      should(dt.data.action_name).eql('something special')
      done()
    })

    px2.action('something special', (cb) => {
      cb({sucess:true})
    })
  })

})
