/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 计算时间差
 */
export function validNum(endTime, createTime) {
  return parseInt((endTime - createTime) / 3600 / 1000);
}

/**
 * 验证有0-2位小数的正实数(校验金额)
 * @param str
 * @returns {boolean}
 */
export function validMoney(str) {
  return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(
    str
  );
}

/**
 * 用户名校验：只能数字英文_-，且3-16的长度
 * @param {string} str
 * @returns {Boolean}
 */
/*
export function validUsername(str) {
  return /^[a-z0-9_-]{3,16}$/.test(str);
}
*/

/**
 * 昵称校验：只能中文，数字，英文且长度为2-18
 * @param str
 * @returns {boolean}
 */
export function validNickName(str) {
  return !(
    /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]$/g.test(str) ||
    str.length < 2 ||
    str.length > 18
  );
}

/**
 * 密码校验：只能数字英文，且6-16的长度
 * @param str
 * @returns {boolean}
 */
export function validPassword(str) {
  return /^[a-zA-Z0-9]{6,16}$/.test(str);
}

/**
 * 校验支付密码
 * @param str
 * @returns {boolean}
 */
export function validPayPassword(str) {
  return /^[0-9]{6}$/.test(str);
}

export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

/**
 * 校验手机号
 */
export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

/**
 * 校验座机号码
 * 021-8541459
 */
export const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

export const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};

/**
 * 是否全部为数字
 */
export const isAllNumber = (s) => {
  return /^[0-9]+$/.test(s);
};

export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};

export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};

export const isNull = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null";
};

export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

export const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};

export const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};

export const isDate = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date";
};

export const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "RegExp";
};

export const isError = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Error";
};

export const isSymbol = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Symbol";
};

export const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
};

export const isSet = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Set";
};

export function IEVersion(userAgent) {
  let isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  let isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      // console.log('IE7')
      return 7;
    } else if (fIEVersion == 8) {
      // console.log('IE8')
      return 8;
    } else if (fIEVersion == 9) {
      // console.log('IE9')
      return 9;
    } else if (fIEVersion == 10) {
      // console.log('IE10')
      return 10;
    } else {
      // console.log('IE版本小于等于7')
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    // console.log('edge')
    return "edge"; //edge
  } else if (isIE11) {
    // console.log('IE11')
    return 11; //IE11
  } else {
    // console.log('不是IE浏览器')
    return -1; //不是ie浏览器
  }
}
