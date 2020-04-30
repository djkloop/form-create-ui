/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author        : djkloop
 * @Date          : 2020-04-30 11:46:35
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-30 12:34:30
 * @Description   : 重置readme.md里面的版本号
 * @FilePath      : /form-create-ui/scripts/reset.version.js
 */
const fs = require("fs");
const path = require("path");
const Version = require("../package.json").version;
const READMEPATH = path.join(__dirname, "../README.md");

console.log(READMEPATH);

fs.readFile(
  READMEPATH,
  {
    encoding: "utf8",
  },
  (err, files) => {
    const str = files.replace(/(?<=status).*?(?=versions)/g, ": " + Version + " ");
    fs.writeFile(
      READMEPATH,
      str,
      {
        encoding: "utf8",
      },
      err => {
        console.log(err);
      }
    );
  }
);
