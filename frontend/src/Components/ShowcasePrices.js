import React from 'react';
import {CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, LineChart, Tooltip} from "recharts";


const ShowcasePrices = ({data}) => {
    return (
        <div style={{width: '90%', height: '600px', marginLeft: 'auto', marginRight: 'auto'}} key="showcase">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ShowcasePrices;