const multer = require("multer");

// Allowed Image MIME Types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg'
];

// Basic File Signature Check
const checkFileSignature = (buffer) => {
  // JPEG Signature
  const jpegSignature = Buffer.from([0xFF, 0xD8, 0xFF]);
  
  // PNG Signature
  const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
  
  // GIF Signature
  const gifSignature = Buffer.from([0x47, 0x49, 0x46]);

  return (
    buffer.slice(0, 3).equals(jpegSignature) || 
    buffer.slice(0, 4).equals(pngSignature) ||
    buffer.slice(0, 3).equals(gifSignature)
  );
};

// Image Filter Function
const imageFilter = (req, file, cb) => {
  // MIME Type Validation
  const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
  
  if (!isMimeValid) {
    return cb(new Error(`Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`), false);
  }

  // Optional: File Size Check
  const fileSize = parseInt(req.headers['content-length']);
  if (fileSize > 1 * 1024 * 1024) { // 1MB limit
    return cb(new Error('File size exceeds 1MB'), false);
  }

  cb(null, true);
};

// Multer Configuration
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
    files: 1
  }
});

module.exports = { upload };
