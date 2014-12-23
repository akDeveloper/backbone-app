define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/home.mustache',
], function(
    $,
    _,
    Backbone,
    Mustache,
    homeTemplate
){
    var HomeView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {
        },

        render: function() {
            var compiledTemplate = Mustache.render(homeTemplate);

            this.$el.html(compiledTemplate);
        }
    });

    return HomeView;
});
