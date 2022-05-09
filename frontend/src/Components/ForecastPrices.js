import React from 'react';
import * as brain from "brain.js";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Button} from "@mui/material";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function normalize(min, max) {
    var delta = max - min;
    return function (val) {
        return (val - min) / delta;
    };
}

function denormalize(min, max) {
    var delta = max - min;
    return function (val) {
        return val * delta + min;
    };
}
//[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(normalize(5, 15))
//[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(normalize(5, 15)).map(denormalize(5, 15))

const ForecastPrices = ({data}) => {

    const [forecast, setForecast] = React.useState([]);
    const myRef = React.useRef(null);


    const [showChart, setShowChart] = React.useState(false);

    const predict = async () => {
        if (data.length === 0) return;
        await setShowChart(false);
        let myData = data.map(d => d.price)
        const max = Math.max(...myData);
        const min = Math.min(...myData);
        myData = myData.map(normalize(min, max));
        var net = new brain.recurrent.LSTMTimeStep({
            inputSize: 1,
            hiddenLayers: [10],//[10]
            outputSize: 1,
        });
        console.log("Training")
        net.train([myData], {
            learningRate: 0.005,//0.005
            errorThresh: 0.03,//0.02
            iterations: 4000,
            log: true
        });
        console.log("Finished")
        const val = net.forecast(myData, 60)
        const denormalized = val.map(denormalize(min, max));
        let res = []
        denormalized.forEach(
            (elem, index) =>
                res.push({
                    date: new Date(data[data.length - 1].timestamp).addDays(index).toLocaleDateString(),
                    price: elem.toString()
                })
        )
        await setForecast(res);
        await setShowChart(true);
        myRef.current.scrollIntoView();
    };
    return (
        <div style={{textAlign: 'center'}}>
            <Button
                onClick={()=> predict()}
                variant="contained"
                style={{ marginTop: '10px', marginBottom: '40px'}}
            >
                Predict Data
            </Button>
            {showChart === true &&
                <div style={{width: '90%', height: '600px', marginLeft: 'auto', marginRight: 'auto'}}
                      key="forecast">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecast}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Legend/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="price"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
            <div ref={myRef}/>
        </div>
    );
};

export default ForecastPrices;