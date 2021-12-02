import React from 'react';
import BoardHeader from "../../partials/BoardHeader";
import Posts from "./feed/posts/Posts";
import Footer from "../../partials/Footer";

const Home = () => {
    return (
        <div>
            <BoardHeader/>
            <Posts/>
            {/*<Footer/>*/}
        </div>
    );
};

export default Home;
