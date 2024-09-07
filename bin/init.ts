import fs from "fs";
import path from "path";
import prompt from "prompt";
import colors from "@colors/colors/safe";
import { execSync } from "child_process";

const promptSchema = [
    {
        description: "What directory is your project located?",
        message: "Name must be only letters, spaces, or dashes",
        required: true,
        default: ".",
        name: "root-directory",
    },
];

export default function () {
    prompt.message = colors.blue("Q");
    prompt.start();

    const blazeDefaultsDir = path.resolve(__dirname, "../blaze");

    console.log("blazeDefaultsDir", blazeDefaultsDir);

    prompt.get(promptSchema, function (err, result) {
        console.log(result);

        if (err) {
            console.log(err.message);
            process.exit();
        }

        try {
            const installBlazeLatestCmd = `npm i npm install https://github.com/BenjaminToby/blaze-ui.git@latest`;

            const dirInput = String(result["root-directory"]);
            const rootDir = path.resolve(process.cwd(), dirInput);

            const blazeDir = path.join(rootDir, "blaze");

            execSync(installBlazeLatestCmd, {
                stdio: "inherit",
                cwd: blazeDir,
            });

            if (!fs.existsSync(blazeDir)) {
                fs.mkdirSync(blazeDir, { recursive: true });
                fs.cpSync(blazeDefaultsDir, blazeDir, {
                    recursive: true,
                    force: true,
                });
            }
        } catch (error) {}
    });
}
