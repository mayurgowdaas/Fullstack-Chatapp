import React, { useState } from "react";
import { Camera, User, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import imageCompression from "browser-image-compression";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [name, setName] = useState(authUser.name);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 4,
      useWebWorker: true,
    });
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePicture: base64Image });
    };
  };

  const handleNameChange = async (newName) => {
    await updateProfile({ name: newName });
  };

  return (
    <div className="h-screen flex bg-base-100 text-base-content justify-center items-start px-4 py-10">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-primary mb-1 text-center">
          Profile
        </h2>
        <p className="text-sm text-center text-secondary mb-6">
          Your profile information
        </p>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4 relative">
          <div className="relative">
            <img
              src={authUser.profilePicture || "avatar.png"}
              alt="profile"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 p-1 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile
                  ? "animate-pulse pointer-events-none"
                  : "bg-base-content"
              }`}
            >
              <Camera className="w-5 h-5 text-primary-content" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6">
          Click the camera icon to update your photo
        </p>

        {/* Full Name Input */}
        <div className="mb-4">
          <label className="label text-sm text-gray-400 flex gap-1 items-center">
            <User size={14} />
            Full Name
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNameChange(name);
              }
            }}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="label text-sm text-gray-400 flex gap-1 items-center">
            <Mail size={14} />
            Email Address
          </label>
          <div className="input input-bordered w-full bg-base-100 flex items-center">
            {authUser?.email}
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-8 border-t pt-4 border-base-300">
          <h3 className="text-sm font-semibold text-primary mb-3">
            Account Information
          </h3>
          <div className="text-sm mb-1 text-base-content">
            <span className="font-medium">Member Since:</span> January 2024
          </div>
          <div className="text-sm text-base-content">
            <span className="font-medium">Account Status:</span>{" "}
            <span className="text-success font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
