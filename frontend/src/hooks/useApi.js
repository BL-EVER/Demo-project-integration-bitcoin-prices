import { useState, useEffect } from 'react';
import axios from "../Services/CustomAxios";

export default function useApi() {
    const [data, setData] = useState([]);

    useEffect( () => {
        const getData = () => {
             axios.get('/api/data')
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