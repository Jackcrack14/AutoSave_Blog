const multer = require("multer");

const storage = multer.memoryStorage();

// Explicit list of allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

const imageFilter = async (req, file, cb) => {
  try {
    // First check: Basic MIME type validation
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
    
    if (!isMimeValid) {
      return cb(new Error(`Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`));
    }

    // Second check: File signature validation
    if (!file.buffer) {
      return cb(new Error('File buffer is missing'));
    }

    const type = await fromBuffer(file.buffer);
    const isSignatureValid = type && ALLOWED_MIME_TYPES.includes(type.mime);

    if (!isSignatureValid) {
      return cb(new Error('File content does not match its type'));
    }

    cb(null, true);
  } catch (error) {
    cb(error);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
    files: 1
  }
});

module.exports = {upload};