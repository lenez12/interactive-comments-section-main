const { merge } = require("webpack-merge");
const productionConfig = require("./webpack.prod");
const developmentConfig = require("./webpack.dev");
const commonConfig = require("./webpack.common");

module.exports = (env, args) => {
	switch (args.mode) {
		case "development":
			return merge(commonConfig, developmentConfig);
		case "production":
			return merge(commonConfig, productionConfig);
		default:
			throw new Error("No matching configuration was found");
	}
};
