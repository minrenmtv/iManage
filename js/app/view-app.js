var AppView = Backbone.View.extend({

  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: $("#todoapp"),

  // Delegated events for creating new items, and clearing completed ones.
  events: {
    "click .ibutton-container": "toggleCompletion",
    "click #add": "addTask",
    "keypress #addText": "addTaskOnEnter"

    // "click #new-todo":  "createOnEnter",
    // "click #clear-completed": "clearCompleted",
    // "click #toggle-all": "toggleAllComplete",
    // "click #order-priority": "orderPriority",
    // "click #order-label": "orderLabel",

    // "newTask": "createOnEnter"
  },

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function() {

    this.newInput = this.$("#addText");
    this.listContainer = this.$("#task-list");
    //this.enableSortable();

    this.listenTo(Todos, 'addOne', this.addOne);
    //this.listenTo(Todos, 'change', this.render);
    this.listenTo(Todos, 'sync', this.render);

    // this.footer = this.$('footer');
    // this.main = $('#main');

    Todos.fetch();
    this.render();
  },
  // Re-rendering the App just means refreshing the statistics -- the rest
  // of the app doesn't change.
  render: function() {

    this.listContainer.html("");
    this.addAll();
  },

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne: function(todo) {

    var view = new TodoView({model: todo});
    // view.render();
    // Todos.sort();
    this.$("#task-list").append(view.render().el);
  },

  // Add all items in the **Todos** collection at once.
  addAll: function() {
    Todos.each(this.addOne, this);
  },

  // If you hit return in the main input field, create new **Todo** model,
  // persisting it to *localStorage*.
  addTask: function() {
    var newTodo = Todos.create({title: this.newInput.val()});
    this.newInput.val('');
    // Todos.trigger('edit', newTodo);
    // console.log(newTodo.$el);
  },
  addTaskOnEnter: function(e) {
    if (e.which == 13) {
      this.addTask();
    }
  },
  toggleCompletion: function() {
    this.$el.toggleClass("showCompletion");
    this.$el.toggleClass("hideCompletion");

    return false;
  },


  orderTitle: function() {
    Todos.comparator = 'title';
    // Todos.sort();
    // this.disableSortable();
  },

  orderPriority: function() {
    Todos.comparator = 'priority';
    // Todos.sort();
    // this.disableSortable();
  },

  orderCompletion: function() {
    Todos.comparator = 'done';
    // Todos.sort();
    // this.disableSortable();
  },
  orderLabel: function() {
    Todos.comparator = function(model){
      return model.get('category').toLowerCase();
    };
    // Todos.sort();
    // this.disableSortable();
  },

  // Clear all done todo items, destroying their models.
  clearCompleted: function() {
    _.invoke(Todos.done(), 'destroy');
    return false;
  },

  toggleAllComplete: function () {
    var done = this.allCheckbox.checked;
    Todos.each(function (todo) { todo.save({'done': done}); });
  }

});

// Finally, we kick things off by creating the **App**.
var App = new AppView;