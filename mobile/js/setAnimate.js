function animating(index){
    //0是添加1是移除
    switch (index){
        case 0:
            slide0AnimateClass(0);
            slide1AnimateClass(1);
            break;
        case 1:
            slide0AnimateClass(1);
            slide1AnimateClass(0);
            slide2AnimateClass(1);
            break;
        case 2:
            slide2AnimateClass(0);
            slide1AnimateClass(1);
            slide3AnimateClass(1);
            break;
        case 3:
            slide2AnimateClass(1);
            slide3AnimateClass(0);
            slide4AnimateClass(1);
            break;
        case 4:
            slide3AnimateClass(1);
            slide4AnimateClass(0);
            slide5AnimateClass(1);
            break;
        case 5:
            slide4AnimateClass(1);
            slide5AnimateClass(0);
            break;
    }
}
function slide0AnimateClass(act) {
    if(act==0){
        $("#slide1 .img_1").addClass("pt-page-moveFromTop");
        $("#slide1 .img_2").addClass("pt-page-moveFromLeft");
        $("#slide1 .img_3").addClass("pt-page-moveFromRight");
        $("#slide1 .icon_up").addClass("pt-page-moveIconUp");
    }
    if(act==1){
        $("#slide1 .img_1").removeClass("pt-page-moveFromTop");
        $("#slide1 .img_2").removeClass("pt-page-moveFromLeft");
        $("#slide1 .img_3").removeClass("pt-page-moveFromRight");
        $("#slide1 .icon_up").removeClass("pt-page-moveIconUp");
    }
}
function slide1AnimateClass(act){
    if(act==0){
        $("#slide2 .img_1").addClass("pt-page-flipInLeft");
        $("#slide2 .groupLink li").addClass("pt-page-rubberBand");
        $("#slide2 .icon_up").addClass("pt-page-moveIconUp");
    }else{
        $("#slide2 .img_1").removeClass("pt-page-flipInLeft");
        $("#slide2 .groupLink li").removeClass("pt-page-rubberBand");
        $("#slide2 .icon_up").removeClass("pt-page-moveIconUp");
    }
}
function slide2AnimateClass(act){
    if(act==0){
        $(".page3-1-top").addClass("pt-page-moveFromBottom");
        $(".page3-1-img_2").addClass("pt-page-moveCircle");
        $(".page3-1-img_3").addClass("pt-page-moveFromLeft");
        $(".page3-1-img_7").addClass("pt-page-scaleUp");
        $(".page3-1-hint").addClass("pt-page-scaleUp");
    }else{
        $(".page3-1-top").removeClass("pt-page-moveFromBottom");
        $(".page3-1-img_2").removeClass("pt-page-moveCircle");
        $(".page3-1-img_3").removeClass("pt-page-moveFromLeft");
        $(".page3-1-img_7").removeClass("pt-page-scaleUp");
        $(".page3-1-hint").removeClass("pt-page-scaleUp");
    }
}
function  slide3AnimateClass(act){
    if(act==0){
        $(".page4-1-top").addClass("pt-page-moveFromBottom");
        $(".page4-1-img_2").addClass("pt-page-moveCircle");
        $(".page4-1-img_3").addClass("pt-page-moveFromBottom");
        $(".page4-1-img_7").addClass("pt-page-scaleUp");
        $(".page4-1-hint").addClass("pt-page-scaleUp");
    }else{
        $(".page4-1-top").removeClass("pt-page-moveFromBottom");
        $(".page4-1-img_2").removeClass("pt-page-moveCircle");
        $(".page4-1-img_3").removeClass("pt-page-moveFromBottom");
        $(".page4-1-img_7").removeClass("pt-page-scaleUp");
        $(".page4-1-hint").removeClass("pt-page-scaleUp");
    }
}
function slide4AnimateClass(act){
    if(act==0){
        $(".page5-1-top").addClass("pt-page-moveFromTop");
        $(".page5-1-img_2").addClass("pt-page-moveCircle");
        $(".page5-1-img_3").addClass("pt-page-moveFromBottom");
        $(".page5-1-img_7").addClass("pt-page-scaleUp");
        $(".page5-1-hint").addClass("pt-page-scaleUp");
    }else{
        $(".page5-1-top").removeClass("pt-page-moveFromTop");
        $(".page5-1-img_2").removeClass("pt-page-moveCircle");
        $(".page5-1-img_3").removeClass("pt-page-moveFromBottom");
        $(".page5-1-img_7").removeClass("pt-page-scaleUp");
        $(".page5-1-hint").removeClass("pt-page-scaleUp");
    }
}
function slide5AnimateClass(act){
    if(act==0){
        $(".page6-1-top").addClass("pt-page-moveFromTop");
        $(".page6-1-img_2").addClass("pt-page-moveCircle");
        $(".page6-1-img_3").addClass("pt-page-moveFromLeft");
        $(".page6-1-img_7").addClass("pt-page-scaleUp");
        $(".page6-1-hint").addClass("pt-page-scaleUp");
    }else{
        $(".page6-1-top").removeClass("pt-page-moveFromTop");
        $(".page6-1-img_2").removeClass("pt-page-moveCircle");
        $(".page6-1-img_3").removeClass("pt-page-moveFromLeft");
        $(".page6-1-img_7").removeClass("pt-page-scaleUp");
        $(".page6-1-hint").removeClass("pt-page-scaleUp");
    }
}