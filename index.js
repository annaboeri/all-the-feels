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
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/feels/:feel', (req, res) => {
    const apiUrl = `http://strainapi.evanbusse.com/${apiKey}/strains/search/effect/${req.params.feel}`
    const options = { method: 'get', url: apiUrl }
    httpClient(options).then((apiResponse) => {
        res.json(apiResponse.data)
    })
})

app.get('/details/:feel', (req, res) => {
    const descUrl = `http://strainapi.evanbusse.com/${apiKey}/strains/search/name/${req.params.feel}`
    const descOptions = { method: 'get', url: descUrl }
    httpClient(descOptions).then((apiResponse) => {
        res.json(apiResponse.data[0].desc)
    })
    // const flavorsUrl = `http://strainapi.evanbusse.com/${apiKey}/strains/data/flavors/3`
    // const flavorsOptions = { method: 'get', url: flavorsUrl }
    // httpClient(flavorsOptions).then((apiResponse) => {
    //     console.log(apiResponse.data)
    // })
})


app.listen(PORT, (err) => {
    console.log(err || `server running on port ${PORT}`)
})