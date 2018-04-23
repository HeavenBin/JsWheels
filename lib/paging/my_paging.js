class Paging {
  // 参数初始化
  constructor(options) {
    let defaultOptions = {
      element: null, // Dom节点
      buttonCount: 11, // 显示的按钮个数
      currentPage: 25, // 当前页
      totalPage: 50, // 总页数
      pageQuery: '', // 'page'
      // 方式一
      templates: {
        number: '<li data-page="%page%"><i>%page%</i></li>',
        prev: '<button class=prev>上一页</button>',
        next: '<button class=next>下一页</button>',
        first: '<button class=first>首页</button>',
        last: '<button class=last>末页</button>',
      }
    }
    this.options = Object.assign({}, defaultOptions, options)
    console.log(this.options)
    // 方式一
    this.domPart = {} // 片段节点
    this.checkOptions().initHtml().bindEvents()
  }
  // 检测参数
  checkOptions() {
    let { element, currentPage, buttonCount, totalPage } = this.options
    // 否是设置element参数
    if(!element) {
      throw new Error('element is required')
    }
    // 总页数>=显示按钮+2,总页数>=当前页
    if(totalPage < buttonCount + 2 || totalPage < currentPage){
      throw new Error('param is error')
    }

    return this
  }
  // 初始化DOM节点
  // 方式一
  initHtml() {
    let { templates } = this.options
    let domNode = document.createElement('div');
    domNode.className = 'paging';

    // 添加按钮类
    this.domPart.first = dom.create(templates.first)
    this.domPart.prev = dom.create(templates.prev)
    this.domPart.next = dom.create(templates.next)
    this.domPart.last = dom.create(templates.last)
    this._checkButtons()  // 检测设置button样式
    this.domPart.numbers = this._createNumbers() // 创建序列按钮
    domNode.appendChild(this.domPart.first);
    domNode.appendChild(this.domPart.prev);
    domNode.appendChild(this.domPart.numbers);
    domNode.appendChild(this.domPart.next);
    domNode.appendChild(this.domPart.last);

    let ele = document.querySelector(this.options.element);
    ele.appendChild(domNode); 

    return this;
  }

  // 检测设置button样式
  _checkButtons() {
    let { currentPage, totalPage } = this.options;
    if(currentPage === 1){
      this.domPart.first.classList.add('disabled');
      this.domPart.prev.classList.add('disabled');
    }else{
      this.domPart.first.classList.remove('disabled');
      this.domPart.prev.classList.remove('disabled');
    }
    if(currentPage === totalPage){
      this.domPart.next.classList.add('disabled');
      this.domPart.last.classList.add('disabled');
    }else{
      this.domPart.next.classList.remove('disabled');
      this.domPart.last.classList.remove('disabled');
    }
  }
  // 创建序列按钮
  _createNumbers() {
    
    let { currentPage, totalPage, buttonCount, templates } = this.options
    let ul = dom.create('<ul data-role="pageNumbers"></ul>')

    let start1 = Math.max(currentPage - Math.floor((buttonCount)/ 2), 2)            // 中间按钮左边位置序号
    let end1 = Math.min(start1 + buttonCount - 1, totalPage - 1)                    // 中间按钮右边位置序号

    let end2 = Math.min(currentPage +  Math.ceil((buttonCount)/ 2), totalPage - 1)  // 中间按钮右边位置序号
    let start2 = Math.max(end2 - buttonCount + 1, 2)                               // 中间按钮左边位置序号  
    
    let start = currentPage > Math.floor(buttonCount / 2) && currentPage < totalPage - Math.floor(buttonCount / 2)
                ? Math.max(start1,start2)
                : Math.min(start1,start2) // 得到左边按钮的序号

    let end = Math.max(end1,end2)       // 得到右边按钮的序号
    // console.log(start1,end1,start2,end2);

    ul.appendChild(dom.create(`<li data-page="1"><i>1</i></li>`))                     // 必然显示按钮1
    if(currentPage === 1){ ul.firstChild.classList.add('selected') }

    if(start > 2){ ul.appendChild(dom.create(`<li class="num_ellipsis"><i>...</i></li>`)) }

    for(let i = start; i <= end; i++){
      let li = dom.create(`${templates.number.replace(/%page%/g, i)}`)
      if(i === currentPage){
        li.classList.add('selected')
      }
      ul.appendChild(li)
    }

    if(end < totalPage - 1){ ul.appendChild(dom.create(`<li class="num_ellipsis"><i>...</i></li>`)) }

    ul.appendChild(dom.create(`<li data-page="${totalPage}"><i>${totalPage}</i></li>`))           // 必然显示按钮2
    if(currentPage === totalPage){ ul.lastChild.classList.add('selected') }

    return ul
  }  

  // 绑定事件
  bindEvents() {
    let ele = document.querySelector(this.options.element)
    dom.on(ele, 'click', 'ul[data-role="pageNumbers"]>li', (e, el) => {
      this._goToPage(parseInt(el.dataset.page, 10))
    })
    this.domPart.first.addEventListener('click', ()=>{this._goToPage(1)})
    this.domPart.last.addEventListener('click', ()=>{this._goToPage(this.options.totalPage)})
    this.domPart.prev.addEventListener('click', ()=>{this._goToPage(this.options.currentPage - 1)})
    this.domPart.next.addEventListener('click', ()=>{this._goToPage(this.options.currentPage + 1)})
  }

  // 跳转页面
  _goToPage(page){
    // 检测page数值
    if(!page || page > this.options.totalPage || page === this.options.currentPage){
      return
    }

    // 加入url参数
    if (this.options.pageQuery) {
      bom.queryString.set(this.options.pageQuery, page)
    }
    // 开始书写逻辑
    this.options.currentPage = page
    let ele = document.querySelector(this.options.element);
    // ele.dispatchEvent(dispatchEvent(new CustomEvent('pageChange', { detail: { page } }))) // 创建并触发自定义事件
    this._checkButtons()
    let newNumbers = this._createNumbers()
    let oldNumbers = this.domPart.numbers
    // console.log(newNumbers);
    oldNumbers.parentNode.replaceChild(newNumbers, oldNumbers)
    this.domPart.numbers = newNumbers
  }









  // 方式二
  _initHtml() {
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
    let { element, currentPage, buttonCount, totalPage } = this.options
    let domNode = '';
    domNode += `<div class="paging">`
    domNode += `<button class="first ${currentPage == 1 ? 'disabled' : ''}">首页</button>`
    domNode += `<button class="prev ${currentPage == 1 ? 'disabled' : ''}">上一页</button>`
    domNode += `<ul>`
    domNode += `<li class="${currentPage == 1 ? 'selected' : ''}"><i>1</i></li>`;
    // 显示按钮刚好等于页面数-2
    if(totalPage - 2 === buttonCount){

    }
    if(totalPage - 1 === buttonCount && totalPage == currentPage ){
      
    }
    if(totalPage - 1 > buttonCount && totalPage > currentPage ){

    }
    domNode += '</ul></div>'


    let ele = document.querySelector(element);
    ele.innerHTML = domNode

    return this;
  }

  
}