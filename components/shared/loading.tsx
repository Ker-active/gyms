export function LoadingComponent() {
  return (
    <div className=" p-4 flex-grow flex-1 flex flex-col justify-center items-center space-y-8">
      <div className="text-2xl font-semibold flex items-center space-x-1">
        <span>Loading</span>
        <span className="flex">
          <span className="dot animate-dot">.</span>
          <span className="dot animate-dot animation-delay-200">.</span>
          <span className="dot animate-dot animation-delay-400">.</span>
        </span>
      </div>
    </div>
  );
}
