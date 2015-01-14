// 焦点图
var t = n = 0, count = $("#playShow a").size();
$(function(){
$("#playShow a:not(:first-child)").hide();
$("#playText").html($("#playShow a:first-child").find("img").attr('alt'));
$("#playNum a:first").css({"background":"#fd6300",'color':'#fff'});
$("#playText").click(function(){window.open($("#playShow a:first-child").attr('href'), "_blank")});
$("#playNum a").click(function() {
   var i = $(this).text() - 1;
   n = i;
   if (i >= count) return;
   $("#playText").html($("#playShow a").eq(i).find("img").attr('alt'));
   $("#playText").unbind().click(function(){window.open($("#playShow a").eq(i).attr('href'), "_blank")})
   $("#playShow a").filter(":visible").hide().parent().children().eq(i).fadeIn(1200);
   $(this).css({"background":"#fd6300",'color':'#fff'}).siblings().css({"background":"#323232",'color':'#fff'});
});
t = setInterval("showAuto()", 3000);
$("#play").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 3000);});
})
function showAuto()
{
n = n >= (count - 1) ? 0 : ++n;
$("#playNum a").eq(n).trigger('click');
}




