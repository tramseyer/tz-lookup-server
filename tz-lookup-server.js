const http = require('http');
const Url = require('url');
const tzlookup = require('tz-lookup');

http.createServer(function(req, res) {
  const url = Url.parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && url.pathname === '/') {
    if (!url.query.lat || !url.query.lon) {
      res.writeHead(404);
      res.end('"Europe/Zurich"');
      return;
    }
    if (isNaN(url.query.lat) || isNaN(url.query.lon)) {
      res.writeHead(404);
      res.end('"Europe/Zurich"');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tzlookup(url.query.lat, url.query.lon)));
  }
  else {
    res.writeHead(404);
    res.end('Nothing to see here');
  }

}).listen(process.env.PORT || 5266, process.env.IP || '0.0.0.0');

console.log('Running at port', process.env.PORT || 5266);
