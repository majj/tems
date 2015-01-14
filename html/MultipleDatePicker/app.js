var app = angular.module("myApp",["multipleDatePicker"]);

app.controller("multipleDatePicker", ["$scope", function($scope){
//  $scope.logInfos = function(time, selected) {
   // alert(moment(time).format('YYYY-M-DD') + ' has been ' + (selected ? '' : 'un') + 'selected');
   //console.log(moment(time));
//   console.log($scope );
//   console.log(selectedDays);
//  }

console.log("ceshi for multipleDate!!");

$scope.get_date= [1418227200000, 1418313600000,1418314000000];

$scope.days = [];

//$scope.month = undefined;
 

$scope.logInfos = function(event, date) {
    event.preventDefault() // prevent the select to happen
    console.log(date.valueOf()) //will give you the timestamp
    
  //  if _.find($scope.days, date.valueOf() ) {
    
   // }else{
    
    $scope.days.push(date.valueOf())
    
   // }
    
    
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
  $scope.selectedDays = [moment().date(4).valueOf(), moment().date(5).valueOf(), moment().date(8).valueOf()];
}]);