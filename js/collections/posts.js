define([
    'underscore',
    'backbone',
    'models/post',
], function(_, Backbone, PostModel) {
    var PostsCollection = Backbone.Collection.extend({
        model: PostModel,
        url: '/posts',
    });

    return PostsCollection;
});
