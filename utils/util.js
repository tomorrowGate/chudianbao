const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

/* 封装promise */
function wxPromisify() {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
    })
}
module.exports = {
  wxPromisify: wxPromisify
}

function throttle(fn, delay = 1000) {
  let prev = 0; 
  return function () {
    console.log(prev)
    let curr = Date.now();
    if (curr - prev > delay) {
      console.log("surr")
      prev = curr;
    }
  }
}
module.exports = {
  throttle: throttle
}