
## RX2

Report Events, Metrics, Issues, Actions to PM2 and PM2.io.

```javascript
const rx2 = require('rx2')

// Event
rx2.event('eat', { food: 'poke' })

// Metric
rx2.metric({
  name: 'calories',
  val: () => {
    return 20
  }
})

rx2.metric('burnt calories', () => {
  return 30
})

let exC = rx2.metric('excess calories')
exC.set(40)

// return true
rx2.metricExists('burnt calories')

// Issue
rx2.issue(new Error('overweight')
rx2.issue('overweight')

// Action
rx2.action('lift weights', (cb) => {
  cb({ success: true })
})
```

```bash
$ pm2 start app.js
# Inspect primitive reported
$ pm2 show app
```

## License

MIT
