define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/posts/list.mustache',
    'collections/posts'
], function(
    $,
    _,
    Backbone,
    Mustache,
    listTemplate,
    PostsCollection
){
    var PostsListView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {

            this.collection = new PostsCollection();
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
