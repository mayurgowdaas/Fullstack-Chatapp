import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);
  const filteredUsers = isChecked
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="w-72 h-full overflow-y-auto border-r border-base-300 bg-base-100 p-4">
      {/* Header */}
      <div className=" mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-primary mb-3">
          <Users className="w-6 h-6" />
          Contacts
        </h2>

        {/* Checkbox */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs rounded-full"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="text-base-content">Show online only</span>
        </label>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={(e) => {
              e.preventDefault();
              setSelectedUser(user);
            }}
            className={`flex items-center bg-base gap-3 p-2 rounded-lg hover:bg-base-200 transition cursor-pointer 
              ${
                user._id === selectedUser?._id ? "bg-base-200" : "bg-base-100"
              }`}
          >
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user.profilePicture || "/avatar.png"} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-primary">{user.name}</div>
              <div
                className={`text-xs ${
                  onlineUsers?.includes(user._id)
                    ? "text-green-400"
                    : "text-gray-400"
                } `}
              >
                {onlineUsers?.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-4">No Online Users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
