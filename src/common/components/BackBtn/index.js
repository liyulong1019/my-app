import React from "react";
import { useNavigate } from "react-router";
import { LeftOutlined } from "@ant-design/icons";
import "./index.less";

export default function BackBtn({ text = "返回", step = -1, style }) {
  const navigate = useNavigate();
  return (
    <span
      className="backBtn"
      style={style}
      onClick={() => {
        navigate(step);
      }}
    >
      <LeftOutlined /> {text}
    </span>
  );
}
