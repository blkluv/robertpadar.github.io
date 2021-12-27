<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $from = 'From: agriindiaexp.com';
  $to = 'admin@robertpadar.co.uk';
  $subject = $_POST['subject'];

  $body = "From: $name\n E-Mail: $email\n Message:\n $message";

  if ($_POST['submit']) {
    if (mail($to, $subject, $body, $from)) {
        $success = "Message successfully sent";
    } else {
        $success = "Message Sending Failed, try again";
    }
  }
?>
