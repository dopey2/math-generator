
export default class MathString {
  static withSigne = (x: number) => {
      return x >= 0 ? `+ ${x}` : `- ${Math.abs(x)}`;
  };

  static withNegativeSigne = (x: number) => {
      return x < 0 ? `- ${Math.abs(x)}` : `${x}`;
  };

  static negativeSigneParenthesis = (x: number) => {
      if(x < 0) {
          return `(- ${Math.abs(x)})`;
      }
      return x;
  };

  static inverseSigne = (x: number) => {
      return x > 0 ? `- ${x}` : `+ ${-x}`;
  };

  static getSigne = (x: number) => {
      return x > 0 ? "+" : "-";
  }

}

