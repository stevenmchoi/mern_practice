// Use common JS modules for Node.js (backend)
// 'import' for React (frontend)
const express = require( 'express' );
const app = express();

app.get( '/', ( req, res ) => {
	res.send( {
		hi: 'there'
	} );
} );

app.listen( 5000 );
// http://localhost:5000/
