const fetch = require("isomorphic-fetch");

fetch("https://picsum.photos/id/1037/2000/3000", {
  method: "HEAD"
}).then(console.log);
