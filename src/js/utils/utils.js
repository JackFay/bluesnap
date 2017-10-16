export function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
//shopperInfo.sellerShopperId	shopperInfo.shopperContactInfo.firstName
//	shopperInfo.shopperContactInfo.lastName	shopperInfo.shopperContactInfo.email
//	shopperInfo.shopperContactInfo.country	shopperInfo.shopperContactInfo.state
//  billingContactInfo.firstName	billingContactInfo.lastName
//  billingContactInfo.country	billingContactInfo.state	creditCard.cardNumber
// 	creditCard.expirationMonth	creditCard.expirationYear
//  BlueSnap Shopper Id	Create or Update	Success

//merchant-transaction-id? card-transaction?
export function generateXML(array, batchId){
  var cardTransactions = "";
  for(var i = 0; i < array.length; i++){
    // var [sellerShopperId, shopperFirstName, shopperLastName, shopperEmail,
    //        shopperCountry, shopperState, billingFirstName, billingLastName,
    //        billingCountry, billingState, billingCardNumber, expirationMonth, expirationYear,
    //        shopperId] = array[i];
    var shopperId = array[i][13];
    if(shopperId !== undefined ){
      var transaction =  '<card-transaction> \
         <card-transaction-type>AUTH_CAPTURE</card-transaction-type> \
         <merchant-transaction-id>1094444</merchant-transaction-id>\
         <recurring-transaction>ECOMMERCE</recurring-transaction> \
         <soft-descriptor>DescTest txn'+i+'</soft-descriptor> \
         <amount>95.00</amount> \
         <currency>USD</currency> \
         <vaulted-shopper-id>'+ shopperId +'</vaulted-shopper-id> \
       </card-transaction>';
       cardTransactions = cardTransactions + transaction;
     }
  }

  var xml = '<?xml version="1.0" encoding="UTF-8"?> \
            <batch-transaction xmlns="http://ws.plimus.com"> \
               <batch-id>' + batchId + '</batch-id> \
               <callback-url>http://localhost:8080/jsp/batch_callback.jsp</callback-url> \
               '+ cardTransactions + '\
            </batch-transaction>'

  return xml;
}

export function StringToXML(oString) {
  return (new DOMParser()).parseFromString(oString, "text/xml");
}
