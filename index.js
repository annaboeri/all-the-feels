const
    dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    httpClient = axios.create(),
    PORT = 3000

const apiKey = process.env.API_KEY

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))


app.get('/', (res, req) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/feels/:feel', (req, res) => {
    const apiUrl = `http://strainapi.evanbusse.com/${apiKey}/strains/search/effect/${req.params.feel}`
    const options = { method: 'get', url: apiUrl }
    httpClient(options).then((apiResponse) => {
        console.log(apiResponse.data)
        res.json(apiResponse.data)
    })
})

app.listen(PORT, (err) => {
    console.log(err || `server running on port ${PORT}`)
})