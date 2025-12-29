# Guia Completo de Markdown

Markdown é uma linguagem de marcação leve que permite formatar texto de forma simples e eficiente. Este guia cobre tudo que você precisa saber!

## Cabeçalhos

Use `#` para criar cabeçalhos:

\`\`\`markdown
# Cabeçalho 1
## Cabeçalho 2
### Cabeçalho 3
#### Cabeçalho 4
##### Cabeçalho 5
###### Cabeçalho 6
\`\`\`

## Ênfase

Adicione ênfase ao texto:

\`\`\`markdown
*itálico* ou _itálico_
**negrito** ou __negrito__
***negrito e itálico*** ou ___negrito e itálico___
~~riscado~~
\`\`\`

Resultado:
- *itálico*
- **negrito**
- ***negrito e itálico***
- ~~riscado~~

## Listas

### Listas não ordenadas

\`\`\`markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3
\`\`\`

### Listas ordenadas

\`\`\`markdown
1. Primeiro item
2. Segundo item
3. Terceiro item
\`\`\`

### Lista de tarefas

\`\`\`markdown
- [x] Tarefa concluída
- [ ] Tarefa pendente
- [ ] Outra tarefa
\`\`\`

## Links

Crie links de várias formas:

\`\`\`markdown
[Texto do link](https://example.com)
[Link com título](https://example.com "Título ao passar o mouse")
<https://example.com>
\`\`\`

Exemplos:
- [Google](https://google.com)
- [GitHub](https://github.com "Plataforma de código")

## Imagens

Adicione imagens:

\`\`\`markdown
![Texto alternativo](url-da-imagem.jpg)
![Imagem com título](url-da-imagem.jpg "Título da imagem")
\`\`\`

## Citações

Use `>` para citações:

\`\`\`markdown
> Esta é uma citação.
> Pode ter várias linhas.
>
> E até parágrafos.
\`\`\`

Resultado:

> "A simplicidade é o último grau de sofisticação." - Leonardo da Vinci

## Código

### Código inline

Use crases para código inline: \`codigo aqui\`

Exemplo: A função \`console.log()\` imprime no console.

### Blocos de código

Use três crases para blocos:

\`\`\`
código sem syntax highlighting
\`\`\`

Com syntax highlighting (especifique a linguagem):

\`\`\`javascript
function exemplo() {
    console.log('Hello, World!');
}
\`\`\`

\`\`\`python
def exemplo():
    print('Hello, World!')
\`\`\`

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Página</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

## Tabelas

Crie tabelas com pipes `|`:

\`\`\`markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Dado 1   | Dado 2   | Dado 3   |
| Dado 4   | Dado 5   | Dado 6   |
\`\`\`

Resultado:

| Recurso | Suporte | Notas |
|---------|---------|-------|
| Cabeçalhos | ✅ | H1 a H6 |
| Listas | ✅ | Ordenadas e não ordenadas |
| Código | ✅ | Inline e blocos |
| Tabelas | ✅ | Com alinhamento |

## Linha Horizontal

Crie linhas horizontais com três ou mais:

\`\`\`markdown
---
***
___
\`\`\`

---

## Escapando caracteres

Use `\\` para escapar caracteres especiais:

\`\`\`markdown
\\* não será itálico \\*
\\# não será cabeçalho
\`\`\`

## Markdown Estendido

Algumas funcionalidades extras:

### Notas de rodapé

\`\`\`markdown
Aqui está uma frase com nota[^1].

[^1]: Esta é a nota de rodapé.
\`\`\`

### Emoji

Você pode usar emojis:

\`\`\`markdown
:smile: :heart: :thumbsup: :rocket:
\`\`\`

Ou copiar e colar diretamente: 😀 ❤️ 👍 🚀

### Destaque

Algumas implementações suportam destaque:

\`\`\`markdown
==texto destacado==
\`\`\`

## Dicas para escrever bons posts

1. **Use cabeçalhos hierárquicos**: Organize seu conteúdo com H1, H2, H3
2. **Quebre parágrafos**: Textos curtos são mais fáceis de ler
3. **Use listas**: Organize informações de forma clara
4. **Adicione código com syntax highlighting**: Especifique sempre a linguagem
5. **Inclua exemplos**: Mostre, não apenas conte
6. **Revise antes de publicar**: Verifique formatação e erros

## Ferramentas úteis

Para escrever Markdown:
- **VS Code**: Editor com preview de Markdown
- **Typora**: Editor WYSIWYG de Markdown
- **StackEdit**: Editor online
- **Obsidian**: Para notas em Markdown

## Cheat Sheet Rápido

\`\`\`markdown
# Cabeçalho
**negrito** *itálico*
[link](url)
![imagem](url)
- lista
1. ordenada
> citação
\`código\`
\`\`\`bloco de código\`\`\`
| tabela | exemplo |
\`\`\`

## Conclusão

Markdown é uma ferramenta poderosa e simples para criar conteúdo formatado. Com este guia, você tem tudo que precisa para escrever posts incríveis!

Pratique bastante e logo você estará escrevendo Markdown naturalmente. 📝✨

---

**Recursos adicionais:**
- [Markdown Guide](https://www.markdownguide.org/)
- [CommonMark Spec](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
