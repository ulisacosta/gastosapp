import React from "react";

export default function RedirectsBack({ href, text }) {
  return (
    <div className="w-full">
      <button className="">
        <a href={href} className="w-full">{text}</a>
      </button>
    </div>
  );
}
