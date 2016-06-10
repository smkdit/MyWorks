angular.module('PropelApp', [])
	.controller("LoginCtrl", ['$scope', '$http', function($scope, $http){
		$scope.login = function(){			
			$http.get("api/business/logincheck/" +$scope.form.username+ "/" +$scope.form.password) 
			.success(function(data){
				if(data.length == 0){
					alert("Not Registered");
				}
				else{
					if($scope.form.username == "smkdit@gmail.com")
						window.location.href = '/propeltree.com/#/admin';
					else
						window.location.href = '/propeltree.com/partner.html';
				}
			})
		}

		$("#input").keypress(function(event) {
		    if (event.which == 13) {
		        event.preventDefault();
		        $scope.login();
		    }
		});


		
	}]);