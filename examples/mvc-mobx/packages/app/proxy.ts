import express from 'express'
import path from 'path'

const app: express.Application = express()

// app.get('*', function (req, res) {
//     res.send('Hello World!')
// })

// console.log()
app.use('/modules/main/bundle.js', express.static(require.resolve('@enterprise-ui/mvc-mobx-main')))


app.listen(5000, function () {
    console.log('server proxy is listening on port 5000!')
})