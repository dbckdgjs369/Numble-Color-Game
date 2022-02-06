import React from "react";
interface Boxprops {
  onClick: () => void;
  style: string;
}

export default function ColorBox(props: Boxprops) {
  return (
    <div
      style={{ backgroundColor: `${props.style}` }}
      onClick={props.onClick}
    ></div>
  );
}
