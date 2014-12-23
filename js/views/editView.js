define([
    'jquery',
    'underscore',
    'backbone',
    'mustache'
], function(
    $,
    _,
    Backbone,
    Mustache
){
    var AbstractEditView = Backbone.View.extend({
        init: function() {
            if (this.model) {
                this.render();
            } else {
                var self = this;
                this.collection.fetch({
                    success: function(collection, response, options) {
                        self.model = collection.findWhere({id: self.id});
                        self.render();
                    },
                    error: function(model, response, options) {
                    }
                });
            }
        }
    });

    return AbstractEditView;
});
