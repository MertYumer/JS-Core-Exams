const helper = function () {
    const handler = function (response) {
        if (response.status >= 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        if (response.status !== 204) {
            response = response.json();
        }

        return response;
    };

    const addHeaderInfo = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        if (loggedIn) {
            context.firstName = JSON.parse(storage.getData('userInfo')).firstName;
            context.lastName = JSON.parse(storage.getData('userInfo')).lastName;
        }
    };

    return {
        handler,
        addHeaderInfo
    };
}();