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

            this.collection.add({title: 'New Project', id: 1});
            this.collection.add({title: 'New Project 2', id: 2});
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
