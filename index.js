const keys = require('./config/keys')
const app = require('./app')
const port = process.env.PORT || keys.APP_Port

app.listen(port, () => console.log(`Server has been started on port ${port}`))