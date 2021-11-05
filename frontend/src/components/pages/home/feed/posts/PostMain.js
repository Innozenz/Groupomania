import React, {useState, useEffect} from 'react';
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ChatAltIcon} from "@heroicons/react/solid";
import PostDataService from "../../../../../services/PostService";
import CommentDataService from "../../../../../services/CommentService";
import CommentsForm from "../comments/CommentsForm";
import moment from 'moment';
import 'moment/locale/fr';


const PostMain = () => {
    const [DropCommentVisibility, setDropCommentVisibility] = useState({});

    function toggleCommentDropDown(post) {
       setDropCommentVisibility({...DropCommentVisibility, [post]:!DropCommentVisibility[post]});
    }

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        retrievePosts();
    }, []);

    useEffect(() => {
        retrieveComments();
    }, []);

    const retrievePosts = () => {
        PostDataService.getAll()
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveComments = () => {
        CommentDataService.getAll()
            .then(response => {
                setComments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    moment.locale("fr");

    return (
        <div className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
            {posts.map((post, index) => (
            <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"}>
                <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                    <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par u.test123, {moment(post.createdAt).fromNow()}</h5>
                    <div className="leading-6">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div
                    className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                    <div className="w-1/2 inputIcon rounded-none rounded-bl-2xl">
                        <ThumbUpIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Like</p>
                    </div>

                    <div className="w-1/2 inputIcon rounded-none rounded-br-2xl"
                         onClick={() => toggleCommentDropDown(post.id)} key={post.id}>
                        <ChatAltIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Commentaires</p>
                    </div>
                    {DropCommentVisibility[post.id] &&
                    <div
                        className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 "}>
                        <hr/>
                        <CommentsForm/>
                        <div className="mx-auto w-full p-3">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Commentaires</h3>
                            {comments.map((comment, index) => (
                            <div key={comment.id} className="space-y-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                             src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                             alt=""/>
                                    </div>
                                    <div
                                        className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                        <strong>Nom de l'utilisateur</strong>
                                            <span
                                        className="text-xs text-gray-400"> {moment(comment.createdAt).fromNow()}</span>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
                ))}
        </div>
    );
};

export default PostMain;
