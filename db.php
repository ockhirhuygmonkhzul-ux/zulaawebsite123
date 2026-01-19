<?php
$conn = new mysqli("localhost", "root", "", "computer_repair");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
