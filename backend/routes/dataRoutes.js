var express = require('express');
var router = express.Router();
const auth = require("../middleware/authMiddleware.js");
const axios = require("axios");

//https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
router.get("/data", auth.permit('user', 'admin'), async (req, res) => {
    await axios.get('https://api.pro.coinbase.com/products/BTC-USD/candles?granularity=86400&start=2021-01-09T12:00:00')
        .then(function(response) {
            res.send(response.data.map(
                ([timestamp, price_low, price_high, price_open, price_close]) =>
                    ({ timestamp: new Date(timestamp * 1000).toLocaleDateString(), price: (price_low + price_high) / 2 })
                )
            );
        })
        .catch(e => {
            res.send(e);
        });
});


module.exports = router;
