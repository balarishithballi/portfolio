<?php
// Replace with your email settings
$to = "balarishith.ball.cys.com";
$subject = "website comment";

$name = $_POST['name'];
$surname = $_POST['surname'];
$comment = $_POST['comment'];

$message = "Name: $name\nSurname: $surname\nComment:\n$comment";

$headers = "From: $name <$name@example.com>";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Error sending email!";
}
?>
