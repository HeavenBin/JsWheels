/**
 * @author HeavenBin <1302888286@qq.com>
 * @desc https://github.com/HeavenBin
 */
let baseUrl = 'http//127.0.0.1:4000/'

export default async (url = '', data = {},type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  //URL + GET数据拼接的字符串
  function formatParams(data){
    if(data !== ''){
      let dataStr = '?';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      return dataStr
    }else {
      return ''
    }
  }

  // 暂时不用
  if (window.fetch && method === 'fetch' && false) {
    let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
      //添加body属性
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
    // console.log(requestConfig);
		try {
      const response = await fetch(url, requestConfig); // URL GET的时候未处理
			const responseJson = await response.json();
			return responseJson;
		} catch (error) {
			throw new Error(error)
		}
  } else {
    return new Promise((resolve, reject) => {
      let xhr = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHttp'); // IE6及以下
      
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          try{
            //此处不判断304，因为增加随机数后，不命中缓存
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
              let obj = xhr.response
              if (typeof obj !== 'object') { 
                obj = JSON.parse(xhr.response)
              }
              resolve(obj)
            } else {
              reject(xhr)
            }
          } catch (ex) {}
        }
      }

      if (type == 'GET') {
        let params = formatParams(data)        // GET  Url
        xhr.open(type, url + params, true);
        xhr.timeout = 10000;
        xhr.ontimeout = () => { console.log('请求超时'); }
        xhr.send(null);
      }else if (type == 'POST') {
        let setData = JSON.stringify(data)     // POST send
        xhr.open(type, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 模仿表单提交
        xhr.timeout = 10000;
        xhr.ontimeout = () => { console.log('请求超时'); }
        xhr.send(sendData);
      }else {
        xhr.open(type, url, true);
        xhr.timeout = 10000;
        xhr.ontimeout = () => { console.log('请求超时'); }
        xhr.send(null);

      
      }
    })
  }
}



