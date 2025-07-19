const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// 🟡 Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Serve static files
app.use('/uploads', express.static(uploadDir));

// 🔵 Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// 📸 Handle upload
app.post('/upload', upload.array('photos', 4), (req, res) => {
  console.log('Uploaded files:', req.files); // Debug
  res.json({ message: 'Upload successful', files: req.files });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
