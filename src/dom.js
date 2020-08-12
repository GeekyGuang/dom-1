window.dom = {
  create: function (string) {
    // template可以容纳任何元素
    let container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  // 可以省去 : function
  // 把node2放到node1的后面
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
  append(parent, child) {
    parent.appendChild(child);
  },
  // 新增父节点
  wrap(parent, node) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    //node.remove()
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const { childNodes } = node;
    const array = [];

    // for (let i = 0; i < childNodes.length; i++) {
    //   array.push(dom.remove(childNodes[i]));
    // }
    // length是实时变化的，上面方法不可行

    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  // 设置/获取属性
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; // ie
      } else {
        node.textContent = string; // firefox
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, value) {
    if (arguments.length === 2) {
      node.innerHTML = value;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div, {color: 'red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    // const div = dom.find("#test")[0]
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
