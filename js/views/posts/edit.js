define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/posts/edit.mustache',
    'models/post'
], function(
    $,
    _,
    Backbone,
    Mustache,
    editTemplate,
    PostModel
){
    var PostEditView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {
            this.model = new PostModel({title: 'Test', slug: 'test'});
        },

        render: function() {
            var compiledTemplate = Mustache.render(
                editTemplate,
                {item: this.model.toJSON()}
            );

            require(['text!templates/projects/list.mustache'], function(template){
                console.log(template);
            });

            this.$el.html(compiledTemplate);
        }
    });

    return PostEditView;
});
