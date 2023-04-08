const requiresWaiver = require('./lib/tourRequiresWaiver')

// middleware to check cart
app.use(requiresWaiver)