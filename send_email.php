<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $surname = filter_input(INPUT_POST, 'surname', FILTER_SANITIZE_STRING);
    $comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_STRING);

    if ($name && $surname && $comment) {
        $to = 'balli.balarishith.cys@gmail.com';
        $subject = 'New Contact Form Submission';
        $message = "Name: $name $surname\n\nComment:\n$comment";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/plain;charset=UTF-8" . "\r\n";
        $headers .= 'From: <webmaster@balarishithballi.com>' . "\r\n";
        $headers .= 'Reply-To: <webmaster@balarishithballi.com>' . "\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo 'Message sent successfully!';
        } else {
            echo 'Failed to send message.';
        }
    } else {
        echo 'All fields are required.';
    }
} else {
    echo 'Invalid request method.';
}
?>
