import React from 'react';
import ProfileHeader from "./ProfileHeader";
import UserProfile from "./UserProfile";


const Profile = () => {
    return (
        <div className="bg-groupomania_dark">
            <ProfileHeader name="Profile" />
            <UserProfile/>
        </div>
    );
};

export default Profile;
