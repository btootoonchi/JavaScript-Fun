const MAX_WEIGHT = 100000;
var computerList = [];
var selectedList = [];
var total_price = 0.0;

$(document).ready(function () {
    loadJson();
});

function loadJson() {
	//window.alert("Load json file !!!!");
	
	
	//$(document).ready(function() {
		
        $.getJSON('http://shopicruit.myshopify.com/products.json', function (json) {                
			//alert(json.products[1].id)
			//alert(json.products.length)
			var htmlWrite = "<table border='1'>";
		
			htmlWrite += "<tr><td style='width: 100px; color: red;'>";
			htmlWrite += "Row";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Product";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "ID";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Variants";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Variants ID";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Variants Title";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Variants grams";
			htmlWrite += "</td><td style='width: 100px; color: red;'>"
			htmlWrite += "Variants Price";
			htmlWrite += "</td></tr>";
			
			var index = 0;
			var weight = 0.0;
			
			for (var i = 0; i < json.products.length; i++) {
				var obj = json.products[i];
				if (obj.product_type == "Computer") {
					console.log(obj.id);
					
					for (var j = 0; j < obj.variants.length; j++) {
						var vrintObj = obj.variants[j];
                        if (vrintObj.available == true && vrintObj.product_id == obj.id) {
						    //console.log(vrintObj.id);
							computerList.push(json.products[i]);
							htmlWrite += "<tr><td>";
							htmlWrite += index+1;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].title;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].id;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].vendor;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].variants[j].id;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].variants[j].title;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].variants[j].grams;
							htmlWrite += "</td><td>";
							htmlWrite += json.products[i].variants[j].price;
							htmlWrite += "</td><td>";
							htmlWrite += "<button index="+ i + " var_j="+ j +" class='add'>Add</button>";
							htmlWrite += "</td><td>";
							htmlWrite += "<button index="+ i + " var_j="+ j +" class='delete'>Delete</button>";
							htmlWrite += "</td></tr>";
							index += 1;
							
							if (isNumeric(json.products[i].variants[j].price) && isNumeric(json.products[i].variants[j].grams)) {
								var temp = weight+parseInt(json.products[i].variants[j].grams);
								if (temp <= MAX_WEIGHT) {
									weight += parseInt(json.products[i].variants[j].grams);
									total_price += parseFloat(json.products[i].variants[j].price);
								} 
								else
									break;
							}
						}
					}
				}
			}
			htmlWrite += "</table>";
			document.getElementById("computer_list").innerHTML = htmlWrite;
			document.getElementById("txtOutput").innerHTML = total_price.toFixed(2)+ "<br>";
			
			$('.add').click(function () {
				console.log('clicked to update existing'); var id = $(this).attr("index");
				selectedList.push(id);
				selectedList.push(json.products[$(this).attr("index")].variants[$(this).attr("var_j")].grams);
				selectedList.push(json.products[$(this).attr("index")].variants[$(this).attr("var_j")].price);
				render_add_box($(this).attr("index"), selectedList);
			});
			
			$('.delete').click(function () {
				console.log('clicked to delete existing');
				//remove_employee($(this).attr("index"));
			});
        });
		console.log(computerList.length);
		//console.log(t.length);
    //});
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function render_add_box(index, select_list){
	console.log(index);
	console.log(select_list.length);
}