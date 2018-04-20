class Paging {
  // 参数初始化
  constructor(options) {
    let defaultOptions = {
      element: null, // Dom节点
      buttonCount: 10, // 显示的按钮个数
      currentPage: 1, // 当前页
      totalPage: 15, // 总页数
    }
    this.options = Object.assign({}, defaultOptions, options)
    console.log(this.options)
    this.checkOptions().initHtml()
  }
  // 检测参数
  checkOptions() {
    // 否是设置element参数
    if (!this.options.element) {
      throw new Error('element is required')
    }
    return this
  }
  // 初始化DOM节点
  initHtml() {
    let { currentPage } = this.options
    let domNode 
    domNode += `<div class="paging">`
    domNode += `<button class="first ${currentPage == 1 ? disabled : ''}">首页</button>`
    domNode += `<button class="prev ${currentPage == 1 ? disabled : ''}">上一页</button>`
    domNode += `<ul>`
    domNode += `<li class="${currentPage == 1 ? selected : ''}"><i>1</i></li>`;
    
    if(totalPage - buttonCount == 1 && totalPage == currentPage ){

    }

    if(totalPage - buttonCount == 1 && totalPage > currentPage ){
      
    }

    // let domNode = `
    // <div class="paging">
    //   <button class="first disabled">首页</button>
    //   <button class="prev disabled">上一页</button>
    //   <ul>
    //     <li class="selected"><i>1</i></li>
    //     <li class="num_ellipsis"><i>...</i></li>
    //     <li><i>2</i></li>
    //     <li><i>3</i></li>
    //     <li><i>4</i></li>
    //     <li><i>5</i></li>
    //     <li><i>6</i></li>
    //     <li><i>7</i></li>
    //     <li><i>8</i></li>
    //     <li><i>9</i></li>
    //     <li class="num_ellipsis"><i>...</i></li>
    //     <li><i>10</i></li>
    //   </ul>
    //   <button class="next">下一页</button>
    //   <button class="last">末页</button>
    // </div>
    // `
    let ele = document.querySelector(this.options.element);
    ele.innerHTML = domNode
    return this;
  }
}