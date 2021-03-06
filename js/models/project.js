define([
    'underscore',
    'backbone',
    'models/model'
], function(_, Backbone, Model){
    var ProjectModel = Model.extend({
        table: 'projects',
        url: function() {
            return "/api/projects/"+ (this.id || '');
        },
        initialize: function() {
        },
        defaults: {
        }
    });

    return ProjectModel;
});
