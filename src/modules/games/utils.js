const map = {
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
};

/**
 * 这是一个全局监听键盘上下左右的方法
 * @param {function} fn - 传入的回调函数.
 */
export const directionKey = (fn) => {
  document.addEventListener("keydown", function (event) {
    fn(map[event.key]);
  });
};
