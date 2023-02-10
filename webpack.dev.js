const path = require("path");
const { merge } = require("webpack-merge");

module.exports = {
	mode: "development",
	watch: true,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		clean: true,
	},
};
