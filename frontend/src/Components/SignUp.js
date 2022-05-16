import React from 'react';
import * as yup from "yup";
import {Formik, Field} from "formik";
import AuthService from "../Services/AuthService";
import { RadioGroup } from 'formik-material-ui';
import {Button, Card, FormControlLabel, Radio, TextField, Typography} from "@mui/material";

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    role: yup
        .string('Enter your role')
        .required('Role is required')
});
const SignUp = () => {
    return (
        <Card style={{width: '200px', padding: '20px', margin: '10px'}}>
            <Typography variant="h6" style={{textAlign: 'center'}}>
                SignUp
            </Typography>
            <br />
            <Formik
                initialValues= {{ username: '', password: '', role: 'user'}}
                validationSchema={validationSchema}
                onSubmit = {(values, {resetForm}) => {
                    AuthService.signup(values.username, values.password, values.role);
                    resetForm();
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <TextField
                            fullWidth
                            id="username_signup"
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
                            id="password_signup"
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
                        <Typography variant="subtitle1">
                            Role:
                        </Typography>
                        <Field
                            component={RadioGroup}
                            name="role"
                        >
                            <FormControlLabel
                                value="user"
                                control={<Radio/>}
                                label="User"
                            />
                            <FormControlLabel
                                value="admin"
                                control={<Radio/>}
                                label="Admin"
                            />
                        </Field>
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

export default SignUp;