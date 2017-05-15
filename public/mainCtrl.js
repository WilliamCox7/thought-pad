angular.module('thought').controller('mainCtrl', function($scope, mainSvc) {

  (() => {
    mainSvc.getLiners().then((liners) => {
      var editDate = new Date(new Date().setDate(new Date().getDate() - 3));
      liners.forEach((liner) => {
        if (new Date(liner.date) > editDate) {
          liner.canEdit = true;
        } else {
          liner.canEdit = false;
        }
      });
      $scope.log = liners;
    });
  })();

  $scope.toggleDate = function($event) {
    var status = $($event.target.nextElementSibling).css('display');
    if (status === 'none') {
      $($event.target.nextElementSibling).css('display', 'block');
    } else {
      $($event.target.nextElementSibling).css('display', 'none');
    }
  }

  $scope.addLiner = function(liner) {
    if (liner) {
      $scope.log.push({liner: liner, date: new Date(), canEdit: true});
      mainSvc.setLiner({liner: liner, date: new Date()}).then((message) => {});
      $scope.liner = "";
    }
  }

  $scope.editLiner = function(liner) {
    $scope.log.forEach((item, i) => {
      if (item.liner === liner) {
        $scope.log.splice(i, 1);
      }
    });
    $scope.liner = liner;
    mainSvc.deleteLiner(liner).then((message) => {});
  }

});
