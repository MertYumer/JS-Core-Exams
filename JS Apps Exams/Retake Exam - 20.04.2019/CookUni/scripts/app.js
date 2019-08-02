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

    this.get('#/edit/:recipeId', recipeController.getEditRecipe);
    this.post('#/edit/:recipeId', recipeController.postEditRecipe);

    this.get('#/delete/:recipeId', recipeController.postDeleteRecipe);
});

(() => {
    app.run('#/home');
})();