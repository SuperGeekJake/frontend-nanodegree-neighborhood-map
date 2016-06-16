# FEND: Neighborhood Map Project
Responsive map application powered by Google Maps and FourSquare showing venues located in Soquel village, including a few venues favoured by the author.

## Develop
Dependencies: [nodejs](https://nodejs.org), [native build tools](https://github.com/nodejs/node-gyp#installation)

Run `npm install` and `npm run gulp`.
This will install all required project assets from npm, bower, and typings. 

Note: gulp, bower, and typings do not need to be installed globally. They are all available via the `npm run` command under the same name. For example: `npm run bower`.

## Serve
Files ready for serving are in the `dist` directory.

To run a server for development, run `npm run gulp -- serve`.
