var TodoList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: Todo,

  // Save all of the todo items under the `"todos-backbone"` namespace.
  // localStorage: new Backbone.LocalStorage("todos-backbone"), //use default sync as storage
  url: function() {
    return 'https://api.mongolab.com/api/1/databases/manage/collections/test/?apiKey=r76SDfb5rGAWTe2a7Ln5T0-X6ewKls4m';
  },

  initialize: function() {
    this.sort();
  },

  // Filter down the list of all todo items that are finished.
  done: function() {
    return this.where({done: true});
  },

  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    return this.without.apply(this, this.done());
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },
  
  comparator: function(item){
    return [item.get("datetime_created"), item.get("done")];
  },

  getTodayList: function() {
    return _.filter(this.models, function(item){ return item.get('datetime_created') > XDate.today() });
  },

  getPreviousList: function() {
    return _.filter(this.models, function(item){ return item.get('datetime_created') < XDate.today() });
  }
  
});

// Create our global collection of **Todos**.
var Todos = new TodoList;