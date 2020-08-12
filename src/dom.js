window.dom = {};
dom.create = function (string) {
  // template可以容纳任何元素
  let container = document.createElement("template");
  container.innerHTML = string.trim();
  return container.content.firstChild;
};
