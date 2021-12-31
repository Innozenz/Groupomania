import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import {ArrowCircleRightIcon} from "@heroicons/react/solid";
import {DeleteForever, DeleteSharp} from "@mui/icons-material";
import {AuthContext} from "../../../../../helpers/AuthContext";

const Post = () => {
    let history = useHistory();
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const {authState} = useContext(AuthContext);


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get(`http://localhost:8080/posts/byId/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setPostObject(response.data);
            })
        } else {
            history.push(`/login`);
        }

    }, []);


    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const addComment = (postId) => {
        axios.post(`http://localhost:8080/comments/`, {
                commentBody: newComment,
                PostId: postId,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You have to be logged in to post a comment");
                localStorage.removeItem("accessToken");
                history.push(`/login`);
            } else {
                axios.get(`http://localhost:8080/comments/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    setComments(response.data);
                })
                setNewComment("");
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/comments/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setComments(response.data);
        })
    }, [])

    const deleteComment = (id) => {

        axios.delete(`http://localhost:8080/comments/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(() => {
                setComments(comments.filter((val) => {
                    return val.id !== id;
                }))
            });
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:8080/posts/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(() => {
              history.push("/");
            });
    }

    const editPost = (option) => {
        if (option === "bodyPost") {
            let newPostText = prompt("Enter new post:");
            axios.put("http://localhost:8080/posts/postText", {
                    newText: newPostText,
                    id: id,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken")
                    }
                });

            setPostObject({...postObject, content: newPostText})
        }

    }

    return (
        <div
            className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
            <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"} key={postObject.id} index={postObject.id}>
                <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                    <div className="flex flex-row justify-between">
                        <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par {" "}
                            {postObject.username}, {moment(postObject.createdAt).fromNow()}</h5>
                        {authState.username === postObject.username ?
                            <DeleteSharp onClick={() => {deletePost(postObject.id)}} />
                         : authState.isAdmin && <DeleteSharp onClick={() => {deletePost(postObject.id)}} />}
                    </div>
                    <div className="leading-6 bodyPost" onClick={() => {
                        if (authState.username === postObject.username) {
                            editPost("bodyPost");
                        }
                    }}>
                        <p className="mb-6">{postObject.content}</p>
                    </div>
                    <div className="leading-6">
                        {postObject.image ?  (<img src={`http://localhost:8080/${postObject.image}`} alt="post"/>) : (<div></div>) }
                    </div>
                </div>
                <div
                    className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                    {/*<div className="w-1/2 inputIcon rounded-none rounded-bl-2xl">*/}
                    {/*    <ThumbUpIcon className="h-4"/>*/}
                    {/*    <p className="text-xs sm:text-base">Like</p>*/}
                    {/*</div>*/}

                    {/*<div className="w-1/2 inputIcon rounded-none rounded-br-2xl"*/}
                    {/*     onClick={() => toggleCommentDropDown()}>*/}
                    {/*    <ChatAltIcon className="h-4"/>*/}
                    {/*    <p className="text-xs sm:text-base">Commentaires</p>*/}
                    {/*</div>*/}
                    <div
                        className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 "}>
                        <hr/>
                        <div className="mt-3 p-3 w-full flex">
                            <div className="flex-shrink-0 mr-3">
                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                     src={`http://localhost:8080/${authState.image}`}
                                     alt="user"/>
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
                                <button key={postObject.id} index={postObject.id}
                                        onClick={() => addComment(postObject.id)}
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
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 mr-3">
                                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                                     src={`http://localhost:8080/${comment.image}`}
                                                     alt="user"/>
                                            </div>
                                            <div
                                                className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                                <strong>{comment.username}</strong>
                                                <span
                                                    className="text-xs text-gray-400">  {moment(comment.createdAt).fromNow()}</span>
                                                <p>{comment.commentBody}</p>
                                            </div>
                                            {authState.username === comment.username ?
                                                <DeleteForever className="ml-2" onClick={() => {
                                                    deleteComment(comment.id)
                                                }}/> : authState.isAdmin && <DeleteForever className="ml-2" onClick={() => {
                                                deleteComment(comment.id)
                                            }}/> }
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
