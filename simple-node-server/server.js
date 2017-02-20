// Require Modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Array of Mime Types
var mimeTypes = {
	"bmp" : "image/bmp",
	"css" : "text/css",
	"htm" : "text/html",
	"html" : "text/html",
	"htmls" : "text/html",
	"js" : "application/javascript",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"json" : "application/json"
};

// Create Server
http.createServer(function(req, res){
	//Resouce loader
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log('Resource loader: Loading '+ uri);
	var stats;

	try{
		stats = fs.lstatSync(fileName);
	} catch(e) {
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}

	// Check if file/directory
	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		console.log("Check if file/directory: mimetype will be: " + mimeType);
		res.writeHead(200, {'Content-type': mimeType});

		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);

	} else if(stats.isDirectory()){
  		res.writeHead(302,{'Location' : 'index.html'});
		res.end();
	} else {
		res.writeHead(500, {'Content-Type' : 'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}

  //POST handler
	if(req.method === 'POST'){
		    console.log('POST handler: Begin POST transaction');
	     	var fullBody = '';
		    req.on('data', function(chunk) {
		      // append the current chunk of data to the fullBody variable
		      fullBody += chunk;
		    });

    req.on('end', function() {
			console.log("POST handler: " + uri);
			var wstream = fs.createWriteStream(fileName);
			wstream.write(fullBody);
			wstream.end();
      console.log('POST handler: End POST transaction');
    });

	}
}).listen(5397, console.log("Node Server running..."));
