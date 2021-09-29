import React from 'react';
import BoardHeader from "../partials/BoardHeader";
import PostForm from "../posts/PostForm";
import PostMain from "../posts/PostMain";

const Home = () => {
    return (
        <div>
            <BoardHeader/>
            <PostForm/>
            <PostMain/>
        </div>
    );
};

export default Home;
