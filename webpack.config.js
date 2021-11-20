const path = require("path");

module.exports = {
	entry: {
		main: "./src/index.js",
		menu: "./src/menu.js",
	},

	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "eval-source-map",
};

//  npm install webpack webpack-cli --save-dev
// CD 2021.11.05 JS Food Delivery
// npm run watch

// ставишь

// - node js последнюю версию
// - npm
// - в консоли потом делаешь так: npm i webpack -g

// да там все просто
// по последнему пункту - это устанавливает webpack пакет для npm глобально (флаг -g)
// этот флаг использовать нужно редко и с крайней осторожностью
// потому что потом могут возникнуть конфликты с локальной версией пакета
