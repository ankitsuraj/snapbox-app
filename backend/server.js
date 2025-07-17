const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage }).array('photos', 4);

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) return res.status(500).send('Upload failed');
    res.json({ message: 'Success', files: req.files });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
