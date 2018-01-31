$(document).ready(function(){
			var para_array = [];
			var para_obj = {};
			var startIndex = 0;
			var pageNo = 1;
			function string_parser(){
				var query = "";
				if(window.location.href.split("?")[1]){
					query = window.location.href.split("?")[1]; 
					para_array = query.split("&");
				}
				else {
					$("#display-div").css("display","none");
					$("#home-top-div").css("height","70px");
					$("#body-div").css("margin-top","70px");
					para_array = [];
				}
				for(let i=0;i<para_array.length;i++){
					var _key = para_array[i].split("=")[0];
    				para_obj[_key] = para_array[i].split("=")[1];
				}
				// console.log(para_array.length, " ", para_obj.pageNo,para_obj);
				if(para_array.length == 1 && para_obj['pageNo']){
					$("#display-div").css("display","none");
					$("#home-top-div").css("height","70px");
					$("#body-div").css("margin-top","70px");
				}
			}

			function appendRest(queryString,prop,para_obj){
				console.log("prop=",prop);
				for(var p in para_obj){
					if(p != prop){
						if(queryString!="?"){
							queryString += "&";
							queryString += p.toString() + "=" + para_obj[p].toString();
						}
					}
				}
				return queryString;
			}
			string_parser();
			function createDisplayButton(txt){
				var button = document.createElement("button");
				button.innerHTML = txt;
				button.className = "tag-button";
				$("#display-div").append(button);
			}
			function checkbox_checker(){
				for(var prop in para_obj){
					console.log("prop = ",prop,para_obj[prop].length);
					if(prop == "category_lst"){
						let cat_arr = para_obj['category_lst'].substring(1,para_obj['category_lst'].length-1);
						let category_lst = cat_arr.split(",");
						console.log("cl = ",category_lst);
						if(category_lst.length==1){
							if(category_lst[0] == "rent"){
								$(".checkbox-box[name='rent']").prop('checked',true);
								createDisplayButton("rent");
							}
							if(category_lst[0] == "buy"){
								$(".checkbox-box[name='buy']").prop('checked',true);
								createDisplayButton("buy");
							}
						}
						else{
							$(".checkbox-box[name='rent']").prop('checked',true);
							$(".checkbox-box[name='buy']").prop('checked',true);
							createDisplayButton("rent");
							createDisplayButton("buy");
						}
					}
					else if(prop == "sortby"){
						// console.log("in sortby",para_obj['sortby']);
						if(para_obj['sortby'] == "price"){
							// console.log(sortby);
							$(".sort-button[name='price']").css("background-color","rgb(125,125,125)");
							createDisplayButton("Price");
						}
						else if(para_obj['sortby'] == "relevanceScore"){
							// console.log(sortby);
							$(".sort-button[name='relevanceScore']").css("background-color","rgb(125,125,125)");
							createDisplayButton("Relevance");
						}
						else{
							// console.log(sortby);
							$(".sort-button[name='listingSellerCompanyScorerating']").css("background-color","rgb(125,125,125)");
							createDisplayButton("Rating");
						}
					}
					else if(prop == "searchText"){
						createDisplayButton(para_obj[prop]);
					}
					else if(prop == "pageNo"){
						startIndex = (para_obj[prop]-1)*10;
						pageNo = para_obj[prop];
					}
					else{
						let bhk = JSON.parse(para_obj['bhk']);
						for(var i=0;i<bhk.length;i++){
							var _name = bhk[i].toString() + 'BHK';
							console.log(_name);
							if($(".checkbox-box[name="+_name+"]").prop('checked',true));
						}
						createDisplayButton(bhk+' BHK');
					}
				}
			}
			checkbox_checker();
			function pageNoSetter(){
				for(let i =0;i<5;i++){
					$("#multi-button-wrapper .page-buttons:nth-child(" + (i+1) +")").text(parseInt(pageNo)+parseInt(i));
				}
			}
			pageNoSetter();
			console.log("para_array = ",para_array);
			console.log("para_obj = ",para_obj);
			var obj = {};
			var bhk = [];
			var category_lst = [];
			var sortby = "";
			var searchText = "";
			var	queryString = "?";
			$(".checkbox-box").click(function(){
				if($(this).prop("checked") == true){
					let flag = 0;
					var index = 0;
					if($(this).attr("name") == "1BHK" || $(this).attr("name") == "2BHK" || $(this).attr("name") == "3BHK" || $(this).attr("name") == "4BHK"){
						console.log("in bhk");
						if(para_obj['bhk']){
							console.log("bhk in link",bhk);
							var bhk = JSON.parse(para_obj['bhk']);
							for(let i=0;i<bhk.length;i++){
								if(bhk[i] == parseInt($(this).attr("name")[0])){
									flag = 1;
									break;
								}
							}
							if(flag == 0)
							bhk.push(parseInt($(this).attr("name")[0]));
							bhk = bhk.toString();
						}
						else{ 
							console.log("bhk not in link",bhk)
							bhk = [];
							bhk.push(parseInt($(this).attr("name")[0]));
						}
						if(queryString!="?")queryString += "&";
						queryString += "bhk=[" + bhk + ']';	
						console.log(bhk);
						console.log(queryString);
  						console.log("/" + queryString);
						var link = appendRest(queryString,"bhk",para_obj);
						window.location = "/" + link;
					}
					else{
						console.log("category_lst me hai"); 
						if(para_obj['category_lst']){
							var cat_arr = para_obj['category_lst'].substring(1,para_obj['category_lst'].length-1);
							var category_lst = cat_arr.split(",");
							for(let i=0;i<category_lst.length;i++){
								if(category_lst[i] == $(this).attr("name")){
									flag = 1;
									break;
								}
							}
							if(flag == 0)
								category_lst.push($(this).attr("name"));
						}
						else{ 
							console.log("bhk not in link",bhk)
							category_lst = [];
							category_lst.push($(this).attr("name"));
						}
						category_lst = category_lst.toString();
						if(queryString!="?")queryString += "&";
							queryString += "category_lst=[" + category_lst + ']';	
						console.log("category_lst = ",category_lst);
						console.log("queryString = ",queryString);
						console.log("/" + queryString);
						var link = appendRest(queryString,"category_lst",para_obj);
						window.location = "/" + link;
						console.log("link=",link);
					}
				}
				else{
					if($(this).attr("name") == "1BHK" || $(this).attr("name") == "2BHK" || $(this).attr("name") == "3BHK" || $(this).attr("name") == "4BHK"){
						let index = 0;
						console.log(bhk);
						console.log("uncheck bhk");
						// console.log("bhk in link",bhk);
						var bhk = JSON.parse(para_obj['bhk']);
						for(let i=0;i<bhk.length;i++){
							if(bhk[i] == parseInt($(this).attr("name")[0])){
								index = i;
								break;
							}
						}
						bhk.splice(index, 1);
						if(bhk.length == 0){
							var link = appendRest(queryString,"bhk",para_obj);
							window.location = "/" + link;	
						}
						else{
							bhk = bhk.toString();
							if(queryString!="?")queryString += "&";
							queryString += "bhk=[" + bhk + ']';	
							console.log(bhk);
							console.log(queryString);
	  						console.log("/" + queryString);
	  						var link = appendRest(queryString,"bhk",para_obj);
							window.location = "/" + link;
						}
					}
					else{
						var index = 0;
						var cat_arr = para_obj['category_lst'].substring(1,para_obj['category_lst'].length-1);
						var category_lst = cat_arr.split(",");
						for(let i=0;i<category_lst.length;i++){
							if(category_lst[i] == $(this).attr("name")){
								index = i;
								break;
							}
						}
						category_lst.splice(index, 1);
						if(category_lst.length == 0){
							var link = appendRest(queryString,"category_lst",para_obj);
							window.location = "/" + link;	
						}
						else{
							category_lst = category_lst.toString();
							if(queryString!="?")queryString += "&";
							queryString += "category_lst=[" + category_lst + ']';	
							console.log(category_lst);
							console.log(queryString);
							console.log("/" + queryString);
							var link = appendRest(queryString,"category_lst",para_obj);
							window.location = "/" + link;
						}
					}
				}
			});
			$(".sort-button").click(function(){
				sortby = $(this).attr("name");
				console.log(sortby);
				if(queryString != "?")queryString += "&";
				queryString += "sortby=" + sortby ;
				var link = appendRest(queryString,"sortby",para_obj);
				window.location = "/" + link;
				console.log(link);
			});
			$("#search-go-button").click(function(){
				searchText = $("#search-bar").val();
				console.log(searchText);
				if(queryString!="?") queryString += "&";
				queryString += "searchText=" + searchText;
				var link = appendRest(queryString,"searchText",para_obj);
				window.location = "/" + link;
			});
			$(".page-buttons").click(function(){
				// console.log("pageNo = ",pageNo);
				if($(this).attr("id")== "prev-button"){
					// console.log("prev-page");
					pageNo = pageNo-1;
				}
				else if($(this).attr("id")== "next-button"){
					// console.log("next-page");
					pageNo = parseInt(pageNo) + 1;
				}
				else pageNo = parseInt($(this).text());
				console.log(pageNo);
				if(queryString!="?") queryString += "&";
				queryString += "pageNo=" + pageNo;
				var link = appendRest(queryString,"pageNo",para_obj);
				window.location = "/" + link;
			});
			$("#reset-button").click(function(){
				window.location = "/";
			});
		});