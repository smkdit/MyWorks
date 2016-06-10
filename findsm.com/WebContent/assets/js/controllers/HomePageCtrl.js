 angular.module('PropelApp')
 .controller("HomePageCtrl", ['$scope', '$http', 'searchService', function($scope, $http, searchService){
//	 document.getElementById("page-canvas").style.display = "block";
		$scope.searchOpen = false;
		document.getElementById("suggestions").className = "hide";
		document.getElementById("suggestions1").className = "hide";
 		myID = document.getElementById("headerSearch");
 	    myID.style.display = "none";
 	   $scope.suggest = true;
 		function myScrollFunc(){
 			if(window.innerWidth > 767){
 				var y = window.scrollY;
 				if (y >= 290) {
 					$scope.suggest = false;
 					myID.style.display = "";
 				} 
 				else {
 					myID.style.display = "none";
 					$scope.suggest = true;
 				}
 			}
 			else{
 				myID.style.display = "none";
 			}
 		}; 	    
 		window.addEventListener("scroll", myScrollFunc);
 		
 		document.getElementById("searchLocation").value = geoplugin_city();
 		$scope.subcategories = [];
 		$http.get("api/business/subcategory")
 		.success(function(data){
 			$scope.subcategories = data;
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
 		
// 		function getLocation() {
// 		    if (navigator.geolocation) {
// 		        navigator.geolocation.getCurrentPosition(showPosition);
// 		    } else { 
// 		        x.innerHTML = "Geolocation is not supported by this browser.";
// 		    }
// 		}
//
// 		function showPosition(position) {
// 		    $scope.latitude =  position.coords.latitude; 
// 		    $scope.longitude=  position.coords.longitude;
// 		   var geocoder;
// 	 		geocoder = new google.maps.Geocoder();
// 	 		var latlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
//
// 	 		geocoder.geocode(
// 	 		    {'latLng': latlng}, 
// 	 		    function(results, status) {
// 	 		        if (status == google.maps.GeocoderStatus.OK) {
// 	 		                if (results[0]) {
// 	 		                    var add= results[0].formatted_address ;
// 	 		                    var  value=add.split(",");
//
// 	 		                    count=value.length;
// 	 		                    country=value[count-1];
// 	 		                    state=value[count-2];
// 	 		                    city=value[count-3];
// 	 		                    document.getElementById("searchLocation").value = city;
//// 	 		                    document.getElementById("searchLocation1").value = city;
// 	 		                }
// 	 		                else  {
// 	 		                    alert("address not found");
// 	 		                }
// 	 		        }
// 	 		         else {
// 	 		            alert("Geocoder failed due to: " + status);
// 	 		        }
// 	 		    }
// 	 		);
// 		}
// 		
// 		getLocation();
 		
// 		$scope.searchFunc = function(details){
// 			if($scope.suggest)
// 			document.getElementById("suggestions").className = "show";
// 			else
// 			document.getElementById("suggestions1").className = "show";
// 		};
 		
 		$scope.testing = function(item){
 			$scope.searchText = item; 
 			document.getElementById("suggestions").className = "hide";
 			document.getElementById("suggestions1").className = "hide";
 		};
 		
 		$scope.categorySearch = function(category){
 			searchService.setSearch(category);
 			window.location.href = "#list";
 		}
 		
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