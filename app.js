angular.module('mdChipsDemo', ['mdChips'])
	.controller('MainController', function($scope){
		$scope.itemsCollection = [{
			thumbnailUrl: '/images/afflek.jpg',
			title: 'Ben Afflek',
			subtitle: 'ben_a@gmail.com',
			items: [{subtitle: 'afflek_b@gmail.com', thumbnailUrl: '/images/afflek_2.jpg'}]
		}, {
			thumbnailUrl: '/images/beil.jpg',
			title: 'Christian Beil',
			subtitle: 'amy@gmail.com',
			items: [{subtitle: 'beil_christian@gmail.com'}]
		},{
			thumbnailUrl: '/images/samuel.jpg',
			title: 'Samuel El Jackson',
			subtitle: 'samuel@gmail.com',
			items: []
		},{
			thumbnailUrl: '/images/stallone.jpg',
			title: 'Silvester Stallone',
			subtitle: 'silvester@gmail.com'
		},{	
			title: 'Jackie',
			items: [{subtitle: 'jackie@gmail.com', thumbnailUrl: '/images/jackie.jpg'}]
		}];

		$scope.selectedUsers = [];
	});