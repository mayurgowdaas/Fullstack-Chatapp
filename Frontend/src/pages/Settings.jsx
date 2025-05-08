import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const Themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];
const Settings = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 text-gray-400">
      <div>
        <h2 className="text-xl font-semibold mb-2">Theme</h2>
        <p className="text-sm text-gray-400 mb-4">
          Choose a theme for your chat interface
        </p>
        <div className="grid grid-cols-6 gap-4">
          {Themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`h-10 rounded shadow flex items-center justify-center border ${
                theme === t ? "ring-2 ring-yellow-400" : ""
              }`}
              data-theme={t}
            >
              <div className="w-full h-full bg-base-300 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <div className="w-3 h-3 bg-secondary rounded"></div>
                <div className="w-3 h-3 bg-accent rounded"></div>
              </div>{" "}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="rounded-lg bg-base-300 p-6 mt-6">
        <div className="text-sm text-gray-400 mb-2">Preview</div>
        <div className="bg-base-200 p-4 rounded shadow">
          <div className="mb-2">
            <p className="font-bold text-base-content">
              John Doe <span className="text-success text-sm">Online</span>
            </p>
            <p className="text-sm text-base-content">Hey! How’s it going?</p>
            <p className="text-xs text-gray-500">12:00 PM</p>
          </div>
          <div className="bg-primary text-primary-content p-3 rounded w-fit mb-2">
            I'm doing great! Just working on some new features.
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="This is a preview"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
