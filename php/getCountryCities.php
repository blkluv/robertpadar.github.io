<?php
    
    
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $country = $_REQUEST['country'];

    $url='https://countriesnow.space/api/v0.1/countries/population/cities/filter/q?limit=60&order=asc&orderBy=name&country=' . $country;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result=curl_exec($ch);

    curl_close($ch); 

    $decode = json_decode($result, true);
    $decode = $decode['data'];
    shuffle($decode);
    
    $decode = array_slice($decode, 0, 20);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode;
    
    //header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);
?>