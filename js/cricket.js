/*var code = "kabul";

    $.ajax({
        url: 'php/cricket.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            country: code,
        },
        success: function(response) {
            console.log(response);
        }
    })*/
var code = "upcoming"

    $.ajax({
        url: 'php/upcomingCricket.php',
        type: 'POST',
        loadingControl: true,
        dataType: 'json',
        data: {
            type: code,
        },
        success: function(response) {
            console.log(response);
            var status = "2023.08.18 10:30 PM";//response['data']['typeMatches']['0']['seriesMatches']['0']['seriesAdWrapper']['matches']['0']['matchInfo'].status
            //status = status.substr(15);
            $(".playDate").text(status);//html(status);
            $(".first").text("pakistan");//html(response['data']['typeMatches']['0']['seriesMatches']['0']['seriesAdWrapper']['matches']['0']['matchInfo']['team1'].teamName);
            $(".fistVersus").text("india");//html(response['data']['typeMatches']['0']['seriesMatches']['0']['seriesAdWrapper']['matches']['0']['matchInfo']['team2'].teamName);
            $(".typeOfMatch").text("asia cup");//html(response['data']['typeMatches']['0']['seriesMatches']['0']['seriesAdWrapper'].seriesName);
        
            var status2 = "2023.08.18 10:30 PM";//response['data']['typeMatches']['0']['seriesMatches']['2']['seriesAdWrapper']['matches']['1']['matchInfo'].status
            //status2 = status2.substr(15);
            $(".playDate2").text(status2);//html(status2);
            $(".first2").text("pakistan");//html(response['data']['typeMatches']['0']['seriesMatches']['2']['seriesAdWrapper']['matches']['1']['matchInfo']['team1'].teamName);
            $(".fistVersus2").text("india");//html(response['data']['typeMatches']['0']['seriesMatches']['2']['seriesAdWrapper']['matches']['1']['matchInfo']['team2'].teamName);
            $(".typeOfMatch2").text("asia cup");//html(response['data']['typeMatches']['0']['seriesMatches']['2']['seriesAdWrapper'].seriesName);

            var status3 = "2023.08.18 10:30 PM";//response['data']['typeMatches']['0']['seriesMatches']['3']['seriesAdWrapper']['matches']['2']['matchInfo'].status
            //status3 = status3.substr(15);
            $(".playDate3").text(status3)//html(status3);
            $(".first3").text("pakistan");//html(response['data']['typeMatches']['0']['seriesMatches']['3']['seriesAdWrapper']['matches']['2']['matchInfo']['team1'].teamName);
            $(".fistVersus3").text("india");//html(response['data']['typeMatches']['0']['seriesMatches']['3']['seriesAdWrapper']['matches']['2']['matchInfo']['team2'].teamName);
            $(".typeOfMatch3").text("asia cup");//html(response['data']['typeMatches']['0']['seriesMatches']['3']['seriesAdWrapper'].seriesName);

        }
    })