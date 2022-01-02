export const times = (n: number, f: Function) => {
  while (n-- > 0) {
    f();
  }
};

export const toMultilineLatex = (lines: string[]) => {
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
