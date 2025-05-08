const AuthImagePattern = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-[#140d1c] flex-col items-center justify-center p-10">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* placeholder for tiles or avatars */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`bg-yellow-900 rounded-lg h-16 w-16 ${
              i % 2 === 0 ? "animate-pulse" : ""
            }`}
          ></div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2">Join our community</h3>
      <p className="text-sm text-center text-yellow-200 max-w-xs">
        Connect with friends, share moments, and stay in touch with your loved
        ones.
      </p>
    </div>
  );
};

export default AuthImagePattern;
