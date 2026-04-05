import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const Share: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const url = `https://${cfg.baseUrl}/${fileData.slug}`

    const translations: Record<string, { copy: string, copied: string, support: string, home: string }> = {
      "ru": { copy: "Копировать", copied: "Скопировано!", support: "Поддержать", home: "Главная" },
      "en": { copy: "Copy Link",  copied: "Copied!",      support: "Buy me a coffee", home: "Home" },
      "de": { copy: "Kopieren",   copied: "Kopiert!",      support: "Kaffee spendieren", home: "Startseite" },
      "fr": { copy: "Copier",     copied: "Copié!",        support: "Un café", home: "Accueil" },
      "es": { copy: "Copiar",     copied: "¡Copiado!",     support: "Un café", home: "Inicio" },
      "pt": { copy: "Copiar",     copied: "Copiado!",      support: "Um café", home: "Início" },
      "zh": { copy: "复制",       copied: "已复制!",        support: "请我喝咖啡", home: "首页" },
      "ar": { copy: "نسخ",        copied: "تم النسخ!",      support: "ادعمني", home: "الرئيسية" },
    }

    const lang = (fileData.frontmatter?.lang as string) || "en"
    const t = translations[lang] || translations["en"]
    const isRu = lang === "ru"
    const supportUrl = isRu ? "https://boosty.to/hyrahmo" : "https://buymeacoffee.com/hyrahmo"
    const homeUrl = isRu ? "/ru/" : "/"

    return (
      <div class={classNames(displayClass, "share-component")}>
        {/* Copy Link */}
        <button
          class="share-btn"
          data-url={url}
          data-copied-text={t.copied}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="share-text">{t.copy}</span>
        </button>

        {/* Support */}
        <a class="share-link" href={supportUrl} target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {t.support}
        </a>

        {/* Home */}
        <a class="share-link" href={homeUrl}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {t.home}
        </a>
      </div>
    )
  }

  Share.css = `
  .share-component {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 1rem 0;
  }
  .share-btn, .share-link {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--lightgray);
    color: var(--gray);
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.85rem;
    font-family: inherit;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .share-btn:hover, .share-link:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }
  .share-btn svg, .share-link svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  `

  Share.afterDOMLoaded = `
  document.addEventListener("nav", () => {
    document.querySelectorAll(".share-btn").forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener("click", async () => {
        const url = newBtn.getAttribute("data-url");
        const copiedText = newBtn.getAttribute("data-copied-text");
        const textSpan = newBtn.querySelector(".share-text");
        const originalText = textSpan.innerText;
        try {
          await navigator.clipboard.writeText(url);
          textSpan.innerText = copiedText;
          newBtn.style.borderColor = "var(--tertiary)";
          newBtn.style.color = "var(--tertiary)";
          setTimeout(() => {
            textSpan.innerText = originalText;
            newBtn.style.borderColor = "";
            newBtn.style.color = "";
          }, 2000);
        } catch (err) { console.error(err); }
      });
    });
  });
  `

  return Share
}) satisfies QuartzComponentConstructor
