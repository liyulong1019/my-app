export const nextStepFn = (x, y, dir) => {
  const dirMap = {
    up: { x, y: y - 1, dir },
    down: { x, y: y + 1, dir },
    left: { x: x - 1, y, dir },
    right: { x: x + 1, y, dir },
  };
  return dirMap[dir];
};
