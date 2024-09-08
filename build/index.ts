import { execFile, execSync } from "child_process";
import path from "path";

const tsconfigPath = path.resolve(__dirname, "./tsconfig.json");
const buildTypesCmd = `tsc -p ${tsconfigPath}`;
execSync(buildTypesCmd, {
    stdio: "inherit",
});
