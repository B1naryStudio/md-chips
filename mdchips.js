angular.module('mdChipsApp', []).
	controller('MainController', function($scope){
		$scope.itemsCollection = [{
			url: '1.jpg',
			title: 'John Smith',
			description: 'john@gmail.com',
			items: [{description: 'john2@gmail.com', url: '2.jpg'}]
		}, {
			url: '2.jpg',
			title: 'Amy Adams',
			description: 'amy@gmail.com',
			items: [{description: 'amy2@gmail.com'}]
		},{
			url: '3.jpg',
			title: 'Earl Grey',
			description: 'john@gmail.com',
			items: []
		},{
			url: '3.jpg',
			title: 'Sam Uel ',
			description: 'sammy@gmail.com'
		}];

		$scope.selectedUsers = [];
	})
	.directive('mdChips', ['$compile','$timeout', '$document', function($compile, $timeout, $document){
		
		return {
			restrict: 'E',
			replace:true,
			template: '<div class="md-chips"> \
							<div class="chips-input-field"> \
								<div class="input-chips-elements"> \
									<div ng-repeat="chips in ngModel track by $index" class="chips-mini-item"> \
										<div class="chips-mini" ng-click="showMore($index, $event)"> \
											<div class="chips-mini-img"> \
												<img ng-src="{{chips.url}}" /> \
											</div> \
											<div class="chips-mini-title">{{chips.title}}</div> \
										</div> \
									</div> \
									<div class="chips-active" ng-style="{top: ytop}" ng-model="ytop" ng-click="closeActive($event)"></div> \
									<input type="text" ng-model="chipsText.title" ng-focus="clearActive()" ng-keydown="clearPrev($event)" class="chipsInput"/> \
								</div> \
							</div> \
						</div>',
			require: '?ngModel',
			scope: {
				collection: '=',
				ngModel: '=',
				text: '@',
				mdItem: '@',
				mdTitle: '@',
				mdThumbnail: '@',
				mdSubtitle: '@'
			},
			link: function (scope, element, attrs) {
				scope.ytop = '10px';
				element.bind('input', function(event) {
					var self = scope;
					if (event.target.value) {
						scope.$apply(function(){
							var	list = angular.element("<div id='chips-list' ng-show='true'> \
															<div ng-repeat='item in collection | filter:chipsText' class='chips-list-item' ng-click=addToInput(item)> \
																<div class='chips-item-wrapper'> \
																	<div class='chips-image'> \
																		<img ng-src='{{item.url}}'> \
																	</div> \
																	<span class='chips-title'>{{item.title}}</span> \
																	<p class='chips-description'>{{item.description}}</p> \
																</div> \
															</div> \
														</div>");
							$compile(list)(scope);	
							$timeout(function() {
								self.removeList();
								element.append(list);
							});
							
						});
					} else {
						self.removeList();
					}
				});

				$document.bind('click', function(evt){
					var chipsActive = element[0].querySelector('.chips-active');
					if (chipsActive.hasChildNodes()){
						while (chipsActive.firstChild) {
					    	chipsActive.removeChild(chipsActive.firstChild);
						}
					}
				});

				element.bind('click', function(evt){
					evt.stopPropagation();
				});

				scope.removeList = function(){
					var chipsList = element[0].querySelector('#chips-list');
					if (chipsList) {
						chipsList.remove();
					}
				};

				scope.addToInput = function(item){
					console.log(element);
					this.ngModel.push(JSON.parse(JSON.stringify(item)));
					this.chipsText.title = '';
					this.removeList();
				};

				scope.showMore = function(index, event){
					scope.ytop = event.currentTarget.offsetTop + 'px';
					var item = scope.ngModel[index],
						chipsActive = element[0].querySelector('.chips-active'),
						html = '<div id ="chips-active-list"><div class="chips-active-main">  \
									<div class="chips-active-img"> \
										<img src=' + item[scope.mdThumbnail] + ' /> \
									</div> \
									<div class="boxclose" id="boxclose" ng-click=deleteChips(' + index + ')><a></a></div> \
									<div class="chips-active-wrap"> \
										<div class="chips-active-title">' + item[scope.mdTitle] + '</div> \
										<p class="chips-active-description">' + item[scope.mdSubtitle] + '</p> \
									</div> \
								</div>';
					if (item[scope.mdItem] && item[scope.mdItem].length > 0){
						for(var i=0; i < item[scope.mdItem].length; i++){
							var url = item[scope.mdThumbnail];
							if (item[scope.mdItem][i][scope.mdThumbnail]){
								url = item[scope.mdItem][i][scope.mdThumbnail];
							}

							html += '<div class="md-chips-single-line" ng-click=setOtherEmail(' + index + ',"'+url+'","' + item[scope.mdItem][i][scope.mdSubtitle] + '",' + i + ')>  \
									<div class="chips-active-img"> \
										<img src=' + url + ' /> \
									</div> \
									<div class="chips-active-wrap"> \
										<p class="chips-active-description-only">' + item[scope.mdItem][i][scope.mdSubtitle] + '</p> \
									</div> \
								</div>';
						}
					}
					html+='</div>';
					var chips = angular.element(html);
					if (chipsActive.hasChildNodes()){
						while (chipsActive.firstChild) {
					    	chipsActive.removeChild(chipsActive.firstChild);
						}
					}
					$compile(chips)(scope);
					if (element[0].querySelector('#chips-list')){
						this.chipsText.title = ''; 
						element[0].querySelector('#chips-list').remove();
					}
					chipsActive.appendChild(chips[0]);

				};

				scope.deleteChips = function(index){
					console.log("Ho", index);
					scope.ngModel.splice(index,1);
					var chipsActive = element[0].querySelector('.chips-active');
					while (chipsActive.firstChild) {
					    chipsActive.removeChild(chipsActive.firstChild);
					}
				};

				scope.clearPrev = function(event){
					if(event.keyCode === 8 && event.target.value === '' && scope.ngModel.length !== 0){
						scope.ngModel.pop();
					}
					return true;
				};

				scope.closeActive = function(event){
					if (event.currentTarget.hasChildNodes()){
						while (event.currentTarget.firstChild) {
					   		event.currentTarget.removeChild(event.currentTarget.firstChild);
						}
					}
				};

				scope.clearActive = function(){
					var chipsActive = element[0].querySelector('.chips-active');
					while (chipsActive.firstChild) {
					    chipsActive.removeChild(chipsActive.firstChild);
					}
				};

				scope.setOtherEmail = function(index, url, email,i){
					var old = {};
					old.url = this.ngModel[index][scope.mdThumbnail];
					old.subtitle = this.ngModel[index][scope.mdSubtitle];
					this.ngModel[index][scope.mdThumbnail] = url;
					this.ngModel[index][scope.mdSubtitle]  = email;
					this.ngModel[index][scope.mdItem][i][scope.mdSubtitle] = old.subtitle;
					this.ngModel[index][scope.mdItem][i][scope.mdThumbnail] = old.url;
				};


			}
		}

	}]);

	// <div class="list-item"><span>{{}}</span><div>