angular.module('PropelApp')
	.controller("SubCategoryCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.getCategory = function(){
		$http.get("api/business/subcategory")
		.success(function(data){
			$scope.subCategoryList = data;
		})
		}
		$scope.getCategory();
		
		$scope.addCategory = function(){
			$scope.category = "";
			$scope.newSubCategory = "";
			document.getElementById("modal_overflow").style.display = "block";
		}
		
		$scope.addButton = function(){
			$scope.exist = "";
			for(var i=0; i<$scope.subCategoryList.length; i++){
				if($scope.subCategoryList[i].sub_category == $scope.newSubCategory)
					$scope.exist = true;
			}
			if($scope.exist == true)
				alert("Sub Category already exist..!!");
			else{
				var data = 
				{
				CATEGORY : $scope.category,
				SUB_CATEGORY : $scope.newSubCategory
				}
				$http.post("api/business/addsubcategory", data)
				.success(function(){
					alert("Sub Category added successfully..!!");
					$scope.getCategory();
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