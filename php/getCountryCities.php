<?php
    
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $iso3 = $_REQUEST['country'];
    
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://api.countrystatecity.in/v1/countries/'. $iso3 .'/cities',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'X-CSCAPI-KEY: NWVqbEhDS29Tc21xQ0lCSkU3eGVwYWVQQkRSNlJ4TlVpT3lEV1ZqVw=='
      ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    
    $decode = json_decode($response, true);
    
    shuffle($decode);
    
    $decode = array_slice($decode, 0, 40);
    
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode;

    echo json_encode($output);

?>
