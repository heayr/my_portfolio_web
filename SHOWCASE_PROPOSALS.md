# 🚀 Showcase Kit & Promotion Proposals
> **Project:** Yegor (heayr) — Digital Portfolio & Interactive Experience  
> **Repository:** https://github.com/heayr/my_portfolio_web  
> **Production Target:** Vercel (Production Deployment)  
> **Philosophy:** Zero AI Markers, High Technical Depth, 100% Free Submissions.

---

## 📌 Checklist Before Publishing
1. [ ] Подставьте ваш боевой URL Vercel (например, `https://...vercel.app` или кастомный домен `https://yegor.dev`) вместо плейсхолдера `[URL_ВАШЕГО_САЙТА]`.
2. [ ] Запишите 15–25 секунд видео на Mac (QuickTime Player → Новая запись экрана): плавный скролл Hero, ховер по карточкам с эффектом стекла и Spotlight в футере.

---

## 1. 💼 LinkedIn Post (English — CTOs, Founders & Tech Leads)
**Целевая аудитория:** Международные фаундеры, Engineering Leads, рекрутеры технологических компаний.  
**Медиа:** 15–30 сек скринкаст плавного скролла и эффектов.

```markdown
Why your React portfolio stutters at 120Hz — and how we eliminated it.

Most interactive portfolios look great in Figma, but feel sluggish on real hardware. Tracking mouse coordinates with useState on high-polling devices (1000Hz gaming mice, ProMotion displays) triggers up to a thousand re-renders per second, choking React's reconciliation phase.

For my new engineering portfolio, I took a zero-compromise approach:

⚡ 120 FPS Direct DOM Mutation
Instead of feeding mouse coordinates into React state, cursor spotlights and parallax calculations mutate the DOM directly via mutable useRef pointers. React reconciliation is bypassed entirely during continuous input.

🛡️ Zero Memory Leaks & Event Hygiene
Isolated logic into SRP hooks (useHeroPlayback, useCopyToClipboard, useScrollLock). Every single listener, animation frame, and interval is strictly tracked and collected on unmount.

💎 True Polymorphic Architecture
Built strict, reusable primitives (Button, Badge, GlassCard, SectionHeader) with generic ElementType, BaseProps, and safe attribute injection (tabnabbing protection, type="button" enforcement).

🎨 Native Optical Glassmorphism
Zero heavy external UI libraries. Pure Tailwind CSS v4 backdrop-blur filters, dynamic sheen, and custom hardware-accelerated transforms.

🔒 Privacy-First
Zero cookies, zero 3rd-party trackers, zero annoying cookie consent modals. 100% clean SSR in Next.js 15 for optimal crawlability.

Tech Stack: Next.js 15 (App Router), React 19, TypeScript, Lenis Scroll, Tailwind CSS v4.

🔗 Live Demo: [URL_ВАШЕГО_САЙТА]
💻 Source Code: https://github.com/heayr/my_portfolio_web

Feedback and architectural critiques are warmly welcome!

#frontend #fullstack #react19 #nextjs #typescript #webperf #creativecoding #awwwards
```

---

## 2. 🐦 X / Twitter Thread (English — Web Dev Community)

### Tweet 1 (Main + Video):
```text
Built my new engineering portfolio targeting 120 FPS fluid motion, zero memory leaks, and true polymorphic primitives. 

Powered by Next.js 15, React 19, and @darkroomengineering's Lenis.

Here is the architectural breakdown 👇
[ATTACH SCREEN RECORDING]
```

### Tweet 2 (Technical Insight):
```text
1/ The useState Trap:
1000Hz mice firing onMouseMove = 1000 re-renders/sec if you use state. 

Instead, cursor spotlights and sheen effects mutate CSS custom properties directly via useRef. Zero Virtual DOM reconciliation during motion.
```

### Tweet 3 (Primitives & Links):
```text
2/ True Polymorphism:
Custom <Button>, <GlassCard>, and <Badge> primitives accept an `as` prop with strict generic types, automatically enforcing tabnabbing protection (rel="noopener noreferrer") on outbound links.

Live: [URL_ВАШЕГО_САЙТА]
GitHub: https://github.com/heayr/my_portfolio_web
```

---

## 3. 🇷🇺 Russian Technical Post (Telegram / Habr / LinkedIn RU)
**Формат:** Экспертный разбор решения инженерных проблем.

```markdown
Как сделать интерактивное портфолио на React 19, которое реально выдаёт 120 FPS

Частая беда современных фронтенд-портфолио: выглядит красиво, но на MacBook с ProMotion или мониторах 120-144 Гц скролл микрофризит, а ноутбук греется.

Когда я проектировал своё портфолио, главной задачей было сделать не просто витрину работ, а эталонную инженерную систему:

1. Отказ от useState для событий высокой частоты.
Игровые мыши и трекпады опрашиваются с частотой до 1000 Гц. Если сохранять координаты курсора в React State для спотлайтов и параллакса — React задыхается в диффинге Virtual DOM. Все динамические световые эффекты и трекинг вынесены в нативные DOM-мутации через useRef.

2. Полиморфизм на дженериках.
Все UI-примитивы (Button, Badge, GlassCard) умеют безопасно менять рендер-тег (button -> a -> div) с автоподстановкой type="button" для кнопок и rel="noopener noreferrer" для внешних ссылок без бойлерплейта.

3. Нулевые утечки памяти.
Каждый requestAnimationFrame, setInterval и touch-листенер изолирован в кастомные SRP-хуки с гарантированным клинапом при размонтировании.

4. 100% Privacy и 0 cookies.
Никаких сторонних трекеров и назойливых cookie-баннеров. Полный SSR в Next.js 15 для идеального SEO.

Стек: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Lenis.

Демо: [URL_ВАШЕГО_САЙТА]
Код на GitHub: https://github.com/heayr/my_portfolio_web

Буду рад конструктивному код-ревью и фидбеку!
```

---

## 4. 👾 Reddit Post (r/webdev or r/nextjs — Showoff Saturday)

**Title:**
> Showoff Saturday: Built a 120 FPS interactive developer portfolio with Next.js 15, React 19, and Zero-Reconciliation cursor effects

**Post Body:**
```markdown
Hey everyone!

I wanted to share my new portfolio built with Next.js 15 and React 19. Rather than relying on heavy animation packages, the focus was on raw web performance and clean architecture:

* **Direct DOM Mutation:** Cursor spotlight & tilt effects bypass React's render phase using mutable `useRef` handles to ensure a rock-solid 120 FPS on high-refresh displays.
* **True Polymorphic Primitives:** Custom design system (`<Button as="a">`, `<GlassCard as="section">`) with strict TypeScript inference and automatic tabnabbing protection.
* **Zero Cookies / Privacy-First:** No analytics scripts, no GDPR consent banners.
* **Smooth Inertia:** Lenis scroll synced with canvas-based trajectories.

Live Demo: [URL_ВАШЕГО_САЙТА]  
GitHub Repo: https://github.com/heayr/my_portfolio_web

Would love to hear your thoughts on the code structure and motion design!
```

---

## 5. 📋 Бесплатные каталоги и галереи (Формы подачи Copy-Paste)

### A. Godly.website ([godly.website/submit](https://godly.website/submit))
*Бесплатная подача трендовых темных/минималистичных сайтов.*
* **Website Name:** `Yegor — Interactive Portfolio`
* **Website URL:** `[URL_ВАШЕГО_САЙТА]`
* **Category:** `Portfolio / Personal`
* **Description:**
  ```text
  A high-performance interactive developer portfolio featuring 120 FPS direct DOM mutations, luxury glassmorphism, Lenis fluid scroll, and dark-mode aesthetics.
  ```

### B. One Page Love ([onepagelove.com/submit](https://onepagelove.com/submit))
*Выберите опцию «Free Submission».*
* **Title:** `Yegor (heayr) — Engineer Portfolio`
* **URL:** `[URL_ВАШЕГО_САЙТА]`
* **Short Description:**
  ```text
  Minimalist yet dynamic one-page portfolio built with React 19 and Next.js 15. Showcases commercial SaaS products with fluid inertia scroll and refined optical glass.
  ```

### C. Peerlist Projects ([peerlist.io](https://peerlist.io/))
*Создайте новый проект в профиле:*
* **Project Title:** `Yegor — 120 FPS Engineering Portfolio`
* **Tagline:** `High-performance interactive portfolio built with React 19, Next.js 15, and True Polymorphic UI.`
* **Tags:** `Next.js`, `React 19`, `Tailwind CSS`, `TypeScript`, `Web Performance`
* **Project Overview:** Используйте текст из пункта 1 (LinkedIn) или 4 (Reddit).

### D. Land-book ([land-book.com](https://land-book.com/))
* **Submit URL:** `[URL_ВАШЕГО_САЙТА]`
* **Category:** `Portfolios` / `Minimal`
