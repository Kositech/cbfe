const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var authRouter = require('./routers/auth');
var middleware = require.main.require('./middleware/middleware.js')
const app = express()

// app.get()
const startServer = () => {
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, '../src/public')));

    // Check path '/'
    app.get('/', middleware.verify, (req, res) => {
        res.sendFile(path.join(__dirname, '../src/public/client/index.html'));
    });

    app.use(express.static(path.join(__dirname, '../src/public/client')));
    app.use(express.static(path.join(__dirname, '../src/public/VWT')));

    app.use('/auth', authRouter);

    // app.get('/VWT/*', middleware.verify, (req, res) => {
    //     res.sendFile(path.join(__dirname, `../src/public${decodeURIComponent(req.path)}`));
    // })

    app.get('*', middleware.verify, (req, res) => {
        res.sendFile(path.join(__dirname, '../src/public/client/index.html'));
    });

    const port = process.env.PORT || 3000
    app.listen({ port: port }, () => {
        console.log('The server is up on http://0.0.0.0:' + port)
    })
}

startServer()