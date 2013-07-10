var Context = Backbone.Model.extend({

  url: function() {
    var contextId = this.id || '';
    return 'https://api.mongolab.com/api/1/databases/manage/collections/context/' + contextId + '?apiKey=r76SDfb5rGAWTe2a7Ln5T0-X6ewKls4m';
  },

  // Default attributes for the todo item.
  defaults: function() {
    return {
      name: '',
      color: ''
    };
  },



});