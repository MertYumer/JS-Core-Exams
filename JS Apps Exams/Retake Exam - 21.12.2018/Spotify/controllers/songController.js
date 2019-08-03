const songController = function () {
    const getAllSongs = async function (context) {
        helper.addHeaderInfo(context);

        const url = `/appdata/${storage.appKey}/songs`;
        const authorizationType = 'Kinvey';

        await requester.get(url, authorizationType)
            .then(response => response.json())
            .then(songs => {
                context.songs = songs;
            });

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            songView: './views/songs/songView.hbs'

        }).then(function () {
            this.partial('./views/songs/allSongsView.hbs')
        });
    };

    const getMySongs = async function (context) {
        helper.addHeaderInfo(context);

        const url = `/appdata/${storage.appKey}/songs?query={"_acl.creator":"${JSON.parse(storage.getData('userInfo'))._id}"}`;
        const authorizationType = 'Kinvey';

        await requester.get(url, authorizationType)
            .then(response => response.json())
            .then(songs => {
                context.songs = songs;
            });

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            songView: './views/songs/songView.hbs'

        }).then(function () {
            this.partial('./views/songs/mySongsView.hbs')
        });
    };

    const getCreateSong = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'

        }).then(function () {
            this.partial('./views/songs/createSongView.hbs')
        });
    };

    const postCreateSong = function (context) {
        const url = `/appdata/${storage.appKey}/songs`;
        const authorizationType = 'Kinvey';
        const data = {...context.params};

        requester
            .post(url, authorizationType, data)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/allSongs');
            });
    };

    const getEditSong = async function (context) {
        helper.addHeaderInfo(context);

        const id = context.params.songId;
        const url = `/appdata/${storage.appKey}/songs/${id}`;
        const authorizationType = 'Kinvey';

        await requester.get(url, authorizationType)
            .then(response => response.json())
            .then(song => context.song = song);

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'

        }).then(function () {
            this.partial('./views/songs/editSongView.hbs')
        });
    };

    const postEditSong = function (context) {
        const id = context.params.songId;
        const url = `/appdata/${storage.appKey}/songs/${id}`;
        delete context.params.songId;
        const authorizationType = 'Kinvey';
        const data = {...context.params};

        requester
            .put(url, authorizationType, data)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/allSongs');
            });
    };

    const postDeleteSong = function (context) {
        const id = context.params.songId;
        const url = `/appdata/${storage.appKey}/songs/${id}`;
        const authorizationType = 'Kinvey';

        requester
            .del(url, authorizationType)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/allSongs');
            });
    };

    return {
        getAllSongs,
        getMySongs,
        getCreateSong,
        postCreateSong,
        getEditSong,
        postEditSong,
        postDeleteSong
    };
}();