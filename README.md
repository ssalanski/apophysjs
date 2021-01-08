# ApophysJs

A browser based implementation of the [Fractal Flame algorithm](https://en.wikipedia.org/wiki/Fractal_flame), as originally concieved of and [implemented](https://github.com/scottdraves/flam3) by Scott Draves. See https://flam3.com/

The interface was inspired by programs like [Apophysis](https://sourceforge.net/projects/apophysis/) and [Apophysis7X](https://sourceforge.net/projects/apophysis7x/), while hoping to reach a wider audiance via the ease of use of a web application.

## Use

Add and configure one or more transformations, each consisting of one or more variation functions, to see the resulting fractal take shape. Adjust the viewport position and angles, as well as the color gradient and values, to achieve a nice image and use the render button to save a hi-res image to your computer.


## Development

This project uses [React](https://reactjs.org/), and is built using [snowpack](https://www.snowpack.dev/).

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
