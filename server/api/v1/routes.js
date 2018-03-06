const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Hellow Router' });
});

router.get('/nmd', function(req, res) {
  res.json({ message: 'Full Stack Developer' });
});

module.exports = router;