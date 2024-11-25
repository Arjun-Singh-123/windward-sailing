import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="loading">
      <Image
        src="/images/loading.svg"
        alt="Loading..."
        width={184}
        height={184}
        className="object-contain"
      />
      {/* <p>Loading...</p> */}
    </div>
  );
};

export default Loader;
