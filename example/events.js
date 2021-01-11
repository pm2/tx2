
const px2 = require('..')

console.log(px2)

px2.emit('test', { data: 'yes' })

// Metrics variants
px2.metric({
  name: 'test',
  val: () => {
    return 20
  }
})

px2.metric('test2', () => {
  return 30
})

let m = px2.metric('test3', 0)

m.set(45)

// Histogram

let n = px2.histogram({
  name: 'histo1',
  val: () => {
    return Math.random()
  }
})

// OR
n.update(Math.random() * 1000)

px2.action('toto', (cb) => {
  return cb({yessai:true})
})


setInterval(() => {} , 1000)
