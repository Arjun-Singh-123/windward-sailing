// src/components/Loading.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src="/images/loading.svg" alt="Loading..." className="w-46 h-46" />
    </div>
  );
};

export default Loader;
