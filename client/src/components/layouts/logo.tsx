
import Image from "next/image";
import React from "react";

export default function Logo() {

  return (
    <>
      <Image
        src={"/icons/favicon-white.svg"}
        alt="logo"
        width={24}
        height={24}
        className="hidden dark:block"
      />
      <Image
        src={`/icons/favicon-black.svg`}
        alt="logo"
        width={24}
        height={24}
        className="dark:hidden block"
      />
    </>
  );
}