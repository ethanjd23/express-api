const express = require('express');
let router = express.router();

router.get('/:id'), (req, res) => {
    res.send("chirps");
};

module.exports = router;