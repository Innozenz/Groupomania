import React from 'react';

const ProfileHeader = (props) => {
    return (
        <div>
            <div className="bg-groupomania_dark-brighter">
                <div className="mx-6 relative flex justify-center">
                    <div className="flex items-center p-4">
                        <h1 className="text-gray-400 text-4xl">{props.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
