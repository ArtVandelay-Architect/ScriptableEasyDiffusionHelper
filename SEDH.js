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
	fm.bookmarkedPath("SEDHOpen"),
	"SEDH"
);
if (!fm.fileExists (externalRoot))
	fm.createDirectory (externalRoot)

// --- file types
IMAGE_SUFFIX = "png"
JSON_SUFFIX = "json.txt"

// --- file helper functions
// get the suffix of the file
function get_suffix (filePath) {
	let parts = filePath.split ('.');
	if (parts.length > 1) {
		return parts.pop ();
	}
	return '';
}
// swap the suffix between json and image
// mode 1 is json, 2 is image
function swap_suffix (filePath, mode) {
	let base = filePath.split ('.')[0];

	if (mode == 1)
		return base + "." + JSON_SUFFIX;
	if (mode == 2)
		return base + "." + IMAGE_SUFFIX;
}

function push_to_external () {
}

function pull_to_internal () {
	let files = fm.listContents (externalRoot);
	for (let i = 0; i < files.length; i++) {
		// image file candidate
		let iFile = files[i];
		if (IMAGE_SUFFIX == get_suffix (iFile)) {
			jFile = swap_suffix (iFile, 1);
			jPath = fm.joinPath (externalRoot,
			                     jFile);
			if (!fm.fileExists (jPath))
				continue;

			iPath = fm.joinPath (externalRoot,
			                     iFile);
			

				
		}
	}
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



