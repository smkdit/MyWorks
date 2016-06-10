angular.module('PropelApp')
	.controller("CityQueueCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.oldAreaName = '';
 		$scope.cityAreaList = [];
 		$http.get("api/business/city")
		.success(function(data){
			$scope.cityAreaList = data;
		})
		
		$http.get("api/business/getcityarea")
		.success(function(data){
			$scope.newCityAreaList = [];
			$scope.pushFunction = function(jsonData){
				if($scope.newCityAreaList.length == 0){
					$scope.notInList = false;
					for(var i=0; i<$scope.cityAreaList.length; i++){
						if(angular.lowercase($scope.cityAreaList[i].area) == jsonData.area.toLowerCase() && angular.lowercase($scope.cityAreaList[i].city) == jsonData.city.toLowerCase()){
							$scope.notInList = true;
							break;
						}
					}
					if($scope.notInList == false)
					$scope.newCityAreaList.push(jsonData);
				}
				else{
					$scope.exist = false;
					for(var i=0;i<$scope.newCityAreaList.length;i++){
//						alert($scope.newSubCategory[i].SUB_CATEGORY.toUpperCase());
						if(angular.lowercase($scope.newCityAreaList[i].area) == jsonData.area.toLowerCase() && angular.lowercase($scope.cityAreaList[i].city) == jsonData.city.toLowerCase()){
							$scope.exist = true;
							break;
						}
					}
					if($scope.exist == false){
						$scope.notInList = false;
						for(var i=0; i<$scope.cityAreaList.length; i++){
							if(angular.lowercase($scope.cityAreaList[i].area) == jsonData.area.toLowerCase() && angular.lowercase($scope.cityAreaList[i].city) == jsonData.city.toLowerCase()){
								$scope.notInList = true;
								break;
							}
						}
						if($scope.notInList == false)
						$scope.newCityAreaList.push(jsonData);
					}
				}
			}
			
			for(var i=0; i<data.length; i++){
					if(data[i].area != "NA"){
						$scope.pushFunction({sno : data[i].sno, city : data[i].city, area : data[i].area, state_name : data[i].state_name});
					}	
			}
		})
		
		$scope.myFunction = function(name) {
 			$scope.oldAreaName = name;
 			var areaName = prompt("Area Name:", name);
 			if(areaName != name){
 				for(var i=0; i<$scope.newCityAreaList.length; i++){
 					if($scope.newCityAreaList[i].area == name){
 						$scope.newCityAreaList[i].area = areaName;
 						$scope.sno = $scope.newCityAreaList[i].sno; 
 					}
 				}
 			}
 		}
 		
 		$scope.approval = function(name){
 			$scope.exist = "";
			for(var i=0; i<$scope.cityAreaList.length; i++){
				if($scope.cityAreaList[i].area == name)
					$scope.exist = true;
			}
			if($scope.exist == true)
				alert("Area already exist..!!");
			else{
 			for(var i=0; i<$scope.newCityAreaList.length; i++){
					if($scope.newCityAreaList[i].area == name){
						var city = $scope.newCityAreaList[i].city;
						var data = 
						{
						STATE_NAME : $scope.newCityAreaList[i].state_name,
						CITY : $scope.newCityAreaList[i].city,
						AREA : $scope.newCityAreaList[i].area
						}
						$http.post("api/business/addcityarea", data)
						.success(function(data){
							var data1 = 
							{
									STATE_NAME : $scope.oldAreaName,
									CITY : city,
									AREA : name
							}
							$http.put("api/business/updatearea", data1)
							.success(function(data){
								alert("New Area is approved!!");
							})
						})
					}
				}
			}
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
// 	 			alert(JSON.stringify(data));
 	 			$scope.allDetails = [];
 	 			for(var i=0; i<data.length;){
 	 				$scope.allDetails.pushIfNotExist(data[i].sub_category1, function(e) { 
 	 		 		    return e === data[i].sub_category1; 
 	 		 		});
 	 			if(!angular.isUndefined(data[i]))
 	 			if(data[i].sub_category2 != "NA"){
 	 				$scope.allDetails.pushIfNotExist(data[i].sub_category2, function(e) { 
 	 		 		    return e === data[i].sub_category2; 
 	 		 		});
 	 			}
 	 			if(!angular.isUndefined(data[i]))
 	 			if(data[i].sub_category3 != "NA"){
 	 				$scope.allDetails.pushIfNotExist(data[i].sub_category3, function(e) { 
 	 		 		    return e === data[i].sub_category3; 
 	 		 		});
 	 			}
 	 			if(data[i].business_name != "NA"){
 	 				$scope.allDetails.pushIfNotExist(data[i].business_name, function(e) { 
 	 		 		    return e === data[i].business_name; 
 	 		 		});
 	 			}
 	 			i++;
 	 			}
 	 			if($scope.suggest)
 	 	 			document.getElementById("suggestions").className = "show";
 	 	 			else
 	 	 			document.getElementById("suggestions1").className = "show";
 	 			 $scope.complete=function(){
// 	 				 alert(JSON.stringify($scope.allDetails));
 	 			    $( "#tags" ).autocomplete({
 	 			      source: $scope.allDetails
 	 			    });
 	 			    } 
 			    });
 		}
 		}
	}]);
