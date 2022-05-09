import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApi() {
    const [data, setData] = useState([]);

    useEffect( () => {
        const getData = () => {
             axios.get('/api/')
                .then( function(response) {
                    setData(response.data);
                })
                .catch(async e => {
                    setData([])
                });
        }
        getData();
    }, []);

    return data;
}