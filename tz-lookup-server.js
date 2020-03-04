const http = require('http');
const Url = require('url');
const util = require('util');
const tzlookup = require('tz-lookup');

http.createServer(function(req, res) {
  const url = Url.parse(req.url, true);
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && url.pathname === '/') {
    if (!url.query.lat || !url.query.lon) {
      res.writeHead(404);
      console.log(util.format('%s (%s): argument missing (%o)', ip, req.headers['user-agent'], url))
      res.end('"Europe/Zurich"');
      return;
    }
    if (isNaN(url.query.lat) || isNaN(url.query.lon)) {
      res.writeHead(404);
      console.log(util.format('%s (%s): argument is not a number (%o)', ip, req.headers['user-agent'], url))
      res.end('"Europe/Zurich"');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const timezone = tzlookup(url.query.lat, url.query.lon)
    console.log(util.format('%s (%s): %s, %s -> %s', ip, req.headers['user-agent'], url.query.lat, url.query.lon, timezone))
    res.end(JSON.stringify(timezone));
  }
  else {
    res.writeHead(404);
    res.end('Nothing to see here');
  }

}).listen(process.env.PORT || 5266, process.env.IP || '0.0.0.0');

console.log('Running at port', process.env.PORT || 5266);
