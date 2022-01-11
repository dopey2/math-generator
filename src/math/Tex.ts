export default class Tex {

    static color(c: string, tex: string) {
        return `\\color{${c}}{${tex}}`;
    }

    static fraction(n: number | string, d: number | string) {
        return `\\frac{${n}}{${d}}`;
    }

    static line() {
        return '\\rule{2cm}{0.4pt}';
    }

    static fullLine() {
        return '\\noindent\\makebox[\\linewidth]{\\rule{\\paperwidth}{0.4pt}}';
    }

    static toMultilineLatex = (lines: string[]) => {
        let latex = `\\begin{split}`;

        lines.forEach((l) => {
            latex += " \&";
            const words = l.split(' ');
            words.forEach((w) => {
                latex += ` ${w} \\space`;
            });
            latex += " \\newline";
        });
        latex += " \\end{split}";
        return latex;
    };
}

