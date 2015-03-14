jQuery(document).ready(function(){
    (function() {
        var freeshellDomain = '//freeshell.swpbox.info/domain-test.png?t=',
            staticDomain    = '//static.swpbox.info/domain-test.png?t=',
            $cdnBody        = $('.domain-status-cdn'),
            $freeshellBody  = $('.domain-status-freeshell'),
            $staticBody     = $('.domain-status-static'),
            freeshellStatus = true,
            staticStatus    = true,
            highlight_ok    = 'highlight2',
            highlight_fail  = 'highlight3',
            highlight_part  = 'highlight4',
            highlight_spit  = ' ',
            highlight_all   = highlight_ok + highlight_spit + highlight_fail + highlight_spit + highlight_part,
            testImageFun    = function(testImageSrc) {
                return $.Deferred(function(dfd) {
                    $('<img/>').load(function() {
                        dfd.resolve();
                    }).error(function() {
                        dfd.reject();
                    }).attr('src', testImageSrc + (new Date()).getTime());
                }).promise();
            };
		function freeshellTest() {
			$.when(
				testImageFun(freeshellDomain)
			).done( function() {
				if (!freeshellStatus) {
					freeshellStatus = true;
					$freeshellBody.each(function() {
						$(this).removeClass(highlight_all).addClass(highlight_ok);
					});
					$cdnBody.each(function() {
						$(this).removeClass(highlight_all).addClass(staticStatus ? highlight_ok : highlight_part);
					});
				}
			}).fail( function() {
				if (freeshellStatus) {
					freeshellStatus = false;
					$freeshellBody.each(function() {
						$(this).removeClass(highlight_all).addClass(highlight_fail);
					});
					$cdnBody.each(function() {
						$(this).removeClass(highlight_all).addClass(staticStatus ? highlight_part : highlight_fail);
					});
				}
			});
			setTimeout(freeshellTest, 30000);
		};
		function staticTest() {
			$.when(
				testImageFun(staticDomain)
			).done( function() {
				if (!staticStatus) {
					staticStatus = true;
					$staticBody.each(function() {
						$(this).removeClass(highlight_all).addClass(highlight_ok);
					});
					$cdnBody.each(function() {
						$(this).removeClass(highlight_all).addClass(freeshellStatus ? highlight_ok : highlight_part);
					});
				}
			}).fail( function() {
				if (staticStatus) {
					staticStatus = false;
					$staticBody.each(function() {
						$(this).removeClass(highlight_all).addClass(highlight_fail);
					});
					$cdnBody.each(function() {
						$(this).removeClass(highlight_all).addClass(freeshellStatus ? highlight_part : highlight_fail);
					});
				}
			});
			setTimeout(staticTest, 45000);
		};

		freeshellTest();
		staticTest();

    })();
});
