
$(function(){

	$('.client_id').html(cpid);

	var currScroll=0;
	
	// Tooltip only Text
	$('.main_ico.iq').hover(function(){
			// Hover over code
			var title = $(this).attr('title');
			$(this).data('tipText', title).removeAttr('title');
			$('<p class="tooltip"></p>')
			.text(title)
			.appendTo('body')
			.fadeIn('slow');
	}, function() {
			// Hover out code
			$(this).attr('title', $(this).data('tipText'));
			$('.tooltip').remove();
	}).mousemove(function(e) {
			var mousex = e.pageX + 20; //Get X coordinates
			var mousey = e.pageY + 10; //Get Y coordinates
			$('.tooltip')
			.css({ top: mousey, left: mousex })
	});

//	document.addEventListener('copy', addLink);

	$('.header .citys, .city_full .close_cty, .top_block .citys').on( "click", function(e) {
		$('.city_full').slideToggle(200);
		
		var settings = {
			showArrows: true,
		};

		$('.city_full .pc_in').jScrollPane(settings);

		$('.js-modal-close').fadeToggle();
		$('.header .main_ico.idown, .top_block .citys .rot_down').toggleClass('rev');
		$('.city_full .city_srch').focus();
	});

	$('.callback .minut, .callback .aj_but').on( "click", function(e) {
		$(this).parent().find('.minutes').slideToggle(200);
		$(this).parent().find('.idown').toggleClass('rev');
	});

	$('.callback .minutes span').on( "click", function(e) {
		$($(this).parents().get(2)).find('input[name="time"]').val($(this).html());
		$($(this).parents().get(2)).find('.minut').html($(this).html());
		$($(this).parents().get(2)).find('.idown').toggleClass('rev');
		$(this).parent().slideToggle(200);
	});


	$('.mnutop_full .hdr span, .footer .hdr span ').on('click', function(e){
		$(this).parent().parent().toggleClass('minim');
		$(this).toggleClass('rot_up').toggleClass('rot_down');
	})
	
	
	$('.mnutop, .mnutop_full .close, .logo span, .close_mnu').on( "click", function(e) {
		if ($('.mnutop').hasClass('active'))
			$(window).scrollTop(currScroll);
		else
			currScroll = $(window).scrollTop();
		
		if ($('.city_full').is(':visible'))
			$('.header .citys').click();
		e.preventDefault();
		$('.mnutop_full').fadeToggle(200);
		$('.mnutop').toggleClass('active');
		$('body').toggleClass("mnu_opened");
		if ($('.block.hdr_top').hasClass("wht_trigger") || $('.block.hdr_top').hasClass("fix")) {
			$('.block.hdr_top').toggleClass("wht");
		}
		if (!$('.block.hdr_top').hasClass("fix")) $('body').toggleClass("noscroll");
	});

	$( '.sendmailo' ).not('.cb_dir').bind('keypress', function(e){
		if ( e.keyCode == 13 ) {
			$( this ).find( '.submit' ).click();
			return false;
		}
	});
	
	/*$(document).on('click', '.sendmailo .submit',function(){
		form = $(this).parent();
		phone = form.find('input[name="phone"]');
		phexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ ;
		email = form.find('input[name="email"]');
		emexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;

		if ( (email.val().match(emexp)) || (phone.val().match(phexp)) ){
				getJson('/' + $('#addurl').val()+'/json/sendmailo/', form.serialize(), '.sendmailo .loader' , '', 'showmess()');
			}
		else{
			phone.addClass('error');
			email.addClass('error');
		}
		return false;
	});*/

	
	$.expr[":"].contains = $.expr.createPseudo(function(arg) {
		return function( elem ) {
			return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) == 0;
		};
	});

	
	$('.city_srch').on('keyup', function() {
		var api = $('.city_full .pc_in').data('jsp');
		api.scrollToY(0);
		if ($(this).val()==''){
			$('.hdr_top .city_full .pc_in .spcr_tgg').addClass('spcr').removeClass('spcr_tgg');
			$('.hdr_top .city_full .pc_in .item').slideDown(50);
			}
		else
			{
			$('.hdr_top .city_full .pc_in .item').hide();
			$('.hdr_top .city_full .pc_in .spcr').removeClass('spcr').addClass('spcr_tgg');
			$('.hdr_top .city_full .pc_in .item:contains("'+$(this).val()+'")').show(); 
			$('.hdr_top .city_full .pc_in .item:contains("'+transl($(this).val())+'")').show(); 
			}
	});
	
	$('.city_srch').keypress(function (e) {
		if (e.which == 13) {
			items = $('.hdr_top .city_full .pc_in .item:visible');
			if (items.length==1) {
				$.cookie('geo_himself', items.find('a').data('cid'), { expires: 30, path:'/' } );
				window.location.href = items.find('a').attr('href');
			}
		}
	});



	/*$('.litebox').swipebox({
		loopAtEnd: true,
		toggleClassOnLoad: 'loading',
		afterMedia: function(){
			setTimeout(function(){
				$('.slide').on('click', function(e){
					if( e.target != this )
						return;
					$('#swipebox-close').click();
				});
			}, 1500);

			$(document).bind('click', '#swipebox-arrows a', function(){
				$('.slide').unbind();
			});
		},
		afterOpen: function(){
			$('#swipebox-slider img').unbind();
		},
	});

	$(document).on('click', '#swipebox-slider img', function(){
		$('#swipebox-next').click();
		$('.slide').unbind();
	});



	mq = window.matchMedia( "(max-width: 767px)" );
	
	if($('.how_page').length==0){
		if (mq.matches){
			var sData = {block_name:'how_main_block', 
						output: 'yamap',
						};
			getJson( '/' + $('#addurl').val()+'/json/get_block/', sData );
		} else {
			$('#yamap').appear();
			$('body').one('appear', '#yamap', function(e){
				var sData = {block_name:'how_main_block', 
							output: 'yamap',
							};
				getJson( '/' + $('#addurl').val()+'/json/get_block/', sData );
			})
		}
	}*/

	/*$("img.lazy").lazyload({
		threshold : 200,
		effect : "fadeIn"
	});*/

	
	$('.map_over .white').click(function(){
		$('.map_over').fadeOut(200);
	})
	


/*
	
	$('.banners .right').click(function(){
		clearTimeout(window.top_slider);
		window.top_slider = null;
		changeBan();
		nextBanTimer(8000);
	})

	$('.banners .left').click(function(){
		clearTimeout(window.top_slider);
		window.top_slider = null;
		
		cur = $('.banners .banner').not('.hidden');
		if (cur.prev('.banner').length>0) prev = cur.prev('.banner'); else prev= $('.banners .banner').last();
		changeBan(prev.data('id'));
		nextBanTimer(8000);
	})

	$('.banners .dot').on('click',function(){
		if (!$(this).hasClass('active')){
			clearTimeout(window.top_slider);
			window.top_slider = null;
			changeBan($(this).data('id'));
			nextBanTimer(8000);
		}
	})


	$('.banners').on('mouseover', function(){
		clearTimeout(window.top_slider);
		window.top_slider = null;
	})
	$('.banners').on('mouseout', function(){
		clearTimeout(window.top_slider);
		window.top_slider = null;
		nextBanTimer(8000);
	})


	$('.banners').on('swipeleft', function(){
		$('.banners .right').click();
	})
	$('.banners').on('swiperight', function(){
		$('.banners .left').click();
	})*/

	$('.solutions .item .params .more').on('click', function(){
		$($(this).parents().get(1)).addClass('open');
	})
	$('.solutions .item .params.open').on('click', function(){
		$(this).removeClass('open');
	})



	if ($('.content').length){
		top_r = $('.content').offset().top;
		bot_r = $('.content').offset().top + $('.content').height() - $('.callme_r').height() - 100;
		}

	if($(window).scrollTop()>=10){
		$('.hdr_top').removeClass("ontop");
		if (!$('.hdr_top').hasClass("wht_trigger")) {
			$('.hdr_top').addClass("wht");
			
	}}
		
	
	$(window).scroll(function(){
		if($(window).scrollTop()>=10){
			$('.hdr_top').removeClass("ontop");
			if (!$('.hdr_top').hasClass("wht_trigger")) {
				$('.hdr_top').addClass("wht");
				
		}}
		else {
			$('.hdr_top').addClass("ontop");
			if (!$('.hdr_top').hasClass("wht_trigger")){
				$('.hdr_top').removeClass("wht");
		}}

			
			
		if ($('.content').length){
			if(($(window).scrollTop()>=top_r) && ($(window).scrollTop()<=bot_r)) {
				$('.callme_r').offset({top : $(window).scrollTop()+80}); 
				}
			if($(window).scrollTop()<top_r) {
				$('.callme_r').css('top' , 50); 
				}
			}
	});

			
	var tt = $('#toTop, .totop');

	$(tt).click(function(){$("html, body").animate({scrollTop:0},"slow")});

	$('.appear').toggleClass('appear');
	
	
	$('div[data-modal-id], a[data-modal-id], span[data-modal-id]').click(function(e) {
		e.preventDefault();
		var modalBox = $(this).attr('data-modal-id');

		var sData = {block_name:'mail_block', 
					output: modalBox
					};
		getJson( '/' + $('#addurl').val()+'/json/get_block/', sData);
		$(".modal-overlay").fadeIn(300);
		$('#'+modalBox).fadeIn(200);
	}); 

	$(".js-modal-close, .modal-overlay").click(function() {
		$(".modal-box, .modal-overlay").fadeOut(300);
		$('.city_full').slideUp(200);
		$('.header .main_ico.idown').removeClass('rev');
	});
	
    $('.how .cities .item').on('mouseover', function(){
        hlghtPM($(this).attr('id').substr(2));
	})
	
	$('.how .cities').on('mouseout', function(){
		hidePM($(this).data('hltd'));
	})

	$('.to_full').on('click', function(){
		$.cookie('wanna_full', 1, { expires: 1, path:'/' } );
		location.reload();
	})

	$('.to_mob').on('click', function(){
		$.cookie('wanna_full', 1, { expires: -1, path:'/' } );
		location.reload();
	})

	$('.how .cities .item').on('click', function(){
		var sel = getSelection().toString();
		if(!sel) showPM($(this).attr('id').substr(2));
		$('.how_page').removeClass('open');
		$("html, body").animate({scrollTop:0},"slow");
	})

	$('.how .all_cities').on('click swipeup', function(){
		$('.how_page').addClass('open');
	})

	$('.map_cover').on('click', function(){
		$('.how_page').removeClass('open');
		
	})

	

	
	$('.mnutop_full .dog .submit').on('click', function(){
		dn = $('.mnutop_full .dog .dog_num');
		dnv = $('.mnutop_full .dog .dog_num').val();
		
		if (dn) {

			if ( (dnv.slice(4,5)=='1') && ((dnv.slice(9,10)=='0') || (dnv.slice(9,10)=='1')) ) {
				form = $(this).parent();
				getJson('/' + $('#addurl').val()+'/json/sendmailo/', form.serialize(), '.dogloader' , '', 'showmess()');
				dn.removeClass('error');
				return false;
				} else swal({   title: "Ошибка",   text: "Договор не обнаружен в базе данных.",   type: "error",   confirmButtonText: "ОК", confirmButtonColor: "#2483b3" });
			} else dn.addClass('error');
	});
	
	
	
	$('.opener').on('click',function(){
		$(this).toggleClass('open');
	})
	
	//nextBanTimer();

	/*$('.solutions .item .params').jScrollPane();*/

	$('.solutions .tabs').on('click',function(){
		$(this).parent().find('.tabs').removeClass('active');
		$(this).parent().find('.tab_content').slideUp(100);
		$(this).parent().find('.tab'+$(this).data('to')).slideDown(100);

		$(this).addClass('active');
	})
    
	$('.pay .tabs').on('click',function(){
		$(this).parent().find('.tabs').removeClass('active');
		$(this).parent().parent().find('.tab_content').fadeOut(0);
		$(this).parent().parent().find('.tab'+$(this).data('to')).fadeIn(100);
		$(this).addClass('active');
	})
    

});

function showAppear(){
	$('.appear').toggleClass('appear');
}

function getNews(hash){
	$('.news').toggleClass('appear');
	var sData = {
		block_name:'news_block', 
		output: 'news_out',
		news_id: hash
		};
    if (hash!='') history.replaceState('', '', '#'+hash );
    setTimeout(getJson( '/' + $('#addurl').val()+'/json/get_block/', sData ), 50);
}

function getCItem(hash){
	var sData = {
		block_name:'calc_item_callback',
		output: 'citems_block',
		citem_id: hash
		};
    getJson( '/' + $('#addurl').val()+'/json/get_block/', sData );
}

function setSolActive(solto, solfrom, path){
	$('.solutions .item').toggleClass('appear');
	var sData = {
		block_id: 'ajax_cont'
		};
	path = path.replace(solfrom, solto);
	history.pushState('data', '', path);
	setTimeout(getJson( path, sData, '#aj_l' ), 50);


}

function setSolActiveM(solto, solfrom){
	$('.m_solutions .item').toggleClass('appear');
	var sData = {
		block_name:'solutions_main', 
		output: 'ajax_cont_s_m',
		active: solto
		};
	setTimeout(getJson( '/' + $('#addurl').val()+'/json/get_block/', sData , '#aj_l' ), 50);
}

function setSolActiveMLoaded(solto, solfrom){
	$('.m_solutions .item').toggleClass('appear');
	setTimeout(function(){
		
	}, 50);
}
var oldTitle = document.title;
var oldOneId;
function showOne(id,pushTo) {

    var curid = $('.how .oneitem input[name=id]').val();

    if (typeof(curid)!='undefined') window['placemark'+curid].options.set({
        iconImageHref: '/DESIGN/SITE/images/how_onmap.png',
    });


    if(id === 0){
        history.replaceState('data', '', document.location.pathname);
	}else{
        var el 		= $('#pm'+id);
        var path 	= el.find('.path').html();
        var allPath = document.location.pathname;
        var pathArr = allPath.split('/');
        history.replaceState('data', '', pathArr[0]+'/'+pathArr[1]+'/'+pathArr[2]+'/'+path+'/');
	}

    var titlePage = el.find('.tit').html();
    if (titlePage) {
        document.title = titlePage;
    }

    if(oldOneId){
    	$('.view').find('.active').removeClass('active');
        window['placemark'+oldOneId].options.set({
            iconImageHref: '/DESIGN/SITE/images/how_onmap.png'
        });
	}

    var element = $('#pm'+id);

    if (element.length === 0) {
        addPMA(id);
    }

    if (id !== 0) {

        $('.how .cities').unbind('mouseout');

        window['placemark'+id].options.set({
            iconImageHref: '/DESIGN/SITE/images/how_onmap_a.png'
        });

        element.toggleClass('active');
        $('.officeBlock').addClass('view');

        oldOneId = id;
    }
}

function showAllOffices(){

    $('.view').find('.active').removeClass('active');
    $('.officeBlock').removeClass('view');

    window['placemark'+oldOneId].options.set({
        iconImageHref: '/DESIGN/SITE/images/how_onmap.png'
    });

    var allpath = document.location.pathname;
    var allpathArr = allpath.split('/');
    var path = '/'+allpathArr[1]+'/'+allpathArr[2];

    $('.officeList').find('.enemyItem').remove();

    history.replaceState('data', '', path+'/');

    if(oldTitle){
        document.title = oldTitle;
	}

}

var oldId;
function showPM(id, hidetoall){
	var onhow = false;

	if ($(document.body).hasClass('how_page')) onhow = true;

	var curid = $('.how .oneitem input[name=id]').val();

	if (typeof(curid)!='undefined') window['placemark'+curid].options.set({
		iconImageHref: '/DESIGN/SITE/images/how_onmap.png',
	});

	if (id!==0) {

		$('.how .cities').unbind('mouseout');

		window['placemark'+id].options.set({
				iconImageHref: '/DESIGN/SITE/images/how_onmap_a.png'
			});		
	
		var el = $('#pm'+id);

		if (el.length===0) {
			addPMA(id);
			return;
		}

		var path = el.find('.go a').attr('href');

		if (onhow) {
			if (path) history.pushState('data', '', path);
			var titlePage = el.find('.tit').html();
			if (titlePage) {
                document.title = titlePage;
            }
		}


        if(onhow){

            var allpath 	= document.location.pathname;
            var allpathArr 	= allpath.split('/');
			var lengthFor 	= 0;
			showOne(id);

        }
		
		$('.oneitem').slideUp(150);
		$('.cities').addClass('slim');
		$('#yamap').addClass('movedup');


		if (typeof(hidetoall)=='undefined') {

            if(oldId){
                window['placemark'+oldId].options.set({
                    iconImageHref: '/DESIGN/SITE/images/how_onmap.png'
                });
                $('#pm'+oldId).remove();
            }else{
            	$('.forOfficeBlock').show();
			}
			if ((!$('.how .toall').is(":visible")) && (!$('.oneitem').hasClass('noall'))){
				$('.how .toall').slideDown(150);
				$('.oneitem').removeClass('noall');
			}
		} else{

            $('.oneitem').addClass('noall');
		}

		setTimeout(function(){
			$('.oneitem').html(el.html());
			$('.oneitem').slideDown(300);
			$('.oneitem .litebox').swipebox({
				loopAtEnd: true,
				hideBarsDelay : 60000,
				useCSS : true,
				beforeOpen: function() {$('.fwd').addClass('noprint');},
				afterClose: function() {$('.fwd').removeClass('noprint');}
			});


		}, 60);
	} else {
		el = $('.cities .item');
		if (onhow) {
			$('.cities').slideDown(150);
			$('.cities').removeClass('slim');
			$('.how .toall').slideUp(150);
			$('.oneitem').slideUp(150);
		}



			$('#yamap').removeClass('movedup');
	}
    oldId = id;
	el.fadeIn(150);

}

var oldIdSmall;
function showPMSmall(id, hidetoall){
    var onhow = false;

    var env = getBootstrapEnvironment();

    if(env === 'xs'){
        var link = document.location.href;
        link += 'how/#'+id;
        window.location.href = link;
        return;
    }

    if ($(document.body).hasClass('how_page')) onhow = true;

    var curid = $('.how .oneitem input[name=id]').val();

    if (typeof(curid)!='undefined') window['placemark'+curid].options.set({
        iconImageHref: '/DESIGN/SITE/images/how_onmap.png',
    });

    if (id!==0) {

        $('.how .cities').unbind('mouseout');

        window['placemark'+id].options.set({
            iconImageHref: '/DESIGN/SITE/images/how_onmap_a.png'
        });

        var el = $('#pm'+id);

        if (el.length === 0) {
            addPMA(id);
            return;
        }

		/*var path = el.find('.go a').attr('href');

		 if (onhow) {

		 if (path) history.pushState('data', '', path);

		 if (el.find('input[name=tit]').val()!='') {
		 document.title = el.find('input[name=tit]').val();
		 }
		 }*/


        if(onhow){

            if (el.find('input[name=tit]').val()!='') {
                document.title = el.find('input[name=tit]').val();
            }
            var allpath 	= document.location.pathname;
            var allpathArr 	= allpath.split('/');
            var lengthFor 	= 0;

            for(var i = 0; i < allpathArr.length; i++){
                if(allpathArr[i]){
                    lengthFor++;
                }

            }

            showOne(id);
        }

        $('.oneitem').slideUp(150);
        $('.cities').addClass('slim');
        $('#yamap').addClass('movedup');


        if (typeof(hidetoall)=='undefined') {

            if(oldIdSmall){
                window['placemark'+oldIdSmall].options.set({
                    iconImageHref: '/DESIGN/SITE/images/how_onmap.png'
                });
                $('#pm'+oldIdSmall).remove();
            }else{
                $('.forOfficeBlock').show();
            }
            if ((!$('.how .toall').is(":visible")) && (!$('.oneitem').hasClass('noall'))){
                $('.how .toall').slideDown(150);
                $('.oneitem').removeClass('noall');
            }
        } else{

            $('.oneitem').addClass('noall');
        }

        setTimeout(function(){
            $('.oneitem').html(el.html());
            $('.oneitem').slideDown(300);
            $('.oneitem .litebox').swipebox({
                loopAtEnd: true,
                hideBarsDelay : 60000,
                useCSS : true,
                beforeOpen: function() {$('.fwd').addClass('noprint');},
                afterClose: function() {$('.fwd').removeClass('noprint');}
            });


        }, 60);
    } else {
        el = $('.cities .item');
        if (onhow) {
            $('.cities').slideDown(150);
            $('.cities').removeClass('slim');
            $('.how .toall').slideUp(150);
            $('.oneitem').slideUp(150);
        }



        $('#yamap').removeClass('movedup');
    }
    oldIdSmall = id;
    el.fadeIn(150);

}

function getBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-' + env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    }
}

function addLink() {
    var selection = window.getSelection();

    var pagelink = "<br/><br/>Ссылка на источник: "+document.location.href;
    var copytext = selection + pagelink;

    newdiv = document.createElement('div');
 
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';
 
    document.body.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);

    window.setTimeout(function () {
        document.body.removeChild(newdiv);
    }, 100);
	
	}


function hlghtPM(id){
	curid = $('.how .cities').data('hltd');
	$('.how .cities').data('hltd', id);

	if (typeof(curid)!='undefined') window['placemark'+curid].options.set({
		iconImageHref: '/DESIGN/SITE/images/how_onmap.png',
	});
	if (id!=0) window['placemark'+id].options.set({
		iconImageHref: '/DESIGN/SITE/images/how_onmap_a.png',
	});
}
function hidePM(id){
	if (id!=0) window['placemark'+id].options.set({
		iconImageHref: '/DESIGN/SITE/images/how_onmap.png',
	});
}

function addPMA(id){
	$('.officeList').append('<div id="add'+id+'" class="enemyItem"></div>');
	
	var sData = {
		block_name:'how_one', 
		output: 'add'+id,
		id: id
	};
	getJson( '/' + $('#addurl').val()+'/json/get_block/', sData ,'','','showPM('+id+')');

}

function showhide_errorblock(num,act){
	var obj = document.getElementById('errorblock'+num);

	if (act==1){
		obj.style.display='';
	} else {
		obj.style.display='none';
	}
}

function showerror(num){
	var obj = document.getElementById('errorblock'+num);
	var ttt = obj.innerHTML;
	ttt=ttt.replace("<pre>","");
	ttt=ttt.replace("</pre>","");
	ttt=ttt.replace("<PRE>","");
	ttt=ttt.replace("</PRE>","");
	alert(ttt);
}

/*function nextBanTimer(num){
	if (typeof(num) == 'undefined') num = 4000;
	window.top_slider = setTimeout(function(){
		changeBan();
		nextBanTimer();
		}, num);
}*/

/*function changeBan(id) {
	$('.banners .icons').css('z-index', 1);
	
	cur = $('.banners .banner').not('.hidden');
	
	b_count = $('.banners .banner').last().data('id');

	if (typeof(id)=='undefined') {
		if (cur.next('.banner').length>0) next = cur.next('.banner'); else next = $('.banners .banner').first();
		id = next.data('id');
	} else 	next = $('.banners #banner_'+id);
	
	directTo = 'toright'; directFrom = 'toleft';

	if  ( !((cur.data('id')==1) && (id==b_count)) && ( ((cur.data('id')<id)) || ((cur.data('id')==b_count) && (id==1)) )) {directTo = 'toleft'; directFrom = 'toright';}

	cur.addClass(directTo);
	
	if (next.data('bg')!='') $('.banners_changer').attr("style", next.data('bg')).fadeIn(200);

	next.removeClass('hidden').addClass(directFrom);
	
	$('.banners .dot').removeClass('active');

	setTimeout(function(){
		cur.addClass('hidden').removeClass(directTo);

		if (next.data('bg')!='') {
			$('.banners').attr("style", next.data('bg'));
			$('.banners_changer').fadeOut();
		};
		$('.banners .dots #dot_'+id).addClass('active');
		next.toggleClass(directFrom);
		$('.banners .icons').css('z-index', 4);
	}, 200);
}*/



function changeInput(id, num) {
	if (($('#'+id).length>0) && 
		((parseInt($('#'+id).val()) + parseInt(num)) > 0) && 
		((parseInt($('#'+id).val()) + parseInt(num)) < 100) && 
		!(id == 'num_ug' && (parseInt($('#'+id).val()) + parseInt(num)) <3))
		$('#'+id).val(parseInt($('#'+id).val()) + parseInt(num));
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function transl(str) 
{
	array = {
		"q":"й", "w":"ц"  , "e":"у" , "r":"к" , "t":"е", "y":"н", "u":"г", 
		"i":"ш", "o":"щ", "p":"з" , "[":"х" , "]":"ъ", "a":"ф", "s":"ы", 
		"d":"в" , "f":"а"  , "g":"п" , "h":"р" , "j":"о", "k":"л", "l":"д", 
		";":"ж" , "'":"э"  , "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и", 
		"n":"т" , "m":"ь"  , ",":"б" , ".":"ю" , "/":"."
	};  
	var re = new RegExp(Object.keys(array).join("|"), "g");
	var replacer = function (val) { return array[val.toLowerCase()]; };
	text = str.replace(re, replacer);
	return text;
}