#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import chalk from "chalk";

const infoText = [
    '\/\/? This file has been patched "https://www.npmjs.com/package/typesafe-mc"',
    `\/\/? version: "${JSON.parse(readFileSync(`${import.meta.dirname}/package.json`).toString()).version}"`,
].join("\n");

console.clear();

console.log(chalk.yellow([
    "Currently only the '@minecraft/server-ui' module is supported",
    "You can Contact me through discord to recommend some changes or additions",
    "My username: 'iEnis'",
    "You may want to check out the npm package: https://www.npmjs.com/package/typesafe-mc",
    "I would also appreciate if you star my Github Repo: https://github.com/iEnis/typesafe-mc"
].concat("").join("\n")));

const toPatch = await inquirer.prompt([{
    "type": "checkbox",
    "name": "modules",
    "message": chalk.green("Chose the Module you want to patch\n"),
    "choices": [
        // chalk.yellow("@minecraft/server"), //TODO this may be added in the future
        chalk.yellow("@minecraft/server-ui"),
        // chalk.yellow("@minecraft/server-gametest"), //TODO this may be added in the future
    ]
}]);
/** @type {string[]} */
const modules = toPatch.modules.map((el) => el.replace("\u001b[33m", "").replace("\u001b[39m", ""));
console.clear();

if (modules.length === 0) {
    console.log(chalk.red("No Modules Selected"));
    process.exit(2);
}

const patches = {
    success: [],
    fail: [],
}

for (const module of modules) {
    console.log(chalk.yellow(`Checking '${module}'`));

    if (!existsSync(`./node_modules/${module}`)) {
        console.log(chalk.red(`Failed to patch '${module}'`));
        patches.fail.push(module);
        continue;
    }
    console.log(chalk.green(`Found '${module}'`));

    console.log(chalk.yellow(`Reading online '${module}'`));
    const type = readFileSync(`${import.meta.dirname}/types/${module.replace("@minecraft/", "")}.d.ts`).toString()
        .replace("\/\/! {REPLACE_ME}", infoText);
    console.log(chalk.green(`Read '${module}'`));

    console.log(chalk.yellow(`Writing '${module}'`));
    writeFileSync(`./node_modules/${module}/index.d.ts`, type);
    console.log(chalk.green(`Wrote '${module}'`));

    console.log(chalk.green(`Finished '${module}'`));
    patches.success.push(module);
}
console.clear();

for (const success of patches.success) { console.log(chalk.green(`Successfully patched '${success}'`)) }
for (const fail of patches.fail) { console.log(chalk.red(`Failed to patch '${fail}'`)) }

if (patches.fail.length > 0)
    console.log(chalk.yellow(`Please install all packages you want to pach before trying to patch them`))

console.log(chalk.green("Done!"));
