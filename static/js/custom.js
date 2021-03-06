/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.1.3.1 or above
 *
 * http://gmarwaha.com/blog/?p=7
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.2.0
 * Requires Jquery 1.2.1 from version 0.2.0 onwards.
 * For jquery 1.1.x, use version 0.1.0 of lavalamp
 */

(function($){
    $.fn.lavaLamp=function(o){
        o=$.extend({
            fx:"linear",
            speed:500,
            click:function() {}
        },o||{});
    return this.each( function() {
        var me=$(this),noop=function() {},$parent_me=me.parent(),$back=$('<div id="marker" class="back"></div>').appendTo($parent_me),$li=$("> li",this),curr=$("> li.current",this)[0]||$($li[0]).addClass("current")[0];
        $li.not(".back").hover( function() {
            move(this)
            },noop);
        $(this).hover(noop,function() {
            move(curr)
            });
        function setCurr(el){
            $back.css({
                "left":el.offsetLeft+"px",
                "width":el.offsetWidth+"px"
                });
            curr=el
            };

        $li.click(function(e){
            setCurr(this);
            return o.click.apply(this,[e,this])
            });
        setCurr(curr);
        function move(el){
            $back.each( function() {
                $(this).dequeue()
                }).animate({
                    width:el.offsetWidth,
                    left:el.offsetLeft
                },o.speed,o.fx)
            }
        })
}
})(jQuery);

/* ---------------------------------------------------------------------- */
/*  Load Goolge Webfonts
/* ---------------------------------------------------------------------- */

WebFontConfig = {
    google: {
        families: ['Droid+Serif:400,700,400italic:latin', 'Love+Ya+Like+A+Sister::latin', 'Fredericka+the+Great::latin']
    }
};
( function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//proxy.swpbox.info/ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('body')[0];
    s.parentNode.insertBefore(wf, s);
})();

/* end Load Google Fonts */

/***************************************/
/* DOM READY --> Begin                 */
/***************************************/

jQuery(document).ready( function() {

    var clickEvent    = 'click',
        resizeEvent   = 'resize',

        nextFunction = function() {

        /* ---------------------------------------------------------------------- */
        /*  Flex Slider
        /* ---------------------------------------------------------------------- */

        ( function() {

            if ($('#slider').length) {
                $(window).load( function() {
                    $('#slider img').css('visibility', 'visible').fadeIn();
                    $('#slider').flexslider({
                        directionNav: true
                    });
                });
            }

        })();

        /* end Flex Slider */

        /* ---------------------------------------------------------------------- */
        /*  Elastic Slider
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('#ei-slider').length) {

                $('#ei-slider').eislideshow({
                    animation           : 'center',
                    autoplay            : true,
                    slideshow_interval  : 3000,
                    titlesFactor        : 0
                });
            }

        })();

        /* end Elastic Slider */

        /* ---------------------------------------------------------------------- */
        /*  jCarousel
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $carousel = $('.projects-carousel');
            if($carousel.length) {
                var scrollCount;

                if( $(window).width() < 479) {
                    scrollCount = 1;
                } else if($(window).width() < 768) {
                    scrollCount = 1;
                } else if($(window).width() < 960) {
                    scrollCount = 2;
                } else {
                    scrollCount = 3;
                }
                $carousel.jcarousel({
                    animation : 600,
                    easing    : 'easeOutCubic',
                    scroll    : scrollCount
                });
            }

        })();

        /* end jCarousel */

        /* ---------------------------------------------------------------------- */
        /*  Main Navigation
        /* ---------------------------------------------------------------------- */

        ( function() {

            var arrowimages = {
                down: 'downarrowclass',
                right: 'rightarrowclass'
            };
            var $mainNav    = $('#navigation').find('> ul'),
            optionsList = '<option value="" selected>Navigation</option>';

            var $headers = $mainNav.find("ul").parent();
            $headers.each(function (i) {
                var $curobj = $(this);
                this.istopheader = $curobj.parents("ul").length == 1 ? true : false;
                $curobj.children("a").append('<span class="' + (this.istopheader ? arrowimages.down : arrowimages.right) +'"></span>');
            });

            $mainNav.lavaLamp({
                fx: "easeOutCubic",
                speed: 400
            });

            // Navigation Responsive
            $mainNav.find('li').each( function() {
                var $this   = $(this),
                $anchor = $this.children('a'),
                depth   = $this.parents('ul').length - 1,
                dash  = '';

                if(depth) {
                    while( depth > 0 ) {
                        dash += '--';
                        depth--;
                    }
                }

                optionsList += '<option value="' + $anchor.attr('href') + '">' + dash + ' ' + $anchor.text() + '</option>';

            }).end()
            .after('<select class="nav-responsive">' + optionsList + '</select>');

            $('.nav-responsive').on('change', function() {
                window.location = $(this).val();
            });

        })();

        /* end Main Navigation */

        /* ---------------------------------------------------------------------- */
        /*  Cycle Latest
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $latest = $("ul.latest");

            if($latest.length) {
                function onAfter(curr, next, opts, fwd) {
                    var index = opts.currSlide;
                    //get the height of the current slide
                    var $ht = $(this).height();
                    //set the container's height to that of the current slide
                    $(this).parent().animate({
                        height: $ht
                    });
                }
                $latest.after('<div class="latest-pager">&nbsp;</div>').cycle({
                    fx: 'fade',
                    timeout: 8000,
                    height: 'auto',
                    pause: 1,
                    pager: '.latest-pager',
                    before: onAfter,
                    prev:    '#prev',
                    next:    '#next',
                    cleartypeNoBg: true
                });

                // Include swipe touch
                if(Modernizr.touch) {

                    function swipe(e, dir) {

                        var $latest = $(e.currentTarget);

                        $latest.data('dir', '')

                        if(dir === 'left') {
                            $latest.cycle('next');
                        }

                        if(dir === 'right') {
                            $latest.data('dir', 'prev')
                            $latest.cycle('prev');
                        }
                    }

                    $latest.swipe({
                        swipeLeft       : swipe,
                        swipeRight      : swipe,
                        allowPageScroll : 'auto'
                    });

                }
            }

        })();

        /* end Cycle */

        /* ---------------------------------------------------------------------- */
        /*  Cycle Testimonials
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $quotes = $("ul.quoteBox");

            if($quotes.length) {

                // Run slider when all images are fully loaded
                $(window).load( function() {

                    $quotes.each(function(i) {
                        var $this = $(this);

                        $this.cycle({
                            before: function(curr, next, opts) {
                                var $this = $(this);
                                $this.parent().stop().animate({
                                    height: $this.height()
                                    }, opts.speed);
                            },
                            containerResize : false,
                            easing          : 'easeInOutExpo',
                            fx              : 'fade',
                            fit             : true,
                            next            : '.quote-next',
                            pause           : true,
                            prev            : '.quote-prev',
                            slideExpr       : 'li',
                            slideResize     : true,
                            speed           : 600,
                            timeout         : 4000,
                            width           : '100%'
                        });
                    });

                });

                // Include swipe touch
                if(Modernizr.touch) {

                    function swipe(e, dir) {

                        var $quotes = $(e.currentTarget);

                        $quotes.data('dir', '')

                        if(dir === 'left') {
                            $quotes.cycle('next');
                        }

                        if(dir === 'right') {
                            $quotes.data('dir', 'prev')
                            $quotes.cycle('prev');
                        }

                    }

                    $quotes.swipe({
                        swipeLeft       : swipe,
                        swipeRight      : swipe,
                        allowPageScroll : 'auto'
                    });

                }
            }

        })();

        /* end Cycle */

        /* ---------------------------------------------------------------------- */
        /*  Flickr Initialization
        /* ---------------------------------------------------------------------- */

        jQuery('ul#flickr-badge').jflickrfeed({
            limit: 6,
            qstrings: {
                id: '76745153@N04'
            },
            itemTemplate: '<li><a href="http://www.flickr.com/photos/76745153@N04"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
        });

        /* end Flickr --> End */

        /* ---------------------------------------------------------------------- */
        /*  Fit Videos
        /* ---------------------------------------------------------------------- */

        ( function() {

            $('.container').each( function() {
                var target  = [
                    "iframe[src^='http://www.youtube.com']",
                    "iframe[src^='http://player.vimeo.com']",
                    "object",
                    "embed"
                ],
                $allVideos = $(this).find(target.join(','));

                $allVideos.each( function() {
                    var $this = $(this);
                    if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.liquid-video-wrapper').length) {
                        return;
                    }
                    var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
                    aspectRatio = height / $this.width();
                    if(!$this.attr('id')){
                        var $ID =  Math.floor(Math.random()*9999999);
                        $this.attr('id', $ID);
                    }
                    $this.wrap('<div class="liquid-video-wrapper"></div>').parent('.liquid-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
                    $this.removeAttr('height').removeAttr('width');
                });
            });

        })();

        /* end Fit Videos */

        /* ---------------------------------------------------------------------- */
        /*  VideoJS
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $player = $('.video-js');

            if($player.length) {

                function adjustPlayer() {

                    $player.each(function( i ) {

                        var $this        = $(this)
                            playerWidth  = $this.parent().width(),
                            playerHeight = playerWidth / ( $this.children('.vjs-tech').data('aspect-ratio') || 1.78 );

                        if( playerWidth <= 300 ) {
                            $this.addClass('vjs-player-width-300');
                        } else {
                            $this.removeClass('vjs-player-width-300');
                        }

                        if( playerWidth <= 250 ) {
                            $this.addClass('vjs-player-width-250');
                        } else {
                            $this.removeClass('vjs-player-width-250');
                        }

                        $this.css({
                            'height' : playerHeight,
                            'width'  : playerWidth
                        })
                        .attr('height', playerHeight )
                        .attr('width', playerWidth );

                    });

                }

                adjustPlayer();

                $(window).on(resizeEvent, function() {

                    var timer = window.setTimeout( function() {
                        window.clearTimeout( timer );
                        adjustPlayer();
                    }, 30 );

                });

            }

        })();

        /* end VideoJS */

        /* ---------------------------------------------------------------------- */
        /*  AudioPlayerV1
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $player = $('.AudioPlayerV1');

            if($player.length) {

                $player.each(function(i) {

                    var $this = $(this);

                    $this.prev('audio').hide().end()
                         .wrap('<div class="entry-audio" />');

                });

                function adjustPlayer(resize){

                    $player.each(function(i) {

                        var $this            = $(this),
                            $lis             = $this.children('li'),
                            $progressBar     = $this.children('li.APV1_container'),
                            playerWidth      = $this.parent().width(),
                            lisWidth         = 0;

                        if(!resize)
                            $this.prev('audio').hide()

                        if(playerWidth <= 300 ) {
                            $this.addClass('APV1_player_width_300');
                        } else {
                            $this.removeClass('APV1_player_width_300');
                        }

                        if( playerWidth <= 250 ) {
                            $this.addClass('APV1_player_width_250');
                        } else {
                            $this.removeClass('APV1_player_width_250');
                        }

                        if( playerWidth <= 200) {
                            $this.addClass('APV1_player_width_200');
                        } else {
                            $this.removeClass('APV1_player_width_200');
                        }

                        $lis.each( function() {

                            var $li = $(this);
                            lisWidth += $li.width();

                        });

                        $this.width($this.parent().width());
                        $progressBar.width(playerWidth - (lisWidth - $progressBar.width()));

                    });

                }

                adjustPlayer();

                $(window).on(resizeEvent, function() {

                    var timer = window.setTimeout( function() {
                        window.clearTimeout( timer );
                        adjustPlayer(resize = true);
                    }, 30);

                });

            }

        })();

        /* end AudioPlayerV1 */

        /* ---------------------------------------------------------------------- */
        /*  Top and Bottom Holder
        /* ---------------------------------------------------------------------- */

        var marker = $('#marker'), $tpanel = $('#header-top > .container');

        $('#more').click(function(e){

            var $target = $(e.target);

            if($target.hasClass('hide')) {
                $tpanel.animate({
                    opacity: '0'
                }, 200)
            }

            $tpanel.slideToggle(600, function() {
                $target.toggleClass('hide');

                if($(this).css('display') == 'block') {
                    marker.animate({opacity : 0});
                    $(this).animate({
                        opacity:'1'
                    }, 200);

                } else {
                    marker.animate({opacity : 1});
                    $(this).animate({
                        opacity:'0'
                    }, 200);

                }
            });

            e.preventDefault();
        });
        /* ---------------------------------------------------------------------- */
        /*  Bottom Toogle Panel
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $panel = $(".panel");

            $('#footer-more').click(function(e) {

                var $target = $(e.target);

                if($target.hasClass('hide')) {
                    $panel.animate({
                        opacity: '0'
                    }, 200)
                }

                var $pos = $(window).scrollTop();
                $panelHeight = $('.panel').outerHeight(true);

                $panel.slideToggle(600, function() {
                    $target.toggleClass('hide');
                    if($(this).css('display') == 'block') {
                        $(this).animate({
                            opacity:'1'
                        }, 200);
                    } else {
                        $(this).animate({
                            opacity:'0'
                        }, 200);
                    }
                }
                )

                $('html, body').animate({
                        scrollTop : $pos + $panelHeight
                    }, 1000);
                e.preventDefault();
            });

        })();

        /* end and Bottom Holder  */

        /* ---------------------------------------------------------------------- */
        /*  Min-height
        /* ---------------------------------------------------------------------- */

        ( function() {

            $('.content-wrapper')
            .css('min-height', $(window).outerHeight(true)
                - $('#header').outerHeight(true)
                - $('#footer').outerHeight(true) - 4);

        })();

        /* end Min-height */

        /* ---------------------------------------------------------------------- */
        /*  Accordion Content
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('.acc-container').length) {

                var $container = $('.acc-container'),
                $trigger   = $('.acc-trigger');

                $container.hide();
                $trigger.first().addClass('active').next().show();

                var fullWidth = $container.outerWidth(true);
                $trigger.css('width', fullWidth);
                $container.css('width', fullWidth);

                $trigger.on(clickEvent, function(e) {
                    if( $(this).next().is(':hidden') ) {
                        $trigger.removeClass('active').next().slideUp(300);
                        $(this).toggleClass('active').next().slideDown(300);
                    }
                    e.preventDefault();
                });

                // Resize
                $(window).on(resizeEvent, function() {
                    fullWidth = $container.outerWidth(true)
                    $trigger.css('width', $trigger.parent().width() );
                    $container.css('width', $container.parent().width() );
                });
            }

        })();

        /* end Accordion Content */

        /* ---------------------------------------------------------------------- */
        /*  Contact Form
        /* ---------------------------------------------------------------------- */


        ( function() {

            if($('#contactform').length) {

                var $form = $('#contactform'),
                $loader = '<img src="//cdn.swpbox.info/images/loader.gif?h=HASH:B:images/loader.gif:E:HASH" height="11" width="16" alt="Loading..." />';
                $form.append('<div class="hidden" id="contact_form_responce">');

                var $response = $('#contact_form_responce');
                $response.append('<blockquote></blockquote>');

                $form.submit(function(e){

                    $response.find('blockquote').html($loader);

                    var data = {
                        action: "contact_form_request",
                        values: $("#contactform").serialize()
                    };

                    //send data to server
                    $.post("php/contact-send.php", data, function(response) {

                        response = $.parseJSON(response);

                        $(".wrong-data").removeClass("wrong-data");
                        $response.find('img').remove();

                        if(response.is_errors){

                            $response.find('blockquote').removeClass().addClass("error");
                            $.each(response.info, function(input_name, input_label) {

                                $("[name="+input_name+"]").addClass("wrong-data");
                                $response.find('blockquote').append('Please enter correctly "'+input_label+'"!'+ '</br>');
                            });

                        } else {

                            $response.find('blockquote').removeClass().addClass('success');

                            if(response.info == 'success'){

                                $response.find('blockquote').append('Your email has been sent!');
                                $form.find('input:not(input[type="submit"], button), textarea, select').val('').attr( 'checked', false );
                                $response.delay(2000).hide(400);
                                return false;
                            }

                            if(response.info == 'server_fail'){
                                $response.find('blockquote').append('Server failed. Send later!');
                            }
                        }

                        // Scroll to bottom of the form to show respond message
                        var bottomPosition = $form.offset().top + $form.outerHeight() - $(window).height();

                        if( $(document).scrollTop() < bottomPosition)
                            $('html, body').animate({
                                scrollTop : bottomPosition
                            });

                        $response.show(450);

                    });

                    e.preventDefault();

                });

            }

        })();

        /* end Contact Form */

        /* ---------------------------------------------------------------------- */
        /*  Content Tabs
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('.content-tabs').length || $('.aside-tabs').length) {

                var $contentTabs = $('.content-tabs'),
                $asideTabs  = $('.aside-tabs');

                $.fn.tabs = function($obj) {
                    $tabsNavLis = $obj.find('.tabs-nav').children('li'),
                    $tabContent = $obj.find('.tab-content');

                    $tabsNavLis.first().addClass('active').show();
                    $tabContent.first().show();

                    $obj.find('ul.tabs-nav li').on(clickEvent, function(e) {
                        var $this = $(this);

                        $obj.find('ul.tabs-nav li').removeClass('active');
                        $this.addClass('active');
                        $obj.find('.tab-content').hide(); //Hide all tab content
                        $($this.find('a').attr('href')).fadeIn();

                        e.preventDefault();
                    });
                }

                $contentTabs.tabs($contentTabs);
                $asideTabs.tabs($asideTabs);
            }

        })();

        /* end Content Tabs */

        /* ---------------------------------------------------------------------- */
        /*  Content Toggle
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('.toggle-container').length) {
                $(".toggle-container").hide(); //Hide (Collapse) the toggle containers on load
                //Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
                $(".trigger").click( function() {
                    $(this).toggleClass("active").next().slideToggle("slow");
                    return false; //Prevent the browser jump to the link anchor
                });
            }

        })();

        /* end Content Toggle */

        /* ---------------------------------------------------------------------- */
        /*  Placeholder
        /* ---------------------------------------------------------------------- */

        ( function() {

            $.fn.placeholder = function() {
                if(typeof document.createElement("input").placeholder == 'undefined') {
                    $('[placeholder]').focus( function() {
                        var input = $(this);
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                            input.removeClass('placeholder');
                        }
                    }).blur( function() {
                        var input = $(this);
                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
                            input.addClass('placeholder');
                            input.val(input.attr('placeholder'));
                        }
                    }).blur().parents('form').submit( function() {
                        $(this).find('[placeholder]').each( function() {
                            var input = $(this);
                            if (input.val() == input.attr('placeholder')) {
                                input.val('');
                            }
                        })
                    });
                }
            }

            $.fn.placeholder();

        })();

        /* end Placeholder */

        /* ---------------------------------------------------------------------- */
        /*  Back to Top
        /* ---------------------------------------------------------------------- */

        ( function() {

            var extend = {
                button      : '#back-top',
                text        : 'Back to Top',
                min         : 200,
                fadeIn      : 400,
                fadeOut     : 400,
                speed       : 800,
                easing      : 'easeOutQuint'
            }

            $('body').append('<a href="#" id="' + extend.button.substring(1) + '" title="' + extend.text + '">' + extend.text + '</a>');

            $(window).scroll( function() {
                var pos = $(window).scrollTop();

                if (pos > extend.min)
                    $(extend.button).fadeIn(extend.fadeIn);
                else
                    $(extend.button).fadeOut (extend.fadeOut);
            });

            $(extend.button).click(function(e){
                $('html, body').animate({
                    scrollTop : 0
                }, extend.speed, extend.easing);
                e.preventDefault();
            });

        })();

        /* end Back to Top */

        /* ---------------------------------------------------------------------- */
        /*  Fancybox
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('.single-image').length || $('a.video').length) {
                ( function() {
                    $('.single-image, .video').fancybox({
                        'titlePosition' : 'over',
                        'transitionIn'  : 'fade',
                        'transitionOut' : 'fade'
                    }).each( function() {
                        $(this).append('<span class="curtain">&nbsp;</span>');
                    });
                })()
            }
            // resize box when all images are fully loaded
            if($('.single-image').length || $('a.video').length) {
                $('.single-image, .video').each( function() {
                    var $this = $(this),
                        $img = $this.find('.curtain').siblings('img');
                    // makesure here is only one image
                    if ($img.length == 1) {
                        var resizeFun = function() {
                                $this.width('100%');
                                $this.width($img.outerWidth());
                            },
                            resizeLoad = function() {
                                resizeFun();
                                $(window).on(resizeEvent, resizeFun);
                            };
                        $img.load(resizeLoad);
                    }
                });
            }

            if($('a.video').length) {
                ( function() {
                    $('a.video').on(clickEvent, function() {
                        $.fancybox({
                            'type' : 'iframe',
                            'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '&autoplay=1',
                            'overlayShow' : true,
                            'centerOnScroll' : true,
                            'speedIn' : 100,
                            'speedOut' : 50,
                            'width' : 640,
                            'height' : 480
                        });
                        return false;
                    });
                })()
            }

            /* end fancybox --> End */

            // Hover effects Portfolio filter

            $.fn.slideShow = function() {
                this.animate({
                    marginLeft : 'show',
                    marginRight : 'show',
                    paddingLeft : 'show',
                    paddingRight : 'show',
                    width : 'show'
                }
                )
                };

            $.fn.slideHide = function() {
                this.animate( {
                    marginLeft : 'hide',
                    marginRight : 'hide',
                    paddingLeft : 'hide',
                    paddingRight : 'hide',
                    width : 'hide'
                }
                )
                };

        })();

        /* end Fancybox */

        /* ---------------------------------------------------------------------- */
        /*  DDNS Autohide
        /* ---------------------------------------------------------------------- */

        ( function() {
            var hideClassName = 'ddns-hide',
                showClassName = 'ddns-show',
                ddnsThirdNode = 'one-fourth-third',
                itemAttrName = 'data-categories',
                $itemArticle = $('#portfolio-items.ddns article'),
                $itemPrev = null,
                nodeThisText = '',
                nodePrevText = nodeThisText,
                nodeThisAttr = nodeThisText,
                nodePrevAttr = nodeThisText,
                nodeEqu;
            $itemArticle.each( function() {
                var $this = $(this),
                    $node = $this.children('div');
                nodeThisAttr = $this.attr(itemAttrName);
                if (nodeThisAttr == nodePrevAttr) {
                    nodeEqu = true;
                } else {
                    nodeEqu = false;
                    nodePrevAttr = nodeThisAttr;
                }
                if ($node.length == 4) {
                    $node = $node.first().next();
                    nodeThisText = $node.text();
                    var $nodeNext = $node.next(),
                        $nodeEnd = $nodeNext.next();
                    $nodeNext.addClass(ddnsThirdNode);
                    if (nodeThisText == $nodeNext.text() && nodeThisText == $nodeEnd.text()) {
                        $nodeNext.addClass(hideClassName);
                        $nodeEnd.addClass(hideClassName);
                    } else {
                        nodeThisText = '';
                        nodeEqu = false;
                    }
                } else {
                    $node = $node.first().next();
                    nodeThisText = $node.text();
                }
                if (nodeEqu && nodeThisText == nodePrevText) {
                    $this.addClass(hideClassName);
                } else {
                    if ($itemPrev) {
                        $itemPrev.removeClass(hideClassName);
                    }
                    nodePrevText = nodeThisText;
                }
                $itemPrev = $this;
            });
            if ($itemPrev) {
                $itemPrev.removeClass(hideClassName);
            }
            $itemPrev = null;
            $itemArticle.each( function() {
                var $this = $(this);
                if ($itemPrev &&
                    $itemPrev.hasClass(hideClassName) &&
                    !$this.hasClass(hideClassName)) {
                    var $prevDivTime = $itemPrev.children('div.time'),
                        $prevDivLast = $itemPrev.children('div.last'),
                        testClassName = 'nochg',
                        additionalClassName = '';
                    if (!$prevDivTime) {
                        $prevDivTime = $('<div/>').text('1970-01-01 ');
                    }
                    if (!$prevDivLast) {
                        $prevDivLast = $('<div/>').text(testClassName + ' 0.0.0.0').addClass(testClassName);
                    }
                    if ($prevDivLast.hasClass(testClassName)) {
                        additionalClassName = ' ' + testClassName;
                    }
                    $itemPrev.after(
                        $('<article/>').attr(
                            itemAttrName,
                            $itemPrev.attr(itemAttrName)
                        ).addClass(
                            showClassName
                        ).append(
                            $('<div/>').addClass(
                                'one-fourth time'
                            ).text(
                                $prevDivTime.text().substring(0, 11) + '. . . . . .'
                            ),
                            $('<div/>').addClass(
                                'three-fourth last' + additionalClassName
                            ).text(
                                $prevDivLast.text()
                            )
                        )
                    );
                }
                $itemPrev = $this;
            });
        })();

        /* end DDNS Autohide */

        /* ------------------------------------------------------------------- */
        /*  Portfolio
        /* ------------------------------------------------------------------- */

        ( function() {

            var $cont = $('#portfolio-items'),
                $container = $('.container'),
                $itemsFilter = $('#portfolio-filter'),
                $autoindexTitle = $('.autoindex-title'),
                autoindexTitleWidth = '100%',
                mouseOver;

            if ($cont.length) {

                // Copy categories to item classes
                $('article', $cont).each(function(i) {
                    var $this = $(this);
                    $this.addClass($this.attr('data-categories'));
                });

                // Run Isotope when all images are fully loaded
                $(window).on('load', function() {
                    $cont.isotope({
                        itemSelector : 'article',
                        layoutMode   : 'fitRows'
                    });
                });

            }

            if ($itemsFilter.length) {

                var $itemsFilterSub = $itemsFilter.find('ul');
                if ($itemsFilterSub.length) {
                    $itemsFilterSub.each( function() {
                        $(this).find('a').first().addClass('active');
                    });
                } else {
                    $itemsFilter.find('a').first().addClass('active');
                }
                $itemsFilter.find('a').not('.active').hide();

                if ($autoindexTitle.length) {
                    var $resizeTitleFun = function() {
                        var $itemsFilterNode = $itemsFilter.find('a.active');
                            deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
                            newWidth = $container.width() - $itemsFilterNode.width() - 57 /*37+20*/;
                        if ($itemsFilterNode && deviceWidth >= 768) {
                            $autoindexTitle.width(newWidth);
                        } else {
                            $autoindexTitle.width('100%');
                        }
                        autoindexTitleWidth = newWidth;
                    }
                    $resizeTitleFun();
                    $(window).load($resizeTitleFun).on(resizeEvent, $resizeTitleFun);
                }

                // Filter projects
                $itemsFilter.on(clickEvent, 'a', function(e) {
                    var $this         = $(this),
                        currentOption = $this.attr('data-categories');

                    var $itemsFilterSub = $itemsFilter.find('ul');
                    if ($itemsFilterSub.length) {
                        $itemsFilterSub.each( function() {
                            if($(this).find($this).length) {
                                $(this).find('a').removeClass('active');
                            }
                        });
                    } else {
                        $itemsFilter.find('a').removeClass('active');
                    }
                    $this.addClass('active');

                    if(currentOption) {
                        if(currentOption !== '*')
                            currentOption = currentOption.replace(currentOption, '.' + currentOption);

                        $cont.isotope({
                            filter : currentOption
                        });
                    }

                    if ($autoindexTitle.length) {
                        autoindexTitleWidth = $container.width() - $this.width() - 57 /*37+20*/;
                    }
                    e.preventDefault();

                }).on('mouseenter', function() {
                    var $this = $(this),
                        deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

                    clearTimeout(mouseOver);
                    if (deviceWidth < 768) return false;

                    mouseOver = setTimeout( function() {
                        $this.find('li a').stop(true, true).slideShow(300);
                        $autoindexTitle.stop(true, true).delay(100).animate({
                            width: $container.width() - 400
                        }, {
                            duration: 220,
                            specialEasing: { width: 'linear' }
                        });
                    }, 100);

                }).on('mouseleave', function() {
                    var $this = $(this),
                        deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

                    clearTimeout(mouseOver);
                    if (deviceWidth < 768) return false;

                    mouseOver = setTimeout( function() {
                        $this.find('li a').not('.active').stop(true, true).slideHide(150);
                        $autoindexTitle.stop(true, true).delay(200).animate({
                            width: autoindexTitleWidth
                        }, {
                            duration: 300,
                            specialEasing: { width: 'linear' }
                        });
                    }, 500);

                });

            }

        })();

        /* end Portfolio  */

        /* ---------------------------------------------------------------------- */
        /*  Image Gallery Slider
        /* ---------------------------------------------------------------------- */

        ( function() {

            var $slider = $('.image-gallery-slider ul');

            if($slider.length) {

                // Run slider when all images are fully loaded
                $(window).load( function() {

                    $slider.each(function(i) {
                        var $this = $(this);

                        $this.css('height', $this.find('li:first img').height())
                        .after('<div class="image-gallery-slider-nav"> <a class="prev">Prev</a> <a class="next">Next</a> </div>')
                        .cycle({
                            before: function(curr, next, opts) {
                                var $this = $(this);
                                $this.parent().stop().animate({
                                    height: $this.height()
                                    }, opts.speed);
                            },
                            containerResize : false,
                            easing          : 'easeInOutExpo',
                            fx              : 'scrollRight',
                            fit             : true,
                            next            : '.next',
                            pause           : true,
                            prev            : '.prev',
                            slideExpr       : 'li',
                            slideResize     : true,
                            speed           : 600,
                            timeout         : 0,
                            width           : '100%'
                        });

                    });

                    // Pause on nav hover
                    $('.image-gallery-slider-nav a').on('mouseenter', function() {
                        $(this).parent().prev().cycle('pause');
                    }).on('mouseleave', function() {
                        $(this).parent().prev().cycle('resume');
                    });

                });

                // Resize
                $(window).on(resizeEvent, function() {
                    $slider.css('height', $slider.find('li:visible img').height());
                });

                // Include swipe touch
                if(Modernizr.touch) {

                    function swipe(e, dir) {

                        var $slider = $(e.currentTarget);

                        $slider.data('dir', '')

                        if(dir === 'left') {
                            $slider.cycle('next');
                        }

                        if(dir === 'right') {
                            $slider.data('dir', 'prev')
                            $slider.cycle('prev');
                        }

                    }

                    $slider.swipe({
                        swipeLeft       : swipe,
                        swipeRight      : swipe,
                        allowPageScroll : 'auto'
                    });

                }
            }

        })();

        /* end Image Gallery Slider  */

        /* ---------------------------------------------------------------------- */
        /*  Twitter
        /* ---------------------------------------------------------------------- */

        ( function() {

            if($('.tweet').length) {
                $(".tweet").tweet({
                    username: "fanfbmltemplate",
                    page: 1,
                    avatar_size: 40,
                    count: 4,
                    loading_text: "loading ..."
                }).bind("loaded", function() {
                    var ul = $(this).find(".tweet_list");
                });
            }

        })();

        /* end Twitter */

        /* ---------------------------------------------------------------------- */
        /*  Resume Align Image
        /* ---------------------------------------------------------------------- */

        ( function() {
            var $itemBody = $('.markdown'),
                $itemImage = $itemBody.find('.alignright-image');
            if ($itemBody.length) {
                $itemBody.find('pre').each( function() {
                    $(this).addClass('prettyprint');
                });
            }
            if ($itemImage.length) {
                var $resizeFun = function() {
                    $itemImage.each( function() {
                        var $this = $(this),
                            $next = $this.next();
                        if ($next) {
                            $next.width(
                                $itemBody.width() - $this.outerWidth() - 24
                            );
                        }
                    });
                };
                $resizeFun();
                $(window).load($resizeFun).on(resizeEvent, $resizeFun);
            }
        })();

        /* end Resume Align Image */

        /* ---------------------------------------------------------------------- */
        /*  Google Maps & CDN Domain Status
        /* ---------------------------------------------------------------------- */

        ( function() {

            var domainStatusClass = '.domain-status-',
                $cdnBody          = $(domainStatusClass + 'cdn'),
                $freeshellBody    = $(domainStatusClass + 'freeshell'),
                $hangzhouBody     = $(domainStatusClass + 'hangzhou'),
                $staticBody       = $(domainStatusClass + 'static'),
                $mapBody          = $('#map.cdn-map'),
                mapBody_length    = $mapBody.length,
                gmap_complete     = 'gmap-complete',

                gMap_addMarkers   = 'addMarkers',
                gMap_delMarkers   = 'removeAllMarkers',

                // preload one resource
                preLoadOnce       = function(attr, value) {
                    return $.Deferred(function(dfd) {
                        if (value && value != '') {
                            if (!attr || attr == '') {
                                attr = 'html';
                            }
                            if (attr.match("image") !== null) {
                                // Image
                                $('<img/>').load( function() {
                                    dfd.resolve();
                                }).error( function() {
                                    dfd.reject();
                                }).attr('src', value);
                            } else if (attr.match("json") !== null) {
                                // Json
                                $.getJSON(value, function(result) {
                                    dfd.resolve();
                                }).error( function() {
                                    dfd.reject();
                                });
                            } else if (attr.match("load") !== null) {
                                // Load
                                $('<div/>').load(value, function() {
                                    dfd.resolve();
                                }).error( function() {
                                    dfd.reject();
                                });
                            } else {
                                // HTML
                                $.get(value, function(result) {
                                    dfd.resolve();
                                }).error( function() {
                                    dfd.reject();
                                });
                            }
                        } else {
                            dfd.reject();
                        }
                    }).promise();
                },

                // preload All static resources
                preLoadGmap       = function(preloadURL) {
                    return $.Deferred(function(dfd) {
                        if (preloadURL && preloadURL != '') {
                            $.getJSON(preloadURL, function(result) {
                                var mapPos     = 0,
                                    jsonLength = 0;
                                // Get Json length
                                for (var i in result) {
                                    jsonLength++;
                                }
                                // preload for each line
                                $.each(result, function(attr, value) {
                                    $.when(
                                        preLoadOnce(attr, value)
                                    ).always( function() {
                                        if (++mapPos == jsonLength) {
                                            dfd.resolve();
                                        }
                                    });
                                });
                            }).error( function() {
                                dfd.reject();
                            });
                        } else {
                            dfd.reject();
                        }
                    }).promise();
                },

                setupGmap         = function(mapItem, centerURL) {
                    return $.Deferred(function(dfd) {
                        // complete function
                        var onComplete   = function() {
                                mapItem.addClass(gmap_complete);
                                dfd.resolve();
                            },
                            default_gmap = {
                                address    : "China",
                                onComplete : onComplete
                            };
                        if (centerURL && centerURL != '') {
                            // map center
                            $.getJSON(centerURL, function(result) {
                                result.onComplete = onComplete;
                                mapItem.gMap(result);
                            }).error( function() {
                                mapItem.gMap(default_gmap);
                            });
                        } else {
                            mapItem.gMap(default_gmap);
                        }
                    }).promise();
                },

                addMarkers        = function(mapItem, markerURL) {
                    return $.Deferred(function(dfd) {
                        if (markerURL && markerURL != '') {
                            // Add makers by Json
                            $.getJSON(markerURL, function(result) {
                                mapItem.gMap(gMap_delMarkers);
                                mapItem.gMap(gMap_addMarkers, result);
                                dfd.resolve();
                            }).error( function() {
                                dfd.reject();
                            });
                        } else {
                            dfd.reject();
                        }
                    }).promise();
                },

                attrJson          = 'json-',
                attrJsonPreload   = attrJson + 'preload',
                attrJsonCenter    = attrJson + 'center',
                attrJsonMarker    = attrJson + 'marker',

                testTimeval       = 20000,
                testDelay         = 1000;

            if ($cdnBody.length || $freeshellBody.length || $staticBody.length || mapBody_length) {

                var domain          = '.swpbox.info',
                    testPngURL      = '/domain-test.png?t=',
                    freeshellDomain = '//freeshell' + domain + testPngURL,
                    hangzhouDomain  = '//hangzhou'  + domain + testPngURL,
                    staticDomain    = '//static'    + domain + testPngURL,

                    freeshellStatus = null,
                    hangzhouStatus  = null,
                    staticStatus    = null,

                    // domain status word className
                    highlight       = 'highlight',
                    highlight_none  = highlight + '1',
                    highlight_ok    = highlight + '2',
                    highlight_fail  = highlight + '3',
                    highlight_part  = highlight + '4',
                    highlight_wait  = highlight + '5',
                    highlight_spit  = ' ',
                    highlight_all   =
                        highlight_none + highlight_spit +
                        highlight_ok   + highlight_spit +
                        highlight_fail + highlight_spit +
                        highlight_part + highlight_spit +
                        highlight_wait,

                    testImageFun    = function(testImageSrc) {
                        return $.Deferred(function(dfd) {
                            if (testImageSrc && testImageSrc != '') {
                                // load image without cache
                                $('<img/>').load( function() {
                                    dfd.resolve();
                                }).error( function() {
                                    dfd.reject();
                                }).attr('src', testImageSrc + (new Date()).getTime());
                            } else {
                                dfd.reject();
                            }
                        }).promise();
                    },

                    // markers tags
                    mapMarker_none  = '-nl',
                    mapMarker_up    = '-up',
                    mapMarker_down  = '-dn',

                    // status function array for each domian
                    functionTable   = {

                        // freeshell
                        a : function () {
                            $.when(
                                testImageFun(freeshellDomain)
                            ).done( function() {
                                if (freeshellStatus !== true) {
                                    freeshellStatus = true;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus && hangzhouStatus && staticStatus) ? highlight_ok : highlight_part
                                        );
                                    });
                                    $freeshellBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_ok);
                                    });
                                    if (hangzhouStatus === null) {
                                        $hangzhouBody.each( function() {
                                            $(this).removeClass(highlight_all).addClass(highlight_wait);
                                        });
                                    }
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + mapMarker_up
                                                        + ( hangzhouStatus === null ? mapMarker_none : (hangzhouStatus ? mapMarker_up : mapMarker_down) )
                                                        + ( staticStatus   === null ? mapMarker_none : (staticStatus   ? mapMarker_up : mapMarker_down) )
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                freeshellStatus = false;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.b, testDelay);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.b, testDelay);
                                    }
                                } else {
                                    setTimeout(functionTable.b, testDelay);
                                }

                            }).fail( function() {
                                if (freeshellStatus !== false) {
                                    freeshellStatus = false;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus || hangzhouStatus || staticStatus) ? highlight_part : highlight_fail
                                        );
                                    });
                                    $freeshellBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_fail);
                                    });
                                    if (hangzhouStatus === null) {
                                        $hangzhouBody.each( function() {
                                            $(this).removeClass(highlight_all).addClass(highlight_wait);
                                        });
                                    }
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + mapMarker_down
                                                        + ( hangzhouStatus === null ? mapMarker_none : (hangzhouStatus ? mapMarker_up : mapMarker_down) )
                                                        + ( staticStatus   === null ? mapMarker_none : (staticStatus   ? mapMarker_up : mapMarker_down) )
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                freeshellStatus = true;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.b, testDelay);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.b, testDelay);
                                    }
                                } else {
                                    setTimeout(functionTable.b, testDelay);
                                }
                            });
                        },

                        // hangzhou
                        b : function () {
                            $.when(
                                testImageFun(hangzhouDomain)
                            ).done( function() {
                                if (hangzhouStatus !== true) {
                                    hangzhouStatus = true;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus && hangzhouStatus && staticStatus) ? highlight_ok : highlight_part
                                        );
                                    });
                                    $hangzhouBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_ok);
                                    });
                                    if (staticStatus === null) {
                                        $staticBody.each( function() {
                                            $(this).removeClass(highlight_all).addClass(highlight_wait);
                                        });
                                    }
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + (freeshellStatus ? mapMarker_up : mapMarker_down)
                                                        + mapMarker_up
                                                        + ( staticStatus === null ? mapMarker_none : (staticStatus ? mapMarker_up : mapMarker_down) )
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                hangzhouStatus = false;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.c, testDelay);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.c, testDelay);
                                    }
                                } else {
                                    setTimeout(functionTable.c, testDelay);
                                }

                            }).fail( function() {
                                if (hangzhouStatus !== false) {
                                    hangzhouStatus = false;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus || hangzhouStatus || staticStatus) ? highlight_part : highlight_fail
                                        );
                                    });
                                    $hangzhouBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_fail);
                                    });
                                    if (staticStatus === null) {
                                        $staticBody.each( function() {
                                            $(this).removeClass(highlight_all).addClass(highlight_wait);
                                        });
                                    }
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + (freeshellStatus ? mapMarker_up : mapMarker_down)
                                                        + mapMarker_down
                                                        + ( staticStatus === null ? mapMarker_none : (staticStatus ? mapMarker_up : mapMarker_down) )
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                hangzhouStatus = true;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.c, testDelay);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.c, testDelay);
                                    }
                                } else {
                                    setTimeout(functionTable.c, testDelay);
                                }
                            });
                        },

                        // static
                        c : function () {
                            $.when(
                                testImageFun(staticDomain)
                            ).done( function() {
                                if (staticStatus !== true) {
                                    staticStatus = true;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus && hangzhouStatus && staticStatus) ? highlight_ok : highlight_part
                                        );
                                    });
                                    $staticBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_ok);
                                    });
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + (freeshellStatus ? mapMarker_up : mapMarker_down)
                                                        + (hangzhouStatus  ? mapMarker_up : mapMarker_down)
                                                        + mapMarker_up
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                staticStatus = false;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.a, testTimeval);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.a, testTimeval);
                                    }
                                } else {
                                    setTimeout(functionTable.a, testTimeval);
                                }

                            }).fail( function() {
                                if (staticStatus !== false) {
                                    staticStatus = false;
                                    $cdnBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(
                                            (freeshellStatus || hangzhouStatus || staticStatus) ? highlight_part : highlight_fail
                                        );
                                    });
                                    $staticBody.each( function() {
                                        $(this).removeClass(highlight_all).addClass(highlight_fail);
                                    });
                                    // setup map
                                    if (mapBody_length) {
                                        var mapPos = 0;
                                        $mapBody.each( function() {
                                            var $this      = $(this),
                                                markerAttr = attrJsonMarker
                                                        + (freeshellStatus ? mapMarker_up : mapMarker_down)
                                                        + (hangzhouStatus  ? mapMarker_up : mapMarker_down)
                                                        + mapMarker_down
                                                    ;
                                            $.when(
                                                addMarkers($this, $this.attr(markerAttr))
                                            ).fail( function() {
                                                staticStatus = true;
                                            }).always( function() {
                                                if (++mapPos == mapBody_length) {
                                                    setTimeout(functionTable.a, testTimeval);
                                                }
                                            });
                                        });
                                    } else {
                                        setTimeout(functionTable.a, testTimeval);
                                    }
                                } else {
                                    setTimeout(functionTable.a, testTimeval);
                                }
                            });
                        }

                    };

                if (mapBody_length) {

                    var mapPos = 0;
                    $mapBody.each( function() {
                        var $this      = $(this),
                            mapPreload = $this.attr(attrJsonPreload),
                            mapCenter  = $this.attr(attrJsonCenter),
                            mapMarker  = $this.attr(attrJsonMarker);

                        // load gmap one by one
                        $.when(
                            preLoadGmap(mapPreload)
                        ).always( function() {
                            $.when(
                                setupGmap($this, mapCenter)
                            ).always( function() {
                                $.when(
                                    addMarkers($this, mapMarker)
                                ).always( function() {
                                    if (++mapPos == mapBody_length) {
                                        // load domian status function
                                        setTimeout(functionTable.a, testDelay);
                                    }
                                });
                            });
                        });
                    });

                } else {
                    // load domian status function
                    setTimeout(functionTable.a, testDelay);
                }

            } else {

                $('#map').each( function() {
                    var $this      = $(this),
                        mapPreload = $this.attr(attrJsonPreload),
                        mapCenter  = $this.attr(attrJsonCenter),
                        mapMarker  = $this.attr(attrJsonMarker);

                    // setup gmap item
                    $.when(
                        preLoadGmap(mapPreload)
                    ).always( function() {
                        $.when(
                            setupGmap($this, mapCenter)
                        ).always( function() {
                            addMarkers($this, mapMarker);
                        });
                    });
                });

            }

        })();

        /* end Google Maps & CDN Domain Status */

        /* ---------------------------------------------------------------------- */
        /*  SpanWords
        /* ---------------------------------------------------------------------- */

        ( function() {
            $('.spanwords').each( function() {
                var $this = $(this),
                    spanText = $this.text().replace(/./g, '<span>$&</span>');
                $this.html(spanText);
            });
        })();

        /* end SpanWords */

    };


    /* ---------------------------------------------------------------------- */
    /*  jQuery Load
    /* ---------------------------------------------------------------------- */

    ( function() {

        var $jquery_load = $('.jquery-load'),
            load_length  = $jquery_load.length;

        if (load_length) {
            var loadHtml = function(load_body, load_url) {
                    return $.Deferred(function(dfd) {
                        if (load_url && load_url != '') {
                            load_body.load(load_url, function() {
                                dfd.resolve();
                            }).error( function() {
                                dfd.reject();
                            });
                        } else {
                            dfd.reject();
                        }
                    }).promise();
                },
                loadPos = 0;

            $jquery_load.each( function() {
                var $this   = $(this),
                    loadSrc = $this.attr('data-load');
                $.when(
                    loadHtml($this, loadSrc)
                ).always( function() {
                    if (++loadPos == load_length) {
                        nextFunction();
                    }
                });
            });

        } else {
            nextFunction();
        }

    })();

    /* end jQuery Load */


/***************************************/
});/* DOM READY --> End                */
/***************************************/

/* ---------------------------------------------------------------------- */
/*  Flickr
/* ---------------------------------------------------------------------- */

(function () {
    $.fn.jflickrfeed = function (settings, callback) {
        settings = $.extend(true, {
            flickrbase: 'http://api.flickr.com/services/feeds/',
            feedapi: 'photos_public.gne',
            limit: 20,
            qstrings: {
                lang: 'en-us',
                format: 'json',
                jsoncallback: '?'
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: '',
            itemCallback: function () {}
        }, settings);
        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;
        for (var key in settings.qstrings) {
            if (!first) url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }
        return $(this).each(function () {
            var $container = $(this);
            var container = this;
            $.getJSON(url, function (data) {
                $.each(data.items, function (i, item) {
                    if (i < settings.limit) {
                        if (settings.cleanDescription) {
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if (regex.test(input)) {
                                item.description = input.match(regex)[2];
                                if (item.description != undefined)
                                    item.description = item.description.replace('<p>', '').replace('</p>', '');
                            }
                        }
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;
                        if (settings.useTemplate) {
                            var template = settings.itemTemplate;
                            for (var key in item) {
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            $container.append(template)
                        }
                        settings.itemCallback.call(container, item);
                    }
                });
                if ($.isFunction(callback)) {
                    callback.call(container, data);
                }
            });
        });
    }
})();

/* ---------------------------------------------------------------------- */
/*  jQuery Cookie
/* ---------------------------------------------------------------------- */

jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires, path, domain, secure;
        if (typeof options.expires != 'undefined' && options.expires === null) {
            expires = '';
        } else if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 86400000/*24*3600*1000*/));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        } else {
            expires = '; expires=Fri, 01 Jan 2100 00:00:00 GMT';
        }
        if (typeof options.path != 'undefined' && options.path === null) {
            path = '';
        } else if (options.path) {
            path = '; path=' + (options.path);
        } else {
            path = '; path=/';
        }
        if (typeof options.domain != 'undefined' && options.domain === null) {
            domain = '';
        } else if (options.domain) {
            domain = '; domain=' + (options.domain);
        } else {
            domain = '; domain=swpbox.info';
        }
        if (typeof options.secure != 'undefined' && options.secure === null) {
            secure = '';
        } else if (options.secure) {
            secure = '; secure';
        } else {
            secure = '';
        }
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
