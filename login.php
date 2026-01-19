<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$q = $conn->prepare("SELECT * FROM users WHERE email=?");
$q->bind_param("s",$email);
$q->execute();
$result = $q->get_result();
$user = $result->fetch_assoc();

if($user && password_verify($password, $user['password'])){
    $_SESSION['user'] = $user;
    echo json_encode(["status"=>"success","role"=>$user['role']]);
}else{
    echo json_encode(["status"=>"error"]);
}
