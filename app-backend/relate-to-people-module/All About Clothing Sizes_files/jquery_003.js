!function(t){var e=t.fancybox
e.helpers.buttons={defaults:{skipSingle:!1,position:"top",tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(t,e){return t.skipSingle&&e.group.length<2?(e.helpers.buttons=!1,void(e.closeBtn=!0)):void(e.margin["bottom"===t.position?2:0]+=30)},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(n,i){var a=this.buttons
a||(this.list=t(n.tpl).addClass(n.position).appendTo("body"),a={prev:this.list.find(".btnPrev").click(e.prev),next:this.list.find(".btnNext").click(e.next),play:this.list.find(".btnPlay").click(e.play),toggle:this.list.find(".btnToggle").click(e.toggle),close:this.list.find(".btnClose").click(e.close)}),i.index>0||i.loop?a.prev.removeClass("btnDisabled"):a.prev.addClass("btnDisabled"),i.loop||i.index<i.group.length-1?(a.next.removeClass("btnDisabled"),a.play.removeClass("btnDisabled")):(a.next.addClass("btnDisabled"),a.play.addClass("btnDisabled")),this.buttons=a,this.onUpdate(n,i)},onUpdate:function(t,e){var n
this.buttons&&(n=this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),e.canShrink?n.addClass("btnToggleOn"):e.canExpand||n.addClass("btnDisabled"))},beforeClose:function(){this.list&&this.list.remove(),this.list=null,this.buttons=null}}}(jQuery)