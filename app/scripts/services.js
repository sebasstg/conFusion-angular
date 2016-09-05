'use strict';

angular.module('confusionApp')
	.constant("baseURL","http://localhost:3000/")
	.service('menuFactory',['$resource','baseURL', function($resource,baseURL) {

/*
		this.getDishes = function () {
			return $http.get(baseURL + "dishes");
		};
*/

		this.getDishes = function(){
			return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
		};
		/*
         this.getDish = function(index) {
         return $http.get(baseURL+"dishes/"+index);
         };
         */
        /*
         this.getPromotion = function(index){
         return promotions[index];
         };

         */
		this.getPromotion= function () {
		    console.log("------------------");
			return $resource(baseURL+"promotions/:id",null,{'update':{method:'PUT'}});
		};
	}])

	.factory('corporateFactory', ['$resource','baseURL', function($resource,baseURL) {


		var corpfac = {};

		corpfac.getLeaders=function () {
            return $resource(baseURL+"leadership/:id", null, {'update':{method:'PUT' }});
        };
        return corpfac;

	}])
    .factory('feedbackFactory',['$resource','baseURL', function ($resource,baseURL) {
        var feedFac={};

        feedFac.getFeedbacks=function () {
          return $resource(baseURL+"feedback/:id",null,{'update':{method:'PUT'}});
        };

        return feedFac;

    }])
;