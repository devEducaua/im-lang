import { tokenize, Token } from "./lexer";

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

    else if (t.type == 10) return `\t<ul><li>${t.value}</li></ul>`;

    return `\t<p>${t.value}</p>\n`;
}

export default function generateHtml(text: string): string {
    const lines = text.split('\n').filter(Boolean);

    const titleLine = lines.find(l => l.startsWith("- ") && l.endsWith(" -"));
    const title =  titleLine ? titleLine.slice(2, -2) : "Title";

    const tokenized = tokenize(text);

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
