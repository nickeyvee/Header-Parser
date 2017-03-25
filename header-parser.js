const express = require( 'express' );
const port = process.env.PORT || 3000;
const app = express();

const begin = ( char ) => { return char === "(" };
const end = ( char ) => { return char === ")" };

app.enable( 'trust proxy' );

app.get( "/" , ( request, response ) => {

  const IP = request.ip;
  const userAgent = request.headers["user-agent"].split("");

  const begin_index = userAgent.findIndex( begin );
  const end_index = userAgent.findIndex( end );

  const ipaddress = request.headers.host;
  const language = request.headers["accept-language"].split(",")[0];
  const software = userAgent.slice( begin_index + 1, end_index ).join("");

  console.log( request.ip );


  response.send( JSON.stringify({
    "ipaddress" : IP,
    "language" : language,
    "software" : software
  }));

}).listen( port, () => {
  console.log( "listening on " + port );
});
