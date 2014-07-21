define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showHome',

            'projects': 'showProjects',

              // Default
            '*actions': 'defaultAction'
        },
        showProjects: function() {
            console.log('projects');
        },
        showHome: function() {
            console.log('home');
        },
    });

    var initialize = function() {
        var app_router = new AppRouter;

        // Default
        app_router.on('route:defaultAction', function(actions){
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
