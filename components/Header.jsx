import Image from "next/image";
import React from "react";

function Header({ isDarkMode }) {
  return (
    <div className="h-[30%] relative w-full">
      <Image
        src={`${isDarkMode ? "/bg-desktop-dark.jpg" : "/bg-desktop-light.jpg"}`}
        layout="fill"
        alt=""
        className="object-cover "
        priority
      />
    </div>
  );
}

export default Header;
