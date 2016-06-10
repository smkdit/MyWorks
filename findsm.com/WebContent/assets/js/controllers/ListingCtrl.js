angular.module('PropelApp')
	.controller("ListingCtrl", ['$scope', '$http', '$location', 'searchService', 'itemService', function($scope, $http, $location, searchService, itemService){
		myID.style.display = "";
		document.getElementById("page-canvas").style.display = "none";
		$scope.searchOpen = false;
		$scope.queryString = searchService.getSearch();
		document.getElementById("suggestions1").className = "hide";
//		$scope.queryString = $location.search().searchText;
		$scope.noResult = false;
		$scope.phno = false;
		$scope.email = false;
		$scope.website = false;
		$http.get("api/business/search?sub_category="+$scope.queryString)
		.success(function(data) {
			if(data.length == 0)
				$scope.noResult = true;
			else{
				for(var i=0; i < data.length; i++){
					var images = data[i].photo.split("-");
					data[i].dp = images[0];
				}
			}
			$scope.searchResults = data;
			$scope.filteredResults = $scope.searchResults;
		});
		
		$scope.itemDetail = function(item){
			itemService.setItem(item.business_name, item.area, item.city);
			window.location.href = "#item";
//			window.location.href = "/propeltree.com/item-detail.html#?companyName=" + item.business_name + "&area=" + item.area + "&city=" + item.city + "&code=0";
		};
		
		$http.get("api/business/subcategory")
 		.success(function(data){
 			$scope.sub1 = [];$scope.sub2 = [];$scope.sub3 = [];$scope.sub4 = [];$scope.sub5 = [];$scope.sub6 = [];$scope.sub7 = [];
 			$scope.sub8 = [];$scope.sub9 = [];$scope.sub10 = [];
 			for(var i=0; i<data.length; i++){
 				if(data[i].category == "Arts and Entertainment")
 					$scope.sub1.push(data[i]);
 				if(data[i].category == "Automotive")
 					$scope.sub2.push(data[i]);
 				if(data[i].category == "Business and Professional Services")
 					$scope.sub3.push(data[i]);
 				if(data[i].category == "Construction and Contractors")
 					$scope.sub4.push(data[i]);
 				if(data[i].category == "Clothing and Accessories")
 					$scope.sub5.push(data[i]);
 				if(data[i].category == "Education")
 					$scope.sub6.push(data[i]);
 				if(data[i].category == "Food and Dining")
 					$scope.sub7.push(data[i]);
 				if(data[i].category == "Home and Garden")
 					$scope.sub8.push(data[i]);
 				if(data[i].category == "Health and Medicine")
 					$scope.sub9.push(data[i]);
 				if(data[i].category == "Industry and Agriculture")
 					$scope.sub10.push(data[i]);
 			}
 		})
		
 		$scope.categorySearch = function(category){
 			window.location.href = "listing-list.html#/?searchText=" + category;
 			window.location.reload();
 		}
 		
		$scope.cityFilterForTab = function(){
			$scope.cityChecked = false;
			$scope.searchResults = [];
			$scope.filterCities = ["Chennai", "Coimbatore", "Madurai", "Trichy"];
			for(var x=0; x<$scope.filterCities.length; x++){
				if(document.getElementById($scope.filterCities[x]).checked){
					$scope.cityChecked = true;
					for(var i=0; i<$scope.filteredResults.length; i++){
						if($scope.filteredResults[i].city == $scope.filterCities[x])
							$scope.searchResults.push($scope.filteredResults[i]);
					}
				}			
			}
			if($scope.cityChecked == false){
				$scope.searchResults = $scope.filteredResults;
			}
		};
		
		$scope.cityFilterForDesktop = function(){
			$scope.cityChecked = false;
			$scope.searchResults = [];
			$scope.filterCities = ["Chennai", "Coimbatore", "Madurai", "Trichy"];
			for(var x=0; x<$scope.filterCities.length; x++){
				if(document.getElementById($scope.filterCities[x]+"1").checked){
					$scope.cityChecked = true;
					for(var i=0; i<$scope.filteredResults.length; i++){
						if($scope.filteredResults[i].city == $scope.filterCities[x])
							$scope.searchResults.push($scope.filteredResults[i]);
					}
				}			
			}
			if($scope.cityChecked == false){
				$scope.searchResults = $scope.filteredResults;
			}
		};
		
		$scope.areaFilterForTab = function(){
			$scope.areaChecked = false;
			$scope.searchResults = [];
			$scope.filterAreas = ["T Nagar", "Nungambakkam", "Kodambakkam", "Vadapalani"];
			for(var x=0; x<$scope.filterAreas.length; x++){
				if(document.getElementById($scope.filterAreas[x]).checked){
					$scope.areaChecked = true;
					for(var i=0; i<$scope.filteredResults.length; i++){
						if(angular.uppercase($scope.filteredResults[i].area) == angular.uppercase($scope.filterAreas[x]))
							$scope.searchResults.push($scope.filteredResults[i]);
					}
				}			
			}
			if($scope.areaChecked == false){
				$scope.searchResults = $scope.filteredResults;
			}
		};
		
		$scope.areaFilterForDesktop = function(){
			$scope.areaChecked = false;
			$scope.searchResults = [];
			$scope.filterAreas = ["T Nagar", "Nungambakkam", "Kodambakkam", "Vadapalani"];
			for(var x=0; x<$scope.filterAreas.length; x++){
				if(document.getElementById($scope.filterAreas[x]+"1").checked){
					$scope.areaChecked = true;
					for(var i=0; i<$scope.filteredResults.length; i++){
						if(angular.uppercase($scope.filteredResults[i].area) == angular.uppercase($scope.filterAreas[x]))
							$scope.searchResults.push($scope.filteredResults[i]);
					}
				}			
			}
			if($scope.areaChecked == false){
				$scope.searchResults = $scope.filteredResults;
			}
		};

		$scope.searchFunc = function(){
 			document.getElementById("suggestions1").className = "show"; 		
		};
 		
 		$scope.testing = function(item){
 			$scope.searchText = item; 
 			document.getElementById("suggestions1").className = "hide";
 		};
 		
 		
 		
 		$scope.search = function(){
 			window.location.href = "/propeltree.com/listing-list.html#/?searchText=" + $scope.searchText;
 			window.location.reload();
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
 	 			for(var i=0; i<$scope.subcategories.length;i++){
 	 				if($scope.subcategories[i].sub_category != "NA"){
 	 					$scope.allDetails.pushIfNotExist($scope.subcategories[i].sub_category, function(e) { 
 	 						return e === $scope.subcategories[i].sub_category; 
 	 					});
 	 				}
 	 			}
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

      