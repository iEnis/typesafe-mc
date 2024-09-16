import { clear } from "console";
import inquirer from "inquirer";
import chalk from "chalk";

export default class Input {
    static async bool(text, value = true) {
        clear();
        const res = await inquirer.prompt([
            {
                "type": "rawlist",
                "name": "check",
                "message": text
            }
        ]);
        return res.check();
    }
}