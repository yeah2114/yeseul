$(function(){
    var win_h = $(window).height();
   
    $('.wheel').each(function(idx){
        $(this).attr('data-index',win_h * idx);
    });
    
    $('.wheel').on('mousewheel',function(e){
        var pos = parseInt($(this).attr('data-index'));
        if(e.originalEvent.wheelDelta >= 0){
            $('html,body').stop().animate({scrollTop:pos - win_h});
            return false;
        }else if(e.originalEvent.wheelDelta < 0){
            $('html,body').stop().animate({scrollTop:pos + win_h});
            return false;
        }
    })
});  
