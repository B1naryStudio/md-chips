angular.module('mdChips', [])
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
												<img ng-src="{{chips[mdThumbnail] ? chips[mdThumbnail] : chips[mdItem][0][mdThumbnail]}}" /> \
											</div> \
											<div class="chips-mini-title">{{chips[mdTitle]}}</div> \
										</div> \
									</div> \
									<div class="chips-active" ng-style="{top: ytop}" ng-model="ytop" ng-click="closeActive($event)"></div> \
									<input type="text" ng-model="chipsText[mdTitle]" ng-focus="clearActive()" ng-keydown="clearPrev($event)" class="chipsInput"/> \
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
																		<img ng-src='{{item[mdThumbnail] ? item[mdThumbnail] : item[mdItem][0][mdThumbnail]}}'> \
																	</div> \
																	<span class='chips-title'>{{item[mdTitle]}}</span> \
																	<p class='chips-description'>{{item[mdSubtitle] ? item[mdSubtitle] : item[mdItem][0][mdSubtitle]}}</p> \
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
						scope.clearActiveChildren(chipsActive);
					}
				});

				element.bind('click', function(evt){
					evt.stopPropagation();
					element[0].querySelector('.chipsInput').focus();
				});

				scope.removeList = function(){
					var chipsList = element[0].querySelector('#chips-list');
					if (chipsList) {
						chipsList.remove();
					}
				};

				scope.addToInput = function(item){
					var chipsElement = this.createElementAttributes(JSON.parse(JSON.stringify(item)));
					this.ngModel.push(chipsElement);
					this.chipsText[this.mdTitle] = '';
					this.removeList();
					element[0].querySelector('.chipsInput').focus();
				};

				scope.createElementAttributes = function(item){
					if(!item[this.mdThumbnail] && !item[this.mdSubtitle]){
						if (item[this.mdItem][0]){
							var firstSubEl = item[this.mdItem].shift();
							item[this.mdThumbnail] = firstSubEl[this.mdThumbnail] ? firstSubEl[this.mdThumbnail] : '';
							item[this.mdSubtitle] = firstSubEl[this.mdSubtitle] ? firstSubEl[this.mdSubtitle] : 'No info';
						} else {
							item[this.mdThumbnail] = '';
							item[this.mdSubtitle] = 'No info';
						}
					}
					return item;
				};

				scope.showMore = function(index, event){
					scope.ytop = event.currentTarget.offsetTop + 'px';
					var item = scope.ngModel[index],
						chipsActive = element[0].querySelector('.chips-active');	
					var html = '<div id ="chips-active-list"><div class="chips-active-main">  \
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
						this.clearActiveChildren(chipsActive);
					}
					$compile(chips)(scope);
					$timeout(function() {
						if (element[0].querySelector('#chips-list')){
							this.chipsText[this.mdTitle] = ''; 
							element[0].querySelector('#chips-list').remove();
						}
						chipsActive.appendChild(chips[0]);
					});
					

				};

				scope.deleteChips = function(index){
					console.log("Ho", index);
					scope.ngModel.splice(index,1);
					var chipsActive = element[0].querySelector('.chips-active');
					this.clearActiveChildren(chipsActive);
				};

				scope.clearPrev = function(event){
					if(event.keyCode === 8 && event.target.value === '' && scope.ngModel.length !== 0){
						scope.ngModel.pop();
					}
					return true;
				};

				scope.closeActive = function(event){
					if (event.currentTarget.hasChildNodes()){
						this.clearActiveChildren(event.currentTarget);
					}
				};

				scope.clearActive = function(){
					var chipsActive = element[0].querySelector('.chips-active');
					this.clearActiveChildren(chipsActive);
					
				};

				scope.clearActiveChildren = function(active){
					while (active.firstChild) {
					    active.removeChild(active.firstChild);
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