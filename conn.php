<?php


$conn = mysqli_connect('localhost', 'root', '', 'mydb');

if ($conn -> connect_error){
   echo $conn -> connect_error;
}




?>