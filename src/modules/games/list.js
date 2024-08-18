import React from "react";
import { useNavigate } from "react-router";
import "./list.less";
import TitleBar from "../../common/components/TitleBar";

// const fs = require("fs");
// const path = require("path");

// try {
//   const files = fs.readdirSync("/path/to/directory");
//   files.forEach((file) => {
//     let filePath = path.join("/path/to/directory", file);
//     const stats = fs.statSync(filePath);
//     if (stats.isFile()) {
//       console.log(`文件: ${filePath}`);
//     } else if (stats.isDirectory()) {
//       console.log(`目录: ${filePath}`);
//     }
//   });
// } catch (err) {
//   console.error(err);
// }

export default function List(props) {
  const navigate = useNavigate();
  const gameList = [
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "五子棋",
      path: "/games/五子棋",
    },
    {
      name: "贪吃蛇",
      path: "/games/俄罗斯方块",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
    {
      name: "贪吃蛇",
      path: "/games/贪吃蛇",
    },
  ];
  return (
    <div className="games">
      <TitleBar title="小游戏" />
      <div className="games-lists">
        {gameList.map((e, index) => (
          <div
            key={`${e.name}_${index}`}
            className="games-lists-list"
            onClick={() => {
              navigate(e.path);
            }}
          >
            {e.name}_{index}
          </div>
        ))}
      </div>
    </div>
  );
}
