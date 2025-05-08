import { useState, useRef } from "react";
import { ImageIcon, PlaneIcon, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.startsWith("image/")) {
      toast.error("please select a immage");
      return;
    }
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 4,
      useWebWorker: true,
    });
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ text: text.trim(), pic: imagePreview });
      setText("");
      removeImage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-base-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center w-full gap-2 p-2 bg-base-100 border-t border-base-300"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 text-sm bg-base-200 text-base-content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage}
        />

        {/* Image Upload */}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        ></input>

        <button
          type="button"
          className={`hidden sm:flex btn btn-circle bg-base-100 text-primary`}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={20} />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className={`sm:flex btn btn-circle bg-base-100  ${
            !text.trim() && !imagePreview ? "text-base-100" : "text-primary"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <PlaneIcon size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
