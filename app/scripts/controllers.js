'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.dishes = {};
        
        menuFactory.getDishes().then(
            function (response) {
                $scope.dishes=response.data;
                $scope.shiwDish=true;
            }
        );

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {$scope.filtText = "appetizer";}
            else if (setTab === 3) {$scope.filtText = "mains";}
            else if (setTab === 4) {$scope.filtText = "dessert";}
            else {$scope.filtText = "";}
        };

        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        var id = parseInt($stateParams.id,10);
        $scope.dish = {};
        menuFactory.getDish(id)
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                }
            );

    }])

    .controller('DishCommentController', ['$scope', function($scope) {
        $scope.newComment = { rating:5, author:"", comment:"", date:"" };

        $scope.submitComment = function() {
            $scope.newComment.date = new Date().toISOString();
            $scope.newComment.rating = parseInt($scope.newComment.rating);
            $scope.dish.comments.push($scope.newComment);
            $scope.commentForm.$setPristine();
            $scope.newComment = { rating:5, author:"", comment:"", date:"" };
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        //var dish=menuFactory.getDish(parseInt($stateParams.id,10));
        $scope.featDish = {};
        menuFactory.getDish(parseInt(0,10))
            .then(function (response) {
                $scope.featDish=response.data;
                $scope.showDish = true;
            });

        $scope.featPromo = menuFactory.getPromotion(0);
        $scope.execChef = corporateFactory.getLeader(3);


    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
    }])
;