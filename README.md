# md-chips
Angular input-chips directive following Google Material Design guidelines. 
Live [Demo](http://b1narystudio.github.io/md-chips/)
![alt text](https://github.com/B1naryStudio/md-chips/blob/master/title.jpg "Chips Example")

## Installing
You can install it via npm
```shell
npm install md-chips
```
or via bower
```shell
bower install md-chips
```

## Loading

In your html code include mdchips.js and md-chips.css

```html
<link rel="stylesheet" type="text/css" href="mdchips.css">

<script src="mdchips.js"></script>
```

Then you only need to require mdChips module as a dependency 

```javascript
angular.module('myModule', ['mdChips'])
```

## Usage

In your html markup write

```html
<md-chips collection='itemsCollection' ng-model='selectedUsers' md-title='title' md-thumbnail='thumbnailUrl' md-subtitle='subtitle' md-item='items'/>
```
## Attributes

* **collection** - (required) Its value is collection of elements (users)
* **ng-model** - (required) Array for selected items to return
* **md-title** - (required) Name of the title field in your collection
* **md-thumbnail** - (required) Name of the url-thumbnail field in your collection
* **md-subtitle** - (required) Name of the subtitle field in your collection
* **items**  - (optional) Name of the field in your collection with additional thumbnails and subtitles

## Collection structure

Your collection can be implemented in three ways:
#### Simple collection 
```javascript
$scope.yourCollectionName = [{
	thumbnailUrl: './image.jpg',
	title: 'Some Title',
	subtitle: 'test@text.com'
}]
```
#### Collection with title and array of properties
```javascript
$scope.yourCollectionName = [{
	title: 'Some Title',
	items: [{subtitle: 'test@text.com', thumbnailUrl: 'image.jpg'}]
}]
```
#### Simple collection with array of properties
```javascript
$scope.yourCollectionName = [{
	thumbnailUrl: './image.jpg',
	title: 'Some Title',
	subtitle: 'test@text.com'
	items: [{subtitle: 'test_two@text.com', thumbnailUrl: 'image_two.jpg'}]
}]
```
If you don't have thumbnailUrl in items it will be taken from main object.
Collection can have mixed structure. You can name your collection and properties as you like. Just don't forget to write these names to appropriate attributes in md-chips tag:

```javascript
$scope.myCol = [{
	url: './image.jpg',
	name: 'Some Title',
	email: 'test@text.com'
	list: [{email: 'test_two@text.com', url: 'image_two.jpg'}]
},{
	name: 'Another Title',
	list: [{email: 'test@text.com', url: 'image.jpg'}]
}];

$scope.returnedValues = [];
```
```html
<md-chips collection='myCol' ng-model='returnedValues' md-title='name' md-thumbnail='url' md-subtitle='email' md-item='list'/>
```

## Changelog

### 0.2.0 (2015-02-28)

- add possibility to select items from list with keyboard
- add possibility to enter own items
- fix input size while entering data
- fix displaying long names
- fix styles for items list

##Created by [BogdanRusinka](https://github.com/BogdanRusinka) 

##Contributing
Feel free to open issues and send PRs. 

## License

The MIT License (MIT)

[![Binary Studio](http://www.binary-studio.com/wp-content/uploads/2014/11/logo.gif)](http://binary-studio.com)  
Copyright (c) 2015 Rusinka Bogdan bogdan.rusinka@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
