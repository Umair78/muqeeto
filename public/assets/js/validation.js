$(document).ready(function(){


 $('#newphone').keypress(function(event){
  var code = event.keyCode || event.which;
	if(code != 8 && isNaN(String.fromCharCode(code))){
    	event.preventDefault();
	}
    if($(this).val().length > 11){
      if(code != 8){
    	  event.preventDefault();
      }
	}

	var text = $(this).val();

	if(text.length == 4) {
    if(code !=8){
	   	$(this).val(text + '-');
    }
	}
});

 $('#newhomephone').keypress(function(event){
    var code = event.keyCode || event.which;
    if(code != 8 && isNaN(String.fromCharCode(code))){
        event.preventDefault();
    }
    if($(this).val().length > 9){
      if(code !=8){
          event.preventDefault();
      }
    }
});

  $('#phone-upd').keypress(function(event){
    var code = event.keyCode || event.which;
    if(code != 8 && isNaN(String.fromCharCode(code))){
        event.preventDefault();
    }
    if($(this).val().length > 11){
      if(code !=8){
        event.preventDefault();
      }
    }
    var text = $(this).val();
    if(text.length == 4) {
      if(code !=8){
        $(this).val(text + '-');
      }
    }
});


  $('#m_cell').keypress(function(event){
    var code = event.keyCode || event.which;
    if(code != 8 && isNaN(String.fromCharCode(code))){
        event.preventDefault();
    }
    if($(this).val().length > 11){
      if(code !=8){
        event.preventDefault();
      }
    }

    var text = $(this).val();

    if(text.length == 4) {
      if(code !=8){
        $(this).val(text + '-');
      }
    }
});

  $('#m_referencecontactno').keypress(function(event){
    var code = event.keyCode || event.which;
    if(code != 8 && isNaN(String.fromCharCode(code))){
        event.preventDefault();
    }
    if($(this).val().length > 11){
      if(code !=8){
        event.preventDefault();
      } 
    }

    var text = $(this).val();

    if(text.length == 4) {
      if(code !=8){
        $(this).val(text + '-');
      }
    }
});


 $('#newnic').keypress(function(event){
  var code = event.keyCode || event.which;
	if(code != 8 && isNaN(String.fromCharCode(code))){
    	event.preventDefault();
	}
    if($(this).val().length > 14){
      if(code !=8){
    	   event.preventDefault();
	    }
  }

	var text = $(this).val();
	if(text.length == 5) {
    if(code !=8){
		  $(this).val(text + '-');
    }
	}
	if(text.length == 13) {
    if(code !=8){
		  $(this).val(text + '-');
    }
	}
});


 $('#nic-upd').keypress(function(event){
    var code = event.keyCode || event.which;

  if(code != 8 && isNaN(String.fromCharCode(code))){
      event.preventDefault();
  }
    if($(this).val().length > 14){
      if(code !=8){
        event.preventDefault();
      }
  }

  var text = $(this).val();
  if(text.length == 5) {
      if(code !=8){
         $(this).val(text + '-');
       }
  }
  if(text.length == 13) {
    if(code !=8){
       $(this).val(text + '-');
    }
  }
});


 $("#newreg" ).submit(function( event ) {
 	var isphonevalid = false;
 	var isnicvalid = false;
 	var ispasswordmatch = false;

   if($('#vpassword').val() != $('#vcpassword').val() ){
  	 $('#alertpassword').show();
  	 ispasswordmatch = false;
   }
   else {
   		$('#alertpassword').hide();
   		ispasswordmatch = true;
   }
   if($('#newphone').val().length < 12){
   	 $('#alertphone').show();
   	 isphonevalid = false;
   }
   else{
   	 $('#alertphone').hide();
   	 isphonevalid = true;
   }
   if($('#newnic').val().length < 15){
   	 $('#alertnic').show();
   	 isnicvalid = false;
   }
   else{
   	 $('#alertnic').hide();
  	 isnicvalid = true;
   }

   if((isnicvalid && isphonevalid) && ispasswordmatch) {
   	//submitted the form
   }
   else{
  	 event.preventDefault();
   }
});

 $("#resetpform" ).submit(function( event ) {
  var pass1 = $('#passc1').val();
  var pass2 = $('#passc2').val();
  if(pass1 != pass2){
    event.preventDefault();
    $('#alertchangepass').show();
  }
});

 $("#userform-update" ).submit(function( event ) {
 	var isphonevalid = false;
 	var isnicvalid = false;

   if($('#phone-upd').val().length < 12){
   	 $('#alertphone-upd').show();
   	 isphonevalid = false;
   }
   else{
   	 $('#alertphone-upd').hide();
   	 isphonevalid = true;
   }
   if($('#nic-upd').val().length < 15){
   	 $('#alertnic-upd').show();
   	 isnicvalid = false;
   }
   else{
   	 $('#alertnic-upd').hide();
  	 isnicvalid = true;
   }

   if(isnicvalid && isphonevalid) {
   	//submitted the form
   	$('#update-successalert').show();
   }
   else{
  	 event.preventDefault();
   }
});

 
   $('.4digit').on({
       keypress: function (event) { 
        var code = event.keyCode || event.which;

        if(code != 8 && isNaN(String.fromCharCode(code))){
          event.preventDefault();
        }
          if($(this).val().length >= 4){
            if(code !=8){
              event.preventDefault();
            }
          }   
       }
    });

 $("#mform" ).submit(function( event ) {
   
    var goodtogo = true;
    var inputs=[];
    var m_name = $.trim($("#m_name").val());
    var m_fathername = $.trim($("#m_fathername").val());
    var date = $.trim($("#date").val());
    var newnic = $.trim($("#newnic").val());
    var newhomephone = $.trim($("#newhomephone").val());
    var m_cell = $.trim($("#m_cell").val());
    var m_picture = $.trim($("#m_picture-input").val());
    var comment = $.trim($("#comment").val());

    inputs.push(m_name,m_fathername,date,newnic,newhomephone,m_cell,m_picture,comment);

    for (var i = 0; i < inputs.length; i++) {
       if(inputs[i].length < 1){
          goodtogo = false;
          break;
       }
    }

    if(!goodtogo){
      event.preventDefault();
      $('#attentionModal').modal('show');
    }
});


$("#changepassform" ).submit(function( event ) {
   var pass1 = $("#chn_pass").val();
   var pass2 = $("#vcpassword").val();
   if(pass1 == pass2) {

   }
   else {
     $('#alertchangepasslebel').show();
     event.preventDefault();
   }
});

$("#resetpform" ).submit(function( event ) {
   var pass1 = $("#passc1").val();
   var pass2 = $("#passc2").val();
   if(pass1 == pass2) {

   }
   else {
     $('#alertresetpasslebel').show();
     event.preventDefault();
   }
});

});

