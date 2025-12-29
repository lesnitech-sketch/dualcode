# Introdução ao JavaScript Moderno

JavaScript é a linguagem de programação da web. Neste post, vamos explorar os conceitos fundamentais do JavaScript ES6+ com exemplos práticos.

## O que é JavaScript?

JavaScript é uma linguagem de programação interpretada, de alto nível, dinâmica e multi-paradigma. É uma das três tecnologias principais da web, junto com HTML e CSS.

## Variáveis e Constantes

No JavaScript moderno, usamos `let` e `const` em vez de `var`:

\`\`\`javascript
// Constante - não pode ser reatribuída
const PI = 3.14159;

// Variável - pode ser reatribuída
let contador = 0;
contador++;

// Evite usar var (legado)
var antigaVariavel = 'não recomendado';
\`\`\`

## Arrow Functions

As arrow functions oferecem uma sintaxe mais concisa:

\`\`\`javascript
// Função tradicional
function somar(a, b) {
    return a + b;
}

// Arrow function
const somarArrow = (a, b) => a + b;

// Arrow function com corpo
const calcular = (x, y) => {
    const resultado = x * y;
    return resultado;
};

console.log(somarArrow(5, 3)); // 8
\`\`\`

## Template Literals

Use template literals para strings mais legíveis:

\`\`\`javascript
const nome = 'João';
const idade = 25;

// Forma antiga
const mensagem1 = 'Olá, ' + nome + '! Você tem ' + idade + ' anos.';

// Template literal (recomendado)
const mensagem2 = \`Olá, ${nome}! Você tem ${idade} anos.\`;

// Multilinha
const poema = \`
    Rosas são vermelhas,
    Violetas são azuis,
    JavaScript é incrível,
    E este blog também é!
\`;
\`\`\`

## Destructuring

Extraia valores de objetos e arrays de forma elegante:

\`\`\`javascript
// Destructuring de objetos
const usuario = {
    nome: 'Maria',
    email: 'maria@email.com',
    idade: 30
};

const { nome, email } = usuario;
console.log(nome); // 'Maria'

// Destructuring de arrays
const cores = ['vermelho', 'verde', 'azul'];
const [primeira, segunda] = cores;
console.log(primeira); // 'vermelho'
\`\`\`

## Spread Operator

O spread operator (`...`) é muito útil para trabalhar com arrays e objetos:

\`\`\`javascript
// Copiar arrays
const numeros = [1, 2, 3];
const copiaNumeros = [...numeros];

// Combinar arrays
const frutas = ['maçã', 'banana'];
const vegetais = ['cenoura', 'batata'];
const alimentos = [...frutas, ...vegetais];

// Copiar objetos
const pessoa = { nome: 'Ana', idade: 28 };
const pessoaCompleta = { ...pessoa, cidade: 'São Paulo' };
\`\`\`

## Array Methods

Métodos modernos de arrays são extremamente poderosos:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// map - transformar cada elemento
const dobrados = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - filtrar elementos
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4]

// reduce - reduzir a um único valor
const soma = numeros.reduce((acc, n) => acc + n, 0);
// 15

// find - encontrar primeiro elemento
const maior3 = numeros.find(n => n > 3);
// 4
\`\`\`

## Promises e Async/Await

Para operações assíncronas:

\`\`\`javascript
// Promise
function buscarDados() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Dados carregados!');
        }, 1000);
    });
}

// Async/Await
async function carregarDados() {
    try {
        const dados = await buscarDados();
        console.log(dados);
    } catch (error) {
        console.error('Erro:', error);
    }
}

carregarDados();
\`\`\`

## Classes

JavaScript suporta programação orientada a objetos:

\`\`\`javascript
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return \`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.\`;
    }
}

const pessoa = new Pessoa('Carlos', 35);
console.log(pessoa.apresentar());
\`\`\`

## Conclusão

JavaScript moderno oferece muitas ferramentas poderosas para escrever código limpo e eficiente. Continue praticando e explorando a linguagem!

## Recursos para aprender mais

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)

Happy coding! 🚀
