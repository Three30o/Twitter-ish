$(function() {

/*------------------
  State Management
-------------------*/
	/* --  When 'textarea gets clicked, add a class '.expand' to the '.compose' section -- */
	$(document).on('click', '.compose', function() {
		$(this).addClass('expand');

		var postMax = 140;

        $('.count').text(postMax);

        $('textarea').keyup(function() {
            var postLength = $(this).val().length;
            var charactersTyped = postMax - postLength;

        $('.count').text(charactersTyped);

            if(charactersTyped < 0) {
                $('.count').addClass('disabled');
            } else {
                $('.count').removeClass('disabled');
            }
        });

	})

	/* --  When original tweet gets clicked, toggle respective '.thread' visibilty -- */
	/* --  Also, add a class '.expand' to the '.thread' -- */
	$('.tweets').on('click', '.thread > .tweet', function() {
		$(this).parents('.thread').toggleClass('expand');
	});


/*------------------
  User Object
-------------------*/
	var User = {
		handle: '@user',
		img: 'images/lake.jpg'
	}


/*------------------
  Templating - Handlebars.js
-------------------*/	
	renderTweet = function(User, message) {

		var tweet = Handlebars.compile($('#template-tweet').html());
		
		return tweet({
			handle: User.handle,
			img: User.img,
			message: message
		});

	};


//----------------------------------------------------------------------------------
	var renderCompose = function() {

		var compose = Handlebars.compile($('#template-compose').html());

		return compose();

	};


//----------------------------------------------------------------------------------
	var renderThread = function(User, message) {

		var thread = Handlebars.compile($('#template-thread').html());

		//Get the thread template
		return thread({
			//Get the tweet template
			tweet: renderTweet(User, message),
			//Get the compose template
			compose: renderCompose()
		});
		
	};


/*------------------
  Composition
-------------------*/

	$(document).on('submit', 'form', function(e) {
   		e.preventDefault();

   		var message = $(this).find('textarea').val();

   		//We are writing a compose in the header
   		if ($(this).parents('header').length) {
   			//RenderThread to .tweets
   			$('.tweets').append(renderThread(User, message));
   		} else {
   			//RenderTweet to this message's parent
   			$(this).parent().append(renderTweet(User, message));
   		}

   		//Clear textbox
   		$('textarea').val('');

   		//Retract compose section so it's not expanded
   		$('.compose').removeClass('expand');
   		
	});

});