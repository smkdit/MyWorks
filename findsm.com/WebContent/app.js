//angular.module('PropelApp', []);
	var app = angular.module('PropelApp', ['ngRoute', 'ngTagsInput']);
	
	app.service("searchService", function(){
		var searchString;
		this.setSearch = function(string){
			searchString = string;
		}
		this.getSearch = function(){
			return searchString;
		}
	});
	
	app.service("itemService", function(){
		var item = [];
		this.setItem = function(name, area, city){
			item.name = name;
			item.area = area;
			item.city = city;
		}
		this.getItem = function(){
			return item;
		}
	});
	
	app.service("editService", function(){
		var mode = '';
		this.setMode = function(modeParam){
			mode = modeParam;
		}
		
		this.getMode = function(){
			return mode;
		}
	});
	
	app.controller("MainCtrl", ['$scope', '$http', 'searchService', function($scope, $http, searchService){
		
		$scope.home = function(){
			document.getElementById("page-canvas").style.display = "block";
			document.getElementById("page-footer").style.display = "block";
			document.getElementById("sidebar_main").style.display = "block";
			document.getElementById("brown").disabled = false;
			window.location.href = "#";
		}
		
		$scope.testing = function(item){
 			$scope.searchText = item; 
 			document.getElementById("suggestions").className = "hide";
 			document.getElementById("suggestions1").className = "hide";
 		};
 				
 		$scope.search = function(){
// 			window.location.href = "listing-list.html#/?searchText=" + $scope.searchText;
 			searchService.setSearch($scope.searchText);
 			window.location.href = "#list";
 		};
 		
 		Array.prototype.inArray = function(comparer) { 
 		    for(var i=0; i < this.length; i++) { 
 		        if(comparer(this[i])) return true; 
 		    }
 		    return false; 
 		}; 

 		Array.prototype.pushIfNotExist = function(element, comparer) { 
 		    if (!this.inArray(comparer)) {
 		        this.push(element);
 		    }
 		};
 		
 		$scope.keyup = function(key){
// 			alert(key);
 			if(key.length >= 3){
 		 	$http.get("/propeltree.com/api/business/newbusiness")
 	 		.success(function(data){
 	 			$scope.allDetails = [];
 	 			for(var i=0; i<data.length;i++){
 	 				if(data[i].business_name != "NA"){
 	 					$scope.allDetails.pushIfNotExist(data[i].business_name, function(e) { 
 	 						return e === data[i].business_name; 
 	 					});
 	 				}
 	 			}
 	 			$http.get("/propeltree.com/api/business/subcategory")
 	 	 		.success(function(data){
 	 	 			$scope.subcategories = data;
 	 			for(var i=0; i<$scope.subcategories.length;i++){
 	 				if($scope.subcategories[i].sub_category != "NA"){
 	 					$scope.allDetails.pushIfNotExist($scope.subcategories[i].sub_category, function(e) { 
 	 						return e === $scope.subcategories[i].sub_category; 
 	 					});
 	 				}
 	 			}
 	 	 		});
 	 			
 	 			if($scope.suggest)
 	 	 			document.getElementById("suggestions").className = "show";
 	 	 		else
 	 	 			document.getElementById("suggestions1").className = "show";
 	 			
 	 			$scope.complete=function(){
 	 			    $( "#tags" ).autocomplete({
 	 			      source: $scope.allDetails
 	 			    });
 	 			    } 
 			});
 		}
 		}
 		
	}])
	
	app.config(['$routeProvider',
	            function($routeProvider) {
              		$routeProvider.
              			when('/list', {
              				templateUrl: 'listing-list.html',
              				controller: 'ListingCtrl'
              			}).
              			when('/item', {
              				templateUrl: 'item-details.html',
              				controller: 'ItemDetailCtrl'
              			}).
              			when('/admin', {
              				templateUrl: 'admin.html',
              				controller: 'AdminTableCtrl'
              			}).
              			when('/category_data', {
              				templateUrl: 'categorydata.html',
              				controller: 'SubCategoryCtrl'
              			}).
              			when('/category_queue', {
              				templateUrl: 'categoryqueue.html',
              				controller: 'SubCategoryQueueCtrl'
              			}).
              			when('/product_data', {
              				templateUrl: 'productdata.html',
              				controller: 'ProductDataCtrl'
              			}).
              			when('/product_queue', {
              				templateUrl: 'productqueue.html',
              				controller: 'ProductQueueCtrl'
              			}).
              			when('/service_data', {
              				templateUrl: 'servicedata.html',
              				controller: 'ServiceDataCtrl'
              			}).
              			when('/service_queue', {
              				templateUrl: 'servicequeue.html',
              				controller: 'ServiceQueueCtrl'
              			}).
              			when('/city_area', {
              				templateUrl: 'citydata.html',
              				controller: 'CityDataCtrl'
              			}).
              			when('/city_queue', {
              				templateUrl: 'cityqueue.html',
              				controller: 'CityQueueCtrl'
              			}).
              			when('/user_table', {
              				templateUrl: 'usertable.html',
              				controller: 'UserAccountCtrl'
              			}).
              			when('/addbusiness', {
              				templateUrl: 'addbusiness.html',
              				controller: 'AddBusinessCtrl'
              			}).
              			when('/business', {
              				templateUrl: 'businessdetails.html',
              				controller: 'BusinessCtrl'
              			}).
              			when('/editbusiness', {
              				templateUrl: 'addbusiness.html',
              				controller: 'AddBusinessCtrl'
              			}).
              			otherwise({
              				redirectTo: '/'
              			});
    }]);
