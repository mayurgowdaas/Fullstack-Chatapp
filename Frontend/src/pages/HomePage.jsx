import React from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="flex flex-1 overflow-hidden ">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Welcome Screen */}
      {selectedUser ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
