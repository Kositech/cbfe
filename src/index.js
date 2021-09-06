const express = require('express')
var path = require('path')
const app = express()

// app.get()
const startServer = () => {

    app.use(express.static(path.join(__dirname, '../src/public')));
    app.use(express.static(path.join(__dirname, '../src/public/client')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/public/client/index.html'));
    });

    const port = process.env.PORT || 3000
    app.listen({ port: port }, () => {
        console.log('The server is up on http://0.0.0.0:' + port)
    })
}

startServer()