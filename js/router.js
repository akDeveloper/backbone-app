define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var AppRouter = Backbone.Router.extend({
        listView: null,
        newView: null,
        editView: null,
        collections: {},
        execute: function(callback, args) {
            if (callback) callback.apply(this, args);
            $('.nav a').parent().removeClass('active');
            $('a[href="'+location.pathname+'"]').parent().addClass('active');
        },
        routes: {
            '': 'showHome',

            ':resource': 'listResource',

            ':resource/new': 'newResource',

            ':resource/:id/edit': 'editResource',

              // Default
            '*actions': 'defaultAction'
        },
        listResource: function(resource) {
            var self = this;
            require(['views/'+resource+'/list', 'collections/'+resource], function(View, Collection) {

                if (self.listView) {
                    self.listView.undelegateEvents();
                    $(self.listView.el).empty();
                }
                if (self.collections[resource]) {
                    self.listView = new View({collection: self.collections[resource]});
                    self.listView.render();
                } else {
                    var collection = new Collection();
                    collection.fetch({
                        success: function(collection, response, options) {
                            self.listView = new View({collection: collection});
                            self.collections[resource] = collection;
                            self.listView.render();
                        },
                        error: function(collection, response, options) {

                        }
                    });
                }
            });
        },
        newResource: function(resource) {
            var self = this;
            require(['views/'+resource+'/edit', 'models/'+resource, 'collections/'+resource], function(View, Model, Collection) {

                if (self.editView) {
                    self.editView.undelegateEvents();
                    $(self.editView.el).empty();
                }

                var model = new Model();
                if (self.collections[resource]) {
                    self.editView = new View({
                        model: model,
                        collection: self.collections[resource]
                    });
                    self.editView.render();
                } else {
                    var collection = new Collection();
                    collection.fetch({
                        success: function(collection, response, options) {
                            self.collections[resource] = collection;
                            self.editView = new View({
                                model: model,
                                collection: self.collections[resource]
                            });
                            self.editView.render();
                        },
                        error: function(collection, response, options) {

                        }
                    });
                }
            });
        },
        editResource: function(resource, id) {
            var self = this;
            require(['views/'+resource+'/edit', 'collections/'+resource], function(View, Collection) {

                if (self.editView) {
                    self.editView.undelegateEvents();
                    $(self.editView.el).empty();
                }
                if (self.collections[resource]) {
                    var model = self.collections[resource].findWhere({id: id});

                    self.editView = new View({collection: self.collections[resource], model: model});
                    self.editView.render();

                } else {
                    var collection = new Collection();
                    collection.fetch({
                        success: function(collection, response, options) {
                            self.editView = new View({model: model, collection: collection});
                            self.collections[resource] = collection;
                            self.editView.render();
                        },
                        error: function(collection, response, options) {

                        }
                    });
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
