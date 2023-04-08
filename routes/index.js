const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

// Get movies page

const Movie = require('../models/Movie.model.js');

router.get('/movies', (req, res, next) => {
   Movie.find()
      .then((allMoviesFromDB) => {
         console.log('All movies from DB');
         res.render('movies', { movies: allMoviesFromDB });
      })
      .catch((error) => {
         console.log('Error while getting the books from the DB: ', error);

         // Call the error-middleware to display the error page to the user
         next(error);
      });
});

// Delete a movie

router.post('/movies/:id/delete', (req, res) => {
   Movie.findByIdAndDelete(req.params.id)
      .then((response) => {
         res.render('action-completed');
      })
      .catch((err) => console.log(err));
});

//Update a movie
// Get the movies by ID and use  a form
router.get('/movies/:id/edit', (req, res) => {
   Movie.findById(req.params.id)
      .then((movie) => {
         res.render('edit-movie', { movie }); // to pass the object to the edit-movie view
      })
      .catch((err) => console.log(err));
});

// Updating the Database
router.post('/movies/:id/edit', (req, res) => {
   const editedMovie = req.body;
   Movie.findByIdAndUpdate(req.params.id, editedMovie)
      .then((response) => {
         res.render('action-completed');
      })
      .catch((err) => console.log(err));
});

module.exports = router;
