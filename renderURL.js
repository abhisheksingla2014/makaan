
var request = require('request');

function priceCorrector(price){
	if(price/10000000 < 1){
		var e =  price/100000;
		e = e.toFixed(2);
		return e.toString() + ' Lkh'; 
	}
	else{
		var e =  price/10000000;
		e = e.toFixed(2);
		return e.toString() + ' Cr'; 	
	}
}


var city = {"gurgaon": "11","mumbai": "18","kolkata": "16","guntur": "115"};

function renderURL(link,res){
	let output = [];
		request(link,function(err, rs, data){
			if (err) {
					console.log('Error:', err);
			} else if (res.statusCode !== 200) {
					console.log('Status:', res.statusCode);
			} else {
			try
			{
				var api_output = JSON.parse(data);
						// console.log(api_output.data.length);
				for(let i = 0; i < api_output.data.length; i++)
				{
				// console.log( api_output.data[i]);
					for(let j =0;  j < api_output.data[i].facetedResponse.items.length; j++){
					// console.log(api_output.data[i].facetedResponse.items[j].listing.companySeller.user.fullName);
	  				let cityLabel = api_output.data[i].facetedResponse.items[j].listing.property.project.locality.suburb.city.label;
	  					
	  				let obj = {};
					obj.name = api_output.data[i].facetedResponse.items[j].listing.companySeller.company.name;
	  				obj.url = api_output.data[i].facetedResponse.items[j].listing.companySeller.user.profilePictureURL;
	  				obj.bedrooms = api_output.data[i].facetedResponse.items[j].listing.property.bedrooms;
	  				obj.address = api_output.data[i].facetedResponse.items[j].listing.property.project.locality.label;
	  				obj.city = api_output.data[i].facetedResponse.items[j].listing.property.project.locality.suburb.city.label;
	  				obj.price = api_output.data[i].facetedResponse.items[j].listing.currentListingPrice.price;
	  				obj.size = api_output.data[i].facetedResponse.items[j].listing.property.size;
	  				obj.status = api_output.data[i].facetedResponse.items[j].listing.listingCategory;
	  				obj.description = api_output.data[i].facetedResponse.items[j].listing.description;
	  				obj.floor = api_output.data[i].facetedResponse.items[j].listing.floor;
	  				obj.totalFloors = api_output.data[i].facetedResponse.items[j].listing.totalFloors;
	  				obj.mainImageURL = api_output.data[i].facetedResponse.items[j].listing.mainImageURL;
	  				obj.relevanceScore = api_output.data[i].facetedResponse.items[j].listing.relevanceScore;
	  				obj.title = api_output.data[i].facetedResponse.items[j].listing.mainImage.title;
	  				obj.resaleURL = "http://www.makaan.com/" + api_output.data[i].facetedResponse.items[j].listing.resaleURL;
	  				obj.recencyScore = api_output.data[i].facetedResponse.items[j].listing.recencyScore;
	  				obj.ratingString =  "background-image:linear-gradient(left, red, red " +(obj.recencyScore*10).toFixed(0).toString()+ "%,transparent " + (obj.recencyScore*10).toFixed(0).toString() + "%, transparent 100%);background-image: -webkit-linear-gradient(left, red, red " + (obj.recencyScore*10).toFixed(0).toString() + "%, transparent " + (obj.recencyScore*10).toFixed(0).toString() + "%, transparent 100%);" 
					// console.log(obj.ratingString);
	  				output.push(obj);
					}
				}
				res.render("index.ejs",{arr: output, priceCorrector: priceCorrector,cities:city});
				res.end();
			}
			catch(err){
				res.render("noResultsFound.ejs",{arr: [], priceCorrector: priceCorrector,cities:city});
				res.end();
			}
			// console.log(api_output.data[0].facetedResponse.items[0].listing.companySeller.user.fullName);
			// console.log(typeof output.toString());
			// res.send(JSON.stringify(output));
		}		
	});
	
}
exports.renderURL = renderURL;