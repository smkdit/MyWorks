angular.module('PropelApp')
	.controller("SubCategoryQueueCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.oldSubCategoryName = '';
 		$scope.subCategoryList = [];
 		$http.get("api/business/subcategory")
		.success(function(data){
			$scope.subCategoryList = data;
		})
		
		$http.get("api/business/getsubcategory")
		.success(function(data){
			$scope.newSubCategory = [];
			$scope.pushFunction = function(jsonData){
				if($scope.newSubCategory.length == 0){
					$scope.notInList = false;
					for(var i=0; i<$scope.subCategoryList.length; i++){
						if($scope.subCategoryList[i].sub_category == jsonData.sub_category){
							$scope.notInList = true;
							break;
						}
					}
					if($scope.notInList == false)
					$scope.newSubCategory.push(jsonData);
				}
				else{
					$scope.exist = false;
					for(var i=0;i<$scope.newSubCategory.length;i++){
//						alert($scope.newSubCategory[i].SUB_CATEGORY.toUpperCase());
						if($scope.newSubCategory[i].sub_category == jsonData.sub_category){
							$scope.exist = true;
							break;
						}
					}
					if($scope.exist == false){
						$scope.notInList = false;
						for(var i=0; i<$scope.subCategoryList.length; i++){
							if($scope.subCategoryList[i].sub_category == jsonData.sub_category){
								$scope.notInList = true;
								break;
							}
						}
						if($scope.notInList == false)
						$scope.newSubCategory.push(jsonData);
					}
				}
//				alert(JSON.stringify($scope.newSubCategory));
			}
			
			for(var i=0; i<data.length; i++){
					if(data[i].other_category1 != "NA"){
						$scope.pushFunction({sno : data[i].sno, category : data[i].main_category, sub_category : data[i].other_category1});
					}	
					if(data[i].other_category2 != "NA"){
						$scope.pushFunction({sno : data[i].sno, category : data[i].main_category, sub_category : data[i].other_category2});
					}	
					if(data[i].other_category3 != "NA"){
						$scope.pushFunction({sno : data[i].sno, category : data[i].main_category, sub_category : data[i].other_category3});
					}	
			}
//			alert(JSON.stringify($scope.newSubCategory));
//			var diff = $($scope.common).not($scope.subCategoryList).get();
		})
		
		$scope.myFunction = function(name) {
 			$scope.oldSubCategoryName = name;
 			var subCategory = prompt("SubCategory Name:", name);
 			if(subCategory != name){
 				for(var i=0; i<$scope.newSubCategory.length; i++){
 					if($scope.newSubCategory[i].sub_category == name){
 						$scope.newSubCategory[i].sub_category = subCategory;
 						$scope.sno = $scope.newSubCategory[i].sno; 
 					}
 				}
 			}
 		}
 		
 		$scope.approval = function(name){
 			$scope.exist = "";
			for(var i=0; i<$scope.subCategoryList.length; i++){
				if($scope.subCategoryList[i].sub_category == name)
					$scope.exist = true;
			}
			if($scope.exist == true)
				alert("Sub Category already exist..!!");
			else{
 			for(var i=0; i<$scope.newSubCategory.length; i++){
					if($scope.newSubCategory[i].sub_category == name){
						var data = 
						{
						CATEGORY : $scope.newSubCategory[i].category,
						SUB_CATEGORY : $scope.newSubCategory[i].sub_category
						}
						$http.post("api/business/addsubcategory", data)
						.success(function(data){
							var data1 = 
							{
									CATEGORY : name,
									SUB_CATEGORY : $scope.oldSubCategoryName
							}
							$http.put("api/business/updatesubcategory", data1)
							.success(function(data){
								alert("New SubCategory is approved!!");
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
