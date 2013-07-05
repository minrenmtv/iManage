var singleTodo = Backbone.View.extend({
  el: $("#single-detail"),

  template: _.template($('#single-detail-template').html()),

  initialize: function(model) {
    this.model = model;

    //this.listenTo(this.model, 'change', this.render);


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
    "keypress input": "saveTitleOnEnter",
    "changeDate .datepicker": "changeDueDate"
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
    var dueDatetime = this.$(".datepicker").datepicker('getDate').getTime();
    var timeAssigned = this.$("select[name='timeAssigned']").val();
    var tags = this.$("[name='category']").val();
    var notes = this.$("[name='notes']").val();
    console.log(dueDatetime);

    this.model.save({
      datetime_due: dueDatetime,
      timeAssigned: timeAssigned,
      category: tags,
      notes: notes
    });

    this.closeDetail();

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
  changeDueDate: function() {

    var newDueDate = $(".datepicker").datepicker('getDate');
    var dateCreated = new Date(this.model.attributes.datetime_created);
    var diff = newDueDate - dateCreated;
    if (diff > 0) {
      var day = diff / ( 24 * 60 * 60 * 1000);
      if (day >= 1) {
        $("select[name='timeAssigned']").val("-1");
        $.uniform.update("select[name='timeAssigned']");
      }
      
    }


  },
  toggleComplete: function() {
    this.model.toggleComplete();
  }

});