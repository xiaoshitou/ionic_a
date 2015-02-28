var webRoot ='http://alex1.nat123.net/sshe/';
var page =1;
var rows =10;
function datagrid(){
	var merchantListVal="";
	var param = {page:page,rows:rows,sort:"name",order:"asc"};
	var url=webRoot + 'userAction!datagrid.action';
      $.ajax({
      	 url:url,
	     data:param,
	     dataType:"jsonp",
	     jsonp:"callback",
	     success:function (data) {
	        var rows=data.rows;
	        console.log("datagrid success! total is:"+data.total);
			for (var i = 0; i < rows.length; i++) {
				merchantListVal+='<li><a href="#">'+rows[i].name+'</a></li>';
			}
			$("#merchantList").append(merchantListVal);	
	      },
	     error:function(){ 
	     	$("#afui").popup("fail");
	     }
     });
}
//------------scroller begin---------------//	
var myScroller;
$.ui.ready(function () {
    myScroller = $("#merchantList").scroller();
    myScroller.addInfinite();
    myScroller.addPullToRefresh();
    myScroller.runCB=true;
    
    var hideClose;
    $.bind(myScroller, "refresh-release", function () {
        var that = this;
        console.log("Refresh release");
        clearTimeout(hideClose);
        hideClose = setTimeout(function () {
            console.log("hiding manually refresh");
            that.hideRefresh();
        }, 3000);
        return false; //tells it to not auto-cancel the refresh
    });

    $.bind(myScroller, "refresh-cancel", function () {
        clearTimeout(hideClose);
        console.log("cancelled");
    });
    myScroller.enable();

    $.bind(myScroller, "infinite-scroll", function () {
        var self = this;
        console.log("infinite triggered");
        $(this.el).append("<div id='infinite' style='border:2px solid black;margin-top:10px;width:100%;height:20px'>Fetching content...</div>");
        $.bind(myScroller, "infinite-scroll-end", function () {
            $.unbind(myScroller, "infinite-scroll-end");
            self.scrollToBottom();
            $(self.el).find("#infinite").remove();
            self.clearInfinite();
            datagrid();
            self.scrollToBottom();
            page++;
        });
    });
});
//------------scroller end----------------//
