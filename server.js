import express from 'express';
import path from 'path';

// this config can not be get from config.js currently
const port = process.env.HUNTER_PORT || '50080';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
