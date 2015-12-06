<?php 
	session_start();
	
	$id=$_GET["id"];
	$name=$_GET["n"];
	$age = $_GET["a"];
	$salary = $_GET["s"];
	
	// get the q parameter from URL
	$xmlDoc = new DOMDocument();
	$xmlDoc->load("../employee.xml");
	$x=$xmlDoc->getElementsByTagName('name');

	for ($i=0; $i<=$x->length-1; $i++) {
		//Process only element nodes
		if ($x->item($i)->nodeType==1) {
			if ($x->item($i)->childNodes->item(0)->nodeValue == $name) {
				$y=($x->item($i)->parentNode);
			}
		}
	}

	$cd=($y->childNodes);

	for ($i=0;$i<$cd->length;$i++) { 
		//Process only element nodes
		if ($cd->item($i)->nodeType==1) {
			echo("<b>" . $cd->item($i)->nodeName . ":</b> ");
			echo($cd->item($i)->childNodes->item(0)->nodeValue);
			echo("<br>");
		}
	}	
	
	$e=$xmlDoc->getElementsByTagName('employee');
	$e->item($id)->getElementsByTagName('name')->item(0)->nodeValue = $name;
	$e->item($id)->getElementsByTagName('age')->item(0)->nodeValue = $age;
	$e->item($id)->getElementsByTagName('salary')->item(0)->nodeValue = $salary;
	header("Content-type: text/xml");
	
	// Add new data
	$root = $xmlDoc->lastChild;
	$emp = $xmlDoc->createElement( "employee" );
	//$xmlDoc->appendChild( $emp );
	$root->appendChild( $emp );
	
	$nameElement = $xmlDoc->createElement( "name" );
	$emp->appendChild( $nameElement );
	$nameElement->appendChild($xmlDoc->createTextNode($name));
	
	$ageElement = $xmlDoc->createElement( "age" );
	$emp->appendChild( $ageElement );
	$ageElement->appendChild( $xmlDoc->createTextNode($age));
	
	$salaryElement = $xmlDoc->createElement( "salary" );
	$emp->appendChild( $salaryElement );
	$salaryElement->appendChild( $xmlDoc->createTextNode($salary));
	
	echo $xmlDoc->saveXML();
	$xmlDoc->save("../employee.xml");
?>