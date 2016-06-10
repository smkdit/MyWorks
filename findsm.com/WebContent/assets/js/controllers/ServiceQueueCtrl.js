angular.module('PropelApp')
	.controller("ServiceQueueCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.productsList = [];
		$http.get("api/business/servicesdata")
		.success(function(data){
			$scope.servicesList = data;
		})
		
//		$scope.newProducts = [];
		$http.get("api/business/getservices")
		.success(function(data){
			$scope.newServices = [];
			$scope.pushFunction = function(jsonData){
			if($scope.newServices.length == 0){
				$scope.notInList = false;
				for(var i=0; i<$scope.servicesList.length; i++){
					if($scope.servicesList[i].service_name == jsonData.service_name){
						$scope.notInList = true;
						break;
					}
				}
				if($scope.notInList == false)
				$scope.newServices.push(jsonData);
			}
			else{
				$scope.exist = false;
				for(var i=0;i<$scope.newServices.length;i++){
					if($scope.newServices[i].service_name == jsonData.service_name){
						$scope.exist = true;
						break;
					}
				}
				if($scope.exist == false){
					$scope.notInList = false;
					for(var i=0; i<$scope.servicesList.length; i++){
						if($scope.servicesList[i].service_name == jsonData.service_name){
							$scope.notInList = true;
							break;
						}
					}
					if($scope.notInList == false)
					$scope.newServices.push(jsonData);
				}
			}
		}
		
		for(var i=0; i<data.length; i++){
			$scope.pushFunction(data[i]);		
		}
//		alert(JSON.stringify($scope.newProducts));
		})
		
		$scope.oldServiceName = '';
		$scope.myFunction = function(name) {
 			$scope.oldServiceName = name;
 			var serviceName = prompt("Service Name:", name);
 			if(serviceName != name){
 				for(var i=0; i<$scope.newServices.length; i++){
 					if($scope.newServices[i].service_name == name){
 						$scope.newServices[i].service_name = serviceName;
 					}
 				}
 			}
 		}
		
		$scope.approval = function(name){
 			$scope.exist = "";
			for(var i=0; i<$scope.servicesList.length; i++){
				if($scope.servicesList[i].service_name == name)
					$scope.exist = true;
			}
			if($scope.exist == true)
				alert("Service already exist..!!");
			else{
 			for(var i=0; i<$scope.newServices.length; i++){
					if($scope.newServices[i].service_name == name){
						var data = 
						{
						SERVICE_NAME : $scope.newServices[i].service_name
						}
						$http.post("api/business/addservice", data)
						.success(function(data){
							var data1 = 
							{
									SERVICE_NAME : name,
									COMPANY_NAME : $scope.oldServiceName
							}
							$http.put("api/business/updateservice", data1)
							.success(function(data){
								alert("Service is approved and updated!!");
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