angular.module('PropelApp')
	.controller("UserAccountCtrl", ['$scope', '$http', function($scope, $http){
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.selectedUserName = '';
		$scope.getUserList = function(){
			$http.get("api/business/getuseraccounts")
			.success(function(data){
				$scope.userList = data;
			})
		};
		
		$scope.getUserList();
			
		$scope.addUser = function(){
			$scope.userName = "";
			$scope.firstName = "";
			$scope.lastName = "";
			$scope.password = "";
			$scope.retypePassword = "";
			document.getElementById("modal_overflow").style.display = "block";
		}
		
		$scope.cancel = function(){
			document.getElementById("modal_overflow").style.display = "none";
		}
		
		$scope.resetPassword = function(){
			$scope.newPassword = '';
			$scope.retypePassword = '';
			document.getElementById("modal_overflow1").style.display = "block";
		}
		
		$scope.reset = function(){
//			alert($scope.selectedUserName);
			
			if($scope.newPassword == $scope.retypePassword && $scope.newPassword != null){
				var data = 
					{
						USER_NAME : $scope.selectedUserName,
						PASSWORD : $scope.newPassword
					}
				$http.put("api/business/resetpassword", data)
				.success(function(data){
					alert("Password changed!!");
					document.getElementById("modal_overflow1").style.display = "none";
				})
			}
			else
				alert("Password and Retype password should match!!");
		}
		
		$scope.selectedUser = function(username){
			$scope.selectedUserName = username;
		}
		
		$scope.cancelReset = function(){
			document.getElementById("modal_overflow1").style.display = "none";
		}
		
		function formatDate(date) {
			var month = date.getMonth();
			month++;
			return date.getDate() + "/" + month + "/" + date.getFullYear();
	    }
		
		$scope.deleteItem = function(username){
//			var data1 = { USER_NAME : username }
			if(confirm("Are you sure?")){
			$http.delete("api/business/deleteuser?username="+username)
				.success(function(data){
					alert("deleted")
					$scope.getUserList();
				});
			}
		};
		
		$scope.submit = function(){
			document.getElementById("modal_overflow").style.display = "none";
			$scope.exist = "";
			for(var i=0; i<$scope.userList.length; i++){
				if($scope.userList[i].user_name == $scope.userName)
					$scope.exist = true;
			}
			if($scope.exist == false){
				if($scope.password != $scope.retypePassword)
					alert("Password and Retype password should match!!");
				else{
					var d = new Date();
		        	var formatedDate = formatDate(d);
					var data = 
					{
					USER_NAME : $scope.userName,
					FIRST_NAME : $scope.firstName,
					LAST_NAME : $scope.lastName,
					PASSWORD : $scope.password,
					USER_ROLE : document.getElementById("kUI_dropdown_basic_input").value,
					CREATED_DATE : formatedDate
					}
					$http.post("api/business/useraccounts", data)
					.success(function(data){
						$scope.getUserList();
						alert("User Account created!!");
					})
				}
			}
			else
				alert("User Name is already registered!!");
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