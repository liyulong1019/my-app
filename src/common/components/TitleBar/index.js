import React from "react";
import "./index.less";
import BackBtn from "../backBtn";

export default function TitleBar({ title }) {
  return (
    <div className="titleBar">
      <BackBtn style={{ float: "left" }}></BackBtn>
      {title}
    </div>
  );
}
