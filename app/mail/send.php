<?php

	$to = "<test@mail.com>";
	$subject = "Mail from site";

	$name       = $_POST['name'];
	$phone      = $_POST['phone'];
	$email      = $_POST['email'];
	$message    = $_POST['message'];

	$message = ' 
	<html> 
		<head> 
			<title>Данные:</title> 
		</head> 
		<body> 
			<p>Имя: '.$name.'</p> 
			<p>Телефон: '.$phone.'</p> 
			<p>Отправлено с формы: '.$formsended.'</p> 
		</body> 
	</html>';

	$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	$headers .= 'From: <mysite@mail.com>' . "\r\n";
	$headers .= 'Reply-To:' . $to . "\r\n";
	$headers .= "Contacts: \r\n";

	mail($to, $subject, $message, $headers);

?>