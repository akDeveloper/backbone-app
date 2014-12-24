define([
    'underscore',
    'backbone',
    'models/model'
], function(_, Backbone, Model){
    var PostModel = Model.extend({
        table: 'demo',
        url: function() {
            return "/api/posts/"+ (this.id || '');
        },
        initialize: function() {
        },
        defaults: {
        }
    });

    return PostModel;
});
