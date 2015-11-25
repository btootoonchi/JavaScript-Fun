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
		/*document.write("<table border='1'>");
		document.write("<tr><td style='width: 100px; color: red;'>");
		document.write("Row");
		document.write("</td><td style='width: 100px; color: red;'>");
		document.write("Name");
		document.write("</td><td style='width: 100px; color: red;'>");
		document.write("Age");
		document.write("</td><td style='width: 100px; color: red;'>");
		document.write("Salary");
		document.write("</td></tr>");*/
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
			
			/*document.write("<tr><td>");
			document.write(i+1);
			document.write("</td><td>");
			document.write(name);
			document.write("</td><td>");
			document.write(age);
			document.write("</td><td>");
			document.write(salary);
			document.write("</td></tr>");*/
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
		//document.write("</table>");
		htmlWrite += "</table>";
		document.getElementById("employee_list").innerHTML = htmlWrite;
	} else {
		alert("error");
	}
	
	$('.edit').click(function(){
        console.log('clicked to update existing');
		alert("edit");
    });
}