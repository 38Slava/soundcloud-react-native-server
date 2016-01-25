'use strict';

const express = require('express');
const router = express.Router();
const Soundcloud = require('../services/soundcloud/soundcloud');

router.get('/', function(req, res, next) {
  const sc = new Soundcloud();
  sc.getAccessToken()
    .then((accesToken) => {
      sc.getFavorites(accesToken)
        .then((favorites) => {
          res.send(favorites);
        });
    });
});

module.exports = router;
