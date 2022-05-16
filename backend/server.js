const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

/* Middleware for express */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("combined"));

/* Routes */
app.use("/api/auth", require("./routes/authenticationRoutes"));
app.use("/api/", require("./routes/dataRoutes"));

/* Serve static files */
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

/* MongoDB connection */
const db = require("./models");
db.mongoose.connect(process.env.MONGO_URL).catch(error => {
    console.log(`Cannot connect to the database ${process.env.MONGO_URL} `, error);
    process.exit();
});
console.log(`Connected to the database ${process.env.MONGO_URL}`);
db.mongoose.connection.on('error', error => {
    console.log(`Database error from ${process.env.MONGO_URL} `, error);
});

/* App connection */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})