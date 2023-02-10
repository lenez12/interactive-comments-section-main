const path = require("path");

module.exports = {
	mode: "develpment",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.bundle.js",
	},
};
