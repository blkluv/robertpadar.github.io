<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $to = "robertpadar@gmail.com";
  //$subject = "This is subject";
  $streetName = $_REQUEST['streetName'];
         
  //$message = "<b>This is HTML message.</b>";
  //$message .= "<h1>This is headline.</h1>";
  $message = $_REQUEST['name'] . "\r\n";
  $message .= $_REQUEST['message'];
         
  $header = "From:abc@somedomain.com \r\n";
  $header .= $_REQUEST['email'];
  //$header .= "Cc:afgh@somedomain.com \r\n";
  //$header .= "MIME-Version: 1.0\r\n";
  //$header .= "Content-type: text/html\r\n";
         
  $retval = mail ($to,$streetName,$message,$header);
         
  if( $retval == true ) {
    echo "Message sent successfully...";
  }else {
    echo "Message could not be sent...";
  }
?>
