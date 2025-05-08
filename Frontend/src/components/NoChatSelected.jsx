import React from "react";
import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-base-100">
      <div className="text-center">
        <div className="flex justify-center text-5xl mb-4 items-center ">
          <MessageCircle className="items-center text-primary animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">
          Welcome to Chatty!
        </h1>
        <p className="text-base-content/70 text-sm">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </main>
  );
};

export default NoChatSelected;
