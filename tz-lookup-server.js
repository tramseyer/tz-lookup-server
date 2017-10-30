var http = require('http');
var Url = require('url');
var tzlookup = require('tz-lookup');

http.createServer(function(req, res) {
  var url = Url.parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && url.pathname === '/') {
    if (!url.query.lat || !url.query.lon) {
      res.writeHead(404);
      return res.end('Need lat and lon passed in as query parameters');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tzlookup(url.query.lat, !url.query.lon)));
  }
  else {
    res.writeHead(404);
    res.end('Nothing to see here');
  }

}).listen(process.env.PORT || 5266, process.env.IP || '0.0.0.0');

console.log('Running at port', process.env.PORT || 5266);
