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
        },
        events: {
            'click .delete': 'deleteItem'
        },
        render: function() {
            var compiledTemplate = Mustache.render(
                    listTemplate,
                    {items: this.collection.toJSON()}
            );

            this.$el.html(compiledTemplate);

        },
        deleteItem: function(e) {
            e.preventDefault();

            var $el = $(e.currentTarget);
            var id = $el.attr('data-id');

            var model = this.collection.findWhere({id: id});
            this.collection.remove(model);
            model.destroy();

            $el.parents('tr').remove();
        }
    });

    return PostsListView;
});
