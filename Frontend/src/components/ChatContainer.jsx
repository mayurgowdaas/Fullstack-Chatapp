import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => {
      unsubscribeToMessages();
    };
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content">
        Select a user to start chatting.
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 h-full bg-base-100">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-base-100">
      {/* Header */}
      <ChatHeader />

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end ${
              authUser._id === message.senderid
                ? "justify-end"
                : "justify-start"
            } gap-2`}
            ref={messageEndRef}
          >
            {/* Avatar (left for other user) */}
            {authUser._id !== message.senderid && (
              <div className="avatar">
                <div className="w-6 rounded-full">
                  <img
                    src={selectedUser.profilePicture || "/avatar.png"}
                    alt="Sender"
                  />
                </div>
              </div>
            )}

            {/* Message bubble */}
            <div className="flex flex-col max-w-xs">
              <div className="px-4 py-2 rounded-xl text-sm shadow bg-base-300 text-base-content rounded-br-none">
                {message.text && <p>{message.text}</p>}
                {message.image && (
                  <img
                    src={message.image}
                    alt="sent"
                    className="mt-2 rounded-lg max-w-[150px]"
                  />
                )}
              </div>
              <span className="text-[10px] text-base-content/50 mt-1 ml-1">
                {message.time}
              </span>
            </div>

            {/* Avatar (right for current user) */}
            {authUser._id === message.senderid && (
              <div className="avatar">
                <div className="w-6 rounded-full">
                  <img
                    src={authUser.profilePicture || "/avatar.png"}
                    alt="You"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
