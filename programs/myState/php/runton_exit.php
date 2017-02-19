<?php
	session_start();

	$_SESSION = unset($_SESSION['PHPSESSID']);

	session_destroy();
?>