angular.module('mdChipsApp', []).
	controller('MainController', function($scope){
		$scope.itemsCollection = [{
			avatarUrl: 'https://www.petfinder.com/wp-content/uploads/2012/11/122163343-conditioning-dog-loud-noises-632x475.jpg',
			title: 'John Smith',
			description: 'john@gmail.com'
		}, {
			avatarUrl: 'https://www.petfinder.com/wp-content/uploads/2012/11/122163343-conditioning-dog-loud-noises-632x475.jpg',
			title: 'Amy Adams',
			description: 'john@gmail.com'
		},{
			avatarUrl: 'https://www.petfinder.com/wp-content/uploads/2012/11/122163343-conditioning-dog-loud-noises-632x475.jpg',
			title: 'Earl Grey',
			description: 'john@gmail.com'
		}];
	})
	.directive('mdChips', ['$compile','$timeout', function($compile, $timeout){
		
		return {
			restrict: 'E',
			replace:true,
			template: '<div class="md-chips"><input type="text" ng-model="chipsText" class="chipsInput"/></div>',
			scope: {
				collection: '='	
			},
			link: function (scope, element, attrs) {
				console.log(scope);
				element.bind('input', function(event) {
					if (event.target.value) {
						scope.$apply(function(){
							var	list = angular.element("<div id='chips-list'><div ng-repeat='item in collection | filter:chipsText' class='chips-list-item'><span>{{item.title}}</span></div></div>"),
								chipsList = document.getElementById('chips-list');
							scope.collection = eval(scope.collection);
							$compile(list)(scope);	
							$timeout(function() {
								if(chipsList){
									chipsList.remove();
								}
								element.append(list);
							});
							
						});
					} else {
						document.getElementById('chips-list').remove();
					}
				});
			}
		}

	}]);

	// <div class="list-item"><span>{{}}</span><div>