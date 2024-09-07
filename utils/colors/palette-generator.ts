import { createPaletteFromColor } from "kanastra-palette";
import path from "path";
import fs from "fs";

export default function palleteGenerator() {
    try {
        const colorCSSPath = path.resolve(
            process.cwd(),
            "./blaze/styles/color.css"
        );
        const colorJSON = path.resolve(
            process.cwd(),
            "./blaze/theme/color.json"
        );
        const colorObj = JSON.parse(colorJSON);

        const colorTitleIndex = process.argv.findIndex((v) =>
            Boolean(v.match(/--base/))
        );

        if (!colorObj.main) {
            console.log("Please enter a valid base color");
            process.exit();
        }

        let palleteObj: { [key: string]: { [key: string]: string } } = {};

        /**
         * # Generate Main Color
         */
        const baseColor = process.argv[colorTitleIndex + 1];
        const primaryPalette = createPaletteFromColor("primary", baseColor);

        palleteObj = { ...primaryPalette };

        /**
         * # Generate Secondary Color
         */
        const secColorTitleIndex = process.argv.findIndex((v) =>
            Boolean(v.match(/--sec/))
        );

        if (secColorTitleIndex > 0 && process.argv[secColorTitleIndex + 1]) {
            const secColor = process.argv[secColorTitleIndex + 1];
            const secPalette = createPaletteFromColor("sec", secColor);
            palleteObj = { ...palleteObj, ...secPalette };
        } else {
            const secPalette = createPaletteFromColor("sec", "#1C8F5B");
            palleteObj = { ...palleteObj, ...secPalette };
        }

        /**
         * # Generate Accent Color
         */
        const accentColorTitleIndex = process.argv.findIndex((v) =>
            Boolean(v.match(/--accent/))
        );

        if (
            accentColorTitleIndex > 0 &&
            Boolean(process.argv[accentColorTitleIndex + 1])
        ) {
            const accentColor = process.argv[accentColorTitleIndex + 1];
            const accentPalette = createPaletteFromColor("accent", accentColor);
            palleteObj = { ...palleteObj, ...accentPalette };
        } else {
            const accentPalette = createPaletteFromColor("accent", "#3a3fa8");
            palleteObj = { ...palleteObj, ...accentPalette };
        }

        /**
         * # Generate Gray Color
         */
        const grayColorTitleIndex = process.argv.findIndex((v) =>
            Boolean(v.match(/--gr(a|e)y/))
        );

        if (
            grayColorTitleIndex > 0 &&
            Boolean(process.argv[grayColorTitleIndex + 1])
        ) {
            const grayColor = process.argv[grayColorTitleIndex + 1];
            const grayPalette = createPaletteFromColor("gray", grayColor);
            palleteObj = { ...palleteObj, ...grayPalette };
        } else {
            const grayPalette = createPaletteFromColor("gray", "#475569");
            palleteObj = { ...palleteObj, ...grayPalette };
        }

        /**
         * # Generate CSS Text
         */
        let colorTxt = `:root {`;

        generateCSS({
            prefix: "--main-color",
            colors: palleteObj.primary,
            css: colorTxt,
        });
        if (palleteObj.sec)
            generateCSS({
                prefix: "--sec-color",
                colors: palleteObj.sec,
                css: colorTxt,
            });
        if (palleteObj.accent)
            generateCSS({
                prefix: "--accent-color",
                colors: palleteObj.accent,
                css: colorTxt,
            });
        if (palleteObj.gray)
            generateCSS({
                prefix: "--gray-color",
                colors: palleteObj.gray,
                css: colorTxt,
            });

        colorTxt += `\n}`;

        if (fs.existsSync(colorCSSPath)) {
            fs.writeFileSync(colorCSSPath, colorTxt, "utf8");
            console.log("Colors Updated Successfully");
        } else {
            console.log("Please run this function from your root directory");
        }
    } catch (error) {}
}

function generateCSS({
    prefix,
    colors,
    css,
}: {
    prefix: string;
    colors: { [key: string]: string };
    css: string;
}) {
    Object.keys(colors).forEach((key) => {
        const colorRule = `${prefix}-${key}: ${colors[key]};`;
        css += `\n    ${colorRule}`;
    });
}
