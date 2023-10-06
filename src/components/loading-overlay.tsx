export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
      <div className="bg-black/30 absolute inset-0 backdrop-blur-[4px]"></div>
      <div className="bg-white w-[80px] h-[80px] absolute rounded-2xl"></div>
      <span className="loader"></span>
    </div>
  );
};
