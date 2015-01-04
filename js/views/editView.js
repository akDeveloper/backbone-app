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
            var self = this;
            this.collection.fetch({
                success: function(collection, response, options) {
                    var hit;
                    if (hit = collection.findWhere({id: self.id})) {
                        self.model = hit;
                    }
                    self.render();
                },
                error: function(model, response, options) {
                }
            });
        }
    });

    return AbstractEditView;
});
