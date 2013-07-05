var AppView = Backbone.View.extend({

  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: $("#todo-calendar"),

  // Delegated events for creating new items, and clearing completed ones.
  events: {

  },

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function() {

    Todos.fetch({
      success: this.render
    });
  },
  // Re-rendering the App just means refreshing the statistics -- the rest
  // of the app doesn't change.
  render: function() {
    var events = [];

    _.each(Todos.models, function(item){
      var event = {};
      event.id = item.id.oid;
      event.title = item.get('title');
      event.start = new Date(item.get('datetime_created'));
      event.end = new Date(item.get('datetime_finished'));

      events.push(event);
    }, this);

        
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: events
    });

  }


});

// Finally, we kick things off by creating the **App**.
var App = new AppView;