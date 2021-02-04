/**
  // global filters
  import * as filters from './filters'

  // register global utility filters
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
*/



/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    {
      value: 1E18,
      symbol: 'E'
    },
    {
      value: 1E15,
      symbol: 'P'
    },
    {
      value: 1E12,
      symbol: 'T'
    },
    {
      value: 1E9,
      symbol: 'G'
    },
    {
      value: 1E6,
      symbol: 'M'
    },
    {
      value: 1E3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  if (!num) {
    return num
  }
  if (isNaN(num - 0)) {
    return ''
  }

  let ss = num.toString().split('.');
  let str = ss[0].toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  if (ss[1]) {
    str += '.' + ss[1]
  }
  return str;
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}




/**
 * 显带*号的 身份证号码
 * @param {String} string
 */
export function certFilter(v) {
  if (!v) {
    return ''
  }
  let left = v.slice(0, 6)
  let right = v.slice(-4)
  return left + '*'.repeat(6) + right
}

/**
 * 显带*号的 手机号码
 * @param {String} string
 */
export function mobileFilter(v) {
  if (!v) {
    return ''
  }
  let left = v.slice(0, 3)
  let right = v.slice(-4)
  return left + '*'.repeat(4) + right
}



/**
 * 显带*号的 密码
 * @param {String} string
 */
export function pwdFilter(v) {
  let ss = v.length + 1;
  return new Array(ss).join('*');
}

export function cardFilter(v) {
  let ss = v.split('');
  let map = [4, 8, 12, 16, 20];
  for (let i of map) {
    if (ss[i]) {
      ss[i] = ' ' + ss[i]
    }
  }
  // let ss = v.length + 1;
  return ss.join('');
}
