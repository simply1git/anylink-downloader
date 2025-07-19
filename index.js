const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/download', (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  const cmd = `yt-dlp -j "${url}"`;

  exec(cmd, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to process URL' });
    }

    try {
      const data = JSON.parse(stdout);
      return res.json(data);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).json({ error: 'Parsing error' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));