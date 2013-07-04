$(document).on('ready refresh', function(){
  $('a[href="#"]').on('click', function(e){
    e.preventDefault();
  });
  $(document).on('keydown', function(e){
    if(e.ctrlKey && (e.which == 78)) {
      $("#todoapp").trigger("newTask");
    }
    if(e.which == 27) {
      $("#todoapp .edit").trigger("cancelTask");
    }
  });
  
  $('.on_off :checkbox, .on_off :radio').iButton({
      labelOn: "",
      labelOff: "",
      enableDrag: false 
  });
  $('.yes_no :checkbox, .yes_no :radio').iButton({
      labelOn: "On",
      labelOff: "Off",
      enableDrag: false
  });
  $('.enabled_disabled :checkbox, .enabled_disabled :radio').iButton({
      labelOn: "Enabled",
      labelOff: "Disabled",
      enableDrag: false
  });

  $('.tags').tagsInput({width:'100%'});

  $( ".datepicker" ).datepicker({ 
      defaultDate: +7,
      showOtherMonths:true,
      autoSize: true,
      appendText: '(dd-mm-yyyy)',
      dateFormat: 'dd-mm-yy'
  }); 
  $("select, .check, .check :checkbox, input:radio, input:file").uniform();

});
