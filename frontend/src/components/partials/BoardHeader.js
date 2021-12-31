import React from 'react';

const BoardHeader = () => {
    return (
        <div>
            <div className="bg-groupomania_dark-brighter">
                <div className="mx-6 relative flex justify-center">
                    <div
                        className="h-20 w-20 rounded-full overflow-hidden relative -top-4 border-4 border-white bg-white mr-3">
                        {/*<img*/}
                        {/*    src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_5ey8lzmwmxp21.png?width=256&s=5a85d5c682f40e3cf317c560b219585ac0afce78"*/}
                        {/*    alt=""/>*/}
                    </div>
                    <div className="flex pt-2 pl-4 items-center">
                        <h1 className="text-gray-200 text-4xl">Quoi de neuf sur Groupomania?</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardHeader;
