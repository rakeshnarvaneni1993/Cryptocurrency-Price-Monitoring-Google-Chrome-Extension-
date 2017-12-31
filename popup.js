var listOfCoinSymbols = ['XRP','TRX','BTC','BCC','LTC','ETH'];
// var namesAndSymbols = [];

function getAllCoins(sendSymbol) {
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var namesAndSymbols = [];
        	var coins = JSON.parse(xmlHttp.responseText); //All the data of coins is in this variable
        	for(i=0;i<listOfCoinSymbols.length;i++){
        		if(coins.Data[listOfCoinSymbols[i]]){
        			namesAndSymbols.push({
        				'symbol': coins.Data[listOfCoinSymbols[i]]['Symbol'],
        				'name' : coins.Data[listOfCoinSymbols[i]]['CoinName'],
        			})
        		}
        	}
        	sendSymbol(namesAndSymbols);
        }
    }
    xmlHttp.open("GET", 'https://min-api.cryptocompare.com/data/all/coinlist', true); // true for asynchronous 
    xmlHttp.send(null);

}

function getPrices(names, callBack2){
	  var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){        
        	var prices = JSON.parse(xmlHttp.responseText); //All the data of coins is in this variable
        	for(j=0;j<names.length;j++){
        		if(prices[names[j].symbol]){
        			names[j]['price'] = prices[names[j].symbol]['USD'];
        		}
        	}
      		callBack2(names);   
        }

    }
	  xmlHttp.open("GET", 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP,TRX,BTC,BCC,LTC,ETH&tsyms=BTC,USD,EUR', true); // true for asynchronous 
	  xmlHttp.send(null);
	  // alert(JSON.stringify(response))

}


setInterval(function(){
	getAllCoins((response) => {
		getPrices(response, (pricesResponse) => {
			// alert(JSON.stringify(pricesResponse));
			$('.prices').empty();
			for(i=0;i<pricesResponse.length;i++){
				if(pricesResponse[i].price){
					$('.prices').append('<div class="col-4">'+pricesResponse[i].name+'</div>')
				  	$('.prices').append('<div class="col-4">'+pricesResponse[i].symbol+'</div>')
				  	$('.prices').append('<div class="col-4">'+pricesResponse[i].price+'</div>')
				  	// $('.prices').append('<div class="col-3" id="details">Details</div>')
				}
		  }
		})
});
}, 10000)


