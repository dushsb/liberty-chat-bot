'use strict';

module.exports.getProductCategoryOptions = function(){

  var categoryOption =[
    {"text":"Private Vehicle","value":"001"},
    {"text":"Business Vehicle","value":"002"},
    {"text":"Medical","value":"003"},
    {"text":"Personal Accident","value":"004"},
    {"text":"Family & Home","value":"005"},
    {"text":"Marine Vessels","value":"006"},
    {"text":"Insurance Packaes","value":"insurance packages"},
    {"text":"Business Activities","value":"business activities"},
    {"text":"Employees","value":"employess"},
    {"text":"Business Properties","value":"business properties"},
    {"text":"Travel & Leisure","value":"travel and leisure"}
  ];

  return categoryOption;
};

module.exports.getProductCategory = function(){

  var category =[
    {"id":"001","name":"Private Vehicle","value":"private vehicle"},
    {"id":"002","name":"Business Vehicle","value":"business vehicle"},
    {"id":"003","name":"Medical","value":"medical"},
    {"id":"004","name":"Personal Accident","value":"personal accident"},
    {"id":"005","name":"Family & Home","value":"family and home"},
    {"id":"006","name":"Marine Vessels","value":"marine vessels"},
    {"id":"007","name":"Insurance Packaes","value":"insurance packages"},
    {"id":"008","name":"Business Activities","value":"business activities"},
    {"id":"009","name":"Employees","value":"employess"},
    {"id":"010","name":"Business Properties","value":"business properties"},
    {"id":"011","name":"Travel & Leisure","value":"travel and leisure"}
  ];

  return category;
};

module.exports.searchInSubcategory = function(inputText){
  var categories = this.getProductCategory();
  var val = null;
  var catId = null;

  for (var i = 0; i < categories.length; i++) {
    val = categories[i].value;
    catId = categories[i].id;
    if (val === inputText) {
        break;
    }
    catId = null;
  }

  return catId;
};
