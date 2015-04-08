//http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehiclesforroute?routeID="19"
$('#transit').on('click', function() {
  console.log('clicked');
  $.ajax({
    url: 'http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehicles', 
    // Work with the response
    success: function( response ) {
      console.log( JSON.stringify(response) ); // server response
    }
  });
});