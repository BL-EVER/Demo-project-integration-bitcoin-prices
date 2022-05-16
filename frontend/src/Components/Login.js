import React, {useContext} from 'react';
import {UserContext} from "../context/UserContext";
import * as yup from 'yup';
import { Formik } from 'formik';

import AuthService from "../Services/AuthService";
import {Button, Card, TextField, Typography} from "@mui/material";

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <Card style={{width: '200px', padding: '20px', margin: '10px'}}>
            <Typography variant="h6" style={{textAlign: 'center'}}>
                Login
            </Typography>
            <br />
            <Formik
                initialValues= {{ username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit = {(values, {resetForm}) => {
                    AuthService.login(values.username, values.password, setUser);
                    resetForm();
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <TextField
                            fullWidth
                            id="username_login"
                            name="username"
                            label="Username"
                            value={props.values.username}
                            onChange={props.handleChange}
                            error={props.touched.username && Boolean(props.errors.username)}
                            helperText={props.touched.username && props.errors.username}
                        />
                        <br />
                        <br />
                        <TextField
                            fullWidth
                            id="password_login"
                            name="password"
                            label="Password"
                            type="password"
                            value={props.values.password}
                            onChange={props.handleChange}
                            error={props.touched.password && Boolean(props.errors.password)}
                            helperText={props.touched.password && props.errors.password}
                        />
                        <br />
                        <br />
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                        <Button color="secondary" variant="contained" onClick={()=>props.resetForm()} style={{marginLeft: '10px'}}>
                            Reset
                        </Button>
                    </form>
                )}
            </Formik>

        </Card>
    );
};

export default Login;