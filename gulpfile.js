const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");
const { dest } = require("gulp");
const browserSync = require("browser-sync").create();
const reload = function (done) {
    browserSync.reload();
    done();
  };
const plumber = require("gulp-plumber"); 

const paths = {
    styles: {
        src: "src/scss/style.scss",
        dest: "./dist/css/",
        watch: "src/scss/**/*.scss",
    },
    scripts: {
        src: "main.js",
        dest: "./dist/js/",
        watch: "src/js/**/*.js",
        folder: "src/js/",
    },
    html: {
        watch: "./*.html",
        src: "./*.html",
        dest: "./",
    },
    php: {
        watch: "**/*.php"
    }
}

function browser_sync() {
    browserSync.init({
        // open: false,
        injectChanges: true,
        files: "./", // this may change from projet to project
        server: {
            baseDir: "./" // this may change from projet to project
        },
    });
}

function css() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"})
    .on("error", sass.logError))
    .pipe(rename({suffix: ".min"}))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream()); 
};

const jsFILES = [paths.scripts.src];

async function js() {
    jsFILES.map(function(entry) {
        return (
            browserify({
                entries: [paths.scripts.folder + entry],
            })
            .transform(babelify, {presets: ["@babel/preset-env"]})
            .bundle()   
            .pipe(source(entry))
            .pipe(rename({extname: ".min.js"}))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(dest(paths.scripts.dest))
            .pipe(browserSync.stream())
        );
    })
}

function triggerPlumbler(src, dest) {
    return gulp.src(src)
    .pipe(plumber())
    .pipe(gulp.dest(dest));
}

function html() {
    return triggerPlumbler(paths.html.src, paths.html.dest);
}

function watch_files() {
    gulp.watch(paths.scripts.watch, gulp.series(js, reload))
    gulp.watch(paths.styles.watch, gulp.series(css, reload))
    // gulp.watch(paths.html.watch, gulp.series(html, reload))
}

gulp.task("js", js);
gulp.task("css", css);
gulp.task("html", html);
gulp.task("default", gulp.parallel(css, js));
gulp.task("watch", gulp.parallel(browser_sync, watch_files));