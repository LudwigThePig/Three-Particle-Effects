export const debounce = (fn, time) => {
  let timeout;

  return function () {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export const hexStringToInt = str => {
  let slice = '';
  if (str.length === 7) slice = str.slice(1);
  else {
    str
      .slice(1)
      .split('')
      .forEach(ch => (slice += ch + ch));
  }
  return res;
};
