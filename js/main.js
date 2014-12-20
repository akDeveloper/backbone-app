window.onerror = function(message, url, line, col, error) {
    // Available in gecko engines.
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;

    console.log("Error: " + message + "\nurl: " + url + "\nline: " + line + extra);

    return true;
};

require.config({
    paths: {
        templates: '../templates',
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        bootstrap: 'libs/bootstrap.min',
        mustache: 'libs/mustache/mustache'
    }
});

require(['app'], function(App) {

    App.initialize();
});
