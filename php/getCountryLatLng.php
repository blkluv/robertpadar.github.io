<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    ini_set('memory_limit', '1024M');

    $executionStartTime = microtime(true);

    $country = $_REQUEST['country'];

    $ch2 = curl_init('https://restcountries.com/v3/alpha/' . $country);

    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

    $geoData = curl_exec($ch2);

    curl_close($ch2);

    $geonames = json_decode($geoData, true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $geonames;

    $nameCommon = $output['data']['0']['name']['common'];
    $capitalCity = $output['data']['0']['capital'];
    $latlng = $output['data']['0']['latlng'];

    $arrayData = [$capitalCity, $latlng, $nameCommon];
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($arrayData);

?>