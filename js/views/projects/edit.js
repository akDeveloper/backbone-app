define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/projects/edit.mustache',
    'models/project',
    'collections/projects',
    'views/editView'
], function(
    $,
    _,
    Backbone,
    Mustache,
    editTemplate,
    ProjectModel,
    ProjectCollection,
    editView
){
    var ProjectEditView = editView.extend({
        el: $('.main'),
        collection: new ProjectCollection(),
        initialize: function() {
            this.init();
        },

        events: {
            'submit #project-edit': 'save'
        },

        render: function() {
            var compiledTemplate = Mustache.render(
                    editTemplate,
                    {item: this.model.toJSON()}
            );

            this.$el.html(compiledTemplate)
        },
        save: function(e) {
            e.preventDefault();
            var form = $(e.currentTarget);

            this.model.setAttributes(form.serialize(), 'post');
            this.model.save();
        }
    });

    return ProjectEditView;
});
