const app = Sammy('#rooter', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', homeController.getHome);

    //User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.postLogout);

    //Recipe
    this.get('#/recipeDetails/:recipeId', recipeController.getRecipeDetails);

    this.get('#/create', recipeController.getCreateRecipe);
    this.post('#/create', recipeController.postCreateRecipe);

    /*//Movie
    this.get('#/cinema', movieController.getAllMovies);
    this.get('#/myMovies', movieController.getMyMovies);
    this.get('#/eventDetails/:movieId', movieController.getMovieDetails);

    this.get('#/create', movieController.getCreateMovie);
    this.post('#/create', movieController.postCreateMovie);

    this.get('#/edit/:movieId', movieController.getEditMovie);
    this.post('#/edit/:movieId', movieController.postEditMovie);

    this.get('#/delete/:movieId', movieController.getDeleteMovie);
    this.post('#/delete/:movieId', movieController.postDeleteMovie);*/
});

(() => {
    app.run('#/home');
})();