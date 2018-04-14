function getJson( url, send, showElement, hideElement, callback){
	
	/**
	showElement : Элемент для отображения во время обмена
	hideElement : Элемент для скрытия во время обмена
	**/
	var fullData = send;
	$.ajax({
		
		url: url,
		data: send,
		timeout: 100000,
		type: 'POST',
		cache: false,

		beforeSend: function(){

			if( showElement !== undefined ){
				$( showElement ).fadeIn(100);
			}
			
			if( hideElement !== undefined )
				$( hideElement ).fadeTo('fast', 0);

            swal({
                title: "Идет загрузка...",
                html: true,
                imageUrl:'/DESIGN/SITE/CSS/css/img/loader.gif',
                imageSize:'42x42',
                showConfirmButton: false
            });
				
		},
		
		success: function( data, textStatus, jqXHR ){

			if( showElement !== undefined ){
				$( showElement ).fadeOut(100);
			}

			if(!data.messages){
                swal.close();
				if(fullData['scrollTo']){
                    var offset 		= $('#rev_item').offset();
                    var offsetTop 	= offset.top;
                    var totalScroll = offsetTop-120;

                    $('body,html').animate({
                        scrollTop: totalScroll
                    }, 500);
				}

			}

			if(data.addContent){
				if(!data.addContent[0]){
					$('#loadPhotoButton').closest('.row').remove();
				}
			}

			$.each(data, function( elementId, item ){

               	var selector = '#' + elementId;

				switch( item[1] == undefined ? 'rewrite' : item[1] ){
					
					case 'rewrite':
						$( selector ).html( item[0] );
					break;
					
					case 'before':
						$( selector ).prepend( item[0] );

					break;

					case 'after':
						$( selector ).append( item[0] );

					break;
				
				}
			
			});

				if ( callback !== undefined ){
					eval(callback);
				}

				if(localStorage.getItem('gager')){
                    localStorage.removeItem("gager");
				}
		},
		
		complete: function(){
			
			if( showElement !== undefined ){
				$( showElement ).fadeOut(100);
			}
			
			if( hideElement !== undefined )
				$( hideElement ).fadeTo('fast', 1);
			
		},

		error: function( request, error ){
            //swal.close();
			var errorElement = '#ajaxError';
			var errorStyle = 'position:fixed;top:0;padding:10px;background:red;opacity:0.4;font-size:12px;color:#fff';
           /* swal({
                title: "Ошибка",
                text: "Ошибка сервера, попробуйте позже.",
                icon: "error"
            });*/
			$('body').after('<div style="' + errorStyle + '"><a href="#" onclick="$(this).parent().remove();return false" style="float:right;margin:0 0 0 10px">[X]</a>AJAX [' + url + ']: ' + error + '</div>');
		}
		
	});
	
}