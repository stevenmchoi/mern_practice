// Use common JS modules for Node.js (backend)
// 'import' for React (frontend)
const express = require( 'express' );
const app = express();

app.get( '/', ( req, res ) => {
	res.send( {
		hi: 'there'
	} );
} );

const PORT = process.env.PORT || 5000;

app.listen( PORT );
// http://localhost:5000/
