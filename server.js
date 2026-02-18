const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 13579;
const PUBLIC = path.join(__dirname, 'public');

const MIME = {
	'.html': 'text/html; charset=UTF-8',
	'.js': 'application/javascript; charset=UTF-8',
	'.css': 'text/css; charset=UTF-8',
	'.json': 'application/json; charset=UTF-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.mp3': 'audio/mpeg',
	'.wav': 'audio/wav',
	'.wasm': 'application/wasm',
	'.txt': 'text/plain; charset=UTF-8'
};

function sendFile(res, filePath) {
	const ext = path.extname(filePath).toLowerCase();
	const type = MIME[ext] || 'application/octet-stream';
	res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
	fs.createReadStream(filePath).pipe(res).on('error', () => {
		res.writeHead(500);
		res.end('Internal server error');
	});
}

const server = http.createServer((req, res) => {
	try {
		const urlPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
		let filePath = path.join(PUBLIC, urlPath);

		// Prevent directory traversal
		if (!filePath.startsWith(PUBLIC)) {
			res.writeHead(403);
			return res.end('Forbidden');
		}

		fs.stat(filePath, (err, stats) => {
			if (err) {
				// try index.html for root or directories
				if (urlPath === '/' || urlPath === '') {
					return sendFile(res, path.join(PUBLIC, 'index.html'));
				}
				res.writeHead(404);
				return res.end('Not found');
			}

			if (stats.isDirectory()) {
				const index = path.join(filePath, 'index.html');
				return fs.stat(index, (ie, is) => {
					if (ie) {
						res.writeHead(404);
						return res.end('Not found');
					}
					return sendFile(res, index);
				});
			}

			sendFile(res, filePath);
		});
	} catch (e) {
		res.writeHead(400);
		res.end('Bad request');
	}
});

server.listen(PORT, () => {
	console.log('Server running at http://localhost:' + PORT);
});

module.exports = server;