$sql = "SELECT * FROM users"; // Modify based on your database structure
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "User: " . $row["username"] . "<br>";
    }
} else {
    echo "No users found.";
}
