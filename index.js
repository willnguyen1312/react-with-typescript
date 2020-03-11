const { debounce } = require("lodash");

const debouncedLog = debounce(
  number => {
    console.log(number);
  },
  250,
  { leading: true, trailing: false }
);

debouncedLog(100);
debouncedLog(200);
debouncedLog(300);
