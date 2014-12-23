define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/projects/edit.mustache',
    'models/project'
], function(
    $,
    _,
    Backbone,
    Mustache,
    editTemplate,
    ProjectModel
){
    var ProjectEditView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {
            this.model = new ProjectModel({title: 'Test', slug: 'test'});
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
