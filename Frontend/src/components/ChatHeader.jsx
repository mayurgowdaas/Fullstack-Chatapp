import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="flex items-center gap-3 p-3 bg-base-200 transition cursor-pointer">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src={selectedUser.profilePicture || "/avatar.png"}
            alt={selectedUser.name}
          />
        </div>
      </div>
      <div>
        <div className="font-semibold text-primary">{selectedUser.name}</div>
        {/* Optional status line */}
        <div
          className={`text-xs ${
            isOnline ? "text-green-400" : "text-gray-400"
          } `}
        >
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
