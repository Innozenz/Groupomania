import React from 'react';
import BoardHeader from "../../partials/BoardHeader";
import Post from "./feed/posts/Post";
import Footer from "../../partials/Footer";

const Home = () => {
    return (
        <div>
            <BoardHeader/>
            <Post/>
            <Footer/>
        </div>
    );
};

export default Home;
