const router = require('express').Router();

const Movie = require('../models/Movie.model.js');

router.get('/movies', (req, res) => {
   Movie.find()
      .then((allMoviesFromDB) => {
         console.log('All movies from DB');
         res.render('movies.hbs', allMoviesFromDB);
      })
      .catch((error) => {
         console.log('Error while getting the books from the DB: ', error);

         // Call the error-middleware to display the error page to the user
         next(error);
      });
});
