//uglifyjs ReportsApp.js -b  --comments all > ReportsApp3.js
angular.module("ReportsApp", [ "ui.bootstrap", "angular-flot", "ngHandsontable" ]).controller("ReportsCtrl", [ "$scope", "$http", function($scope, $http) {
    // sheet 1
    var room = [ "重鼓试验室", "室内性能试验室", "室内性能试验室", "环境试验室", "环境试验室", "环境试验室", "耐久试验室" ];
    var equipments = [ "耐久转鼓#", "耐久转鼓#", "耐久转鼓#", "环境高低温舱 \n环境高低温转鼓 \n环境排放分析仪 ", "环境常温转鼓\n环境排放分析仪 ", "四驱高温间环境舱\n四驱高温转鼓", "重型转鼓" ];
    var equipmentNos = [ "640000-00046", "640000-00045", "640000-00093", "640000-00089\n640000-00090\n640000-00092", "640000-00094\n640000-00092", "", "640000-00096" ];
    var planWorkTime = [ 8, 12, 13, 4, 5, 6, 7 ];
    var realWorkTime = [ 10, 8, 7, 4, 5, 6, 7 ];
    var downtime = [ 1, 0, 0, 0, 0, 0, 1 ];
    var sum = 0;
    for (var i = 0; i < planWorkTime.length; i++) {
        sum += realWorkTime[i] / planWorkTime[i];
    }
    $scope.average = (100 * sum / planWorkTime.length).toFixed(2);
    /*
    var monthlyKPI10 = [ 1.1957, 1.3424, .9239, .9348, .8967, 1.0283 ];
    var monthlyKPI11 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI20 = [ 1, 1.1813, .7639, .9348, .75, .8907 ];
    var monthlyKPI21 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI30 = [ 1.8261, 1.337, .9239, .913, .8696, 1.113 ];
    var monthlyKPI31 = [ 1, 1, 1, 1, 1, .8571 ];
    var monthlyKPI40 = [ 1.5, 1.6875, .9659, .9545, .9091, .786 ];
    var monthlyKPI41 = [ 1, 1, 1, 1, 1, .8667 ];
    var monthlyKPI50 = [ 1.3636, 1.3239, .9545, .9773, .9375, .7466 ];
    var monthlyKPI51 = [ 1, 1, 1, 1, 1, .8667 ];
    var monthlyKPI60 = [ 1.5682, 1.3381, .9659, .9545, .9091, .7343 ];
    var monthlyKPI61 = [ 1, 1, 1, 1, 1, .8667 ];
    var monthlyKPI70 = [ 1.125, 1.1927, 1.1458, 1.0938, .9479, .8007 ];
    var monthlyKPI71 = [ 1, 1, 1, 1, 1, .9444 ];
    var monthlyKPI80 = [ .7727, 1.1307, .9659, .9545, .9091, .808 ];
    var monthlyKPI81 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI90 = [ .9583, 1.0104, .8646, .8542, .7917, .7424 ];
    var monthlyKPI91 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI100 = [ .9286, .8929, .9048, .8929, .8333, .7286 ];
    var monthlyKPI101 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI110 = [ .9886, .983, .8977, .8864, .8182, .7269 ];
    var monthlyKPI111 = [ 1, 1, 1, 1, 1, 1 ];
    var monthlyKPI120 = [ .9886, .983, .8977, .8864, .8182, .7269 ];
    var monthlyKPI121 = [ 1, 1, 1, 1, 1, 1 ];
    */
    // sheet 2              
    // sheet 3
    //$scope.realWorkTime = Math.floor(Math.random() * 100000) / 100
    $scope.year = 2014;
    $scope.month = 12;
    $scope.minSpareRows = 1;
    $scope.colHeaders = true;
    $scope.db = {};
    $scope.db.items = [];
    // flot  dataset
    $scope.dataset = [ {
        data: [],
        yaxis: 1,
        label: "计划"
    }, {
        data: [],
        yaxis: 1,
        label: "实报"
    } ];
    $scope.dataset2 = [ {
        data: [],
        yaxis: 1,
        label: "计划"
    }, {
        data: [],
        yaxis: 1,
        label: "实报"
    }, {
        data: [],
        yaxis: 2,
        label: "利用率"
    } ];
    // dataset 3
    $scope.dataset3 = [ {
        data: [],
        yaxis: 1,
        label: "耐久1#"
    }, {
        data: [],
        yaxis: 1,
        label: "耐久2#"
    }, {
        data: [],
        yaxis: 1,
        label: "耐久3#"
    } ];
    // flot options
    $scope.options = {
        hoverable: true,
        shadowSize: 2,
        grid: {
            hoverable: true,
            show: true,
            aboveData: true,
            borderWidth: 1,
            color: "#ccc"
        },
        series: {
            bars: {
                show: true,
                barWidth: .3,
                align: "center"
            }
        },
        yaxis: {
            min: 0,
            max: 16,
            position: "right"
        },
        xaxis: {
            show: true,
            min: 1,
            max: 12
        },
        legend: {
            show: true,
            noColumns: 5,
            position: "ne",
            backgroundColor: "#FFF",
            backgroundOpacity: .6
        }
    };
    // End of flot options
    for (var i = 1; i < 8; i += 1) {
        $scope.dataset[0].data.push([ i, planWorkTime[i - 1] ]);
        $scope.dataset[1].data.push([ i + .3, realWorkTime[i - 1] ]);
    }
    var utilization = [ 1.25, .6666666666666666, .5384615384615384, 1, 1, 1, 1 ];
    /*
    for (var i = 1; i < 8; i += 1) {
        $scope.dataset2[0].data.push([ i, planWorkTime[i - 1] ]);
        $scope.dataset2[1].data.push([ i + .3, realWorkTime[i - 1] ]);
        $scope.dataset2[2].data.push([ i, utilization[i] ]);
    }
    console.log( '$scope.dataset2');
    console.log(JSON.stringify( $scope.dataset2));
    */
    for (var i = 1; i < 13; i += 1) {
        $scope.dataset3[0].data.push([ i, 5 + Math.sin(3 * i) ]);
        $scope.dataset3[1].data.push([ i, 4 + Math.cos(i * 2) ]);
        $scope.dataset3[2].data.push([ i, 2 + i / 2 + Math.cos(i * 3) ]);
    }
    /*
    for (var i = 0; i < 7; i++) {
        $scope.db.items.push({
            id: i + 1,
            room: room[i],
            equipments: equipments[i],
            equipmentNos: equipmentNos[i],
            equipmentType: "检测系统",
            planWorkTime: planWorkTime[i],
            realWorkTime: realWorkTime[i],
            utilRate: realWorkTime[i] / planWorkTime[i],
            //.toFixed(2) 
            downtime: downtime[i],
            operation1: monthlyKPI10[i] || 0,
            perfectness1: monthlyKPI11[i] || 0,
            operation2: monthlyKPI20[i] || 0,
            perfectness2: monthlyKPI21[i] || 0,
            operation3: monthlyKPI30[i] || 0,
            perfectness3: monthlyKPI31[i] || 0,
            operation4: monthlyKPI40[i] || 0,
            perfectness4: monthlyKPI41[i] || 0,
            operation5: monthlyKPI50[i] || 0,
            perfectness5: monthlyKPI51[i] || 0,
            operation6: monthlyKPI60[i] || 0,
            perfectness6: monthlyKPI61[i] || 0,
            operation7: monthlyKPI70[i] || 0,
            perfectness7: monthlyKPI71[i] || 0,
            operation8: monthlyKPI80[i] || 0,
            perfectness8: monthlyKPI81[i] || 0,
            operation9: monthlyKPI90[i] || 0,
            perfectness9: monthlyKPI91[i] || 0,
            operation10: monthlyKPI100[i] || 0,
            perfectness10: monthlyKPI101[i] || 0,
            operation11: monthlyKPI110[i] || 0,
            perfectness11: monthlyKPI111[i] || 0,
            operation12: monthlyKPI120[i] || 0,
            perfectness12: monthlyKPI121[i] || 0,
            note: ""
        });
    }
    */
    //
    function transform(item) {
        // do something expensive
        return item;
    }
    $http.get("app/js/data.json").success(function(data, status) {
        console.log(data);
        //  $scope.db.items = data;//.map(transform);
        for (var i = 0; i < 7; i++) {
            $scope.db.items.push(data[i]);
        }
        var items = [ {
            data: [ [ 1, 8 ], [ 2, 12 ], [ 3, 13 ], [ 4, 4 ], [ 5, 5 ], [ 6, 6 ], [ 7, 7 ] ],
            yaxis: 1,
            label: "计划"
        }, {
            data: [ [ 1.3, 10 ], [ 2.3, 8 ], [ 3.3, 7 ], [ 4.3, 4 ], [ 5.3, 5 ], [ 6.3, 6 ], [ 7.3, 7 ] ],
            yaxis: 1,
            label: "实报"
        }, {
            data: [ [ 1, .6666666666666666 ], [ 2, .5384615384615384 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 7, null ] ],
            yaxis: 2,
            label: "利用率"
        } ];
    }).error(function(data, status) {
        elog("Error", data);
        elog(status);
    });
    // console.log(JSON.stringify($scope.db.items));
    // grid
    $scope.db.dynamicColumns = [ {
        data: "id",
        title: "ID",
        width: 30,
        readOnly: true
    }, {
        data: "room",
        title: "检测试验单位",
        width: 120,
        readOnly: true
    }, {
        data: "equipments",
        title: "设备仪器名称",
        width: 150,
        readOnly: true
    }, {
        data: "equipmentNos",
        title: "资源编号",
        width: 150,
        readOnly: true
    }, {
        data: "planWorkTime",
        title: "计划工时（小时）",
        width: 100,
        readOnly: true
    }, {
        data: "realWorkTime",
        title: "实报工时（小时）",
        type: "numeric",
        width: 100,
        readOnly: true
    } ];
    // End of grid defination
    // grid
    $scope.db.dynamicColumns2 = [ {
        data: "id",
        title: "ID",
        width: 30,
        readOnly: true
    }, {
        data: "room",
        title: "检测试验单位",
        width: 120,
        readOnly: true
    }, {
        data: "equipments",
        title: "设备仪器名称",
        width: 150,
        readOnly: true
    }, {
        data: "equipmentNos",
        title: "资产编号<br/>Resources No",
        width: 150,
        readOnly: true
    }, {
        data: "equipmentType",
        title: "类别",
        width: 100,
        readOnly: true
    }, {
        data: "planWorkTime",
        title: "计划工时（小时）",
        width: 100,
        readOnly: true
    }, {
        data: "realWorkTime",
        title: "实报工时（小时）",
        type: "numeric",
        width: 100,
        readOnly: true
    }, {
        data: "utilRate",
        title: "设备利用率(%)",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "downtime",
        title: "停工时间<br/>(小时)",
        type: "numeric",
        //format: '0.00%',
        width: 100,
        readOnly: true
    }, {
        data: "note",
        title: "备注",
        //format: '0.00%',
        width: 100,
        readOnly: false
    } ];
    // End of grid defination                    
    // grid
    $scope.db.dynamicColumns3 = [ {
        data: "id",
        title: "ID",
        width: 30,
        readOnly: true
    }, {
        data: "room",
        title: "试验室名称",
        width: 120,
        readOnly: true
    }, {
        data: "equipments",
        title: "主要仪器设备名称",
        width: 150,
        readOnly: true
    }, {
        data: "equipmentNos",
        title: "资产编号<br/>Resources No",
        width: 150,
        readOnly: true
    }, {
        data: "equipmentType",
        title: "类别",
        width: 100,
        readOnly: true
    }, {
        data: "planWorkTime",
        title: "计划工时（小时）",
        width: 100,
        readOnly: true
    }, {
        data: "realWorkTime",
        title: "实报工时（小时）",
        type: "numeric",
        width: 100,
        readOnly: true
    }, {
        data: "utilRate",
        title: "设备利用率(%)",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "downtime",
        title: "停工时间<br/>(小时)",
        type: "numeric",
        //format: '0.00%',
        width: 100,
        readOnly: true
    }, {
        data: "operation1",
        title: "1月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness1",
        title: "1月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation2",
        title: "2月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness2",
        title: "2月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation3",
        title: "3月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness3",
        title: "3月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation4",
        title: "4月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness4",
        title: "4月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation5",
        title: "5月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness5",
        title: "5月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation6",
        title: "6月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness6",
        title: "6月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation7",
        title: "7月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness7",
        title: "7月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation8",
        title: "8月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness8",
        title: "8月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation9",
        title: "9月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness9",
        title: "9月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation10",
        title: "10月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness10",
        title: "10月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation11",
        title: "11月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness11",
        title: "11月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "operation12",
        title: "12月<br/>运转率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "perfectness12",
        title: "12月<br/>完好率",
        type: "numeric",
        format: "0.00%",
        width: 100,
        readOnly: true
    }, {
        data: "note",
        title: "备注",
        //format: '0.00%',
        width: 100,
        readOnly: false
    } ];
    // End of grid defination                          
    //flot options
    $scope.options3 = {
        hoverable: true,
        shadowSize: 2,
        grid: {
            show: true,
            aboveData: true,
            borderWidth: 0,
            color: "#444444"
        },
        yaxis: {
            min: 0,
            max: 13.51
        },
        xaxis: {
            show: true
        },
        legend: {
            show: true,
            noColumns: 5,
            position: "ne",
            backgroundColor: "#FFF",
            backgroundOpacity: .6
        }
    };
} ]);