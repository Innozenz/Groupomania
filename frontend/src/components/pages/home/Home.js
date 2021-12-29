import React from 'react';
import BoardHeader from "../../partials/BoardHeader";
import Posts from "./feed/posts/Posts";

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
