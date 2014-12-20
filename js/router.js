define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var AppRouter = Backbone.Router.extend({
        execute: function(callback, args) {
            console.log(location.hash);
            if (callback) callback.apply(this, args);
            $('.nav a').parent().removeClass('active');
            $('a[href="'+location.hash+'"]').parent().addClass('active');
        },
        routes: {
            '': 'showHome',

            ':resource': 'listResource',

            ':resource/:id/edit': 'editResource',

              // Default
            '*actions': 'defaultAction'
        },
        listResource: function(resource) {
            require(['views/'+resource+'/list'], function(View) {

                var listView = new View();
                listView.render();
            });
        },
        editResource: function(resource, id) {
            require(['views/'+resource+'/edit'], function(View) {

                var editView = new View();
                editView.render();
            });
        },
        showHome: function() {
            require(['views/home'], function(HomeView) {

                var homeView = new HomeView();
                homeView.render();
            });
        },
    });

    var initialize = function() {
        var app_router = new AppRouter;

        // Default
        app_router.on('route:defaultAction', function(actions) {

            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
