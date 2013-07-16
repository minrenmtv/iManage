var ContextAppView = Backbone.View.extend({

  el: $("#context-list"),

  template: _.template($('#context-list-template').html()),

  // Delegated events for creating new items, and clearing completed ones.
  events: {
    "addContext": "addContext"
  },

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function() {

    Contexts.fetch({
      success: this.render
    });
    
  },

  render: function() {
    _.each(Contexts.models, function(item){
      ContextApp.$el.append(ContextApp.template(item.toJSON()));
    }, this);    
  },

  addContext: function() {
    var newContext = Contexts.create({name: "default context", color: "red"});

  }




});

// Finally, we kick things off by creating the **App**.
var ContextApp = new ContextAppView;