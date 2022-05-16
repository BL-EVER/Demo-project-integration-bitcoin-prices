import React from 'react';
import ShowcasePrices from "./Components/ShowcasePrices";
import ForecastPrices from "./Components/ForecastPrices";
import {UserContext} from "./context/UserContext";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {CircularProgress, Grid} from "@mui/material";
import AuthService from "./Services/AuthService";

const Content = () => {
    const [user, setUser] = React.useContext(UserContext);
    React.useEffect(()=>{
        if(AuthService.getToken() && Object.keys(AuthService.getToken()).length > 0 && Object.keys(user).length === 0) {
            AuthService.checkToken(setUser);
        }
    }, [])
    return (
        <>
            {Object.keys(user).length > 0 && AuthService.getToken() && Object.keys(AuthService.getToken()).length > 0 ?
                <>
                    <ShowcasePrices/>
                    {user?.role === 'admin' && <ForecastPrices/>}
                </>
                :
                <Grid container justifyContent="center" alignItems="flex-start">
                    {AuthService.getToken() && Object.keys(AuthService.getToken()).length > 0 && Object.keys(user).length === 0 ?
                            <Grid item><CircularProgress /></Grid>
                        :
                        <>
                            <Grid item><Login/></Grid>
                            <Grid item><SignUp /></Grid>
                        </>
                    }
                </Grid>
            }
        </>
    );
};

export default Content;