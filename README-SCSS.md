# Estrutura do CSS (SCSS por seções)

O CSS do site agora vive dividido em parciais dentro de `assets/scss/`,
um arquivo por seção da página (mesma organização que já existia como
comentários dentro do `style.css` antigo). O arquivo final que o site
realmente usa continua sendo `assets/css/style.css` — ele é **gerado**,
não deve ser editado à mão.

```
assets/scss/
  main.scss                 ← importa todos os parciais, nesta ordem
  _01-reset.scss
  _02-tokens.scss            (cores, fontes — variáveis usadas no site todo)
  _03-header.scss
  _04-menu-overlay.scss
  _05-section-label.scss
  _06-hero.scss
  _07-about.scss
  _08-projects.scss
  _09-reel-carousel.scss
  _10-whatsapp-float.scss
  _11-stats.scss
  _12-services.scss
  _13-coverage.scss
  _14-contact-form.scss
  _15-footer.scss
  _16-gallery-modal.scss
  _17-cursor.scss
  _18-title-reveal.scss
  _19-finish.scss
  _20-process.scss
  _21-testimonials.scss
  _22-dev-modal.scss
  _23-pricing.scss
  _24-pricing-conditions.scss
  _25-compare-table.scss
  _26-faq.scss
  _27-responsive.scss        ← sempre por último (media queries)
```

## Como editar

1. Abra o parcial da seção que quer mexer (ex: quer alterar o card de
   preços? É `assets/scss/_23-pricing.scss`).
2. Salve.
3. Gere o CSS de novo (veja abaixo).
4. Só então suba pro Netlify — o navegador só lê o `style.css` final,
   nunca os parciais.

**Nunca edite `assets/css/style.css` direto** — na próxima geração,
qualquer coisa escrita ali é sobrescrita.

## Como gerar o CSS

### Opção recomendada — com Sass de verdade

Precisa do [Node.js](https://nodejs.org) instalado (versão 18+).

```bash
npm install
npm run build:css
```

Isso compila `assets/scss/main.scss` → `assets/css/style.css` usando o
compilador oficial ([Dart Sass](https://sass-lang.com/)). Rode de novo
toda vez que editar um parcial.

Se quiser que ele fique gerando sozinho enquanto você edita:

```bash
npm run watch:css
```

### Opção alternativa — sem instalar nada

Se não quiser instalar Node agora, tem um script Python que só junta
os parciais na ordem certa (funciona porque, por enquanto, os parciais
são CSS puro — nenhum usa variáveis `$`, aninhamento ou mixins do
Sass):

```bash
python3 scripts/build-css-fallback.py
```

Assim que alguém começar a usar recursos de verdade do Sass
(variáveis, `&` aninhado, `@mixin`), essa opção para de bastar — aí é
só usar a opção recomendada com `npm run build:css`.

## Por que separar por seção?

- Achar o CSS de uma parte do site fica muito mais rápido (~2600
  linhas viraram ~27 arquivos de ~50-200 linhas cada).
- Menos chance de mexer sem querer no estilo de outra seção.
- **A ordem dos `@use` em `main.scss` importa** — é a mesma ordem do
  arquivo original, porque no CSS quem vem depois pode sobrescrever
  quem veio antes (cascata). Não reordene sem revisar se alguma
  seção depende de vir antes/depois de outra (ex.: `27-responsive`
  precisa continuar sendo o último, senão os ajustes de mobile podem
  parar de funcionar).
