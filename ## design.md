\#\# design-guidelines.md

\# CORE-OM Digital Tracker

\#\# Emotional tone  
\*\*Feels like a calm private studio for self-reflection—minimal, warm, steady, and quietly supportive.\*\*

This product should never feel clinical, noisy, or judgmental. It should feel respectful. The user is doing something personal. The interface should lower tension, not add any.

\#\# Design intent  
The visual system should express four traits:

\- \*\*Calm\*\*  
  \- low visual noise  
  \- generous spacing  
  \- slow, gentle motion  
\- \*\*Clarity\*\*  
  \- obvious hierarchy  
  \- short labels  
  \- one decision at a time  
\- \*\*Trust\*\*  
  \- stable layout  
  \- plain language  
  \- no dark patterns  
\- \*\*Kindness\*\*  
  \- supportive empty states  
  \- forgiving flows  
  \- error copy that guides, never scolds

\#\# Style anchors  
Use these as grounding references:

\- \*\*Apple Human Interface\*\*  
  \- calm confidence  
  \- strong spacing  
  \- soft friendliness  
\- \*\*Linear\*\*  
  \- sharp hierarchy  
  \- focused workflows  
  \- low clutter  
\- \*\*shadcn/ui\*\*  
  \- simple primitives  
  \- predictable patterns  
  \- fast system consistency

Working metaphor:  
\*\*Apple Notes meets a private wellbeing journal.\*\*

\#\# Typography

\#\#\# Type personality  
Use a clean sans-serif for primary UI. It should feel modern, readable, and emotionally neutral.

Suggested direction:  
\- primary UI type: geometric or neo-grotesque sans  
\- optional mono only for technical labels or metadata  
\- avoid decorative or playful type

\#\#\# Typographic hierarchy  
Use a modular scale with strong rhythm. Keep line-height relaxed.

\- \*\*H1\*\*  
  \- 32px  
  \- weight 700  
  \- line-height 1.2  
  \- use for page titles only  
\- \*\*H2\*\*  
  \- 24px  
  \- weight 650  
  \- line-height 1.25  
  \- use for section headers  
\- \*\*H3\*\*  
  \- 20px  
  \- weight 600  
  \- line-height 1.3  
  \- use for cards and sub-sections  
\- \*\*H4\*\*  
  \- 16px  
  \- weight 600  
  \- line-height 1.4  
  \- use for grouped labels  
\- \*\*Body\*\*  
  \- 16px  
  \- weight 400  
  \- line-height 1.6  
  \- default reading text  
\- \*\*Body small\*\*  
  \- 14px  
  \- weight 400  
  \- line-height 1.6  
  \- helper text, disclaimers  
\- \*\*Caption\*\*  
  \- 12px  
  \- weight 500  
  \- line-height 1.5  
  \- timestamps, chart labels, metadata

\#\#\# Typography rules  
\- never use more than 3 font sizes in one card  
\- keep paragraph width readable  
\- prefer sentence case over all caps  
\- use bold sparingly  
\- keep disclaimers readable, not tiny  
\- maintain contrast at \*\*WCAG AA or better\*\*

\#\# Color system

\#\#\# Emotional palette  
The palette should feel muted, warm, and grounded. No harsh clinical blues. No alarming reds as primary accents.

\#\#\# Core colors  
\- \*\*Primary\*\*  
  \- Deep Slate  
  \- \`\#1F2937\`  
  \- \`rgb(31, 41, 55)\`  
  \- use for headings, primary text, anchors  
\- \*\*Secondary\*\*  
  \- Soft Stone  
  \- \`\#6B7280\`  
  \- \`rgb(107, 114, 128)\`  
  \- use for secondary text and quiet labels  
\- \*\*Background\*\*  
  \- Warm Off-White  
  \- \`\#F8F7F4\`  
  \- \`rgb(248, 247, 244)\`  
  \- use for app background  
\- \*\*Surface\*\*  
  \- White  
  \- \`\#FFFFFF\`  
  \- \`rgb(255, 255, 255)\`  
  \- use for cards and panels  
\- \*\*Accent\*\*  
  \- Sage  
  \- \`\#7C9A7E\`  
  \- \`rgb(124, 154, 126)\`  
  \- use for selected states, progress, gentle emphasis  
\- \*\*Accent Soft\*\*  
  \- Mist Sage  
  \- \`\#E7EFE7\`  
  \- \`rgb(231, 239, 231)\`  
  \- use for soft highlights and badges

\#\#\# Semantic colors  
Use semantic colors gently. They should inform, not alarm.

\- \*\*Success\*\*  
  \- \`\#2F6F4F\`  
  \- \`rgb(47, 111, 79)\`  
\- \*\*Info\*\*  
  \- \`\#3B5B7A\`  
  \- \`rgb(59, 91, 122)\`  
\- \*\*Warning\*\*  
  \- \`\#9A6B2F\`  
  \- \`rgb(154, 107, 47)\`  
\- \*\*Error\*\*  
  \- \`\#8A3B3B\`  
  \- \`rgb(138, 59, 59)\`

\#\#\# Color rules  
\- maintain text contrast ratio \*\*≥ 4.5:1\*\*  
\- never use color as the only meaning cue  
\- use red only for true error states  
\- charts should stay subdued and legible  
\- light mode is primary  
\- dark mode, if added later, must preserve calm tone and contrast

\#\# Spacing & layout

\#\#\# Grid system  
Use an \*\*8pt grid\*\* throughout.

\#\#\# Spacing scale  
\- 4px for tight icon spacing only  
\- 8px for compact gaps  
\- 16px for default spacing inside cards  
\- 24px for grouped sections  
\- 32px for large vertical rhythm  
\- 48px for page-level breathing room  
\- 64px for hero or top-level sections

\#\#\# Layout principles  
\- mobile-first  
\- one dominant column for sensitive content  
\- max content width should stay comfortable for reading  
\- avoid dense multi-column questionnaire layouts  
\- separate “reading” zones from “action” zones

\#\#\# Component padding  
\- buttons: 12px vertical, 16px horizontal  
\- input/select/radio group containers: 12px to 16px  
\- cards: 20px to 24px  
\- modal/dialog: 24px minimum

\#\#\# Breakpoints  
\- \*\*Mobile\*\*  
  \- single-column  
  \- sticky progress or footer action only if unobtrusive  
\- \*\*Tablet\*\*  
  \- single-column questionnaire  
  \- optional side summary for results  
\- \*\*Desktop\*\*  
  \- centered layout  
  \- optional secondary panel for history or help text  
  \- keep main action path visually dominant

\#\# Motion & interaction

\#\#\# Motion tone  
Motion should feel \*\*gentle, confident, and quiet\*\*.

It should never feel playful in a way that trivializes the content.

\#\#\# Timing  
\- hover transitions: \*\*150–180ms\*\*  
\- panel changes: \*\*180–240ms\*\*  
\- modals and drawers: \*\*220–280ms\*\*  
\- chart reveal: \*\*200–300ms\*\*

\#\#\# Easing  
\- use soft ease-out for entrances  
\- use standard ease for hover/focus  
\- avoid bouncy motion unless extremely subtle

\#\#\# Interaction guidance  
\- hover should slightly lift or clarify, not shout  
\- selected states should feel calm and certain  
\- transitions between questions should reduce friction  
\- result reveal should feel reassuring, not dramatic

\#\#\# Empty-state behavior  
Empty states should be patient and kind.

Example tone:  
\- “Non hai ancora compilazioni salvate.”  
\- “Quando completi il primo questionario, vedrai qui il tuo andamento nel tempo.”

\#\#\# Error-state behavior  
Errors should guide clearly and gently.

Example tone:  
\- “Controlla le risposte mancanti prima di continuare.”  
\- “Non siamo riusciti a salvare questa sessione. Riprova tra un attimo.”

\#\#\# Success-state behavior  
Success states should acknowledge progress without over-celebration.

Example tone:  
\- “Compilazione salvata.”  
\- “Puoi rivedere questo risultato nello storico.”

\#\# Components

\#\#\# Questionnaire cards  
\- one item at a time or small grouped block  
\- clear item number  
\- stable answer layout  
\- selected state obvious  
\- minimal visual decoration

\#\#\# Progress indicator  
\- simple and calm  
\- numeric progress preferred  
\- avoid gamified treatment

\#\#\# Score cards  
\- show both metrics clearly  
  \- \*\*Media item: 0–4\*\*  
  \- \*\*Clinical score: 0–40\*\*  
\- explain each label in plain language  
\- avoid color-coding that implies diagnosis

\#\#\# Trend chart  
\- simple line chart  
\- clean axis labels  
\- readable dates  
\- no aggressive gradients  
\- annotations only when useful

\#\#\# Disclaimer blocks  
\- visually important  
\- readable body size  
\- quiet but unmistakable emphasis

\#\# Voice & tone

\#\#\# Personality  
The copy should feel:

\- calm  
\- clear  
\- respectful  
\- non-judgmental  
\- quietly professional

\#\#\# Rules for copy  
\- use plain Italian  
\- avoid clinical shorthand  
\- avoid diagnosis-like labels  
\- prefer explanation over interpretation  
\- never sound certain beyond the data  
\- never scold the user

\#\#\# Microcopy examples

\#\#\#\# Onboarding  
“Questo strumento ti permette di compilare il CORE-OM in formato digitale e seguirne l’andamento nel tempo.”

\#\#\#\# Success  
“Risultato salvato correttamente.”

\#\#\#\# Error  
“Per calcolare il punteggio totale servono almeno 31 risposte compilate.”

\#\# System consistency  
Recurring patterns should make the app feel predictable and safe.

\#\#\# Reusable patterns  
\- same answer control in every question  
\- same card shell for results, history, and notes  
\- same spacing rhythm across pages  
\- same placement for primary actions  
\- same disclaimer style across app and exports

\#\#\# Visual metaphors  
\- journal  
\- reflection  
\- private dashboard  
\- personal timeline

Avoid metaphors tied to:  
\- diagnosis  
\- surveillance  
\- grading  
\- performance pressure

\#\# Accessibility

\#\#\# Semantic structure  
\- one H1 per page  
\- H2 for primary sections  
\- proper landmarks  
  \- header  
  \- main  
  \- nav  
  \- footer where relevant

\#\#\# Keyboard support  
\- full keyboard navigation  
\- visible focus ring on all controls  
\- logical tab order  
\- no hidden focus traps

\#\#\# Forms  
\- labels always visible  
\- answer controls grouped semantically  
\- errors tied to the related item  
\- instructions placed near the action

\#\#\# ARIA and assistive support  
\- use ARIA only when native semantics are not enough  
\- ensure progress indicator is screen-reader friendly  
\- charts need text summaries  
\- icons must have accessible labels when meaningful

\#\#\# Comfort and inclusivity  
\- avoid flashing motion  
\- reduce animation if user prefers reduced motion  
\- use plain language  
\- do not rely on emotional intensity to signal importance

\#\# Emotional audit checklist  
Review every major screen with these questions:

\- does this screen feel calm, clear, and kind?  
\- would a user feel supported here?  
\- is anything visually louder than the task itself?  
\- does the copy explain without judging?  
\- does motion reinforce trust instead of drawing attention?  
\- does the result screen inform without sounding clinical?

\#\# Technical QA checklist  
\- typography follows declared scale  
\- spacing follows 8pt rhythm  
\- contrast ratios meet \*\*WCAG AA+\*\*  
\- focus states are visible  
\- hover, active, and disabled states are distinct  
\- motion stays mostly within \*\*150–300ms\*\*  
\- charts remain readable on mobile  
\- disclaimers remain readable on all breakpoints  
\- both score labels are always explicit

\#\# Adaptive system memory  
If future versions of this product or related apps exist, check for tone continuity first.

Reuse candidates:  
\- muted warm neutrals  
\- sage accent  
\- centered single-column reading flow  
\- calm card pattern  
\- respectful microcopy model

Suggested continuity prompt:  
“Would you like to keep the warm neutral palette and quiet journal-like layout for brand continuity?”

\#\# Design Snapshot

\#\#\# Color palette preview  
\`\`\`txt  
Primary        \#1F2937  
Secondary      \#6B7280  
Background     \#F8F7F4  
Surface        \#FFFFFF  
Accent         \#7C9A7E  
Accent Soft    \#E7EFE7  
Success        \#2F6F4F  
Info           \#3B5B7A  
Warning        \#9A6B2F  
Error          \#8A3B3B

