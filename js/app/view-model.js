var singleTodo = Backbone.View.extend({
  el: $("#single-detail"),

  template: _.template($('#single-detail-template').html()),

  initialize: function(model) {
    this.model = model;

    //this.listenTo(this.model, 'change', this.render);

    this.due_field = this.$(".datepicker");

    this.render(model);
  },

  events: {
    "click input#save": "saveDetail",
    "click input#close": "closeDetail",
    "click #delete": "deleteDetail",
    "change #complete": "toggleComplete",
    "click h5": "toggleTitleEdit",
    "click #saveTitle": "saveTitle",
    "click #closeTitle": "closeTitle",
    "keypress input": "saveTitleOnEnter"
    // "click a.save": "save",
    // "click div.task": "editTitle",
    // "click div.category": "editCategory"
  },
  render: function(model) {
    $("#single-detail").html(this.template(model.toJSON()));
  },
  closeDetail: function() {
    $("section.list").removeClass("detail-view");
    $("section.detail").removeClass("detail-view");
    this.$("li").removeClass("selected");
    this.undelegateEvents();
    this.$el.html("");
  },
  saveDetail: function() {
    this.model.save({
      datetime_due: function() {
        return this.due_field.datapicker('getDate').getTime();
      }
    });

  },
  deleteDetail: function() {
    var model = this.model;
    this.closeDetail();
    model.destroy();
    
  },
  toggleTitleEdit: function() {
    this.$(".titleViewRow").toggle();
    this.$(".titleEditRow").toggle();
    this.$(".titleEditRow input").focus();
  },
  saveTitle: function() {
    var newtitle = this.$(".titleEditRow input").val();
    this.$(".titleViewRow h5").html(newtitle);
    this.model.save({"title": newtitle});
    this.closeTitle();
  },
  saveTitleOnEnter: function(e) {
    if(e.which == 13) {
      this.saveTitle();
    }
  },
  closeTitle: function() {
    this.$(".titleViewRow").toggle();
    this.$(".titleEditRow").toggle();
  },
  openDetail: function() {
    console.log("opening detail");
  },
  editCategory: function() {

  },
  toggleComplete: function() {
    this.model.toggleComplete();
  }

});