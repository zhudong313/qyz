/**
 * Created by Administrator on 2016/6/11.
 */
var app={};
/*宽高自适应屏幕*/
app.screenWH=function(obj,json){
    //obj需要自适应屏幕的节点对象;json是json参数json.width表示图宽，json.height表示图高;json.bottomH底部的高度
	json.bottomH=json.bottomH?json.bottomH:0;
    var winW=$(window).width();
    var winH=$(window).height()-json.bottomH;
    $('.js-wh').css({height:winH+"px"});

    var h=Math.round(winH*json.width/winW);
    if(h>=json.height)
    {
        var marL=Math.ceil(json.width*winH/json.height);//实际拉伸后的宽
        marL=-(marL-winW)/2+"px";
        obj.css({height:winH+"px",marginLeft:marL,width:"auto",marginTop:0});
    }
    else
    {
        var marT=Math.ceil(winW*json.height/json.width);//实际拉伸后的高
        marT=-(marT-winH)/2+"px"
        obj.css({width:winW+"px",marginTop:marT,height:"auto",marginLeft:0});
    }
};

/*搜索*/
$('.search').submit(function(){
    var textObj=$(this).children('.text');
    var btnObj=$(this).children('.btn');
    if(textObj.is(':hidden'))
    {
        btnObj.css({backgroundColor:"#717171"});
        textObj.show().stop().animate({right:'88px'},100);
        return false;
    }
    else if(textObj.is(':visible') && $.trim(textObj.val())==''){
        btnObj.css({backgroundColor:"#f5f5f5"});
        textObj.stop().animate({right:'-150px'},100,function(){
            $(this).hide();
        });
        return false;
    }
});

//导航
app.navFun=function(){
    var winW=$(window).width();
    if(winW>990)//原版
    {
        $('.nav').unbind();
		app.navBBool=true;
        $('.nav').click(function(){
			if(app.navBBool)
			{
				app.navBBool=false;
            	$(this).children('ul').stop().animate({marginLeft:0},100);
            	$(this).stop().animate({width:'700px'},300);
			}
			else
			{
				app.navBBool=true;
				$(this).children('ul').stop().animate({marginLeft:'50px'},100);
            	$(this).stop().animate({width:0},300);
			}
        });
        $('.nav').mouseleave(function(){
			if(!app.navBBool)
			{
				$(this).children('ul').stop().delay(3000).animate({marginLeft:'50px'},100);
				$(this).stop().delay(3000).animate({width:0},300);
				app.navBBool=true;
			}
        });
    }
    else//侧边
    {
        $('.nav').unbind();
        app.navBool=true;
        $('.nav').click(function(){
            if(app.navBool){
                $('.side-nav').stop(false,true).animate({right:0},200);
                app.navBool=false;
            }
            else
            {
                 $('.side-nav').stop(false,true).animate({right:'-300px'},200);
                app.navBool=true;
            }
        });
    }
};
app.navFun();

//首页
if(document.getElementById('index'))
{
	//宽高自适应屏幕；第一屏
    app.screenWH($('.js-adaptive-img'),{
        width:1920,
        height:932
    });
	//第二屏
	app.screenWH($('.js-adaptive2-img'),{
        width:1920,
        height:699
    });

    //窗口变化触发
    $(window).resize(function(){
        app.screenWH($('.js-adaptive-img'),{
            width:1920,
            height:932
        });//图自适应窗口
		
		app.screenWH($('.js-adaptive2-img'),{
            width:1920,
            height:932
        });//图自适应窗
    });

    //鼠标提示
    app.backForth=function(){
        $('.js-backForth').stop(false,true).animate({
            bottom:0
        },1000,function(){
            $(this).animate({bottom:'12px'},1000,function(){
                app.backForth();
            });
        });
    };
    app.backForth();

	//6张图
	$('.index-m-list li').mouseenter(function(){
		var indexObj=$(this).find('.index-m-name');
		if(indexObj.length!=0)
		{
			indexObj.children('.index-m-more').stop(false,true).fadeIn(300);
			indexObj.children('.index-m-en').stop().animate({paddingTop:'40px'},300);
		}
		
		$(this).find('.opacity').stop(false,true).fadeIn(300);
		$(this).find('img').stop().animate({width:'120%',marginTop:"-30px",marginLeft:"-48px"},300);
	});
	$('.index-m-list li').mouseleave(function(){
		var indexObj=$(this).find('.index-m-name');
		if(indexObj.length!=0)
		{
			indexObj.children('.index-m-more').stop(false,true).fadeOut(300);
			indexObj.children('.index-m-en').stop().animate({paddingTop:'65px'},300);
		}
		$(this).find('.opacity').stop(false,true).fadeOut(300);
		$(this).find('img').stop().animate({width:'100%',marginTop:0,marginLeft:0},300);
	});
	
	//滚动
	$(window).scroll(function(){
		var winH=$(window).height();
		var scrollTop=$('html').scrollTop()+$('body').scrollTop();
		var num=winH-scrollTop;
		if(num>=0)
		{
			$('.index-bg').css({height:num+"px"});
		}
		else
		{
			$('.index-bg').css({height:"0px"});
		}
	});
	
	//底部切换
	app.flashFade=function(){
		var oldPos=$('.index-flash .current').index('.index-flash li');
		var lastPos=$('.index-flash li:last').index('.index-flash li');
		var newPos=oldPos!=lastPos?oldPos+1:0;
		$('.index-flash li').eq(newPos).addClass('current').siblings('.current').removeClass('current');
		$('.index-flash li').eq(newPos).stop(false,true).fadeIn(800);
		$('.index-flash li').eq(oldPos).stop(false,true).fadeOut(800);
		window.setTimeout(arguments.callee,5000);
	};
	app.flashFade();
}

//关于我们
if(document.getElementById('about'))
{

    //宽高自适应屏幕；第一屏
    app.screenWH($('.js-adaptive-img'),{
        width:1920,
        height:883,
        bottomH:$('.footer').height()
    });

    //窗口变化触发
    $(window).resize(function(){
        //宽高自适应屏幕；第一屏
        app.screenWH($('.js-adaptive-img'),{
            width:1920,
            height:883,
            bottomH:$('.footer').height()
        });
    });


    //判断个数显示样式
    if($('.about-list li').length>3)
    {
        $('.about-list').addClass('about-listMore');
        $('.about-listMore li').each(function(index){
           $(this).addClass('about-list-li'+index);
        });

        if($(window).width()<1200 || $(window).height()<1000)
        {
            $('.about-listMore ul').css({width:$('.about-list li').length*($('.about-listMore li:first').outerWidth()+parseInt($('.about-listMore li:first').css('margin-right')))+"px"});
        }
        else
        {
            $('.about-listMore').css({marginTop:'-350px',overflow:'hidden'});
        }
    }
	
	/********文本弹框 start************/
	$('body').on('click','.fixed-text-xx',function(){
		$(this).parents('.js-text-fixed').fadeOut();
	});
	//切换
	$('body').on('click','.f-t-nav a',function(){
		var nowPos=$(this).index();
		$(this).addClass('current').siblings('.current').removeClass("current");
		$(this).parent().nextAll('.f-t-navM').eq(nowPos).show().siblings('.f-t-navM').hide();
		$('.fixed-text-m').jScrollPane();
	});
	/********文本弹框 end************/
}


/*联系我们*/
if(document.getElementById('contact')){
    //宽高自适应屏幕；第一屏
    app.screenWH($('.js-adaptive-img'),{
        width:1920,
        height:883,
        bottomH:$('.footer').height()
    });


    /*主体区域*/
    app.resizeFun=function(){
        app.winW=$(window).width();
        app.winH=$(window).height()-$('.footer').height();
        if(app.winW>1200 && app.winH>900)
        {
            ww=1150;
            hh=500;
        }
        else if(app.winW<450 && app.winH<720)
        {
            ww=Math.round(app.winW*75/100);
            hh=Math.round(app.winH*40/100);
        }
        else
        {
            ww=Math.round(app.winW*75/100);
            hh=Math.round(app.winH*60/100);
        }
        $('.contact').css({width:ww+'px',height:hh+'px',marginLeft:-(ww+50)/2+"px",marginTop:-(hh+50)/2+"px"});
    };
    app.resizeFun();

    //窗口变化触发
    $(window).resize(function(){
        //宽高自适应屏幕；第一屏
        app.screenWH($('.js-adaptive-img'),{
            width:1920,
            height:883,
            bottomH:$('.footer').height()
        });

        /*主体区域*/
        app.resizeFun();

        //滚动条
        $('.contact-main').jScrollPane();
    });

    /*栏目切换*/
    $('body').on('click','.contact-nav a',function(){
        var nowPos=$(this).index();
        $(this).addClass('current').siblings('.current').removeClass('current');
        $('.contact-main').eq(nowPos).show().siblings('.contact-main').hide();
        $('.contact-main').eq(nowPos).jScrollPane();
    });
    $('.contact-main').jScrollPane();
}

/*招商加盟*/
if(document.getElementById('bussiness')){
	//宽高自适应屏幕；第一屏
    app.screenWH($('.js-adaptive-img'),{
        width:1920,
        height:883,
        bottomH:$('.footer').height()
    });

    //窗口变化触发
    $(window).resize(function(){
        //宽高自适应屏幕；第一屏
        app.screenWH($('.js-adaptive-img'),{
            width:1920,
            height:883,
            bottomH:$('.footer').height()
        });

        /*主体区域*/
        app.resizeFun();
    });
	
	/*主体区域*/
    app.resizeFun=function(){
        app.winW=$(window).width();
        app.winH=$(window).height()-$('.footer').height();
        if(app.winW>1200 && app.winH>900)
        {
            ww=1150;
            hh=500;
        }
        else if(app.winW<450 && app.winH<720)
        {
            ww=Math.round(app.winW*75/100);
            hh=Math.round(app.winH*40/100);
        }
        else if(app.winW==1024)
        {
            ww=Math.round(app.winW*75/100);
            hh=Math.round(app.winH*60/100);
        }
        else
        {
            ww=Math.round(app.winW*75/100);
            hh=Math.round(app.winH*60/100);
        }
        $('.bussiness').css({width:ww+'px',height:hh+'px',marginLeft:-(ww+50)/2+"px",marginTop:-(hh+50)/2+"px"});
    };
    app.resizeFun();
	
	//地址切换
	$('body').on('click','.b-f-address,.b-f-xx',function(){
		$('.b-f-info').stop().slideToggle();
	});
}


/*招商加盟*/
if(document.getElementById('brand')){
	//宽高自适应屏幕；第一屏
    app.screenWH($('.js-adaptive-img'),{
        width:1920,
        height:1000,
        bottomH:$('.footer').height()
    });

    //窗口变化触发
    $(window).resize(function(){
        //宽高自适应屏幕；第一屏
        app.screenWH($('.js-adaptive-img'),{
            width:1920,
            height:1000,
            bottomH:$('.footer').height()
        });
		app.resizeFun();
    });


    /*主体区域*/
	app.resizeFun=function(){
		app.winW=$(window).width();
		app.winH=$(window).height()-$('.footer').height();
		
		$('.fixed-brand').css({'height':app.winH+"px"});
		if(app.winW<1240)
		{
			ww=app.winW-40;
		}
		else
		{
			ww=1200;
		}
		$('.brand').css({width:ww+'px',marginLeft:-(ww)/2+"px"});
		
		var liFirst=$('.js-b-ul li:first');
		var liW=liFirst.width()+parseInt(liFirst.css('marginRight'))-1;
		var lisNum=Math.floor($('.brand-list').width()/liW);
		var brandListMarginLeft=Math.round(($('.brand-listM').width()-liW*lisNum)/2);
		$('.brand-list').css({marginLeft:brandListMarginLeft+"px"});
	};
	app.resizeFun();
	
	//弹框
	$('body').on('click','.fixed-brand-xx',function(){
		$('.fixed-brand').animate({top:"100%"},600,function(){
			$(this).hide();
		});
	});
}

/*产品中心*/
if(document.getElementById('product')){

    //窗口变化触发
    $(window).resize(function(){
		
		app.resizeFun();
		
		app.productFlashFun();
    });


    /*主体区域*/
	app.resizeFun=function(){
        var productNavNode=$('.product-nav');
		app.winW=$(window).width()-parseInt($('.product-nav').css('left'))-parseInt($('.product').css('padding-left'))*2-productNavNode.width();
		app.winH=$(window).height()-$('.footer').height();
		
		$('.fixed-brand').css({'height':app.winH+"px"});

        var ww=app.winW;
		
		if(ww<=235)
		{
			ww=235;
		}

        var hh=app.winH-300;
        if(hh>=525)
        {
            hh=525;
            $('.product-nav').css({overflow:"hidden"});
            //侧导航a宽
            $('.product-nav a').css({width:(productNavNode.width()-22)+'px'});
        }
        else if(hh<=235)
        {
            $('.product-nav').css({overflow:"auto"});
            hh=235;
            //侧导航a宽
            $('.product-nav a').css({width:'auto'});
        }
        else
        {
            $('.product-nav').css({overflow:"auto"});
            //侧导航a宽
            $('.product-nav a').css({width:'auto'});
        }

		$('.product').css({width:ww+'px',height:hh+"px"});
		
		var liFirst=$('.js-b-ul li:first');
		var liW=liFirst.width()+parseInt(liFirst.css('marginRight'))-1;
		var lisNum=Math.floor($('.brand-list').width()/liW);
		lisNum=lisNum==0?1:lisNum;
		var brandListMarginLeft=Math.round(($('.brand-listM').width()-liW*lisNum)/2);
		//console.log($('.brand-list').width(),liW,lisNum,brandListMarginLeft);
		$('.brand-list').css({marginLeft:brandListMarginLeft+"px"});
		
		//弹框高度
		$('.fixed-product,.fixed-product-content,.fixed-product-content li').css({height:app.winH+"px"});
		
		//弹框宽度及左偏移
		app.navProductW=$('.product-nav').width()+parseInt($('.product-nav').css('left'));
        app.winW+=parseInt($('.product').css('padding-left'))*2;
		$('.fixed-product').css({left:(app.navProductW+21)+"px",width:(app.winW)+"px"});
		
		//侧导航高度
		$('.product-nav').css({height:($('.product').outerHeight()-2)+'px'});


        //产品移上动画
        $('body').on('mouseenter','.js-b-ul li',function(){
            $(this).children('span').stop().animate({bottom:'0px'},200);
        });
        $('body').on('mouseleave','.js-b-ul li',function(){
            $(this).children('span').stop().animate({bottom:'-34px'},200);
        });
		
	};
	app.resizeFun();
	
	
	/* 产品切换*/
	app.productFlashFun=function(){
		var contentNode=$('.fixed-product-content');
		var leftNode=$('.fixed-product-left');
		var rightNode=$('.fixed-product-right');
		app.currentLiMiddle=function(){
			var currentLi=contentNode.children('.current');
			var prevW=0;
			contentNode.children('.current').prevAll('li').each(function(){
				prevW+=$(this).width();
			});
			var currentLiW=currentLi.width();//当前图片宽度
			var middleLeft=Math.round((app.winW-currentLiW)/2)-prevW;
			contentNode.animate({left:middleLeft+"px"},200);//当前图片居中
			
			var aW=leftNode.children('a').width();
			if((app.winW-currentLiW)/2>=aW)
			{//宽度足够宽
				var currentOffset=(app.winW-currentLiW)/2;
				console.log(currentOffset);
				leftNode.stop(false,true).animate({width:currentOffset+"px"},500);
				rightNode.stop(false,true).animate({width:currentOffset+"px"},500);
			}
			else
			{
				leftNode.stop(false,true).animate({width:aW+"px"},500);
				rightNode.stop(false,true).animate({width:aW+"px"},500);
			}
			
			//弹框高度
			$('.fixed-product,.fixed-product-content,.fixed-product-content li').css({height:app.winH+"px"});
		};
		app.currentLiMiddle();
		//网页加载完毕触发
		$(window).on("load",app.currentLiMiddle);

        app.oldPos=0;
		//左键
		leftNode.children('a').click(function(){
			var oldPos=contentNode.children('.current').index();
			var lastPos=contentNode.children('li').length-1;
			var nowPos=oldPos==0?lastPos:oldPos-1;
			//console.log(oldPos,nowPos,lastPos);
            window.setTimeout(function(){
                contentNode.children('li').eq(nowPos).addClass('current').siblings('.current').removeClass('current');
            },5);
			window.setTimeout(app.currentLiMiddle,20);
		});
		//右键
		rightNode.children('a').click(function(){
			var oldPos=contentNode.children('.current').index();
			var lastPos=contentNode.children('li').length-1;
			var nowPos=oldPos==lastPos?0:oldPos+1;
			//console.log(oldPos,nowPos,lastPos);
            window.setTimeout(function(){
                contentNode.children('li').eq(nowPos).addClass('current').siblings('.current').removeClass('current');
            },5);
			window.setTimeout(app.currentLiMiddle,20);
		});
	};
	app.productFlashFun();
}


//品牌和切换产品
$('body').on('click','.js-b-up',function(){
    var liFirst=$('.js-b-ul li:first');
    var oldPos=Math.abs(parseInt($('.js-b-ul').css('marginTop')));
    var liH=liFirst.height()+parseInt(liFirst.css('marginBottom'));
    oldPos=Math.round(oldPos/liH);
	var viewH=$('.brand-listM').height();
    var lastPos=Math.round($('.js-b-ul').height()/liH)-Math.round(viewH/liH);
    if(lastPos>0)
    {
        if(oldPos==lastPos)
        {
            return;
        }
        var nowPos=oldPos+1;
        //console.log(oldPos,nowPos,lastPos,liH);
        $('.js-b-ul').animate({marginTop:-nowPos*liH+"px"},300);
    }
});
$('body').on('click','.js-b-down',function(){
    var liFirst=$('.js-b-ul li:first');
    var oldPos=Math.abs(parseInt($('.js-b-ul').css('marginTop')));
    var liH=liFirst.height()+parseInt(liFirst.css('marginBottom'))-1;
    oldPos=Math.round(oldPos/liH);
    var lastPos=Math.round($('.js-b-ul').height()/liH)-3;
    if(lastPos>0)
    {
        if(oldPos==0)
        {
            return;
        }
        var nowPos=oldPos-1;
       // console.log(oldPos,nowPos,lastPos,liH);
        $('.js-b-ul').animate({marginTop:-nowPos*liH+"px"},300);
    }
});


//幻灯片
$('body').on('click','.js-flash-l',function(){
	var ulNode=$(this).next();
	var lastPos=ulNode.children('li').length-1;
	var oldPos=ulNode.children('.current').index();
	var newPos=oldPos==0?lastPos:oldPos-1;
	ulNode.children('li').eq(newPos).addClass('current').siblings('.current').removeClass('current');
	ulNode.children('li').eq(newPos).stop(false,true).fadeIn();
	ulNode.children('li').eq(oldPos).stop(false,true).fadeOut();
});
$('body').on('click','.js-flash-r',function(){
	var ulNode=$(this).prev();
	var lastPos=ulNode.children('li').length-1;
	var oldPos=ulNode.children('.current').index();
	var newPos=oldPos==lastPos?0:oldPos+1;
	ulNode.children('li').eq(newPos).addClass('current').siblings('.current').removeClass('current');
	ulNode.children('li').eq(newPos).stop(false,true).fadeIn();
	ulNode.children('li').eq(oldPos).stop(false,true).fadeOut();
});


/*模拟下拉*/
$("body").on('mouseenter','.js-select',function(){
    $(this).find("ul").show();
    $(this).css("z-index",'999');
});
$("body").on('mouseleave','.js-select',function(){
    $(this).find("ul").hide();
    $(this).css("z-index",'99');
});
$("body").on("click",".js-select a",function(){
    $(this).parents(".js-select").find(".selectText").text($(this).text());
    $(this).parents(".js-select").find("input").val($(this).attr("val"));
    $(this).parents(".js-select").find("ul").hide();
});

//弹框视频
$('.js-video').click(function(){
	var winW=$(window).width();
	var winH=$(window).height();
	var w,h,ww,hh;
	w="100%";
	h="100%";
	if(winW>1300 && winH>800)
	{
		ww=1160;
		hh=700;
	}
	else
	{
		var num=Math.min(winW,winH);
		if(num>=100)
			ww=num-100;
		else
			ww=100;
		hh=Math.round(ww*3/4);
	}
	
	
	$('.fixed-video-main').css({width:ww+'px',height:hh+'px',marginLeft:-(ww+40)/2+"px",marginTop:-(hh+40)/2+"px"});
	var linkA=$(this).attr('link');
	var flash='<embed src="'+linkA+'" width="'+w+'" height="'+h+'" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" flashvars="from=ku6"></embed>';
	$('.fixed-video').show();
	$('.fixed-video-v').html(flash);
});
$('.fixed-video-xx').click(function(){
	$(this).parents('.fixed-video').hide();
	$('.fixed-video-v').html();
});

//窗口变化触发
$(window).resize(function(){
    //导航
    app.navFun();
});

