var Todo = Backbone.Model.extend({

  url: function() {
    var modelId = this.id || '';
    return 'https://api.mongolab.com/api/1/databases/manage/collections/test/' + modelId + '?apiKey=r76SDfb5rGAWTe2a7Ln5T0-X6ewKls4m';
  },

  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: "What to do next ...",
      done: false,
      priority: true,  //true for no star... this is backwards...
      category: '',
      datetime_created: Date.now(),
      datetime_due: Date.now(),
      datetime_finished: '',
      timeAssigned: '',
      notes: ''
    };
  },

  // Toggle the `done` state of this todo item.
  toggleComplete: function() {
    if (this.get('datetime_finished') == '') {
      var newDate = Date.now();
    } else {
      var newDate = '';
    }
    this.save({done: !this.get("done"), datetime_finished: newDate});
  },

  parse: function(resp) {
    resp.id = resp._id.$oid;
    return resp;
  },

  toJSON: function() {
    var attrs = _.omit(this.attributes, 'id');
    if (!_.isUndefined(this.id))  {
      attrs._id = { $oid: this.id };
    }
    return attrs;
  },
  toggleStar: function() {
    this.save({priority: !this.get("priority")});
  }

});