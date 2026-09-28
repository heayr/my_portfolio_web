# ⚡ YEGOR.DEV — High-Performance Awwwards-Caliber Portfolio

> Персональный сайт-портфолио ведущего frontend/fullstack инженера, вдохновленный архитектурой и эстетикой темплейта **[Arpeggio](https://arpeggio.framer.website/)**.  
> Спроектирован с упором на экстремальную производительность (**100/100 Core Web Vitals**), чистый код без тяжелого рантайма Framer и презентацию реальных коммерческих проектов.

---

## 📌 Что сделано на текущем этапе

### 1. Архитектурный и дизайнерский аудит оригинального сайта Arpeggio
* **Подкапотная архитектура Framer:** Разобрана работа SSR-рантайма Framer, компиляция React-компонентов, анимационный движок Motion (Framer Motion) и генерация статических CSS-переменных.
* **Анализ шрифтовой системы (100% открытые коммерческие лицензии):**
  * В оригинале Arpeggio используется семейство **Inter Display** (начертания 500 Medium, 700 Bold, 800 ExtraBold, 900 Black) + **Inter** (для мелкого текста) + **Playfair Display Variable** (для акцентного курсива).
  * Подтверждена официальная лицензия **SIL Open Font License 1.1 (OFL)** — все эти шрифты полностью бесплатны и легальны для любых коммерческих веб-сайтов, SaaS и печатной продукции без роялти.
* **Анатомия оригинальной Hero-секции Arpeggio:**
  * По коду и разметке оригинала зафиксирована точная иерархия:
    * `[0] section "Hero BG"` — полноэкранный темный кинематографичный фон (`100vh`) с арт-фотографией (`Girl in white smoke`, `brightness: 0.9` на глубоком черном `#000000`), без радужных градиентов и дешевых цветных пятен.
    * `[1] section "Hero Content"` — минималистичный блок с плотным заголовком (`One subscription, unlimited design iterations.`), подзаголовком (`Freedom beyond the traditional project scope`) и печатью.
    * `Top Nav Bar` — левый ряд текстовых соцсетей монохромными акронимами (`WA`, `X`, `IG`, `LI`, `EMAIL`) + правый ультратонкий 2-линейный бургер меню.
    * `[3] section "Intro"` — типографический ревил со сменой кадров и Marquee-каруселью.

---

### 2. Подготовка и сборка реальных кейсов автора
Вместо шаблонных/выдуманных агентских проектов сайт переориентирован на настоящие репозитории и проекты разработчика (**Yegor / heayr**):

1. **NoLogs SaaS (`heayr/website_nologs` & `heayr/nologs-bot-docs`):**
   * Роль: Lead Frontend & Fullstack Architecture.
   * Стек: Next.js 15 (App Router), TypeScript, FastAPI, PostgreSQL, YooKassa Webhooks, Docker, Wireguard / Hysteria2.
   * Суть: Действующий коммерческий privacy-сервис с платными подписками, биллингом и zero-leak инфраструктурой.
2. **Радиоточка (`heayr/pet-b-fm` / [radiotochka.nologs.website](https://radiotochka.nologs.website/)):**
   * Роль: Lead Frontend Engineer.
   * Стек: React 19, Next.js 15, Tailwind CSS, Fluid Typography, Admin Dashboard.
   * Суть: B2B-платформа и CMS рекламного агентства полного цикла со сквозной адаптивностью и панелью модерации.
3. **The 50th Jubilee (`heayr/birthday-invitation-web` / `birthday.nologs.site`):**
   * Роль: Fullstack Developer & Designer.
   * Стек: React 19 (RC), Vite 8, Tailwind CSS 4, Express, Prisma, SQLite, Docker, Traefik.
   * Суть: Эксклюзивное интерактивное веб-приложение с RSVP-валидацией на Zod и темной liquid-gold эстетикой.

---

### 3. Технический стек и производительность

* **Сборщик:** Vite 8 (минималистичный ESM-билд).
* **Стилизация:** Vanilla CSS (собственная дизайн-система с CSS-токенами, 0 оверхеда на runtime CSS-in-JS).
* **Скролл:** `lenis` (официальный движок плавного Awwwards-скролла без блокировки нативного UX).
* **Иконки:** `lucide` (строгий Tree-shaking только используемых глифов + встроенные inline SVG для брендов).
* **Вес production-бандла:**
  * **JavaScript:** **33.9 KB** (всего **11.6 KB** gzip!) против 1.5–3 MB у стандартного Framer.
  * **CSS:** **21.7 KB** (всего **5.0 KB** gzip!).
  * **Время сборки:** ~140 мс.
  * **Скорость отклика:** 0 ms Total Blocking Time (TBT).

---

### 4. Ассеты и медиафайлы в репозитории

* **Флагманские обложки кейсов (`public/projects/`):**
  * `nologs.webp` (62 KB) — обложка NoLogs SaaS.
  * `radiotochka.webp` (78 KB) — обложка платформы Радиоточка.
  * `birthday.webp` (83 KB) — обложка Jubilee Event App.
* **Кандидаты фонов для Hero с открытыми лицензиями (`public/hero/`):**
  * `arpeggio_original.jpg` — оригинальное монохромное художественное фото с белым дымом и рассеянным светом из Arpeggio.
  * `option_minimal_smoke.jpg` — минималистичный темный кадр со струей дыма в луче света (Unsplash License, автор Jr Korpa).
  * `option_smoke_portrait.jpg` — контрастный силуэт в студийном свете (Unsplash License).

---

### 5. Структура кодовой базы

```text
my_portfolio_web/
├── public/
│   ├── hero/                  # Фотографии с открытыми лицензиями для Hero
│   │   ├── arpeggio_original.jpg
│   │   ├── option_minimal_smoke.jpg
│   │   └── option_smoke_portrait.jpg
│   └── projects/              # Оптимизированные WebP-обложки кейсов автора
│       ├── nologs.webp
│       ├── radiotochka.webp
│       └── birthday.webp
├── src/
│   ├── main.js                # Логика Lenis, живые часы Москвы, интерактив, модалки
│   └── style.css              # Базовая дизайн-система и токены
├── index.html                 # Семантическая разметка страницы
├── package.json               # Зависимости (Vite, Lenis, Lucide)
└── README.md                  # Данная документация
```

---

## 🎯 Следующий шаг в работе: Посекционная пересборка (Hero Section)

В соответствии с фидбеком:
1. **Очистка от лишних декораций:** Полное удаление радиальных градиентов, радужных свечений и спотлайтов из `style.css`.
2. **Точная верстка Hero по сетке Arpeggio:**
   * Базовый цвет фона: строгий `#000000`.
   * Навбар: монохромные текстовые ссылки `TG` · `GH` · `LI` · `EMAIL` слева + 2-полосный бургер справа с открывающейся шторкой (статус + время + ссылки).
   * Фоновый кинематографичный арт Hero на 100vh с легким зумом при прокрутке.
   * Заголовок и подзаголовок в левом нижнем углу первого экрана.
