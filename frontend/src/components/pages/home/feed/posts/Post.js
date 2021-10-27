import React, {useEffect} from 'react';
import PostForm from "./PostForm";
import PostMain from "./PostMain";
import PostDataService from "../../../../../services/PostService";
import CommentDataService from "../../../../../services/CommentService";

const Post = () => {

    useEffect(() => {
        PostDataService.getAll().then(r => console.log(r.data));
        CommentDataService.getAll().then(r => console.log(r.data));
    });

    return (
        <div>
            <PostForm/>
            <PostMain/>
        </div>
    );
};

export default Post;
