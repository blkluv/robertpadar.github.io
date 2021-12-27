function sendEnquiryform() {
    $.ajax({
        url: '../contact.php',
        type: 'POST',
        dataType: 'json',
        data: {
            subject: $('#subject').val(),
            name: $('#name').val(),
            message: $('#message').val(),
            email: $('#email').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $(document).ready(function () {
                    $('#cap').text('Datetime:');
                    $('#cap2').text('Depth:');
                    $('#cap3').text('Lat:');
                    $('#cap4').text('Lng:');
                    $('#cap5').text('Magnitude:');
                });
                $('#txtContinent').html(result['data'][0]['datetime']);
                $('#txtCapital').html(result['data'][0]['depth']);
                $('#txtLanguages').html(result['data'][0]['lat']);
                $('#txtPopulation').html(result['data'][0]['lng']);
                $('#txtArea').html(result['data'][0]['magnitude']);

            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    });
}