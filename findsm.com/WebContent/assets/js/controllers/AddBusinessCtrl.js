angular.module('PropelApp')
	.controller("AddBusinessCtrl", ['$scope', '$http', '$location', 'itemService', 'editService', function($scope, $http, $location, itemService, editService){	
		document.getElementById("page-canvas").style.display = "none";
		document.getElementById("page-footer").style.display = "none";
		document.getElementById("sidebar_main").style.display = "none";
		document.getElementById("brown").disabled = true;
		$scope.form = {};
		$scope.form.sub_category = [];
		$scope.form.other_category = [];
		$scope.form.products = [];
		$scope.form.services = [];
		$scope.businessImages = [];
		$scope.currentBusiness = [];
		$scope.currentBusinessProducts = [];
		$scope.currentBusinessServices = [];	
		
		var editMode = editService.getMode();
		if(editMode == "edit"){
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
			for(var i=0; i<$scope.currentBusinessProducts.length; i++)
				$scope.form.products.push({text : $scope.currentBusinessProducts[i].product_name});
			
			for(var i=0; i<$scope.currentBusinessServices.length; i++)
				$scope.form.services.push({text : $scope.currentBusinessServices[i].service_name});
			
			$scope.businessImages = [];
			if(angular.isDefined($scope.currentBusinessImages))
			for(var i=0; i<$scope.currentBusinessImages.length-1; i++){
				$scope.businessImages.push({image : $scope.currentBusinessImages[i]});
				$("#previewImg").append("<li><span id='close'>x</span><img class='img_medium' style='padding:10px;' src='" + $scope.businessImages[i].image + "'></li>")
				test($scope.businessImages[i].image);
			}
			
			$scope.form.business_name = $scope.currentBusiness.business_name;
			$scope.form.main_category = $scope.currentBusiness.main_category;
			$scope.form.description = $scope.currentBusiness.description;
			$scope.form.short_desc = $scope.currentBusiness.short_desc;
			$scope.form.phone = $scope.currentBusiness.phone;
			$scope.form.mobile = $scope.currentBusiness.mobile;
			$scope.form.email = $scope.currentBusiness.email;
			$scope.form.website = $scope.currentBusiness.website;
			$scope.form.facebook = $scope.currentBusiness.facebook;
			$scope.form.twitter = $scope.currentBusiness.twitter;
			$scope.form.linkedin = $scope.currentBusiness.linkedin;
			$scope.form.google_plus = $scope.currentBusiness.google_plus;
			$scope.form.street = $scope.currentBusiness.street;
			$scope.form.area = $scope.currentBusiness.area;
			$scope.form.state_name = $scope.currentBusiness.state_name;
			$scope.form.city = $scope.currentBusiness.city;
			$scope.form.zip = $scope.currentBusiness.zip;
			$scope.form.landmark = $scope.currentBusiness.landmark;
			$scope.form.monday_open = $scope.currentBusiness.monday_open;
			$scope.form.monday_close = $scope.currentBusiness.monday_close;
			$scope.form.tuesday_open = $scope.currentBusiness.tuesday_open;
			$scope.form.tuesday_close = $scope.currentBusiness.tuesday_close;
			$scope.form.wednesday_open = $scope.currentBusiness.wednesday_open;
			$scope.form.wednesday_close = $scope.currentBusiness.wednesday_close;
			$scope.form.thursday_open = $scope.currentBusiness.thursday_open;
			$scope.form.thursday_close = $scope.currentBusiness.thursday_close;
			$scope.form.friday_open = $scope.currentBusiness.friday_open;
			$scope.form.friday_close = $scope.currentBusiness.friday_close;
			$scope.form.saturday_open = $scope.currentBusiness.saturday_open;
			$scope.form.saturday_close = $scope.currentBusiness.saturday_close;
			$scope.form.sunday_open = $scope.currentBusiness.sunday_open;
			$scope.form.sunday_close = $scope.currentBusiness.sunday_close;
			$scope.form.user_role = $scope.currentBusiness.user_role;
			document.getElementById("business_logo").src = $scope.currentBusiness.logo;
			document.getElementById("dpimg").src = $scope.currentBusiness.dp;
			document.getElementById("user_edit_active").checked = $scope.currentBusiness.active;
			if(angular.isDefined($scope.currentBusiness.sub_category1) && $scope.currentBusiness.sub_category1 != "NA")
				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category1});
			if(angular.isDefined($scope.currentBusiness.sub_category2) && $scope.currentBusiness.sub_category2 != "NA")
				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category2});
			if(angular.isDefined($scope.currentBusiness.sub_category3) && $scope.currentBusiness.sub_category3 != "NA")
				$scope.form.sub_category.push({text : $scope.currentBusiness.sub_category3});
			if(angular.isDefined($scope.currentBusiness.other_category1) && $scope.currentBusiness.other_category1 != "NA")
				$scope.form.other_category.push({text : $scope.currentBusiness.other_category1});
			if(angular.isDefined($scope.currentBusiness.other_category2) && $scope.currentBusiness.other_category2 != "NA")
				$scope.form.other_category.push({text : $scope.currentBusiness.other_category2});
			if(angular.isDefined($scope.currentBusiness.other_category3) && $scope.currentBusiness.other_category3 != "NA")
				$scope.form.other_category.push({text : $scope.currentBusiness.other_category3});
			if(angular.isDefined($scope.currentBusiness.other_category3) && $scope.currentBusiness.other_category3 != "NA")
				$scope.form.other_category.push({text : $scope.currentBusiness.other_category3});
		}
		
		$scope.subcategoryList = [];
		$scope.test = function(){
			$scope.subList = [];
			for(var i=0; i<$scope.subcategoryList.length; i++){
				$scope.subList.push($scope.subcategoryList[i].sub_category);
			}
			$scope.businesServices= [
				                       "Advertising",
				                       "Consulting",
				                       "Event Management",
				                       "Graphic Design",
				                       "Marketing"
				                       ];
		}
		
		$scope.featured = function(){
			
		}
		
		$scope.userRole = [{role_name : "Super Admin"},{role_name : "Admin"}, {role_name : "User"}];
		
		$scope.main_category = [{name : "Arts and Entertainment"},{name : "Automotive"},{name : "Business and Professional Services"},{name : "Construction and Contractors"},{name : "Clothing and Accessories"},{name : "Computers and Electronics"},{name : "Education"},{name : "Food and Dining"},{name : "Home and Garden"},{name : "Health and Medicine"},{name : "Industry and Agriculture"},{name : "Legal and Financial"},{name : "Media Communication"},{name : "Non - classifiable Establishment"},{name : "Personal Care and Services"},{name : "Real Estate"},{name : "Shopping"},{name : "Sports and Creation"},{name : "Travel and Transportation"}];
		
		$scope.timings = [{time : "12:00 AM"},{time : "01:00 AM"},{time : "02:00 AM"},{time : "03:00 AM"},{time : "04:00AM" },{time : "05:00 AM"},{time : "06:00 AM"},{time : "07:00 AM"},{time : "08:00 AM"},{time : "09:00 AM"},
		                  {time : "10:00 AM"},{time : "11:00 AM"},{time : "12:00 PM"},{time : "01:00 PM"},{time : "02:00 PM"},{time : "03:00 PM"},{time : "04:00 PM"},{time : "05:00 PM"},{time : "06:00 PM"},{time : "07:00 PM"},{time : "08:00 PM"},{time : "09:00 PM"},{time : "10:00 PM"},{time : "11:00 PM"}];
		
		
		function el(id){return document.getElementById(id);}
		
//		$scope.iconDataURL = '';
		var readLogoImage = function() {
		    if ( this.files && this.files[0] ) {
		        var FR= new FileReader();
		        FR.onload = function(e) {
		             el("business_logo").src = e.target.result;
		             $scope.iconDataURL = e.target.result;
		        };       
		        FR.readAsDataURL( this.files[0] );
		    }
		};
		
//		$scope.galImgUrl = '';
		var output = "";
		function test(result){
			output = output.concat(result);
//			$scope.galImgUrl.push(result);
			output = output.concat("-");
		};
		
		window.preview = function (input) {
		    if (input.files && input.files[0]) {
		        $(input.files).each(function () {
		            var reader = new FileReader();
		            reader.readAsDataURL(this);
		            reader.onload = function (e) {
		                $("#previewImg").append("<li><img class='img_medium' style='padding:10px;' src='" + e.target.result + "'></li>")
		                test(e.target.result);
		            };
		        });
		    }
		};
		
//		$scope.uploadedImage = "assets/icons/Please_Wait.jpg";
		window.featured = function (input) {
		    if (input.files && input.files[0]) {
		        $(input.files).each(function () {
		            var reader = new FileReader();
		            reader.readAsDataURL(this);
		            reader.onload = function (e) {
		            	var uploadedImage =  e.target.result;
		            	document.getElementById('uploaded').src = e.target.result;
		            	init();
		            };
		        });
		    }
		};
		
		
		$scope.getSubcategory = function(){
			$http.get("api/business/subcategoryitem?category="+$scope.form.main_category)
			.success(function(data){
				$scope.subcategoryList = data;
			})
		};
		
		$scope.overflow = function(){
//			document.getElementById("htmldiv").className += " uk-modal-page";
			document.getElementById("modal_overflow").className += " uk-open";
			document.getElementById("modal_overflow").style.display = "block";
		}
		
		$scope.cancel = function(){
			document.getElementById("modal_overflow").className = document.getElementById("modal_overflow").className.replace( /(?:^|\s)uk-open(?!\S)/g , '' )
//    		document.getElementById("htmldiv").className = document.getElementById("htmldiv").className.replace( /(?:^|\s)uk-modal-page(?!\S)/g , '' )
    		document.getElementById("modal_overflow").style.display = "none";
    		var overflow = document.getElementById("modal_overflow");
    		overflow.setAttribute("aria-hidden", "true");
		}
		
		el("user_edit_avatar_control").addEventListener("change", readLogoImage, false);

		"use strict";
		(function (factory) {
		    if (typeof define === 'function' && define.amd) {
		        define(['jquery'], factory);
		    } else {
		        factory(jQuery);
		    }
		}(function ($) {
		    var cropbox = function(options, el){
		        var el = el || $(options.imageBox),
		            obj =
		            {
		                state : {},
		                ratio : 1,
		                options : options,
		                imageBox : el,
		                thumbBox : el.find(options.thumbBox),
		                spinner : el.find(options.spinner),
		                image : new Image(),
		                getDataURL: function ()
		                {
		                    var width = this.thumbBox.width(),
		                        height = this.thumbBox.height(),
		                        canvas = document.createElement("canvas"),
		                        dim = el.css('background-position').split(' '),
		                        size = el.css('background-size').split(' '),
		                        dx = parseInt(dim[0]) - el.width()/2 + width/2,
		                        dy = parseInt(dim[1]) - el.height()/2 + height/2,
		                        dw = parseInt(size[0]),
		                        dh = parseInt(size[1]),
		                        sh = parseInt(this.image.height),
		                        sw = parseInt(this.image.width);

		                    canvas.width = width;
		                    canvas.height = height;
		                    var context = canvas.getContext("2d");
		                    context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
		                    var imageData = canvas.toDataURL('image/png');
		                    $scope.imgUrl = imageData;
		            		document.getElementById("dpimg").src = $scope.imgUrl;
		            		document.getElementById("modal_overflow").className = document.getElementById("modal_overflow").className.replace( /(?:^|\s)uk-open(?!\S)/g , '' )
		            		document.getElementById("htmldiv").className = document.getElementById("htmldiv").className.replace( /(?:^|\s)uk-modal-page(?!\S)/g , '' )
		            		document.getElementById("modal_overflow").style.display = "none";
		            		var overflow = document.getElementById("modal_overflow");
		            		overflow.setAttribute("aria-hidden", "true");
		                    return imageData;
		                },
		                getBlob: function()
		                {
		                    var imageData = this.getDataURL();
		                    var b64 = imageData.replace('data:image/png;base64,','');
		                    var binary = atob(b64);
		                    var array = [];
		                    for (var i = 0; i < binary.length; i++) {
		                        array.push(binary.charCodeAt(i));
		                    }
		                    return  new Blob([new Uint8Array(array)], {type: 'image/png'});
		                },
		                zoomIn: function ()
		                {
		                    this.ratio*=1.1;
		                    setBackground();
		                },
		                zoomOut: function ()
		                {
		                    this.ratio*=0.9;
		                    setBackground();
		                }
		            },
		            setBackground = function()
		            {
		                var w =  parseInt(obj.image.width)*obj.ratio;
		                var h =  parseInt(obj.image.height)*obj.ratio;

		                var pw = (el.width() - w) / 2;
		                var ph = (el.height() - h) / 2;

		                el.css({
		                    'background-image': 'url(' + obj.image.src + ')',
		                    'background-size': w +'px ' + h + 'px',
		                    'background-position': pw + 'px ' + ph + 'px',
		                    'background-repeat': 'no-repeat'});
		            },
		            imgMouseDown = function(e)
		            {
		                e.stopImmediatePropagation();

		                obj.state.dragable = true;
		                obj.state.mouseX = e.clientX;
		                obj.state.mouseY = e.clientY;
		            },
		            imgMouseMove = function(e)
		            {
		                e.stopImmediatePropagation();

		                if (obj.state.dragable)
		                {
		                    var x = e.clientX - obj.state.mouseX;
		                    var y = e.clientY - obj.state.mouseY;

		                    var bg = el.css('background-position').split(' ');

		                    var bgX = x + parseInt(bg[0]);
		                    var bgY = y + parseInt(bg[1]);

		                    el.css('background-position', bgX +'px ' + bgY + 'px');

		                    obj.state.mouseX = e.clientX;
		                    obj.state.mouseY = e.clientY;
		                }
		            },
		            imgMouseUp = function(e)
		            {
		                e.stopImmediatePropagation();
		                obj.state.dragable = false;
		            },
		            zoomImage = function(e)
		            {
		                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio*=1.1 : obj.ratio*=0.9;
		                setBackground();
		            }

		        obj.spinner.show();
		        obj.image.onload = function() {
		            obj.spinner.hide();
		            setBackground();

		            el.bind('mousedown', imgMouseDown);
		            el.bind('mousemove', imgMouseMove);
		            $(window).bind('mouseup', imgMouseUp);
		            el.bind('mousewheel DOMMouseScroll', zoomImage);
		        };
		        obj.image.src = options.imgSrc;
		        el.on('remove', function(){$(window).unbind('mouseup', imgMouseUp)});

		        return obj;
		    };

		    jQuery.fn.cropbox = function(options){
		        return new cropbox(options, this);
		    };
		}));
		
		$scope.mode = function(){
			if(editService.getMode() == "edit"){
				$http.delete("api/business/deletebusiness?business_name="+item.name+"&area="+item.area+"&city="+item.city)
				.success(function(){
					$http.delete("api/business/deleteimages?business_name="+item.name+"&area="+item.area+"&city="+item.city)
					.success(function(){
						$http.delete("api/business/deleteproducts?business_name="+item.name+"&area="+item.area+"&city="+item.city)
						.success(function(){
							$http.delete("api/business/deleteservices?business_name="+item.name+"&area="+item.area+"&city="+item.city)
							.success(function(){
								$scope.saveItem();
							})
						})
					})
				})
			}
			else{
				$scope.saveItem();
			}				
		};
		
//		$scope.currentBusiness = '';
		var business;
		$scope.saveItem = function(){
			business = 
			{
			BUSINESS_NAME : $scope.form.business_name,
			MAIN_CATEGORY : $scope.form.main_category,
			SUB_CATEGORY1 : angular.isUndefined($scope.form.sub_category[0]) ? "NA" : $scope.form.sub_category[0].text,
			SUB_CATEGORY2 : angular.isUndefined($scope.form.sub_category[1]) ? "NA" : $scope.form.sub_category[1].text,			
			SUB_CATEGORY3 : angular.isUndefined($scope.form.sub_category[2]) ? "NA" : $scope.form.sub_category[2].text,
			OTHER_CATEGORY1 : angular.isUndefined($scope.form.other_category[0]) ? "NA" : $scope.form.other_category[0].text,
			OTHER_CATEGORY2 : angular.isUndefined($scope.form.other_category[1]) ? "NA" : $scope.form.other_category[1].text,
			OTHER_CATEGORY3 : angular.isUndefined($scope.form.other_category[2]) ? "NA" : $scope.form.other_category[2].text,
			DESCRIPTION : angular.isUndefined($scope.form.description) ? "NA" : $scope.form.description,
			SHORT_DESC : $scope.form.short_desc,
			PHONE : angular.isUndefined($scope.form.phone) ? "NA" : $scope.form.phone,
			MOBILE : $scope.form.mobile,
			EMAIL : $scope.form.email,
			WEBSITE : angular.isUndefined($scope.form.website) ? "NA" : $scope.form.website,
			FACEBOOK : $scope.form.facebook == "www.facebook.com/" ? "NA" : $scope.form.facebook,
			TWITTER : $scope.form.twitter == "www.twitter.com/" ? "NA" : $scope.form.twitter,
			GOOGLE_PLUS : angular.isUndefined($scope.form.google_plus) ? "NA" : $scope.form.google_plus,
			LINKEDIN : angular.isUndefined($scope.form.linkedin) ? "NA" : $scope.form.linkedin,
			STREET : $scope.form.street,
			AREA : $scope.form.area,
			STATE_NAME : $scope.form.state_name,
			CITY : $scope.form.city,
			ZIP : $scope.form.zip,
			LANDMARK : angular.isUndefined($scope.form.landmark) ? "NA" : $scope.form.landmark,
			PHOTO : document.getElementById("dpimg").src + "-" + document.getElementById("business_logo").src,
			MONDAY_OPEN : angular.isUndefined($scope.form.monday_open) ? "NA" : $scope.form.monday_open,
			MONDAY_CLOSE : angular.isUndefined($scope.form.monday_close) ? "NA" : $scope.form.monday_close,
			TUESDAY_OPEN : angular.isUndefined($scope.form.tuesday_open) ? "NA" : $scope.form.tuesday_open,
			TUESDAY_CLOSE : angular.isUndefined($scope.form.tuesday_close) ? "NA" : $scope.form.tuesday_close,
			WEDNESDAY_OPEN : angular.isUndefined($scope.form.wednesday_open) ? "NA" : $scope.form.wednesday_open,
			WEDNESDAY_CLOSE : angular.isUndefined($scope.form.wednesday_close) ? "NA" : $scope.form.wednesday_close,
			THURSDAY_OPEN : angular.isUndefined($scope.form.thursday_open) ? "NA" : $scope.form.thursday_open,
			THURSDAY_CLOSE : angular.isUndefined($scope.form.thursday_close) ? "NA" : $scope.form.thursday_close,
			FRIDAY_OPEN : angular.isUndefined($scope.form.friday_open) ? "NA" : $scope.form.friday_open,
			FRIDAY_CLOSE : angular.isUndefined($scope.form.friday_close) ? "NA" : $scope.form.friday_close,
			SATURDAY_OPEN : angular.isUndefined($scope.form.saturday_open) ? "NA" : $scope.form.saturday_open,
			SATURDAY_CLOSE : angular.isUndefined($scope.form.saturday_close) ? "NA" : $scope.form.saturday_close,
			SUNDAY_OPEN : angular.isUndefined($scope.form.sunday_open) ? "NA" : $scope.form.sunday_open,
			SUNDAY_CLOSE : angular.isUndefined($scope.form.sunday_close) ? "NA" : $scope.form.sunday_close,
			ACTIVE : document.getElementById("user_edit_active").checked,
			USER_ROLE : $scope.form.user_role,
			VERIFICATION : "Not verified"
			}
//			alert(business.photo);
			$scope.currentBusiness = business;
			if($location.search().companyName == undefined){
			$http.post("api/business/", business)
			.success(function(data){
				var data1 = {
						BUSINESS_NAME : $scope.form.business_name,
						AREA : $scope.form.area,
						CITY : $scope.form.city,
						IMAGES : output
				};
				$scope.currentBusinessImage = data1;
				$http.post("api/business/addbusiness_images", data1)
				.success(function(data){
					$scope.currentBusinessProducts = [];
					if($scope.form.products.length != 0){
						for(var i=0; i<$scope.form.products.length; i++){
							var input = {
									BUSINESS_NAME : $scope.form.business_name,
									AREA : $scope.form.area,
									CITY : $scope.form.city,
									PRODUCT_NAME : $scope.form.products[i].text
							}
							$scope.currentBusinessProducts.push(input);
							$http.post("api/business/businessproducts", input)
							.success(function(data){
								
							});
						}
					}
					$scope.currentBusinessServices = [];
					if($scope.form.services.length != 0){
						for(var i=0; i<$scope.form.services.length; i++){
							var input = {
									BUSINESS_NAME : $scope.form.business_name,
									AREA : $scope.form.area,
									CITY : $scope.form.city,
									SERVICE_NAME : $scope.form.services[i].text
							}
							$scope.currentBusinessServices.push(input);
							$http.post("api/business/businessservices", input)
							.success(function(data){
								
							});
						}
					}
					alert("Your Business added successfully");
				})
			});
			}
			else{
				if(angular.isDefined($scope.businessImages)){
					var existImages = ''; 
					for(var i=0; i<$scope.businessImages.length; i++){
						existImages = existImages.concat($scope.businessImages[i].image);
						existImages = existImages.concat("-");
					}
				}
				if(output != '')
					existImages = existImages.concat(output);
				$http.put("api/business/updatebusiness", business)
				.success(function(data){
					var data1 = {
							BUSINESS_NAME : $scope.form.business_name,
							AREA : $scope.form.area,
							CITY : $scope.form.city,
							IMAGES : existImages
					};
//					$scope.currentBusinessImages = output;
					$http.put("api/business/updatebusinessimages", data1)
					.success(function(data){
						$scope.currentBusinessProducts = [];
						if($scope.form.products.length != 0){
							for(var i=0; i<$scope.form.products.length; i++){
								var input = {
										BUSINESS_NAME : $location.search().companyName,
										AREA : $location.search().area,
										CITY : $location.search().city,
										PRODUCT_NAME : $scope.form.products[i].text
								}
								$scope.currentBusinessProducts.push(input);
								$http.put("api/business/updateproducts", input)
								.success(function(data){
									
								});
							}
						}
						$scope.currentBusinessService = [];
						if($scope.form.services.length != 0){
							for(var i=0; i<$scope.form.services.length; i++){
								var input = {
										BUSINESS_NAME : $location.search().companyName,
										AREA : $location.search().area,
										CITY : $location.search().city,
										SERVICE_NAME : $scope.form.services[i].text
								}
								$scope.currentBusinessServices.push(input);
								$http.put("api/business/updateservices", input)
								.success(function(data){
									
								});
							}
						}
						alert("Your Business updated successfully");
						location.reload();
					})
				});
			}
		};
}]);