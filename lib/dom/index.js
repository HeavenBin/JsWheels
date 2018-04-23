/**
 * @author HeavenBin <1302888286@qq.com>
 * @desc https://github.com/HeavenBin
 */

let dom = {
  /**
   * @func
   * @desc DOM绑定事件
   * @param {ele} element - dom节点
   * @param {string} eventType - 事件类型
   * @param {string} selector - 选择器
   * @param {func} fn - 回调函数
   */
  on: function(element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
      let el = e.target
      while (!el.matches(selector)) {  // 选择器否/是目标元素
        // 书写者自己的思路,无需理解
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return element
  },

  onSwipe: function(element, fn) {
    let x0, y0
    element.addEventListener('touchstart', function(e) {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    })
    element.addEventListener('touchmove', function(e) {
      if (!x0 || !y0) {
        return
      }
      let xDiff = e.touches[0].clientX - x0
      let yDiff = e.touches[0].clientY - y0

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          fn.call(element, e, 'right')
        } else {
          fn.call(element, e, 'left')
        }
      } else {
        if (yDiff > 0) {
          fn.call(element, e, 'down')
        } else {
          fn.call(element, e, 'up')
        }
      }
      x0 = undefined
      y0 = undefined
    })
  },

  index: function(element) {
    let siblings = element.parentNode.children
    for (let index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index
      }
    }
    return -1
  },

  uniqueClass: function(element, className) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className)
    })
    element.classList.add(className)
    return element
  },

  every: function(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i)
    }
    return nodeList
  },

  /**
   * @func
   * @desc 创建Dom节点
   * @param {string} html - html字符串
   * @param {ele}    children - n个Dom节点
   */
  // http://stackoverflow.com/a/35385518/1262580
  create: function(html, children) {
    var template = document.createElement('template')
    template.innerHTML = html.trim()
    let node = template.content.firstChild
    if (children) {
      dom.append(node, children)
    }
    return node
  },

  /**
   * @func
   * @desc 添加n个dom节点
   * @param {ele} parent - Dom节点
   * @param {ele} children - n个Dom节点 
   */
  append: function(parent, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (let i = 0; i < children.length; i++) {
      parent.appendChild(children[i])
    }
    return parent
  },

  prepend: function(parent, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (let i = children.length - 1; i >= 0; i--) {
      if (parent.firstChild) {
        parent.insertBefore(children[i], parent.firstChild)
      } else {
        parent.appendChild(children[i])
      }
    }
    return parent
  },
  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild)
    }
    return this
  },

  dispatchEvent: function(element, eventType, detail) {
    let event = new CustomEvent(eventType, { detail })
    element.dispatchEvent(event)
    return this
  },
}
