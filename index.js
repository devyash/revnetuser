const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.set('view engine', 'ejs')

// var path = document.location.pathname;
// var __dirname = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
var db

MongoClient.connect('mongodb://dev:dev@ds143980.mlab.com:43980/revnetapp', (err, database) => {
  if (err) return console.log(err)
  db = database
	app.use(bodyParser.urlencoded({extended: true}))
	app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/index.html')
  
	})

	app.get('/users', (req, res) => {
  	db.collection('users').find().toArray(function(err, results) {
  	// send HTML file populated with quotes here
  	 res.render('viewusers.ejs', {users: results})
		})
	})


	app.get('/users/new', (req, res) => {

  	 res.render('newusers.ejs')

	})

	app.get('/users/search', (req, res) => {
  	db.collection('users').find().toArray(function(err, results) {
  	// send HTML file populated with quotes here
  	 res.render('searchusers.ejs', {users: results})
		})
	})

	app.post('/user/new', (req, res) => {
	 db.collection('users').save(req.body, (err, result) => {
	    if (err) return console.log(err)

	    console.log('saved to database')
	    res.redirect('/')
	  })
	})

	app.post('/user/search', (req, res) => {
	 user=db.collection('users').find(req.query.name)
	 res.render('viewusers.ejs', {users: user})
	})	

  app.listen(5000, () => {
    console.log('listening on 3000')
  })
})