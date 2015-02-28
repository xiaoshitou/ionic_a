var webRoot ='http://alex1.nat123.net/sshe/';
function login(){
	$.ui.showMask(); 
	var param = {
		         name:$('#txtusername').val(),
	             pwd:$('#txtpassword').val()
	            };
	var url=webRoot + 'userAction!login.action';
      $.ajax({
      	 url:url,
	     data:param,
	     dataType:"jsonp",
	     jsonp:"callback",
	     success:function (data) {
	     	$.ui.hideMask(); 
	       $("#afui").popup(data.code);
	      },
	     error:function(){ 
	     	$.ui.hideMask(); 
	     	$("#afui").popup("fail");
	     }
     });
}


