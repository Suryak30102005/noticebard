function onYouTubeIframeAPIReady(){jQuery(document).trigger("JetYouTubeIframeAPIReady",[YT])}!function(c,r,g){"use strict";function t(t){this.$el=c(t),this.$container=this.$el.closest(".jet-smart-listing__heading"),this.$container.find(".jet-smart-listing__title").length?this.$heading=this.$container.find(".jet-smart-listing__title"):this.$heading=this.$container.find(".jet-smart-listing__title-placeholder"),this.settings=c.extend({icon:'<span class="jet-blog-icon"><i class="fa fa-ellipsis-h"></i></span>',className:"jet-smart-listing__filter-item jet-smart-listing__filter-more"},this.$el.data("more")),this.containerWidth=0,this.itemsWidth=0,this.heading=0,this.init()}var p={YT:null,updateCurrentPage:{},init:function(){var t={"jet-blog-smart-listing.default":p.initSmartListing,"jet-blog-smart-tiles.default":p.initSmartTiles,"jet-blog-text-ticker.default":p.initTextTicker,"jet-blog-video-playlist.default":p.initPlayList};c.each(t,function(t,e){r.hooks.addAction("frontend/element_ready/"+t,e)}),window.elementorFrontend.elements.$window.on("elementor/nested-tabs/activate",(t,e)=>{e=c(e);p.reinitWidgetsHandlers(e),p.initWidgetsHandlers(e)})},reinitWidgetsHandlers:function(t){t=t.find(".slick-initialized");t.length&&t.each(function(){c(this).slick("unslick")})},initWidgetsHandlers:function(t){t.find(".elementor-widget-jet-blog-smart-tiles, .elementor-widget-jet-blog-text-ticker").each(function(){var t=c(this),e=t.data("element_type");e&&("widget"===e&&(e=t.data("widget_type"),window.elementorFrontend.hooks.doAction("frontend/element_ready/widget",t,c)),window.elementorFrontend.hooks.doAction("frontend/element_ready/global",t,c),window.elementorFrontend.hooks.doAction("frontend/element_ready/"+e,t,c))})},initPlayList:function(i){var t=c(".jet-blog-playlist",i),e=c(".jet-blog-playlist__item-index",t),a=t.data("hide-index"),s=c(".jet-blog-playlist__item-duration",t),n=t.data("hide-duration"),r=c(".jet-blog-playlist__item-thumb",t),o=t.data("hide-image"),d=elementorFrontend.getCurrentDeviceMode();-1!=a.indexOf(d)&&e.css("display","none"),-1!=n.indexOf(d)&&s.css("display","none"),-1!=o.indexOf(d)&&r.css("display","none"),c(window).on("resize orientationchange",function(){d=elementorFrontend.getCurrentDeviceMode(),-1!=a.indexOf(d)?e.css("display","none"):e.css("display","block"),-1!=n.indexOf(d)?s.css("display","none"):s.css("display","block"),-1!=o.indexOf(d)?r.css("display","none"):r.css("display","block")}),void 0!==YT.Player?p.initPlayListCb(i,YT):c(document).on("JetYouTubeIframeAPIReady",function(t,e){p.initPlayListCb(i,e)})},initPlayListCb:function(t,e){null===p.YT&&(p.YT=e),t.hasClass("players-initialized")||(t.addClass("players-initialized"),p.switchVideo(t.find(".jet-blog-playlist__item.jet-blog-active")),t.on("click.JetBlog",".jet-blog-playlist__item",function(){t.find(".jet-blog-playlist__canvas").addClass("jet-blog-canvas-active"),p.switchVideo(c(this))}),t.on("click.JetBlog",".jet-blog-playlist__canvas-overlay",p.stopVideo))},initTextTicker:function(t){var n=null,r=t.find(".jet-text-ticker__posts"),t=r.data("typing"),e=r.data("slider-atts");function o(t){var e,i,a,s;t.length&&(e=0,i=t.closest(".jet-text-ticker__item-typed"),a=t.data("typing-text"),s=a.length,i.addClass("jet-text-typing"),t.text(a.substr(0,e++)),n=setInterval(function(){e<=s?t.text(a.substr(0,e++)):(clearInterval(n),i.removeClass("jet-text-typing"))},40))}t&&(r.on("init",function(t,e){o(c('[data-slick-index="'+e.currentSlide+'"] .jet-text-ticker__item-typed-inner',r))}),r.on("beforeChange",function(t,e,i,a){var s=c('[data-slick-index="'+i+'"] .jet-text-ticker__item-typed',r),i=c('[data-slick-index="'+i+'"] .jet-text-ticker__item-typed-inner',r),a=c('[data-slick-index="'+a+'"] .jet-text-ticker__item-typed-inner',r);clearInterval(n),s.removeClass("jet-text-typing"),i.text(""),o(a)})),r.slick(e)},initSmartListing:function(s){var n,t=elementorFrontend.getCurrentDeviceMode(),e=window.elementorFrontend.isEditMode(),r=s.data("id"),o=c(".jet-smart-listing-wrap",s),d=o.data("settings"),i=(p.updateCurrentPage[r]||(p.updateCurrentPage[r]={updatePage:0}),s.on("click.JetBlog",".jet-smart-listing__filter-item a",p.handleSmartListingFilter),s.on("click.JetBlog",".jet-smart-listing__arrow",p.handleSmartListingPager),s.find(".jet-smart-listing__filter")),l=(i.data("rollup")&&i.JetBlogMore(),c(document).trigger("jet-blog-smart-list/init",[s,p]),p.breakpointsPosts(o));function a(){var t=elementorFrontend.getCurrentDeviceMode(),e=c(".jet-smart-listing__filter",s),i=e.find(".jet-active-item a").data("term"),a={};n=p.currentBreakpointPosts(l,t),p.updateCurrentPage[r].updatePage=1,o.hasClass("jet-processing")||(o.addClass("jet-processing"),a={paged:1,posts_per_page:n},e[0]&&(a.term=i),c.ajax({url:g.ajaxurl,type:"POST",dataType:"json",data:{action:"jet_blog_smart_listing_get_posts",jet_request_data:a,jet_widget_settings:d}}).done(function(t){var e=o.find(".jet-smart-listing__arrows");o.removeClass("jet-processing").find(".jet-smart-listing").html(t.data.posts),e.length&&e.replaceWith(t.data.arrows)}).fail(function(){o.removeClass("jet-processing")}))}"yes"!=d.is_archive_template&&(e?c(window).on("resize.JetBlog orientationchange.JetBlog",p.debounce(50,a)):c(window).on("orientationchange.JetBlog",p.debounce(50,a)),"desktop"!=t)&&(i=JSON.parse(d.custom_query),e={},n=i&&i.posts_per_page?i.posts_per_page:p.currentBreakpointPosts(l,t),o.hasClass("jet-processing")||(o.addClass("jet-processing"),e={paged:1,posts_per_page:n},c.ajax({url:g.ajaxurl,type:"POST",dataType:"json",data:{action:"jet_blog_smart_listing_get_posts",jet_request_data:e,jet_widget_settings:o.data("settings")}}).done(function(t){var e=o.find(".jet-smart-listing__arrows");o.removeClass("jet-processing").find(".jet-smart-listing").html(t.data.posts),e.length&&e.replaceWith(t.data.arrows)}).fail(function(){o.removeClass("jet-processing")})))},initSmartTiles:function(t){t=t.find(".jet-smart-tiles-carousel");if(0===t.length)return!1;var e=t.data("slider-atts");t.slick(e)},stopVideo:function(t){var t=c(t.currentTarget).closest(".jet-blog-playlist__canvas"),e=t.data("player"),i=t.data("provider");t.hasClass("jet-blog-canvas-active")&&(t.removeClass("jet-blog-canvas-active"),p.pauseCurrentPlayer(e,i))},switchVideo:function(t){var e=t.closest(".jet-blog-playlist").find(".jet-blog-playlist__canvas"),i=t.closest(".jet-blog-playlist").find(".jet-blog-playlist__counter-val"),a=t.data("id"),s=e.find("#embed_wrap_"+a),n=t.data("player"),r=t.data("provider"),o=e.data("player"),d=e.data("provider");if(n&&(p.startNewPlayer(n,r),e.data("provider",r),e.data("player",n)),o&&p.pauseCurrentPlayer(o,d),i.length&&i.html(t.data("video_index")),t.siblings().removeClass("jet-blog-active"),t.hasClass("jet-blog-active")||t.addClass("jet-blog-active"),!s.length){switch(s=c('<div id="embed_wrap_'+a+'"></div>').appendTo(e),r){case"youtube":p.intYouTubePlayer(t,{id:a,canvas:e,currentPlayer:o,playerTarget:s,height:t.data("height"),videoId:t.data("video_id")});break;case"vimeo":p.intVimeoPlayer(t,{id:a,canvas:e,currentPlayer:o,playerTarget:s,html:c.parseJSON(t.data("html"))})}s.addClass("jet-blog-playlist__embed-wrap")}s.addClass("jet-blog-active").siblings().removeClass("jet-blog-active")},intYouTubePlayer:function(i,a){var t=c('<div id="embed_'+a.id+'"></div>').appendTo(a.playerTarget);new p.YT.Player(t[0],{height:a.height,width:"100%",videoId:a.videoId,playerVars:{showinfo:0,rel:0},events:{onReady:function(t){i.data("player",t.target),a.currentPlayer&&t.target.playVideo(),a.canvas.data("provider","youtube"),a.canvas.data("player",t.target)},onStateChange:function(t){var e=i.find(".jet-blog-playlist__item-index");if(e.length)switch(t.data){case 1:e.removeClass("jet-is-paused").addClass("jet-is-playing"),a.canvas.hasClass("jet-blog-canvas-active")||a.canvas.addClass("jet-blog-canvas-active");break;case 2:e.removeClass("jet-is-playing").addClass("jet-is-paused")}}}})},intVimeoPlayer:function(e,i){var t=c(i.html).appendTo(i.playerTarget),t=new Vimeo.Player(t[0]),a=e.find(".jet-blog-playlist__item-index");t.on("loaded",function(t){e.data("player",this),i.currentPlayer&&this.play(),i.canvas.data("provider","vimeo"),i.canvas.data("player",this)}),t.on("play",function(){a.length&&(a.removeClass("jet-is-paused").addClass("jet-is-playing"),i.canvas.hasClass("jet-blog-canvas-active")||i.canvas.addClass("jet-blog-canvas-active"))}),t.on("pause",function(){a.length&&a.removeClass("jet-is-playing").addClass("jet-is-paused")})},pauseCurrentPlayer:function(t,e){switch(e){case"youtube":t.pauseVideo();break;case"vimeo":t.pause()}},startNewPlayer:function(t,e){switch(e){case"youtube":setTimeout(function(){t.playVideo()},300);break;case"vimeo":t.play()}},handleSmartListingFilter:function(t){var e=c(this),i=e.closest(".jet-smart-listing__filter-item"),a=e.data("term");t.preventDefault(),i.closest(".jet-smart-listing__filter").find(".jet-active-item").removeClass("jet-active-item"),i.addClass("jet-active-item"),p.requestPosts(e,{term:a,paged:1})},handleSmartListingPager:function(){var t=c(this),e=t.closest(".jet-smart-listing-wrap"),i=e.closest(".elementor-widget-jet-blog-smart-listing").data("id"),a=parseInt(e.data("page"),10),s=1,n=parseInt(e.data("term"),10),r=t.data("dir"),o=e.data("scroll-top");t.hasClass("jet-arrow-disabled")||(1===p.updateCurrentPage[i].updatePage&&(a=1,p.updateCurrentPage[i].updatePage=0),"next"===r&&(s=a+1),p.requestPosts(t,{term:n,paged:s="prev"===r?a-1:s}),o&&c("html, body").stop().animate({scrollTop:e.offset().top},500))},breakpointsPosts:function(t){var e,i=t.data("settings"),t=(elementorFrontend.getCurrentDeviceMode(),r.config.responsive.activeBreakpoints),a=i.posts_rows,s=[],n="yes"===i.featured_post?1:0;return s.desktop=[],s.desktop=i.posts_columns*a+n,e="desktop",Object.keys(t).reverse().forEach(function(t){"widescreen"===t?s[t]=i["posts_columns_"+t]?i["posts_columns_"+t]*i["posts_rows_"+t]+n:s.desktop:(s[t]=i["posts_columns_"+t]?i["posts_columns_"+t]*i["posts_rows_"+t]+n:s[e],e=t)}),s},currentBreakpointPosts:function(t,e){return t[e]},requestPosts:function(t,e){var i=t.closest(".jet-smart-listing-wrap"),t=(i.next(".jet-smart-listing-loading"),elementorFrontend.getCurrentDeviceMode()),a=p.breakpointsPosts(i),a=p.currentBreakpointPosts(a,t);i.hasClass("jet-processing")||(i.addClass("jet-processing"),e.posts_per_page=a,c.ajax({url:g.ajaxurl,type:"POST",dataType:"json",data:{action:"jet_blog_smart_listing_get_posts",jet_request_data:e,jet_widget_settings:i.data("settings")}}).done(function(t){var e=i.find(".jet-smart-listing__arrows");i.removeClass("jet-processing").find(".jet-smart-listing").html(t.data.posts),e.length&&e.replaceWith(t.data.arrows)}).fail(function(){i.removeClass("jet-processing")}),void 0!==e.paged&&i.data("page",e.paged),void 0!==e.term&&i.data("term",e.term))},debounce:function(e,i){var a;return function(t){a&&clearTimeout(a),a=setTimeout(function(){i.call(this,t),a=null},e)}}};c(window).on("elementor/frontend/init",p.init);t.prototype={constructor:t,init:function(){var t=this;this.containerWidth=this.$container.width(),this.heading=this.$heading.outerWidth(),this.$hiddenWrap=c('<div class="'+this.settings.className+'" hidden="hidden">'+this.settings.icon+"</div>").appendTo(this.$el),this.$hidden=c('<div class="jet-smart-listing__filter-hidden-items"></div>').appendTo(this.$hiddenWrap),this.iter=0,this.rebuildItems(),setTimeout(function(){t.watch(),t.rebuildItems()},300)},watch:function(){c(window).on("resize.JetBlogMore orientationchange.JetBlogMore",p.debounce(100,this.watcher.bind(this)))},watcher:function(t){this.containerWidth=this.$container.width(),this.itemsWidth=0,this.$hidden.html(""),this.$hiddenWrap.attr("hidden","hidden"),this.$el.find("> div[hidden]:not(.jet-smart-listing__filter-more)").each(function(){c(this).removeAttr("hidden")}),this.rebuildItems()},rebuildItems:function(){var i,a=this,t=this.$el.find("> div:not(.jet-smart-listing__filter-more):not([hidden])"),s=parseInt(this.$hiddenWrap.outerWidth(),10);this.itemsWidth=0,t.each(function(){var t,e=c(this);a.itemsWidth+=e.outerWidth(),i=a.$heading.outerWidth()+s+a.itemsWidth,a.containerWidth-i<0&&e.is(":visible")&&(t=e.clone(),e.attr({hidden:"hidden"}),a.$hidden.append(t),a.$hiddenWrap.removeAttr("hidden"))})}},c.fn.JetBlogMore=function(){return this.each(function(){new t(this)})}}(jQuery,window.elementorFrontend,window.JetBlogSettings),window.hasJetBlogPlaylist;