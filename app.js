angular.module('mdChipsDemo', ['mdChips'])
	.controller('MainController', function($scope){
		$scope.itemsCollection = [{
			thumbnailUrl: './afflek.jpg',
			title: 'Ben Afflek',
			subtitle: 'ben_a@gmail.com',
			items: [{subtitle: 'afflek_b@gmail.com', thumbnailUrl: './afflek_2.jpg'}]
		}, {
			thumbnailUrl: './beil.jpg',
			title: 'Christian Beil',
			subtitle: 'amy@gmail.com',
			items: [{subtitle: 'beil_christian@gmail.com'}]
		},{
			thumbnailUrl: './samuel.jpg',
			title: 'Samuel El Jackson',
			subtitle: 'samuel@gmail.com',
			items: []
		},{
			thumbnailUrl: './stallone.jpg',
			title: 'Silvester Stallone',
			subtitle: 'silvester@gmail.com'
		},{	
			title: 'Jackie',
			items: [{subtitle: 'jackie@gmail.com', thumbnailUrl: './jackie.jpg'}]
		}];

		$scope.selectedUsers = [];
	});