const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64re = /^(?:[\d+/A-Za-z]{4})*?(?:[\d+/A-Za-z]{2}(?:==)?|[\d+/A-Za-z]{3}=?)?$/;

export const btoa = function (string) {
  string = String(string);
  let bitmap;
  let a;
  let b;
  let c;
  let result = '';
  let i = 0;
  const rest = string.length % 3;
  for (; i < string.length; ) {
    if (
      (a = string.codePointAt(i++)) > 255 ||
      (b = string.codePointAt(i++)) > 255 ||
      (c = string.codePointAt(i++)) > 255
    )
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      );
    bitmap = (a << 16) | (b << 8) | c;
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63);
  }
  return rest ? result.slice(0, rest - 3) + '==='.slice(Math.max(0, rest)) : result;
};

export const abob = function (string) {
  string = String(string).replace(/[\t\n\f\r ]+/g, '');
  if (!b64re.test(string))
    throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  string += '=='.slice(2 - (string.length & 3));
  let bitmap;
  let result = '';
  let r1;
  let r2;
  let i = 0;
  for (; i < string.length; ) {
    bitmap =
      (b64.indexOf(string.charAt(i++)) << 18) |
      (b64.indexOf(string.charAt(i++)) << 12) |
      ((r1 = b64.indexOf(string.charAt(i++))) << 6) |
      (r2 = b64.indexOf(string.charAt(i++)));
    result +=
      r1 === 64
        ? String.fromCodePoint((bitmap >> 16) & 255)
        : r2 === 64
        ? String.fromCodePoint((bitmap >> 16) & 255, (bitmap >> 8) & 255)
        : String.fromCodePoint((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
  }
  return result;
};
