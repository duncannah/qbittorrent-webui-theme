import fs from "node:fs";
import { parseArgs } from "node:util";
import * as sass from "sass";

const { values: ARGS } = parseArgs({
	strict: false,
	options: {
		watch: { type: "boolean", short: "w" },
		domain: { type: "string", short: "d" },
	},
});

const scssFile = "qbittorrent-webui-theme.user.scss";
const defaultDomain = "localhost:8080";
const domain = ARGS.domain || defaultDomain;

const build = () => {
	console.log("Building...");
	try {
		let css = sass.compile(scssFile).css;

		if (domain !== defaultDomain) {
			css = css.replace(new RegExp(defaultDomain, "g"), domain);
		}

		fs.writeFileSync("qbittorrent-webui-theme.user.css", css);
		console.log("Built at " + new Date().toLocaleTimeString());
	} catch (e) {
		console.error(e);
	}
};

if (ARGS.watch) {
	fs.watchFile(scssFile, build);
	console.log("Watching for changes...");
}

build();
