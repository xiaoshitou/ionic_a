angular.module('starter.controllers',[])
    .controller('ToDoListCtrl',function($scope, $http){
        $scope.items = [1,2,3];
        $scope.items =[1,2,3,4];
        $scope.shouldShowDelete =true;
        $scope.shouldShowReorder =false;
        $scope.listCanSwipe =true;

        $scope.share = function (item) {
            alert(item);
        }
        $scope.edit = function (item) {
            prompt(item);
        }
        $scope.doRefresh = function (){
            $http.get('/new-items')
                .success(function(newItems) {
                    $scope.items = newItems;
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });

        }
    })
    .controller('LoadingCtrl', function($scope, $ionicLoading) {
        $scope.show = function() {
            $ionicLoading.show({
                template: 'Loading...',
                duration:100
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };
    })
    .controller('MyController', function($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            console.log('hide modal');
        });

        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            console.log('remove modal');
        });
    });
