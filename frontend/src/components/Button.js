import React from 'react';

const Button = (props) => {
    return (
        <div>
            <button className="border border-gray-300 bg-gray-300 text-groupomania_dark rounded-full px-2 font-bold" {...props} />
        </div>
    );
};

export default Button;
