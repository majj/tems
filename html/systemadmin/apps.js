
'use strict';
var app = angular.module("sysadminapp", ['multipleDatePicker']);

'use strict';
app.controller("mainctrl", function($scope) {
  //console.log("mainctrl!!!!!!!!!!!!");
});


'use strict';
app.controller("usermanagerctrl", function($scope) {
  var vm = $scope.vm = {};
  var currentrole = $scope.currentrole = {};
  var roleeditenable = false;
  vm.page = {
    size: 10,
    index: 1
  };
//  console.log("ctrl.table.local!!!!!!!!!!!!");

  // 构建模拟数据
  vm.columns = [
    {'label': '用户名','name': 'username','type': 'string'},
    {'label': '部门','name': 'depart','type': 'string'},
    {'label': '职务','name': 'busslevel','type': 'string'},
    {'label': '管理者','name': 'role_manager','type': 'string','sortable': false},
    {'label': '计划员','name': 'role_plan','type': 'string','sortable': false},
    {'label': '作业员','name': 'role_operation','type': 'string','sortable': false},
    {'label': '中心管理员','name': 'role_certadmin','type': 'string','sortable': false},
    {'label': '参观者','name': 'role_guest','type': 'string','sortable': false}
  ];
  // 供页面中使用的函数
  vm.age = function(birthday) {
    return moment().diff(birthday, 'years');
  };

  //random for rolename
  vm.randomString = function(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
  };


  //vm.items = [];
  /*
  vm.items = [
    {'username':'周院长','depart':'研究院','busslevel':'副院长','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'郑主任','depart':'试验中心','busslevel':'主任','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},           
    {'username':'齐主任','depart':'技术支持部','busslevel':'经理','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'来经理','depart':'信息技术部','busslevel':'经理','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'路科长','depart':'信息技术部','busslevel':'科长','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'刘所长','depart':'试验中心','busslevel':'所长','role_manager':true,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'卢显洲','depart':'试验中心','busslevel':'工程师','role_manager':false,'role_plan':false,'role_operation':true,'role_certadmin':false,'role_guest':true},
    {'username':'董玉红','depart':'信息技术部','busslevel':'工程师','role_manager':false,'role_plan':false,'role_operation':false,'role_certadmin':false,'role_guest':true},
    {'username':'路桂婷','depart':'技术支持部','busslevel':'工程师','role_manager':false,'role_plan':false,'role_operation':false,'role_certadmin':true,'role_guest':true}
  ];
*/
  //用户数据模拟，设计为某一个角色拥有哪些用户的数据结构。
  vm.items = [
      {'username':'周院长','depart':'研究院','busslevel':'副院长','privs':[true,true,true,false,true]},
      {'username':'郑主任','depart':'试验中心','busslevel':'主任','privs':[true,true,false,false,true]},           
      {'username':'齐主任','depart':'技术支持部','busslevel':'经理','privs':[true,true,false,false,true]},
      {'username':'来经理','depart':'信息技术部','busslevel':'经理','privs':[true,true,true,false,true]},
      {'username':'路科长','depart':'信息技术部','busslevel':'科长','privs':[true,true,false,false,false]},
      {'username':'刘所长','depart':'试验中心','busslevel':'所长','privs':[true,true,false,false,true]},
      {'username':'卢显洲','depart':'试验中心','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'董玉红','depart':'信息技术部','busslevel':'工程师','privs':[false,false,true,false,true]},
      {'username':'路桂婷','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户01','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户02','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户03','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户04','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户05','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户06','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户07','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户08','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户09','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户10','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户11','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户12','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户13','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户14','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户15','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户16','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户17','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户18','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户19','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户20','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户21','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户22','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户23','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户24','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户25','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户26','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户27','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]},
      {'username':'用户28','depart':'技术支持部','busslevel':'工程师','privs':[true,false,false,true,true]}
  ];

/*
  vm.items = [
    ['role_manager','周院长','郑主任','齐主任','来经理','路科长','刘所长'],
    ['role_plan','刘所长'],
    ['role_operation','卢显洲'],
    ['role_certadmin','董玉红','路桂婷'],
    ['role_guest','周院长','郑主任','齐主任','来经理','路科长','刘所长','路桂婷','董玉红','卢显洲']
    ];
*/
  //用户角色定义
    vm.roledefin = {
    'prv001':'系统登录',
    'prv002':'大屏幕实时看板查看',
    'prv003':'实时仪表盘查看',
    'prv004':'历史KPI年图查看',
    'prv005':'任务排产周计划导入',
    'prv006':'任务排产环境试验室查看',
    'prv007':'任务排产环境试验室操作',
    'prv008':'任务排产耐久试验室查看',
    'prv009':'任务排产耐久试验室操作',
    'prv010':'任务排产重鼓试验室查看',
    'prv011':'任务排产重鼓试验室操作',
    'prv012':'任务排产高温试验室查看',
    'prv013':'任务排产高温试验室操作',
    'prv014':'任务排产历史任务查看',
    'prv015':'设备状态管理环境试验室查看',
    'prv016':'设备状态管理环境试验室操作',
    'prv017':'设备状态管理耐久试验室查看',
    'prv018':'设备状态管理耐久试验室操作',
    'prv019':'设备状态管理重鼓试验室查看',
    'prv020':'设备状态管理重鼓试验室操作',
    'prv021':'设备状态管理高温试验室查看',
    'prv022':'设备状态管理高温试验室操作',
    'prv023':'统计报表设备工时统计查看',
    'prv024':'统计报表设备工时统计操作',
    'prv025':'统计报表月度统计报表查看',
    'prv026':'统计报表月度统计报表操作',
    'prv027':'统计报表年度统计报表查看',
    'prv028':'统计报表年度统计报表操作',
    'prv029':'统计报表Excel下载',
    'prv030':'系统管理用户权限管理查看',
    'prv031':'系统管理用户权限管理操作',
    'prv032':'系统管理KPI设置界面查看',
    'prv033':'系统管理KPI设置界面操作',
    'prv034':'系统管理系统配置管理查看',
    'prv035':'系统管理系统配置管理操作',
    'prv036':'系统管理操作员日志查看'
    };

  //用户角色分配数据
    vm.roleitems = [
    {'rolename':'管理者','roleid':'rmanager','prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}},
    {'rolename':'计划员','roleid':'rplane','prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}},
    {'rolename':'作业员','roleid':'roperation','prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}},
    {'rolename':'中心管理员','roleid':'rcenteradmin','prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}},
    {'rolename':'参观者','roleid':'rguest','prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}},
    ];

    //currentrole = "";
    $scope.editrole = function(rolevol) {
      if (rolevol.sortable !== false){
          $scope.roleeditenable = false;
          return;
        };
        for ( var i=0; i < vm.roleitems.length ; i++)
        {
          if (rolevol.label == vm.roleitems[i].rolename){
            $scope.currentrole = vm.roleitems[i];
            $scope.roleeditenable = true;
          }
        }
    };

    $scope.addrole = function() {
//        console.log("add role.................");
        $scope.currentrole = {'rolename':'','roleid':'newrole','prvitem':{'prv001':false,'prv002':false,'prv003':false,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':false,'prv009':false,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':false,'prv015':false,'prv016':false,'prv017':false,'prv018':false,'prv019':false,'prv020':false,'prv021':false,'prv022':false,'prv023':false,'prv024':false,'prv025':false,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':false,'prv031':false,'prv032':false,'prv033':false,'prv034':false,'prv035':false,'prv036':false}};
        $scope.roleeditenable = true;
    };

    //refresh role view
    $scope.refreshrole = function(labelname) {
        var newroleid = vm.randomString(10);
        var newrole = {'label': labelname ,'name': 'newrole','type': 'string','sortable': false};
        var newroleitem = {'rolename':labelname,'roleid':newroleid,'prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}};
        setTimeout(function () {  
          $scope.$apply(function () {
          vm.columns.push(newrole);
          vm.roleitems.push(newroleitem);
          for (var i = 0; i < vm.items.length ; i++) {
              vm.items[i].privs.push(false);
              console.log('vm.items[i].privs is :'+ vm.items[i].privs);
      　　}
//        alert('labno is:' + $scope.labno);
          });  
        }, 200); 
    };

    //
    vm.deletevol = function(labelname) {
    if (confirm('确认要删除?')) {
        $scope.roleeditenable=false;
        for (var i=0; i< vm.columns.length;i++) {
          if (vm.columns[i].label == labelname) {
              vm.columns.splice(i,1);
              vm.roleitems.splice(i-3,1);
              for (var j=0;j<vm.items.length;j++){
                vm.items[j].privs.splice(i-3,1);
              };
          return;
          };
        };
      };
    };

    //refresh role view
    // splice()
    $scope.deleterole = function(labelname) {
        var newroleid = vm.randomString(10);
        var newrole = {'label': labelname ,'name': 'newrole','type': 'string','sortable': false};
        var newroleitem = {'rolename':labelname,'roleid':newroleid,'prvitem':{'prv001':true,'prv002':true,'prv003':true,'prv004':false,'prv005':false,'prv006':false,'prv007':false,'prv008':true,'prv009':true,'prv010':false,'prv011':false,'prv012':false,'prv013':false,'prv014':true,'prv015':false,'prv016':false,'prv017':false,'prv018':true,'prv019':true,'prv020':false,'prv021':false,'prv022':true,'prv023':true,'prv024':false,'prv025':true,'prv026':false,'prv027':false,'prv028':false,'prv029':false,'prv030':true,'prv031':false,'prv032':true,'prv033':false,'prv034':true,'prv035':true,'prv036':false}};
        setTimeout(function () {  
          $scope.$apply(function () {
            vm.deletevol(labelname);
//        alert('labno is:' + $scope.labno);
          });  
        }, 200); 
    };

    //
    vm.sort = {
      column: 'id',
      direction: -1,
      toggle: function(column) {
        if (column.sortable === false){
          return;
        }

        if (this.column === column.name) {
          this.direction = -this.direction || -1;
        } else {
          this.column = column.name;
          this.direction = -1;
        }
      }
    };
});

//
// KPI与报表设置
'use strict';
app.controller("kpireprotctrl", function($scope) {
  var vm = $scope.vm = {};
  vm.labinfo = [{'lab1':'环境试验室','equiment':{'eqm001':'高低温环境舱','eqm002':'高低温转鼓','eqm003':'排放分析仪','eqm004':'常温间转鼓'}},{'lab2':'耐久试验室','equiment':{'eqm005':'耐久转鼓#1','eqm006':'耐久转鼓#2','eqm007':'耐久转鼓#3'}},{'lab3':'性能试验室','equiment':{'eqm008':'重型转鼓'}},{'lab4':'高温四驱试验室','equiment':{'eqm009':'高温四驱环境舱','eqm010':'高温四驱转鼓'}}];

  // 构建模拟数据
  vm.eqmdate = {
    'eqm001':['99','90','85','99','90','85'],
    'eqm002':['99','90','85','99','90','85'],
    'eqm003':['99','90','85','99','90','85'],
    'eqm004':['99','90','85','99','90','85'],
    'eqm005':['99','90','85','99','90','85'],
    'eqm006':['99','90','85','99','90','85'],
    'eqm007':['99','90','85','99','90','85'],
    'eqm008':['99','90','85','99','90','85'],
    'eqm009':['99','90','85','99','90','85'],
    'eqm010':['99','90','85','99','90','85']
  };

    vm.labdate = {
    'lab1':['99','90','85','99','90','85'],
    'lab2':['99','90','85','99','90','85'],
    'lab3':['99','90','85','99','90','85'],
    'lab4':['99','90','85','99','90','85']
  };
});

//
//通用过滤器及排序工具
'use strict';
app.filter('paging', function() {
  return function (items, index, pageSize) {
    if (!items)
      return [];

    var offset = (index - 1) * pageSize;
    return items.slice(offset, offset + pageSize);
  }
});

'use strict';
app.filter('orderClass', function() {
  return function (direction) {
    if (direction === -1)
      return "glyphicon-chevron-down";
    else
      return "glyphicon-chevron-up";
  }
});

'use strict';
app.filter('size', function() {
  return function (items) {
    if (!items)
      return 0;
    return items.length || 0
  }
});



'use strict';
//var app = angular.module("sysadminapp", ["multipleDatePicker"]);
app.controller("multipleDatePicker", ["$scope", function($scope){
//  $scope.logInfos = function(time, selected) {
   // alert(moment(time).format('YYYY-M-DD') + ' has been ' + (selected ? '' : 'un') + 'selected');
   //console.log(moment(time));
//   console.log($scope );
//   console.log(selectedDays);
//  }

$scope.get_date= [1418227200000, 1418313600000,1418314000000];
$scope.days = [];
$scope.month = [];

//$scope.month = undefined;

$scope.logInfos = function(event, date) {
    event.preventDefault() // prevent the select to happen
//    console.log(date.valueOf()) //will give you the timestamp
//    moment().toJSON();
//    console.log("----------------" + moment('2014-12-30').toJSON());
  //  if _.find($scope.days, date.valueOf() ) {
   // }else{
    $scope.selectedDays.push
    $scope.days.push(date.valueOf())  
   //}
  
    console.log(moment($scope.month))
    console.log($scope.convertedDaysSelected)
    console.log($scope.days)
    //reproduce the standard behavior
    date.selected = !date.selected
}

  $scope.doDate = function(event, date){
    if(event.type == 'click') {
      alert(moment(date).format('YYYY-M-DD') + ' has been ' + (date.selected ? 'un' : '') + 'selected');
    } else {
      console.log(moment(date) + ' has been ' + event.type + 'ed')
    }
  };

  $scope.oneDayOff = [moment().date(14).valueOf()];
  //$scope.selectedDays = [moment().date(4).valueOf(), moment().date(5).valueOf(), moment().date(8).valueOf()];
  $scope.selectedDays=[];

  var startdate="2015-01-01";
  for (var i=0;i<365*5;i++)
  {
    if(moment(startdate).add(i, 'day').isoWeekday()==6 || moment(startdate).add(i, 'day').isoWeekday()==7)
    $scope.selectedDays.push(moment(startdate).add(i, 'day').valueOf());
  }

}]);


'use strict';
app.controller("operationctrl", function($scope) {
  var vm = $scope.vm = {};
  vm.page = {
    size: 10,
    index: 1
  };
//  console.log("ctrl.table.local!!!!!!!!!!!!");
  vm.sort = {
    column: 'id',
    direction: -1,
    toggle: function(column) {
      if (column.sortable === false)
        return;

      if (this.column === column.name) {
        this.direction = -this.direction || -1;
      } else {
        this.column = column.name;
        this.direction = -1;
      }
    }
  };
  // 构建模拟数据
  vm.columns = [
    {'label': '登录日期','name': 'logindate','type': 'string'},
    {'label': '登出日期','name': 'logoutdate','type': 'string'},
    {'label': '登录用户名','name': 'loginname','type': 'string'},
    {'label': '操作模块','name': 'opermodule','type': 'string'},
    {'label': '操作详细信息','name': 'operdetail','type': 'string','sortable': false}
  ];
  // 供页面中使用的函数
  vm.age = function(birthday) {
    return moment().diff(birthday, 'years');
  };

  //vm.items = [];
  vm.logitems = [
    {'logindate':'2014-12-30 10:15:00','logoutdate':'2014-12-30 14:45:00','loginname':'刘刚','opermodule':'登录','operdetail':'无操作'},
    {'logindate':'2014-12-30 10:23:00','logoutdate':'2014-12-30 12:23:00','loginname':'马建军','opermodule':'登录','operdetail':'无操作'},
    {'logindate':'2014-12-30 11:20:00','logoutdate':'2014-12-30 13:36:00','loginname':'卢渊洲','opermodule':'设备状态修改','operdetail':'耐久试验室 转鼓#1 由维保状态 修改为 试验中状态'},
    {'logindate':'2014-12-30 12:03:05','logoutdate':'2014-12-30 13:21:00','loginname':'董玉红','opermodule':'系统管理','operdetail':'操作员日志查看'},
    {'logindate':'2014-12-30 12:15:30','logoutdate':'2014-12-30 13:36:00','loginname':'刘波','opermodule':'系统管理','operdetail':'操作员日志查看'},
    {'logindate':'2014-12-30 12:33:50','logoutdate':'2014-12-30 14:26:00','loginname':'路桂婷','opermodule':'系统管理','operdetail':'系统管理用户权限管理 增加角色 参观者'},
    {'logindate':'2014-12-30 12:45:00','logoutdate':'2014-12-30 15:18:00','loginname':'于伟','opermodule':'实时仪表板','operdetail':'无操作'},
    {'logindate':'2014-12-30 12:59:00','logoutdate':'2014-12-30 15:39:00','loginname':'周院长','opermodule':'大屏幕看板','operdetail':'无操作'},
    {'logindate':'2014-12-30 14:05:00','logoutdate':'2014-12-30 16:43:00','loginname':'郑主任','opermodule':'大屏幕看板','operdetail':'无操作'},
    {'logindate':'2014-12-30 14:15:00','logoutdate':'2014-12-30 16:27:00','loginname':'赵栋','opermodule':'实时仪表板','operdetail':'无操作'},
    {'logindate':'2014-12-30 15:15:00','logoutdate':'2014-12-30 16:36:00','loginname':'张越','opermodule':'任务排产','operdetail':'任务排产 耐久试验室 当日任务'},
    {'logindate':'2014-12-30 15:45:30','logoutdate':'2014-12-30 17:26:00','loginname':'齐主任','opermodule':'大屏幕看板','operdetail':'无操作'},
    {'logindate':'2014-12-30 16:05:46','logoutdate':'2014-12-30 17:42:00','loginname':'路科','opermodule':'大屏幕看板','operdetail':'无操作'},
    {'logindate':'2014-12-30 16:36:19','logoutdate':'2014-12-30 18:14:00','loginname':'李计划','opermodule':'任务排产','operdetail':'任务排产 周计划导入'},
    {'logindate':'2014-12-30 17:12:18','logoutdate':'2014-12-30 18:53:00','loginname':'操作员甲','opermodule':'设备状态修改','operdetail':'环境试验室高低温转鼓由 维保 状态修改为 故障状态'},
    {'logindate':'2014-12-30 18:39:10','logoutdate':'2014-12-30 19:53:00','loginname':'刘刚','opermodule':'任务排产','operdetail':'无操作'},
    {'logindate':'2014-12-31 08:00:30','logoutdate':'2014-12-31 12:43:00','loginname':'卢渊洲','opermodule':'设备状态修改','operdetail':'耐久试验室转鼓#2 转鼓由 故障 状态修改为 空闲状态'},
    {'logindate':'2014-12-31 08:21:21','logoutdate':'2014-12-31 12:35:00','loginname':'刘波','opermodule':'任务排产','operdetail':'无操作'},
    {'logindate':'2014-12-31 10:15:00','logoutdate':'2014-12-31 12:36:00','loginname':'董玉红','opermodule':'实时仪表板','operdetail':'无操作'},
    {'logindate':'2014-12-31 11:23:00','logoutdate':'2014-12-31 12:27:00','loginname':'路桂婷','opermodule':'系统管理','operdetail':'系操作员日志查看'},
    {'logindate':'2014-12-31 12:39:00','logoutdate':'2014-12-31 12:47:00','loginname':'操作员乙','opermodule':'设备状态修改','operdetail':'重鼓转鼓试验室重鼓由 试验中 状态修改为 维保 状态'},
    {'logindate':'2014-12-31 12:45:00','logoutdate':'2014-12-31 12:55:00','loginname':'参观者甲','opermodule':'大屏幕看板','operdetail':'无操作'}
  ];
});
