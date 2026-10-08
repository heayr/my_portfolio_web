# 📖 BEST_PRACTICES_PLAYBOOK.md
# Инженерная библия веб-разработки: Золотой стандарт от А до Я

> **Назначение документа:** Это настольный эталон и пошаговый плейбук для создания цифровых продуктов высочайшего класса (уровня Awwwards / Site of the Day / Apple Quality).
> Используйте этот документ перед стартом любого нового веб-проекта и как чек-лист на каждом этапе разработки.

---

## 🧭 Навигация по жизненному циклу проекта

1. [📐 Раздел 1. Архитектурная геометрия экрана, мобильная верстка и сетка](#-раздел-1-архитектурная-геометрия-экрана-мобильная-верстка-и-сетка)
2. [🛡️ Раздел 2. Безопасность окружения `.env` и секретов в Next.js (Zero-Leak Protocol)](#️-раздел-2-безопасность-окружения-env-и-секретов-в-nextjs-zero-leak-protocol)
3. [💎 Раздел 3. Архитектура UI-компонентов: Истинный полиморфизм и безопасность](#-раздел-3-архитектура-ui-компонентов-истинный-полиморфизм-и-безопасность)
4. [🎨 Раздел 4. Оптическая физика и дизайн-система (Apple visionOS Liquid Glass)](#-раздел-4-оптическая-физика-и-дизайн-система-apple-visionos-liquid-glass)
5. [⚡ Раздел 5. Движок производительности 120 FPS и защита батареи смартфонов](#-раздел-5-движок-производительности-120-fps-и-защита-батареи-смартфонов)
6. [🎬 Раздел 6. Кинематографический Scrollytelling на HTML5 Canvas](#-раздел-6-кинематографический-scrollytelling-на-html5-canvas)
7. [📍 Раздел 7. Якорная привязка и взаимное расположение HUD-элементов](#-раздел-7-якорная-привязка-и-взаимное-расположение-hud-элементов)
8. [🏆 Раздел 8. Итоговый чек-лист самопроверки (Production Quality Gate)](#-раздел-8-итоговый-чек-лист-самопроверки-production-quality-gate)

---

## 📐 Раздел 1. Архитектурная геометрия экрана, мобильная верстка и сетка

### 1.1. Стандарт ширины контейнера и защита от 2K/4K/Ultrawide
* **Проблема / Антипаттерн:**
  - Дефолтный `max-w-7xl` (1280px) на мониторах 2K (2560px) и 4K выглядит как узкая сиротливая колонка по центру, оставляя по бокам пустые «поля смерти».
  - Другая крайность — `w-full` без максимальной ширины: на Ultrawide (3440px) текст и кнопки разъезжаются в края монитора, заставляя пользователя крутить головой на 90 градусов.
* **Золотой стандарт архитектуры:**
  - **Мастер-контейнер страницы:** `max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24`.
  - **Внутренний HUD/Стейдж:** `width: 100%; max-width: clamp(1200px, 92vw, 1800px); margin: 0 auto;`.
  - **Длина строки текста (Measure):** параграфы **всегда** имеют `max-w-2xl` или `max-w-3xl`. Оптимальная длина строки для комфортного чтения человеком — **от 60 до 75 символов**.
* **Готовый сниппет (Tailwind CSS):**
  ```tsx
  <section className="relative w-full py-20 sm:py-28 lg:py-36 overflow-hidden">
    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
      {/* Заголовок с ограниченной длиной строки */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <h2 className="text-[clamp(2.2rem,5vw,5.5rem)] font-black uppercase leading-tight tracking-tight">
          Монументальная Архитектура
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-zinc-400 leading-relaxed">
          Текст никогда не растягивается во всю ширину экрана на сверхшироких мониторах.
        </p>
      </div>
    </div>
  </section>
  ```

---

### 1.2. Мобильная верстка и стандарты Touch (Apple HIG & Android)
* **Проблема / Антипаттерн:**
  - Мелкие кнопки 28x28px, в которые невозможно попасть пальцем на ходу.
  - Формы, при фокусе на которые iPhone дико приближает экран (iOS Safari Zoom Bug).
  - Элементы футера и навигации, перекрытые системной полоской жестов (Home Bar) или челкой / Dynamic Island.
  - Паразитный горизонтальный скролл при случайном свайпе.
* **Золотые стандарты:**
  1. **Touch Target Size:** минимальная площадь кликабельного элемента обязана быть **не менее 44×44px** (по стандарту Apple Human Interface Guidelines и WCAG AAA). Даже если визуальная иконка 16px, контейнер или псевдоэлемент обязаны иметь padding до 44px.
  2. **Safe Area Insets (Обязательно для iOS):**
     ```css
     padding-top: max(16px, env(safe-area-inset-top));
     padding-bottom: max(20px, env(safe-area-inset-bottom));
     padding-left: max(16px, env(safe-area-inset-left));
     padding-right: max(16px, env(safe-area-inset-right));
     ```
  3. **Защита от зума в iOS Safari:**
     На любых `<input>`, `<textarea>` и `<select>` размер шрифта на мобильных **всегда равен минимум 16px (`text-base`)**. Если поставить `text-xs` (12px), Safari принудительно масштабирует страницу при клике на поле.
  4. **Блокировка паразитного скролла (Rubber-Banding):**
     ```css
     html, body {
       overflow-x: hidden;
       overscroll-behavior-y: none;
       -webkit-tap-highlight-color: transparent;
     }
     ```
  5. **Пассивные обработчики тача:**
     Всегда передавать `{ passive: true }` при ручных `addEventListener('touchstart', ...)` или `touchmove`, иначе браузер блокирует поток скролла.

---

### 1.3. Плавная масштабируемая типографика (Fluid Typography via `clamp()`)
* **Проблема:** Переключение размеров через ступенчатые медиа-запросы (`text-3xl md:text-5xl lg:text-7xl`) создает визуальные рывки при изменении ширины окна.
* **Решение:** Использовать математический CSS `clamp(MIN, VAL, MAX)`:
  - **Дисплейные заголовки Hero:** `font-size: clamp(2.2rem, 5.5vw, 6.2rem);`
  - **Заголовки секций:** `font-size: clamp(1.8rem, 3.8vw, 3.8rem);`
  - **Подзаголовки:** `font-size: clamp(1rem, 1.4vw, 1.35rem);`

---

## 🛡️ Раздел 2. Безопасность окружения `.env` и секретов в Next.js (Zero-Leak Protocol)

### 2.1. В чём подлость архитектуры Next.js с `.env`
* **Проблема:**
  1. Next.js поддерживает каскад файлов: `.env`, `.env.local`, `.env.development`, `.env.production`.
  2. В дефолтных шаблонах `create-next-app` строка в `.gitignore` часто записана как `.env*.local`. Из-за этого файлы с именами `.env`, `.env.production` или `.env.staging` **спокойно индексируются Git и улетают в публичный репозиторий GitHub**.
  3. Разработчик добавляет приватный ключ Telegram бота, ключ OpenAI или доступ к базе, делает `git commit -a` — и через 30 секунд боты в интернете парсят приватные ключи.

### 2.2. Опасность префикса `NEXT_PUBLIC_`
* **Жесткое правило:**
  - Переменная **БЕЗ** префикса (например, `STRIPE_SECRET_KEY`, `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`) доступна **ТОЛЬКО** в Node.js рантайме (Server Components, Route Handlers, Server Actions). В браузер она физически не попадает.
  - Любая переменная с префиксом `NEXT_PUBLIC_` (например, `NEXT_PUBLIC_API_URL`) на этапе сборки **жестко зашивается текстом в клиентский JS-бандл**.
  - **Никогда не добавляйте `NEXT_PUBLIC_` к секретам!** Всё с этим префиксом видит любой школьник в DevTools вкладке Network/Sources.

### 2.3. Непробиваемый шаблон `.gitignore` для секретов
Скопируйте этот блок в `.gitignore` вашего проекта:

```gitignore
# ==============================================================================
# 🛡️ ZERO-LEAK SECURITY: Environment Variables & Private Secrets
# ==============================================================================
.env
.env*
!.env.example
*.env
*.pem
*.key
*.cert
*.id_rsa
serviceAccountKey.json
credentials.json
```

### 2.4. Правило безопасного `.env.example`
* В репозитории должен храниться **только** `.env.example`.
* В нем указаны названия всех необходимых ключей с понятными плейсхолдерами, но **без единого реального символа секретов**:
  ```env
  # Public Client Variables
  NEXT_PUBLIC_SITE_URL=http://localhost:3000

  # Server-Only Secrets (DO NOT ADD NEXT_PUBLIC_)
  DATABASE_URL=postgresql://user:password@localhost:5432/mydb
  TELEGRAM_BOT_TOKEN=your_bot_token_here
  ADMIN_SECRET_KEY=your_secret_key_here
  ```

### 2.5. Экстренный протокол при случайном коммите секрета
Если секрет попал в Git-историю (даже если вы сделали новый коммит с его удалением, в истории коммитов он остался!):
1. **Немедленно отозвать (Rotate) скомпрометированный ключ** в сервисе (Stripe, GitHub, Telegram, Cloudflare). Старый ключ должен стать мертвым в течение 2 минут.
2. Очистить историю коммитов локально и на удаленном сервере:
   ```bash
   # Полное вырезание файла из всех коммитов через git-filter-repo:
   git filter-repo --path .env --invert-paths --force
   git push origin main --force
   ```

---

## 💎 Раздел 3. Архитектура UI-компонентов: Истинный полиморфизм и безопасность

### 3.1. Канонический паттерн True Polymorphism (`as` prop)
* **Антипаттерн:** Делать отдельные компоненты `Button`, `LinkButton`, `IconButton` или писать спагетти с `if (type === 'button') return <button>... else <a>...`.
* **Эталонное решение:** Компонент умеет динамически становиться любым тегом или сторонним компонентом (`as="button"`, `as="a"`, `as={Link}`), сохраняя строгую автоподстановку пропсов в IDE.

```tsx
import React from 'react';

export interface BaseButtonProps {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

export type ButtonProps<E extends React.ElementType = 'button'> = BaseButtonProps & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof BaseButtonProps | 'as'>;

export const Button = <E extends React.ElementType = 'button'>({
  as,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  ...rest
}: ButtonProps<E>) => {
  // Smart Fallback: если передан href, автоматически рендерится как ссылка
  const Component = as || (('href' in rest && (rest as any).href) ? 'a' : 'button');

  // Системная безопасность (Defense in Depth)
  const safeProps: Record<string, any> = {};
  if (Component === 'button') {
    safeProps.type = (rest as any).type || 'button'; // Защита от случайного submit
  } else if (Component === 'a') {
    const rawTarget = (rest as any).target;
    const hrefVal = (rest as any).href;
    const isExternal = typeof hrefVal === 'string' && (hrefVal.startsWith('http') || hrefVal.startsWith('mailto'));
    if (rawTarget === '_blank' || isExternal) {
      safeProps.target = rawTarget || '_blank';
      safeProps.rel = (rest as any).rel || 'noopener noreferrer'; // Защита от Tabnabbing
    }
  }

  return (
    <Component
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all select-none ${className}`}
      {...(rest as any)}
      {...safeProps} // Безопасные свойства спредятся последними и не могут быть переопределены снаружи
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </Component>
  );
};
```

---

## 🎨 Раздел 4. Оптическая физика и дизайн-система (Apple visionOS Liquid Glass)

### 4.1. Формула настоящего жидкого стекла (Zero-Plastic Glass)
* **Антипаттерн:** Залить фон `rgba(255,255,255, 0.96)`. В результате получается плоский кусок пластика, блур сквозь него не виден, магия глубины уничтожена.
* **Физика оптического стекла:**
  1. **Полупрозрачная подложка:** от `0.38` до `0.60`.
  2. **Экстремальный блур и подъем насыщенности:** `backdrop-filter: blur(28px) saturate(210%) contrast(104%)`. Блюр без насыщения выглядит грязным и серым.
  3. **Призматическая хроматическая дисперсия (Хроматические блики на фасках):** свет преломляется на стеклянных ребрах, раскладываясь на спектры — легкий синий отблеск слева и янтарный справа.

```css
/* Эталон Liquid Glass (VisionOS / macOS Sequoia) */
.apple-glass {
  position: relative;
  border-radius: 22px;
  background:
    radial-gradient(135% 135% at 50% 0%, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.38) 55%, rgba(246, 246, 248, 0.48) 100%);
  backdrop-filter: blur(28px) saturate(210%) contrast(104%);
  -webkit-backdrop-filter: blur(28px) saturate(210%) contrast(104%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 24px 48px -12px rgba(15, 23, 42, 0.12),
    0 8px 24px -4px rgba(15, 23, 42, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05),
    inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.98),
    inset -1.5px 0 2.5px 0 rgba(59, 130, 246, 0.2),  /* Синяя дифракция */
    inset 1.5px 0 2.5px 0 rgba(245, 158, 11, 0.2),   /* Янтарная дифракция */
    inset 0 -1.5px 1.5px 0 rgba(0, 0, 0, 0.05);
}
```

### 4.2. Железное правило адаптации тем и темный якорь футера
1. **Контраст в светлой теме:** достигается **НЕ** заливкой стекла белой краской, а глубоким цветом типографики: заголовки — `text-zinc-950 font-black`, подписи — `text-zinc-800 font-medium`.
2. **Темный якорь футера:** Если футер по дизайну является театральным занавесом (`#050508`), виджеты внутри него (`#contact .apple-glass`, `footer .apple-glass`) **ВСЕГДА принудительно зафиксированы в темном стекле** (`rgba(10, 10, 14, 0.55)` с белым текстом `!important`), независимо от того, какая глобальная тема выбрана на сайте.

---

## ⚡ Раздел 5. Движок производительности 120 FPS и защита батареи смартфонов

### 5.1. Direct DOM Mutation (Zero-React-Reconciliation)
* **Антипаттерн:** Хранить позицию курсора в React State (`const [mouse, setMouse] = useState({ x, y })`).
* **Почему:** На мониторах 120 Гц событие `mousemove` стреляет до 1000 раз в секунду. Вызов `useState` заставляет React производить диффинг Virtual DOM 1000 раз в секунду, вызывая нагрев процессора и троттлинг.
* **Золотой стандарт:** Прямая мутация DOM через `useRef` в `translate3d`:
  ```tsx
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Прямая запись на слой GPU Compositing без ре-рендеров React:
    spotlightRef.current.style.opacity = '1';
    spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  ```

---

### 5.2. Изоляция листового состояния (Живые часы и секунды)
* **Антипаттерн:** Запустить `setInterval` с обновлением секунд в `Header.tsx` или в корне приложения. В итоге каждую секунду перерисовывается вся страница.
* **Золотой стандарт:**
  1. Вызов хука `useMoscowClock` изолирован **только внутри конечного листового компонента** `<MoscowClock />`.
  2. Все родительские компоненты (`Header`, `NavigationDrawer`, `CurtainFooter`) обернуты в `React.memo` и **не ре-рендерятся вообще**.
  3. `Intl.DateTimeFormat` создается **один раз в области видимости модуля** (`module-level singleton`).

```ts
// Singleton: 0 аллокаций памяти и 0 сборок мусора в секунду
const moscowFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false,
});

export function useMoscowClock(fallback = '--:--:--') {
  const [time, setTime] = useState(fallback);
  useEffect(() => {
    const tick = () => setTime(moscowFormatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
```

---

### 5.3. Защита батареи мобильных устройств (4 киллера батареи)
1. **Остановка невидимых циклов (`IntersectionObserver`):**
   Когда Canvas или частицы уходят из поля зрения, их цикл `requestAnimationFrame` обязан быть немедленно отменен через `cancelAnimationFrame`. 0% нагрузки на GPU в фоне.
2. **Отключение альфа-блендинга (`<canvas alpha: false>`):**
   По умолчанию Canvas полупрозрачный, что заставляет мобильный GPU пересчитывать смешивание цветов миллионов пикселей на каждом кадре. Флаг `alpha: false` объявляет холст непрозрачной текстурой и аппаратно снимает эту нагрузку.
3. **Пассивные обработчики тача:**
   Слушатели скролла и тача на смартфонах обязаны быть `{ passive: true }`.
4. **Устранение Garbage Collection Churn:**
   Никаких аллокаций объектов и замыканий в высокочастотных циклах анимации.

---

## 🎬 Раздел 6. Кинематографический Scrollytelling на HTML5 Canvas

### 6.1. Почему 2D Canvas выигрывает у видео и Three.js
* **Проблема видео (`<video>`):** браузеры плохо поддерживают субкадровый скраббинг видео при обратном скролле (декодирование H.264 назад вызывает фризы и задержки).
* **Проблема 3D (Three.js):** 3D-сцена с моделями и шейдерами весит от 30 до 50 МБ, сжирает 1.5 ГБ RAM и греет ноутбуки и смартфоны до троттлинга.
* **Эталон:** 55 оптимизированных кадров WebP, отрисовываемых на аппаратном `<canvas alpha: false>`.
  - **LERP-интерполяция (0.12):** сглаживает рывки колесика мыши:
    ```ts
    currentFloatFrame += (targetFloatFrame - currentFloatFrame) * 0.12;
    ```
  - **Temporal Crossfade:** при дробном значении кадра (например, `24.4`) холст смешивает 24-й и 25-й кадры по альфа-каналу, давая кинематографическую плавность 120 FPS.
  - **Приоритетный стриминг:** 1-й и 55-й кадры загружаются первыми для LCP < 0.8s, остальные кэшируются в фоне.

---

## 📍 Раздел 7. Якорная привязка и взаимное расположение HUD-элементов

### 7.1. Математическая якорная привязка зависимых блоков
* **Антипаттерн:** Вычислять координаты зависимых элементов через независимые формулы `calc(...)` от краев экрана. На разных разрешениях они обязательно наедут друг на друга.
* **Золотой стандарт:** Относительный контейнер-якорь и абсолютная привязка вверх от базового элемента:

```tsx
<div className="relative w-full sm:w-[380px] 2xl:w-[440px] pointer-events-auto">
  {/* Карточка парит СТРОГО над полосой траектории на 12px выше и растет вверх */}
  <div className={`absolute bottom-[calc(100%+12px)] left-0 w-full transition-all duration-500 ${
    visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
  }`}>
    <GlassCard className="w-full p-4 rounded-2xl">
      {/* Рендерится ровно 1 активная карточка текущего акта */}
      <NarrativeContent card={CARDS_DATA[activeAct]} />
    </GlassCard>
  </div>

  {/* Полоса траектории лежит в нормальном потоке в самом низу */}
  <GlassCard className="w-full p-3.5 rounded-2xl">
    <TrajectoryProgressBar progress={progress} />
  </GlassCard>
</div>
```
* **Почему это неубиваемо:**
  - Карточка математически привязана к верхнему краю полосы прогресса (`bottom: calc(100% + 12px)`).
  - Карточка физически не может перекрыть полосу прогресса или выдавить её за экран.
  - Левые края и ширина совпадают пиксель-в-пиксель на любых экранах.

---

## 🏆 Раздел 8. Итоговый чек-лист самопроверки (Production Quality Gate)

Перед тем как релизить любой проект, пройдитесь по этому чек-листу:

- [ ] **Безопасность `.env`:** В `.gitignore` внесены `.env`, `.env*`, `*.key`, `*.pem`. В репозитории лежит только чистый `.env.example` без боевых ключей.
- [ ] **Проверка `NEXT_PUBLIC_`:** Ни один приватный серверный секрет не имеет префикса `NEXT_PUBLIC_`.
- [ ] **2K/4K/Ultrawide:** На экранах шире 1920px контейнер ограничен `max-w-[1800px]`, текст ограничен `max-w-3xl`, контент отцентрован и не расплывается в края.
- [ ] **Мобильная верстка:** Минимальный размер кликабельных зон `44x44px`, поля ввода имеют `font-size: 16px` (защита от iOS Safari Zoom), прописаны `safe-area-inset`.
- [ ] **Zero-React-Reconciliation:** Координаты мыши не пишутся в React State, а мутируют напрямую через `useRef` в `translate3d`.
- [ ] **Изоляция часов:** Живые таймеры изолированы внутри листовых компонентов, `Intl.DateTimeFormat` вынесен в модуль-синглтон.
- [ ] **Защита батареи:** Анимации останавливают `requestAnimationFrame` через `IntersectionObserver`, когда уходят за пределы вьюпорта.
- [ ] **Оптика стекла:** Стекло прозрачно (`0.40–0.60`), блур `saturate(210%)`, футер жестко зафиксирован в темном режиме.
- [ ] **Полиморфизм:** Кнопки защищены от `type="submit"`, ссылки с `_blank` имеют `rel="noopener noreferrer"`.
- [ ] **Core Web Vitals:** LCP < 1.0s, CLS = 0.000, TBT = 0ms, начальный JS-бандл < 150 kB gzipped.
