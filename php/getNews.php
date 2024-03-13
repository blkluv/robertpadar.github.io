<?php
    
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    ini_set('memory_limit', '1024M');

    $executionStartTime = microtime(true);
    
    $country = $_REQUEST['temp'];
    
    //$ch2 = curl_init('https://newsapi.org/v2/top-headlines?country=' . $country . '&apiKey=4c8f174d3d0e4a038204c6f574f99018');
    $ch2 = curl_init('https://newsdata.io/api/1/news?apikey=pub_2826948633ff85e5ae075e2230c376264031b&q=news&country='. $country);
    
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

    $geoData = curl_exec($ch2);

    curl_close($ch2);
    
    $geonames = json_decode($geoData, true);
    
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $geonames;

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);




























/*
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$header[] = 'Content-length: 0 
Content-type: application/json';

$executionStartTime = microtime(true);

$country = $_REQUEST['temp'];
$url = 'https://newsdata.io/api/1/news?apikey=pub_2826948633ff85e5ae075e2230c376264031b&q=news&country=ar';
//$url='https://newsapi.org/v2/top-headlines?country=' . $country . '&apiKey=4c8f174d3d0e4a038204c6f574f99018';

$ch = curl_init();

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result=curl_exec($ch);

$decode = json_decode($result,true);	

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

echo json_encode($output);*/

?>