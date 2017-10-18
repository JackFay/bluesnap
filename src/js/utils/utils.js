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
/*
* Converts the CSV into xml
* Returns a STRING of xml
*/
export function generateXML(csvRows, batchId){
  var cardTransactions = "";
  for(var i = 0; i < csvRows.length; i++){
    var merchId = csvRows[i][0];
    var card_transaction_type = csvRows[i][1];
    var merchant_transaction_id = csvRows[i][2];
    var soft_descriptor = csvRows[i][3];
    var recurring_txn = csvRows[i][4];
    var amount = csvRows[i][5];
    var currency = csvRows[i][6];
    var vaulted_shopper_id = csvRows[i][7];
    var card_last_four_digits = csvRows[i][8];
    var card_type = csvRows[i][9];
    if(merchId !== ""){
      var credit_card = "";
      if(card_last_four_digits !== ""){
        var transaction =  '<card-transaction> \
           <card-transaction-type>' + card_transaction_type + '</card-transaction-type> \
           <merchant-transaction-id>' + merchant_transaction_id + '</merchant-transaction-id>\
           <recurring-transaction>' + recurring_txn + '</recurring-transaction> \
           <soft-descriptor>' + soft_descriptor + '</soft-descriptor> \
           <amount>' + amount + '</amount> \
           <currency>' + currency + '</currency> \
           <vaulted-shopper-id>'+ vaulted_shopper_id +'</vaulted-shopper-id> \
           <credit-card>\
             <card-last-four-digits>' + card_last_four_digits + '</card-last-four-digits>\
             <card-type>' + card_type + '</card-type>\
           </credit-card>\
         </card-transaction>';
      }else{
        var transaction =  '<card-transaction> \
           <card-transaction-type>' + card_transaction_type + '</card-transaction-type> \
           <merchant-transaction-id>' + merchant_transaction_id + '</merchant-transaction-id>\
           <recurring-transaction>' + recurring_txn + '</recurring-transaction> \
           <soft-descriptor>' + soft_descriptor + '</soft-descriptor> \
           <amount>' + amount + '</amount> \
           <currency>' + currency + '</currency> \
           <vaulted-shopper-id>'+ vaulted_shopper_id +'</vaulted-shopper-id> \
         </card-transaction>';
       }

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
