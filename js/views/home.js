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
        initialize: function() {
        },

        render: function() {
            var compiledTemplate = Mustache.render(homeTemplate);

            console.log(this.el);
            this.$el.html(compiledTemplate);
        }
    });

    return HomeView;
});
