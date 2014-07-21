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
            require(['views/projects/list'], function(ProjectsListView) {

                var listView = new ProjectsListView();
                listView.render();
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
        app_router.on('route:defaultAction', function(actions){
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
