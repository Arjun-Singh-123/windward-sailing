"use client";
import React, { useEffect, useState } from "react";

const HeroFallback: React.FC = () => {
  const [isHeroMissing, setIsHeroMissing] = useState(false);

  useEffect(() => {
    const heroExists = !!document.querySelector(".hero");
    setIsHeroMissing(!heroExists);
  }, []);

  return isHeroMissing && <div className="pt-20"> </div>;
};

export default HeroFallback;
