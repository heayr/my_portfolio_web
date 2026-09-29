# Workspace Design System & Interaction Consistency Rules

- **2-Lines to Cross Animation**:
  - Any expandable or collapsible interactive trigger (header burger menu, accordion items in FAQ/Principles) must strictly use two parallel horizontal lines that smoothly morph into a 45° diagonal cross (X) when open, and back to 2 horizontal lines when closed.
  - Never use inconsistent '+' / '-' signs or miscellaneous icons for state toggles.

- **Header & Menu Architecture**:
  - `Header` is always at `z-50`.
  - The burger button in the header is the SOLE menu open/close toggle. It morphs into a cross in-place when the menu opens.
  - Do not add duplicate close buttons inside the menu overlay.
  - The menu is a full-screen frosted glass overlay (`backdrop-blur-2xl` with 80-85% subtle translucent backdrop).
  - Menu content starts below the header (`pt-24 sm:pt-28`) ensuring full readability.
  - Menu closes on: clicking the burger cross, clicking any navigation link, clicking the backdrop, or pressing Escape.

- **Theme & Contrast Consistency (Dark / Light)**:
  - Zero white-on-white or black-on-black text under any circumstances, including hover states (`group-hover`).
  - Dark Mode: deep obsidian (`#050508`), crisp white/zinc-100 text, luminous amber accents.
  - Light Mode: porcelain/alabaster (`#faf9f5`), high-contrast dark graphite text (`zinc-900`/`zinc-800`), dark badges (`bg-black/5 border-black/10 text-zinc-700`), amber-700/zinc-900 hovers.

- **Footer & Telemetry**:
  - Monumental title has no borders top or bottom, no jittery letter transforms (`translateX`), and its cursor spotlight bleeds full screen width (`w-full`) without container clipping.
  - Telemetry widget is a vertical rectangular card beside the monumental title: large digital clock digits (`text-4xl lg:text-[44px] font-mono font-black`), Moscow time GMT+3, and location/remote text with glowing dot indicator (no map pin, no "available" badge).
  - Contact cards have vibrant cursor-tracking spotlight and NEVER darken while mouse moves over them.
  - Back-to-top button is a laconic animated pill in the center of the bottom copyright bar.
