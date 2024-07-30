<?php
// Replace with your email settings
$to = "balarishith.balli.cys@gmail.com";
$subject = "website comment";

$name = $_POST['name'];
$email = $_POST['email']; // Replaced 'surname' with 'email'
$comment = $_POST['comment'];

$message = "Name: $name\nEmail: $email\nComment:\n$comment";

$headers = "From: $name <$name@example.com>";

if (mail($to, $subject, $message, $headers)) {
  echo "Email sent successfully!";
} else {
  echo "Error sending email!";
}
?>
