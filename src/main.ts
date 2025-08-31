import generateHtml from "./generateHtml";

const args = Bun.argv.slice(2);

const filePath = args[0];
if (!filePath) throw new Error("Invalid file path");

const outFolder = args[1];
if (!outFolder) throw new Error("Invalid output path");

const fileName = filePath.slice(filePath.lastIndexOf("/"));
const outName = `${fileName.slice(0, -3)}.html`;

const file = Bun.file(filePath);
const text: string = await file.text();

const html = generateHtml(text);

Bun.write(`${outFolder.endsWith("/") ? outFolder : `${outFolder}/`}/${outName}`, html);
