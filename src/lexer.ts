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
    todoChecked,    // 9
    bullet,         // 10
}

export interface Token {
    type: TokenType;
    value: string;
}

export function tokenize(src: string): Token[] {
    const lines = src.split('\n').filter(Boolean);

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

        else if (l.startsWith("* "))  return{ type: TokenType.bullet, value: l.slice(2) }

        return { type: TokenType.text, value: l }
    })
}
