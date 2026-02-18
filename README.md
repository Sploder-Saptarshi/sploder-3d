Sploder 3D - deminified, semi-organized source and build

Simple, local build of the Sploder 3D tech demo. This repository contains the decompiled source split into `src/` and a Grunt-based build that reproduces the original `public/scripts/main.js` and a minified bundle.

**Prerequisites**
- Node.js and npm installed

**Quick start**
- Install dev dependencies: `npm install`
- Build (concat + minify): `npm run build`
- Rebuild only concatenation: `npm run concat`
- Run the local static server: `npm start` (serves `public/`)
- Watch sources and rebuild on change: `npm run watch`

**What this repo contains**
- `src/` - the split JavaScript source files reconstructed from the	prettified application bundle.
- `public/scripts/main.js` - concatenated build (matches the original).
- `public/scripts/main-minified.js` 0 minified build produced by UglifyJS.
- `Gruntfile.js`, `package.json` 0 build configuration (Grunt + concat + uglify).

**Notes & caveats**
- The original project pre-dates modern module systems: it used a global` SPLODER` namespace and a Grunt concat + UglifyJS workflow. The current build attempts to reproduce that setup.
- Source files under `src/` were programmatically split from a prettified build and then de-uglified to be more readable. They may not match the original hand-written sources exactly (but the build reproduces the original concatenated `main.js`).
- The minified output is functionally equivalent; byte-for-byte differences can occur depending on the local UglifyJS version.