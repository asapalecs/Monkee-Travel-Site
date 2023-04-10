const morgan = require('morgan');
const fs =  require('fs');

switch (app.get('env')){
    case 'development': app.use(morgan('dev'))
    break
    case 'production': 
        const stream = fs.createWrite(__dirname + '/access_log', {flags: 'a'})
    app.use(morgan('combined', {stream}))
    break
}