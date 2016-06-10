angular.module('PropelApp', ['ngTagsInput', 'ngImgCrop'])
 	.controller("NewBusinessCtrl", ['$scope', '$http', function($scope, $http){
	$scope.form = {};
	$scope.form.sub_category = [];
	$scope.form.other_category = [];
	$scope.form.main_category = "Business Services";
	$scope.form.state = "TamilNadu";
	document.getElementById("fileInput").value = "";
	document.getElementById("icon").value = "";
	document.getElementById("suggestions1").className = "hide";
	document.getElementById("gallery").value = "";
	$scope.checkboxValue = function(check_name){
		if(document.getElementById(check_name).checked == true)
			return 'YES';
		else
			return 'NO';
	};
	
	$scope.availableTags= [
	                       "Astrology",
	                       "Catering",
	                       "Decorates",
	                       "Photography",
	                       "Tours & Travels",
	                       "Wedding Cards"	                       
	                       ];

	$scope.businesServices= [
	                       "Advertising",
	                       "Consulting",
	                       "Event Management",
	                       "Graphic Design",
	                       "Marketing"
	                       ];

	$scope.consumerServices = [
	                           "Photography",
	                           "Tailoring"
	                           ];
	
	$scope.consumerProducts = [
	                           "Apparals",
	                           "Clothing"
	                           ];
	
	$scope.subcategorySuggestions = function(){
		if($scope.form.main_category == "Business Services")
    		$scope.subcategorySuggestionsList = $scope.businesServices;
		else if($scope.form.main_category == "Consumer Services")
			$scope.subcategorySuggestionsList = $scope.consumerServices;
		else if($scope.form.main_category == "Consumer Products")
			$scope.subcategorySuggestionsList = $scope.consumerProducts;
	};
	
	$scope.openHoursTags = [
	                        "08:00 am",
	                        "08:30 am",
	                        "09:00 am",
	                        "09:30 am",
	                        "10:00 am",
	                        "10:30 am",
	                        "11:00 am"
	                      ];
	
	$scope.closeHoursTags = [
	                        "06:00 pm",
	                        "06:30 pm",
	                        "07:00 pm",
	                        "07:30 pm",
	                        "08:00 pm",
	                        "08:30 pm",
	                        "09:00 pm",
	                        "09:30 pm",
	                        "10:00 pm"
	                      ];
	                      
	$scope.openComplete= function(param){
	    $( "#" + param ).autocomplete({
	    	source: $scope.openHoursTags
	    });
	};
	
	$scope.closeComplete= function(param){
	    $( "#"+param ).autocomplete({
	    	source: $scope.closeHoursTags
	    });
	};
	
	$scope.stateOptions = ["TamilNadu", "Karnataka"];
	$scope.tnCities = ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"];
	$scope.kaCities = ["Bangalore", "Mangalore", "Mysore"];
	
	$scope.getCities = function(){
		$scope.cities = [];
		if($scope.form.state == "TamilNadu"){
			$scope.cities = $scope.tnCities;
		}
		else if($scope.form.state == "Karnataka"){
			$scope.cities = $scope.kaCities;
		}
	};
	
	$scope.getCities();
	
	
	
	function el(id){return document.getElementById(id);}

	var readImage = function() {
	    if ( this.files && this.files[0] ) {
	        var FR= new FileReader();
	        FR.onload = function(e) {
	             el("img").src = e.target.result;
	             $scope.dpDataURL = e.target.result;
	        };       
	        FR.readAsDataURL( this.files[0] );
	    }
	};
	
	var readIconImage = function() {
	    if ( this.files && this.files[0] ) {
	        var FR= new FileReader();
	        FR.onload = function(e) {
	             el("iconimg").src = e.target.result;
	             $scope.iconDataURL = e.target.result;
	        };       
	        FR.readAsDataURL( this.files[0] );
	    }
	};
	
	var output = "";
	function test(result){
		output = output.concat(result);
		output = output.concat("-");
	};
	
	
	$scope.galleryDataURL = [];
	window.preview = function (input) {
	    if (input.files && input.files[0]) {
	        $(input.files).each(function () {
	            var reader = new FileReader();
	            reader.readAsDataURL(this);
	            reader.onload = function (e) {
	                $("#previewImg").append("<img class='thumb1' src='" + e.target.result + "'>");
	                test(e.target.result);
	            };
	        });
	    }	    
	};	
	
	
//	el("asd").addEventListener("change", readImage, false);
	el("icon").addEventListener("change", readIconImage, false);
	
	$scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    var readImage = function() 
	{
		if ( this.files && this.files[0] )
    		{
//        alert("in");
    			var reader= new FileReader();
    			reader.onload = function(e)
    				{
    				document.getElementById("img").src = e.target.result;
    				};     
    			reader.readAsDataURL( this.files[0] );
    		}
};
//document.getElementById("image").addEventListener("change", readImage,false);

$scope.show1=function()
{
	document.getElementById("img").src = "assets/defdp.png";
};


	$scope.mapFocus = function(){
		$scope.form.map = "";
		var selectedCity = document.getElementById("city").value;
		var street = document.getElementById("street").value;
		var area = document.getElementById("area").value;
		$scope.selecCity = selectedCity.split(":");		
		$scope.form.map = street + "," + area + "," + $scope.selecCity[1];	
		document.getElementById("pac-input").focus();
	};
	
	
	$scope.focusText = function(id){
		if(id == "fb")
			document.getElementById("fb").value = "www.facebook.com/";
		else if(id == "twitter")
			document.getElementById("twitter").value = "www.twitter.com/";
		else if(id == "youtube")
			document.getElementById("youtube").value = "www.youtube.com/";
	};
	

	(function (exports) {
	    function valOrFunction(val, ctx, args) {
	        if (typeof val == "function") {
	            return val.apply(ctx, args);
	        } else {
	            return val;
	        }
	    }
	    
	    
	    function InvalidHelper(input, options) {
	            if (input.value == "") {
	                input.setCustomValidity(valOrFunction(options.emptyText, window, [input]));
	            } else {
	                input.setCustomValidity("");
	            }
	    }
	    exports.InvalidHelper = InvalidHelper;
	})(window);
	
	
	(function (exports) {
	    function valOrFunction(val, ctx, args) {
	        if (typeof val == "function") {
	            return val.apply(ctx, args);
	        } else {
	            return val;
	        }
	    }

	    function InvalidInputHelper(input, options) {
	        input.setCustomValidity(valOrFunction(options.defaultText, window, [input]));

	        function changeOrInput() {
	            if (input.value == "") {
	                input.setCustomValidity(valOrFunction(options.emptyText, window, [input]));
	            } else {
	                input.setCustomValidity("");
	            }
	        }

	        function invalid() {
	            if (input.value == "") {
	                input.setCustomValidity(valOrFunction(options.emptyText, window, [input]));
	            } else {
	               input.setCustomValidity(valOrFunction(options.invalidText, window, [input]));
	            }
	        }

	        input.addEventListener("change", changeOrInput);
	        input.addEventListener("input", changeOrInput);
	        input.addEventListener("ng-invalid", invalid);
	    }
	    exports.InvalidInputHelper = InvalidInputHelper;
	})(window);


	var count = 1;
	
	$scope.addBusiness = function(){
		InvalidHelper(document.getElementById("company_name"), {
		    defaultText: "Please enter your company name!",
		    emptyText: "Please enter your company name!!",		   
		});
		InvalidHelper(document.getElementById("street"), {
		    defaultText: "Please enter street name!",
		    emptyText: "Please enter street name!",
		});
		InvalidHelper(document.getElementById("area"), {
		    defaultText: "Please enter area name!",
		    emptyText: "Please enter area name!",
		});
		InvalidHelper(document.getElementById("zip"), {
		    defaultText: "Please enter zip code!",
		    emptyText: "Please enter zip code!",
		});		
		InvalidHelper(document.getElementById("mobile"), {			
		    defaultText: "Please enter mobile number!",
		    emptyText: "Please enter mobile number!",
		    invalidText: function (input) {
		        return 'Please enter a valid mobile number!';
		    }
		});
		InvalidHelper(document.getElementById("email"), {
		    defaultText: "Please enter an email address!",
		    emptyText: "Please enter an email address!",
		    invalidText: function (input) {
		        return 'The email address "' + input.value + '" is invalid!';
		    }
		});
		InvalidHelper(document.getElementById("short_desc"), {
		    defaultText: "Please enter a short description!",
		    emptyText: "Please enter a short description!",
		});
		if($scope.showImage != true){
			document.getElementById("fileInput").setCustomValidity("Please upload Display Picture!");
		}
		else if($scope.form.sub_category.length <=3){
			document.getElementById("fileInput").setCustomValidity("");
		$http.get("api/business/newbusiness")
		.success(function(response){
			count = response.length;
			count++;
			var photos = "";
			photos = photos.concat($scope.myCroppedImage);
			photos = photos.concat("-");
			photos = photos.concat($scope.iconDataURL);
		$scope.isProducts = "NA";
		if($scope.form.products.length != 0)
			$scope.isProducts = "yes";

			var data = 
			{
			MAIN_CATEGORY : $scope.form.main_category,
			SUB_CATEGORY1 : $scope.form.sub_category[0].text,
			SUB_CATEGORY2 : angular.isUndefined($scope.form.sub_category[1]) ? "NA" : $scope.form.sub_category[1].text,
			SUB_CATEGORY3 : angular.isUndefined($scope.form.sub_category[2]) ? "NA" : $scope.form.sub_category[2].text,
			OTHER_CATEGORY1 : angular.isUndefined($scope.form.other_category[0]) ? "NA" : $scope.form.other_category[0].text,
			OTHER_CATEGORY2 : angular.isUndefined($scope.form.other_category[1]) ? "NA" : $scope.form.other_category[1].text,
			OTHER_CATEGORY3 : angular.isUndefined($scope.form.other_category[2]) ? "NA" : $scope.form.other_category[2].text,
			COMPANY_NAME : $scope.form.company_name,
			STREET : $scope.form.street,
			AREA : $scope.form.area,
			STATE_NAME : $scope.form.state,
			CITY : $scope.selecCity[1],
			ZIP : $scope.form.zip,
			LANDMARK : angular.isUndefined($scope.form.landmark) ? "NA" : $scope.form.landmark,
			PHONE_NO : angular.isUndefined($scope.form.phone) ? "NA" : $scope.form.phone,
			MOBILE_NO : $scope.form.mobile,
			EMAIL : $scope.form.email,
			WEBSITE : angular.isUndefined($scope.form.website) ? "NA" : $scope.form.website,
			EMPLOYEES : angular.isUndefined($scope.form.employee) ? "0" : $scope.form.employee,
			YEAR_ESTABLISHED : angular.isUndefined($scope.form.year_established) ? "0" : $scope.form.year_established,
			FREE_PARKING : $scope.checkboxValue("free_parking"),
			CARDS_ACCEPTED : $scope.checkboxValue("cards_accepted"),
			WIFI : $scope.checkboxValue("wifi"),
			AIR_CONDITION : $scope.checkboxValue("ac"),
			RESERVATION : $scope.checkboxValue("reservation"),
			TEAM_BUILDING : $scope.checkboxValue("team_building"),
			PLACES_TO_SEAT : $scope.checkboxValue("place_to_seat"),
			WINERY : $scope.checkboxValue("winery"),
			DRAFT_BEER : $scope.checkboxValue("draft_beer"),
			LCD : $scope.checkboxValue("lcd"),
			SALOON : $scope.checkboxValue("saloon"),
			FREE_ACCESS : $scope.checkboxValue("free_access"),
			TERRACE : $scope.checkboxValue("terrace"),
			MINI_GOLF : $scope.checkboxValue("mini_golf"),
			NIGHT_BAR : $scope.checkboxValue("night_bar"),
			PARTY_HALL : $scope.checkboxValue("party_hall"),
			SHORT_DESC : $scope.form.short_desc,
			DESCRIPTION : angular.isUndefined($scope.form.description) ? "NA" : $scope.form.description,
			PRODUCTS : $scope.isProducts,
			SERVICES : angular.isUndefined($scope.form.serv_prods) ? "NA" : $scope.form.serv_prods,
			MONDAY_OPEN : angular.isUndefined($scope.form.mon_open) ? "NA" : $scope.form.mon_open,
			MONDAY_CLOSE : angular.isUndefined($scope.form.mon_close) ? "NA" : $scope.form.mon_close,
			TUESDAY_OPEN : angular.isUndefined($scope.form.tues_open) ? "NA" : $scope.form.tues_open,
			TUESDAY_CLOSE : angular.isUndefined($scope.form.tues_close) ? "NA" : $scope.form.tues_close,
			WEDNESDAY_OPEN : angular.isUndefined($scope.form.wed_open) ? "NA" : $scope.form.wed_open,
			WEDNESDAY_CLOSE : angular.isUndefined($scope.form.wed_close) ? "NA" : $scope.form.wed_close,
			THURSDAY_OPEN : angular.isUndefined($scope.form.thurs_open) ? "NA" : $scope.form.thurs_open,
			THURSDAY_CLOSE : angular.isUndefined($scope.form.thurs_close) ? "NA" : $scope.form.thurs_close,
			FRIDAY_OPEN : angular.isUndefined($scope.form.fri_open) ? "NA" : $scope.form.fri_open,
			FRIDAY_CLOSE : angular.isUndefined($scope.form.fri_close) ? "NA" : $scope.form.fri_close,
			SATURDAY_OPEN : angular.isUndefined($scope.form.sat_open) ? "NA" : $scope.form.sat_open,
			SATURDAY_CLOSE : angular.isUndefined($scope.form.sat_close) ? "NA" : $scope.form.sat_close,
			SUNDAY_OPEN : angular.isUndefined($scope.form.sun_open) ? "NA" : $scope.form.sun_open,
			SUNDAY_CLOSE : angular.isUndefined($scope.form.sun_close) ? "NA" : $scope.form.sun_close,
			PHOTO : photos,
			FACEBOOK : $scope.form.facebook == "www.facebook.com/" ? "NA" : $scope.form.facebook,
			TWITTER : $scope.form.twitter == "www.twitter.com/" ? "NA" : $scope.form.twitter,
			GOOGLE_PLUS : angular.isUndefined($scope.form.google_plus) ? "NA" : $scope.form.google_plus,
			VIDEO : $scope.form.video == "www.youtube.com/" ? "NA" : $scope.form.video,
			BLOG : angular.isUndefined($scope.form.blog) ? "NA" : $scope.form.blog,
			SNO : count
			};		
			$http.post("api/business/", data)
			.success(function(data){
				for(var i=0; i<$scope.form.products.length; i++){
					var input = {
							COMPANY_NAME : $scope.form.company_name,
							AREA : $scope.form.area,
							CITY : $scope.selecCity[1],
							PRODUCT_NAME : $scope.form.products[i].text
					}
					$http.post("api/business/businessproducts", input)
//					.success(function(data){
//						alert("done");
//					});
				}
				var data1 = {
						SNO : count,
						IMAGES : output
				};
				$http.post("api/business/addbusiness_images", data1)
				.success(function(data){
					alert("Your Business added successfully");
				})
				.error(function(data){
					alert("Error..");
				});
				
			});			
		});
	}
		else{
			document.getElementById("fileInput").setCustomValidity("");
			alert("Only 3 Sub categories allowed..!!");
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

			$http.get("api/business/newbusiness")
	 		.success(function(data){
	 			$scope.allDetails = [];
	 			for(var i=0; i<data.length;){
	 				$scope.allDetails.pushIfNotExist(data[i].sub_category1, function(e) { 
	 		 		    return e === data[i].sub_category1; 
	 		 		});
//	 				i++;
	 			if(!angular.isUndefined(data[i]))
	 			if(data[i].sub_category2 != "NA"){
	 				$scope.allDetails.pushIfNotExist(data[i].sub_category2, function(e) { 
	 		 		    return e === data[i].sub_category2; 
	 		 		});
//	 				i++;
	 			}
	 			if(!angular.isUndefined(data[i]))
	 			if(data[i].sub_category3 != "NA"){
	 				$scope.allDetails.pushIfNotExist(data[i].sub_category3, function(e) { 
	 		 		    return e === data[i].sub_category3; 
	 		 		});
//	 				i++;
	 			}
	 			i++;
	 			}
			    });
 }]);