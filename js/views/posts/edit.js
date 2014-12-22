define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/posts/edit.mustache',
    'models/post',
    'domReady',
    'tinymce'
], function(
    $,
    _,
    Backbone,
    Mustache,
    editTemplate,
    PostModel,
    domReady,
    tinymce
){
    var PostEditView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {
            this.model = new PostModel({title: 'Test', slug: 'test'});
        },

        events: {
            'submit form': 'save'
        },

        render: function() {
            var compiledTemplate = Mustache.render(
                    editTemplate,
                    {item: this.model.toJSON()}
            );

            this.$el.html(compiledTemplate)

            for (var i = 0; i < tinymce.editors.length; i++) {
                tinymce.editors[i].remove()
            };
            tinymce.init({
                selector : "textarea#post-content",
                theme: "modern",
                menubar: false,
                statusbar: false,
                plugins: [
                     "advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker",
                     "visualblocks visualchars code fullscreen media nonbreaking",
                     "table directionality paste"
               ],
               toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | preview media fullpage",
            });
        },
        save: function(e) {
            e.preventDefault();
            console.log(e);
            var form = $(e.currentTarget);

            console.log(form.serializeArray());
        }
    });

    return PostEditView;
});
