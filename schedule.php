<?php

$server = "localhost";
$username = "hsinli_demouser";
$password = "thisismydatabase";
$dbname = "hsinli_acad280";

$conn = new mysqli($server, $username, $password, $dbname);

if($conn->connect_error){
    die("Connected failed: " . $conn->connect_error);
}

// if(isset($_GET["DayDate"])){
//     $DayDate = $conn->real_escape_string($_GET["DayDate"]);
//     $sql = "SELECT * FROM 220420_schedule WHERE DayDate = '$DayDate'";
//     $result = $conn->query($sql);

//     if($result->num_rows > 0){
//         echo "Day,0:00,0:30,1:00,1:30,2:00,2:30,3:00,3:30,4:00,4:30,5:00,5:30,6:00,6:30,7:00,7:30,8:00,8:30,9:00,9:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30,23:00,23:30\n";
//         while($row = $result->fetch_assoc()){
//             echo $row["DayDate"] . "," . $row["T1"] . "," . $row["T2"] . "," . $row["T3"] . "," . $row["T4"] . "," . $row["T5"] . "," . $row["T6"] . "," . $row["T7"] . "," . $row["T8"] . "," . $row["T9"] . "," . $row["T10"] . "," .
//             $row["T11"] . "," . $row["T12"] . "," . $row["T13"] . "," . $row["T14"] . "," . $row["T15"] . "," . $row["T16"] . "," . $row["T17"] . "," . $row["T18"] . "," . $row["T19"] . "," . $row["T20"] . "," .
//             $row["T21"] . "," . $row["T22"] . "," . $row["T23"] . "," . $row["T24"] . "," . $row["T25"] . "," . $row["T26"] . "," . $row["T27"] . "," . $row["T28"] . "," . $row["T29"] . "," . $row["T30"] . "," .
//             $row["T31"] . "," . $row["T32"] . "," . $row["T33"] . "," . $row["T34"] . "," . $row["T35"] . "," . $row["T36"] . "," . $row["T37"] . "," . $row["T38"] . "," . $row["T39"] . "," . $row["T40"] . "," .
//             $row["T41"] . "," . $row["T42"] . "," . $row["T43"] . "," . $row["T44"] . "," . $row["T45"] . "," . $row["T46"] . "," . $row["T47"] . "," . $row["T48"] . "\n";
//         }
//     }
// }

$sql = "SELECT * FROM final_schedule";
$result = $conn->query($sql);

if($result->num_rows > 0){
    echo "id,Day,0:00,0:30,1:00,1:30,2:00,2:30,3:00,3:30,4:00,4:30,5:00,5:30,6:00,6:30,7:00,7:30,8:00,8:30,9:00,9:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30,23:00,23:30\n";
    while($row = $result->fetch_assoc()){
        echo $row["id"] . "," . $row["DayDate"] . "," . $row["T1"] . "," . $row["T2"] . "," . $row["T3"] . "," . $row["T4"] . "," . $row["T5"] . "," . $row["T6"] . "," . $row["T7"] . "," . $row["T8"] . "," . $row["T9"] . "," . $row["T10"] . "," .
        $row["T11"] . "," . $row["T12"] . "," . $row["T13"] . "," . $row["T14"] . "," . $row["T15"] . "," . $row["T16"] . "," . $row["T17"] . "," . $row["T18"] . "," . $row["T19"] . "," . $row["T20"] . "," .
        $row["T21"] . "," . $row["T22"] . "," . $row["T23"] . "," . $row["T24"] . "," . $row["T25"] . "," . $row["T26"] . "," . $row["T27"] . "," . $row["T28"] . "," . $row["T29"] . "," . $row["T30"] . "," .
        $row["T31"] . "," . $row["T32"] . "," . $row["T33"] . "," . $row["T34"] . "," . $row["T35"] . "," . $row["T36"] . "," . $row["T37"] . "," . $row["T38"] . "," . $row["T39"] . "," . $row["T40"] . "," .
        $row["T41"] . "," . $row["T42"] . "," . $row["T43"] . "," . $row["T44"] . "," . $row["T45"] . "," . $row["T46"] . "," . $row["T47"] . "," . $row["T48"] . "\n";
    }
}
?>