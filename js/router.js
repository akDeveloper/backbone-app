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
            var self = this;
            require(['views/'+resource+'/edit'], function(View) {

                if (self.editView) {
                    self.editView.undelegateEvents();
                    $(self.editView.el).empty();
                }
                self.editView = new View();
                self.editView.render();

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

        Backbone.history.start({pushState: true});
        //
        $(document).on('click', 'a:not([data-bypass])', function (evt) {

            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
                evt.preventDefault();
                app_router.navigate(href, true);
            }
        });
    };

    return {
        initialize: initialize
    };
});
