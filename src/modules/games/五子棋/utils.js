const directions = [
  { deltaX: 1, deltaY: 0 }, // 左右
  { deltaX: 0, deltaY: 1 }, // 上下
  { deltaX: -1, deltaY: 1 }, // 斜线
  { deltaX: -1, deltaY: -1 }, // 反斜线
];

export const isWin = (i, j, flag, arr) => {
  const checkDirection = (x, y, deltaX, deltaY) => {
    let maxLen = 1;
    let [xs, ys] = [x + deltaX, y + deltaY];
    while (arr[xs]?.[ys] === flag) {
      maxLen++;
      [xs, ys] = [xs + deltaX, ys + deltaY];
    }
    [xs, ys] = [x - deltaX, y - deltaY];
    while (arr[xs]?.[ys] === flag) {
      maxLen++;
      [xs, ys] = [xs - deltaX, ys - deltaY];
    }
    return maxLen > 4;
  };
  return directions.some((direction) =>
    checkDirection(i, j, direction.deltaX, direction.deltaY)
  );
};
