"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var r,a=_getPrototypeOf(e);if(t){var n=_getPrototypeOf(this).constructor;r=Reflect.construct(a,arguments,n)}else r=a.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _wrapNativeSuper(e){var t="function"==typeof Map?new Map:void 0;return(_wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(r,e)})(e)}function _construct(e,t,r){return(_construct=_isNativeReflectConstruct()?Reflect.construct:function(e,t,r){var a=[null];a.push.apply(a,t);var n=new(Function.bind.apply(e,a));return r&&_setPrototypeOf(n,r.prototype),n}).apply(null,arguments)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf("[native code]")}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var app=null;Handlebars.partials=Handlebars.templates,Handlebars.registerHelper("times",function(e,t){for(var r="",a=0;a<e;++a)r+=t.fn(a);return r}),Handlebars.registerHelper("ifeq",function(e,t,r){return e==t?r.fn(this):r.inverse(this)}),Handlebars.registerHelper("ifnoteq",function(e,t,r){return e!=t?r.fn(this):r.inverse(this)});var Utils={normalise:function(e){var t={},r=null,a=null;return e.forEach(function(e,n){r=e.data[0],a=void 0!==e.links?e.links[0]:null;var i=new Date(r.date_created),s={image:null!==a?a.href:null,title:r.title,description:Utils.cutText(r.description,200),description_full:r.description,media_type:r.media_type,media_id:r.nasa_id,keywords:void 0!==r.keywords?r.keywords.join(", "):"Няма",date_created:i.toDateString(),center:r.center,links:e.href};t[s.media_id]=s}),t},cutText:function(e,t){return null==e?"":e.length<=t?e:(e=e.substring(0,t).trim())+"..."}},ValidationError=function(e){_inherits(r,_wrapNativeSuper(Error));var t=_createSuper(r);function r(e){var a;return _classCallCheck(this,r),(a=t.call(this,e)).show(),a}return _createClass(r,[{key:"show",value:function(){return app.setHtmlContainer(Handlebars.templates.error({message:this.message})),this}}]),r}(),CacheApi=function(){function e(){_classCallCheck(this,e),this.useStorage=this.isStorageAvailable(),this.useStorage?(this.cacheApi="api-calls",null===localStorage.getItem(this.cacheApi)&&localStorage.setItem(this.cacheApi,"{}"),console.log("Info[localStorage кеш е активен!]")):console.log("Warning[Не се поддържа localStorage и няма да се използва!]")}return _createClass(e,[{key:"getSearch",value:function(e){if(!this.useStorage)return null;var t=md5(JSON.stringify(e)),r=JSON.parse(this.get(this.cacheApi));return void 0!==r[t]?r[t]:null}},{key:"saveSearch",value:function(e,t){if(!this.useStorage)return!0;var r=md5(JSON.stringify(e)),a=JSON.parse(this.get(this.cacheApi));a[r]=t;try{this.set(this.cacheApi,JSON.stringify(a))}catch(e){this.clear()}return!0}},{key:"has",value:function(e){return!!this.useStorage&&null!==localStorage.getItem(e)}},{key:"set",value:function(e,t){return this.useStorage?this:localStorage.setItem(e,t)}},{key:"get",value:function(e){return this.useStorage?localStorage.getItem(e):null}},{key:"remove",value:function(e){return localStorage.removeItem(e)}},{key:"clear",value:function(){return localStorage.clear(),!0}},{key:"isStorageAvailable",value:function(){try{var e=window.localStorage,t="__storage_test__";return e.setItem(t,t),e.removeItem(t),!0}catch(e){}return!1}}]),e}(),Api=function(){function e(){_classCallCheck(this,e),this.cache=new CacheApi,this.endpointUrl="https://images-api.nasa.gov",this.search="/search",this.media="/asset/",this.metadata="/metadata/",this.captions="/captions/"}return _createClass(e,[{key:"call",value:function(e,t){var r=this;if(app.setHtmlContainer(Handlebars.templates.placeholderItems()),"function"!=typeof t)throw new ValidationError("Системен проблем!");if(null==e.q||e.q.length<=0)throw new ValidationError("Няма критерий на търсене!");null==e.page&&(e.page=1),null==e.media_type&&(e.media_type="images,video,audio");var a=[];a.push("page="+e.page),a.push("q="+e.q),a.push("media_type="+e.media_type),void 0!==e.center&&a.push("center="+e.center),void 0!==e.year_start&&a.push("year_start="+e.year_start),void 0!==e.year_end&&a.push("year_end="+e.year_end);var n=this.cache.getSearch(a);if(null!==n)return t(n),!0;var i=this.endpointUrl+this.search+"?"+a.join("&");return $.ajax({url:i,dataType:"json"}).done(function(e){var n={items:Utils.normalise(e.collection.items),total_hits:e.collection.metadata.total_hits};r.cache.saveSearch(a,n),t(n)}).fail(function(){throw new ValidationError("Възникна проблем при четене от API! <br/>Опитайте след 5 минути.")}),this}},{key:"callMedia",value:function(e,t){return $.ajax({url:e.links,dataType:"json"}).done(function(r){var a="video"===e.media_type?".mp4":".mp3";for(var n in r)if(r[n].indexOf(a)>0){e.media=r[n];break}t(e)}).fail(function(){throw new ValidationError("Възникна проблем при четене от API! <br/>Опитайте след 5 минути.")}),this}}]),e}(),Navigation=function(){function e(){_classCallCheck(this,e),this.init()}return _createClass(e,[{key:"init",value:function(){return $(document).on("click","#sidebarCollapse",function(){$("#sidebar").toggleClass("active")}),$(document).on("click",".lnk-home",function(e){e.preventDefault(),app.prepareHome()}),$(document).on("click",".lnk-modal",function(e){e.preventDefault();var t=$(this).data("page"),r=Handlebars.templates.modal,a="";switch(t){case"about":a=r({title:"За проекта",body:Handlebars.templates.about()});break;case"credits":a=r({title:"Кредити",body:Handlebars.templates.credits()})}$("body").append(a),$("#innerModal").modal("show"),$("#innerModal").one("hidden.bs.modal",function(){$(this).remove()})}),this}}]),e}(),Search=function(){function e(){_classCallCheck(this,e),this.timerSearch=null,this.nasaCenters={HQ:"NASA Headquarters",ARC:"Ames Research Center",AFRC:"Armstrong Flight Research Center",GRC:"Glenn Research Center",GSFC:"Goddard Space Flight Center",GISS:"Goddard Institute of Space Studies",JPL:"Jet Propulsion Laboratory",JSC:"Johnson Space Center",KSC:"Kennedy Space Center",LaRC:"Langley Research Center",MSFC:"Marshall Space Flight Center",MAF:"Michoud Assembly Facility",SSC:"Stennis Space Center",WFF:"Wallops Flight Facility",WSMR:"White Sands Test Facility"},this.init()}return _createClass(e,[{key:"init",value:function(){var e=this;return $(document).on("submit",".filter-form",function(e){e.preventDefault()}),$(document).on("keyup",'.filter-form input[name="search"]',function(t){clearTimeout(e.timerSearch),e.timerSearch=setTimeout(e.search.bind(e),1e3),13==t.which&&(clearTimeout(e.timerSearch),e.search())}),$(document).on("click",".filter-form .btn-search",function(t){clearTimeout(e.timerSearch),e.search()}),$(document).on("click",".advanced-search",function(t){t.preventDefault(),clearTimeout(e.timerSearch),e.showAdvanceFilter()}),$(document).on("click",".switch .btn",function(e){e.preventDefault(),$(".switch .btn").toggleClass("btn-info").toggleClass("btn-light");var t=$(".results-container .grid-item"),r=t.find(".img-container"),a=t.find(".caption");t.toggleClass("col-lg-6 col-xl-4"),r.toggleClass("col-md-5"),a.toggleClass("col-md-7"),$(".results-container").masonry("layout")}),this}},{key:"search",value:function(){try{app.api.call(this.prepareSearchObject(),app.loadResults.bind(app))}catch(e){}return this}},{key:"prepareSearchObject",value:function(){var e=$('.filter-form input[name="media_type[]"]:checked').map(function(){return this.value}).get();return{q:$('.filter-form input[name="search"]').val(),center:$('.filter-form select[name="center"]').val(),year_start:$('.filter-form input[name="years-from"]').val(),year_end:$('.filter-form input[name="years-to"]').val(),media_type:e.join(",")}}},{key:"showAdvanceFilter",value:function(){return $(".filter-wrapper form").html(Handlebars.templates.extendedFilter({centers:this.nasaCenters})),this.initAdvanced(),this}},{key:"showSimpleFilter",value:function(){return $(".filter-wrapper form").html(Handlebars.templates.mainFilter()),this}},{key:"initAdvanced",value:function(){var e=new Date;return $("#ranges").html("1920г. - "+e.getFullYear()+"г."),$("#years-from").val(1920),$("#years-to").val(e.getFullYear()),$("#year-range").slider({range:!0,min:1920,max:e.getFullYear(),values:[1920,e.getFullYear()],slide:function(e,t){$("#years-from").val(t.values[0]),$("#years-to").val(t.values[1]),$("#ranges").html(t.values[0]+"г. - "+t.values[1]+"г.")}}),this}}]),e}(),App=function(){function e(){return _classCallCheck(this,e),app=this,this.init(),this.layout(),this}return _createClass(e,[{key:"init",value:function(){var e=this;return AOS.init({once:!0}),e.currentResult=null,this.navigation=new Navigation,this.search=new Search,this.api=new Api,$(document).on("click",".grid-item a",function(t){t.preventDefault();var r=$(this).closest(".grid-item").data("id");if(null!==e.currentResult&&void 0!==e.currentResult.items[r]){var a=e.currentResult.items[r];"image"===a.media_type?e.loadMedia(a):app.api.callMedia(a,e.loadMedia)}}),this}},{key:"layout",value:function(){return $("body").html(Handlebars.templates.layout()),this.pageContainer=$("#page-wrapper .page-container"),this.resetResult(),this.prepareHome(),this}},{key:"resetResult",value:function(){return this.currentResult=null,this.currentpage=1,this}},{key:"prepareHome",value:function(){return this.pageContainer.append(Handlebars.templates.home()),this.loadHome(),this}},{key:"loadHome",value:function(){var e=["mars","voyager","viking","spacex"];this.search.showSimpleFilter();var t={q:e[Math.floor(Math.random()*e.length)],media_type:"image,video,audio"};try{this.api.call(t,this.loadPopular.bind(this))}catch(e){}return this}},{key:"loadPopular",value:function(e){if(null==e)throw new ValidationError("Имам проблем със заявката!");return this.resetResult(),this.currentResult=e,this.setHtmlContainer(Handlebars.templates.results({title:"Избор на редактора"})),e.total_hits>0?this.setHtmlResult(e.items):this.setHtmlContainer(Handlebars.templates.missing),this}},{key:"loadResults",value:function(e){return this.resetResult(),this.currentResult=e,this.setHtmlContainer(Handlebars.templates.results({title:"Резултати"})),e.total_hits>0?this.setHtmlResult(e.items):this.setHtmlContainer(Handlebars.templates.missing),this}},{key:"loadMedia",value:function(e){var t=(0,Handlebars.templates.modalMedia)({item:e});return $("body").append(t),$("#mediaModal").modal("show"),$("#mediaModal").one("hidden.bs.modal",function(){$(this).remove()}),this}},{key:"setHtmlContainer",value:function(e){return this.pageContainer.find(".data-wrapper").empty(),this.pageContainer.find(".data-wrapper").html(e),this}},{key:"setHtmlResult",value:function(e){var t=Handlebars.templates.item({items:e});return $(".data-wrapper .results-container").html(t),$(".data-wrapper").imagesLoaded(function(){$(".data-wrapper .placeholders").fadeOut(),$(".data-wrapper .results-container").removeClass("d-none"),$(".results-container").masonry({itemSelector:".grid-item",gutter:0});new LazyLoad({elements_selector:".lazy",callback_loaded:function(){$(".results-container").masonry("layout")}})}),this}}]),e}();$(function(){new App});
