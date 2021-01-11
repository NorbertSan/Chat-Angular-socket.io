import express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  return res.json('user route');
});

export default router;
