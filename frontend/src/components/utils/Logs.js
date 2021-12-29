import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Logs = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
        </Switch>
    );
};

export default Logs;
