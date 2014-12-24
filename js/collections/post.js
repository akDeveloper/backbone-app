define([
    'underscore',
    'backbone',
    'models/post',
    'localstorage'
], function(_, Backbone, PostModel) {
    var PostCollection = Backbone.Collection.extend({
        model: PostModel,
        url: '/posts',
        localStorage: new Backbone.LocalStorage('demo')
    });

    return PostCollection;
});
