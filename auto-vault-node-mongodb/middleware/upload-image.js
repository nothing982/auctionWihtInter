const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: 'AKIA33D6RRDYDKWD7ZCQ',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: 'autovault-images',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'Testing Metadata' });
    },
    key: (req, file, cb) => {
      cb(null, uuidv4());
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = uploadS3;
