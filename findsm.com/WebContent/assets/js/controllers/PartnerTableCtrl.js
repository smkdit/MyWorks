angular.module('PropelApp', [])
	.controller("PartnerTableCtrl", ['$scope', '$http', function($scope, $http){
		$http.get("api/business/partnerdata")
		.success(function(data){
			$scope.partnerData =data;
			for(var i=0; i<data.length; i++){
				$scope.images = data[i].photo.split("-");
				$scope.partnerData[i].dp = $scope.images[0];
			}
//			alert($scope.partnerData[0].active);
		});
		
		$scope.viewSite = function(item){
			for(var i=0; i<$scope.partnerData.length; i++){
				if($scope.partnerData[i].sno == item)
					$scope.selected = $scope.partnerData[i];
			}
			window.location.href = "/propeltree.com/item-detail.html#?companyName=" + $scope.selected.company_name + "&area=" + $scope.selected.area + "&city=" + $scope.selected.city + "&code=2";
		}
		
		$scope.deleteItem = function(item){
			for(var i=0; i<$scope.partnerData.length; i++){
				if($scope.partnerData[i].sno == item)
					$scope.deleted = $scope.partnerData[i];
			}
			alert("Deleted");
		}
		
		$scope.comparatorFunction = function (name, search) {
		    return (''+name).indexOf(''+search) > -1;
		};
	}]);
