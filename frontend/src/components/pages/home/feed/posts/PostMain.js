import React, {useState, useEffect, useRef} from 'react';
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ArrowCircleRightIcon, ChatAltIcon} from "@heroicons/react/solid";
import CommentsForm from "../comments/CommentsForm";
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import PostForm from "./PostForm";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Check, FileUpload} from "@mui/icons-material";
import * as Yup from "yup";

const useForceUpdate = () => useState()[1];

const PostMain = () => {

    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();

    useEffect(e => {
        window.addEventListener("keyup", clickFileInput);
        return () => window.removeEventListener("keyup", clickFileInput);
    });

    function clickFileInput(e) {
        if (fileInput.current.nextSibling.contains(document.activeElement)) {
            // Bind space to trigger clicking of the button when focused
            if (e.keyCode === 32) {
                fileInput.current.click();
            }
        }
    }


    function fileNames() {
        const {current} = fileInput;

        if (current && current.files.length > 0) {
            let messages = [];
            for (let file of current.files) {
                messages = messages.concat(<p key={file.name}>{file.name}</p>);
            }
            return messages;
        }
        return null;
    }

    const validationSchema =
        Yup.object().shape({
            content: Yup.string().required()
        })


    const initialValues = {
        content: ""
    }

    const [newPost, setNewPost] = useState([]);
    const [newComment, setNewComment] = useState("");

    const addPost = () => {
        axios.post("http://localhost:8080/posts", {content: newPost}).then((response) => {
            const postToAdd = {content: newPost}
            setListOfPosts([...listOfPosts, postToAdd]);
            setNewPost([]);
        })
    }

    const addComment = () => {
        axios.post("http://localhost:8080/comments", {content: newComment, postId: id}).then((response) => {
            const commentToAdd = {content: newComment}
            setComments([...comments, commentToAdd]);
            setNewComment("");
        })
    }


    const [DropCommentVisibility, setDropCommentVisibility] = useState({});

    function toggleCommentDropDown(post) {
        setDropCommentVisibility({...DropCommentVisibility, [post]: !DropCommentVisibility[post]});
    }

    let {id} = useParams();

    const [listOfPosts, setListOfPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/posts").then((response) => {
            setListOfPosts(response.data);
            console.log(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/comments`).then((response) => {
            setComments(response.data);
        })
    }, [])

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
                            validationSchema={validationSchema}
                        >
                            <Form className="flex flex-grow border border-gray-300 ml-4 mr-2 rounded-md">
                                <ErrorMessage name="content" component="span"/>
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
                                       ref={fileInput}
                                    // The onChange should trigger updates whenever
                                    // the value changes?
                                    // Try to select a file, then try selecting another one.
                                       onChange={forceUpdate}
                                       multiple
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
                                {fileNames()}
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <div
                className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
                {listOfPosts.map((post, key) => {
                    return <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"} key={post.id}>
                        <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                            <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par
                                u.test123, {moment(post.createdAt).fromNow()}</h5>
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
                          name="content"
                          rows="1"
                          className="border p-2 rounded w-full"
                          placeholder="Répondre à..."/>
                                        <button onClick={addComment} className="w-14 h-14 p-3 w-full flex justify-end"
                                                type="submit">
                                            <ArrowCircleRightIcon/>
                                        </button>
                                    </form>
                                </div>
                                <div className="mx-auto w-full p-3">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Commentaires</h3>
                                    {comments.map((comment, key) => {
                                        return <div className="space-y-4 mb-4">
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
                                                    <p>{comment.commentBody}</p>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default PostMain;
