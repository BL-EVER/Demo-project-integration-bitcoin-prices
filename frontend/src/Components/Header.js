import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {UserContext} from "../context/UserContext";
import AuthService from "../Services/AuthService";

const Header = () => {
    const [user, setUser] = React.useContext(UserContext);
    return (
        <AppBar position="static" style={{marginBottom: '20px'}}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Bitcoin historical data and forecasting in the browser
                </Typography>
                {Object.keys(user).length > 0 && Object.keys(AuthService.getToken()).length > 0 &&
                    <Button variant="contained" onClick={() => AuthService.logout(setUser)} style={{marginLeft: 'auto'}}>LOGOUT</Button>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;