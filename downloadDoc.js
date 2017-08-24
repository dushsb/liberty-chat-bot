'use strict';

const lexResponse = require('./lexResponse');
const validateDoc = require('./validateDoc');
const validateProd = require('./validateProd');
const fulfillment = require('./fulfillment');
const productCategory = require('./ProductCategory');
const product = require('./product');

module.exports = function(intentRequest, callback){

  var imageurl = "https://www.libertyinsurance.com.sg/wp-content/uploads/2016/05/Single-Web-e1463013003583.jpg";
  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;
  var isDocValid = false;

  console.log('params:' + doc + ' ' + docCate + ' ' + prod);

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {

    const slots = intentRequest.currentIntent.slots;

    const sessionAttributes = intentRequest.sessionAttributes;
    console.log('isDocValid 1 ' + sessionAttributes.isDocValid);
    if(typeof sessionAttributes.isDocValid == 'undefined' || sessionAttributes.isDocValid === null || sessionAttributes.isDocValid === false){
        isDocValid = false;
    }else{
      isDocValid = true;
    }

    console.log('isDocValid ' + isDocValid);
    //console.log('results1 ' + isDocValid;
    console.log('results2 ' + (doc !== null));
    //Document validation
    if(doc !== null && isDocValid === false){

      const validationResult = validateDoc.validateDocument(intentRequest);
      console.log('Validation results '
      + 'validationResult ' + validationResult
      + 'isValid ' + validationResult.isValid
      + 'isDocValid ' + validationResult.attr.isDocValid
      + 'docId ' + validationResult.attr.docId);

      var options =[
        {"text":"Brochure","value":"Brochure"},
        {"text":"proposal form","value":"proposal form"},
        {"text":"claims form","value":"claims form"}];

      if (!validationResult.isValid) {
        console.log("validation failed");
        slots[`${validationResult.violatedSlot}`] = null;
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots,
          validationResult.violatedSlot,validationResult.message,
          buildResponseCard('Document..?', 'Please select from the list given bellow.', options, imageurl, null)
          ));
        return;
      }

      if (validationResult.isValid) {
        console.log("Doc validation Successed");
        intentRequest.sessionAttributes.docId = validationResult.attr.docId;
        intentRequest.sessionAttributes.isDocValid = validationResult.attr.isDocValid;
        intentRequest.sessionAttributes.prodId = null;
        intentRequest.sessionAttributes.isDocValid = false;
      }
    }
    console.log('prod ' + prod);
    console.log('sessionAttributes.isProdValid ' + sessionAttributes.isProdValid);
    //Product validation
    //if((prod !== null || docCate !== null) && (!sessionAttributes.isProdValid)){
    console.log("selection logic "+docCate !== null || prod !== null);
    if(docCate !== null || prod !== null){

      if(docCate !== null && prod === null){
        intentRequest.currentIntent.slots.category = docCate;
        var productOptions = product.getProductOptions(docCate);
        console.log("productOptions " + productOptions);

        if(productOptions.length > 0){

          callback(lexResponse.elicitSlot(intentRequest.sessionAttributes,
            intentRequest.currentIntent.name, intentRequest.currentIntent.slots,
            'product', null,
            buildResponseCard("Products", "select the products", productOptions, null, null)
            ));
          return;
        }
      }

      const validationResult = validateProd.validateProduct(intentRequest);
      var productCategoryTitle = "Product Category";
      var productCategorySubTitle = "Please select the product category";

      if (!validationResult.isValid) {
        console.log("prod validation failed");

        slots[`${validationResult.violatedSlot}`] = null;
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots,
          "category",validationResult.message,
          buildResponseCard(productCategoryTitle, productCategorySubTitle, productCategory.getProductCategoryOptions(), null, null)
          ));
        return;
      }
      if (validationResult.isValid) {
        console.log("Prod validation Successed");
        intentRequest.sessionAttributes.prodId = validationResult.attr.prodId;
        intentRequest.sessionAttributes.isProdValid = validationResult.attr.isProdValid;
      }
    }

    /**if((!doc) && (!prod)){//Initialized the session valiable
      intentRequest.sessionAttributes.docId = null;
      intentRequest.sessionAttributes.isDocValid = false;
      intentRequest.sessionAttributes.prodId = null;
      intentRequest.sessionAttributes.isDocValid = false;
    }*/


    callback(lexResponse.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if(source === 'FulfillmentCodeHook'){
    console.log('calling => fulfillmentCodeHook')
    const slots = intentRequest.currentIntent.slots
    const sessionAttributes = intentRequest.sessionAttributes;

    console.log('Doc id ' + sessionAttributes.docId);
    console.log('Product Id ' + sessionAttributes.prodId);

    var message = "Okay, We found your document.";
    var title = "Yes...";
    var subtitle = "Please click the link bellow.";

    var linkAddress = fulfillment.fulfill(intentRequest);
    if(linkAddress == null){
      message = "Sorry, We we could not find your document.";
      title = "hmmm...";
      subtitle = "Please visit the link below or contact our customer service.";
      linkAddress = "https://www.libertyinsurance.com.sg/downloads";
    }

    callback(lexResponse.close(sessionAttributes, 'Fulfilled'
    , { contentType: 'PlainText',
       content: message
     },
        buildResponseCard(title, subtitle, null, imageurl, linkAddress)
    ));

    //callback(lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', null, null));
    return;
  }
};

// Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
function buildResponseCard(title, subTitle, options, imageUrl, attachmentLinkUrl) {
    let buttons = null;
    if (options !== null) {
        buttons = [];
        for (let i = 0; i < Math.min(5, options.length); i++) {
            buttons.push(options[i]);
        }
    }
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
        genericAttachments: [{
            title,
            subTitle,
            imageUrl,
            attachmentLinkUrl,
            buttons,
        }],
    };
}
