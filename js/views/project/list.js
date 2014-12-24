define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/projects/list.mustache',
    'collections/project'
], function(
    $,
    _,
    Backbone,
    Mustache,
    listTemplate,
    ProjectCollection
){
    var ProjectsListView = Backbone.View.extend({
        el: $('.main'),
        collection: new ProjectCollection(),
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

    return ProjectsListView;
});
