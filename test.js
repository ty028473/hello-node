const fs = require("fs");

new Promise((resolve, reject) => {
  fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
      reject;
      console.log(err);
    } else {
      resolve(data);
      console.log(data);
    }
  });
});
