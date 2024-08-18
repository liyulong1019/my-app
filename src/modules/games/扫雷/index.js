import React from "react";
import "./index.less";
import TitleBar from "@components/TitleBar";
import {} from "./utils";

export default function Sl() {
  return (
    <div className="sl">
      <TitleBar title="扫雷" />
      <div className="sl-content"></div>
    </div>
  );
}
