#!/usr/bin/env node

import init from "./init";
import palleteGenerator from "@/utils/colors/palette-generator";

const initIndex = process.argv.findIndex((v) => v.match(/--init/));
const themeindex = process.argv.findIndex((v) => v.match(/--theme/));

const isInit = initIndex > 0;
const isTheme = themeindex > 0;

if (isInit) {
    init();
} else if (isTheme) {
    palleteGenerator();
} else {
    console.log(
        "Please enter a flag to use the CLI. --init to initialize, --theme to setup theme"
    );
    process.exit();
}
