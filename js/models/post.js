define([
    'underscore',
    'backbone',
    'models/model'
], function(_, Backbone, Model){
    var PostModel = Model.extend({
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
