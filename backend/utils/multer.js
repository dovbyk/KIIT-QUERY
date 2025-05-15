const multer = require("multer");
const storage = multer.memoryStorage(); // Store in memory, not in disk
const upload = multer({ storage });

module.exports = upload;

