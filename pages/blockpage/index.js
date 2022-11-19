import React from "react";

const index = () => {
    return (

        <div className="flex flex-col items-center">
            <div className="">
                <h1 className="text-[60px] text-red-600">Your Account has Blocked!</h1>
            </div>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-red-600 border-8 h-64 w-64"></div>
            </div>
            <button className="absolute bottom-1/4  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Complaint Us!
            </button>
        </div>
    )
};

export default index;
