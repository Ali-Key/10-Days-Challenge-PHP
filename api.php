
<?php



header("Content-Type: application/json");

include "conn.php";

// function readAll
// function insert 
// function update
// function delete



$action = $_POST['action'];

// Reading all the students
function readAll($conn)
{

    $data = array();
    $message = array();
    // select * from users in database
    $query = "select * from student";

    // execute query 
    $result = $conn->query($query);


    // success or error
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $message = array("status" => true, "data" => $data);
    } else {
        $message = array("status" => false, "data" => $conn->connect_error);
    }

    echo json_encode($message);
}




// read students info
function readStudentInfo($conn)
{

    $data = array();
    $message = array();

    $id = $_POST['id'];


    // update student
    $query = " SELECT * FROM student WHERE id     = '$id'";
    $result = $conn->query($query);

    // success or error
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $message = array("status" => true, "data" => $data);
    } else {
        $message = array("status" => false, "data" => $conn->connect_error);
    }

    echo json_encode($message);
}







// Register student
function registerStudent($conn)
{

    // get data from user
    $studentId = $_POST["id"];
    $studentName = $_POST["name"];
    $studentClass = $_POST["class"];

    $data = array();

    // insert into database
    $query = "INSERT INTO student (id, name, class) VALUES ('$studentId', '$studentName', '$studentClass')";

    // execute query
    $result = $conn->query($query);


    // success or error
    if ($result) {
        $data = array("status" => true, "data" => "Registered successfully..😍");
    } else {
        $data = array(" status" => false, "data" => $conn->connect_error);
    }

    echo json_encode($data);
}

// Update student 
function updateStudent($conn)
{

    // get data from user
    $studentId = $_POST["id"];
    $studentName = $_POST["name"];
    $studentClass = $_POST["class"];

    $data = array();

    // insert into database
    $query = "UPDATE student SET name = '$studentName', class = '$studentClass' WHERE id = '$studentId'";

    // execute query
    $result = $conn->query($query);


    // success or error
    if ($result) {
        $data = array("status" =>  true, "data" => " updated successfully..😍");
    } else {
        $data = array(" status" => false, "data" => $conn->connect_error);
    }
    echo json_encode($data);
}

// Delete student
function deleteStudent($conn)
{

    // get data from user
    $studentId = $_POST["id"];

    $data = array();

    // insert into database
    $query = "DELETE FROM student WHERE id = '$studentId'";

    // execute query
    $result = $conn->query($query);


    // success or error
    if ($result) {
        $data = array("status" =>  true, "data" => " deleted successfully..😍");
    } else {
        $data = array(" status" => false, "data" => $conn->connect_error);
    }
    echo json_encode($data);
}



if (isset($action)) {
    $action($conn);
} else {
    echo  "Action is required....";
}












?>