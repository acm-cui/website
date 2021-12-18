var timestr=function(t){var e=t.getHours(),a=t.getMinutes();return hours=0==e?"00":e.toString(),minutes=0==a?"00":a.toString(),hours+":"+minutes},datestr=function(t){var e=t.getDate(),a=nth(e),s=["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()];t.getFullYear();return e+a+" "+s},nth=function(t){if(3<t&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}};$(function(){$.getJSON("../programme/data.json?s="+(new Date).getTime(),function(t){var e=$("#programmeTabs"),a=$("#programme"),s=0,n={};$.each(t,function(t,e){var a=new Date(Date.parse(e.start_time));start_date_index=datestr(a),start_date_index in n||(n[start_date_index]=[]),n[start_date_index].push(e),s++}),$("#numdays").html(Object.keys(n).length),$(".timezone").text("shown in your operating system's timezone ("+Intl.DateTimeFormat().resolvedOptions().timeZone+")");var i=0,l=0;$.each(n,function(t){var e=new Date;datestr(e)==t&&(l=i),i++});var r=0;if(i=0,html='<div class="btn-group btn-group-lg mb-3 d-md-inline-flex" role="group" aria-label="Days of the conference">',$.each(n,function(t){html+='<button type="button" id="programmeDay'+i+'" data-toggle="collapse" data-target="#programme'+i+'" aria-expanded="false" aria-controls="programme'+i+'" class="btn btn-light border">'+t+"</button>",i++}),html+="</div>",e.append(html),html='<div id="programmeSchedule">',i=0,$.each(n,function(t,a){html+='<div class="card collapse" aria-labelledby="programmeDay'+i+'" id="programme'+i+'" data-parent="#programmeSchedule">',html+='<ul class="list-unstyled prg-day mb-0 border-0 rounded-0">',$.each(a,function(t,e){r++,"Break"==e.type?0<t&&t<a.length-1?(html+='<li class="media p-3 bg-lightest border-bottom rounded-0" id="session-'+i+'"><div class="media-body text-center text-muted">',""!=e.description&&(html+=e.description),html+="</div></li>"):t==a.length-1&&(html+='<li class="media p-3 bg-lightest border-bottom rounded-0" id="session-'+i+'"><div class="media-body text-center text-muted">',html+="Please see the next day's schedule as events may start soon after midnight",html+="</div></li>"):"EOD"==e.type?0<t&&t<a.length-1&&(html+='<li class="media p-3 bg-lightest border-bottom rounded-0" id="session-'+i+'"><div class="media-body text-center text-muted">',""!=e.description&&(html+=e.description),html+="</div></li>"):(html+='<li class="media prg-row p-3 rounded bg-light border-bottom rounded-0 flex-md-row flex-column" id="session-'+e.id+'"><div class="mr-md-3 mb-md-0 mb-3 d-flex flex-md-column flex-row"><div class="text-capitalize mb-md-2 mr-3"><span class="badge badge-primary">'+e.type+"</span></div>",html+='<div class="mb-md-1 mr-md-0 mr-3 small"><span alt="A clock" class="d-inline-block prg-icon-timing prg-icon-start mr-2"></span><span class="d-inline-block prg-text-timing">Starts <span class="d-md-inline d-none">at</span> <span class="prg-timing"><span></span>'+timestr(new Date(Date.parse(e.start_time)))+"</span></div>",html+='<div class="mt-md-1 small"><span alt="A stopwatch" class="d-inline-block prg-icon-timing prg-icon-end mr-2"></span><span class="d-inline-block prg-text-timing">Ends <span class="d-md-inline d-none">at</span> <span class="prg-timing"><span></span>'+timestr(new Date(Date.parse(e.end_time)))+"</span>",html+="</div></div>",html+='<div class="media-body w-100">',html+='<div class="float-right d-flex flex-row mt-md-0 mt-1 ml-1">',e.info&&e.subtitle==undefined&&(html+='<a href="https://'+e.info+'" title="Read more about this session" class="d-block prg-icon-info-sm mr-2"><span class="sr-only">Read more about this session</span></a>'),html+='<a href="https://'+window.location.hostname+window.location.pathname+"ics/"+e.id+'.ics" title="Download an iCal (ICS) file for this session in the programme" class="d-block prg-icon-cal mr-2"><span class="sr-only">iCalendar (ICS) file for this session</span></a>',html+='<a href="https://'+window.location.hostname+window.location.pathname+"link/"+e.id+'" title="Get the permanent link to this session in the programme"" class="d-block prg-icon-link"><span class="sr-only">Permalink to this session</span></a>',html+="</div>",html+='<h4 class="text-primary mt-0 mb-1">'+e.title+"</h4>",""!=e.presenters&&(html+=e.presenters),""!=e.chairs&&(html+='<em class="small">Chaired by '+e.chairs+"</em>"),e.subtitle!=undefined&&(html+='<h5 class="text-center mt-3">'+e.subtitle,""!=e.info&&(html+='<a href="'+e.info+'" title="Read more about this session" class="d-inline-block prg-icon-info-sm ml-2 align-down-small-icon"><span class="sr-only">Read more about this session</span></a>'),html+="</h5>"),0<e.presentations.length&&(html+='<div class="mt-3">',html+='<button type="button" class="btn btn-light btn-lg btn-block d-md-none d-block text-left p-0 programmeSessionDetail programmeSessionDetail'+e.id+' collapse show" data-toggle="collapse" data-target=".programmeSessionDetail'+e.id+'" aria-expanded="false" aria-controls="programmeSessionDetail'+e.id+'">+ Expand session details</button>',html+='<ol class="list-group\td-md-block collapse programmeSessionDetail'+e.id+'">',$.each(e.presentations,function(t){presentation=e.presentations[t],html+='<li class="list-group-item pb-3">',presentation.aaai&&(html+='<div class="float-right">',html+='<a href="'+presentation.aaai+'" title="View the paper on the AAAI website" class="d-block prg-inner-icon prg-icon-aaai"><span class="sr-only">View paper on the AAAI website</span></a>',html+="</div>"),presentation.acmdl&&(html+='<div class="float-right">',html+='<a href="'+presentation.acmdl+'" title="View the paper in the ACM Digital Library" class="d-block prg-inner-icon prg-icon-acmdl"><span class="sr-only">View paper in the ACM Digital Library</span></a>',html+="</div>"),presentation.sagepub&&(html+='<div class="float-right">',html+='<a href="'+presentation.sagepub+'" title="View the paper on Sage Publishing\'s website" class="d-block prg-inner-icon prg-icon-sagepub"><span class="sr-only">View paper on the Sage Publishing\'s website</span></a>',html+="</div>"),presentation.springerlink&&(html+='<div class="float-right">',html+='<a href="'+presentation.springerlink+'" title="View the paper on Springer\'s website" class="d-block prg-inner-icon prg-icon-springerlink"><span class="sr-only">View paper on Springer\'s website</span></a>',html+="</div>"),presentation.info&&(html+='<div class="float-right">',html+='<a href="'+presentation.info+'" title="Read more about this presentation" class="d-block prg-inner-icon prg-icon-info"><span class="sr-only">Read more about this presentation</span></a>',html+="</div>"),html+="<strong>"+presentation.title+("Panel"!=presentation.type&&"Panel Member"!=presentation.type?' <span class="badge badge-secondary">'+presentation.type+"</span>":"")+"</strong><br>",html+=presentation.authors,presentation.preview!=undefined&&(html+='<br><a href="'+presentation.preview.link+'" title="'+presentation.preview.text+'" target="_blank">'+presentation.preview.text+" &rarr;</a>"),presentation.award!=undefined&&(html+="<br><br>\ud83c\udfc6 "+presentation.award),html+="</li>"}),html+="</ol>"),html,t==a.length-1&&r<s&&(html+='<li class="media p-3 bg-lightest border-bottom rounded-0" id="session-'+i+'"><div class="media-body text-center text-muted">',html+="Please see the next day's schedule as events may start soon after midnight",html+="</div></li>"))}),html+="</ul></div>",i++}),html+="</div>",a.append(html),$("#programmeSchedule .card").on("show.bs.collapse",function(t){var e=$(t.target),a=$("#"+e.attr("aria-labelledby"));a.removeClass("btn-light"),a.addClass("btn-primary")}),$("#programmeSchedule .card").on("hide.bs.collapse",function(t){var e=$(t.target),a=$("#"+e.attr("aria-labelledby"));a.addClass("btn-light"),a.removeClass("btn-primary")}),location.hash&&location.hash.length){var o=decodeURIComponent(location.hash.substr(1));if(o.startsWith("session-")){var m=$("#programme  #"+o);if(!m.is(":visible")){var d=m.parent().parent();d.collapse("show");var p=function(){$("html,body").animate({scrollTop:m.offset().top},500),d.off("shown.bs.collapse",p)};d.on("shown.bs.collapse",p)}}}else $("#programme"+l).collapse("show")})});