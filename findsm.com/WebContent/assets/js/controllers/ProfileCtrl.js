angular.module('PropelApp', [])
	.controller("ProfileCtrl", ['$scope', '$http', '$location', function($scope, $http, $location){
        
		 
		
		$scope.fname="";
		
		
		
		
		var readImage = function() 
			{
				
				if ( this.files && this.files[0] )
		    		{
		        
		    			var reader= new FileReader();
		    			
		    			reader.onload = function(e)
		    				{
		    				document.getElementById("img").src = e.target.result;
		    					
		    				};     
		       
		    			reader.readAsDataURL( this.files[0] );
		    		}
		};
	 
		
		document.getElementById("image").addEventListener("change", readImage,false);
		
		$scope.show1=function()
		{
			
			document.getElementById("img").src = "assets/img/defdp.png";
			
		};
		
		
		
		$scope.email = $location.search().email;
		$http.get("api/business/userdetails?email=" + $scope.email)
		.success(function(data) {
			$scope.name = data[0].full_name;
			$scope.email = data[0].email;
			$scope.mobile = data[0].mobile;
			$scope.phone = data[0].phone;
			$scope.state_name = data[0].state_name;
			$scope.city = data[0].city;
			$scope.street = data[0].street;
			$scope.zip = data[0].zip;
			$scope.additional = data[0].additional;
			$scope.aboutme = data[0].about_me;
			$http.get("api/business/getuserreviews?email="+$scope.email)
			.success(function(data){
				$scope.reviews = data;
			});
		});
		
		
		$scope.submit = function(){
			var data = {
					FNAME : $scope.name,
					EMAIL : $scope.email,
					MOBILE : $scope.mobile,
					PHONE : angular.isUndefined($scope.phone) ? "NA" : $scope.phone,
					STATE_NAME : $scope.state_name,
					CITY : $scope.city,
					STREET : $scope.street,
					ZIP : $scope.zip,
					ADDITIONAL :  angular.isUndefined($scope.additional) ? "NA" : $scope.additional,
					ABOUT_ME : angular.isUndefined($scope.aboutme) ? "NA" : $scope.aboutme 
			};
			$http.put("api/business/userdetails", data)
			.success(function(response){
				Cancel();
			});
		};
		
		function formatDate(date) {
      	  var hours = date.getHours();
      	  var minutes = date.getMinutes();
      	  var ampm = hours >= 12 ? 'pm' : 'am';
      	  hours = hours % 12;
      	  hours = hours ? hours : 12; // the hour '0' should be '12'
      	  minutes = minutes < 10 ? '0'+minutes : minutes;
      	  var strTime = hours + ':' + minutes + ' ' + ampm;
      	  var month = date.getMonth();
      	  month++;
      	  return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + strTime;
      	}
		
		$scope.selected = {value: 0};
		$scope.edit = function(){
			$scope.editedReview = $scope.reviews[$scope.selected.value];
			$scope.reviewEdited = $scope.editedReview.review; 
		};
		
		$scope.getRatings = function(){
			var list = document.getElementsByClassName("stars");
			 for(var i = list.length - 1; 0 <= i; i--)
			 if(list[i] && list[i].parentElement)
			 list[i].parentElement.removeChild(list[i]);
			setTimeout(function(){
				rating();
				}, 300);
		};
		
		$scope.reviewEdit = function(){
			var d = new Date();
        	var formatedDate = formatDate(d);
        	var data = {
        			COMPANY_NAME : $scope.editedReview.company_name,
        			EMAIL : $scope.editedReview.email,
        			GIVEN_DATE : formatedDate,
        			REVIEW : $scope.reviewEdited,
        			VALUE : document.getElementById("score_value").value,
        			SERVICE: document.getElementById("score_score").value
        		};
        	$http.put("api/business/updatereview", data)
        	.success(function(response){
        		$http.get("api/business/getuserreviews?email="+$scope.email)
    			.success(function(data){
    				$scope.getRatings();
    				$scope.reviews = data;
    			});
        	});
		};

		document.getElementById("suggestions1").className = "hide";
	

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

				$http.get("api/business/newbusiness")
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
