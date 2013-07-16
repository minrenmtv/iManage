var ContextList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: Context,

  // Save all of the todo items under the `"todos-backbone"` namespace.
  // localStorage: new Backbone.LocalStorage("todos-backbone"), //use default sync as storage
  url: function() {
    return 'https://api.mongolab.com/api/1/databases/manage/collections/context/?apiKey=r76SDfb5rGAWTe2a7Ln5T0-X6ewKls4m';
  },

  initialize: function() {
    
  }
  
});

// Create our global collection of **Todos**.
var Contexts = new ContextList;