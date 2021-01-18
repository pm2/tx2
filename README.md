
## tx2

Report Events, Metrics, Issues, Actions to PM2 and PM2.io.

```javascript
const tx2 = require('tx2')

// Event
tx2.event('eat', { food: 'poke' })

// Metric
tx2.metric({
  name: 'calories',
  val: () => {
    return 20
  }
})

tx2.metric('burnt calories', () => {
  return 30
})

let exC = tx2.metric('excess calories')
exC.set(40)

// return true
tx2.metricExists('burnt calories')

// Issue
tx2.issue(new Error('overweight')
tx2.issue('overweight')

// Action
tx2.action('lift weights', (cb) => {
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
