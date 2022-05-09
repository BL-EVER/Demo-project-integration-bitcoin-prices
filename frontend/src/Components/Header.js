import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static" style={{marginBottom: '20px'}}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Bitcoin historical data and forecasting in the browser
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;