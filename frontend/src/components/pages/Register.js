import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";



const Register = () => {
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            history.push(`/`);
        }
    }, []);

    const initialValues = {
        email: "",
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        username: Yup.string().required("Please enter a username"),
        password: Yup.string().required("Please enter your password").matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/auth", data).then(() => {
            alert("Registration completed, you can now log in");
            history.push(`/login`);
        }).catch((e) => {
            console.log(e)
        });
    };

    return (
        <div className="bg-groupomania_dark-brighter flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="bg-groupomania_dark-brightest shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                        <div className="text-2xl flex justify-center border-b-2 py-2 mb-4">
                            Groupomania Register
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-normal mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <Field
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                v-model="form.email"
                                type="text"
                                placeholder="Email"
                                name="email"
                                required
                                autoComplete="current-email"
                            />
                            <ErrorMessage name="email" />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-normal mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <Field
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                v-model="form.username"
                                type="text"
                                placeholder="Username"
                                name="username"
                                required
                                autoComplete="current-username"
                            />
                            <ErrorMessage name="username" />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-sm font-normal mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <Field
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                v-model="form.password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                autoComplete="current-password"
                            />
                            <ErrorMessage name="password" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center mt-3 justify-center">
                                <Link to="/login">
                                    <button className={"justify-center hover:underline font-bold"}>
                                        Login
                                    </button>
                                </Link>
                            </div>
                            <button
                                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-groupomania_dark-brighter focus:bg-blue-700"
                                type="submit">Sign Up
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;
