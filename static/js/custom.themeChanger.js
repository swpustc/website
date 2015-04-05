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



/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
(function ($) {
    var ColorPicker = function () {
        var
            ids = {},
            inAction,
            charMin = 65,
            visible,
            tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
            defaults = {
                eventName: 'click',
                onShow: function () {},
                onBeforeShow: function(){},
                onHide: function () {},
                onChange: function () {},
                onSubmit: function () {},
                color: 'ff0000',
                livePreview: true,
                flat: false
            },
            fillRGBFields = function  (hsb, cal) {
                var rgb = HSBToRGB(hsb);
                $(cal).data('colorpicker').fields
                    .eq(1).val(rgb.r).end()
                    .eq(2).val(rgb.g).end()
                    .eq(3).val(rgb.b).end();
            },
            fillHSBFields = function  (hsb, cal) {
                $(cal).data('colorpicker').fields
                    .eq(4).val(hsb.h).end()
                    .eq(5).val(hsb.s).end()
                    .eq(6).val(hsb.b).end();
            },
            fillHexFields = function (hsb, cal) {
                $(cal).data('colorpicker').fields
                    .eq(0).val(HSBToHex(hsb)).end();
            },
            setSelector = function (hsb, cal) {
                $(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
                $(cal).data('colorpicker').selectorIndic.css({
                    left: parseInt(150 * hsb.s/100, 10),
                    top: parseInt(150 * (100-hsb.b)/100, 10)
                });
            },
            setHue = function (hsb, cal) {
                $(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
            },
            setCurrentColor = function (hsb, cal) {
                $(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            setNewColor = function (hsb, cal) {
                $(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
            },
            keyDown = function (ev) {
                var pressedKey = ev.charCode || ev.keyCode || -1;
                if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
                    return false;
                }
                var cal = $(this).parent().parent();
                if (cal.data('colorpicker').livePreview === true) {
                    change.apply(this);
                }
            },
            change = function (ev) {
                var cal = $(this).parent().parent(), col;
                if (this.parentNode.className.indexOf('_hex') > 0) {
                    cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
                } else if (this.parentNode.className.indexOf('_hsb') > 0) {
                    cal.data('colorpicker').color = col = fixHSB({
                        h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
                        s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
                    });
                } else {
                    cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
                        r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
                        g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
                        b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
                    }));
                }
                if (ev) {
                    fillRGBFields(col, cal.get(0));
                    fillHexFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                }
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
                cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
            },
            blur = function (ev) {
                var cal = $(this).parent().parent();
                cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
            },
            focus = function () {
                charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
                $(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
                $(this).parent().addClass('colorpicker_focus');
            },
            downIncrement = function (ev) {
                var field = $(this).parent().find('input').focus();
                var current = {
                    el: $(this).parent().addClass('colorpicker_slider'),
                    max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
                    y: ev.pageY,
                    field: field,
                    val: parseInt(field.val(), 10),
                    preview: $(this).parent().parent().data('colorpicker').livePreview
                };
                $(document).bind('mouseup', current, upIncrement);
                $(document).bind('mousemove', current, moveIncrement);
            },
            moveIncrement = function (ev) {
                ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
                if (ev.data.preview) {
                    change.apply(ev.data.field.get(0), [true]);
                }
                return false;
            },
            upIncrement = function (ev) {
                change.apply(ev.data.field.get(0), [true]);
                ev.data.el.removeClass('colorpicker_slider').find('input').focus();
                $(document).unbind('mouseup', upIncrement);
                $(document).unbind('mousemove', moveIncrement);
                return false;
            },
            downHue = function (ev) {
                var current = {
                    cal: $(this).parent(),
                    y: $(this).offset().top
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('mouseup', current, upHue);
                $(document).bind('mousemove', current, moveHue);
            },
            moveHue = function (ev) {
                change.apply(
                    ev.data.cal.data('colorpicker')
                        .fields
                        .eq(4)
                        .val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upHue = function (ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('mouseup', upHue);
                $(document).unbind('mousemove', moveHue);
                return false;
            },
            downSelector = function (ev) {
                var current = {
                    cal: $(this).parent(),
                    pos: $(this).offset()
                };
                current.preview = current.cal.data('colorpicker').livePreview;
                $(document).bind('mouseup', current, upSelector);
                $(document).bind('mousemove', current, moveSelector);
            },
            moveSelector = function (ev) {
                change.apply(
                    ev.data.cal.data('colorpicker')
                        .fields
                        .eq(6)
                        .val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
                        .end()
                        .eq(5)
                        .val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upSelector = function (ev) {
                fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
                $(document).unbind('mouseup', upSelector);
                $(document).unbind('mousemove', moveSelector);
                return false;
            },
            enterSubmit = function (ev) {
                $(this).addClass('colorpicker_focus');
            },
            leaveSubmit = function (ev) {
                $(this).removeClass('colorpicker_focus');
            },
            clickSubmit = function (ev) {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').color;
                cal.data('colorpicker').origColor = col;
                setCurrentColor(col, cal.get(0));
                cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
            },
            show = function (ev) {
                var cal = $('#' + $(this).data('colorpickerId'));
                cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var viewPort = getViewport();
                var top = ev.clientY;
                var left = pos.left + 40;
                if (top + 176 > viewPort.h) {
                    top -= 176;
                }
                if (left + 356 > viewPort.l + viewPort.w) {
                    left -= 356;
                }
                cal.css({left: left + 'px', top: top + 'px'});
                if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show();
                }
                $(document).bind('mousedown', {cal: cal}, hide);
                return false;
            },
            hide = function (ev) {
                if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
                    if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
                        ev.data.cal.hide();
                    }
                    $(document).unbind('mousedown', hide);
                }
            },
            isChildOf = function(parentEl, el, container) {
                if (parentEl == el) {
                    return true;
                }
                if (parentEl.contains) {
                    return parentEl.contains(el);
                }
                if ( parentEl.compareDocumentPosition ) {
                    return !!(parentEl.compareDocumentPosition(el) & 16);
                }
                var prEl = el.parentNode;
                while(prEl && prEl != container) {
                    if (prEl == parentEl)
                        return true;
                    prEl = prEl.parentNode;
                }
                return false;
            },
            getViewport = function () {
                var m = document.compatMode == 'CSS1Compat';
                return {
                    l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
                    w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
                    h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
                };
            },
            fixHSB = function (hsb) {
                return {
                    h: Math.min(360, Math.max(0, hsb.h)),
                    s: Math.min(100, Math.max(0, hsb.s)),
                    b: Math.min(100, Math.max(0, hsb.b))
                };
            }, 
            fixRGB = function (rgb) {
                return {
                    r: Math.min(255, Math.max(0, rgb.r)),
                    g: Math.min(255, Math.max(0, rgb.g)),
                    b: Math.min(255, Math.max(0, rgb.b))
                };
            },
            fixHex = function (hex) {
                var len = 6 - hex.length;
                if (len > 0) {
                    var o = [];
                    for (var i=0; i<len; i++) {
                        o.push('0');
                    }
                    o.push(hex);
                    hex = o.join('');
                }
                return hex;
            }, 
            HexToRGB = function (hex) {
                var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
                return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
            },
            HexToHSB = function (hex) {
                return RGBToHSB(HexToRGB(hex));
            },
            RGBToHSB = function (rgb) {
                var hsb = {
                    h: 0,
                    s: 0,
                    b: 0
                };
                var min = Math.min(rgb.r, rgb.g, rgb.b);
                var max = Math.max(rgb.r, rgb.g, rgb.b);
                var delta = max - min;
                hsb.b = max;
                if (max != 0) {
                    
                }
                hsb.s = max != 0 ? 255 * delta / max : 0;
                if (hsb.s != 0) {
                    if (rgb.r == max) {
                        hsb.h = (rgb.g - rgb.b) / delta;
                    } else if (rgb.g == max) {
                        hsb.h = 2 + (rgb.b - rgb.r) / delta;
                    } else {
                        hsb.h = 4 + (rgb.r - rgb.g) / delta;
                    }
                } else {
                    hsb.h = -1;
                }
                hsb.h *= 60;
                if (hsb.h < 0) {
                    hsb.h += 360;
                }
                hsb.s *= 100/255;
                hsb.b *= 100/255;
                return hsb;
            },
            HSBToRGB = function (hsb) {
                var rgb = {};
                var h = Math.round(hsb.h);
                var s = Math.round(hsb.s*255/100);
                var v = Math.round(hsb.b*255/100);
                if(s == 0) {
                    rgb.r = rgb.g = rgb.b = v;
                } else {
                    var t1 = v;
                    var t2 = (255-s)*v/255;
                    var t3 = (t1-t2)*(h%60)/60;
                    if(h==360) h = 0;
                    if(h<60) {rgb.r=t1; rgb.b=t2; rgb.g=t2+t3}
                    else if(h<120) {rgb.g=t1; rgb.b=t2; rgb.r=t1-t3;}
                    else if(h<180) {rgb.g=t1; rgb.r=t2; rgb.b=t2+t3;}
                    else if(h<240) {rgb.b=t1; rgb.r=t2; rgb.g=t1-t3;}
                    else if(h<300) {rgb.b=t1; rgb.g=t2; rgb.r=t2+t3;}
                    else if(h<360) {rgb.r=t1; rgb.g=t2; rgb.b=t1-t3;}
                    else           {rgb.r=0;  rgb.g=0;  rgb.b=0;}
                }
                return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
            },
            RGBToHex = function (rgb) {
                var hex = [
                    rgb.r.toString(16),
                    rgb.g.toString(16),
                    rgb.b.toString(16)
                ];
                $.each(hex, function (nr, val) {
                    if (val.length == 1) {
                        hex[nr] = '0' + val;
                    }
                });
                return hex.join('');
            },
            HSBToHex = function (hsb) {
                return RGBToHex(HSBToRGB(hsb));
            },
            restoreOriginal = function () {
                var cal = $(this).parent();
                var col = cal.data('colorpicker').origColor;
                cal.data('colorpicker').color = col;
                fillRGBFields(col, cal.get(0));
                fillHexFields(col, cal.get(0));
                fillHSBFields(col, cal.get(0));
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
            };
        return {
            init: function (opt) {
                opt = $.extend({}, defaults, opt||{});
                if (typeof opt.color == 'string') {
                    opt.color = HexToHSB(opt.color);
                } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
                    opt.color = RGBToHSB(opt.color);
                } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
                    opt.color = fixHSB(opt.color);
                } else {
                    return this;
                }
                return this.each(function () {
                    if (!$(this).data('colorpickerId')) {
                        var options = $.extend({}, opt);
                        options.origColor = opt.color;
                        var id = 'collorpicker_' + parseInt(Math.random() * 1000);
                        $(this).data('colorpickerId', id);
                        var cal = $(tpl).attr('id', id);
                        if (options.flat) {
                            cal.appendTo(this).show();
                        } else {
                            cal.appendTo(document.body);
                        }
                        options.fields = cal
                                            .find('input')
                                                .bind('keyup', keyDown)
                                                .bind('change', change)
                                                .bind('blur', blur)
                                                .bind('focus', focus);
                        cal
                            .find('span').bind('mousedown', downIncrement).end()
                            .find('>div.colorpicker_current_color').bind('click', restoreOriginal);
                        options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
                        options.selectorIndic = options.selector.find('div div');
                        options.el = this;
                        options.hue = cal.find('div.colorpicker_hue div');
                        cal.find('div.colorpicker_hue').bind('mousedown', downHue);
                        options.newColor = cal.find('div.colorpicker_new_color');
                        options.currentColor = cal.find('div.colorpicker_current_color');
                        cal.data('colorpicker', options);
                        cal.find('div.colorpicker_submit')
                            .bind('mouseenter', enterSubmit)
                            .bind('mouseleave', leaveSubmit)
                            .bind('click', clickSubmit);
                        fillRGBFields(options.color, cal.get(0));
                        fillHSBFields(options.color, cal.get(0));
                        fillHexFields(options.color, cal.get(0));
                        setHue(options.color, cal.get(0));
                        setSelector(options.color, cal.get(0));
                        setCurrentColor(options.color, cal.get(0));
                        setNewColor(options.color, cal.get(0));
                        if (options.flat) {
                            cal.css({
                                position: 'relative',
                                display: 'block'
                            });
                        } else {
                            $(this).bind(options.eventName, show);
                        }
                    }
                });
            },
            showPicker: function() {
                return this.each( function () {
                    if ($(this).data('colorpickerId')) {
                        show.apply(this);
                    }
                });
            },
            hidePicker: function() {
                return this.each( function () {
                    if ($(this).data('colorpickerId')) {
                        $('#' + $(this).data('colorpickerId')).hide();
                    }
                });
            },
            setColor: function(col) {
                if (typeof col == 'string') {
                    col = HexToHSB(col);
                } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
                    col = RGBToHSB(col);
                } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
                    col = fixHSB(col);
                } else {
                    return this;
                }
                return this.each(function(){
                    if ($(this).data('colorpickerId')) {
                        var cal = $('#' + $(this).data('colorpickerId'));
                        cal.data('colorpicker').color = col;
                        cal.data('colorpicker').origColor = col;
                        fillRGBFields(col, cal.get(0));
                        fillHSBFields(col, cal.get(0));
                        fillHexFields(col, cal.get(0));
                        setHue(col, cal.get(0));
                        setSelector(col, cal.get(0));
                        setCurrentColor(col, cal.get(0));
                        setNewColor(col, cal.get(0));
                    }
                });
            }
        };
    }();
    $.fn.extend({
        ColorPicker: ColorPicker.init,
        ColorPickerHide: ColorPicker.hidePicker,
        ColorPickerShow: ColorPicker.showPicker,
        ColorPickerSetColor: ColorPicker.setColor
    });
})(jQuery);



$( function() {

    /* Page config --> Begin */
    var page_config = {
        layout : {
            0 : {
                name : 'layout',
                title : 'liquid',
                className : 'liquid'
            },
            1 : {
                name : 'layout',
                title : 'fixed',
                className : 'fixed'
            }
        },
        skin : {
            0 : {
                name : 'skin',
                title : 'light',
                className : 'light'
            },
            1 : {
                name : 'skin',
                title : 'dark',
                className : 'dark'
            }
        },
        patterns_liquid : {
            0 : {
                name : 'Pattern 1',
                className : 'l-pattern-1'
            },
            1 : {
                name : 'Pattern 2',
                className : 'l-pattern-2'
            },
            2 : {
                name : 'Pattern 3',
                className : 'l-pattern-3'
            },
            3 : {
                name : 'Pattern 4',
                className : 'l-pattern-4'
            },
            4 : {
                name : 'Pattern 5',
                className : 'l-pattern-5'
            },
            5 : {
                name : 'Pattern 6',
                className : 'l-pattern-6'
            },
            6 : {
                name : 'Pattern 7',
                className : 'l-pattern-7'
            },
            7 : {
                name : 'Pattern 8',
                className : 'l-pattern-8'
            }
        },
        patterns_fixed : {
            0 : {
                name : 'Pattern 1',
                className : 'f-pattern-1'
            },
            1 : {
                name : 'Pattern 2',
                className : 'f-pattern-2'
            },
            2 : {
                name : 'Pattern 3',
                className : 'f-pattern-3'
            },
            3 : {
                name : 'Pattern 4',
                className : 'f-pattern-4'
            },
            4 : {
                name : 'Pattern 5',
                className : 'f-pattern-5'
            },
            5 : {
                name : 'Pattern 6',
                className : 'f-pattern-6'
            },
            6 : {
                name : 'Pattern 7',
                className : 'f-pattern-7'
            },
            7 : {
                name : 'Pattern 8',
                className : 'f-pattern-8'
            },
            8 : {
                name : 'Pattern 9',
                className : 'f-pattern-9'
            },
            9 : {
                name : 'Pattern 10',
                className : 'f-pattern-10'
            },
            10 : {
                name : 'Pattern 11',
                className : 'f-pattern-11'
            },
            11 : {
                name : 'Pattern 12',
                className : 'f-pattern-12'
            }
        }
    }

    /* Page config --> End */


    /* ------------------------------------------------------------------- */
    /*  Prettify, Resume & preventDefault
    /* ------------------------------------------------------------------- */

    var $bodyCodeLight = $("#code-prettify-light"),
        $bodyCodeDark = $("#code-prettify-dark"),
        $itemPrettify = $('.code-prettify'),
        $headTitle = $('#resume-title'),
        $bodyResume = $('#resume-lang'),
        $itemResume = $('.resume-lang');

    var codeLight = jQuery.cookie('code-light'),
        codeDark = jQuery.cookie('code-dark'),
        resumeLang = jQuery.cookie('resume-lang'),
        resumeLangTemp = jQuery.cookie('resume-lang_tmp');

    if (resumeLangTemp) {
        resumeLang = resumeLangTemp;
        jQuery.cookie('resume-lang_tmp', null, {
            path   : null,
            domain : null
        });
    }

    function addCookieCodeLight() {
        $bodyCodeLight.removeClass().addClass(codeLight);
    }
    function addCookieCodeDark() {
        $bodyCodeDark.removeClass().addClass(codeDark);
    }
    function addCookieResumeLang() {
        $bodyResume.attr('href', $bodyResume.attr(resumeLang));
        $bodyResume.attr('title', $bodyResume.attr(resumeLang + '_title'));
        $headTitle.text($headTitle.attr(resumeLang));
    }

    // Prettify projects

    if(codeLight) {
        addCookieCodeLight();
        $('.code-light').find('a').removeClass('active').hide();
        $('.code-light').find('#'+codeLight).addClass('active').show();
    }

    if(codeDark) {
        addCookieCodeDark();
        $('.code-dark').find('a').removeClass('active').hide();
        $('.code-dark').find('#'+codeDark).addClass('active').show();
    }

    $itemPrettify.on('click', 'a', function(e) {
        var $this = $(this),
            prettify_code = $this.attr('id');
        if($body.hasClass('light')) {
            codeLight = prettify_code;
            addCookieCodeLight();
            jQuery.cookie('code-light', prettify_code);
        } else {
            codeDark = prettify_code;
            addCookieCodeDark();
            jQuery.cookie('code-dark', prettify_code);
        }
        e.preventDefault();
    });

    /* end Prettify  */


    // Resume language

    if(resumeLang) {
        addCookieResumeLang();
        $itemResume.find('a').removeClass('active').hide();
        $itemResume.find('#'+resumeLang).addClass('active').show();
    }

    $itemResume.on('click', 'a', function(e) {
        var $this = $(this);
        resumeLang = $this.attr('id');
        addCookieResumeLang();
        jQuery.cookie('resume-lang', resumeLang);
        e.preventDefault();
    });

    /* end Resume language  */


    /* Theme controller --> Begin */

    var $body = $("body"),
        $wrapper_control_panel = $("#wrapper_control_panel");
    if ($wrapper_control_panel.length) {
        $wrapper_control_panel.append('<div id="control_panel" class="control-wrapper"></div>');
    } else {
        $("#wrapper").append('<div id="control_panel"><a href="#" id="control_label"></a></div>');
    }
    var $theme_control_panel = $('#control_panel');

    var layout = jQuery.cookie('layout'),
        skin = jQuery.cookie('skin'),
        bgcolor = jQuery.cookie('bgcolor'),
        patternfixed = jQuery.cookie('patternfixed'),
        patternliquid = jQuery.cookie('patternliquid');

        $body.addClass('l-pattern-1 f-pattern-1');

    function changeBodyClass(className, classesArray) {
        $.each(classesArray,function(idx, val) {
           $body.removeClass(val);
        });
        $body.addClass(className);
    }

    function addCookieLayout() {
        $body.removeClass('liquid fixed').addClass(layout);
    }

    function addCookieSkin() {
        $body.removeClass('light dark').addClass(skin);
    }

    function addBgColors() {
        $body.attr('style', 'background-color:' + " " + bgcolor);
    }

    function addClassPatFixed() {
        var pat = new Array();
        $.each(page_config.patterns_fixed, function(idx, val) {
            var pattern_list = val.className;
            pat.push(pattern_list);
        });
        var $join = pat.join(" ");
        $body.removeClass( function() {
            var $join = pat.join(" ");
            return $join;
        }).addClass(patternfixed);
    }

    function addClassPatLiquid() {
        var pat = new Array();
        $.each(page_config.patterns_liquid, function(idx, val) {
            var pattern_list = val.className;
            pat.push(pattern_list);
        });

        $body.removeClass( function() {
            var $join = pat.join(" ");
            return $join;
        }).addClass(patternliquid);
    }

    if (layout) {
        addCookieLayout();
    }
    if (skin) {
        addCookieSkin();
    }
    if (bgcolor) {
        addBgColors();
    }
    if (patternfixed) {
        addClassPatFixed();
    }
    if (patternliquid) {
        addClassPatLiquid();
    }

    var $cont = $('#portfolio-items'),
        $itemsFilter = $('#portfolio-filter'),
        $itemsFilterSub = $itemsFilter.find('ul');
    if (skin == 'dark') {
        currentOption = $itemsFilter.find('.code-dark .active').attr('data-categories');
    } else {
        currentOption = $itemsFilter.find('.code-light .active').attr('data-categories');
    }
    if ($itemResume.length) {
        currentOption = $itemResume.find('.active').attr('data-categories');
    }
    if(currentOption) {
        if(currentOption !== '*')
            currentOption = currentOption.replace(currentOption, '.' + currentOption);
        $cont.isotope({filter : currentOption});
    }
    $cont.find('article').show();

    var $heading = $('<h5/>').text('Choose Your Style').addClass('control_panel_title');

    $theme_control_panel.append($heading);

    if (typeof page_config != 'undefined' && $theme_control_panel) {

        var pattern_classes_fixed = new Array();
        var pattern_classes_liquid = new Array();
        var layout_classes = new Array();
        var skin_classes = new Array();

        var defaultSettings = {};

        /* Layout --> Begin */

        if (page_config.layout) {
            var $layout_block = $('<div/>').attr('id','layout').addClass('layout');
            var change_html = '<span>Layout Type</span>';
            change_html += '<form>';
            $.each(page_config.layout, function(idx, val) {
                if ($body.hasClass(val.className)) {
                    change_html += '<label><input checked type="radio" name="'+ val.name +'" value="'+ val.title +'" class="'+ val.className +'">'+ val.title +'</label>';
                    defaultSettings.pattern = idx;
                } else {
                    change_html += '<label><input type="radio" name="'+ val.name +'" value="'+ val.title +'" class="'+ val.className +'">'+ val.title +'</label>';
                }
                layout_classes.push(val.className);
            });

            change_html += '</form>';

            $layout_block.html(change_html);
            $theme_control_panel.append($layout_block);


            $layout_block.find('input[type=radio]').change( function() {
                var $this = $(this),
                    $checked = $this.attr('checked'),
                    nextClassName = $this.attr('value');

                if(nextClassName == 'liquid') {
                    $links_bg_wrapper.css('display','none');
                    $layout_block_fixed.css('display','none');
                    $layout_block_liquid.css('display','block');
                    $body.attr('style','');
                    bg_picker.css('background-color','#393f38');
                    $input_bg_color.attr('value','#393f38');
                    jQuery.cookie('bgcolor', null);
                } else {
                    $links_bg_wrapper.css('display','block');
                    $layout_block_fixed.css('display','block');
                    $layout_block_liquid.css('display','none');
                    if($body.hasClass('light')) {
                        bg_picker.css('background-color','#393F38');
                        $input_bg_color.attr('value','#393f38');
                    } else {
                        bg_picker.css('background-color','#CDD2CC');
                        $input_bg_color.attr('value','#cdd2cc');
                    }
                }

                jQuery.cookie('layout', nextClassName);

                if (!$body.hasClass(nextClassName)) {
                    changeBodyClass(nextClassName, layout_classes);
                    $(this).parent().addClass('active');
                }
                return false;
            });
        }

        /* Layout --> End */

        /* Skin --> Begin */

        if (page_config.skin) {
            var $skin_block = $('<div/>').attr('id','skin').addClass('skin');
            var change_skin_html = '<span>Layout Skin</span>';
            change_skin_html += '<form>';
            $.each(page_config.skin, function(idx, val) {
                if ($body.hasClass(val.className)) {
                    change_skin_html += '<label><input checked type="radio" name="'+ val.name +'" value="'+ val.title +'" class="'+ val.className +'">'+ val.title +'</label>';
                    defaultSettings.skin = idx;
                } else {
                    change_skin_html += '<label><input type="radio" name="'+ val.name +'" value="'+ val.title +'" class="'+ val.className +'">'+ val.title +'</label>';
                }
                skin_classes.push(val.className);
            });

            change_skin_html += '</form>';

            $skin_block.html(change_skin_html);
            $theme_control_panel.append($skin_block);

            $skin_block.find('input[type=radio]').change( function() {
                var $this = $(this),
                    $checked = $this.attr('checked'),
                    nextClassName = $this.attr('value');
                if($body.hasClass('fixed')) {
                    if(nextClassName == 'light') {
                        bg_picker.css('background-color','#393F38');
                        $input_bg_color.attr('value','#393f38');
                        $body.css('background-color','#393f38');
                    } else {
                        bg_picker.css('background-color','#CDD2CC');
                        $input_bg_color.attr('value','#cdd2cc');
                        $body.css('background-color','#cdd2cc');
                    }
                }
                setTimeout( function() {
                    $itemsFilter.find('li a').not('.active').stop(true,true).slideHide(150);
                    if(nextClassName == 'light') {
                        currentOption = $itemsFilter.find('.code-light .active').attr('data-categories');
                        if(currentOption) {
                            if(currentOption !== '*') currentOption = currentOption.replace(currentOption, '.' + currentOption)
                                $cont.isotope({filter : currentOption});
                        }
                    } else {
                        currentOption = $itemsFilter.find('.code-dark .active').attr('data-categories');
                        if(currentOption) {
                            if(currentOption !== '*') currentOption = currentOption.replace(currentOption, '.' + currentOption)
                                $cont.isotope({filter : currentOption});
                        }
                    }
                }, 100);
                jQuery.cookie('skin', nextClassName);

                if (!$body.hasClass(nextClassName)) {
                    changeBodyClass(nextClassName, skin_classes);
                }

                return false;
            });
        }

        /* Skin --> End */


        /* Background color --> Begin */

        var $bg_color = $('<div/>').attr({id : 'bgpicker'}).addClass('bgPicker'),
            $links_bg_wrapper = $('<div/>').addClass('bg_color_wrapper clearfix');
        $links_bg_wrapper.append('<span>Background Color</span>', $bg_color);
        var $input_bg_color = $('<input readonly type="text">').addClass('bg_hex_color').attr('value', '#3e443d');
        $links_bg_wrapper.append($input_bg_color, $bg_color);

        $theme_control_panel.append($links_bg_wrapper);

        if($body.hasClass('liquid')) {
            $links_bg_wrapper.css('display','none');
        } else {
            $links_bg_wrapper.css('display','block');
        }

        var bg_picker = $('#bgpicker');

        bg_picker.css('background-color','#3e443d').ColorPicker({
            color: '#3e443d',
            onChange: function (hsb, hex, rgb) {
                $input_bg_color.attr({value : '#' + hex})
                bg_picker.css('background-color','#' + hex);
                $body.css('background-color', '#' + hex);

                jQuery.cookie('bgcolor', "#" + hex);

            }
        });

        /* Background color --> End */


        /* Patterns Liquid --> Begin */

        if (page_config.patterns_liquid) {
            var $layout_block_liquid = $('<div/>').attr('id','patterns_liquid');
            var change_html_liquid = '<span>Pattern</span>';
            change_html_liquid += '<ul>';
            $.each(page_config.patterns_liquid, function(idx, val) {
                if ($body.hasClass(val.className)) {
                    defaultSettings.pattern = idx;
                }
                change_html_liquid += '<li><a href="#" id="' + val.className + '" title="' + val.name + '" class="' + val.className + '"></a></li>';
                pattern_classes_liquid.push(val.className);
            });
            change_html_liquid += '</ul>';
            $layout_block_liquid.html(change_html_liquid);
            $theme_control_panel.append($layout_block_liquid);

            $layout_block_liquid.find('a').click( function() {

                var nextClassName = $(this).attr('id');
                if (!$body.hasClass(nextClassName)) {
                    changeBodyClass(nextClassName, pattern_classes_liquid);
                    $layout_block_liquid.find('.active').removeClass('active');
                    $(this).parent().addClass('active');
                }

                jQuery.cookie('patternliquid', nextClassName);

                return false;
            });
        }

        /* Patterns Liquid --> End */


        /* Patterns Fixed --> Begin */

        if (page_config.patterns_fixed) {
            var $layout_block_fixed = $('<div/>').attr('id','patterns_fixed');
            var change_html_fixed = '<span>Pattern</span>';
            change_html_fixed += '<ul>';
            $.each(page_config.patterns_fixed, function(idx, val) {
                if ($body.hasClass(val.className)) {
                    defaultSettings.pattern = idx;
                }
                change_html_fixed += '<li><a href="#" id="' + val.className + '" title="' + val.name + '" class="' + val.className + '"></a></li>';
                pattern_classes_fixed.push(val.className);
            });
            change_html_fixed += '</ul>';
            $layout_block_fixed.html(change_html_fixed);
            $theme_control_panel.append($layout_block_fixed);

            $layout_block_fixed.find('a').click( function() {

                var nextClassName = $(this).attr('id');
                if (!$body.hasClass(nextClassName)) {
                    changeBodyClass(nextClassName, pattern_classes_fixed);
                    $layout_block_fixed.find('.active').removeClass('active');
                    $(this).parent().addClass('active');
                }

                jQuery.cookie('patternfixed', nextClassName);

                return false;
            });
        }

        /* Patterns Fixed --> End */

        if($body.hasClass('liquid')) {
                $layout_block_fixed.css('display','none');
                $layout_block_liquid.css('display','block');
            } else {
                $layout_block_fixed.css('display','block');
                $layout_block_liquid.css('display','none');
        }

        /* Reset Settings  --> Begin */

        var setDefaultsSettings = function() {
            $body.attr('style','');
            jQuery.cookie('layout', null);
            jQuery.cookie('skin', null);
            jQuery.cookie('patternfixed', null);
            jQuery.cookie('patternliquid', null);
            jQuery.cookie('bgcolor', null);
            $body.removeClass().addClass('liquid light l-pattern-1 f-pattern-1');
            $links_bg_wrapper.css('display','none');
            $layout_block_fixed.css('display','none');
            $layout_block_liquid.css('display','block');
            bg_picker.css({'background-color':'#3e443d'}).ColorPickerSetColor('#3e443d');
            $input_bg_color.attr('value','#3e443d');
            $('.layout').find('input[type=radio]').first().attr('checked','checked');
            $('.skin').find('input[type=radio]').first().attr('checked','checked');
            $theme_control_panel.find('.active').removeClass();
            jQuery.cookie('code-light', null);
            jQuery.cookie('code-dark', null);
            jQuery.cookie('resume-lang', null);
            $bodyCodeLight.removeClass().addClass('code-google');
            $bodyCodeDark.removeClass().addClass('code-vibrant-ink');
            $itemsFilter.find('a').removeClass('active').hide();
            if ($itemsFilterSub.length) {
                $itemsFilterSub.each( function() {
                    $(this).find('a').first().addClass('active').show();
                });
                currentOption = $itemsFilter.find('.code-light .active').attr('data-categories');
            } else {
                $itemsFilter.find('a').first().addClass('active').show();
                $itemResume_active = $itemResume.find('.active');
                currentOption = $itemResume_active.attr('data-categories');
                resumeLang = $itemResume_active.attr('id');
                if (resumeLang)
                    addCookieResumeLang();
            }
            if(currentOption) {
                if(currentOption !== '*')
                    currentOption = currentOption.replace(currentOption, '.' + currentOption);
                $cont.isotope({filter : currentOption});
            }
            return false;
        };

        var $restore_button_wrapper = $('<div/>').addClass('restore_button_wrapper');
        var $restore_button = $('<a/>').text('Reset').attr('id','restore_button').addClass('button-style-2 small').click(setDefaultsSettings);
        $restore_button_wrapper.append($restore_button);
        $theme_control_panel.append($restore_button_wrapper);

        /* Reset Settings  --> Begin */

    }

    /* Styles --> End */

    /* Control Panel Label --> Begin */

    var $theme_control_panel_label = $('#control_label');
    $theme_control_panel_label.click( function() {

        if ($theme_control_panel.hasClass('visible')) {
            $(this).stop(true,false).animate({right : '-35px'});
            $theme_control_panel.animate({left: -185}, 400, function() {
                    $theme_control_panel.removeClass('visible');
            });
        }
        else {
            $(this).stop(true,false).animate({right : '0'});
            $theme_control_panel.animate({left: 0}, 400, function() {
                    $theme_control_panel.addClass('visible');
            });
        }
        return false;
    });

    /* Control Panel Label --> End */

    try {
        if (window.console && window.console.log) {
            console.log("Contact Me: swpustc@mail.ustc.edu.cn\n");
        }
    } catch (e) {
    }

})
