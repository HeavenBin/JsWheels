

/**
 * @author HeavenBin <1302888286@qq.com>
 * @desc https://github.com/HeavenBin
 */

const myAjax = function (URL, fn) {
  var xhr = createXHR(); //返回了一个对象，这个对象IE6兼容。
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        fn(xhr.responseText);
      } else {
        alert("错误的文件！");
      }
    }
  };
  xhr.open("get", URL, true);
  xhr.send();

  //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
  function createXHR() {
    //本函数来自于《JavaScript高级程序设计 第3版》第21章
    if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp"
          ],
          i, len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //skip
          }
        }
      }

      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      throw new Error("No XHR object available.");
    }
  }
},