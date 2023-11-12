import React from "react";
import Chat from "@/components/Chat";

const DiscussionPage = () => {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-3xl font-bold font-">
        Evaluación de solicitud de adopción
      </h1>
      <div className="flex flex-1 justify-evenly">
        {/* <div className="w-3/5 bg-slate-500 min-h-full"></div> */}
        <Chat />
      </div>
    </div>
  );
};

export default DiscussionPage;
