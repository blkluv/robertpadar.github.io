var streets = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2023"
    }
);
  
var satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
);
var basemaps = {
    "Streets": streets,
    "Satellite": satellite
};
  
var map = L.map("map", {
    layers: [streets]
}).setView([54.5, -4], 6);
  
var layerControl = L.control.layers(basemaps).addTo(map);

var iso3 = "";

var orangeMarker = L.ExtraMarkers.icon({
    icon: 'fa-sun',
    markerColor: 'orange',
    shape: 'star',
    prefix: 'fa'
});

var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-wikipedia-w',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
});

L.easyButton("fe-sharp fa-solid fa-info", function () {
    // Country Info
    $("#overview").modal("show");
    $.ajax({
        url: 'php/getCountryInfo.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: iso3,
        },
        success: function(response) {
            var countryArray = (response['data']['0']);
            var countryCode= iso3.toLowerCase();
            var languages = countryArray.languages;
            var currencies = countryArray.currencies;
            var currenciesName = Object.values(currencies)[0];
            var demonyms = countryArray['demonyms']['eng'].f;

            $("#overview").modal("show");
            $(".flag").attr("src", countryArray['flags']['1']);
            $(".iso3").text(countryArray['altSpellings']['1'] + "(" + countryArray['cca2'] + ")" );
            $(".text-country").html(countryArray['name']['common']);
            $(".text-continent").html(countryArray['region']);
            $(".text-language").html(Object.values(languages));
            $(".text-area").html(countryArray['area'] + " Km<sup>2</sup>");
            $(".text-population").html(countryArray['population']);
            $(".text-currencies").html(currenciesName.name + "&emsp;" + currenciesName.symbol);
            $(".text-latlng").text(countryArray['latlng']);
            $(".text-demonyms").html(demonyms);
        }
    })
}, "Regular info").addTo(map);

L.easyButton("fa-sharp fa-solid fa-newspaper", function () {
    // Country News
    $("#news").modal("show");
    $.ajax({
        url:  "php/getNews.php",
        type: "POST",
        dataType: "json",
        data:  {
            temp: iso3
        },
        success: function(news) {
            $("#news").modal("show");
            $('.newsSecondary').append('<div id="clear" class="clear"></div>')
            for(i=0; i<news['data']['results'].length; i++) {
                $('.clear').append('<div class="secondaryFlex column">' +
                '<div class="first"><div class="title'+i+'"></div><br>' +
                '<div class="image'+i+'"><img width="100%" class="img'+i+'" ' +
                'src="" alt="No image"</div><div class="links'+i+'"><a href="" ' +
                'class="link'+i+'"></a></div><div class="date'+i+'"></div>' +
                '</div></div><br>')
            }
            for(i=0; i<=news['data']['results'].length; i++) {
                $(".title" + i).html(news['data']['results'][i].title);
                $(".img" + i).attr("src", news['data']['results'][i].image_url);
                $(".link" + i).attr("href", news["data"]["results"][i]['link']).text(news["data"]["results"]["1"]['link']);
                $(".date" + i).html(news["data"]["results"][i]['pubDate'])
            }
        }
    })
}, 'News').addTo(map);

L.easyButton("fa-sharp fa-solid fa-sun", function (btn, map) {
    // Country weather by cities
    var city = [];
    $.ajax({
        url: 'php/getCountryCities.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: iso3,
        },
        success: function(resp) {
            var cities = resp['data'];
            const iterator = cities.values();
            for (const value of iterator) {
                city.push(value['name']);
            }
                    
            city.forEach(myFunction);
            function myFunction(item, index) {
                var cityData = {};
                s= item.split(/(?<=^\S+)\s/);
                item = s['0'];
                        
                $.ajax({
                    method: 'GET',
                    url: 'https://api.api-ninjas.com/v1/geocoding?city=' + item,
                    headers: { 'X-Api-Key': 'xC3M6iWdV5zyxAk9jhmR6g==XG4LHu9uVQYzSIvz'},
                    contentType: 'application/json',
                    success: function(result) {
                        var latitude = result[0].latitude;
                        var longitude = result[0].longitude;
                        cityData.location = ({"lat": latitude, "lng": longitude});
                        let markers = []

                        markers[item] = L.marker([cityData.location.lat, cityData.location.lng], {icon: orangeMarker}).addTo(map).on('click', onWeather);
                        function onWeather(e) {
                            $("#weather").modal("show");
                            $.ajax({
                                url: 'php/getWeather.php',
                                type: 'POST',
                                loadingControl: true,
                                dataType: 'json',
                                data: {
                                    lt: latitude,
                                    ln: longitude
                                },
                                success: function(resp) {
                                    var data = resp['data'];
                                    var cityTemp = ((data['list']['0']['main']['temp']) - 272.15).toFixed(1);
                                    var cityDescription = data['list']['0']['weather']['0'].description;
                                    var imgText = "";
                                    var imgText1 = "";
                                    var imgText2 = "";
                                    var imgText3 = "";
                                    var imgText4 = "";
                                    
                                    if((data['list']['0']['weather']['0'].description).includes("rain")) {
                                        imgText = './images/rain.png';
                                    }else if((data['list']['0']['weather']['0'].description).includes("broken")) {
                                        imgText = './images/cloudSun.png';
                                    }else if((data['list']['0']['weather']['0'].description).includes("overcast") || (data['list']['21']['weather']['0'].description).includes("scattered")) {
                                        imgText = './images/overcast.png';
                                    }else if((data['list']['0']['weather']['0'].description).includes("snow")) {
                                        imgText = './images/snow.png';
                                    }else if((data['list']['0']['weather']['0'].description).includes("heavyRain")) {
                                        imgText = './images/heavyRain.png';
                                    }else {imgText = './images/sunny.png';};

                                    if((data['list']['7']['weather']['0'].description).includes("rain")) {
                                        imgText1 = './images/rain.png';
                                    }else if((data['list']['7']['weather']['0'].description).includes("broken")) {
                                        imgText1 = './images/cloudSun.png';
                                    }else if((data['list']['7']['weather']['0'].description).includes("overcast") || (data['list']['21']['weather']['0'].description).includes("scattered")) {
                                        imgText1 = './images/overcast.png';
                                    }else if((data['list']['7']['weather']['0'].description).includes("snow")) {
                                        imgText1 = './images/snow.png';
                                    }else if((data['list']['7']['weather']['0'].description).includes("heavyRain")) {
                                        imgText1 = './images/heavyRain.png';
                                    }else {imgText1 = './images/sunny.png';};

                                    if((data['list']['14']['weather']['0'].description).includes("rain")) {
                                        imgText2 = './images/rain.png';
                                    }else if((data['list']['14']['weather']['0'].description).includes("broken")) {
                                        imgText2 = './images/cloudSun.png';
                                    }else if((data['list']['14']['weather']['0'].description).includes("overcast") || (data['list']['21']['weather']['0'].description).includes("scattered")) {
                                        imgText2 = './images/overcast.png';
                                    }else if((data['list']['14']['weather']['0'].description).includes("snow")) {
                                        imgText2 = './images/snow.png';
                                    }else if((data['list']['14']['weather']['0'].description).includes("heavyRain")) {
                                        imgText2 = './images/heavyRain.png';
                                    }else {imgText2 = './images/sunny.png';};

                                    if((data['list']['21']['weather']['0'].description).includes("rain")) {
                                        imgText3 = './images/rain.png';
                                    }else if((data['list']['21']['weather']['0'].description).includes("broken")) {
                                        imgText3 = './images/cloudSun.png';
                                    }else if((data['list']['21']['weather']['0'].description).includes("overcast") || (data['list']['21']['weather']['0'].description).includes("scattered")) {
                                        imgText3 = './images/overcast.png';
                                    }else if((data['list']['21']['weather']['0'].description).includes("snow")) {
                                        imgText3 = './images/snow.png';
                                    }else if((data['list']['21']['weather']['0'].description).includes("heavyRain")) {
                                        imgText3 = './images/heavyRain.png';
                                    }else {imgText3 = './images/sunny.png';};
                                            
                                    if((data['list']['28']['weather']['0'].description).includes("rain")) {
                                        imgText4 = './images/rain.png';
                                    }else if((data['list']['28']['weather']['0'].description).includes("broken")) {
                                        imgText4 = './images/cloudSun.png';
                                    }else if((data['list']['28']['weather']['0'].description).includes("overcast") || (data['list']['21']['weather']['0'].description).includes("scattered")) {               
                                        imgText4 = './images/overcast.png';
                                    }else if((data['list']['28']['weather']['0'].description).includes("snow")) {
                                        imgText4 = './images/snow.png';
                                    }else if((data['list']['28']['weather']['0'].description).includes("heavyRain")) {
                                        imgText4 = './images/heavyRain.png';
                                    }else {imgText1 = './images/sunny.png';};
                                            
                                    $('.cityName').text(item);
                                    $('.weatherCountry').text(data['city']['country']);
                                    $('.weatherPopulation').text(data['city']['population']);
                                    $('.weatherMainDate').text(data['list']['0']['dt_txt'])
                                    $('.weatherTemp').text(cityTemp);
                                    $('.weatherDecsription').text(cityDescription);
                                    $('.weatherImg').attr('src', imgText);
                                    $('.feelsLike').text(((data['list']['0']['main']['feels_like']) - 272.15).toFixed(1));
                                    $('.humidity').text(data['list']['0']['main']['humidity']);
                                    $('.visibility').text(data['list']['0']['visibility']);
                                    
                                    $('.weatherMainDate1').text(data['list']['7']['dt_txt']);
                                    $('.weatherTemp1').text(((data['list']['7']['main']['temp']) - 272.15).toFixed(1));
                                    $('.weatherDecsription1').text(data['list']['7']['weather']['0'].description);
                                    $('.weatherImg1').attr('src', imgText1);
                                    $('.feelsLike1').text(((data['list']['7']['main']['feels_like']) - 272.15).toFixed(1));
                                    $('.humidity1').text(data['list']['7']['main']['humidity']);                                        
                                    $('.visibility1').text(data['list']['7']['visibility']);

                                    $('.weatherMainDate2').text(data['list']['14']['dt_txt'])
                                    $('.weatherTemp2').text(((data['list']['14']['main']['temp']) - 272.15).toFixed(1));
                                    $('.weatherDecsription2').text(data['list']['14']['weather']['0'].description);
                                    $('.weatherImg2').attr('src', imgText2);
                                    $('.feelsLike2').text(((data['list']['14']['main']['feels_like']) - 272.15).toFixed(1));
                                    $('.humidity2').text(data['list']['14']['main']['humidity']);
                                    $('.visibility2').text(data['list']['14']['visibility']);
                                            
                                    $('.weatherMainDate3').text(data['list']['21']['dt_txt'])
                                    $('.weatherTemp3').text(((data['list']['21']['main']['temp']) - 272.15).toFixed(1));
                                    $('.weatherDecsription3').text(data['list']['21']['weather']['0'].description);
                                    $('.weatherImg3').attr('src', imgText3);
                                    $('.feelsLike3').text(((data['list']['21']['main']['feels_like']) - 272.15).toFixed(1));
                                    $('.humidity3').text(data['list']['21']['main']['humidity']);
                                    $('.visibility3').text(data['list']['21']['visibility']);

                                    $('.weatherMainDate4').text(data['list']['28']['dt_txt'])
                                    $('.weatherTemp4').text(((data['list']['28']['main']['temp']) - 272.15).toFixed(1));
                                    $('.weatherDecsription4').text(data['list']['28']['weather']['0'].description);
                                    $('.weatherImg4').attr('src', imgText4);
                                    $('.feelsLike4').text(((data['list']['28']['main']['feels_like']) - 272.15).toFixed(1));
                                    $('.humidity4').text(data['list']['28']['main']['humidity']);
                                    $('.visibility4').text(data['list']['28']['visibility']);
                                }
                            })
                        }
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            }
        }
    })
}, "Weather data").addTo(map);

L.easyButton("fa-house-chimney-crack", function (btn, map) {
    // Local earthquakes
    $.ajax({
        url: 'php/getEarthquakes.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: iso3,
        },
        success: function(response) {
            var event = response['data']['earthquakes'];
            for(i=0; i<event.length; i++) {
                var lat = event[i]['lat'];
                var lng = event[i]['lng'];
                var datetime = event[i]['datetime'];
                var depth = event[i]['depth'];
                var magnitude = event[i]['magnitude'];
                var radius = [];
                if(event[i]['magnitude'] < 5) {
                    radius.push(7000);
                } else if(event[i]['magnitude'] >= 5 & event[i]['magnitude'] < 7) {
                    radius.push(12000);
                } else if(event[i]['magnitude'] >= 7) {
                    radius.push(18000)
                }
                circle = L.circle([lat, lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: radius
                }).addTo(map);
                var popup = L.popup({
                    className: 'blink',
                    //offset: [-100, 15],
                    //autoPanPadding: [100,100]
                })
                .setContent('<table>' +
                        "<tr>" +
                            "<td> Datetime: </td>" +
                            "<td> " + datetime +
                        "</tr>" +
                        "<tr>" +
                            "<td> Depth: </td>" +
                            "<td> " + depth +
                        "</tr>" +
                        "<tr>" +
                            "<td> Magnitude: </td>" +
                            "<td>" + magnitude +
                        "</tr>" +
                    '</table>');
                circle.bindPopup(popup);
            };
        },
        error: function(jqXHR,textStatus,errorThrown,){
            alert(textStatus + ' : '  + jqXHR.status + ', ' + errorThrown);
        }
    })
}, "Earthquakes").addTo(map);

L.easyButton("fa-wikipedia-w", function (btn, map) {
    // Local wikipedia landmarks
    var city = [];
    $.ajax({
        url: 'php/getCountryCities.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: iso3,
        },
        success: function(resp) {
            var cities = resp["data"];
            const iterator = cities.values();
            for (const value of iterator) {
                city.push(value['name']);
            }
            
            city.forEach(myFunction);
            function myFunction(item, index) {
                var cityData = {};
                s= item.split(/(?<=^\S+)\s/);
                item = s['0'];

                $.ajax({
                    method: 'GET',
                    url: 'https://api.api-ninjas.com/v1/geocoding?city=' + item,
                    headers: { 'X-Api-Key': 'xC3M6iWdV5zyxAk9jhmR6g==XG4LHu9uVQYzSIvz'},
                    contentType: 'application/json',
                    success: function(result) {
                        var latitude = result[0].latitude;
                        var longitude = result[0].longitude;
                        cityData.location = ({"lat": latitude, "lng": longitude});
                        let markers = [];
                        markers[item] = L.marker([cityData.location.lat, cityData.location.lng], {icon: greenMarker}).addTo(map).on('click', onClick);

                        function onClick(e) {
                            $("#wiki").modal("show");
                            $.ajax({
                                url: 'php/wiki.php',
                                type: 'POST',
                                loadingControl: true,
                                dataType: 'json',
                                data: {
                                    city: item,
                                },
                                success: function(response) {
                                    console.log(response);
                                    var items = response['data'];
                                    $('.wikiModal').append('<div id="clear" class="clear"></div>');
                                    for(i=0; i<items.length; i++) {
                                        $('.clear').append('<div class="wikiFirst">' +
                                        '<div class="image"><img width="200px" class="wikiImg'+i+'" ' +
                                        'src="" alt="No image"></div><div class="wikiData">' +
                                        '<div class="wikiTitle'+i+'"></div><div class="wikiFeature'+i+'">' +
                                        '</div><div class="wikiSummary'+i+'"></div>' +
                                        '<div><a class="wikiSource'+i+'" href=""></a></div></div>' +
                                        '</div><br><hr>');
                                    }
                                    for(i=0; i<=items.length; i++) {
                                        $('.wikiImg'+i).attr('src', items[i].thumbnailImg);
                                        $('.wikiTitle'+i).html(items[i].title);
                                        $('.wikiFeature'+i).html(items[i].feature);
                                        $('.wikiSummary'+i).html(items[i].summary);
                                        $('.wikiSource'+i).attr('href', 'http://'+items[i].wikipediaUrl);
                                        $('.wikiSource'+i).html(items[i].wikipediaUrl);
                                    }
                                }
                            })
                        }
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            }
        }
    })
}, "Wikipedia").addTo(map);

L.easyButton("fa-solid fa-rocket", function (btn, map) {
    // World NASA news
    $("#nasa").modal("show");
    $.ajax({
        url: 'php/getNasaApi.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            
        },
        success: function(response) {
            $('.nasaPhoto').attr('src', response['data']['url']).on('click', function(){
                window.open(response['data']['hdurl']);
            })
            $('.nasaDate').html(response['data']['date']);
            $('.nasaTitle').html(response['data']['title']);
            $('.nasaExplanation').html(response['data']['explanation']);
        }
    })
    document.getElementById('nasaButton').addEventListener('click', function() {
        var search = document.getElementById('nasaValues').value;
        $.ajax({
            url: 'php/getNasaSearch.php',
            type: 'POST',
            loadingControl: true,
            dataType: 'json',
            data: {
                search: search,
            },
            success: function(resp) {
                $('.nasaModalSearch').append('<div id="clear" class="clear"></div>');
                for(i=0; i<resp['data']['items'].length; i++) {
                    $('.clear').append('<div class="nasaSearch">' +
                    '<img width="100%" class="nasaImage'+i+'" src="" alt="">' +
                    '<div class="nasaTitle'+i+'"></div><div class="nasaDescription'+i+'"></div>' +
                    '</div><hr>')
                }
                for(i=0; i<=resp['data']['items'].length; i++) {
                    if(resp['data']['items'][i]['links'] === undefined) {
                        var nasaImage = "../images/No-Image-Placeholder.svg.png";
                        $('.nasaDescription' + i).html(resp['data']['items'][i]['data']['0'].description);
                        $('.nasaImage' + i).attr('src', nasaImage);
                        $('.nasaTitle' + i).html(resp['data']['items'][i]['data']['0'].title);
                    } else {
                        $('.nasaDescription' + i).html(resp['data']['items'][i]['data']['0'].description);
                        $('.nasaImage' + i).attr('src', resp['data']['items'][i]['links']['0'].href);
                        $('.nasaTitle' + i).html(resp['data']['items'][i]['data']['0'].title);
                    }
                }
            }
        })
    });
}, "NASA news").addTo(map);

L.easyButton("fa-solid fa-user-astronaut", function (btn, map) {
    // Mars Rover Photos
    $("#nasaPhotos").modal("show");
    document.getElementById('nasaRoverButton').addEventListener('click', function() {
        var search = document.getElementById('nasaRoverValues').value;
        $.ajax({
            url: 'php/getNasaRoverPhotos.php',
            type: 'POST',
            loadingControl: true,
            dataType: 'json',
            data: {
                sol: search,
            },
            success: function(response) {
                $('.nasaRoverPhotos').append('<div id="clear" class="clear"></div>');
                for(var i =1; i<=response['data'].length; i++){
                    $('.clear').append('<figure class="column">'+
                    '<img class="nasaMarsPhoto'+i+'" src="" alt="">'+
                    '<a class="nasaBigSize'+i+'" href=""><figcaption class="nasaFigcaption'+i+'"></figcaption></a></figure>');
                }
                for(i=0; i<=response['data'].length; i++) {
                    $('.nasaMarsPhoto' + i).attr('src', response['data'][i]['img_src']);
                    $('.nasaFigcaption' + i).html("SOL: " + response['data'][i]['sol'] + ",  " + response['data'][i]['earth_date']);
                    $('.nasaBigSize' + i).attr('href', response['data'][i]['img_src']);
                }
            }
        })
    })
}, "Mars Rover Photos").addTo(map);

L.easyButton("fa-sharp fa-solid fa-burger", function (btn, map) {
    // Country traditional food
    $("#food").modal("show");
    $.ajax({
        url: 'php/getCountryInfo.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: iso3,
        },
        success: function(response) {
            var countryArray = (response['data']['0']);
            var demonyms = countryArray['demonyms']['eng'].f;
    
            $.ajax({
                url: 'php/getFood.php',
                type: 'POST',
                loadingControl: true,
                dataType: 'json',
                data: {
                    code: demonyms,
                },
                success: function(resp) {
                    $('.modal-food-title').text(demonyms + ' foods');
                    $('.foodModalBody').append('<div id="clear" class="clear"></div>');
                    for(i=0; i<resp['data'].length; i++) {
                        $('.clear').append('<div class="photoOfTheDay">'+
                        '<div class="image"><img width="260px" class="foodPhoto'+i+'" '+
                        'src="" alt="No image"></div><div class="nasaDataFirst">' +
                        '<div class="foodName'+i+'"></div><a class="foodRecipe'+i+'" ' +
                        'href="">Recipe</a></div></div><br><hr>')
                    }
                    for(i=0; i<=resp['data'].length; i++) {
                        $('.foodPhoto'+i).attr('src', resp['data'][i]['strMealThumb']);
                        $('.foodName'+i).html(resp['data'][i]['strMeal']);
                        var foodId = resp['data'][i]['idMeal'];
                        $('.foodRecipe'+i).attr('href', 'https://www.themealdb.com/meal/' + foodId);
                    }
                }
            })
        }
    });
}, "Traditional Food").addTo(map);

var userLocation = map.locate({setView: true, maxZoom: 7});
function onLocationFound(e) {
    userCountry(e.latlng);
}
map.on('locationfound', onLocationFound);

document.getElementById('countrySelect').addEventListener('change', function(data) {
    iso3 = data['target'].value;
    getData(iso3);
});

function userCountry(locate) {
    var lat = locate.lat;
    var lng = locate.lng;

    $.ajax({
        url: "php/setLocationSelected.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            lng: lng,
        },
        success: function(result) {
            iso3 += result['data']['countryCode'];
            $('#visible').html(result['data']['countryName']);
            getData(result['data']['countryCode']);
        },

        error: function(jqXHR,textStatus,errorThrown,){
            alert(textStatus + ' : '  + jqXHR.status + ', ' + errorThrown);
        }
    }); 

    $.ajax({
        url: "php/countryData.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            // Add each country to option value
            $.each(result.data, function(index) {
                $('#countrySelect').append($("<option>", {
                    value: result.data[index].code,
                    text: result.data[index].name,
                }));
            }); 
        },
        error: function(jqXHR,textStatus,errorThrown,){
            alert(textStatus + ' : '  + jqXHR.status + ', ' + errorThrown);
        }
    });
};

function getData(code) {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON) {
          map.removeLayer(layer);
        }
    }),
    $.ajax({
        url:  "php/getGeoJson.php",
        type: 'POST',
        dataType: 'json',
        data: { temp2: code },
        success: function(result) {
            var filterData = result.data.geometry;
            var continent = L.geoJson(filterData).addTo(map); 
            map.fitBounds(continent.getBounds());
        },
        error: function(jqXHR,textStatus,errorThrown,){
            alert(textStatus + ' : '  + jqXHR.status + ', ' + errorThrown);
        }
    }) 
}
