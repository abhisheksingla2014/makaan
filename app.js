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
	if(cities == ""){
		for(var c in city){
			outputURL += city[c].toString() + ',';
		}
		outputURL = outputURL.slice(0,-1);	
	}
	else{
		outputURL += city[cities.toLowerCase()];
		
	}
	outputURL += ']}}';
	if(bhk.length != 0){
		outputURL += ',{"equal":{"bedrooms":';
		outputURL += bhk;
		outputURL += '}}';
	}
	outputURL += ']}';
	return outputURL;
}
function addSort(sortBy){
	let outputURL = ',"sort":[{"field":"' + sortBy + '","sortOrder":"DESC"}]';
	if(sortBy == "")
		return "";
	else return outputURL;
}
function addPage(pageNo){
	return ',"paging":{"start":' + (parseInt(pageNo)-1)*10 +',"rows":10}}&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan';
}
function generate_url(type,cities,bhk,link,sortBy,pageNo){
	link = link + "?selector={";
	link += addfilters(type,cities,bhk,link);
	if(sortBy)
		link += addSort(sortBy);
	link = link + addPage(pageNo);
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
	// try{
	// 	var link_parts = url.parse(query1.link, true);
	// 	var query2 = link_parts.query;
	// 	cl("query2");
	// 	cl(query2);
	// }
	// catch(err){
	// 	cl("Error No Query2");
	// }
	cl("query1");
	cl(query1);
	var category_lst = [];
	var bhk = [];
	var searchText = "";
	var pageNo = 1;
	var sortby = "";
	if(query1.category_lst){
		category_lst = query1.category_lst;
		if(category_lst.length == 2){
			category_lst = ['"Resale"','"Primary"','"Rental"'];
		}
		else{
			if(category_lst[0] == "rent"){
				category_lst = ['"Rental"'];
			}
			else category_lst = ['"Resale"','"Primary"']; 
		}
	}
	else category_lst = ['"Resale"','"Primary"','"Rental"'];
	if(query1.bhk){
		bhk = query1.bhk;
	}
	if(query1.pageNo){
		pageNo = query1.pageNo;
	}
	if(query1.sortby){
		sortby = query1.sortby;
		if(sortby == "relevanceScore") sortby = "";
	}
	if(query1.searchText){
		searchText = query1.searchText;
	}
	// console.log(category_lst,bhk,pageNo,sortby,searchText);
	let link = generate_url(category_lst,searchText,bhk,site,sortby,pageNo);
	rURL.renderURL(link,res);
	cl(link);
	// res.end();
	// if(!Object.keys(query1).length){
	// 	cl("No 1");
		// let link = generate_url(['"Resale"','"Primary"','"Rental"'],[],[],site);
		// rURL.renderURL(link,res);

	// }
	// else if(!Object.keys(query2).length){
	// 	cl("No 2");
	// 	if(query1.form == 'searchForm'){
	// 		cl("search-form");
	// 		let link = generate_url(['"Resale"','"Primary"','"Rental"'],[city[query1.searchText.toLowerCase()]],[],site);
	// 		rURL.renderURL(link,res);
	// 	}
	// 	else{
	// 		cl("filter-form");
	// 		var obj = generateQuery(query1);
	// 		let link;
	// 		if(query1['sortBy']){
	// 			link = generate_url(obj.type_lst,[],obj.category_lst,site,query1['sortBy']);
	// 		}
	// 		else link = generate_url(obj.type_lst,[],obj.category_lst,site);
	// 		// cl(link);
	// 		rURL.renderURL(link,res);	
	// 	}
	// }
	// else {
	// 	cl("Both");
	// 	if(query1.form == 'searchForm'){
	// 		if(query2.form == 'searchForm'){
	// 			let link = generate_url(['"Resale"','"Primary"','"Rental"'],[city[query1.searchText.toLowerCase()]],[],site);
	// 			rURL.renderURL(link,res);
	// 		}
	// 		else{
	// 			var obj = generateQuery(query2);
	// 			let link;
	// 			if(query2['sortBy']){
	// 				link = generate_url(obj.type_lst,[city[query1.searchText.toLowerCase()]],obj.category_lst,site,query2['sortBy']);
	// 			}
	// 			else link = generate_url(obj.type_lst,[city[query1.searchText.toLowerCase()]],obj.category_lst,site);
	// 			rURL.renderURL(link,res);	
	// 		}
	// 	}
	// 	else{
	// 		if(query2.form == 'filterForm'){
	// 			var obj = generateQuery(query1);
	// 			let link;
	// 			if(query1['sortBy']){
	// 				link = generate_url(obj.type_lst,[],obj.category_lst,site,query1['sortBy']);
	// 			}
	// 			else link = generate_url(obj.type_lst,[],obj.category_lst,site);
	// 			rURL.renderURL(link,res);
	// 		}
	// 		else{
	// 			var obj = generateQuery(query1);
	// 			let link;
	// 			if(query1['sortBy']){
	// 				link = generate_url(obj.type_lst,[city[query2.searchText.toLowerCase()]],obj.category_lst,site,query1['sortBy']);
	// 			}
	// 			else link = generate_url(obj.type_lst,[city[query2.searchText.toLowerCase()]],obj.category_lst,site);
	// 			rURL.renderURL(link,res);	
	// 		}
	// 	}

	// }	
});
app.listen(8080,function(){
	cl("listening at port number 8080");
});