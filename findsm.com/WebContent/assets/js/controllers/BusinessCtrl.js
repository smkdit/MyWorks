angular.module('PropelApp')
	.controller("BusinessCtrl", ['$scope', '$http', 'itemService', 'editService', function($scope, $http, itemService, editService){
		
		var item = itemService.getItem();
		
			$scope.companyName = item.name;
			$scope.area = item.area;
			$scope.city = item.city;
			$http.get("api/business/itemdetail?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
			.success(function(data){
				$scope.currentBusiness = data[0];
				$http.get("api/business/getproductsbybusinessname?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
				.success(function(data1){
					$scope.currentBusinessProducts = data1;
					$http.get("api/business/getservicesbybusinessname?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
					.success(function(data2){
						$scope.currentBusinessServices = data2;
						$http.get("api/business/itemimages?company_name="+$scope.companyName+"&area="+$scope.area+"&city="+$scope.city)
						.success(function(data3){
							$scope.images = data3[0];
							if(!angular.isUndefined(data3[0].images)){
							$scope.currentBusinessImages = data3[0].images.split('-');
							$scope.businessImages = [];
							if(angular.isDefined($scope.currentBusinessImages))
							for(var i=0; i<$scope.currentBusinessImages.length-1; i++)
								$scope.businessImages.push({image : $scope.currentBusinessImages[i]});
							}
							$scope.viewData();
						});
					});
				});
			});
		
		$scope.aboutClick = function(){
			document.getElementById('details').style.display = "block";
			document.getElementById('gallery').style.display = "none";
		}
		
		$scope.photoClick = function(){
			document.getElementById('details').style.display = "none";
			document.getElementById('gallery').style.display = "block";
		}
		
		$scope.editView = function(){
			editService.setMode("edit");
			itemService.setItem($scope.companyName, $scope.area, $scope.city);
			window.location.href = "#/editbusiness"
		}
		
		$scope.viewData = function(){
			$scope.images = $scope.currentBusiness.photo.split('-');
			if(angular.isDefined($scope.images[0]))
			$scope.currentBusiness.dp = $scope.images[0];
			if(angular.isDefined($scope.images[1]))
			$scope.currentBusiness.logo = $scope.images[1];
			if($scope.currentBusiness.logo != '' && angular.isDefined($scope.currentBusiness.logo))
				$scope.logo = true;
			else
				$scope.logo = false;
//			for(var i=0; i<$scope.currentBusinessProducts.length; i++)
//				$scope.form.products.push({text : $scope.currentBusinessProducts[i].product_name});
			
//			for(var i=0; i<$scope.currentBusinessServices.length; i++)
//				$scope.form.services.push({text : $scope.currentBusinessServices[i].service_name});
			
			$scope.businessImages = [];
			if(angular.isDefined($scope.currentBusinessImages))
			for(var i=0; i<$scope.currentBusinessImages.length-1; i++){
				$scope.businessImages.push({image : $scope.currentBusinessImages[i]});
				$("#previewImg").append("<li><span id='close'>x</span><img class='img_medium' style='padding:10px;' src='" + $scope.businessImages[i].image + "'></li>")
			}
			
//			$scope.form.business_name = $scope.currentBusiness.business_name;
//			$scope.form.main_category = $scope.currentBusiness.main_category;
//			$scope.form.description = $scope.currentBusiness.description;
//			$scope.form.short_desc = $scope.currentBusiness.short_desc;
//			$scope.form.phone = $scope.currentBusiness.phone;
//			$scope.form.mobile = $scope.currentBusiness.mobile;
//			$scope.form.email = $scope.currentBusiness.email;
//			$scope.form.website = $scope.currentBusiness.website;
//			$scope.form.facebook = $scope.currentBusiness.facebook;
//			$scope.form.twitter = $scope.currentBusiness.twitter;
//			$scope.form.linkedin = $scope.currentBusiness.linkedin;
//			$scope.form.google_plus = $scope.currentBusiness.google_plus;
//			$scope.form.street = $scope.currentBusiness.street;
//			$scope.form.area = $scope.currentBusiness.area;
//			$scope.form.state_name = $scope.currentBusiness.state_name;
//			$scope.form.city = $scope.currentBusiness.city;
//			$scope.form.zip = $scope.currentBusiness.zip;
//			$scope.form.landmark = $scope.currentBusiness.landmark;
//			$scope.form.monday_open = $scope.currentBusiness.monday_open;
//			$scope.form.monday_close = $scope.currentBusiness.monday_close;
//			$scope.form.tuesday_open = $scope.currentBusiness.tuesday_open;
//			$scope.form.tuesday_close = $scope.currentBusiness.tuesday_close;
//			$scope.form.wednesday_open = $scope.currentBusiness.wednesday_open;
//			$scope.form.wednesday_close = $scope.currentBusiness.wednesday_close;
//			$scope.form.thursday_open = $scope.currentBusiness.thursday_open;
//			$scope.form.thursday_close = $scope.currentBusiness.thursday_close;
//			$scope.form.friday_open = $scope.currentBusiness.friday_open;
//			$scope.form.friday_close = $scope.currentBusiness.friday_close;
//			$scope.form.saturday_open = $scope.currentBusiness.saturday_open;
//			$scope.form.saturday_close = $scope.currentBusiness.saturday_close;
//			$scope.form.sunday_open = $scope.currentBusiness.sunday_open;
//			$scope.form.sunday_close = $scope.currentBusiness.sunday_close;
//			$scope.form.user_role = $scope.currentBusiness.user_role;
//			document.getElementById("business_logo").src = $scope.currentBusiness.logo;
//			document.getElementById("dpimg").src = $scope.currentBusiness.dp;
//			document.getElementById("user_edit_active").checked = $scope.currentBusiness.active;
//			if(angular.isDefined($scope.currentBusiness.sub_category1) && $scope.currentBusiness.sub_category1 != "NA")
//				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category1});
//			if(angular.isDefined($scope.currentBusiness.sub_category2) && $scope.currentBusiness.sub_category2 != "NA")
//				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category2});
//			if(angular.isDefined($scope.currentBusiness.sub_category3) && $scope.currentBusiness.sub_category3 != "NA")
//				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category3});
//			if(angular.isDefined($scope.currentBusiness.other_category1) && $scope.currentBusiness.other_category1 != "NA")
//				$scope.form.other_category.push({text : $scope.currentBusiness.other_category1});
//			if(angular.isDefined($scope.currentBusiness.other_category2) && $scope.currentBusiness.other_category2 != "NA")
//				$scope.form.other_category.push({text : $scope.currentBusiness.other_category2});
//			if(angular.isDefined($scope.currentBusiness.other_category3) && $scope.currentBusiness.other_category3 != "NA")
//				$scope.form.other_category.push({text : $scope.currentBusiness.other_category3});
//			if(angular.isDefined($scope.currentBusiness.other_category3) && $scope.currentBusiness.other_category3 != "NA")
//				$scope.form.other_category.push({text : $scope.currentBusiness.other_category3});
		}
	}])