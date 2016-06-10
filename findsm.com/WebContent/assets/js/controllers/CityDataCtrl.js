angular.module('PropelApp')
	.controller("CityDataCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.getCityArea = function(){
			$http.get("api/business/city")
			.success(function(data){
				$scope.cityAreaList = data;
			})
		}
		
		$scope.getCityArea();
		
		$scope.addCityArea = function(){
			$scope.state_name = "";
			$scope.city = "";
			$scope.area = "";
			document.getElementById("modal_overflow").style.display = "block";
		}
		
		$scope.addButton = function(){
			$scope.exist = "";
			for(var i=0; i<$scope.cityAreaList.length; i++){
				if($scope.cityAreaList[i].area == $scope.area)
					$scope.exist = true;
			}
			if($scope.exist == true)
				alert("Area already exist..!!");
			else{
				var data = 
				{
				STATE_NAME : $scope.state_name,
				CITY : $scope.city,
				AREA : $scope.area
				}
				$http.post("api/business/addcityarea", data)
				.success(function(){
					alert("Area added successfully..!!");
					$scope.getCityArea();
				})
				document.getElementById("modal_overflow").style.display = "none";
			}
		}		
		
		$scope.cancel = function(){
			document.getElementById("modal_overflow").style.display = "none";
		}
		
		$scope.testing = function(item){
 			$scope.searchText = item; 
// 			document.getElementById("suggestions").className = "hide";
 			document.getElementById("suggestions1").className = "hide";
 		};
 		
 		$scope.search = function(){
 			window.location.href = "listing-list.html#/?searchText=" + $scope.searchText;
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
 			if(key.length >= 3){
 		 	$http.get("api/business/newbusiness")
 	 		.success(function(data){
 	 			$scope.allDetails = [];
 	 			for(var i=0; i<data.length;i++){
 	 				if(data[i].business_name != "NA"){
 	 					$scope.allDetails.pushIfNotExist(data[i].business_name, function(e) { 
 	 						return e === data[i].business_name; 
 	 					});
 	 				}
 	 			}
 	 			$http.get("api/business/subcategory")
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
	}]);
