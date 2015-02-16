angular.module('mdChipsDemo', ['mdChips'])
	.controller('MainController', function($scope){
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
		},{	
			title: 'Just Named',
			items: [{description: 'john2@gmail.com', url: '2.jpg'}]
		}];

		$scope.selectedUsers = [];
	});