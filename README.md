# md-chips
Angular input-chips directive following Google Material Design guidelines

## Dependencies
This directive works with Angular v1.3.13. 

## Loading

In your html code include mdchips.js and md-chips.css

```
<link rel="stylesheet" type="text/css" href="mdchips.css">

<script src="mdchips.js"></script>
```

Then you only need to require mdChips module as a dependency 

```
angular.module('myModule', ['mdChips'])
```

## Usage

In your html markup write

```
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


