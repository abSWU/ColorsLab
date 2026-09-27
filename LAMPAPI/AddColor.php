<?php


	$inData = getRequestInfo();
	
	$color = $inData["color"];
	$userId = $inData["userId"];

	$env = parse_ini_file(__DIR__ . "/../.env");
	$dbHost = $env["DB_HOST"];
	$dbUser = $env["DB_USER"];
	$dbPassword = $env["DB_PASSWORD"];
	$dbName = $env["DB_NAME"];
	$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
		$stmt->bind_param("ss", $userId, $color);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>