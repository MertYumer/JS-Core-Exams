const homeController = function () {
    const getHome = async function (context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            const url = `/appdata/${storage.appKey}/recipes`;
            const authorizationType = 'Kinvey';

            await requester.get(url, authorizationType)
                .then(response => response.json())
                .then(recipes => {
                    context.recipes = recipes;
                });
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            noRecipesView: './views/recipes/noRecipesView.hbs',
            recipeView: './views/recipes/recipeView.hbs'

        }).then(function () {
            this.partial('./views/home/homePage.hbs')
        })
    };

    return {
        getHome
    }
}();