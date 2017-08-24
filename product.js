'use strict';

module.exports.getProduct = function(){

  var products = [
      {"id":"001", "catId":"001", "name":"Private Car", "keys":["Private Car"]},
      {"id":"002", "catId":"001", "name":"Privilege - High-End Car", "keys":["Privilege - High-End Car", "High-End Car", "Privilege Car"]},
      {"id":"003", "catId":"001", "name":"Motor Cycle", "keys":["motor cycle"]},
      {"id":"004", "catId":"003", "name":"ProMedico", "keys":["promedico"]},
      {"id":"005", "catId":"003", "name":"ProMediCare", "keys":["promediCare"]},
      {"id":"006", "catId":"003", "name":"ProMediCash", "keys":["promediCash"]},
      {"id":"007", "catId":"003", "name":"ProMedico Plus", "keys":["promedico plus"]},
      {"id":"008", "catId":"003", "name":"Vital Care", "keys":["vital care"]},
      {"id":"009", "catId":"003", "name":"MyHEALTH", "keys":["MyHEALTH","myhealth"]},
      {"id":"010", "catId":"011", "name":"TourCare Plus", "keys":["TourCare Plus", "tourcare plus"]},
      {"id":"011", "catId":"011", "name":"Overseas StudentCare", "keys":["overseas studentcare","osc"]},
      {"id":"012", "catId":"011", "name":"GolfCare", "keys":["GolfCare","golfcare"]},
      {"id":"013", "catId":"004", "name":"PACare Plus", "keys":["PACare Plus","pacare plus"]},
      {"id":"014", "catId":"004", "name":"PACare Plus - Enhanced", "keys":["PACare Plus - Enhanced","pacare plus - enhanced"]},
      {"id":"015", "catId":"004", "name":"Personal Accident", "keys":["Personal Accident","personal accident"]},
      {"id":"016", "catId":"004", "name":"FamilyCare", "keys":["FamilyCare","familycare"]},
      {"id":"017", "catId":"004", "name":"Paymaster", "keys":["Paymaster","paymaster"]},
      {"id":"018", "catId":"004", "name":"Liberty Centennial PA", "keys":["Liberty Centennial PA","liberty centennial pa"]},
      {"id":"019", "catId":"005", "name":"PetCare", "keys":["PetCare","petcare"]},
      {"id":"020", "catId":"005", "name":"SeniorCare", "keys":["SeniorCare","seniorcare"]},
      {"id":"021", "catId":"005", "name":"MaidCare", "keys":["MaidCare","maidcare"]},
      {"id":"022", "catId":"005", "name":"HomeCare", "keys":["HomeCare","homecare"]},
      {"id":"023", "catId":"010", "name":"Fire & Extraneous Perils Insurance", "keys":["Fire & Extraneous Perils Insurance","Fire & Extraneous Perils"]},
      {"id":"024", "catId":"010", "name":"Consequential Loss Insurance", "keys":["Consequential Loss Insurance","consequential loss"]}

  ];

  return products;
};

module.exports.getProductOptions = function(subCatId){

console.log("Building product options");

  var products = this.getProduct();
  var arr = [];
  var id = null;
  var catId = null;
  var name = null;

  for (var i = 0; i < products.length; i++) {
    name = products[i].name;
    id = products[i].id;
    catId = products[i].catId;

    if (catId === subCatId) {
        arr.push({text:name,value:name});
    }
  }
  return arr;
};
