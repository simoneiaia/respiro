\#\# implementation-plan.md

\# CORE-OM Digital Tracker

\#\# Build sequence

\#\#\# Phase 0 — Foundation  
\- Define MVP boundary in one page  
\- Lock non-goals  
\- Confirm scoring display rule  
  \- show \*\*mean score 0–4\*\*  
  \- show \*\*clinical score 0–40\*\*  
\- Create separate \*\*Scoring & Instrument Logic Spec\*\*  
\- Confirm legal/copyright note for official questionnaire text

\#\#\# Phase 1 — Product structure  
\- Create page map  
\- Define primary user journey  
\- Define empty states  
\- Define error states  
\- Define success states  
\- Write disclaimer copy  
\- Write results copy in non-clinical tone

\#\#\# Phase 2 — Data design  
\- Create \`profiles\` table  
\- Create \`assessments\` table  
\- Create \`assessment\_answers\` table  
\- Create \`questionnaire\_items\` table  
\- Define foreign keys  
\- Define row-level access rules  
\- Seed questionnaire metadata  
  \- item number  
  \- domain  
  \- reverse-scored flag  
  \- risk flag

\#\#\# Phase 3 — Auth and account basics  
\- Add signup  
\- Add login  
\- Add logout  
\- Add protected routes  
\- Ensure each user sees only own data  
\- Add lightweight account page

\#\#\# Phase 4 — Questionnaire experience  
\- Build disclaimer screen  
\- Build questionnaire intro  
\- Show 34 items  
\- Keep answer pattern identical on every item  
\- Save selected value 0–4  
\- Show progress clearly  
\- Prevent confusing navigation  
\- Validate completion threshold  
\- Store timestamp on submit

\#\#\# Phase 5 — Scoring engine  
\- Implement raw answer capture  
\- Implement reverse scoring logic  
\- Implement domain scoring  
\- Implement total mean score  
\- Implement clinical score ×10  
\- Implement missing-item rule  
  \- total score only if at least 31 items answered  
\- Mark incomplete submissions clearly  
\- Add automated scoring tests  
\- Add fixed test cases with expected outputs

\#\#\# Phase 6 — Results and history  
\- Build latest results page  
\- Show both score formats side by side  
\- Show domain breakdown  
\- Show short explanatory note  
\- Build history list  
\- Build session detail view  
\- Build trend chart over time  
\- Add filters or sorting only if still simple

\#\#\# Phase 7 — Reporting  
\- Generate clean session summary  
\- Add export as text or PDF  
\- Include disclaimer in exported report  
\- Keep wording non-diagnostic  
\- Show compilation date clearly  
\- Show score labels clearly

\#\#\# Phase 8 — Quality and safety pass  
\- Review every label for clarity  
\- Review every result message for tone  
\- Check accessibility basics  
\- Check mobile layout  
\- Check loading and empty states  
\- Test risky edge cases  
  \- 0 answers  
  \- 31 answers  
  \- reverse-scored items  
  \- repeated sessions  
\- Verify no user can access another user’s data

\#\#\# Phase 9 — Demo polish  
\- Add landing page  
\- Add product overview section  
\- Add portfolio-ready screenshots  
\- Add seeded demo account only if safe  
\- Add README for showcase context

\#\# Timeline with checkpoints

\#\#\# Week 1 — Scope and logic  
\- Finalize PRD  
\- Finalize scoring spec  
\- Finalize data model  
\- Finalize page flow

\*\*Checkpoint\*\*  
\- product scope frozen  
\- scoring rules frozen  
\- no ambiguity on score labels

\#\#\# Week 2 — Backend skeleton  
\- Set up project  
\- Set up database  
\- Set up auth  
\- Seed questionnaire metadata  
\- Add access controls

\*\*Checkpoint\*\*  
\- users can sign up  
\- users can log in  
\- base schema works

\#\#\# Week 3 — Questionnaire and scoring  
\- Build questionnaire UI  
\- Save answers  
\- Calculate scores  
\- Run scoring tests  
\- Handle missing values correctly

\*\*Checkpoint\*\*  
\- one full submission works  
\- results are accurate  
\- tests pass

\#\#\# Week 4 — Results, history, charts  
\- Build dashboard  
\- Build history  
\- Build trend chart  
\- Build session detail  
\- Add explanatory microcopy

\*\*Checkpoint\*\*  
\- users can view last result  
\- users can review previous sessions  
\- trend is readable

\#\#\# Week 5 — Reporting and hardening  
\- Add export  
\- Add edge-case handling  
\- Improve accessibility  
\- Improve mobile UX  
\- Polish portfolio presentation

\*\*Checkpoint\*\*  
\- MVP demo-ready  
\- no known scoring defects  
\- tone and safety copy reviewed

\#\# Team roles  
For a solo build, one person can wear all roles. Keep the hats separate.

\#\#\# Product lead  
\- protects scope  
\- keeps non-goals intact  
\- reviews clarity of flows

\#\#\# UX/content lead  
\- writes disclaimer  
\- writes result explanations  
\- removes confusing wording  
\- keeps tone calm and respectful

\#\#\# App builder  
\- implements pages  
\- wires auth and database  
\- ships dashboard and reporting

\#\#\# QA owner  
\- tests scoring edge cases  
\- checks missing-value logic  
\- verifies privacy and access rules

\#\# Recommended rituals  
\- \*\*2 short check-ins per week\*\*  
  \- what changed  
  \- what is blocked  
  \- what needs simplification  
\- \*\*1 usability test every 2 weeks\*\*  
  \- 3 users  
  \- 30 minutes  
  \- watch where they hesitate  
\- \*\*1 scoring verification pass per release\*\*  
  \- compare expected and actual values  
\- \*\*1 copy review per release\*\*  
  \- remove medical tone  
  \- remove jargon  
  \- clarify labels

\#\# Delivery checklist

\#\#\# Must be true before MVP launch  
\- questionnaire uses official structure  
\- all 34 items render correctly  
\- all answers save correctly  
\- reverse scoring works  
\- missing-value rule works  
\- both score formats display correctly  
\- domain scores are correct  
\- trend chart uses real saved data  
\- exports include disclaimer  
\- user sees only own data

\#\#\# Must be visible in the UI  
\- this is self-report  
\- this is not a diagnosis  
\- results reflect the last 7 days  
\- score labels explain 0–4 and 0–40 clearly

\#\# Optional integrations  
Keep these out unless the core flow is already solid.

\- email reminders  
\- PDF export service  
\- analytics for completion and return rate  
\- consent-based sharing link  
\- multilingual content layer

\#\# Stretch goals  
\- personal reflection note after each assessment  
\- richer domain explanations  
\- milestone markers on charts  
\- compare latest session vs previous session  
\- “how to read this result” helper panel

\#\# Implementation guardrails  
\- prefer simple architecture over flexibility  
\- store raw answers and computed scores  
\- never hide scoring rules in UI text only  
\- separate instrument logic from presentation logic  
\- avoid feature creep toward therapy or diagnosis  
\- when unsure, choose the clearest flow, not the cleverest one

\#\# Definition of done for MVP  
The MVP is done when a user can:

\- create an account  
\- accept the disclaimer  
\- complete the CORE-OM digitally  
\- receive accurate scores in both formats  
\- review past submissions  
\- see a trend over time  
\- export a simple, non-clinical summary

