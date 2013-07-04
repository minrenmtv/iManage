var TodoView = Backbone.View.extend({

  tagName: "div",

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  // The DOM events specific to an item.
  events: {
    "click .messageArea" : "editDetail",
    // "click a.delete-todo" : "clear",
    // "keypress .edit"  : "updateOnEnter",
    // "click a.save-todo": "save",
    // "mouseenter": "highlightItem",
    // "mouseleave": "dehighlightItem",
    // "drop": "drop",
    // "cancelTask": "cancelTask"
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    // this.listenTo(this.model, 'change', this.render);
    // this.listenTo(this.model, 'reset', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    

  },

  // Re-render the titles of the todo item.
  render: function() {
    
    this.$el.html(this.template(this.model.toJSON()));
    // this.$el.toggleClass('done', this.model.get('done'));
    // this.edit_title = this.$('.edit-title');
    // this.edit_category = this.$('.edit-category');
    // this.edit_priority = this.$('.edit-priority');

    // this.$('input').uniform();
    //this.$('select').uniform();
    return this;
  },

  highlightItem: function() {
    this.$el.addClass('show');
  },
  dehighlightItem: function() {
    this.$el.removeClass('show');
  },
  // Toggle the `"done"` state of the model.
  toggleDone: function() {
    this.model.toggle();
  },
  save: function() {
    
    this.model.save({
      title: this.edit_title.val(),
      category: this.edit_category.val(),
      priority: this.edit_priority.val()
    });
    // Todos.sort();
    this.$el.removeClass('editing');
    return false;

  },
  cancelTask: function() {
    this.$el.removeClass('editing');

  },
  // Switch this view into `"editing"` mode, displaying the input field.
  edit: function() {
    this.$el.addClass('editing');
    this.$('.edit-title').select();
    return false;
  },
  editDetail: function() {
    // console.log("in edit detail");
    $("#task-list li").removeClass("selected");
    if (window.singleView) {
      window.singleView.undelegateEvents();
    }
    window.singleView = new singleTodo(this.model);
    $("section.list").addClass("detail-view");
    $("section.detail").addClass("detail-view");
    this.$("li").addClass("selected");
    $(document).trigger('refresh');
  },

  // Close the `"editing"` mode, saving changes to the todo.
  close: function() {

    var value = this.edit_title.val();
    if (!value) {
      this.clear();
    } else {
      this.model.save({title: value});
      this.$('.edit').hide();
      this.$('.view').show();
    }
  },

  // If you hit `enter`, we're through editing the item.
  updateOnEnter: function(e) {
    if (e.keyCode == 13) this.save();
  },

  drop: function(event, index){
    this.$el.trigger('update_sort', [this.model, index]);
  },

  // Remove the item, destroy the model.
  clear: function() {
    var that = this;
    this.$el.fadeOut(500, function(){
      that.model.destroy();
    });
    return false;
  }

});
