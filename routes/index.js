'use strict';

const express = require('express');
const router = express.Router();
const Soundcloud = require('../services/soundcloud/soundcloud');


/* GET home page. */
router.get('/', function(req, res, next) {
  const sc = new Soundcloud();
  sc.getAccessToken()
    .then((accesToken) => {
      sc.getMe(accesToken)
        .then((me) => {
          res.send(me);
        });
    });
});

module.exports = router;
