$(function () {
    $.ajax({
        url: 'design.json',
        type: 'get',
        success: function (data) {

            //프로젝트 불러오기           
            var frame = document.querySelector('.frame');
            var list = '';
            var menuList = '';
            var tit, imgSrc, detail, site;

            var indi = document.querySelector('.indi');
            var fig = document.querySelector('.frame figure');


            //project 출력
            data.project.forEach(function (value, key) {
                detail = value.detail;
                imgSrc = value.imgSrc;
                tit = value.tit;

                list = "<a href='" + detail + "'>";
                list += "<img src=" + imgSrc + " >";
                list += "<p>" + tit + "</p>";
                list += "<span></span>";
                list += "</a>";

                $('figure').append(list);

                menuList = "<li><a href='" + detail + "'> " + tit + "</a></li>";

                $('.bg ul').append(menuList);
            });


            setTimeout(slide, 100);

            function slide() {
                $('.frame figure a').eq(0).addClass('active');


                var figA = document.querySelectorAll('.frame figure a');
                var idx = 0;

                //프로젝트 클릭
                $('.frame figure a').on('click', function (e) {
                    e.preventDefault();
                    idx = $(this).index();
                    $('.popup').css('display', 'block');

                    prj();
                });

                //버거 메뉴 리스트 클릭
                $('.bg ul li').on('click', function (e) {
                    e.preventDefault();
                    idx = $(this).index();
                    $('.popup').css('display', 'block');

                    prj();
                });

                function prj() {

                    detail = $('.frame figure a').eq(idx).attr('href');
                    $('.pop_bg p img').attr('src', detail);

                    site = $('.frame figure img').eq(idx).attr('alt');
                    $('.site').attr('href', site);
                }

                //닫기버튼
                $('.back').on('click', function () {
                    $('.popup').css('display', 'none');
                });

                //인디게이트 생성
                figA.forEach(function () {
                    var aTag = document.createElement('a');
                    indi.appendChild(aTag);
                });
                $('.indi a').eq(0).addClass('active');







                //이전, 다음버튼 누르기      
                $('.next').on('click', function () {
                    if (idx < $('.frame figure a').length - 1) {
                        idx++
                    }
                    aa();
                    $('.frame figure').css('left', '-' + (idx * 400) + 'px');
                    indiAct();
                    btnAct();
                });

                $('.prev').on('click', function () {
                    if (idx > 0) {
                        idx--;
                    }
                    aa();
                    $('.frame figure').css('left', '-' + (idx * 400) + 'px');

                    indiAct();
                    btnAct();

                    if (idx == 1) {
                        $(this).css('display', 'block');
                    }
                });

                //버튼 비활성화
                function aa() {
                    if (idx == 0) {
                        $('.prev').css('display', 'none');
                    } else {
                        $('.prev').css('display', 'block');
                    }

                    if (idx == $('.frame figure a').length - 1) {
                        $('.next').css('display', 'none');
                    } else {
                        $('.next').css('display', 'block');
                    }
                }


                //인디게이트 활성화
                function indiAct() {
                    $('.indi a').removeClass('active');
                    $('.indi a').eq(idx).addClass('active');
                }


                //가운데 프로젝트 활성화
                function btnAct() {
                    //이전, 다음버튼 누를때
                    $('.frame figure a').removeClass('active');
                    $('.frame figure a').eq(idx).addClass('active');
                }


                //마우스 이벤트로 활성화
                $('.frame figure').on('mouseover', function () {
                    $('.frame figure a').removeClass('active');
                });

                $('.frame figure a').on('mouseleave', function () {
                    $('.frame figure a').eq(idx).addClass('active')
                });





                $('.menu-trigger').on('click', function () {

                    $(this).toggleClass('active');
                    $('.menu').toggleClass('active');
                    $('.bg').toggleClass('active');
                });

                $('.menu').on('click', function () {
                    $(this).removeClass('active');
                    $('.bg').removeClass('active');
                    $('.menu-trigger').removeClass('active');
                });






            }



            var windowWidh = $(window).width();
            if (2732 > windowWidh > 1366) {
                var idx = 0,
                    workWh, moveWh;
                //마우스 휠이벤트
                $(window).on('mousewheel', function (e) {

                    if (e.originalEvent.wheelDelta < 0) {
                        moveWh = '.next';
                    } else if (e.originalEvent.wheelDelta > 0) {
                        moveWh = '.prev';
                    }

                    clearTimeout(workWh);
                    workWh = setTimeout(function () {
                        $(moveWh).trigger('click');
                    }, 200);

                });




                //pc버전 인디게이트 클릭
                setTimeout(function () {
                    $('.indi a').on('click', function () {

                        idx = $(this).index();

                        $('.indi a').removeClass('active');
                        $(this).addClass('active');

                        $('.frame figure').css('left', '-' + (idx * 400) + 'px');

                        $('.frame figure a').removeClass('active');
                        $('.frame figure a').eq(idx).addClass('active');

                        aa();
                    });
                }, 100);





                //버튼 숨기기
                function aa() {
                    if (idx == 0) {
                        $('.prev').css('display', 'none');
                    } else {
                        $('.prev').css('display', 'block');
                    }

                    if (idx == $('.frame figure a').length - 1) {
                        $('.next').css('display', 'none');
                    } else {
                        $('.next').css('display', 'block');
                    }
                }
            } else if (windowWidh == 2732) {
                       var start = 0,
                    end = 0,
                    idx = 0;

                $(document).on('touchstart', startFun);
                $(document).on('touchend', endFun);

                function startFun(e) {
                    start = e.changedTouches[0].screenX;
                }


                function endFun(e) {
                    end = e.changedTouches[0].screenX;

                    if (start > end) {
                        if (idx < $('.frame figure a').length - 1) idx++;
                    } else {
                        if (idx != 0) idx--;
                    }
                    $('.frame figure').css('left', '-' + (idx * 700) + 'px');
                    indiAct();
                }
                


                //인디게이트 활성화
                function indiAct() {
                    $('.indi a').removeClass('active');
                    $('.indi a').eq(idx).addClass('active');
                }
                
                
                setTimeout(function () {
                    $('.indi a').on('click', function () {

                        idx = $(this).index();

                        $('.indi a').removeClass('active');
                        $(this).addClass('active');

                        $('.frame figure').css('left', '-' + (idx * 700) + 'px');

                        $('.frame figure a').removeClass('active');
                        $('.frame figure a').eq(idx).addClass('active');

                    });
                }, 100);


            } else if (windowWidh == 1366) {
                //pc버전 인디게이트 클릭
                setTimeout(function () {
                    $('.indi a').on('click', function () {

                        idx = $(this).index();

                        $('.indi a').removeClass('active');
                        $(this).addClass('active');

                        $('.frame figure').css('left', '-' + (idx * 400) + 'px');

                        $('.frame figure a').removeClass('active');
                        $('.frame figure a').eq(idx).addClass('active');

                    });
                }, 100);



                var start = 0,
                    end = 0,
                    idx = 0;

                $(document).on('touchstart', startFun);
                $(document).on('touchend', endFun);

                function startFun(e) {
                    start = e.changedTouches[0].screenX;
                }


                function endFun(e) {
                    end = e.changedTouches[0].screenX;

                    if (start > end) {
                        if (idx < $('.frame figure a').length - 1) idx++;
                    } else {
                        if (idx != 0) idx--;
                    }
                    $('.frame figure').css('left', '-' + (idx * 400) + 'px');
                    indiAct();
                }



                //인디게이트 활성화
                function indiAct() {
                    $('.indi a').removeClass('active');
                    $('.indi a').eq(idx).addClass('active');
                }


            } else {
                var aT = document.querySelectorAll('.frame figure a');
                var project = document.querySelector('.project').offsetTop;


                //mobile 스크롤 이동시 프로젝트 활성화
                $(window).on('scroll', function () {


                    aT.forEach(function (el, key) {

                        var aa = (project + el.offsetTop) - (window.innerHeight / 2);
                        var indA = document.querySelectorAll('.indi a');

                        if (window.scrollY > aa + 50) {

                            $('.frame figure a').removeClass('active');
                            $('.indi a').removeClass('active');

                            el.classList.add('active');
                            indA[key].classList.add('active');

                        } else {
                            el.classList.remove('active');
                        }
                    });

                });



                //mobile버전 인디게이트 클릭
                setTimeout(function () {
                    $('.indi a').on('click', function () {
                        var figA = document.querySelectorAll('.frame figure a');
                        idx = $(this).index();

                        $('.indi a').removeClass('active');
                        $(this).addClass('active');

                        $('html,body').animate({
                            scrollTop: idx * figA[idx].offsetHeight
                        });

                        $('.frame figure a').removeClass('active');
                        $('.frame figure a').eq(idx).addClass('active');

                    });
                }, 100);


            }




        }
    })
});
