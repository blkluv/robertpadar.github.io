function getJackpots(params){var paramsString='?params=';for(var i=0;i<params.length;i++){if(params[i]['gameId']&&params[i]['machineId'])
paramsString+=params[i]['gameId']+'-'+params[i]['machineId']+'-'+params[i]['gameName']+'_';}
paramsString=paramsString.slice(0,-1);httpGetJackpotsAsync("/api/brand-utils/getJackpots"+paramsString,function(response){printJackpots(JSON.parse(JSON.parse(response)));});}
function printJackpots(data){html='';data=sortJackpots(data);for(var i=0;i<data.length;i++){html+="<div class='jackpots-ticker-item'>"+"<h4 class='jackpot_ticker_amount'>"+data[i]["apiName"]+"</h4>"+"<h3>"+data[i]["currencySign"]+data[i]["amount"]+data[i]["currencySignRight"]+"</h3>"+"</div>";}
var jackpots=jQuery('#jackpots');jackpots.html(html);jackpots.css("visibility","initial");jQuery("#jackpots-loader").css("display","none");}
function httpGetJackpotsAsync(theUrl,callback){var xmlHttp=new XMLHttpRequest();xmlHttp.onreadystatechange=function(){if(xmlHttp.readyState==4&&xmlHttp.status==200)
callback(xmlHttp.response);}
xmlHttp.open('GET',theUrl,true);xmlHttp.send(null);}
function sortJackpots(data){var temp;var a,b;for(var i=0;i<data.length;i++)for(var j=0;j<data.length;j++){a=parseInt(data[i].amount.replace(/,/g,""));b=parseInt(data[j].amount.replace(/,/g,""));if(a>b){temp=data[i];data[i]=data[j];data[j]=temp;}}
return data;}