const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', homeController.getHome);

    //User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.postLogout);

    //Song
    this.get('#/allSongs', songController.getAllSongs);
    this.get('#/mySongs', songController.getMySongs);

    this.get('#/create', songController.getCreateSong);
    this.post('#/create', songController.postCreateSong);

    this.get('#/edit/:songId', songController.getEditSong);
    this.post('#/edit/:songId', songController.postEditSong);

    this.get('#/delete/:songId', songController.postDeleteSong);
});

(() => {
    app.run('#/home');
})();