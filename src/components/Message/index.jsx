import React from "react";

const Message = ({ body, time, user, alignRight }) => {
  const alignClass = alignRight ? "items-end pl-8" : "items-start pr-8";
  const bgClass = alignRight
    ? "bg-blue-500 text-white"
    : "bg-gray-300 text-gray-900";
  const roundedClass = alignRight ? "rounded-br-none" : "rounded-bl-none";
  const userInitial = user.charAt(0);

  return (
    <div className={`flex flex-col ${alignClass} my-1`}>
      <div className="flex items-center">
        {!alignRight && (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-400">
            <span className="text-white font-bold">{userInitial}</span>
          </div>
        )}
        <div className={`ml-2 flex flex-col ${alignClass}`}>
          <p className="text-sm font-medium text-gray-900">{user}</p>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        {alignRight && (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-400 ml-2">
            <span className="text-white font-bold">{userInitial}</span>
          </div>
        )}
      </div>
      <div className={`mt-1 rounded-lg px-3 py-2 ${bgClass} ${roundedClass}`}>
        <p className="text-sm">{body}</p>
      </div>
    </div>
  );
};

export default Message;
