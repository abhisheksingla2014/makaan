function cl(message){
	console.log(message);
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var router = express.Router();
var url = require('url');

var app = express();

app.use(bodyParser());
app.set('views',__dirname + "/views");
app.set("view-engine" , "ejs");
app.use('/public',express.static(__dirname + '/public'));
var rURL = require('./renderURL.js');
var city = {"gurgaon": "11","mumbai": "18","kolkata": "16","guntur": "115"};

function addfilters(type,cities,bhk,link){
	let outputURL = '"filters":{"and":[';
	outputURL += '{"equal":{"listingCategory":[';
	outputURL += type + ']}},';
	outputURL += '{"equal":{"cityId":[';
	if(cities.length == 0){
		for(var c in city){
			outputURL += city[c].toString() + ',';
		}
		outputURL = outputURL.slice(0,-1);	
	}
	else{
		cl("cities ki length " + cities.length);
		outputURL += cities;
	}
	outputURL += ']}}';
	if(bhk.length != 0){
		outputURL += ',{"equal":{"bedrooms":[';
		outputURL += bhk;
		outputURL += ']}}';
	}
	outputURL += ']}';
	return outputURL;
}
function addSort(sortBy){
	let outputURL = ',"sort":[{"field":"' + sortBy + '","sortOrder":"DESC"}]';
	return outputURL;
}
function generate_url(type,cities,bhk,link,sortBy){
	link = link + "?selector={";
	link += addfilters(type,cities,bhk,link);
	if(sortBy)
		link += addSort(sortBy);
	link = link +',"paging":{"start":0,"rows":30}}&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan';
	cl(link);
	return link;
}

function generateQuery(q){
	var type_lst= [];
	var category_lst = [];
	if(q.buy)
	{
		type_lst.push('"Resale"');
		type_lst.push('"Primary"');
	}
	if(q.rent){
		type_lst.push('"Rental"');
	}
	if(q['1BHK']){
		category_lst.push(1);
	}
	if(q['2BHK']){
		category_lst.push(2);
	}
	if(q['3BHK']){
		category_lst.push(3);
	}
	if(q['4BHK']){
		category_lst.push(4);
	}
	return {category_lst:category_lst , type_lst:type_lst};
}

app.get('/',function(req,res){
    var site = "http://www.makaan.com/petra/app/v4/listing";
	var url_parts = url.parse(req.url, true);
	var query1 = url_parts.query;
	try{
		var link_parts = url.parse(query1.link, true);
		var query2 = link_parts.query;
		cl("query2");
		cl(query2);
	}
	catch(err){
		cl("Error No Query2");
	}
	cl("query1");
	cl(query1);
	if(!Object.keys(query1).length){
		cl("No 1");
		let link = generate_url(['"Resale"','"Primary"','"Rental"'],[],[],site);
		rURL.renderURL(link,res);
	}
	else if(!Object.keys(query2).length){
		cl("No 2");
		if(query1.form == 'searchForm'){
			cl("search-form");
			let link = generate_url(['"Resale"','"Primary"','"Rental"'],[city[query1.searchText.toLowerCase()]],[],site);
			rURL.renderURL(link,res);
		}
		else{
			cl("filter-form");
			var obj = generateQuery(query1);
			let link;
			if(query1['sortBy']){
				link = generate_url(obj.type_lst,[],obj.category_lst,site,query1['sortBy']);
			}
			else link = generate_url(obj.type_lst,[],obj.category_lst,site);
			// cl(link);
			rURL.renderURL(link,res);	
		}
	}
	else {
		cl("Both");
		if(query1.form == 'searchForm'){
			if(query2.form == 'searchForm'){
				let link = generate_url(['"Resale"','"Primary"','"Rental"'],[city[query1.searchText.toLowerCase()]],[],site);
				rURL.renderURL(link,res);
			}
			else{
				var obj = generateQuery(query2);
				let link;
				if(query2['sortBy']){
					link = generate_url(obj.type_lst,[city[query1.searchText.toLowerCase()]],obj.category_lst,site,query2['sortBy']);
				}
				else link = generate_url(obj.type_lst,[city[query1.searchText.toLowerCase()]],obj.category_lst,site);
				rURL.renderURL(link,res);	
			}
		}
		else{
			if(query2.form == 'filterForm'){
				var obj = generateQuery(query1);
				let link;
				if(query1['sortBy']){
					link = generate_url(obj.type_lst,[],obj.category_lst,site,query1['sortBy']);
				}
				else link = generate_url(obj.type_lst,[],obj.category_lst,site);
				rURL.renderURL(link,res);
			}
			else{
				var obj = generateQuery(query1);
				let link;
				if(query1['sortBy']){
					link = generate_url(obj.type_lst,[city[query2.searchText.toLowerCase()]],obj.category_lst,site,query1['sortBy']);
				}
				else link = generate_url(obj.type_lst,[city[query2.searchText.toLowerCase()]],obj.category_lst,site);
				rURL.renderURL(link,res);	
			}
		}

	}	
});
app.listen(8080,function(){
	cl("listening at port number 8080");
});