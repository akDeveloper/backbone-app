define([
    'underscore',
    'backbone',
    'models/project',
], function(_, Backbone, ProjectModel) {
    var ProjectCollection = Backbone.Collection.extend({
        model: ProjectModel,
        url: '/projects',
        localStorage: new Backbone.LocalStorage('projects')
    });

    return ProjectCollection;
});
