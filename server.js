const express = require('express')
const next = require('next')
const { router } = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = express()
const handle = router.getRequestHandler(app)

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(3000)
})
