
## IX2

Report Events, Metrics, IssuesActions, Events to PM2 and PM2.io.

```javascript
const ix2 = require('ix2')

// Event
ix2.event('eat', { food: 'poke' })

// Metric
px2.metric({
  name: 'calories',
  val: () => {
    return 20
  }
})

px2.metric('burnt calories', () => {
  return 30
})

let exC = px2.metric('excess calories')
exC.set(40)

// Issue
ix2.issue(new Error('overweight')
ix2.issue('overweight')

// Action
ix2.action('lift weights', (cb) => {
  cb({ success: true })
})
```

## License

MIT
