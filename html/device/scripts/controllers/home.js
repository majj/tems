/*
 * angular-deckgrid-demo
 *
 * Copyright(c) 2013 André K?nig <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André K?nig (andre.koenig@posteo.de)
 *
 */

angular.module('kanban.deckgrid').controller('HomeController', [

    '$scope',
  //  'flot',
    function initialize ($scope) {
        'use strict';
        //故障：#FF4136
        //试验中：#2ECC40
        //空闲：#CD8500
        //维保：#B10DC9
        $scope.photos = [
                {no:1, id: '环境试验室', name: '环境高低温转鼓', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"U201汽油车高温高原试验",typecolor:"#39CCCC",carddetail:{taskplane:[{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"}],taskhist:[{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"}],equminfo:[{logtime:"2015-1-8 12:00:13",equmevent:"start task",eventdetail:"task infomation"},{logtime:"2015-1-8 12:10:01",equmevent:"Error info",eventdetail:"Error info,equment is error"},{logtime:"2015-1-8 12:21:03",equmevent:"stop task",eventdetail:"task is stop....."}]}},
                {no:2, id: '环境试验室', name: '环境高低温舱', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"PM制动性能摸底试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}},
                {no:3, id: '环境试验室', name: '环境排放分析仪', src: '/device/images/p1.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:10",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}},
                {no:4, id: '环境试验室', name: '环境常温转鼓', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}}
        ];

        $scope.photohj = [
                {no:1, id: '环境试验室', name: '环境高低温转鼓', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"U201汽油车高温高原试验",typecolor:"#39CCCC",carddetail:{taskplane:[{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"}],taskhist:[{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"},{"pmName":"奥铃升级项目B103样车","details":"追加绕八字及变速箱换挡测试","vinNO":"CH20110303","taskNO":"FT_QK_t001","planStartDate":"2014-12-17","planEndDate":"2014-12-17","realStartDate":"2014-12-17 12:10:00","realEndDate":"2014-12-17 14:30:00","color":"FCC19D"}],equminfo:[{logtime:"2015-1-8 12:00:13",equmevent:"start task",eventdetail:"task infomation"},{logtime:"2015-1-8 12:10:01",equmevent:"Error info",eventdetail:"Error info,equment is error"},{logtime:"2015-1-8 12:21:03",equmevent:"stop task",eventdetail:"task is stop....."}]}},
                {no:2, id: '环境试验室', name: '环境高低温舱', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"PM制动性能摸底试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}},
                {no:3, id: '环境试验室', name: '环境排放分析仪', src: '/device/images/p1.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:10",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}},
                {no:4, id: '环境试验室', name: '环境常温转鼓', src: '/device/images/p2.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"0:20",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC",carddetail:{taskplane:[]}}
        ];

        $scope.photonj = [
                 {no:5, id: '耐久试验室', name: '耐久转鼓#1', src: '/device/images/p1.png', statsrc:'/device/images/work.gif',status:"故障",color:"#FF4136",runtime:"0:20",color2:"#FF4136",task:"暂无任务",typecolor:"#0074D9",carddetail:{taskplane:[]}},
                 {no:6, id: '耐久试验室', name: '耐久转鼓#2', src: '/device/images/p1.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"1:10",color2:"#2ECC40",task:"M型轻卡发动机耐久",typecolor:"#0074D9",carddetail:{taskplane:[]}},
                 {no:7, id: '耐久试验室', name: '耐久转鼓#3', src: '/device/images/p1.png', statsrc:'/device/images/work.gif',status:"空闲",color:"#CD8500",runtime:"0:25",color2:"#CD8500",task:"暂无任务",typecolor:"#0074D9",carddetail:{taskplane:[]}}
        ];

        $scope.photoxn = [
                 {no:8, id: '重鼓试验室', name: '重型转鼓', src: '/device/images/p3.png', statsrc:'/device/images/work.gif',status:"试验中",color:"#2ECC40",runtime:"1:52",color2:"#2ECC40",task:"BJ4189SLFCA-A1牵引车整车性能试验及可靠性",typecolor:"#DDDDDD",carddetail:{taskplane:[]}}
        ];

        $scope.photosq = [
                {no:9, id: '高温试验室', name: '四驱高温转鼓', src: '/device/images/p5.png', statsrc:'/device/images/work.gif',status:"空闲",color:"#CD8500",runtime:"1:26",color2:"#CD8500",task:"暂无任务",typecolor:"#39CCCC",carddetail:{taskplane:[]}},
                {no:10, id: '高温试验室', name: '四驱高温舱', src: '/device/images/p5.png', statsrc:'/device/images/work.gif',status:"维保",color:"#B10DC9",runtime:"1:26",color2:"#B10DC9",task:"暂无任务",typecolor:"#39CCCC",carddetail:{taskplane:[]}}
        ];
        // 1 环境试验室
        // 2 耐久试验室
        // 3 性能试验室
        // 4 四驱高温试验室
        //$scope.labno = 1;
        $scope.vm = {
                    activeTab:1
                    };

        $scope.switchlab = function (labno1){
        setTimeout(function () {  
          $scope.$apply(function () {
            $scope.labno = labno1;
            if (labno1 == 1){
                $scope.photos = $scope.photohj;
            } else if(labno1 == 2){
                $scope.photos = $scope.photonj;
            } else if(labno1 == 3){
                $scope.photos = $scope.photoxn;
            } else if(labno1 == 4){
                $scope.photos = $scope.photosq;
            }
//          alert('labno is:' + $scope.labno);
            });  
          }, 200); 
        };

/*
        $scope.switchlab = function (labno1){
        setTimeout(function () {  
          $scope.$apply(function () {  
            $scope.labno = labno1;
          //alert('labno is:' + $scope.labno);
            });  
          }, 200); 
        };

*/
        $scope.swdetailshow = function (card){
        setTimeout(function () {  
          $scope.$apply(function () {  
            console.log(" ----------cardid -----------" +  card);
            $scope.detailshow = true;
            $scope.currentcard = card;
          //alert('labno is:' + $scope.labno);
            }); 
          }, 200); 
        };

        $scope.switchStatus =function (card) {
            alert(card);
            card.status='测试中...';
            console.log("kkkkk");
        };
    },
]);

