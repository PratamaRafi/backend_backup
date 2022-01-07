const util = require("util");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const root = require("../app");

exports.parse_to_extension = (mime_type) => {
  return mime_type.split("/")[1];
};

exports.save_file = async (file, filename) => {
  if (!filename) throw new Error("filename is required for function to run");
  const pipeline = util.promisify(stream.pipeline);
  if (!fs.existsSync("assets/users")) {
    fs.mkdirSync("assets/users/");
    fs.mkdirSync("assets/app/");
    if (!fs.existsSync("assets/users")) throw new Error("failed making directory");
  }
  const filepath = "assets/users/" + filename;
  const write_stream = fs.createWriteStream(filepath);
  console.log(file);
  await pipeline(file, write_stream);
  console.log("ok");
  return filepath;
};

exports.delete_file = async (filename) => {
  fs.unlink(root + "/assets/" + filename, (error) => {
    if (error) console.log(error);
  });
};
