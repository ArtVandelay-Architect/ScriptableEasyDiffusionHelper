// S.E.D.V. for Scriptable by Luke Li
// v0.1
// Scriptable Easy Diffusion Viewer
// Reads a folder of image and json files, pairs them up,
// and displays them

// ---
// initialise the file system
let fm = FileManager.local ();
let dirPath = fm.joinPath (
	fm.documentsDirectory (),
	"path"
);

// ---
// file helpers
function add_suffix (baseName, suffix) {
	return baseName + "." + suffix;
}

// --- file types
IMAGE_SUFFIX = "png"
JSON_SUFFIX = "json.txt"

// each creation is a pair of image and json files
// they share the same file names, except the suffix
let creationBases = [];
if (fm.fileExists (dirPath)) {
	let lof = fm.listContents (dirPath);
	for (let i = 0; i < lof.length; i++) {
		let fileNameSplit = lof[i].split ('.');
		let suffix = fileNameSplit.pop ();
		let base = fileNameSplit[0];
		if (suffix == IMAGE_SUFFIX) {
			let jsonCandidate = add_suffix (
				base,
				JSON_SUFFIX
			);
			if (!fm.fileExists (jsonCandidate))
				continue;
			creationBases.push (base);
		}
	}
}

let mainTable = new UITable ();
mainTable.showSeparators = true;

function open_creation (fileIndex) {
	let ql = QuickLook;
	let pagePath = add_suffix (
		baseCreation[fileIndex],
		IMAGE_SUFFIX
	);
	ql.present (
		fm.joinPath (dirPath, pagePath),
		true
	);
}

function update_main_table () {
	mainTable.removeAllRows ();

	let topRow = new UITableRow ();
	topRow.isHeader = true;
	topRow.backgroundColor = new Color ("2B2B2B",255);

	let refBtn = topRow.addButton ("🔄");
	refBtn.widthWeight = 20;
	refBtn.onTap = () => {
		update_main_table ();
		mainTable.reload ();
	}

	let HeadTitle = topRow.addText ("Menu");
	HeadTitle.widthWeight = 60;
	HeadTitle.centerAligned ();

	for (let i = 0; i < files.length; i++) {
		let row = new UITableRow ();
		row.dismissOnSelect = false;

		row.onSelect = (idx) => {
			open_creation (i);
		}

		let infoCell = row.addText (
			creactionBases[i],
			creactionBases[i]
		);
		infoCell.widthWeight = 80;
	}
}


