window.onload=function () {
//$(document).ready不需要图片加载完成就执行,第一次访问时出现图片错位
    appendToDOM();
    setTimeout(waterFall,1000);

    $(window).on("scroll", function () {
        if (checkWillLoad()) {

            appendToDOM();
            waterFall();
        }
    });


};

function waterFall() {
    var allBox = $("#main > .box");
    var boxWidth = $(allBox).eq(0).outerWidth();
    var screenWidth = $(window).width();
    console.log(boxWidth, screenWidth);
    var col = Math.floor(screenWidth / boxWidth);
    $("#main").css({
        "width": col * boxWidth + "px",
        "margin": "0 auto"
    });
    var heightArr = [];

    $.each(allBox, function (index, value) {
        var boxHeight = $(value).outerHeight();

        if (index < col) {
            heightArr[index] = boxHeight;
        } else {
            var minBoxHeight = Math.min.apply(null, heightArr);
            var minBoxIndex = $.inArray(minBoxHeight, heightArr);
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight + "px",
                "left": minBoxIndex * boxWidth + "px"
            });
            heightArr[minBoxIndex] += boxHeight;
        }
        // console.log(heightArr + "是heightArr的值");
    });
}


function checkWillLoad() {
    var lastBox = $("#main > .box").last();
    var boxDis = $(lastBox).offset().top + $(lastBox).outerHeight();
    return boxDis <= $(window).scrollTop() + $(window).height();
}

function appendToDOM() {
    var data = {dataImg: [{"img": "water (1).jpg"}, {"img": "water (2).jpg"}, {"img": "water (3).jpg"}, {"img": "water (4).jpg"}, {"img": "water (5).jpg"}, {"img": "water (6).jpg"}, {"img": "water (7).jpg"}, {"img": "water (8).jpg"}, {"img": "water (9).jpg"}, {"img": "water (10).jpg"}, {"img": "water (11).jpg"}, {"img": "water (12).jpg"}, {"img": "water (13).jpg"}, {"img": "water (14).jpg"}, {"img": "water (15).jpg"}, {"img": "water (16).jpg"}, {"img": "water (17).jpg"}, {"img": "water (18).jpg"}, {"img": "water (19).jpg"}, {"img": "water (20).jpg"}]};
    $.each(data.dataImg, function (index, value) {
        //重点
        //append和appendTo区别:a.append(b)把b追加到a中,c.appendTo($(d))把c追加到d中,所以参数是一个选择器
        var newBox = $("<div>").addClass("box").appendTo($("#main"));
        var newPic = $("<div>").addClass("pic").appendTo($(newBox));
        $("<img>").attr("src", "waterFallImages/" + $(value).attr("img")).appendTo($(newPic));

    });
}