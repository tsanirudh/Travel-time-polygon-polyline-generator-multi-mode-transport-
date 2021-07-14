'use strict';
async function function1 (){
(function() {

    $(document).ready(function() {

        tableau.extensions.initializeAsync().then(function() {

            showChooseSheetDialog();

            initializeButtons();
        });
    });


    function showChooseSheetDialog() {
        $('#choose_sheet_buttons').empty();


        const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
        $('#choose_sheet_title').text(dashboardName);


        const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;


        worksheets.forEach(function(worksheet) {
            // 
            const button = createButton(worksheet.name);

            button.click(function() {

                const worksheetName = worksheet.name;

                $('#choose_sheet_dialog').modal('toggle');
                loadSelectedMarks(worksheetName);
            });


            $('#choose_sheet_buttons').append(button);
        });


        $('#choose_sheet_dialog').modal('toggle');
    }

    function createButton(buttonTitle) {
        const button =
            $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

        return button;
    }

    function loadSelectedMarks(worksheetName) {

        const worksheet = getSelectedSheet(worksheetName);

        $('#selected_marks_title').text(worksheet.name);

   


//hash array function

        function ringCoordsHashToArray(ring) {
            return ring.map(function (latLng) {return [latLng.lat, latLng.lng];});
          };


        worksheet.getSelectedMarksAsync().then(function(marks) {
            const worksheetData = marks.data[0];
            const row = worksheetData.data.map(function(row, index) {
                const rowD = row.map(function(cell) {
                    return cell.value;
                });

                return rowD;
            });
            const col = worksheetData.columns.map(function(column) {
                return {
                    title: column.fieldName
                };
            });
            let latitude = [];
            let longitude = [];
            row.forEach(array1 => {
               
                latitude.push(array1[2]);
                return latitude,
                    console.log(latitude);
            });
            row.forEach(array2 => {
              longitude.push(array2[3])
              return longitude,
              console.log(longitude);
            })

            const lat1 = latitude[0];
            const lon1 = longitude[0];
            console.log (lat1);
            console.log(lon1);

            // keys
            const appid = 'd937812b';
            const apikey = 'd035021a856542989ed19b192fef2475';
            const time_1= document.getElementById("time").value;
            const trans_M = document.getElementById
            const time_s= Number(time_1);
            console.log(typeof time_s);
            var test = 0;


        
            var test = 1;
            var mymap = L.map('mapid').setView([lat1, lon1], 13);
            L.tileLayer('https://tiles.traveltime.com/lux/{z}/{x}/{y}.png?key=d937812b', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> | Created with <a href="http://traveltime.com" target="_blank">TravelTime API</a>',
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1
            }).addTo(mymap);





            sendreq();
              async function sendreq() {
                axios({
                    method: 'post',
                    url: 'https://api.traveltimeapp.com/v4/time-map',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Application-Id': appid,
                        'X-Api-Key': apikey
                    },
                    data: {
                        "departure_searches": [{
                            "id": "first_location",
                            "coords": {
                                "lat": lat1,
                                "lng": lon1
                            },
                            "transportation": {
                                "type": "driving"
                            },
                            "departure_time": "2021-07-12T08:00:00Z",
                            "travel_time": time_s,
                        }],
                        "arrival_searches": [{
                            "id": "second_location",
                            "coords": {
                                "lat": lat1,
                                "lng": lon1
                            },
                            "transportation": {
                                "type": "driving"
                            },
                            "arrival_time": "2021-07-12T08:00:00Z",
                            "travel_time": time_s,
                            "range": {
                                "enabled": true,
                                "width": 3600
                            }
                        }]
                    }
                }).then((response) =>{
                    var a = [];
                    a = response;
                    return (response),
                    console.log(response.data.results),
                    drawTimeMap();
                    function drawTimeMap(map, response) {
                    // http://docs.traveltimeplatform.com/reference/time-map/#response-body-json-attributes
                      var shapesCoords = a.data.results[0].shapes.map(function (polygon) {
                        var shell = ringCoordsHashToArray(polygon.shell);
                        var holes = polygon.holes.map(ringCoordsHashToArray);
                        return [shell].concat(holes);
                      });
                      var polygon = L.polygon(shapesCoords, { color: 'blue' });
                      polygon.addTo(mymap);
                      mymap.fitBounds(polygon.getBounds());
                  };
                });
            };

      
           

        });

    }




    function initializeButtons() {
        $('#show_choose_sheet_button').click(showChooseSheetDialog);
    }

    function getSelectedSheet(worksheetName) {
        // Go through all the worksheets in the dashboard and find the one we want
        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }
})();
};