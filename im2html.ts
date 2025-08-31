const filepath = "examples/basic.im";
const outputPath = "output/basic.html";
const file = Bun.file(filepath);
const text = await file.text();

enum TokenType {
    text,           // 0
    title,          // 1
    h1,             // 2
    h2,             // 3
    h3,             // 4
    h4,             // 5
    h5,             // 6
    h6,             // 7
    todo,           // 8
    todoChecked     // 9
}

interface Token {
    type: TokenType;
    value: string;
}

const lines = text.split('\n').filter(Boolean);

function tokenize(lines: string[]): Token[] {
    return lines.map(l => {
        if (l.startsWith("- ") && l.endsWith(" -")) return { type: TokenType.title, value: l.slice(2, -2)}
        else if (l.startsWith("- ") && !l.endsWith(" -")) return { type: TokenType.h1, value: l.slice(2) }
        else if (l.startsWith("-- ")) return { type: TokenType.h2, value: l.slice(3) }
        else if (l.startsWith("--- ")) return { type: TokenType.h3, value: l.slice(4) }
        else if (l.startsWith("---- ")) return { type: TokenType.h4, value: l.slice(5) }
        else if (l.startsWith("----- ")) return { type: TokenType.h5, value: l.slice(6) }
        else if (l.startsWith("------ ")) return { type: TokenType.h6, value: l.slice(7) }
        else if (l.startsWith("[ ]")) return { type: TokenType.todo, value: l.slice(3) }
        else if (l.startsWith("[x]")) return { type: TokenType.todoChecked, value: l.slice(3) }
        return { type: TokenType.text, value: l }
    })
}

const tokenized = tokenize(lines);

function toHtml(t: Token): string {
    if (t.type == 1) return "";
    else if (t.type == 2) return `\t<h1>${t.value}</h1>\n`
    else if (t.type == 3) return `\t<h2>${t.value}</h2>\n`
    else if (t.type == 4) return `\t<h3>${t.value}</h3>\n`
    else if (t.type == 5) return `\t<h4>${t.value}</h4>\n`
    else if (t.type == 6) return `\t<h5>${t.value}</h5>\n`
    else if (t.type == 7) return `\t<h6>${t.value}</h6>\n`
    else if (t.type == 8) return `\t<input type="checkbox" name="${t.value}" disabled>\n\t<label for="${t.value}">${t.value}</label><br>\n`
    else if (t.type == 9) return `\t<input type="checkbox" name="${t.value}" disabled checked>\n\t<label for="${t.value}">${t.value}</label><br>\n`
    return `\t<p>${t.value}</p>\n`;
}

export default function im2html(): string {
    const titleLine = lines.find(l => l.startsWith("- ") && l.endsWith(" -"));
    const title =  titleLine ? titleLine.slice(2, -2) : "Title";

    const html = [
        "<!DOCTYPE html>\n",
        "<html lang='en'>\n",
        "<head>\n",
        "\t<meta charset='UTF-8'>\n",
        "\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n",
        `\t<title>${title}</title>\n`,
        "</head>\n",
        "<body>\n"
    ]

    tokenized.map(t => html.push(toHtml(t)));

    html.push("</body>");
    html.push("\n</html>");

    return html.join("");
}

const html = im2html();

Bun.write(outputPath, html);
