import React from "react";
import "./index.less";
import TitleBar from "@components/TitleBar";
import {} from "./utils";
import { Button, Modal } from "antd";

const w = 15;
const h = 40;
const size = 30;

export default function Elsfk() {
  const [isModalOpen, setIsModalOpen] = false;
  const handleOk = () => {};
  return (
    <div className="elsfk">
      <TitleBar title="俄罗斯方块" />
      <div className="elsfk-content">
        <canvas id="myCanvas" width={w * size} height={h * size}>
          您的浏览器不支持 HTML5 canvas 标签。
        </canvas>
      </div>
      <Modal
        title={``}
        open={isModalOpen}
        footer={() => <Button onClick={handleOk}>重新开始</Button>}
        closable={false}
        maskClosable={false}
      />
    </div>
  );
}
