export class Symbol {
  constructor(name, svg) {
    this.name = name;
    this.svg = svg;
  }
}

async function make(name) {      
  function filenameFromSymbolName(name) {
    return `img/${name}.svg`;
  }

  async function loadFrom(file) {
    const response = await fetch(file);
    return await response.text();
  }

  try {
    const file = filenameFromSymbolName(name);
    const content = await loadFrom(file);
    return new Symbol(name, content);
  } catch (error) {
    console.error(`Error loading symbol ${name}:`, error);
    throw error;
  }
}

const [Blank, Cross, Nought] = await Promise.all([
    make("blank"),
    make("cross"),
    make("nought")
]);


export const Symbols = Object.freeze({
    Blank,
    Cross,
    Nought
});

export function symbolForName(name) {
  for (const symbol of Object.values(Symbols)) {
    if (symbol.name === name) {
      return symbol;
    }
  }
  throw new Error(`Symbol not found for name: ${name}`);
}
