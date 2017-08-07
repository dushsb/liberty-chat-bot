'use strict';

module.exports.fulfill = function(intentRequest){
  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;
  const sessionAttributes = intentRequest.sessionAttributes;

  console.log('Doc id ' + sessionAttributes.docId);
  console.log('Product Id ' + sessionAttributes.prodId);

  return validateAndProcess(sessionAttributes.docId, sessionAttributes.prodId);
};

function validateAndProcess(docId, prodId){
  console.log('Start fultillment process');

  var documentId = null;
  var productId = null;
  var linkAddress = null;

  var documentProductMap = [
      {"docId":"001", "prodId":"009", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2015/01/Brochure_TourCare-Plus.pdf"},
      {"docId":"009", "prodId":"009", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2017/05/Policy_Wordings_TourCare_Plus_after1Jun2017.pdf"},
      {"docId":"004", "prodId":"009", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2016/09/Proposal_Form_TourCare_Plus.pdf"},
      {"docId":"002", "prodId":"009", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/Claims/Claims_Form_Travel.pdf"},
      {"docId":"001", "prodId":"010", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2015/03/Brochure_Overseas_StudentCare.pdf"},
      {"docId":"009", "prodId":"010", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2016/10/Policy-Wordings_Overseas-StudentCare.pdf"},
      {"docId":"004", "prodId":"010", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2015/07/Proposal_Form_Overseas_StudentCare.pdf"},
      {"docId":"001", "prodId":"008", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2016/12/MyHEALTH_Brochure.pdf"},
      {"docId":"003", "prodId":"008", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2017/07/MyHEALTH_Benefits_Schedule.pdf"},
      {"docId":"010", "prodId":"008", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2017/03/MyHEALTH_SG_TCs.pdf"},
      {"docId":"005", "prodId":"008", "link":"https://www.libertyinsurance.com.sg/wp-content/uploads/2016/07/MyHEALTH_Application_Form.pdf"}
  ];

  if(docId && prodId){
      console.log('searching ' + docId + ' ' + 'for ' + prodId);
        for (var i = 0; i < documentProductMap.length; i++) {
          productId = documentProductMap[i].prodId;
          documentId = documentProductMap[i].docId;
          linkAddress = documentProductMap[i].link;

          if (productId === prodId && documentId === docId) {
              break;
          }

          productId = null;
          documentId = null;
          linkAddress = null;
        }
        console.log('Found the link ' + linkAddress);
        return linkAddress;
    }

}
