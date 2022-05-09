const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3001;

//https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
app.get('/api/', async (req, res) => {
    await axios.get('https://api.pro.coinbase.com/products/BTC-USD/candles?granularity=86400&start=2021-01-09T12:00:00')
        .then(function(response) {
            //console.log(response.data);
            res.send(response.data.map(
                ([timestamp, price_low, price_high, price_open, price_close]) =>
                    ({ timestamp: new Date(timestamp * 1000).toLocaleDateString(), price: (price_low + price_high) / 2 })
                )
            );
        })
        .catch(e => {
            res.send(e);
        });
})

const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})