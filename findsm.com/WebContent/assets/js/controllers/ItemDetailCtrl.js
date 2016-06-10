angular.module('PropelApp')
	.controller("ItemDetailCtrl", ['$scope', '$http', '$location', 'itemService', function($scope, $http, $location, itemService){
		myID.style.display = "";
		document.getElementById("page-canvas").style.display = "none";
		$scope.searchOpen = false;
		var item = itemService.getItem();
		document.getElementById("suggestions1").className = "hide";
 		myID = document.getElementById("headerSearch");
//		$scope.companyName = $location.search().companyName;
//		$scope.area = $location.search().area;
//		$scope.city = $location.search().city;
//		$scope.code = $location.search().code;
		$scope.gallery = [];
		if($scope.code != 2){
//			alert("if");
		$http.get("api/business/itemdetail?company_name="+item.name+"&area="+item.area+"&city="+item.city)
		.success(function(data){
			$scope.item = data[0];
//			$scope.sno = data[0].sno;
			$scope.street = data[0].street;
			GetLocation();
			$scope.image = data[0].photo.split("-");
			$scope.gallery.push($scope.image[0]);
			$scope.isLogo = false;
			$scope.logo = $scope.image[1];
//			alert($scope.logo);
			if(!angular.isUndefined($scope.logo)){
				$scope.isLogo = true;
			}
			$scope.galleryImage = $scope.gallery[0];
			$scope.galleryCount = $scope.gallery.length;
			$scope.getReview();
			$http.get("api/business/itemimages?company_name="+item.name+"&area="+item.area+"&city="+item.city)
			.success(function(response){
				if(!angular.isUndefined(response[0].images)){
					$scope.images = response[0].images.split("-");
					for(var i=0; i<$scope.images.length-1; i++){
						$scope.gallery.push($scope.images[i]);
					}
					$scope.galleryCount = $scope.gallery.length;
				}
			});
			$http.get("api/business/getproductsbybusinessname?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
			.success(function(data){
				$scope.products = data;
			})
			$http.get("api/business/getservicesbybusinessname?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
			.success(function(data){
				$scope.services = data;
			})
		});
		}
		else{
//			alert("else");
			$http.get("api/business/itemdetailPartner?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
			.success(function(data){
				$scope.item = data[0];
				$scope.sno = data[0].sno;
				$scope.street = data[0].street;
				GetLocation();
				$scope.image = data[0].photo.split("-");
				$scope.gallery.push($scope.image[0]);
				$scope.isLogo = false;
				$scope.logo = $scope.image[1];
				if(!angular.isUndefined($scope.logo)){
					$scope.isLogo = true;
				}
				$scope.galleryImage = $scope.gallery[0];
				$scope.galleryCount = $scope.gallery.length;
				$scope.getReview();
				$http.get("api/business/partnerimages?sno="+$scope.sno)
				.success(function(response){
					if(!angular.isUndefined(response[0].images)){
						$scope.images = response[0].images.split("-");
						for(var i=0; i<$scope.images.length-1; i++){
							$scope.gallery.push($scope.images[i]);
						}
						$scope.galleryCount = $scope.gallery.length;
					}
				});
			});
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
 				if(data[i].category == "Education")
 					$scope.sub6.push(data[i]);
 				if(data[i].category == "Food and Dining")
 					$scope.sub7.push(data[i]);
 				if(data[i].category == "Home and Garden")
 					$scope.sub8.push(data[i]);
 				if(data[i].category == "Health and Medicine")
 					$scope.sub9.push(data[i]);
 				if(data[i].category == "Industry and Agriculture")
 					$scope.sub10.push(data[i]);
 			}
 		})
		
		$scope.getReview = function(){
			$http.get("api/business/getreviews?company_name="+$scope.companyName)
			.success(function(data) {
				function custom_sort(a, b) {
				    return new Date(a.given_date).getTime() - new Date(b.given_date).getTime();
				}
				var reviews = data;
				reviews.sort(custom_sort);
				$scope.reviews = reviews;
				$scope.totalRating = 0;
				for(var i=0; i < $scope.reviews.length; i++){
					$scope.reviews[i].overRating = ($scope.reviews[i].value + $scope.reviews[i].service)/2;
					
					$scope.totalRating = $scope.totalRating + $scope.reviews[i].overRating;					
				}
				$scope.overallRating = $scope.totalRating / data.length;
			});
		};
		
		$scope.categorySearch = function(category){
 			window.location.href = "listing-list.html#/?searchText=" + category;
 		}
		
		$scope.getRatings = function(){
			var list = document.getElementsByClassName("stars");
			 for(var i = list.length - 1; 0 <= i; i--)
			 if(list[i] && list[i].parentElement)
			 list[i].parentElement.removeChild(list[i]);
			setTimeout(function(){
				rating();
				}, 1000);
		};
		
//		$scope.getRatings();
		function GetLocation() {
            var geocoder = new google.maps.Geocoder();
            var address = $scope.street+ "," + $scope.area;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.latitude = results[0].geometry.location.lat();
                    $scope.longitude = results[0].geometry.location.lng();
                    itemDetailMap();
                } else {
//                    alert("Request failed.");
                }
            });
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
 		
        function itemDetailMap(){
        	var mapdata = {
        			type_icon : "assets/icons/store/apparel/umbrella-2.png",
        			latitude : $scope.latitude,
        			longitude : $scope.longitude
        	};
        	var mapCenter = new google.maps.LatLng(mapdata.latitude,mapdata.longitude);
        	var mapOptions = {
        			zoom: 14,
        			center: mapCenter,
        			disableDefaultUI: true,
        			scrollwheel: false,
        			styles: mapStyles,
        			panControl: false,
        			zoomControl: false,
        			draggable: true
        		};
        	var mapElement = document.getElementById('map-detail');
        	var map = new google.maps.Map(mapElement, mapOptions);
        	if( mapdata.type_icon ) var icon = '<img src="' + mapdata.type_icon +  '">';
        	else icon = '';
            // Google map marker content -----------------------------------------------------------------------------------
        	var markerContent = document.createElement('DIV');
        	markerContent.innerHTML =
        		'<div class="map-marker">' +
                   	'<div class="icon">' +
                   	icon +
                   	'</div>' +
                 '</div>';
            // Create marker on the map ------------------------------------------------------------------------------------
        	var marker = new RichMarker({
        		position: new google.maps.LatLng( mapdata.latitude, mapdata.longitude ),
        		map: map,
        		draggable: false,
        		content: markerContent,
        		flat: true
        	});
        	marker.content.className = 'marker-loaded';
        }
        
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

        
        $scope.submitReview = function(){
        	for(var i=0; i<$scope.reviews.length; i++){
        		if($scope.reviews[i].email == $scope.review.email){
        			alert("You've already posted a review..!!");
        			return;
        		}
        	}
        	var d = new Date();
        	var formatedDate = formatDate(d);
        	var data = {
					COMPANY_NAME : $scope.companyName,
					AREA : $scope.area,
					USER_NAME : $scope.review.name,
					EMAIL : $scope.review.email,
					REVIEW : $scope.review.review,
					VALUE : document.getElementById("score_value").value,
					PRICE : 0,
					QUALITY : 0,
					SERVICE : document.getElementById("score_score").value,
					RESPONSE : 0,
        			GIVEN_DATE : formatedDate 
			};
        	$http.post("api/business/reviews", data)
			.success(function(data){
				$scope.getReview();
				$scope.review.name = "";
				$scope.review.email = "";
				$scope.review.review = "";
			});
        };
        
        
//		$scope.test = function(number){
//			$scope.carouselWidth = document.getElementById("carousel").offsetWidth;
//			$scope.transWidth = $scope.carouselWidth / ($scope.galleryCount-1);
//			$scope.width = '0px';
////			var i = new Image(); 
//			if(number == 1){
////			 i.src = $scope.gallery[0];
////			 document.getElementById("heights").classList.remove("owl-height"); 
////			 document.getElementById("heights").style.height = i.height;
////			 alert(document.getElementById("heights").style.height);
//			 document.getElementById("carousel").style.transform = "translate3d(" + $scope.width + ", 0px, 0px)";
//			 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//			 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 2){
//				$scope.width = $scope.transWidth + 'px';
////				i.src = $scope.gallery[1];
////				document.getElementById("heights").classList.remove("owl-height");
////				document.getElementById("heights").style.height = i.height;
////				alert(document.getElementById("heights").style.height);
//				document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 3){
//				$scope.width = 2*$scope.transWidth + 'px';
////				 i.src = $scope.gallery[2];
////				 document.getElementById("heights").classList.remove("owl-height");
////				 document.getElementById("heights").style.height = i.height;
////				 alert(document.getElementById("heights").style.height);
//				 document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 4){
//				$scope.width = 3*$scope.transWidth + 'px';
//				document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 5){
//				$scope.width = 4*$scope.transWidth + 'px';
//				document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 6){
//				$scope.width = 5*$scope.transWidth + 'px';
//				document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//			else if(number == 7){
//				$scope.width = 6*$scope.transWidth + 'px'	;
//				document.getElementById("carousel").style.transform = "translate3d(-" + $scope.width + ", 0px, 0px)";
//				 document.getElementById("carousel").style.transition = "all 0.25s ease 0s";
//				 document.getElementById("carousel").style.width = $scope.carouselWidth + "px";
//			}
//		};
		

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
 	 			$scope.allDetails = [];
 	 			for(var i=0; i<data.length;i++){
 	 				if(data[i].business_name != "NA"){
 	 					$scope.allDetails.pushIfNotExist(data[i].business_name, function(e) { 
 	 						return e === data[i].business_name; 
 	 					});
 	 				}
 	 			}
 	 			for(var i=0; i<$scope.subcategories.length;i++){
 	 				if($scope.subcategories[i].sub_category != "NA"){
 	 					$scope.allDetails.pushIfNotExist($scope.subcategories[i].sub_category, function(e) { 
 	 						return e === $scope.subcategories[i].sub_category; 
 	 					});
 	 				}
 	 			}
 	 			if($scope.suggest)
 	 	 			document.getElementById("suggestions").className = "show";
 	 	 			else
 	 	 			document.getElementById("suggestions1").className = "show";
 	 			 $scope.complete=function(){
 	 			    $( "#tags" ).autocomplete({
 	 			      source: $scope.allDetails
 	 			    });
 	 			    } 
 			});
 		}
 		}
	}]);