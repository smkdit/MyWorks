angular.module('PropelApp', [])

	.controller("CategoryListCtrl", ['$scope', '$http', '$location', function($scope, $http, $location){
		
		$scope.scroll = function(div){
//			alert(div);
			document.getElementById(div).scrollIntoView();
		}
		
		function scrollIntoView(eleID) {
			   var e = document.getElementById(eleID);
			   if (!!e && e.scrollIntoView) {
			       e.scrollIntoView();
			   }
			}
		
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
 				if(data[i].category == "Computers and Electronics")
 					$scope.sub6.push(data[i]);
 				if(data[i].category == "Education")
 					$scope.sub7.push(data[i]);
 				if(data[i].category == "Food and Dining")
 					$scope.sub8.push(data[i]);
 				if(data[i].category == "Home and Garden")
 					$scope.sub9.push(data[i]);
 				if(data[i].category == "Health and Medicine")
 					$scope.sub10.push(data[i]);
 				if(data[i].category == "Industry and Agriculture")
 					$scope.sub11.push(data[i]);
 				if(data[i].category == "Legal and Financial")
 					$scope.sub12.push(data[i]);
 				if(data[i].category == "Media Communication")
 					$scope.sub13.push(data[i]);
 				if(data[i].category == "Personal Care and Services")
 					$scope.sub14.push(data[i]);
 				if(data[i].category == "Real Estate")
 					$scope.sub15.push(data[i]);
 				if(data[i].category == "Shopping")
 					$scope.sub16.push(data[i]);
 				if(data[i].category == "Sports and Creation")
 					$scope.sub17.push(data[i]);
 				if(data[i].category == "Travel and Transportation")
 					$scope.sub18.push(data[i]);
 				if(data[i].category == "Non - classifiable Establishment")
 					$scope.sub19.push(data[i]);
 			}
 		})
		
 		$scope.categorySearch = function(category){
 			window.location.href = "listing-list.html#/?searchText=" + category;
 		}
	}])