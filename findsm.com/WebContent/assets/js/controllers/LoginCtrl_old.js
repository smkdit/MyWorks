angular.module('PropelApp', [])
	
	.controller("LoginCtrl", ['$scope', '$http', '$location', function($scope, $http, $location, $window)
	 {	    
		document.getElementById("suggestions1").className = "hide";
		$scope.action = $location.search().action;
		$scope.sign_up = false;
		if($scope.action == "signup"){
			$scope.sign_up = true;
		}
		$scope.email  = "";
		$scope.errpswd="";
		$scope.password  = "";
		$scope.password1="";
		$scope.pw3="";
//		$scope.fsemail="";
		$scope.emailerr="";
//		$scope.fspwd="";
	
		$scope.show2=function() {
			$http.get("/propeltree.com/api/business/logincheck/" +$scope.fsemail+ "/" +$scope.fspwd) 
			.success(function(Data){
				if(Data==''){
					$scope.errpswd="Not Registered";
				}
				else{
					window.location.href = '/propeltree.com/profile.html#?email=' + $scope.fsemail;
				}
			})
			.error(function(data, status, header, config){
				alert("failure");
		    }); 
		};
	
		$scope.show=function(){
			if($scope.password==$scope.password1){
				var data={
						"FNAME":$scope.fname,
						"EMAIL":$scope.email,
						"PASSWORD":$scope.password
		        	};
				$http.post("/propeltree.com/api/business/signup",data)
				.success(function(data){	
					alert("Account created successfully! Please Sign-in to continue.");
					document.getElementById("fsemail").focus();
					document.getElementById("fsemail").select();
				})
				.error(function(data, status, header, config) {
					$scope.emailerr="Entered E-mail already exists.";
				});
			}
			else
			{
				$scope.pw3="Please ensure both the passwords are same.";
			};
		};
		
		$scope.jog=function(){
			if($scope.password==$scope.password1){
				$scope.pw3="";
			}
			else{
				$scope.pw3="Passwords dont match";
			}
		};
		

	    $scope.search = function(){
			window.location.href = "/propeltree.com/listing-list.html#/?searchText=" + $scope.searchText;
		};
		
	$scope.searchFunc = function(){
			
			document.getElementById("suggestions1").className = "show"; 		
	};
		
		

		
		$scope.testing = function(item){
			$scope.searchText = item; 
			document.getElementById("suggestions1").className = "hide";
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

				$http.get("/propeltree.com/api/business/newbusiness")
		 		.success(function(data){
		 			$scope.allDetails = [];
		 			for(var i=0; i<data.length;){
		 				$scope.allDetails.pushIfNotExist(data[i].sub_category1, function(e) { 
		 		 		    return e === data[i].sub_category1; 
		 		 		});
//		 				i++;
		 			if(!angular.isUndefined(data[i]))
		 			if(data[i].sub_category2 != "NA"){
		 				$scope.allDetails.pushIfNotExist(data[i].sub_category2, function(e) { 
		 		 		    return e === data[i].sub_category2; 
		 		 		});
//		 				i++;
		 			}
		 			if(!angular.isUndefined(data[i]))
		 			if(data[i].sub_category3 != "NA"){
		 				$scope.allDetails.pushIfNotExist(data[i].sub_category3, function(e) { 
		 		 		    return e === data[i].sub_category3; 
		 		 		});
//		 				i++;
		 			}
		 			i++;
		 			}
				    });
	 }]);
  