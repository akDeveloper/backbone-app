define([
    'underscore',
    'backbone',
    'models/post',
    'localstorage'
], function(_, Backbone, PostModel) {
    var PostsCollection = Backbone.Collection.extend({
        model: PostModel,
        url: '/posts',
        localStorage: new Backbone.LocalStorage('demo')
    });

    return PostsCollection;
});
