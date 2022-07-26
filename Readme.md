<p align="center">
  <a href="https://gulpjs.com">
    <img height="250" width="125" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# Gulp Js Project

This project aim to learn Gulp js

## A toolkit to automate & enhance your workflow

Leverage gulp and the flexibility of JavaScript to automate slow, repetitive workflows and compose them into efficient build pipelines.

## Install Gulp.js

 Gulp is easy to install as well as use, we can summarize the stages of installation in:

 1. Gulp.js is configured so you can use it anywhere on your device by using the --global property.

 2. Install gulp.js in devDependencies.

 3. Create a gulpfile.js file.

 - The first step is to install the gulp absolutely in the device

    ```js
    npm install --global gulp-cli
    ```
- Create a package.json file in your project directory

  ```js
   npm init
  ```
- Install the gulp package in your devDependencies

  ```js
   npm install --save-dev gulp
  ```

## Create A Professional Structure And Your First Task

- Import gulp from gulp modules

  ```js
  const gulp = require('gulp');
  ```

- declare task using

  ```js
  gulp.task("taskname",funtion(){
      // Your task here
  });
  ```

- To run a task you run this command

  ```bash
   gulp task-name
  ```

## Copy Files From Source To Destination

to transforme files from source to destination we choose the source then transform it to destination after applying some functions by `pip`

- Src can be a file using the name of the specific file or dist files using `*` ex: `gulp.src('index.html')`, `gulp.src('*.html')`, `gulp.src('*.*')`, or an array `gulp.src(['name1','name2'])`

- Specify the destination that can be an existing folder or create a folder inside the destination ...etc : `gulp.dest('dist')`, `gulp.dest('dist/css')` ...etc.

  ```js
  return gulp
    .src(['project/index.html', 'project/about.html'])
    .pipe(gulp.dest('dist'));
  ```

## Concatenate CSS and JS Files In One File

- Install `gulp-concat` package

  ```bash
  npm install --save-dev gulp-concat
  ```

- Import the package and concate multiple files from source to destination ex:

  ```js
  gulp.task('css',function () {
    return gulp
      .src('project/css/main.scss')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('dist/Css'));
  });
  ```

## AutoPrefixer For CSS3 Properties

- Install `gulp-autoprefixer` package

  ```bash
  npm install --save-dev gulp-autoprefixer
  ```

- Import the package to prefix css properties
  `pipe(prefix())` or specifyes the versions to suport like `pipe(prefix('last 2 versions'))`

## Manage And Compile Sass Files

- Install `gulp-sass` package

  ```bash
  npm install sass gulp-sass --save-dev
  ```

- Import it and use it :D ex: `.pipe(sass())`, `.pipe(sass({outputStyle: 'compressed'}))`, `.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))`

## Compile Pugjs Files With Gulp Task

- Install `pugjs` package

  ```bash
  npm i gulp-pug --save-dev
  ```

- Import it and use it :p ex: `pipe(pug())`, this will compress the html file. or if you want to keep the code pretty `.pipe(pug({pretty: true}))`

> pugjs is quite like sass but for html :v. You can use it to import header html file etc ...

## Setting Up A Local Server To Test Files

- Install `static-server`

  ```bash
  npm i static-server --save
  ```

- Create `server.js`

  ```js
  const StaticServer = require('static-server');
  const server = new StaticServer({
    rootPath: './dist/', // required, the root of the server file tree
    port: 8000, // required, the port to listen
  });
  server.start(function () {
    console.log('Server listening to', server.port);
  });
  ```

- Run it with the command `node server.js` or by puting this line on any task `require('./server.js');`

## Use Gulp Watch Task

- To watch files u can use `gulp.watche` function and write the thing that we want to watch and the task we want to apply.

  ```js
  gulp.task('watch', function () {
    gulp.watch('thing-to-watch', gulp.series('task-name'));
  });
  ```

ex:

```js
gulp.task('watch', function () {
  require('./server.js');
  gulp.watch(['project/index.pug', 'project/pug/*'], gulp.series('html'));
  gulp.watch(['project/css/sass/*', 'project/css/sass/*'], gulp.series('css'));
});
```

## Live Reload Browser

- Install the package

  ```bash
  npm install --save-dev gulp-livereload
  ```

- Import the package and add this line in every task except the watch task `.pipe(livereload());`
- Add the listen command in watch task `livereload.listen();`
- The package will not work alone unless we use a chrom extention or call the script that this package depned on. Add this script on the `index.pug`

  ```pug
  script(src="http://localhost:35729/livereload.js")
  ```

> if you use other server packages they do live reload by themselves

## Add Source Maps To Files

- Install the package

  ```bash
  npm i gulp-sourcemaps --save-dev
  ```

- Import the plugin then initialize it on the place you wanna use the map `.pipe(sourcemaps.init())`
- Write the map inside the folder you want by specifying the destination to prevent add it in the end of the main css file: `.pipe(sourcemaps.write('.'))`

> In my case the source map was created but does not work on the browser so I added `loadMaps: true` to `sourcemaps.init()`: `.pipe(sourcemaps.init({loadMaps: true}))` and the map worked :D.

## Minifying JS Files With Uglify

- Install the package `npm install --save-dev gulp-uglify`
- Import it then use it

  ```js
  gulp.task('js', async function () {
    return gulp
      .src('project/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/Js'))
      .pipe(livereload());
  });
  ```

## Show Notification With Notify

- Install the package `npm install --save-dev gulp-notify`
- Import and use the package ex: `.pipe(notify('HTML task ended'))`

## Compress Files With Gulp Zip

- Install the package `npm install --save-dev gulp-zip`
- Import it and use it:

```js
gulp.task('compress', function () {
  return gulp
    .src('dist/**/*.*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('Files compressed'));
});
```

## Do not forget to watch all tasks in watch task

- Install the package `npm i vinyl-ftp --save-dev`
- Import and use the package

  ```js
  gulp.task('deploy', function () {
    var conn = ftp.create({
      host: 'mywebsite.tld', // enter your host here
      user: 'me', // the user
      password: 'mypass', // the password
      parallel: 10,
    });
    var globs = ['dist/**/*.*'];
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    return gulp
      .src(globs, { base: '.', buffer: false })
      .pipe(conn.newer('/public_html')) // only upload newer files
      .pipe(conn.dest('/public_html'))
      .pipe(livereload()); // reload the after finishing the upload
  });
  ```

> Do not forget to watch all tasks in watch task

```js
// Watch Task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch(['project/index.pug', 'project/pug/*.pug'], gulp.series('html'));
  gulp.watch('project/css/**/*.scss', gulp.series('css'));
  gulp.watch('project/js/*.js', gulp.series('js'));
  gulp.watch('dist/**/*.*', gulp.series('compress'));
  //gulp.watch('dist/**/*.*', gulp.series('deploy'));
});
```

## Important Informations

### Exclude files

- if you want to exclude a file use `!` ex: `gulp.src(['project/js/*.js','!project/js/one.js'])`

### Setup default task

- you can setup the default task by `gulp.task('default',['watch']);` for ex now id you run `gulp` the default task will run

> In version `>4` this my lead to an error so to prevent this you can writre it like this `gulp.task('default', gulp.parallel('watch'));`

### Some useful packages

- **gulp-babel**: return the modern java script into vanila js.
- **gulp-replace**: A string replace plugin for gulp 3, like if you want to change a prefix
- **gulp-load-plugins**: Loads gulp plugins from package dependencies and attaches them to an object of your choice: load plugins in the same place to speed up things
- **gulp-rename**: gulp-rename is a gulp plugin to rename files easily
- **gulp-plumber**: Prevent pipe breaking caused by errors from gulp plugins
  ... etc

### Install specific version

- Specify the number of the version by adding `@version-number` ex: `npm install gulp@3.9.1`

## Credits

All credits goes for Learn Gulpjs course in [Elzero Web School](https://elzero.org/).
