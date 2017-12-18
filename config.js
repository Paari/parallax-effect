// This is the main configuration file for your build process


// ===========================
// Index
// ---------------------------
/*
	1. Test
	2. Host
	3. Port
	4. CSS pre-processor
	5. Concat
  6. Build configuration
*/


// Global settings
// ===============

// if you are using vanila CSS keep the variable blank
// or set the value to less or sass if you are using any pre-processor
var cssLang = 'less';

// do not modify this value
var pathToWatch = 'src/'+cssLang+'/**';



// Option settings
// ===============
// exported settings, these value will be imported and used in the grunt file configuration
module.exports = {

	// 1. Test -> this is the welcome message when you run "test"
	// --------------------
	cool: "It's working fine, cool! 👍",


	// 2. Hostname -> Change to 0,0,0,0 to access over LAN
	// --------------------
	host: '0.0.0.0',


	// 3. Port -> where you want to start the server
	// --------------------
	port: 3000,


	// 4. cssLang -> for using plane css or less or sass file compilation
	// --------------------
	// Change to global setting on top.
  preProcessor: cssLang,
	styling: [pathToWatch],
	cssStyle: 'nested',

  // Your parent stylesheet
  sourceStyle: 'src/' + cssLang + '/source.less',


	// 5. Concat -> murge file
	// --------------------

	// JS
	// default value: ['src/js/**.js']
	jsConcatSrc: 'src/js/**.js',
	// default value:
	jsConcatDest: 'src/build/js/main.js',

	// CSS
	// default: 'src/build/css/main.css'
	cssConcatSrc: 'src/css/**.css',
	// default: 'src/build/css/main.css'
	cssConcatDest: 'src/build/css/main.css',

	// default '', put 'css' for css only and 'js' or js only
	concatOnly: 'css',



	// Build -> Folders to move to Distribution
	// --------------------
	// default value: ['build/**', 'html/**', 'img/**']
	distFiles: ['build/**', '*.html', 'img/**', 'fonts/**', '*.png']

};
