const fs = require("fs");

const copySampleSync = path => {
  if (!fs.existsSync(path)) {
    fs.copyFileSync(`${path}.sample`, path);
  }
};

copySampleSync("./src/features.js");
copySampleSync("./src/headers.js");
