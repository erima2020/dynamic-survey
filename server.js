const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
let cachedContent = {};
// middlewares
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Expires', '-1');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(express.static(path.join(__dirname, 'build')));

app.post("/upload", (req, res) => {
  cachedContent = req.body;
  return res.status(200).send({
    data: cachedContent
  });
});
app.get("/response", (req, res) => {
  res.header('Cache-Control', 'max-age=-1');
  return res.status(200).send({
    data: cachedContent,
  });
});
app.disable('etag');
// frontend deployment
app.get('/', (req,res) => {
  // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Cache-Control', 'max-age=-1');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
 res.sendFile(path.join(__dirname, 'build/index.html'));
});

// setting up the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is listening at PORT ${PORT}`));
