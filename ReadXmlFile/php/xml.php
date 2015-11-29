<?php 
	//session_start();
	//readXmlFile();
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
	
	/*$r = $xmlDoc->createElement( "employee" );
	$xmlDoc->appendChild( $r );*/
	$emp = $xmlDoc->createElement( "employee" );
	$n = $xmlDoc->createElement( "name" );
	$n->appendChild( $xmlDoc->createTextNode($name));
	$emp->appendChild( $n );
	$a = $xmlDoc->createElement( "age" );
	$a->appendChild( $xmlDoc->createTextNode($age));
	$emp->appendChild( $a );
	$s = $xmlDoc->createElement( "salary" );
	$s->appendChild( $xmlDoc->createTextNode($salary));
	$emp->appendChild( $s );
	echo $xmlDoc->saveXML();
	$xmlDoc->save("../employee.xml");

	/*$age = $_REQUEST["age"];
	$salary = $_REQUEST["salary"];*/
	//echo $_GET["n"];
	/*if (isset($name) && isset($age) && isset($salary)) {
		if (!empty($name) && !empty($age) && !empty($salary)) {
			$xml = new SimpleXMLElement('employee.xml', null, true);
			//add a new book entry to your xml object
			$xml->employee->addChild("name", $name);
			$xml->employee->addChild("age", $age);
			$xml->employee->addChild("salary", $salary);
			$xml->asXml('employee.xml');
			
			// prevent re-posting prompt by redirecting to same url with a 303 status 
			header('Location: '. $_SERVER['PHP_SELF'] , true, 303);
			// Redirect to this page. PHP_SELF would refer to /index.php.
			// header("Location: " . $_SERVER['REQUEST_URI']);
			exit;
		} else {
			echo 'Fill in all fields.';
		}
	}*/
?>