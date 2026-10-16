/* ==========================================================================
   Chrome DevTools Learning Center — Lesson 1: Elements
   Content data consumed by devtools-guide.js
   Block types: story, prose, callout, code, steps, panels, table,
                mistakes, figure, notebook, interview, quiz
   ========================================================================== */
window.DEVTOOLS_LESSONS = window.DEVTOOLS_LESSONS || {};

window.DEVTOOLS_LESSONS.elements = {
    short: 'Elements',
    icon: '🧱',
    title: 'Elements — Inspect and Debug the Live Page',
    tooltip: 'DOM tree, Styles, Computed, Box Model, Layout, DOM breakpoints, Accessibility, Properties, Event Listeners',
    badges: ['HTML', 'CSS', 'DOM', 'Accessibility', 'ASP.NET MVC views'],
    tagline: 'The Elements panel shows the <strong>live DOM</strong> the browser built from your Razor view, plus every CSS rule, layout box and event listener attached to it. It is where most UI bugs are first diagnosed.',
    sections: [
        /* ---------------------------------------------------------------- */
        {
            icon: '📸', title: 'Visual Guides & Real-World Labs: Elements Tab (Both Infographics + Step-by-Step Usage)', open: true,
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Visual Guide 1 of 2 · Step-by-Step UI & Spacing Debugging',
                    title: 'Chrome DevTools – Elements Tab: Inspect, Understand and Fix UI Issues Step by Step',
                    src: 'assets/devtools/elements-tab-guide-1.png',
                    alt: 'Chrome DevTools Elements Tab Guide showing ASCWebQI Dashboard Patient Information form where Save button is grey and has 24px margin-top, with 9 numbered sub-panels',
                    caption: 'Visual Guide 1 — Debugging the ASCWebQI Patient Information "Save" button (#saveBtn): finding why it renders grey (#6c757d) with a 24px top gap using DOM Tree, Styles, Computed, Box Model, Layout, Event Listeners, DOM Breakpoints, and Accessibility.',
                    callouts: [
                        { num: '1', title: 'Select the Element (Element Picker)', desc: 'Click the top-left picker icon (<code>Ctrl+Shift+C</code>) and click the <strong>Save</strong> button on the ASCWebQI Patient Information form to jump straight to its live DOM node.' },
                        { num: '2', title: 'DOM Tree (Left Side)', desc: 'Inspects the live HTML structure rendered in the browser: <code>&lt;button class="btn btn-secondary" id="saveBtn"&gt;Save&lt;/button&gt; == $0</code>. You can edit HTML or attributes temporarily.' },
                        { num: '3', title: 'Styles Panel (site.css:124)', desc: 'Shows all CSS rules matching <code>#saveBtn</code>. Reveals that <code>.btn-secondary</code> in <code>site.css:124</code> sets <code>background-color: #6c757d</code> (grey) and <code>margin-top: 24px</code>. Untick checkboxes to test fixes live.' },
                        { num: '4', title: 'Computed Panel (Winning Values)', desc: 'Displays the final resolved CSS values after specificity and cascade: <code>width: 120px</code>, <code>height: 38px</code>, <code>margin-top: 24px</code>, <code>background-color: rgb(108, 117, 125)</code>.' },
                        { num: '5', title: 'Box Model (24px Margin Culprit)', desc: 'Visual diagram of <strong>content</strong> (<code>120 × 38</code>), <strong>padding</strong> (<code>8</code>), <strong>border</strong>, and <strong>margin</strong> (<code>24</code>). Immediately proves <code>margin-top: 24px</code> is creating the extra gap above Save.' },
                        { num: '6', title: 'Layout Panel (Flexbox & Grid)', desc: 'Toggle visual overlays for Flexbox (<code>div.form-group</code>) and CSS Grid containers to inspect dimensions, alignment, gaps, and off-screen overflow.' },
                        { num: '7', title: 'Event Listeners (save.js:45)', desc: 'Lists JavaScript events attached to the element (e.g., <code>click → button#saveBtn → save.js:45</code>). Click the filename link to jump directly to the handler function in Sources.' },
                        { num: '8', title: 'DOM Breakpoints (Break on Mutation)', desc: 'Pause JavaScript automatically on <strong>Subtree modifications</strong>, <strong>Attribute modifications</strong>, or <strong>Node removal</strong> when a script dynamically alters or deletes an element.' },
                        { num: '9', title: 'Accessibility (Screen Reader Tree)', desc: 'Shows how assistive technologies perceive the element: <code>Name: "Save"</code>, <code>Role: button</code>, <code>State: focusable</code>, plus ARIA attributes.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab #1 (From Image 1)',
                    app: 'ASCWebQI Dashboard · Patient Information Form',
                    title: 'Case Study 1: The Save Button (#saveBtn) is Grey Instead of Blue and Has Too Much Space Above It',
                    symptom: 'On the <strong>ASCWebQI Patient Information</strong> screen (Patient Name: <em>John Doe</em>, Date of Birth), the <strong>Save</strong> button is grey instead of primary blue and sits <code>24px</code> too low below the Date of Birth field.',
                    evidence: 'Selecting <code>#saveBtn</code> (<code>== $0</code>) in <strong>Elements → Styles</strong> shows <code>.btn-secondary</code> at <code>site.css:124</code> applying <code>background-color: #6c757d</code> and <code>margin-top: 24px</code>. <strong>Computed &amp; Box Model</strong> confirm <code>margin-top: 24px</code>.',
                    cause: 'The Razor view rendered <code>class="btn btn-secondary"</code> instead of <code>btn-primary</code>, and <code>.btn-secondary</code> in <code>site.css:124</code> included an hardcoded <code>margin-top: 24px</code>.',
                    fix: 'Uncheck <code>margin-top: 24px</code> and change the class in DevTools to verify the UI immediately, then update <code>PatientForm.cshtml</code> to use <code>btn-primary</code> and remove the stray <code>margin-top: 24px</code> in <code>site.css:124</code>.'
                },
                {
                    type: 'infographic',
                    badge: 'Visual Guide 2 of 2 · CSS States, Flexbox Overlays & Dead-Click Debugging',
                    title: 'Chrome DevTools – Elements Tab: CSS, Layout & Interaction Debugging',
                    src: 'assets/devtools/elements-tab-guide-2.png',
                    alt: 'Chrome DevTools Elements Tab Guide 2 showing disabled Save button debugging with Styles, Computed, Layout Flexbox overlay, Box Model, :hov state toggle, Event Listeners, Properties, and Accessibility',
                    caption: 'Visual Guide 2 — Deep-dive into why <button id="btnSave" class="btn btn-primary" disabled> looks faded, has wrong spacing, and ignores clicks: inspecting .btn:disabled (site.css:102), :hov pseudo-states, Flexbox gap overlays, Event Listeners (savePatient at app.js:145), and live DOM Properties.',
                    callouts: [
                        { num: '1', title: 'Styles — Inspect & Edit .btn:disabled (site.css:102)', desc: 'Shows <code>.btn:disabled</code> at <code>site.css:102</code> applying <code>background-color: #6c757d; opacity: 0.65; cursor: not-allowed;</code>, overriding <code>.btn-primary</code> (<code>#0d6efd</code> at <code>site.css:60</code>).' },
                        { num: '2', title: 'Computed — Final Resolved CSS Values', desc: 'Filter and inspect exact rendered values: <code>color: rgb(255, 255, 255)</code>, <code>background-color: rgb(108, 117, 125)</code>, <code>cursor: not-allowed</code>, <code>width: 120px</code>, <code>height: 36px</code>, <code>margin-top: 16px</code>.' },
                        { num: '3', title: 'Layout — Flexbox & Grid Visual Overlays', desc: 'Tick <code>div.form-actions</code> under Flexbox with <strong>Show flex gap</strong>, <strong>Show alignment</strong>, and <strong>Show container borders</strong> to visualize button spacing and alignment on the live page.' },
                        { num: '4', title: 'Box Model — Interactive Spacing Editor', desc: 'Shows <code>120 × 36</code> content, <code>8px</code> padding, <code>1px</code> border, and <code>16px</code> margin. Double-click any number in the Box Model to tweak spacing live.' },
                        { num: '5', title: 'Hover & Focus (:hov) — Force UI States', desc: 'Click <strong>:hov</strong> to force <code>:hover</code>, <code>:focus</code>, <code>:focus-visible</code>, or <code>:active</code> states without holding the mouse or tabbing — essential for styling focus rings and hover transitions.' },
                        { num: '6', title: 'Event Listeners — Why Click Does Nothing', desc: 'Expand <code>click → button#btnSave.btn.btn-primary</code> to verify <code>handler: function savePatient()</code> is attached at <code>app.js:145</code>. Because the button has <code>disabled</code>, the browser suppresses click events!' },
                        { num: '7', title: 'Properties — Live JavaScript DOM Object', desc: 'Inspect the live <code>button#btnSave</code> object: <code>tagName: "BUTTON"</code>, <code>id: "btnSave"</code>, <code>className: "btn btn-primary"</code>, <code>disabled: true</code>, <code>value: ""</code>, <code>textContent: "Save"</code>.' },
                        { num: '8', title: 'Accessibility — Inclusive Design Verification', desc: 'Inspect the <strong>Accessibility Tree</strong> (<code>button "Save" · role: button · name: "Save"</code>) and <strong>ARIA Attributes</strong> to ensure keyboard and screen-reader users can operate the form.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab #2 (From Image 2)',
                    app: 'ASCWebQI · Patient Information Form (with Department & Notes)',
                    title: 'Case Study 2: Save Button (#btnSave) Looks Faded, Spacing Is Off, and Clicking Does Nothing',
                    symptom: 'On the Patient Information form, the <strong>Save</strong> button looks washed-out grey (<code>opacity: 0.65</code>, <code>cursor: not-allowed</code>), has a <code>16px</code> margin around it, and clicking it never triggers <code>savePatient()</code>.',
                    evidence: 'In <strong>Elements</strong>, the DOM node is <code>&lt;button id="btnSave" class="btn btn-primary" disabled&gt;Save&lt;/button&gt;</code>. <strong>Properties</strong> shows <code>disabled: true</code>. <strong>Styles</strong> shows <code>.btn:disabled</code> (<code>site.css:102</code>) overriding <code>.btn-primary</code> (<code>site.css:60</code>). <strong>Event Listeners</strong> confirms <code>savePatient()</code> is bound at <code>app.js:145</code>.',
                    cause: 'Form validation script set the <code>disabled</code> attribute on <code>#btnSave</code> at initial load and only listened to <code>change</code> (on blur) instead of <code>input</code>, leaving the button disabled while the user typed.',
                    fix: 'Right-click <code>disabled</code> in the DOM tree and delete it (or run <code>$0.disabled = false</code>) to prove <code>savePatient()</code> works, then update <code>app.js</code> to listen to the <code>input</code> event on required fields and use <code>gap: 12px</code> on <code>div.form-actions</code>.'
                },
                { type: 'code', lang: 'javascript', label: 'Practical Fix for Both Elements Tab Real-World Scenarios (site.css + app.js)', code: `
/* 1. site.css — Clean button styling & Flexbox action bar spacing */
.form-actions {
    display: flex;
    align-items: center;
    gap: 12px;              /* Use flex gap instead of uneven margin-top: 24px */
    margin-top: 16px;
}
.btn-primary {
    background-color: #0d6efd;
    border: 1px solid #0d6efd;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
}
.btn:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
    opacity: 0.65;
    cursor: not-allowed;
}

// 2. app.js — Enable #btnSave dynamically on 'input' so it never stays stuck disabled
const form = document.querySelector('.patient-form');
const btnSave = document.getElementById('btnSave');

form.addEventListener('input', () => {
    const nameValid = document.getElementById('patientName').value.trim().length > 0;
    const dobValid  = document.getElementById('dob').value.trim().length > 0;
    btnSave.disabled = !(nameValid && dobValid);
});

btnSave.addEventListener('click', function savePatient() {
    // Handler at app.js:145 now fires reliably!
    submitPatientData();
});` }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '📖', title: 'Real-world story: the Save button that does nothing', open: false,
            blocks: [
                { type: 'story', paras: [
                    'Priya is a .NET developer on <strong>ASCWebQI</strong>, an ASP.NET MVC quality-indicator dashboard with a left sidebar, a main content area, a Kendo UI grid, and a <strong>Save</strong> button.',
                    'After a release, QA raises a ticket: <em>"The Save button is grey instead of blue, there is a big gap above it, and clicking it does nothing."</em>',
                    'The Razor view (<code>Dashboard.cshtml</code>) looks correct, and the controller action has unit tests that pass. Priya opens Chrome DevTools to see what the <strong>browser</strong> actually received and is running — because the browser does not run Razor; it runs the HTML, CSS and JavaScript that Razor produced.'
                ] },
                { type: 'callout', kind: 'info', title: 'What you will learn in this lesson', html:
                    '<ul><li>How to read the DOM tree and select elements.</li><li>How Styles, Computed, Box Model and Layout explain what you see.</li><li>How DOM breakpoints, Properties, Accessibility and Event Listeners explain what the element <em>does</em>.</li><li>A complete investigation that moves from Elements → Sources → Network → real source-code fix.</li></ul>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🧭', title: 'What is the Elements tab and where to click',
            blocks: [
                { type: 'prose', html:
                    '<p>The Elements tab is a <strong>live inspector</strong> for the page. The left side shows the DOM tree. The right side shows panels that describe the selected element: its styles, final computed values, layout, accessibility information, JavaScript properties and event listeners.</p>' +
                    '<h3>Ways to open it</h3>' +
                    '<ul><li>Right-click any element on the page → <strong>Inspect</strong> (opens Elements with that element selected).</li>' +
                    '<li><code>F12</code> or <code>Ctrl+Shift+I</code> (Windows/Linux), <code>Cmd+Option+I</code> (macOS), then click the <strong>Elements</strong> tab.</li>' +
                    '<li><code>Ctrl+Shift+C</code> / <code>Cmd+Shift+C</code> opens DevTools directly in element-picker mode.</li>' +
                    '<li>Chrome menu ⋮ → <strong>More tools</strong> → <strong>Developer tools</strong>.</li></ul>' },
                { type: 'callout', kind: 'tip', title: 'Dock position', html: '<p>Use ⋮ (inside DevTools) → <strong>Dock side</strong> to place DevTools at the bottom, right, left, or in a separate window. Right-docked works well for dashboards; bottom-docked works well for wide tables.</p>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🌳', title: 'A. Understanding the Elements screen (DOM tree)',
            blocks: [
                { type: 'figure', alt: 'Diagram of the Elements panel: DOM tree on the left with the Save button selected, and tabs Styles, Computed, Layout, Event Listeners, DOM Breakpoints, Properties and Accessibility on the right.',
                  caption: 'Figure 1 — Elements panel layout: the DOM tree (left) and inspection panels for the selected node (right). Chrome versions differ slightly in tab order.',
                  html:
                    '<div class="dt-mock"><div class="dt-mock-bar"><span class="on">Elements</span><span>Console</span><span>Sources</span><span>Network</span><span>…</span></div>' +
                    '<div class="dt-mock-split"><div class="dom-tree-visual" style="min-width:0;display:block;">' +
                    '<div>▼ <span class="dom-el">&lt;body</span> <span class="dom-attr">class</span>=<span class="dom-val">"ascwebqi"</span><span class="dom-el">&gt;</span></div>' +
                    '<div style="padding-left:1rem">▶ <span class="dom-el">&lt;aside</span> <span class="dom-attr">class</span>=<span class="dom-val">"sidebar"</span><span class="dom-el">&gt;</span>…</div>' +
                    '<div style="padding-left:1rem">▼ <span class="dom-el">&lt;main</span> <span class="dom-attr">class</span>=<span class="dom-val">"content"</span><span class="dom-el">&gt;</span></div>' +
                    '<div style="padding-left:2rem">▶ <span class="dom-el">&lt;div</span> <span class="dom-attr">id</span>=<span class="dom-val">"qiGrid"</span> <span class="dom-attr">class</span>=<span class="dom-val">"k-grid"</span><span class="dom-el">&gt;</span>…</div>' +
                    '<div style="padding-left:2rem" class="dom-selected"><span class="dom-el">&lt;button</span> <span class="dom-attr">id</span>=<span class="dom-val">"btnSave"</span> <span class="dom-attr">class</span>=<span class="dom-val">"btn btn-save"</span><span class="dom-el">&gt;</span>Save<span class="dom-el">&lt;/button&gt;</span> == $0</div>' +
                    '<div style="padding-left:1rem"><span class="dom-el">&lt;/main&gt;</span></div></div>' +
                    '<div class="dt-mock-side"><div class="dt-mock-tabs"><span class="on">Styles</span><span>Computed</span><span>Layout</span><span>Event Listeners</span><span>DOM Breakpoints</span><span>Properties</span><span>Accessibility</span></div>' +
                    '<div class="dt-mock-rule"><b>.btn-save</b> { <s>background: #2563eb;</s> }</div><div class="dt-mock-rule"><b>.btn[disabled]</b> { background: #9ca3af; }</div></div></div>' +
                    '<div class="dt-mock-crumbs">html › body.ascwebqi › main.content › button#btnSave.btn.btn-save</div></div>' },
                { type: 'prose', html:
                    '<h3>HTML versus the DOM</h3>' +
                    '<p><strong>HTML</strong> is the text the server sends (for ASCWebQI, the output of <code>Dashboard.cshtml</code>). The <strong>DOM</strong> (Document Object Model) is the in-memory tree of objects the browser builds from that text. JavaScript, jQuery and Kendo UI then <em>change</em> the DOM — adding grid rows, toggling classes, removing nodes.</p>' +
                    '<p>So <strong>Elements shows the DOM, not the original HTML</strong>. To see the raw server response, use <em>View Page Source</em> (<code>Ctrl+U</code>) or the Network tab → document request → Response.</p>' +
                    '<h3>How the browser constructs and modifies the DOM</h3>' +
                    '<ol><li>Browser receives HTML bytes from IIS / Kestrel.</li><li>The parser tokenizes them and builds DOM nodes. It also <em>fixes</em> invalid markup (for example, it inserts a missing <code>&lt;tbody&gt;</code>).</li><li>CSS is parsed into the CSSOM; DOM + CSSOM produce the render tree, then layout and paint.</li><li>Scripts run and mutate the DOM. A Kendo grid replaces a single <code>&lt;div id="qiGrid"&gt;</code> with dozens of nested elements.</li></ol>' +
                    '<h3>Working in the DOM tree</h3>' +
                    '<ul><li><strong>Expand / collapse:</strong> click the ▶ triangle. <code>Alt</code>+click (Option+click) expands all descendants. Arrow keys move through nodes; → expands, ← collapses.</li>' +
                    '<li><strong>Element picker:</strong> click the arrow-in-box icon (top-left of DevTools) or press <code>Ctrl+Shift+C</code>, then hover and click an element on the page.</li>' +
                    '<li><strong>Search the DOM:</strong> with the tree focused, press <code>Ctrl+F</code> (Cmd+F). You can search by text (<code>Save</code>), CSS selector (<code>#btnSave</code>, <code>.k-grid tr</code>) or XPath (<code>//button[@id="btnSave"]</code>).</li>' +
                    '<li><strong>Parents and children:</strong> the breadcrumb bar at the bottom shows the path from <code>html</code> to the selected node; click any crumb to jump to that ancestor.</li>' +
                    '<li><strong>Edit temporarily:</strong> double-click a tag name, attribute or text to edit it; right-click → <strong>Edit as HTML</strong> for larger changes; right-click → <strong>Add attribute</strong>; press <code>Delete</code> to remove a node; <code>H</code> hides it (toggles <code>visibility:hidden</code>).</li>' +
                    '<li><strong>$0:</strong> the currently selected element is available in the Console as <code>$0</code> (previous selections are <code>$1</code>…<code>$4</code>).</li></ul>' },
                { type: 'callout', kind: 'warn', title: 'Why DevTools edits disappear on reload', html: '<p>Edits change the browser\'s in-memory DOM only. Reloading asks the server for fresh HTML, which rebuilds the DOM from scratch. The real fix always belongs in your source: the <code>.cshtml</code> view, the <code>.css</code>/<code>.scss</code> file, or the JavaScript bundle source. (Sources → <strong>Workspaces</strong> or <strong>Overrides</strong> can persist edits locally, but that is still not a deployed fix.)</p>' },
                { type: 'code', lang: 'cshtml', label: 'Views/Dashboard/Index.cshtml (simplified ASCWebQI)', code: `
@model DashboardViewModel
<aside class="sidebar">
    <partial name="_QiMenu" />
</aside>
<main class="content">
    <h1>Quality Indicators</h1>
    <div id="qiGrid"></div>              @* Kendo turns this into a full grid *@
    <div class="actions">
        <button id="btnSave" class="btn btn-save" type="button">Save</button>
    </div>
</main>` },
                { type: 'code', lang: 'html', label: 'What Elements shows after Kendo initialises (DOM, not source)', code: `
<div id="qiGrid" class="k-grid k-widget" data-role="grid">
  <div class="k-grid-header">...</div>
  <div class="k-grid-content">
    <table role="grid"><tbody><tr data-uid="a1b2">...</tr></tbody></table>
  </div>
</div>` }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🎨', title: 'B. Styles panel — why is the Save button grey?',
            blocks: [
                { type: 'prose', html:
                    '<p>The Styles pane lists every CSS rule that matches the selected element, <strong>most specific first</strong>.</p>' +
                    '<ul><li><strong>Selector and declarations:</strong> <code>.btn-save { background-color: #2563eb; }</code> — <code>.btn-save</code> is the selector; <code>background-color: #2563eb</code> is a declaration (property + value).</li>' +
                    '<li><strong>element.style</strong> at the top shows inline styles (<code>style="…"</code>) and is where quick experiments go.</li>' +
                    '<li><strong>Matched CSS rules</strong> follow, each with a link such as <code>site.css:42</code> on the right — the file name and line number.</li>' +
                    '<li><strong>Inherited from …</strong> sections show properties inherited from ancestors (for example <code>color</code> and <code>font-family</code> from <code>body</code>). Non-inheritable properties like <code>margin</code> are not listed there.</li>' +
                    '<li><strong>Crossed-out properties</strong> were overridden by a higher-priority rule. A yellow ⚠ triangle means the value is invalid or the property is unknown.</li>' +
                    '<li><strong>Disable a declaration:</strong> hover it and untick the checkbox. Click a value to edit it; use ↑/↓ to nudge numbers.</li>' +
                    '<li><strong>Add a temporary rule:</strong> click <strong>+</strong> (New Style Rule); DevTools creates a rule for the selected element in <code>inspector-stylesheet</code>.</li>' +
                    '<li><strong>:hov</strong> forces states — <code>:hover</code>, <code>:focus</code>, <code>:focus-visible</code>, <code>:active</code>, <code>:visited</code> — so you can style hover effects without holding the mouse.</li>' +
                    '<li><strong>.cls</strong> lists the element\'s classes with checkboxes; you can toggle or add classes (for example, add <code>disabled</code> to test the disabled look).</li></ul>' +
                    '<h3>Bundles, minified CSS and source maps</h3>' +
                    '<p>In production ASCWebQI serves <code>site.min.css</code> or a bundle such as <code>bundle.abc123.css</code>. The link may show <code>bundle.abc123.css:1</code> — every rule is on line 1. Click <strong>{ }</strong> (Pretty print) in Sources to read it. If the build emitted <strong>source maps</strong> (<code>/*# sourceMappingURL=site.css.map */</code>), Chrome shows the original file, e.g. <code>_buttons.scss:18</code>. Without a source map, search your repository for a distinctive selector such as <code>.btn-save</code>.</p>' },
                { type: 'code', lang: 'css', label: 'wwwroot/css/site.css — the bug', code: `
/* line 42 */
.btn-save {
    background-color: #2563eb;   /* blue — crossed out in DevTools */
    color: #fff;
}

/* line 118 — added later for the read-only mode */
.actions .btn[disabled],
.actions .btn {                  /* BUG: selector too broad */
    background-color: #9ca3af;   /* grey — this one wins */
}` },
                { type: 'steps', items: [
                    'Right-click Save → <strong>Inspect</strong>. Confirm <code>&lt;button id="btnSave"&gt;</code> is selected (shown as <code>== $0</code>).',
                    'In Styles, find <code>background-color</code>. The <code>.btn-save</code> value <code>#2563eb</code> is <strong>crossed out</strong>.',
                    'Look above it: <code>.actions .btn</code> at <code>site.css:118</code> sets <code>#9ca3af</code>. It wins because <code>.actions .btn</code> (two classes) is more specific than <code>.btn-save</code> (one class).',
                    'Untick the grey declaration — the button turns blue. You have proven the cause.',
                    'Use <strong>:hov</strong> → tick <code>:hover</code> to check the hover colour, and <strong>.cls</strong> to toggle <code>btn-save</code> to confirm the class is applied.',
                    'Click <code>site.css:118</code> to open the rule in Sources, then fix it in your repository (narrow the selector to <code>.actions .btn[disabled]</code>).'
                ] },
                { type: 'callout', kind: 'tip', title: 'Color picker and contrast', html: '<p>Click the small colour swatch next to a colour value to open the picker. It shows the <strong>contrast ratio</strong> against the background with AA/AAA indicators — useful when the "fix" is blue text on blue.</p>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🧮', title: 'C. Computed panel — the final answer',
            blocks: [
                { type: 'prose', html:
                    '<p>Styles shows <em>all candidates</em>; <strong>Computed shows the winner</strong> — the final value the browser uses for each property after the cascade, inheritance and unit conversion (for example <code>1.5rem</code> becomes <code>24px</code>, <code>blue</code> becomes <code>rgb(0, 0, 255)</code>).</p>' +
                    '<h3>Why several rules target one element</h3><p>An element can match a framework rule (Bootstrap <code>.btn</code>), a component rule (<code>.btn-save</code>), a layout rule (<code>.actions .btn</code>) and an inline style. The browser must pick one value per property using the <strong>cascade</strong>:</p>' +
                    '<ol><li><strong>Origin and importance</strong> — <code>!important</code> declarations beat normal ones (and browser defaults lose to author styles).</li>' +
                    '<li><strong>Cascade layers</strong> (<code>@layer</code>) if used.</li>' +
                    '<li><strong>Specificity</strong> — counted as (ID, class/attribute/pseudo-class, element). <code>#btnSave</code> = (1,0,0); <code>.actions .btn</code> = (0,2,0); <code>button.btn-save</code> = (0,1,1). Inline <code>style</code> beats all selectors.</li>' +
                    '<li><strong>Source order</strong> — if still tied, the rule that appears later wins.</li></ol>' +
                    '<h3>Using Computed</h3><ul><li>Type in the <strong>Filter</strong> box: <code>width</code>, <code>margin</code>, <code>display</code>, <code>position</code>, <code>color</code>.</li><li>Tick <strong>Show all</strong> to include properties still at their default value; tick <strong>Group</strong> to group by category.</li>' +
                    '<li>Expand a property (▶) to see every declaration that contributed, with the winner first and losers crossed out, each linked to its file and line. Click the arrow icon to jump to that rule in Styles.</li></ul>' },
                { type: 'code', lang: 'css', label: 'Conflicting rules — which width wins?', code: `
button        { width: auto; }          /* (0,0,1) */
.btn          { width: 120px; }         /* (0,1,0) */
.actions .btn { width: 100%; }          /* (0,2,0)  wins on specificity */
#btnSave      { width: 160px; }         /* (1,0,0)  ...actually wins: ID beats classes */
.btn-save     { width: 200px !important; } /* important beats everything above */` },
                { type: 'callout', kind: 'info', title: 'Answer', html: '<p>Computed shows <code>width: 200px</code>. Expanding <code>width</code> lists <code>.btn-save</code> (with <code>!important</code>) first and the other four crossed out. Fixing this properly means removing the <code>!important</code> and choosing one clear selector — not adding a stronger one.</p>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '📦', title: 'D. Box Model — why is there a big gap above Save?',
            blocks: [
                { type: 'figure', alt: 'Nested box model diagram: margin outermost, then border, then padding, then content area showing 96 by 36 pixels.',
                  caption: 'Figure 2 — The CSS box model as shown at the bottom of the Computed pane (illustration). Hovering each layer in DevTools highlights it on the page.',
                  html: '<div class="box-model-diagram"><div class="bm-outer"><span class="bm-label">margin 48 / 0 / 0 / 0</span><div class="bm-border-box"><span class="bm-label">border 1</span><div class="bm-padding-box"><span class="bm-label">padding 8 / 16</span><div class="bm-content-box">content 96 × 36</div></div></div></div></div>' },
                { type: 'table', head: ['Layer', 'What it is', 'Background colour shows?', 'Typical bug'], rows: [
                    ['<strong>Content</strong>', 'The text/image area, sized by <code>width</code>/<code>height</code>', 'Yes', 'Text overflows a fixed width'],
                    ['<strong>Padding</strong>', 'Space <em>inside</em> the border', 'Yes', 'Button looks too fat'],
                    ['<strong>Border</strong>', 'The line around padding', 'Border colour', 'Layout shifts 1–2px when a border appears on focus'],
                    ['<strong>Margin</strong>', 'Space <em>outside</em> the border, between elements', 'No (transparent)', 'Unexpected gap; vertical margins can collapse together']
                ] },
                { type: 'prose', html: '<p><code>box-sizing: border-box</code> (used by Bootstrap) makes <code>width</code> include padding and border; the default <code>content-box</code> adds them on top. Check <code>box-sizing</code> in Computed when widths do not add up.</p>' },
                { type: 'steps', items: [
                    'Select the Save button and open <strong>Computed</strong>. Scroll to the box model diagram at the top.',
                    'Hover the orange <strong>margin</strong> area — the page highlights a 48px orange band above the button.',
                    'Double-click the top margin value in the diagram and type <code>8</code>. The gap shrinks instantly (temporary).',
                    'If the gap remains, select the <strong>parent</strong> <code>.actions</code> via the breadcrumb and check its <code>padding-top</code>, and the previous sibling (<code>#qiGrid</code>) for <code>margin-bottom</code>.',
                    'Expand <code>margin-top</code> in Computed to find the rule (e.g. Bootstrap utility <code>.mt-5</code> in the Razor markup) and fix it at source.'
                ] },
                { type: 'code', lang: 'css', label: 'Testing a fix', code: `
/* Found: .actions .btn { margin-top: 3rem; }  (48px) */
.actions { padding-top: 0.5rem; }
.actions .btn { margin-top: 0; }   /* tested live in DevTools first */` }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '📐', title: 'E. Layout panel — Flexbox and Grid',
            blocks: [
                { type: 'prose', html:
                    '<p>Open the <strong>Layout</strong> tab (next to Styles/Computed). It lists every <strong>Grid</strong> and <strong>Flexbox</strong> container on the page with checkboxes to draw overlays.</p>' +
                    '<ul><li><strong>Flexbox</strong> lays items in one direction (row or column). Key properties: <code>flex-direction</code>, <code>justify-content</code> (main axis), <code>align-items</code> (cross axis), <code>gap</code>, and on items <code>flex: grow shrink basis</code>.</li>' +
                    '<li><strong>CSS Grid</strong> lays items in rows <em>and</em> columns: <code>grid-template-columns</code>, <code>grid-template-rows</code>, <code>gap</code>, <code>grid-area</code>.</li>' +
                    '<li><strong>Grid overlay options:</strong> show track sizes, line numbers or names, area names, and extend grid lines.</li>' +
                    '<li>In the DOM tree, containers show small <code>grid</code> / <code>flex</code> badges — click one to toggle its overlay.</li>' +
                    '<li>In Styles, next to <code>display: flex</code> there is a <strong>Flexbox editor</strong> icon to try <code>justify-content</code> and <code>align-items</code> values visually.</li></ul>' },
                { type: 'figure', alt: 'Grid overlay illustration: a 260 pixel sidebar column and a 1fr content column, with the content overflowing past the right viewport edge because its minimum width is too large.',
                  caption: 'Figure 3 — Grid overlay (illustration): the 1fr column cannot shrink below the grid\'s min-content width, so content is pushed off-screen.',
                  html: '<div class="dt-grid-demo"><div class="dt-grid-cell side">sidebar<br><small>260px</small></div><div class="dt-grid-cell main">main.content <small>1fr → min-content 1400px</small><div class="dt-grid-overflow">overflow →</div></div></div>' },
                { type: 'code', lang: 'css', label: 'Sidebar pushes main content off-screen', code: `
.layout {
    display: grid;
    grid-template-columns: 260px 1fr;
}
/* The Kendo grid inside main has a 1400px wide table.
   A 1fr track has min-width:auto, so it grows to fit the table
   and the page scrolls sideways. */

/* Fix: allow the column to shrink and let the grid scroll itself */
.layout { grid-template-columns: 260px minmax(0, 1fr); }
.content { min-width: 0; }
.k-grid-content { overflow-x: auto; }` },
                { type: 'steps', items: [
                    'Select <code>.layout</code> and click its <code>grid</code> badge to show the overlay with track sizes.',
                    'Observe the second track reads ~1400px, wider than the viewport.',
                    'In Computed for <code>main.content</code>, check <code>width</code> and <code>min-width</code>.',
                    'In Styles, change the track to <code>minmax(0, 1fr)</code> and confirm the page stops scrolling sideways.',
                    'Use the Device Toolbar (<code>Ctrl+Shift+M</code>) to confirm the fix at tablet and mobile widths.'
                ] },
                { type: 'callout', kind: 'info', title: 'What appears where (Chrome versions vary)', html: '<ul><li><strong>Layout tab:</strong> Grid and Flexbox overlay lists and overlay settings. Recent versions also list <strong>container queries</strong>.</li><li><strong>Styles:</strong> grid/flex editor icons next to <code>display</code>; <code>align-*</code> visual editors.</li><li><strong>Computed:</strong> final width, height, position, box model.</li><li><strong>Rendering</strong> drawer (⋮ → More tools → Rendering): layout shift regions, paint flashing.</li><li>Element dimensions also appear in the hover tooltip when you use the element picker.</li></ul>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '⛔', title: 'F. DOM Breakpoints — who removed my element?',
            blocks: [
                { type: 'story', label: 'Story', paras: [
                    'In ASCWebQI, a "Validation summary" <code>&lt;div id="qiErrors"&gt;</code> sits inside the Kendo grid toolbar. After clicking <strong>Refresh</strong>, it disappears. Nobody knows which script removes it — jQuery, Kendo, or custom code.'
                ] },
                { type: 'table', head: ['Break on…', 'Pauses when', 'Use it for'], rows: [
                    ['<strong>Subtree modifications</strong>', 'A child is added, removed or moved anywhere below the node', 'Grid rows rebuilt, list re-rendered, toolbar replaced'],
                    ['<strong>Attribute modifications</strong>', 'An attribute on the node changes (<code>class</code>, <code>style</code>, <code>disabled</code>, <code>aria-*</code>)', 'Button mysteriously becomes disabled; element gets <code>display:none</code>'],
                    ['<strong>Node removal</strong>', 'The node itself is removed from the DOM', '"Who deleted this element?"']
                ] },
                { type: 'steps', items: [
                    'In Elements, right-click the <strong>parent</strong> toolbar <code>&lt;div class="k-grid-toolbar"&gt;</code> → <strong>Break on</strong> → <strong>Subtree modifications</strong>. (Or right-click <code>#qiErrors</code> → Break on → <strong>Node removal</strong>.) A blue dot appears next to the node.',
                    'Click <strong>Refresh</strong> on the page to reproduce.',
                    'Execution pauses and DevTools switches to <strong>Sources</strong>, highlighting the line that changed the DOM (often inside jQuery <code>.html()</code> or Kendo\'s <code>refresh</code>).',
                    'Read the <strong>Call Stack</strong> from top to bottom. Library frames come first; scroll down to the first frame from <em>your</em> code, e.g. <code>qiDashboard.js: onRefreshClick</code>.',
                    'Use <strong>Scope</strong> to inspect variables, then press <code>F8</code> to resume.',
                    'Manage all DOM breakpoints in Elements → <strong>DOM Breakpoints</strong> tab, or in Sources → Breakpoints sidebar.'
                ] },
                { type: 'callout', kind: 'tip', title: 'Ignore-list libraries', html: '<p>Right-click a library frame (jquery.min.js, kendo.all.min.js) in the Call Stack → <strong>Add script to ignore list</strong>. Stepping and the stack then focus on your code.</p>' },
                { type: 'code', lang: 'javascript', label: 'Root cause found via the Call Stack', code: `
// qiDashboard.js
function onRefreshClick() {
    var grid = $("#qiGrid").data("kendoGrid");
    // BUG: re-rendering the toolbar template wipes #qiErrors
    grid.setOptions({ toolbar: kendo.template($("#toolbarTpl").html()) });
    grid.dataSource.read();
}

// FIX: just reload data; keep the toolbar DOM intact
function onRefreshClick() {
    $("#qiGrid").data("kendoGrid").dataSource.read();
}` }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '♿', title: 'G. Accessibility pane — the icon-only Save button',
            blocks: [
                { type: 'prose', html:
                    '<p>Screen readers do not see pixels; they read the <strong>accessibility tree</strong> the browser derives from the DOM. Open the <strong>Accessibility</strong> tab in the right-hand pane.</p>' +
                    '<ul><li><strong>Accessible name</strong> — what is announced ("Save"). Comes from text content, <code>aria-label</code>, <code>aria-labelledby</code>, <code>alt</code>, or an associated <code>&lt;label&gt;</code>. The pane shows <em>which</em> source won.</li>' +
                    '<li><strong>Role</strong> — what kind of control it is (<code>button</code>, <code>link</code>, <code>checkbox</code>, <code>generic</code>).</li>' +
                    '<li><strong>Description</strong> — extra hint, often from <code>aria-describedby</code> or <code>title</code>.</li>' +
                    '<li><strong>Properties and states</strong> — focusable, disabled, expanded, pressed, invalid, required.</li>' +
                    '<li><strong>ARIA attributes</strong> — listed separately; ARIA changes semantics only, never behaviour.</li>' +
                    '<li>Enable <strong>Full-page accessibility tree</strong> (checkbox at the top of the pane) to toggle the DOM tree into an accessibility-tree view.</li></ul>' },
                { type: 'code', lang: 'html', label: 'Looks fine, announced as "button" (no name) — or worse, not a button', code: `
<!-- BAD: div with an icon font. Role: generic. Name: empty. Not focusable. -->
<div class="btn btn-save" onclick="save()"><i class="fa fa-floppy-disk"></i></div>

<!-- STILL BAD: real button but no accessible name -->
<button class="btn btn-save"><i class="fa fa-floppy-disk"></i></button>

<!-- GOOD -->
<button id="btnSave" type="button" class="btn btn-save" aria-label="Save quality indicators">
    <i class="fa fa-floppy-disk" aria-hidden="true"></i>
</button>` },
                { type: 'steps', items: [
                    'Select the icon button and open the <strong>Accessibility</strong> tab.',
                    'Check <strong>Computed Properties → Name</strong>. If it is empty, a screen reader just says "button".',
                    'Check <strong>Role</strong>. If it says <code>generic</code>, the element is a <code>div</code> and keyboard users cannot Tab to it.',
                    'Temporarily add <code>aria-label="Save quality indicators"</code> in the DOM tree; the Name updates live.',
                    'Press <code>Tab</code> on the page to confirm the button receives a visible focus ring; use <strong>:hov → :focus-visible</strong> to style it.',
                    'Run a Lighthouse Accessibility audit afterwards (Lesson 9) to catch similar issues site-wide.'
                ] }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🔧', title: 'H. Properties — the element as a JavaScript object',
            blocks: [
                { type: 'prose', html:
                    '<p>Every DOM node is a JavaScript object (<code>HTMLButtonElement</code> for a button). The <strong>Properties</strong> tab shows its live properties and prototype chain. Useful ones:</p>' +
                    '<table class="cookie-table"><thead><tr><th>Property</th><th>Meaning</th></tr></thead><tbody>' +
                    '<tr><td><code>tagName</code></td><td>"BUTTON" (upper-case for HTML)</td></tr><tr><td><code>id</code></td><td>"btnSave"</td></tr><tr><td><code>className</code> / <code>classList</code></td><td>"btn btn-save" / DOMTokenList</td></tr>' +
                    '<tr><td><code>textContent</code></td><td>All text inside, including hidden text</td></tr><tr><td><code>children</code></td><td>Child <em>elements</em> (not text nodes)</td></tr>' +
                    '<tr><td><code>value</code></td><td>Current value of inputs — what the user typed now</td></tr><tr><td><code>disabled</code></td><td>Boolean live state</td></tr></tbody></table>' +
                    '<h3>Attributes vs properties</h3><p><strong>Attributes</strong> are in the HTML markup and shown in the DOM tree. <strong>Properties</strong> are on the JS object. Some are reflected (changing <code>id</code> updates both), but not all:</p>' },
                { type: 'code', lang: 'javascript', label: 'Run in Console with the input selected ($0)', code: `
// <input id="txtTarget" value="85">  — user then types 90
$0.getAttribute("value");   // "85"  -> the original HTML attribute
$0.value;                   // "90"  -> the live property

// disabled is a boolean attribute: presence = true
$0.setAttribute("disabled", "false");  // still disabled!
$0.disabled = false;                   // correct way
$0.removeAttribute("disabled");        // also correct

console.dir($0);   // object view, same as the Properties tab` },
                { type: 'callout', kind: 'tip', title: 'Store as global variable', html: '<p>Right-click a node → <strong>Store as global variable</strong> creates <code>temp1</code> in the Console. Handy when you need to keep a reference while selecting other elements.</p>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '👂', title: 'I. Event Listeners — why does clicking do nothing?',
            blocks: [
                { type: 'prose', html:
                    '<p>The <strong>Event Listeners</strong> tab lists handlers attached to the selected element <em>and its ancestors</em> (when <strong>Ancestors</strong> is ticked).</p>' +
                    '<ul><li>Common events: <code>click</code>, <code>change</code> (value committed), <code>input</code> (every keystroke), <code>submit</code> (forms), <code>keydown</code>/<code>keyup</code>.</li>' +
                    '<li>Expand an event (▶) to see each listener: the node it is attached to, <code>useCapture</code>, <code>passive</code>, <code>once</code>, and a <strong>file:line</strong> link to the handler.</li>' +
                    '<li><strong>Bubbling:</strong> a click on the button travels up to <code>.actions</code>, <code>main</code>, <code>body</code>, <code>document</code>. jQuery delegated handlers (<code>$(document).on("click", "#btnSave", …)</code>) live on <code>document</code>, so untick Ancestors and you will not see them.</li>' +
                    '<li>Set <strong>Framework listeners</strong> on (if offered) to resolve jQuery wrapper functions to your actual handler; otherwise you will land inside <code>jquery.min.js</code>.</li>' +
                    '<li><strong>Remove</strong> button next to a listener lets you test behaviour without it.</li></ul>' },
                { type: 'code', lang: 'javascript', label: 'Save handler expected to call the API', code: `
// qiDashboard.js
$(document).on("click", "#btn-save", function () {   // BUG: id is btnSave, not btn-save
    saveIndicators();
});

function saveIndicators() {
    var rows = $("#qiGrid").data("kendoGrid").dataSource.view();
    return fetch("/api/indicators", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                   "RequestVerificationToken": $("input[name=__RequestVerificationToken]").val() },
        body: JSON.stringify(rows)
    });
}` },
                { type: 'steps', items: [
                    'Select <code>#btnSave</code> → Event Listeners. Tick <strong>Ancestors</strong>. Expand <code>click</code>.',
                    'No listener on <code>button#btnSave</code>; one on <code>document</code> from <code>qiDashboard.js:2</code>. Click the link.',
                    'In Sources you see the delegated selector <code>"#btn-save"</code> — it never matches. That is the root cause of "does nothing".',
                    'To confirm, set a breakpoint inside the handler and click Save — it never pauses.',
                    'After fixing the selector, click Save again; the breakpoint hits, step into <code>saveIndicators</code>.',
                    'Open <strong>Network</strong> filtered to Fetch/XHR and confirm <code>POST /api/indicators</code> is sent and returns 200/204.'
                ] }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🕵️', title: 'J. Complete troubleshooting story: grey, spaced-out, and dead',
            blocks: [
                { type: 'figure', alt: 'Flow diagram of eight investigation steps from selecting the button through Styles, Computed, Box Model, Event Listeners, Sources, Network and the source code fix.',
                  caption: 'Figure 4 — Investigation path for the ASCWebQI Save button (illustration).',
                  html: '<div class="dt-flow"><span>1 Select node</span><span>2 Styles</span><span>3 Computed</span><span>4 Box Model</span><span>5 Event Listeners</span><span>6 Sources</span><span>7 Network</span><span>8 Fix source</span></div>' },
                { type: 'steps', items: [
                    '<strong>Select the button</strong> — right-click Save → Inspect. DOM shows <code>&lt;button id="btnSave" class="btn btn-save"&gt;</code>. Markup is correct.',
                    '<strong>Styles</strong> — <code>.btn-save { background-color:#2563eb }</code> is crossed out by <code>.actions .btn</code> at <code>site.css:118</code>. <em>Symptom:</em> grey. <em>Cause:</em> over-broad selector.',
                    '<strong>Computed</strong> — <code>background-color: rgb(156, 163, 175)</code>; expanding it confirms the winning rule. No inline style or <code>!important</code> involved.',
                    '<strong>Box Model</strong> — top margin 48px from <code>.mt-5</code> in the Razor view plus 8px parent padding. Reduce to 8px live to confirm.',
                    '<strong>Event Listeners</strong> — with Ancestors on, only a <code>document</code> click listener exists, pointing to <code>qiDashboard.js:2</code>.',
                    '<strong>Sources</strong> — breakpoint in the handler never hits; selector is <code>#btn-save</code>. Fix locally via Overrides and the breakpoint hits; step into <code>saveIndicators()</code>.',
                    '<strong>Network</strong> — <code>POST /api/indicators</code> now appears. Check status (200), Payload (JSON rows), and request header <code>RequestVerificationToken</code> present. If it were 400, check the anti-forgery token; 401/302, check authentication (Lesson 4).',
                    '<strong>Verify the real fix</strong> — change <code>site.css</code>, <code>Index.cshtml</code> and <code>qiDashboard.js</code> in the repo, rebuild bundles, hard-reload (<code>Ctrl+Shift+R</code> or Disable cache in Network), and repeat the test. Add a UI test so it does not regress.'
                ] },
                { type: 'code', lang: 'diff', label: 'The real source-code fix', code: `
// site.css
- .actions .btn[disabled],
- .actions .btn { background-color: #9ca3af; }
+ .actions .btn[disabled] { background-color: #9ca3af; }

// Index.cshtml
- <div class="actions mt-5">
+ <div class="actions mt-2">

// qiDashboard.js
- $(document).on("click", "#btn-save", function () {
+ $(document).on("click", "#btnSave", function () {` },
                { type: 'code', lang: 'csharp', label: 'ASP.NET Core API the button calls', code: `
[ApiController]
[Route("api/indicators")]
public class IndicatorsController : ControllerBase
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Save([FromBody] List<IndicatorDto> rows)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        await _service.SaveAsync(rows);
        return NoContent();   // 204 in the Network tab
    }
}` },
                { type: 'callout', kind: 'warn', title: 'Symptom vs root cause', html: '<p>"Grey" was a symptom; the root cause was CSS specificity. "Does nothing" was a symptom; the root cause was a selector typo — not the API, not the controller. Elements helps you prove which layer is at fault before you change server code.</p>' }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '⚠️', title: 'Common mistakes',
            blocks: [
                { type: 'mistakes', items: [
                    ['"I fixed it in DevTools, so it is fixed."', 'DevTools edits are temporary. Apply the change in source, rebuild, and verify after a hard reload.'],
                    ['Comparing Elements to View Source and assuming the server is wrong.', 'Elements shows the DOM after scripts ran. Compare with the Network document response to decide server vs client.'],
                    ['Adding <code>!important</code> to win a specificity fight.', 'Use Computed to see why a rule loses, then simplify selectors. <code>!important</code> creates the next bug.'],
                    ['Checking only the element, not its parent, for spacing.', 'Gaps often come from parent padding, sibling margins or margin collapsing. Walk the breadcrumb.'],
                    ['Unticking "Ancestors" in Event Listeners.', 'Delegated jQuery/Kendo handlers are on <code>document</code> or a container. Keep Ancestors on.'],
                    ['Using <code>setAttribute("disabled","false")</code>.', 'Boolean attributes are true when present. Use the <code>disabled</code> property or remove the attribute.'],
                    ['Judging accessibility by appearance.', 'Check Name and Role in the Accessibility pane; an icon can look perfect and be announced as nothing.']
                ] }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '📒', title: 'Notebook summary',
            blocks: [
                { type: 'notebook', items: [
                    'Elements = <strong>live DOM</strong>, not the HTML file. Edits vanish on reload.',
                    '<code>Ctrl+Shift+C</code> picks; <code>Ctrl+F</code> searches by text, selector or XPath; <code>$0</code> is the selection.',
                    '<strong>Styles</strong> = all candidate rules (crossed out = lost). <strong>Computed</strong> = the final winner.',
                    'Cascade order: importance → layers → specificity (ID, class, element) → source order.',
                    'Box model: content → padding → border → margin. Margin is outside and transparent.',
                    '<strong>Layout</strong> overlays reveal grid tracks and flex alignment; <code>minmax(0,1fr)</code> stops overflow.',
                    'DOM breakpoints: subtree / attribute / node removal → pause → Call Stack finds who changed it.',
                    'Accessibility: check Name, Role, State. Icon buttons need <code>aria-label</code>.',
                    'Attribute = markup; property = live object (<code>value</code>, <code>disabled</code>).',
                    'Dead button path: Event Listeners → Sources breakpoint → Network request → fix source.'
                ] }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🎤', title: 'Interview questions',
            blocks: [
                { type: 'interview',
                  junior: [
                    ['What is the difference between HTML source and the DOM shown in Elements?', 'HTML is the text from the server; the DOM is the browser\'s live object tree built from it and modified by JavaScript. Elements shows the DOM.'],
                    ['Why does a property appear crossed out in Styles?', 'Another rule with higher priority (importance, specificity or later source order) set the same property, so this declaration lost.'],
                    ['What are the four parts of the box model?', 'Content, padding, border, margin — from inside out.'],
                    ['How do you find which file defines a CSS rule?', 'The link on the right of the rule in Styles shows file name and line; click it to open in Sources.']
                  ],
                  senior: [
                    ['A button is styled correctly in dev but grey in production. How do you investigate?', 'Inspect in production, compare Styles between environments, check bundle order (later bundle overrides), source maps to locate original file, and Computed to confirm the winning rule. Often a bundling order or minifier difference.'],
                    ['How would you find which script removes a DOM node?', 'Set a DOM breakpoint (Node removal or Subtree modifications on the parent), reproduce, then read the Call Stack and ignore-list library frames to find the first application frame.'],
                    ['Explain attributes vs properties with an example.', '<code>input.getAttribute("value")</code> is the initial markup value; <code>input.value</code> is the current value. <code>disabled</code> attribute presence means true regardless of its string.'],
                    ['Why might Event Listeners show no click handler on a working button?', 'The handler is delegated to an ancestor (document/container) — enable Ancestors — or attached via inline <code>onclick</code> shown as an attribute.']
                  ],
                  lead: [
                    ['How do you reduce recurring CSS specificity bugs across a large MVC app?', 'Adopt a convention (BEM or utility-first), cascade layers for vendor vs app CSS, lint rules banning <code>!important</code> and IDs in selectors, source maps in all environments, and visual regression tests.'],
                    ['How would you embed accessibility checks into the team\'s workflow?', 'Definition of done includes Accessibility pane checks for new controls, automated axe/Lighthouse in CI, keyboard-only test passes, and shared accessible components (button with required label).'],
                    ['Teach a junior a repeatable approach to "UI does nothing" bugs.', 'Elements (markup/state) → Event Listeners (is a handler attached) → Sources (does it run, what fails) → Console (errors) → Network (request sent, status, payload) → server logs. Prove each layer before changing the next.']
                  ] }
            ]
        },
        /* ---------------------------------------------------------------- */
        {
            icon: '🧠', title: 'Interactive quiz',
            blocks: [
                { type: 'quiz', questions: [
                    { q: 'You change a button\'s text in Elements and reload. What happens?', options: ['The change is saved to the .cshtml file', 'The change disappears because the DOM is rebuilt from the server response', 'The change persists until the browser is closed', 'The change is saved to the CSS bundle'], answer: 1, explain: 'DevTools edits only change the in-memory DOM. Reloading rebuilds it from fresh HTML.' },
                    { q: 'Which selector wins for background-color: <code>.actions .btn</code> or <code>.btn-save</code> (no !important, both in site.css)?', options: ['.btn-save because it is more descriptive', '.actions .btn because it has higher specificity (0,2,0)', 'Whichever was written first', 'They merge into a blend'], answer: 1, explain: 'Two classes (0,2,0) beat one class (0,1,0). Source order only matters when specificity is equal.' },
                    { q: 'Where do you see the single final value the browser uses for <code>width</code>?', options: ['Styles', 'Computed', 'Properties', 'Event Listeners'], answer: 1, explain: 'Computed shows the resolved final value and can expand to show contributing rules.' },
                    { q: 'A gap appears above a button but the button\'s margin is 0. What should you check next?', options: ['The button\'s font-size', 'The parent\'s padding and the previous sibling\'s margin', 'The Network tab', 'The button\'s click handler'], answer: 1, explain: 'Spacing often comes from the parent or siblings. Use the breadcrumb to inspect them.' },
                    { q: 'Which DOM breakpoint finds the script that deletes <code>#qiErrors</code>?', options: ['Attribute modifications on body', 'Node removal on #qiErrors (or Subtree modifications on its parent)', 'An XHR breakpoint', 'A conditional line breakpoint'], answer: 1, explain: 'Node removal pauses when the node is removed; subtree modifications on the parent also catches it.' },
                    { q: 'An icon-only button is announced as just "button". What fixes it?', options: ['Make the icon bigger', 'Add aria-label="Save" to the button and aria-hidden="true" to the icon', 'Add a title to the icon only', 'Change the div to a span'], answer: 1, explain: 'aria-label gives the accessible name; hiding the decorative icon avoids noise.' },
                    { q: 'The user typed 90 into an input originally rendered with value="85". What does <code>$0.getAttribute("value")</code> return?', options: ['"90"', '"85"', 'undefined', '90 (number)'], answer: 1, explain: 'The attribute holds the initial markup value; the value property holds the current text.' },
                    { q: 'Event Listeners shows no click handler on #btnSave, but one on document. Why?', options: ['Chrome bug', 'The handler is delegated with $(document).on("click", selector, …)', 'The button is disabled', 'Event Listeners only show keyboard events'], answer: 1, explain: 'Delegated handlers are attached to an ancestor and filter by selector — enable Ancestors to see them.' }
                ] }
            ]
        }
    ]
};
