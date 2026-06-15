# Plan — "Update existing note" mode for index.html

## Goal

Add a second workflow to the Clinical Document Generator:

1. **Box A** — paste the *previous review note*.
2. **Box B** — paste the *latest ward round note*.
3. **Generate** — the model returns an updated review note that merges new events from B into A, preserving A's structure. (Exactly the workflow done manually on `45.19.1.docx`: update Timeline, Assessment/Issues, and Suggestions.)

## Why this is low-risk

~80% already exists in `index.html` and can be reused as-is:

- Anthropic API call (browser-direct, key in `localStorage`).
- Prompt-template system (`prompts/index.json` + `prompts/*.txt`) with prompt caching.
- Output box with monospace font + line-number gutter.
- Clipboard copy that writes **both** `text/html` and `text/plain` (lines 660-663).
- Key handling, cancel-in-flight, error display, "Ask about this case".

The new work is: a mode toggle, a second input box, one branch in the Generate handler, and one new prompt file.

## SCM reality (this drives the design)

Sunrise Clinical Manager pastes/edits as **rich text — it behaves like Word**. Bold survives, and because tab stops are consistent (Word-like), the tab-aligned columns (`10/6/26⇥⇥s/p OGD…`) stay aligned. So both requirements — rich formatting **and** strict tab/indent alignment — are achievable end-to-end.

Consequences:

- Use **rich `contenteditable`** input/output boxes (not plain textareas). Keep them **monospace** so the columns line up identically on the page and in SCM.
- The real source of truth round-tripped through the model is **plain text with literal tabs + an inline-bold marker** (see next section) — not full Markdown, for one specific reason.

## The round-trip representation (the key gotcha)

The model only ever sees/returns text, so the boxes must serialise to text and back. The obvious choice — Markdown — **breaks this format**: Markdown treats a line that starts with a tab (or 4 spaces) as a *code block*, and the note's continuation lines begin with tabs (`⇥⇥CT brain: …`). A naive Markdown round-trip would turn the whole timeline into grey code blocks and lose the layout.

Robust scheme instead:

- **Serialise** each box's HTML to plain text that keeps **literal tabs and newlines**, wrapping only bold/`<strong>` runs in `**…**`. (Block elements → newline; everything else verbatim.)
- **Send** that text to the model; instruct it to return the note in the same convention (literal tabs, `**bold**` only for the few bold headers).
- **Render** output by escaping HTML, converting **only** `**…**` → `<strong>`, and leaving all tabs/newlines untouched inside a `white-space: pre-wrap`, monospace `contenteditable`. This deliberately avoids the full Markdown parser (and its leading-tab → code-block rule). Note: `marked.min.js` is already loaded for the "Ask" box but should **not** be used for this output.
- **Copy** writes `text/html` (with `<strong>` + tabs) and `text/plain` (tabs, markers stripped) — the existing dual-clipboard code. Pasting into SCM/Word gives bold + aligned tabs.

## Input boxes

Two **monospace `contenteditable`** boxes (Box A: "Previous review note", Box B: "Latest ward round note"), `white-space: pre-wrap`, with:

- **Tab key inserts a real tab** (`\t`) instead of moving focus.
- A **paste handler** that converts pasted HTML using the serialiser above, so what lands in the box is clean text-with-tabs-and-`**bold**` (no `&nbsp;`, stray `<div>`s, or smart quotes to pollute the model input).

## UI changes

- A small tab switcher near the top: **Generate new** | **Update existing**. Both modes share the API-key card, model tag, error area, output box, and Ask card.
- In *Update existing* mode, show two monospace boxes (Box A: "Previous review note", Box B: "Latest ward round note") with:
  - **Tab key inserts a real tab** instead of moving focus.
  - (Option 2 only) a paste handler that normalises HTML → tabs/newlines/optional `**bold**`.
- Hide the document-type dropdown in update mode (one fixed template). Reuse the existing Generate button and `Ctrl/⌘+Enter`.

## Prompt template — `prompts/update-review-note.txt`

A system prompt instructing the model to:

- Update an existing review note using a new ward round note.
- **Preserve the existing note's exact structure**: section order, headers, the tab/indentation style, bullet conventions, abbreviations.
- Update three areas: **Timeline** (append new dated events), **Assessment/Issues** (revise with new events + impressions), **Suggestions** (microbiology to trace, ongoing antimicrobials, general plans).
- Use **only** data present in the ward round note; do not invent. Carry unchanged sections forward verbatim.
- Output the **full** updated note in the same format, ready to paste back into SCM.

This mirrors the edits made to `45.19.1`. Add an entry to `index.json`, or hardcode the path since update mode uses one fixed template.

## Wiring (Generate handler)

When in update mode, build the user message as:

```
PREVIOUS REVIEW NOTE:
<Box A>

LATEST WARD ROUND NOTE:
<Box B>
```

Load `update-review-note.txt` as the cached system prompt and call the existing API path. Render the result with the **inline-bold-only transform** into a monospace, `white-space: pre-wrap` `contenteditable` output box (not `marked`, not a plain textarea), so tabs stay literal and `**bold**` becomes `<strong>`. The existing dual-clipboard Copy then carries bold + tabs into SCM.

## Alignment guarantee + test

Tab characters survive 1:1 through: textarea paste → API → output box → Copy. Verify by round-tripping the previous `45.19.1` note + the 15/6 ward round note through the new mode and diffing the structure against the manual docx update.

## Effort

Modest — roughly 120-160 lines added to `index.html`: mode toggle, two contenteditable boxes with Tab + paste handlers, an HTML→text serialiser, an inline-bold→HTML renderer, and one branch in the Generate handler. Plus one new prompt file and one `index.json` line. No backend; key/caching/cancel/Ask all reused. The serialiser + renderer (~40-60 lines) are the only genuinely new logic — and they're the part worth testing carefully against the leading-tab case.

## Two things to flag

- **PHI.** Full SCM notes carry identifiers (visit number, care providers, the patient header). Browser-direct calls send that text to the Anthropic API. Your app already shows a de-identify reminder — worth deciding whether sending un-redacted notes is acceptable under your institution's policy, or whether the new boxes should also carry/enforce a de-id step.
- **Model.** Note merging benefits from a stronger model; current `DEFAULT_MODEL` is `claude-sonnet-4-6`. Fine for this; bump to Opus for the update template if fidelity matters.
