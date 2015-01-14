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
        $scope.photos = [
                {id: '耐久试验室', name: '耐久转鼓#1', src: '/grid/images/p1.png', statsrc:'/grid/images/work.gif',status:"故障",color:"#FF4136",data:"35",data2:"0.1",runtime:"0:20",color2:"#FF4136",task:"暂无任务",typecolor:"#0074D9"},
                {id: '耐久试验室', name: '耐久转鼓#2', src: '/grid/images/p1.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"76",data2:"0.2",runtime:"1:10",color2:"#2ECC40",task:"M型轻卡发动机耐久",typecolor:"#0074D9"},
                {id: '耐久试验室', name: '耐久转鼓#3', src: '/grid/images/p1.png', statsrc:'/grid/images/work.gif',status:"空闲",color:"#CD8500",data:"53",data2:"0.3",runtime:"0:25",color2:"#CD8500",task:"暂无任务",typecolor:"#0074D9"},
                {id: '重鼓试验室', name: '重型转鼓', src: '/grid/images/p3.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"27",data2:"0.2",runtime:"1:52",color2:"#2ECC40",task:"BJ4189SLFCA-A1牵引车整车性能试验",typecolor:"#DDDDDD"},
                {id: '环境试验室', name: '高低温间转鼓', src: '/grid/images/p2.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"67",data2:"0.5",runtime:"0:20",color2:"#2ECC40",task:"U201汽油车高温高原试验",typecolor:"#39CCCC"},
                {id: '环境试验室', name: '高低温间环境舱', src: '/grid/images/p2.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"67",data2:"0.5",runtime:"0:20",color2:"#2ECC40",task:"PM制动性能摸底试验",typecolor:"#39CCCC"},
                {id: '环境试验室', name: '排放分析仪', src: '/grid/images/p1.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"56",data2:"0.4",runtime:"0:10",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC"},
                {id: '环境试验室', name: '常温间转鼓', src: '/grid/images/p2.png', statsrc:'/grid/images/work.gif',status:"试验中",color:"#2ECC40",data:"67",data2:"0.5",runtime:"0:20",color2:"#2ECC40",task:"4JB1配P202国四皮卡整车排放试验",typecolor:"#39CCCC"},
                {id: '高温实验室', name: '四驱高温转鼓', src: '/grid/images/p5.png', statsrc:'/grid/images/work.gif',status:"空闲",color:"#CD8500",data:"55",data2:"0.1",runtime:"1:26",color2:"#CD8500",task:"暂无任务",typecolor:"#556B2F"},
                {id: '高温实验室', name: '四驱高温环境舱', src: '/grid/images/p5.png', statsrc:'/grid/images/work.gif',status:"维保",color:"#B10DC9",data:"55",data2:"0.1",runtime:"1:26",color2:"#B10DC9",task:"暂无任务",typecolor:"#556B2F"}

        ];

        $scope.dataset = [{ data: [], yaxis: 1 },{ data: [], yaxis:1 },{ data: [], yaxis: 1 },{ data: [], yaxis:1 },{ data: [], yaxis:1 }];   
        $scope.dataset2 = [
                { label:"故障",data: [], yaxis: 1,color:"#FF4136" },
                { label:"空闲",data: [], yaxis:1,color:"#CD8500" },
                { label:"维保",data: [], yaxis: 1 ,color:"#B10DC9" },
                { label:"试验中",data: [], yaxis:1,color:"#2ECC40" }
        ];

          for (var i = 0; i <= 24; i += 1) {
            // console.log(i);
              var v1 =  Math.ceil(Math.abs(Math.sin( Math.random(i))*25))
                $scope.dataset2[0].data.push([i, v1]);
                $scope.v1 = v1;
              var v2 = Math.ceil(Math.abs(Math.sin(i+Math.random(1))*25))
                $scope.dataset2[1].data.push([i, v2]);
                $scope.v2 = v2;
              var v3 =  Math.ceil(Math.abs(Math.sin(i+1+Math.random(2))*25))
                $scope.dataset2[2].data.push([i,v3]);
                $scope.v3 = v3;
              var v4 = 100 - v1 -v2 -v3
              //var v4 = Math.abs(Math.sin(i+2+Math.random(3))*25)
                $scope.dataset2[3].data.push([i, v4]);
                $scope.v4 = v4;
          }
          
          var stack = 0,
    			bars = false,
    			lines = true,
    			steps = false;
          
          $scope.options2 = {         
                hoverable:true,
                shadowSize:2,
                grid: {
                  show: true,
                  aboveData: false,
                  borderWidth:1,
                  color: "#FFF",
                  backgroundColor:"#1F1F1F"
                },
               series: {
					        stack: stack,
        					lines: {
				      		  show: lines,
                    lineWidth: 1,
						        fill: true,
                    fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] },
						        steps: steps
					         },
					         bars:{
						          show: bars,
                      lineWidth: 1,
                      fill: true,
						          barWidth: 1
					         }
				        }, 
                yaxis: {
        				    min: 0,
        				    max: 100,
                    font:{size: 13,linewidth: 50,style:"italic",color:"#FFF"}
        			   },
        			  xaxis: {
        				    show: true,
                    min: 0,
                    max: 24,
                    steps:1,
                    font:{size: 13,lineHeight: 15,style:"italic",color:"#FFF"},
                    ticks: [[0, "0"], [2, "2"], [4, "4"], [6, "6"], [8, "8"], [10, "10"], [12, "12"], [14, "14"],[16,"16"],[18, "18"], [20, "20"], [22, "22"],[24,"24"]]
        			   },
                 legend: {
                    show: false,
                    noColumns:50,
                    position: "relative" ,
                    backgroundColor:"#FFF",
                    backgroundOpacity:1.6
                  }
            };

          $scope.options = {
              hoverable:true,
              shadowSize:2,
              grid: {
                show: true,
                aboveData: true,
                borderWidth:0,
                color: "#444444",
                backgroundColor:"#1F1F1F"
              },
              series: {
					       stack: stack,
	          			lines: {
						        show: true,
						        fill: false,
                    fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] },
						        steps: steps
					       },
					       bars: {
						        show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] },
						        barWidth: 0.4
					         }
				        }, 
                yaxis: {
    				        min: 0,
    				        max: 3.51
    			       },
    			       xaxis: {
    				        show: true
    			       },
                 legend: {
                    show: false,
                    noColumns:15,
                    position: "ne" ,
                    backgroundColor:"#FFF",
                    backgroundOpacity:0.6
                  }
              };

        function flash(){
            for (var i=0 ; i < $scope.photos.length; i++ )
            {
                if ($scope.photos[i].status == "故障" )
                {
                 if ($scope.photos[i].color == "#FF4136")
                 {
                  $scope.photos[i].color="#CD0000";
                 }else{
                  $scope.photos[i].color="#FF4136";
                 }
                }
            };
            $scope.$apply(  )
            setTimeout(flash, 100);
        }
        flash();


        function update(){
            $scope.dataset = [
                    { label:"故障",data: [], yaxis: 1 },
                    { label:"空闲",data: [], yaxis: 1 },
                    { label:"维保",data: [], yaxis: 1  },
                    { label:"试验中",data: [], yaxis:1  }
                    ];
            
          for (var i = 0; i < 10; i += 1) {
            // console.log(i);
              var v1 = Math.abs(Math.sin( Math.random(i)))
                $scope.dataset[0].data.push([i, v1]);
              var v2 = Math.abs(Math.sin(i+Math.random(1)))
                $scope.dataset[1].data.push([i, v2]);
              var v3 =  Math.abs(Math.sin(i+1+Math.random(2)))
                $scope.dataset[2].data.push([i,v3]);
              var v4 = Math.abs(Math.sin(i+2+Math.random(3)))
                $scope.dataset[3].data.push([i, v4]);
          }        

           $scope.dataset2 = [
                    { label:"故障",data: [], yaxis: 1,xaxis:1,color:"#FF4136" },
                    { label:"空闲",data: [], yaxis:1,xaxis:1,color:"#CD8500" },
                    { label:"维保",data: [], yaxis: 1 ,xaxis:1,color:"#B10DC9" },
                    { label:"试验中",data: [], yaxis:1,xaxis:1,color:"#2ECC40"  }
                    ];
            
          for (var i = 0; i <= 24; i += 1) {
            // console.log(i);
              var v1 =  Math.ceil(Math.abs(Math.sin( Math.random(i))*25))
                $scope.dataset2[0].data.push([i, v1]);
                $scope.v1 = v1;
              var v2 = Math.ceil(Math.abs(Math.sin(i+Math.random(1))*25))
                $scope.dataset2[1].data.push([i, v2]);
                $scope.v2 = v2;
              var v3 =  Math.ceil(Math.abs(Math.sin(i+1+Math.random(2))*25))
                $scope.dataset2[2].data.push([i,v3]);
                $scope.v3 = v3;
              var v4 = 100 - v1 -v2 -v3
              //var v4 = Math.abs(Math.sin(i+2+Math.random(3))*25)
                $scope.dataset2[3].data.push([i, v4]);
                $scope.v4 = v4;
          }

          $scope.$apply(  )
           // plot.draw()
            //console.log(1);
            for(var j=0 ;j<10; j++){
             $scope.photos[j].data = Math.round(100*Math.random(100));
             $scope.photos[j].data2 = Math.round(100*Math.random(100));
           }
           
          moment.locale('zh');
          $scope.current_time = moment().format('dddd, YYYY-MM-DD, h:mm:ss a');//    "2014-08-27 13:42";
          setTimeout(update, 4000)
      }
      update()
    },
]);
