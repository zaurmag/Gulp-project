// ======= Tabs Function =======

(function($) {
    $.fn.tabs = function() {
        this.each(function() {
            $(this).on('click', 'li', function(e) {
                e.preventDefault();
                $(this)
                    .addClass('active').siblings().removeClass('active')
                    .closest('.tabs').find('.tab-block').removeClass('active').eq($(this).index()).addClass('active');
            });
        });
    };

})(jQuery);

// ======= Ajax Submit Form Plugin =======
(function($) {
    jQuery.fn.sendForm = function(options) {
        options = $.extend({
            successTitle: "Спасибо, что выбрали нас!",
            successText: "Мы свяжемся с Вами в ближайшее время.",
            errorTitle: "Сообщение не отправлено!",
            errorSubmit: "Ошибка отправки формы!",
            errorNocaptcha: "Вы не прошли проверку каптчи",
            errorCaptcha: "Вы не заполнили каптчу",
            mailUrl: "../form-submit/submit.php",
            autoClose: false,
            autoCloseDelay: 5000
        }, options);

        var make = function() {
            var $this = $(this);
            $(this).submit(function() {
                var data = $(this).serialize();
                $.ajax({
                    url: options.mailUrl,
                    type: "POST",
                    data: data,
                    beforeSend: function() {
                        $this.find('.btn-submit').parents('.form__form').addClass('sending');
                    },
                    success: function(res) {
                        function errorRes(errorMessage) {
                            $this.find('.btn-submit').parents('.form__form').removeClass('sending');
                            $this.append('<div class="form__error">' + errorMessage + '</div>');
                            setTimeout(function() {
                                $this.find('.form__error').remove();
                            }, 5000);
                        }
                        if (res == 1) {
                            $this[0].reset();
							grecaptcha.reset();
                            $this.find('.form__hide-success').slideUp().delay(5000).slideDown();
                            $this.find('.btn-submit').parents('.form__form').removeClass('sending');
                            $this.find('.form__hide-success').after('<div class="form__sys-message"></div>');
                            $this.find('.form__sys-message').html('<div class="form__success-title">' + options.successTitle + '</div><p class = "form__success-text" >' + options.successText + '</p>');
                            setTimeout(function() {
                                $this.find('.form__sys-message').fadeOut().delay(3000).remove();
                                if (options.autoClose) {
                                    $.magnificPopup.close();
                                }
                            }, options.autoCloseDelay);
                        } else if (res == 2) {
                            errorRes(options.errorNocaptcha);
                        } else if (res == 3) {
                            errorRes(options.errorCaptcha);
                        } else {
                            errorRes(options.errorSubmit);
                        }
                    },
                    error: function() {
                        errorRes(options.errorSubmit);
                    }
                });
                return false;
            });

        }; // end make

        return this.each(make);
    };
})(jQuery);

// ======= Plugin Accordeon Vmenu =======
(function($) {
    jQuery.fn.dropdownMenu = function(options) {

        options = $.extend({
            drpArrow: true,
            classNameParent: 'parent',
            classNameSubmenu: 'sub-menu',
            classNameCurrent: 'active',
            destroy: false
        }, options);
        $this = $(this);
        var submenu = 'ul.' + options.classNameSubmenu,
            parent = 'li.' + options.classNameParent,
            parentA = parent + '> a';
        var make = function() {
            if (!options.destroy) {

                $this.find(submenu).hide();
                $this.find('li.' + options.classNameCurrent + '> a' + submenu).show();
                if(options.drpArrow)
                    $this.find(parentA).after('<span class="btn-dropdown"><i class="icon icon-dropdown"></i></span>');

                var btnDropdown = $('.btn-dropdown');
                function dropdownFn(clickElem) {
                    clickElem.on('click', function(event) {
                        event.preventDefault();

                        var checkElement = $(this).next();
                        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                            checkElement.slideUp(200);
                            $(this).parent(parent).removeClass('open-child').addClass('close-child');
                            return false;
                        }
                        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                            $(this).find('ul:visible').slideUp(200);
                            $(this).parent(parent).addClass('open-child').removeClass('close-child');
                            checkElement.slideDown(200);
                            return false;
                        }

                    });
                }
                if(options.drpArrow)
                    dropdownFn(btnDropdown);
                else
                    dropdownFn($(parentA));

            }
        };
        if (options.destroy) {
            $this.find('.btn-dropdown').remove();
            $this.find(submenu).show();
        }
        return this.each(make);
    };
})(jQuery);

// ======= Go Top =======

(function($) {
    jQuery.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() != "0") {
            $(this).fadeIn("slow")
        }
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if ($(window).scrollTop() == "0") {
                $(scrollDiv).fadeOut("slow")
            } else {
                $(scrollDiv).fadeIn("slow")
            }
        });
        $(this).click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow")
        });
    }
})(jQuery);

// ======= Toggle text function =======
(function($) {
    jQuery.fn.extend({
        toggleText: function(stateOne, stateTwo) {
            return this.each(function() {
                stateTwo = stateTwo || '';
                $(this).text() !== stateTwo && stateOne ? $(this).text(stateTwo) : $(this).text(stateOne);
            });
        }
    });
})(jQuery);
