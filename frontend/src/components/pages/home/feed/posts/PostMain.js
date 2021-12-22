import React, {useState, useEffect, useRef, useContext} from 'react';
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ChatAltIcon} from "@heroicons/react/solid";
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Form, Formik} from "formik";
import {Check, FileUpload} from "@mui/icons-material";
import * as Yup from "yup";
import {AuthContext} from "../../../../../helpers/AuthContext";


const PostMain = () => {

    let history = useHistory();


    // const validationSchema =
    //     Yup.object().shape({
    //         content: Yup.string().required()
    //     })


    const initialValues = {
        content: ""
    }

    const [newPost, setNewPost] = useState([]);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [fileState, setFileState] = useState("");

    const addPost = () => {
        const formData = new FormData();
        formData.append("image", fileState);
        formData.append("content", newPost);

        axios.post("http://localhost:8080/posts", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You have to be logged in to post a post");
                localStorage.removeItem("accessToken");
                history.push(`/login`);
            } else {
                console.log(listOfPosts);
                console.log(fileState);
                axios.get("http://localhost:8080/posts", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    setListOfPosts(response.data.listOfPosts);
                    console.log(response.data);
                })
            }
        });
    }


    function toggleCommentDropDown(postId) {
        history.push(`/post/${postId}`);
    }

    const {authState} = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            alert("You have to be logged in to access Groupomania");
            history.push(`/login`);
        } else {
            axios.get("http://localhost:8080/posts", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId
                }));
                console.log(response.data);
                console.log(authState);
            })
        }

    }, []);

    const likeAPost = (postId) => {
        axios.post("http://localhost:8080/likes", {PostId: postId}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked === true) {
                        return {...post, Likes: [...post.Likes, 0]};
                    } else {
                        const likeArray = post.Likes;
                        likeArray.pop();
                        return {...post, Likes: likeArray}
                    }
                } else {
                    return post;
                }
            }));
        });
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => {
                return id !== postId
            }));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    }

    moment.locale("fr");

    return (
        <div>
            <div className="bg-groupomania_dark flex justify-center">
                <div className="w-full lg:w-1/2 bg-groupomania_dark px-6 py-4 text-gray-400">
                    <div className="border border-black p-2 rounded-md flex bg-groupomania_dark-brighter">
                        <div className="flex-shrink-0 mr-3">
                            <img className="mt-2 rounded-full w-8 h-8 sm:w-14 sm:h-14"
                                 src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                 alt=""/>
                        </div>
                        <Formik
                            initialValues={initialValues}
                        >
                            <Form className="flex flex-grow border border-gray-300 ml-4 mr-2 rounded-md" encType="multipart/form-data">
                                <textarea
                                    required="required"
                                    onChange={(event) => {
                                        setNewPost(event.target.value)
                                    }}
                                    value={newPost}
                                    name="content"
                                    placeholder="Qu'avez vous en tête?"
                                    className="bg-gray-300 p-2 px-3 text-sm block w-full rounded-md placeholder-gray-800 text-gray-800"/>
                                <input className="hidden"
                                       id="file"
                                       type="file"
                                    // The onChange should trigger updates whenever
                                    // the value changes?
                                    // Try to select a file, then try selecting another one.
                                       onChange={event => {
                                           setFileState(event.target.files[0])
                                       }}
                                />
                                <div className="flex flex-col items-stretch text-gray-100">
                                    <label className="p-2" htmlFor="file">
                                        <FileUpload tabIndex="0" role="button" aria-controls="filename">
                                            Upload file(s):{" "}
                                        </FileUpload>
                                    </label>
                                    <button onClick={addPost} className="p-2" type="submit">
                                        <Check></Check>
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <div
                className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
                {listOfPosts.map((post, key) => {
                    return <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"} key={post.id} index={post.id}>
                        <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                            <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par {" "}
                                {post.username}, {moment(post.createdAt).fromNow()}</h5>
                            <div className="leading-6">
                                <p className="mb-6">{post.content}</p>
                            </div>
                            <div className="flex leading-6 justify-center">
                                {post.image ?  (<img className="h-2/4 w-2/4" src={`http://localhost:8080/${post.image}`}/>) : (<div></div>) }
                            </div>
                        </div>
                        <div
                            className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                            <div className="w-1/2 inputIcon rounded-none rounded-bl-2xl"
                                 onClick={() => likeAPost(post.id)}>
                                <ThumbUpIcon className={likedPosts.includes(post.id) ? "fill-blue-500 h-4" : "h-4"}/>
                                <p className={likedPosts.includes(post.id) ? "text-xs sm:text-base text-blue-600" : "text-xs sm:text-base"}>Like</p>
                                <label
                                    className={likedPosts.includes(post.id) ? "text-xs sm:text-base text-blue-600" : "text-xs sm:text-base"}>{post.Likes.length}</label>
                            </div>

                            <div className="w-1/2 inputIcon rounded-none rounded-br-2xl"
                                 onClick={() => toggleCommentDropDown(post.id)} key={post.id}>
                                <ChatAltIcon className="h-4"/>
                                <p className="text-xs sm:text-base">Commentaires</p>
                            </div>
                            <div
                                className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 "}>
                                <hr/>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default PostMain;
