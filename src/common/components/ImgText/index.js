import React from "react";
import "./index.less";

export default function ImgText({
  text,
  alt,
  src,
  fontSize = "20px",
  fontFamily = "cursive",
}) {
  return (
    <div className="imgText">
      <img src={src} alt={alt} />
      <div className="imgText-text" style={{ fontSize, fontFamily }}>
        {text}
      </div>
    </div>
  );
}
