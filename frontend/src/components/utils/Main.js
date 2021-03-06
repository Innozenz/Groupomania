import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Profile from "../pages/userprofile/Profile";
import EditProfile from "../pages/userprofile/EditProfile";
import Post from "../pages/home/feed/posts/Post"

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}/>
            <Route exact path='/profile/:id' component={Profile}/>
            <Route exact path='/edit' component={EditProfile}/>
            <Route exact path='/post/:id' component={Post}/>
        </Switch>
    );
}

export default Main;
