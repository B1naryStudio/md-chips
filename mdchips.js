angular.module('mdChips', [])
	.factory('chipsService', [function(){
		return {
			helper: function(scope, collection, active, rule, chipsList){
				if (active == -1 && collection.length > 0){
					collection[0].active = true;
				} else if (collection.length > 0){
					if (collection[active+rule]){
						collection[active].active = false;
						collection[active+rule].active = true;
					} else {
						collection[active].active = false;
						var index = rule == 1 ? 0 : (collection.length-1);
						collection[index].active = true;
					}
				}
				scope.$apply();
				if (collection.length > 0)
					chipsList.querySelector('.active').scrollIntoView({block: "start", behavior: "smooth"});
			},
			nextActive: function(scope, collection, active, chipsList){
				this.helper(scope, collection, active, 1, chipsList);
			},
			prevActive: function(scope, collection, active, chipsList){
				this.helper(scope, collection, active, -1, chipsList);
			}
		}
	}])
	.directive('mdChips', ['$compile','$timeout', '$document', 'chipsService', function($compile, $timeout, $document, chipsService){
		return {
			restrict: 'E',
			replace:true,
			template: '<div class="md-chips" ng-cloak> \
							<div class="chips-input-field"> \
								<div class="input-chips-elements"> \
									<div ng-repeat="chips in ngModel track by $index" class="chips-mini-item"> \
										<div class="chips-mini" ng-click="showMore($index, $event)"> \
											<div class="chips-mini-img"> \
												<img ng-src="{{chips[mdThumbnail] ? chips[mdThumbnail] : undefined }}" ng-show="chips[mdThumbnail]? true : false"/> \
												<div class="image-default-mini" ng-show="chips[mdThumbnail] ? false : true"></div> \
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

				scope.innerCollection = scope.collection.map(function(item){
					if (!item[scope.mdTitle]){ 
						return; 
					}

					if (!item[scope.mdSubtitle] && !item[scope.mdThumbnail]){
						if (item[scope.mdItem].length < 1){
							return;
						} else {
							item[scope.mdSubtitle] = item[scope.mdItem][0][scope.mdSubtitle];
							item[scope.mdThumbnail] = item[scope.mdItem][0][scope.mdThumbnail] ? item[scope.mdItem][0][scope.mdThumbnail] : '';
							item[scope.mdItem].shift();
							return item;
						}
					}
					item['active'] = false;
					return item;
				});

				element.bind('input', function(event) {
					var self = scope;
					scope.clearActive();
					if (event.target.value) {
						scope.$apply(function(){
							var	list = angular.element("<div id='chips-list' ng-show='true' ng-cloak> \
															<div ng-repeat='item in (filteredCollection = (innerCollection | filter:chipsText))' class='chips-list-item' ng-click=addToInput(item) ng-class='{active: item.active}'> \
																<div class='chips-item-wrapper'> \
																	<div class='chips-image'> \
																		<img ng-src='{{item[mdThumbnail]}}' ng-show='item[mdThumbnail] ? true : false'> \
																		<div class='image-default' ng-show='item[mdThumbnail] ? false : true'></div> \
																	</div> \
																	<span class='chips-title'>{{item[mdTitle]}}</span> \
																	<p class='chips-description'>{{item[mdSubtitle]}}</p> \
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
					scope.clearActive();
					if(scope.chipsText){
						scope.chipsText[scope.mdTitle] = '';
					}
					scope.removeList();
					scope.$apply();
				});

				element.bind('click', function(evt){
					evt.stopPropagation();
					element[0].querySelector('.chipsInput').focus();
				});

				scope.removeList = function(){
					this.innerCollection.forEach(function(item, index){
							if(item.active){
								item.active = false;
							}
					});
					var chipsList = element[0].querySelector('#chips-list');
					if (chipsList) {
						chipsList.parentNode.removeChild(chipsList);
					}
				};

				scope.addToInput = function(item){
					var chipsElement = JSON.parse(JSON.stringify(item));
					this.ngModel.push(chipsElement);
					this.chipsText[this.mdTitle] = '';
					this.removeList();
					element[0].querySelector('.chipsInput').focus();
				};

				scope.showMore = function(index, event){
					this.removeList();
					scope.ytop = event.currentTarget.offsetTop + 'px';
					var item = scope.ngModel[index],
						chipsActive = element[0].querySelector('.chips-active');
					var show = 	item[scope.mdThumbnail] ? true : false;
					var thumb = item[scope.mdThumbnail]? item[scope.mdThumbnail] : '';
					var htmlCode = '<div id ="chips-active-list" ng-cloak> \
										<div class="chips-active-main">  \
											<div class="chips-active-img"> \
												<img src="' + thumb + '" ng-show=' + show + ' /> \
												<div class="chips-active-image-default" ng-show=' + !show + '></div> \
											</div> \
											<div class="boxclose" id="boxclose" ng-click=deleteChips(' + index + ')><a></a></div> \
											<div class="chips-active-wrap"> \
												<div class="chips-active-title" >' + item[scope.mdTitle] + '</div> \
												<p class="chips-active-description">' + item[scope.mdSubtitle] + '</p> \
											</div> \
										</div>';
					
					if (item[scope.mdItem] && item[scope.mdItem].length > 0){
						for(var i=0; i < item[scope.mdItem].length; i++){
							var url = item[scope.mdItem][i][scope.mdThumbnail] ? item[scope.mdItem][i][scope.mdThumbnail] : ''; 
							show = url ? true : false;
							htmlCode += '<div class="md-chips-single-line" ng-click=setOtherEmail(' + index + ',"'+url+'","' + item[scope.mdItem][i][scope.mdSubtitle] + '",' + i + ')>  \
									<div class="chips-active-img"> \
										<img src="' + url + '" ng-show=' +  show + ' /> \
										<div class="chips-active-image-default" ng-show=' +  !show + '></div> \
									</div> \
									<div class="chips-active-wrap"> \
										<p class="chips-active-description-only">' + item[scope.mdItem][i][scope.mdSubtitle] + '</p> \
									</div> \
								</div>';
						}
					}

					htmlCode += '</div>';
					var chips = angular.element(htmlCode);
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

				element.bind('keydown', function(kEv){
					var chipsList = element[0].querySelector('#chips-list');
					if (chipsList){
						var active = -1;
						scope.filteredCollection.forEach(function(item, index){
							if(item.active){
								active = index;
							}
						});
						switch(kEv.keyCode){
							case 40:
								chipsService.nextActive(scope, scope.filteredCollection, active, chipsList);
								break;	
							case 38:
								chipsService.prevActive(scope, scope.filteredCollection, active, chipsList);
								break;
							case 13:
								if (active!==-1){
									scope.addToInput(scope.filteredCollection[active]);
									scope.removeList();
									kEv.target.style.width = 20;
									scope.$apply();
								} else if (scope.chipsText[scope.mdTitle] ){
									item = {};
									item[scope.mdTitle] = scope.chipsText[scope.mdTitle]; 
									item[scope.mdSubtitle] = scope.chipsText[scope.mdTitle];
									scope.addToInput(item);
									kEv.target.style.width = 20;
									scope.$apply();
								}
								break;
							default:
								break;
						}
					} else {
						return;
					}
				});

				scope.deleteChips = function(index){
					scope.ngModel.splice(index,1);
					this.clearActive();
				};

				scope.clearPrev = function(event){
					if(event.keyCode === 8 && event.target.value === '' && scope.ngModel.length !== 0){
						scope.ngModel.pop();
					}
					if (scope.chipsText){
						var length = scope.chipsText[scope.mdTitle].length * 15 + 15;
						event.target.style.width = length ? length : 20;
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
					if (url && url !== 'undefined'){	
						this.ngModel[index][scope.mdThumbnail] = url;
					} else {
						delete this.ngModel[index][scope.mdThumbnail];
					}
					this.ngModel[index][scope.mdSubtitle]  = email;
					this.ngModel[index][scope.mdItem][i][scope.mdSubtitle] = old.subtitle;
					this.ngModel[index][scope.mdItem][i][scope.mdThumbnail] = old.url;
				};


			}
		}

	}]);