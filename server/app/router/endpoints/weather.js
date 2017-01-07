var soap =          require('soap');
var parseString =   require('xml2js').parseString;
var url = 'http://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl';
var args = {
				latitude: 0,
				longitude: 0,
        startDate: new Date(), // 2017-01-07
        numDays: 1,
        Unit: 'e',
        format: '12 hourly'
};

exports.fetch = function (req, res, next) {
  console.log('body = ' + JSON.stringify(req.body, null, 2));
  soap.createClient(url, function(err, client) {

		if (err) return next();

    args.latitude = req.body.latitude;
    args.longitude = req.body.longitude;

    client.NDFDgenByDay(args, function(err, resWeather, body) {

        parseString(body, function(err, result){

          var dayWeather = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:NDFDgenByDayResponse'][0]['dwmlByDayOut'][0]['_'];

          parseString(dayWeather, function(err, result){
            if (err) return next();
						
						var data = result['dwml']['data'][0];
          
        	  var moreWeatherInformation = data.moreWeatherInformation[0]['_'];
						var parameters = data.parameters;
						var temperatures = parameters[0]['temperature'];
						var weatherObj = {};
						for (var i = 0; i < temperatures.length; i++) {
							weatherObj[temperatures[i]['name'][0]] = temperatures[i]['value'][0];
						}

						var weather = parameters[0].weather[0];
						weatherObj['am'] = weather['weather-conditions'][0]['$']['weather-summary']; 
						weatherObj['pm'] = weather['weather-conditions'][1]['$']['weather-summary']; 
						weatherObj['moreWeatherInformation'] = moreWeatherInformation;

						var icons = parameters[0]['conditions-icon'][0];
						weatherObj['amIcon'] = icons['icon-link'][0];
						weatherObj['pmIcon'] = icons['icon-link'][1];

            console.log(weatherObj);

            res.status(200).json(
              weatherObj
            );
          });
        });
/*      }
      else {
				res.status(resWeather.statusCode).json(body);
      }
     */
    });
  });
};
