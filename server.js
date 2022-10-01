//Install express server
const express = require('express');
const path = require('path');

const app = express();

// if (process.env.NODE_ENV === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('x-forwarded-proto') !== 'https')
//             res.redirect(`https://${req.header('host')}${req.url}`)
//         else
//             next()
//     })
// }

// Serve only the static files form the dist directory
app.use(express.static('./dist/pokedex-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/pokedex-app/' }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);