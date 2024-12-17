// Scriptable Easy Diffusion Helper by Luke Li
// v0.2

// To aid in mobile editing, this file has a maximum width
// of 60 characters

// Designed for Scriptable

// When running the Easy Diffusion in a WebView browser,
// one can only save the images and json files separately
// to the Files app, this is not ideal.
// This script pairs up the images and json files, and
// store them in a internal location that can be moved
// out at any time.

let fm = FileManager.local ();
let internalRoot = fm.joinPath (
	fm.documentsDirectory (),
	"SEDH"
);
if (!fm.fileExists (internalRoot))
	fm.createDirectory (internalRoot)

let externalRoot = fm.joinPath (
	fm.bookmarkedPath("ScriptableOpen"),
	"SEDH"
);
if (!fm.fileExists (externalRoot))
	fm.createDirectory (externalRoot)

// --- file helper functions
// get the suffix of the file
function get_file_suffix (filePath) {
	let parts = filePath.split ('.');
	if (parts.length > 1) {
		return parts.pop ();
	}
	return '';
}

function push_to_external () {
	fm.copy (internalRoot, externalRoot)
}

function pull_to_internal () {
	fm.copy (externalRoot, internalRoot)
}

function view_internal () {
}

let a = new Alert ()
a.title = "==SEDH==";
a.message = "Main Menu";
a.addAction ("Push to External");
a.addAction ("Pull to Internal");
a.addAction ("View Internal");
a.addCancelAction ("Cancel");

let result = await a.presentAlert ();
if (result == 0) {
	push_to_external ();
} else if (result == 1) {
	pull_to_internal ();
} else if (result == 2) {
	view_internal ();
}



