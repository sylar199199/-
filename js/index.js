import "../css/select2.css";
import "../css/index.css"
import "../css/platform-search.css"
import select2 from "select2";
var apiBasePath="http://106.13.173.60:9008/api"
//获取我的排名
function getMyRank() {
    $.ajax({
        url: `${baseUrl}play/rank?uid=22`,
        success: function (result) {
            const myRank = JSON.parse(result.bodyMessage).userFalseRankModel;
            if (myRank.rank == 2) {
                showPage('my-award', 'fade');
                $(".my-sorce").text(myRank.score);
            }
        }
    });
}
//获取首页参与人数
function getPeopleCount() {
    $.ajax({
        url: `${baseUrl}index/indexGetPeopleCount`,
        success: function (result) {
           $(".people-count").text(JSON.parse(result.bodyMessage).peopleCount)
        }
    });
}
//生成周排行榜
function getWeekRank() {
    $.ajax({
        url: `${baseUrl}play/rank?uid=22`,
        success: function (result) {
            const rankList = JSON.parse(result.bodyMessage).weekRankList;
            console.log('22', rankList);
            let html = "";
            $.each(rankList, (index, item) => {
                if (index === 0) {
                    html += "<li class='rank-week-one rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-1.png' class='img-rank' alt='第一名奖杯'>" + "</div>"
                        + "<p class='text-before-four'>" + item.nickName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else if (index === 1) {
                    html += "<li class='rank-week-two rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-2.png' class='img-rank' alt='第二名奖杯'>" + "</div>"
                        + "<p class='text-before-four'>" + item.nickName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else if (index === 2) {
                    html += "<li class='rank-week-three rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-3.png' class='img-rank' salt='第三名奖杯'>" + "</div>"
                        + "<p class='text-before-four'>" + item.nickName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else {
                    html += "<li class='rank-li rank-li'>"
                        + "<p class='rankindex-after-four'>" + item.rank + "</p>"
                        + "<p class='text-after-four'>" + item.nickName + "</p>"
                        + "<p class='rank-after-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                }
            })
            $(".week-line-list").append(html);
            let myRankHtml = "";
            const myRank = JSON.parse(result.bodyMessage).userFalseRankModel;
            if (myRank.rank == "1") {
                myRankHtml += "<li class='rank-week-one rank-li'>"
                    + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-1.png' class='img-rank' alt='第一名奖杯'>" + "</div>"
                    + "<p class='text-before-four'>" + myRank.nickName + "</p>"
                    + "<p class='rank-before-four'>" + myRank.score + "次" + "</p>"
                    + "</li>"
            } else if (myRank.rank == "2") {
                myRankHtml += "<li class='rank-week-one rank-li'>"
                    + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-2.png' class='img-rank' alt='第二名奖杯'>" + "</div>"
                    + "<p class='text-before-four'>" + myRank.nickName + "</p>"
                    + "<p class='rank-before-four'>" + myRank.score + "次" + "</p>"
                    + "</li>"
            } else if (myRank.rank == "3") {
                myRankHtml += "<li class='rank-week-three rank-li'>"
                    + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/jiangbei-3.png' class='img-rank' salt='第三名奖杯'>" + "</div>"
                    + "<p class='text-before-four'>" + myRank.nickName + "</p>"
                    + "<p class='rank-before-four'>" + myRank.score + "次" + "</p>"
                    + "</li>"
            } else {
                myRankHtml += "<li class='rank-li'>"
                    + "<p class='rankindex-after-four'>" + myRank.rank + "</p>"
                    + "<p class='text-after-four'>" + myRank.nickName + "</p>"
                    + "<p class='rank-after-four'>" + myRank.score + "次" + "</p>"
                    + "</li>"
            }
            $(".my-rank").append(myRankHtml);
        }
    });
}
// 生成排行榜
function getIPlatformRank() {
    $.ajax({
        url: `${baseUrl}index/indexPlatformRank`,
        success: function (result) {
            const rankList = JSON.parse(result.bodyMessage);
            // 渲染平台列表
            let html = "";
            $.each(rankList, (index, item) => {
                if (item.rank == 1) {
                    html += "<li class='rank-rank-one rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/one.png' class='img-rank' alt=''>" + "</div>"
                        + "<p class='text-before-four'>" + item.platformName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else if (item.rank == 2) {
                    html += "<li class='rank-rank-three rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/two.png' class='img-rank' alt=''>" + "</div>"
                        + "<p class='text-before-four'>" + item.platformName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else if (item.rank == 3) {
                    html += "<li class='rank-rank-two rank-li'>"
                        + "<div class='rankindex-before-four'>" + "<img src='./img/ranking/three.png' class='img-rank' salt=''>" + "</div>"
                        + "<p class='text-before-four'>" + item.platformName + "</p>"
                        + "<p class='rank-before-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                } else {
                    html += "<li class='rank-li'>"
                        + "<p class='rankindex-after-four'>" + item.rank + "</p>"
                        + "<p class='text-after-four'>" + item.platformName + "</p>"
                        + "<p class='rank-after-four'>" + item.score + "次" + "</p>"
                        + "</li>"
                }
            });
            $(".rank-line-list").append(html);
        }
    });
}
//炫耀一下
function shareOnce() {
    $(".share-tips").css("display", "block")
}
// 清空
function clearAll() {
    $('#id_select2').val(null).trigger('change');
    $(".clear-item").css("display", "none");
}
// 页面跳转
function clickChane(hidePage, showPage) {
    if (hidePage) {
        $("#" + hidePage).css("display", "none");
    }
    if (showPage === "platform-search") {
        $("#" + showPage).css("position", "relative")
    } else if (showPage === "gamePage") {
        $("#gamePage").css("visibility", "visible")
    }
    $("#" + showPage).show();
}
//展示排行榜
function showPage(showDiv, hideDiv) {
    $("#" + showDiv).css("display", "block")
    $("#" + hideDiv).css("display", "block")
    $("#" + hideDiv).height($(document).height());
};
//关闭排行榜
function CloseDiv(showDiv, hideDiv) {
    $("#" + showDiv).css("display", "none")
    $("#" + hideDiv).css("display", "none")
    $(".rank-line-list").empty();
    $(".week-line-list").empty();
    $(".my-rank").empty()

}
//查看排行榜
$('#rankTopBtn').on('click',function(){
    getIPlatformRank();
    showPage('MyDiv', 'fade');
})
$('#startGameBtn').on('click',function(){
    showPage('serch-show', 'fade')
})

$('#reRankTop').on('click',function(){
    showPage('week-div', 'fade');
    getWeekRank()
})
$('#reStartGameBtn').on('click',function(){
    reStartHit()
})
$('#closeRankBtn').on('click',function(){
    CloseDiv('week-div','fade')
})
$('#closeReRankBtn').on('click',function(){
    CloseDiv('MyDiv','fade')
})
$('#clearSearchBtn').on('click',function(){
    clearAll();
})
$('#closeAwardBtn').on('click',function(){
    CloseDiv('my-award','fade')
})
$('#fade').on('click',function(){
    CloseDiv('MyDiv','fade')
})
//设置内容
function setText(className, textVal){
    $('.'+className).text(textVal);
}
$('#showActivity').on('click', ()=>{
    showPage('activity-explain', 'fade');
    $.ajax({
        url: `${baseUrl}index/indexGetActivity`,
        success: function (result) {
            const message = JSON.parse(result.bodyMessage);
            setText('explain-text',message.content);
            setText('fisrt-prize',message.prizes[0].name);
            setText('second-prize',message.prizes[1].name);
            setText('three-pirze',message.prizes[2].name);
            setText('start-time',message.startTime);
            setText('end-time',message.endTime);
        }
    });
})
$('#explain').on('click', ()=>{
    $('.explain-content').css('display', 'block')
    $('#explain').css('border-bottom','0.06rem solid #f6bc4f');
    $('.mine-award').css('display', 'none')
    $('#mine').css('border-bottom','none');
})
$('#mine').on('click', ()=>{
    $('.explain-content').css('display', 'none');
    $('#explain').css('border-bottom','none');
    $('.mine-award').css('display', 'block').css('border-bottom','none');
    $('#mine').css('border-bottom','0.06rem solid #f6bc4f');

})
// //开始游戏btn
// $('#startGameBtn').on('click', function () {
//     clickChane('index', 'platform-search');
// })
//开打
function startHit(data) {
    console.log(data);
    tGame.platformId=data.platformId;
    tGame.platformUrl=data.platformUrl;
    tGame.platformName=data.platformName;
    $.ajax({
        url:baseUrl+"/play/settle",
        data:{
            uid:"22"
        },
        success:function(res){
            let data=toJson(res.bodyMessage);
            tGame.publicKey=data.publicKey;
            tGame.game.load.onLoadComplete.add(function(){
                tGame.game.state.start('Play');
                clickChane('index', 'gamePage');
                CloseDiv("serch-show", "fade");
            }, this);
            tGame.game.load.image("logo", tGame.platformUrl);
            tGame.game.load.start();
        }
    })
}
//重新开打
function reStartHit() {
    $("#gamePage").css("visibility", "hidden");
    $("#result").css("display","none");
    clickChane('', 'gamePage');
    startHit();
}
//背景音乐
function audioPlayer(id) {
    var audio = document.getElementById(id);
    audio.onload = function () {
        var ua = window.navigator.userAgent.toLowerCase()
        audio.volume = 0.3;
        if (/micromessenger/.test(ua)) {
            document.addEventListener(
                'WeixinJSBridgeReady'
                , function () {
                    audio.play()
                }, false)

            if (typeof window.WeixinJSBridge == "object" && typeof window.WeixinJSBridge.invoke == "function") {
                window.WeixinJSBridge.invoke('getNetworkType', {}, function () {
                    audio.play()
                })
            }
        } else {
            audio.play();

            function touchPlay() {
                audio.play()
                document.removeEventListener(
                    'touchstart'
                    , touchPlay, false)
            }

            if (audio.paused) {
                document.addEventListener('touchstart', touchPlay, false)
            }
        }
    }
}
// 查询垃圾平台
function initSelect() {
    $('#id_select2').select2({
        allowClear: true,
        ajax: {
            url: `${baseUrl}index/indexPlatformList`,
            dataType: "json",
            type: "get",
            delay: 1000, // 延迟1秒查询
            data: function (params) {
                var query = {
                    platformName: params.term,
                    size: 10,
                    index: 1,
                }
                return query;
            },
            processResults: function (data, params) {
                let options = data.bodyMessage.data.map((item) => {
                    return {
                        id: item.platformId,
                        text: item.platformName
                    }
                });
                if (options.length > 1) {
                    $(".platform-list").css("display", "none")
                }
                return {
                    "results": [{id: "0", "text": ""}, ...options]
                };
            },
            cache: true
        },
        minimumInputLength: 1, // 最少输入字符
    });
};
let top20Rubbish=[];
// 初始化垃圾平台列表
function getSearch() {
    $.ajax({
        url:apiBasePath+"/index/indexPlatformList",
        data:{
            index:1,
            size:20
        },
        success:function(res){
            top20Rubbish=toJson(res.bodyMessage).data;
            // 渲染平台列表
            let html = "";
            $.each(top20Rubbish, (index, item) => {
                index <= 2 ?
                    html += "<li class='platform-item'>"
                    + "<span class='index-before-four'>" + (index + 1) + "</span>"
                    + "<span class='name-before-four'>" + item.platformName + "</span>"
                    + "<img src='./img/platform-search/bt@2x.png' class='searchimg-bit' />"
                    + "</li>"
                    : html += "<li class='platform-item'>"
                    + "<span class='index-after-four'>" + (index + 1) + "</span>"
                    + "<span class='name-after-four'>" + item.platformName + "</span>"
                    + "<img src='./img/platform-search/bt@2x.png'  class='searchimg-bit' />"
                    + "</li>"
            })
            $("#platformList").append(html);
        }
    })
};
$("#platformList").on('click','img',function(e){
    let index=$("#platformList img").index(this);
    startHit(top20Rubbish[index])
})
// 显示分数页
window.showResult=function(sorce) {
    $.ajax({
        url:"/play/settle",
        type:"POST",
        data:{

        }
    })
    $(".now-sorce").text(sorce);
    $("#result").css("display","block");
}

function toJson(str){
    if (Object.prototype.toString.call(str) === "[object String]") {
        if (str) {
            return eval("(" + str + ")");
        }
        return "";
    }
    return str;
};
// 分享增加游戏次数
$('#shareAdd').on('click', ()=>{
    let uid = '11'
    $.ajax({
        url: `${baseUrl}play/share?count=1&uid=${uid}`,
        success: function (result) {
            if (result.subCode.substring(result.subCode.length - 1, result.subCode.length) === "0") {
                $('.current-count').text(parseInt($('.current-count').text()) + 1)
            } else {
                alert(result.message);
            }
        },
    });
})
$(document).ready(() => {
    getMyRank();
    initSelect();
    getSearch();
    getPeopleCount();
    $("#id_select2").on("select2:select", function (e) {
        $("#id_select2 option:checked").val() === '' || undefined ? $(".platform-list").css("display", "none")
            : $(".platform-list").css("display", "block");
        $(".clear-item").css("display", "block");
        $(".search-bit").attr("src", "./img/platform-search/bt@2x.png").on("click", () => {
            /*console.log('', $('#id_select2').text())*/
            startHit()
        });
    });
    tGame.game.state.start('Preload');
    audioPlayer("bgMusic");
    //clickChane('index','platform-search');
    // tGame.game.state.start('Preload');
});
