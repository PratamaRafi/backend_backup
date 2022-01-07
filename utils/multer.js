const multer = require("multer");
const { parse_to_extension } = require("./files");
const upload = multer({ 
  limits: {
    fileSize: process.env.MAX_FILE_SIZE
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/users")
    },
    filename: async (req, file, cb) => {
      const unique = Date.now() + Math.round(Math.random() * 1E9);
      const ext = parse_to_extension(file.mimetype);
      cb(null, `${unique}.${ext}`)
    }
  })
});

module.exports = upload;