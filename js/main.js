$(document).ready(function() {

    // Вешаем ajax-отправку при клике на активную кнопку отправки
    $('form').each(function() {
        var form = $(this);
        var btn = form.find('.send-btn');

        form.find('.required').addClass('empty_filed');

        function checkField() {
            form.find('.required').each(function() {
                if ($(this).val() != '') {
                    $(this).removeClass('empty_filed');
                } else {
                    $(this).addClass('empty_filed');
                }
            });
        }; // checkField

        setInterval(function() {
            checkField();
            var sizeEmpty = form.find('.empty_filed').size();
            // console.log(sizeEmpty);
            if (sizeEmpty > 0) {
                if (btn.hasClass('disable-button')) {
                    return false;
                } else {
                    btn.addClass('disable-button');
                };
            } else {
                btn.removeClass('disable-button');
                btn.attr('disabled', false);
            }
        }, 500); // setInterval

        function lightEmpty() {
            form.find('.empty_filed').addClass('field_error');
            setTimeout(function() {
                form.find('.empty_filed').removeClass('field_error');
            }, 500);
        }; // lightEmpty

        btn.click(function() {
            var cur_btn = $(this);
            if (cur_btn.hasClass('disable-button') || (cur_btn.parent().find('.f-tel').val().length < 1)) {
                lightEmpty();
                // if(cur_btn.parent().find('.f-tel').hasClass('empty_filed')) {
                //     cur_btn.parent().find('.f-tel').focus();
                // }             
                return false;
            } else {
                var message = form.serialize();
                $.ajax({
                    url: 'send.php',
                    type: 'post',
                    data: message,
                    error: function(errorThrown) {
                        console.log(errorThrown);
                    },
                    success: function(response) {
                            if (response == 'success') {
                                $('.form-popup, .form-popup-dog').hide();
                                if (cur_btn.hasClass('open-dog')) {
                                    $('.popup, .popup-success-dog').fadeIn();
                                } else {
                                    $('.popup, .popup-success').fadeIn();
                                }
                                form.trigger('reset');
                            } else {
                                alert(response);
                            }
                        } // function response
                }); // ajax           
            }; // if/else
            return false;
        }); // click
    }); // each

    $(".fancybox").fancybox();
    $(".f-tel").mask("8(999) 999-99-99");

    //$(".form-popup, .form-calc, .f-rehau, .f-zamer").append("<input type='hidden' name='ref' value='"+referer+"'/><input type='hidden' name='utm_source' value='"+utm_source+"'/><input type='hidden' name='utm_medium' value='"+utm_medium+"'/><input type='hidden' name='utm_campaign' value='"+utm_campaign+"'/><input type='hidden' name='block' value='"+block+"'/><input type='hidden' name='utm_term' value='"+utm_term+"'/><input type='hidden' name='utm_content' value='"+utm_content+"'/><input type='hidden' name='position' value='"+position+"'/><input type='hidden' name='keyword' value='"+keyword+"'/>");

    $(".closepopup, .ok-btn").click(function() {
        $(".dark, .popup, .popup-success, .popup-error, .form-popup, .polit-popup").hide();
    });

    // When click the button open popup 
    $('.open-form').click(function() {
        $('.popup, .dark').show();
        $('.form-popup').show();
    });

    $('.open-polit').click(function() {
        $('.popup, .dark').show();
        $('.polit-popup').show();
    });

    $('.btn-open-dog').click(function() {
        $('.popup, .dark').show();
        $('.form-popup-dog').show();
    });

    $('.b-why-imgs .thmb-item').click(function() {
        var cur = $(this).css('background-image');
        var cur_txt = $(this).find('.txt').text();
        $('.b-why-imgs .thmb-item').removeClass('active');
        $(this).addClass('active');
        $('.b-why-imgs .big-img').css({ 'background': cur + ' center no-repeat', 'background-size': 'cover' });
        $('.b-why-txt').text(cur_txt);
    });

    var b_why_cur_big_img = $('.b-why-imgs .thmb-item').first().css('background-image');
    var b_why_cur_txt = $('.b-why-imgs .thmb-item:first-child .txt').text();
    $('.b-why-imgs .big-img').css({ 'background': b_why_cur_big_img + ' center no-repeat', 'background-size': 'cover' });
    $('.b-why-txt').text(b_why_cur_txt);

    var cur_btn_more_text = $('.s-rev .btn-more').first().text();
    $('.s-rev .btn-more').click(function() {
        if ($('.b-rev-more').hasClass('opened')) {
            $('.b-rev-more').removeClass('opened');
            $(this).text(cur_btn_more_text);
        } else {
            $('.b-rev-more').addClass('opened');
            $(this).text('Скрыть');
        }
        var cur = slider_rev.getCurrentSlide();
        slider_rev.reloadSlider();
        slider_rev.goToSlide(cur);
    });

    (function() {

        $(".panel").on("show.bs.collapse hide.bs.collapse", function(e) {
            if (e.type == 'show') {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

    }).call(this);

    $('#owl-hello [data-toggle=tab], #owl-balk [data-toggle=tab]').click(function() {
        $(this).parent().siblings().find('[data-toggle=tab]').removeClass('active');
        $(this).addClass('active');
        if ($(window).width() < 768) {
            $('.b-hello-more').toggle();
        }

    });

    $('.btn-more').click(function() {
        $(this).next('.more').addClass('opened');
        $(this).parentsUntil('.section').find('.bx-controls-direction').addClass('down');
    });

    $('#owl-balk .btn').click(function() {
        $(this).parentsUntil('.owl-item').find('.owl-itm-desc').fadeIn();
    });

    $('#owl-balk .owl-itm-desc').click(function() {
        $(this).fadeOut();
        // console.log('fff');
    });

    var cur_btn_more_soot_text = $('.btn-more-soot').text()
    $('.btn-more-soot').click(function() {
        var more_soot = $(this).next('.more-soot');
        if (more_soot.hasClass('opened')) {
            more_soot.removeClass('opened');
            $(this).text(cur_btn_more_soot_text)
        } else {
            more_soot.addClass('opened');
            $(this).text('Свернуть таблицу')
        }
    });


    function init_sliders() {

        var sliders = $('.b-spectr, .b-adv-list, .b-sert, .b-types-list, .b-services-list');
        var slider_hello = $('#owl-hello');
        var slider_balk = $('#owl-balk');
        if ($(window).width() < 768) {
            sliders.owlCarousel({
                items: 1,
                loop: true,
                nav: true,

            });
            slider_hello.owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                onChanged: callback_owl_hello
            });
            slider_balk.owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                navContainer: '#owl-balk-nav'
            });
        } else {
            sliders.trigger('destroy.owl.carousel');
            slider_hello.trigger('destroy.owl.carousel');
            slider_balk.trigger('destroy.owl.carousel');
        }

        function callback_owl_hello(event) {
            // console.log('checkWidth');
            if ($(window).width() < 768) {
                $('.s-hello .b-hello-more').fadeOut();
            }
        }
    }

    $('.b-bull-list').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        responsive: {
            768: {
                items: 2,
                margin: 6,
            },
            992: {
                items: 3,
                margin: 6,
            }
        }
    });

    $('.b-how-many-list').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        responsive: {
            992: {
                items: 3,
                margin: 10,
            }
        }
    });

    $('.b-reviews-list').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoHeight: true
    });

    $(window).ready(init_sliders);
    $(window).resize(init_sliders);

     $(window).scroll(function(){
             if( $(window).scrollTop() > 60 ) {
                     $('#stickyheader').css('display', 'block');
             } else {
                     $('#stickyheader').css('display', 'none');
             }
     });

     $("#stickyheader").on("click","a", function (event) {
         event.preventDefault();
         var id  = $(this).attr('href'),
             top = $(id).offset().top-30;
         $('body,html').animate({scrollTop: top}, 1000);
     });
    function create_target_date() {
        var target_date = new Date();
        //target_date.setDate(target_date.getDate()+1);
        target_date.setHours(23, 59, 59);
        return target_date;
    }

    function calculation_timer() {
        var target_date = create_target_date();
        var current_date = new Date();
        val_timer = target_date.getTime() - current_date.getTime();
        var hours = Math.floor(val_timer / 1000 / 60 / 60);
        var minutes = Math.floor((val_timer - hours * 60 * 60 * 1000) / 1000 / 60);
        var seconds = Math.floor(((val_timer - hours * 60 * 60 * 1000) - minutes * 60 * 1000) / 1000);
        $('.digit-hour').text(hours);
        $('.digit-min').text(minutes);
    }
    calculation_timer();
    var id_timer = setInterval(calculation_timer, 60000);





});
