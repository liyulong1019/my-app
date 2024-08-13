import React, { useEffect, useRef, useState } from "react";
import TitleBar from "../../../common/components/TitleBar";
import "./index.less";
import { Button, Modal } from "antd";
import { isWin } from "./utils";
import { cloneDeep } from "lodash";

const w = 19; // 宽
const h = 19; // 高
const size = 30; // 单个盒子的宽高
const pieceSize = 11; // 棋子的半径
const initFlag = true; // 棋子的颜色，初始为黑色
const initPieceArr = Array.from({ length: w }, () => new Array(h).fill(null)); // 落子信息

export default function Wzq() {
  const pieceFlag = useRef(initFlag);
  const pieceArr = useRef(initPieceArr);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initCanvas = () => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    ctx.strokeStyle = "#111";
    ctx.fillStyle = "antiquewhite";
    ctx.shadowBlur = 0;
    ctx.fillRect(0, 0, w * size, h * size);
    for (let i = 0; i < w; i++) {
      ctx.beginPath();
      ctx.moveTo((i + 0.5) * size, size / 2);
      ctx.lineTo((i + 0.5) * size, (h - 0.5) * size);
      ctx.stroke();
    }
    for (let i = 0; i < h; i++) {
      ctx.beginPath();
      ctx.moveTo(size / 2, (i + 0.5) * size);
      ctx.lineTo((w - 0.5) * size, (i + 0.5) * size);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    initCanvas();
    c.addEventListener("click", function (event) {
      const rect = c.getBoundingClientRect(); // 获取canvas相对视窗的位置
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const i = Math.floor(mouseX / size);
      const j = Math.floor(mouseY / size);
      const x = (i + 0.5) * size;
      const y = (j + 0.5) * size;
      const arr = cloneDeep(pieceArr.current);
      if (arr[i][j] === null) {
        ctx.beginPath();
        ctx.arc(x, y, pieceSize, 0, Math.PI * 2);
        ctx.fillStyle = pieceFlag.current ? "#000" : "#fff";
        ctx.shadowBlur = pieceSize;
        ctx.shadowColor = "#000";
        ctx.fill();
        arr[i][j] = pieceFlag.current;
        pieceArr.current = arr;
      }

      // 判断胜利
      if (isWin(i, j, pieceFlag.current, pieceArr.current)) {
        setIsModalOpen(true);
      } else {
        pieceFlag.current = !pieceFlag.current;
      }

      return () => {
        c.removeEventListener("click");
      };
    });
  }, []);

  const handleOk = () => {
    initCanvas();
    pieceArr.current = initPieceArr;
    pieceFlag.current = initFlag;
    setIsModalOpen(false);
  };

  return (
    <div className="wzq">
      <TitleBar title="五子棋" />
      <div className="wzq-content">
        <canvas id="myCanvas" width={w * size} height={h * size}>
          您的浏览器不支持 HTML5 canvas 标签。
        </canvas>
      </div>
      <Modal
        title={`${pieceFlag.current ? "黑" : "白"}棋获胜`}
        open={isModalOpen}
        footer={() => <Button onClick={handleOk}>重新开始</Button>}
        closable={false}
        maskClosable={false}
      />
    </div>
  );
}
