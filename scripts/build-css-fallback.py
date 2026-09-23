#!/usr/bin/env python3
"""
Build alternativo do CSS, sem precisar instalar Node/Sass.

Os parciais em assets/scss/ ainda não usam recursos exclusivos de
Sass (variáveis $, aninhamento, mixins) — são CSS puro organizado em
arquivos. Por isso, concatená-los na mesma ordem do main.scss produz
o mesmo resultado que rodar o compilador Sass de verdade.

Se no futuro alguém adicionar variáveis/aninhamento SCSS nos
parciais, este script para de funcionar corretamente — nesse caso,
use o build oficial: `npm install && npm run build:css`.

Uso: python3 scripts/build-css-fallback.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCSS_DIR = ROOT / "assets" / "scss"
MAIN_SCSS = SCSS_DIR / "main.scss"
OUTPUT_CSS = ROOT / "assets" / "css" / "style.css"


def main():
    main_content = MAIN_SCSS.read_text(encoding="utf-8")
    order = re.findall(r'@use\s+"([^"]+)"', main_content)
    if not order:
        raise SystemExit("Nenhum @use encontrado em main.scss")

    parts = []
    for name in order:
        partial_path = SCSS_DIR / f"_{name}.scss"
        if not partial_path.exists():
            raise SystemExit(f"Parcial não encontrado: {partial_path}")
        parts.append(partial_path.read_text(encoding="utf-8").rstrip())

    banner = (
        "/* ============================================================\n"
        "   ARQUIVO GERADO AUTOMATICAMENTE — não edite direto!\n"
        "   Edite os parciais em assets/scss/ e rode o build de novo:\n"
        "   npm install && npm run build:css\n"
        "   (ou scripts/build-css-fallback.py, sem precisar do Node)\n"
        "============================================================ */\n\n"
    )
    final_css = banner + "\n\n".join(parts) + "\n"
    OUTPUT_CSS.write_text(final_css, encoding="utf-8")
    print(f"OK: {OUTPUT_CSS} gerado a partir de {len(order)} parciais.")


if __name__ == "__main__":
    main()
