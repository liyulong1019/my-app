import React, { useEffect, useState, useRef } from "react";
import "./index.less";
import TitleBar from "../../../common/components/TitleBar";
import { cloneDeep } from "lodash";
import { directionKey } from "../utils";
import { Button, message } from "antd";
import { nextStepFn } from "./utils";

const w = 80; // 地图的宽度
const h = 50; // 地图的高度
const speed = 5;
const initial_length = 4; // 初始长度
const initial_x = parseInt(w / 2) - initial_length; // 初始坐标x
const initial_y = parseInt(h / 2); // 初始坐标y
const initial_direction = "right"; // 初始方向
const mapArrs = Array.from({ length: h }, () => new Array(w).fill(0)); // 地图数据
const snake = [];
for (let i = 0; i < initial_length; i++) {
  snake.push({
    x: initial_x - i,
    y: initial_y,
    dir: initial_direction,
  });
}
let intervalId = null;

export default function Tcs() {
  const mapArr = useRef(mapArrs); // 地图数据
  const [moveArr, setMoveArr] = useState(mapArrs); // 移动过程中的数组
  const food = useRef({ x: 0, y: 0 });
  const direction = useRef(initial_direction);
  const turnArr = useRef([]); // 拐点信息
  const snakes = useRef(snake); // 蛇
  const [messageApi, contextHolder] = message.useMessage();

  // 拐弯事件
  const turn = (key) => {
    const dir = direction.current;
    const { x, y } = snakes.current[0];
    if (!key) return;
    const fn = (k) => {
      turnArr.current = [...turnArr.current, { x, y, dir: k }];
      direction.current = k;
    };
    if (dir === "up" || dir === "down") {
      if (key === "left" || key === "right") fn(key);
    }
    if (dir === "left" || dir === "right") {
      if (key === "up" || key === "down") fn(key);
    }
  };

  // 移动
  const move = () => {
    snakes.current = snakes.current.map(({ x, y, dir }) => {
      for (let i = 0; i < turnArr.current.length; i++) {
        const item = turnArr.current[i];
        const { x: xs, y: ys, dir: dirs } = item || {};
        if (x === xs && y === ys) {
          return nextStepFn(x, y, dirs);
        }
      }
      return nextStepFn(x, y, dir);
    });
    clearTurn();
    eatFood();
    const isEnd = gameOver() || win();
    if (!isEnd) {
      rendering();
    }
  };

  useEffect(() => {
    initial();
    directionKey(turn);
    return () => clearInterval(intervalId); // 清理定时器
  }, []);

  // 清除无用拐点
  const clearTurn = () => {
    turnArr.current = turnArr.current
      .map((item) => {
        const { x: xs, y: ys } = item || {};
        if (snakes.current.find(({ x, y }) => x === xs && y === ys)) {
          return item;
        }
        return null;
      })
      .filter((e) => !!e);
  };

  // 渲染
  const rendering = () => {
    const ma = cloneDeep(mapArr.current);
    for (let i = 0; i < snakes.current.length; i++) {
      const item = snakes.current[i];
      const { x, y } = item;
      ma[y][x] = 1;
    }
    const f = food.current;
    ma[f.y][f.x] = 1;
    setMoveArr(ma);
  };
  const initial = () => {
    mapArr.current = mapArrs; // 地图数据
    setMoveArr(mapArrs); // 移动过程中的数组
    food.current = { x: 0, y: 0 };
    direction.current = initial_direction;
    turnArr.current = []; // 拐点信息
    snakes.current = snake; // 蛇
    intervalId = setInterval(move, 1000 / speed);
    refreshFood();
    rendering();
  };

  //刷新食物
  const refreshFood = () => {
    const randomFoodArrs = [];
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        if (!mapArr.current[j][i]) {
          randomFoodArrs.push([i, j]);
        }
      }
    }
    const len = randomFoodArrs.length;
    const randoms = Math.floor(Math.random() * len);
    const [x, y] = randomFoodArrs[randoms];
    food.current = { x, y };
  };

  // 吃食物
  const eatFood = () => {
    const head = snakes.current[0];
    const nextStep = nextStepFn(head.x, head.y, head.dir);
    const { x, y } = head;
    const f = food.current;
    if (x === f.x && y === f.y) {
      snakes.current = [nextStep, ...snakes.current];
      refreshFood();
    }
  };

  // 游戏结束
  const gameOver = () => {
    const head = snakes.current[0];
    if (
      head.x < 0 ||
      head.x >= w ||
      head.y < 0 ||
      head.y >= h ||
      snakes.current.find(
        (e, index) => index !== 0 && e.x === head.x && e.y === head.y
      )
    ) {
      messageApi.open({
        type: "warning",
        content: "你输了",
      });
      clearInterval(intervalId);
      return true;
    }
    return false;
  };

  // 游戏胜利
  const win = () => {
    if (snakes.length === w * h) {
      messageApi.open({
        type: "success",
        content: "你胜利了",
      });
      clearInterval(intervalId);
      return true;
    }
    return false;
  };

  return (
    <div className="tcs">
      {contextHolder}
      <TitleBar title="贪吃蛇" />
      <Button onClick={initial}>重新开始</Button>
      <div className="tcs-content">
        {moveArr.map((i, i_index) => (
          <div className="tcs-row" key={`tcs_${i_index}`}>
            {i.map((j, j_index) => (
              <div
                className={j ? "tcs-piece-1" : "tcs-piece-0"}
                key={`tcs_${i_index}_${j_index}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
