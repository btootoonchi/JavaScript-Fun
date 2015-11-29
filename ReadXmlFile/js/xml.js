var employee = [];

$(document).ready(function() {
	readXML();
});

function readXML() {
	var xml = new XMLHttpRequest();
	xml.open('GET', 'employee.xml', false);
	xml.send();
				
	/*var xmlData = xml.responseText;
	document.write(xmlData);*/
				
	var xmlData = xml.responseXML;
	if (xmlData) {
		xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
		var emp = xmlData.getElementsByTagName('employee');
		var htmlWrite = "<table border='1'>";
		
		htmlWrite += "<tr><td style='width: 100px; color: red;'>";
		htmlWrite += "Row";
		htmlWrite += "</td><td style='width: 100px; color: red;'>"
		htmlWrite += "Name";
		htmlWrite += "</td><td style='width: 100px; color: red;'>"
		htmlWrite += "Age";
		htmlWrite += "</td><td style='width: 100px; color: red;'>"
		htmlWrite += "Salary";
		htmlWrite += "</td></tr>";
		
		for (var i = 0;i < emp.length; ++i) { 
			var name = emp[i].getElementsByTagName('name')[0].firstChild.data;
			var age = emp[i].getElementsByTagName('age')[0].firstChild.data;
			var salary = emp[i].getElementsByTagName('salary')[0].firstChild.data;
			
			htmlWrite += "<tr><td>";
			htmlWrite += i+1;
			htmlWrite += "</td><td>";
			htmlWrite += name;
			htmlWrite += "</td><td>";
			htmlWrite += age;
			htmlWrite += "</td><td>";
			htmlWrite += salary;
			htmlWrite += "</td><td>";
			htmlWrite += "<button index="+ i +" class='edit'>Edit</button>";
			htmlWrite += "</td></tr>";
		}
		htmlWrite += "</table>";
		document.getElementById("employee_list").innerHTML = htmlWrite;
	} else {
		alert("error");
	}
	
	$('.edit').click(function(){
        console.log('clicked to update existing'); var id = $(this).attr("index");
		employee.push(id);
		employee.push(emp[$(this).attr("index")].getElementsByTagName('name')[0].firstChild.data);
		employee.push(emp[$(this).attr("index")].getElementsByTagName('age')[0].firstChild.data);
		employee.push(emp[$(this).attr("index")].getElementsByTagName('salary')[0].firstChild.data);
		render_edit_box($(this).attr("index"), employee);
    });
}

function render_edit_box(index, employee){
	document.getElementById("name").value = employee[1];
	document.getElementById("age").value = employee[2];
	document.getElementById("salary").value = employee[3];
}

function update_employee() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		//alert("function readyState: "+xhttp.readyState+", status: "+xhttp.status);
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//clearTimeout(xhttpTimeout);   // Looks like we didn't time out!
			//alert(xhttp.responseText);
			document.getElementById("txtOutput").innerHTML = xhttp.responseText;
		}
	}

	//alert("php/xml.php?n="+document.getElementById("name").value+"&a="+document.getElementById("age").value+"&s="+document.getElementById("salary").value);
	//alert("php/xml.php?id="+employee[0]+"&n="+document.getElementById("name").value+"&a="+document.getElementById("age").value+"&s="+document.getElementById("salary").value);
	xhttp.open("GET","php/xml.php?id="+employee[0]+"&n="+document.getElementById("name").value+"&a="+document.getElementById("age").value+"&s="+document.getElementById("salary").value,true);
	
	// Timeout to abort in 5 seconds
	/*var xhttpTimeout=setTimeout("ajaxTimeout();",50000);
	function ajaxTimeout(){
		xhttp.abort();
		alert("Well dang, the AJAX request timed out.  Did you lose network "+"connectivity for some reason?");
		// Note that at this point you could try to send a notification to the
		// server that things failed, using the same xhttp object.
	}*/
	xhttp.send(null);
}
