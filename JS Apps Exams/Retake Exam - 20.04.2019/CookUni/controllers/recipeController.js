const recipeController = function () {
    const getCreateRecipe = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',

        }).then(function () {
            this.partial('./views/recipes/createRecipe.hbs')
        })
    };

    const postCreateRecipe = function (context) {
        const url = `/appdata/${storage.appKey}/recipes`;
        const authorizationType = 'Kinvey';

        const data = {...context.params};

        requester
            .post(url, authorizationType, data)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
                console.log(data);
            });
    };

    const getRecipeDetails = async function (context) {
        helper.addHeaderInfo(context);

        const id = context.params.recipeId;
        const url = `/appdata/${storage.appKey}/recipes/${id}`;
        const authorizationType = 'Kinvey';

        await requester.get(url, authorizationType)
            .then(response => response.json())
            .then(recipe => {
                context.recipe = recipe;
            });

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'

        }).then(function () {
            this.partial('./views/recipes/recipeDetails.hbs');
        });
    };

    return {
        getCreateRecipe,
        postCreateRecipe,
        getRecipeDetails
    }
}();