// CATA publishes live bus locations in JSON format (?) to the URL below
// http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehicles

// Right now, this does not work. There's something wrong.

// If we find a way to request that data and load the result into our web page, we can add points showing buses

// With AJAX, request the data from the URL
$.ajax({
  url: 'http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehicles', 
  // If we have success with our request, do the following with the response
  success: function( response ) {
    console.log( JSON.stringify(response) ); // Print to the console our live bus data.
  }
});
