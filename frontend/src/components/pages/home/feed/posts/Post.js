import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ArrowCircleRightIcon, ChatAltIcon} from "@heroicons/react/solid";

const Post = () => {
    let history = useHistory();
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
                setPostObject(response.data);
            })
        } else {
            history.push(`/`);
        }

    }, []);


    const [DropCommentVisibility, setDropCommentVisibility] = useState("hidden");


    function toggleCommentDropDown(postObject) {
        setDropCommentVisibility({...DropCommentVisibility, [postObject]: !DropCommentVisibility[postObject]});
    }

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const addComment = (postId) => {
        axios.post(`http://localhost:8080/comments/`, {
            commentBody: newComment,
            PostId: postId},
            {headers:
                    {accessToken:
                            localStorage.getItem("accessToken")
                    }
            }
            ).then((response) => {
            if (response.data.error) {
                alert("You have to be logged in to post a comment");
            } else {
            const commentToAdd = {commentBody: newComment, PostId: postId, username: response.data.username}
            setComments([...comments, commentToAdd]);
            setNewComment("");
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/comments/${id}`).then((response) => {
            setComments(response.data);
            console.log(response.data);
        })
    }, [])

    return (
        <div
            className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
                 <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"} key={postObject.id} index={postObject.id}>
                    <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                        <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par {" "}
                            {postObject.username}, {moment(postObject.createdAt).fromNow()}</h5>
                        <div className="leading-6">
                            <p>{postObject.content}</p>
                        </div>
                    </div>
                    <div
                        className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                        <div className="w-1/2 inputIcon rounded-none rounded-bl-2xl">
                            <ThumbUpIcon className="h-4"/>
                            <p className="text-xs sm:text-base">Like</p>
                        </div>

                        <div className="w-1/2 inputIcon rounded-none rounded-br-2xl"
                             onClick={() => toggleCommentDropDown()}>
                            <ChatAltIcon className="h-4"/>
                            <p className="text-xs sm:text-base">Commentaires</p>
                        </div>
                        <div
                            className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 "}>
                            <hr/>
                            <div className="mt-3 p-3 w-full flex">
                                <div className="flex-shrink-0 mr-3">
                                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                         src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                         alt=""/>
                                </div>
                                <form>
                <textarea onChange={(event) => {
                    setNewComment(event.target.value)
                }}
                          value={newComment}
                          name="commentBody"
                          rows="1"
                          className="border p-2 rounded w-full"
                          placeholder="Répondre à..."/>
                                    <button key={postObject.id} index={postObject.id} onClick={() => addComment(postObject.id)}
                                            className="w-14 h-14 p-3 w-full flex justify-end"
                                            type="button">
                                        <ArrowCircleRightIcon/>
                                    </button>
                                </form>
                            </div>
                            <div className="mx-auto w-full p-3">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Commentaires</h3>
                                <div className="flex flex-col-reverse">
                                {comments.map((comment) => {
                                    return <div className="space-y-4 mb-4" key={comment.id}>
                                        <div className="flex">
                                            <div className="flex-shrink-0 mr-3">
                                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                                     src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                                     alt=""/>
                                            </div>
                                            <div
                                                className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                                <strong>{comment.username}</strong>
                                                <span
                                                    className="text-xs text-gray-400"> {moment(comment.createdAt).fromNow()}</span>
                                                <p>{comment.commentBody}</p>
                                            </div>
                                        </div>
                                    </div>
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Post;
