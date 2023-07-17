document.getElementById("galery").addEventListener("click" ,function() {
    console.log("ready");
    var imgArray = new Array();

    imgArray[0] = new Image();
    imgArray[0].src = 'img/DSC_0122.jpg';
    
    imgArray[1] = new Image();
    imgArray[1].src = 'img/DSC_0123.jpg';
    
    imgArray[2] = new Image();
    imgArray[2].src = 'img/DSC_0124.jpg';
    
    imgArray[3] = new Image();
    imgArray[3].src = 'img/DSC_0126.jpg';
    
    imgArray[4] = new Image();
    imgArray[4].src = 'img/DSC_0128.jpg';
    console.log(imgArray.length);
    $(".pictures").html(imgArray);
});