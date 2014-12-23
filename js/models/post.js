define([
    'underscore',
    'backbone',
    'models/model'
], function(_, Backbone, Model){
    var PostModel = Model.extend({
        url: function() {
            return "http://localhost:5984/demo/posts/"+ (this.id || '');
        },
        initialize: function() {
        },
        defaults: {
        }
    });

    return PostModel;
});
