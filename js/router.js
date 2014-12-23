define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var AppRouter = Backbone.Router.extend({
        execute: function(callback, args) {
            if (callback) callback.apply(this, args);
            $('.nav a').parent().removeClass('active');
            $('a[href="'+location.pathname+'"]').parent().addClass('active');
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

                if (self.listView) {
                    self.listView.undelegateEvents();
                    $(self.listView.el).empty();
                }
                self.listView = new View();
            });
        },
        editResource: function(resource, id) {
            var self = this;
            require(['views/'+resource+'/edit'], function(View) {

                if (self.editView) {
                    self.editView.undelegateEvents();
                    $(self.editView.el).empty();
                }
                if (self.listView) {
                    var collection = self.listView.collection;
                    var model = self.editView.collection.findWhere({id: id});

                    self.editView = new View({collection: collection, model: model});

                } else {
                    self.editView = new View({id: id});
                }

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
