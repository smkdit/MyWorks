angular.module('PropelApp')
	.controller("AdminTableCtrl", ['$scope', '$http', 'itemService', function($scope, $http, itemService){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$http.get("api/business/newbusiness")
		.success(function(data){
//			alert(JSON.stringify(data));
			$scope.businessList = data;	
			for(var i=0; i< data.length; i++){
				$scope.image = data[i].photo.split("-");
				$scope.businessList[i].dp = $scope.image[0];
				$scope.businessList[i].icon = $scope.image[1];				
			}
			$http.get("api/business/getproducts")
			.success(function(data){
				$scope.products = data;
			});
			$http.get("api/business/getservices")
			.success(function(data){
				$scope.services = data;
			});
			$scope.filteredList = $scope.businessList;
		});
		
		$scope.viewBusiness = function(name, area, city){
			itemService.setItem(name, area, city);
			window.location.href  = "#business";
		}		
		
		$scope.comparatorFunction = function (name, search) {
		    return (''+name).indexOf(''+search) > -1;
		};
		
		$scope.viewSite = function(name, area, city){
			window.location.href = "/propeltree.com/item-detail.html#?companyName=" + name + "&area=" + area + "&city=" + city + "&code=1";
		}
		
		$scope.deleteItem = function(item){
			for(var i=0; i<$scope.businessList.length; i++){
				if($scope.businessList[i].sno == item)
					$scope.deleted = $scope.businessList[i];
			}
			alert("Deleted");
		}
		
		$scope.testing = function(item){
 			$scope.searchText = item; 
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
	
