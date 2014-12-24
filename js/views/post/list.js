define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/posts/list.mustache',
    'collections/post'
], function(
    $,
    _,
    Backbone,
    Mustache,
    listTemplate,
    PostCollection
){
    var PostsListView = Backbone.View.extend({
        el: $('.main'),
        collection: new PostCollection(),
        initialize: function() {

            var self = this;
            this.collection.fetch({
                success: function(collection, response, options) {
                    self.render();

                },
                error: function(collection, response, options) {

                }
            });
        },

        render: function() {
            var compiledTemplate = Mustache.render(
                    listTemplate,
                    {items: this.collection.toJSON()}
            );

            this.$el.html(compiledTemplate);

        }
    });

    return PostsListView;
});
