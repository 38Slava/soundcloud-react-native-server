'use strict';

const express = require('express');
const router = express.Router();
const Soundcloud = require('../services/soundcloud/soundcloud');

router.get('/', function(req, res, next) {
  const sc = new Soundcloud();
  sc.getAccessToken()
    .then((accesToken) => {
      sc.getFollowers(accesToken)
        .then((followers) => {
          res.send(followers);
        });
    });
});

module.exports = router;
