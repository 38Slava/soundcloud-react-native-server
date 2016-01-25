'use strict';

const SC = require('soundcloud-nodejs-api-wrapper');

class Soundcloud {
  constructor() {
    this.credentials = {
      client_id: '22c5569228f11a3ca18af46a7c6f24ca',
      client_secret: '3a6a9aa599ecbe5d7e27f4b981f30507',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD'
    };
    this.sc = new SC(this.credentials);
    this.client = this.sc.client();
  }
  _clientNew(accessToken) {
    return this.sc.client({
      access_token: accessToken
    });
  }
  getAccessToken() {
    return new Promise((resolve, reject) => {
      this.client.exchange_token(function(err, result) {
        if (err) reject(err);
        let accessToken = arguments[3].access_token;
        resolve(accessToken);
      });
    });
  }
  getMe(accessToken) {
    return new Promise((resolve, reject) => {
      const clientNew = this._clientNew(accessToken);
      clientNew.get('/me', {
        limit: 1
      }, (err, result) => {
        if (err) reject(err);
        resolve(result); // should show a json object of your soundcloud user 
      });
    });
  }
  getFollowings(accessToken) {
    return new Promise((resolve, reject) => {
      const clientNew = this._clientNew(accessToken);
      clientNew.get('/me/followings', {
        limit: 100
      }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  getFollowers(accesToken) {
    return new Promise((resolve, reject) => {
      const clientNew = this._clientNew(accesToken);
      clientNew.get('/me/followers', {
        limit: 20
      }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  getFavorites(accesToken) {
    return new Promise((resolve, reject) => {
      const clientNew = this._clientNew(accesToken);
      clientNew.get('/me/favorites', {
        limit: 150
      }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Soundcloud;
