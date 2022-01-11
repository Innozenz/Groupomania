import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {PencilIcon, XCircleIcon} from "@heroicons/react/solid";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../helpers/AuthContext";

const UserProfile = () => {
    let {id} = useParams();
    const [user, setUser] = useState("");
    const {authState, setAuthState} = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            alert("You have to be logged in to access Groupomania");
            history.push(`/login`);
        } else {
            axios.get(`http://localhost:8080/auth/userinfo/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setUser(response.data);
                setAuthState({
                    email: response.data.email,
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    job: response.data.job,
                    userId: response.data.id,
                    status: true,
                    isAdmin: response.data.isAdmin,
                    image: response.data.image
                })
            })
        }
    }, []);


    const deleteAccount = () => {
        axios.delete(`http://localhost:8080/auth/deleteUser/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(r => {
            if (r.data.error) {
                alert(r.data.error);
            } else {
                alert("Compte supprimé avec succès !");
                localStorage.removeItem("accessToken");
                setAuthState({username: "", id: 0, status: false});
                history.push(`/register`);
            }
        });
    }

    const pushToEdit = () => {
        history.push("/edit");
    }

    return (
        <div className="flex items-center h-screen w-full justify-center">

            <div className="max-w-xs">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img className="w-32 h-32 rounded-full mx-auto"
                             src={`http://localhost:8080/${user.image}`}
                             alt="profile" />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.username}</h3>
                        <div className="text-center text-gray-400 text-xs font-semibold text-base">
                            <p>{user.job}</p>
                        </div>
                        <table className="text-xs my-3">
                            <tbody>
                            <tr>
                                <td className="px-2 py-2 text-base text-gray-500 font-semibold">Username</td>
                                <td className="px-2 py-2 text-base">{user.username}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-base text-gray-500 font-semibold">Nom</td>
                                <td className="px-2 py-2 text-base">{user.lastName}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-base text-gray-500 font-semibold">Prénom</td>
                                <td className="px-2 py-2 text-base">{user.firstName}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-base text-gray-500 font-semibold">Email</td>
                                <td className="px-2 py-2 text-base">{user.email}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-base text-gray-500 font-semibold">Poste</td>
                                <td className="px-2 py-2 text-base">{user.job}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-center my-3 items-baseline">
                            {authState.username === user.username ? (
                                <Link to="/edit">
                                    <PencilIcon className="w-4 h-4"/>
                                </Link>
                            ) : authState.isAdmin && <Link to="/edit">
                                <PencilIcon className="w-4 h-4"/>
                            </Link>}
                            <button onClick={pushToEdit} className="text-base italic hover:underline font-medium">Edit Profile</button>
                        </div>

                        {authState.username === user.username ? (
                            <div className="flex justify-center">
                                <p className="text-red-800 mr-2">Delete your account</p>
                                <XCircleIcon onClick={deleteAccount} className="w-6 h-6"/>
                            </div>
                        ) : authState.isAdmin &&
                            <div className="flex justify-center">
                                <p className="text-red-800 mr-2">Delete your account</p>
                                <XCircleIcon onClick={deleteAccount} className="w-6 h-6"/>
                            </div>}

                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;
