import express from 'express';
const app = express();
const PORT = 3000;

app.use('/backroute', require('./backroute'));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

