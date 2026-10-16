/* ==========================================================================
   Chrome DevTools Learning Center — Lessons 2–10
   Each lesson is built by lesson() so every tab follows the same structure:
   story → what → where → screen → steps → code → evidence → mistakes →
   notebook → interview → quiz.
   ========================================================================== */
window.DEVTOOLS_LESSONS = window.DEVTOOLS_LESSONS || {};

(function (L) {
    'use strict';

    var VISUAL_GUIDES = {
        console: {
            sectionTitle: 'Visual Guide, 9-Step Walkthrough & Real-World Lab: Console Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Console Tab Debugging',
                    title: 'Chrome DevTools – Console Tab: See What’s Really Happening | Find Errors | Debug JavaScript Like a Pro',
                    src: 'assets/devtools/console-tab-guide.png',
                    alt: 'Chrome DevTools Console Tab Guide showing ASCWebQI Patient Information Save button throwing Uncaught TypeError at app.js:45:28 with 9 numbered sections',
                    caption: 'Console Tab Visual Guide — Diagnosing why clicking "Save" on the ASCWebQI Patient Information form does nothing by inspecting the red Uncaught TypeError stack trace (app.js:45:28), filtering console output, evaluating live expressions, and tracing directly to Sources.',
                    callouts: [
                        { num: '1', title: 'Error Message (Red)', desc: 'Shows what broke, the error type (<code>Uncaught TypeError: Cannot read properties of undefined (reading \'value\')</code>), the exact file/line (<code>app.js:45:28</code>), and the call stack.' },
                        { num: '2', title: 'Warning Message (Yellow)', desc: 'Flags potential issues that do not crash immediately, such as performance violations (<code>[Violation] \'click\' handler took 280ms</code>) or deprecated APIs.' },
                        { num: '3', title: 'Log Messages (Custom Output)', desc: 'Displays developer logs from <code>console.log(\'Save button clicked\')</code>, <code>console.info()</code>, <code>console.warn()</code>, and <code>console.error()</code> with source file links.' },
                        { num: '4', title: 'Filter Console Output', desc: 'Filter by log level (<strong>Verbose, Info, Warnings, Errors</strong>), search by keyword, or exclude noisy library logs with negative filters like <code>-jquery</code>.' },
                        { num: '5', title: 'Evaluate JavaScript (Live REPL)', desc: 'Run JavaScript directly inside the live page context: test expressions (<code>2 + 3</code>), inspect DOM nodes (<code>document.getElementById(\'saveBtn\')</code>), or check <code>window.location</code>.' },
                        { num: '6', title: 'View & Expand Objects', desc: 'Click the ▶ arrow on logged objects (e.g., <code>{id: 123, name: \'John Doe\', age: 45, address: {city: \'Bangalore\'}}</code>) to inspect nested API payloads and prototypes.' },
                        { num: '7', title: 'Trace to Source Code (app.js:45)', desc: 'Click <code>app.js:45</code> in the error trace to jump straight to line 45 in the <strong>Sources</strong> tab (<code>const dob = document.getElementById(\'dob\').value;</code>) and place a breakpoint.' },
                        { num: '8', title: 'Common Console Commands', desc: 'Essential commands: <code>clear()</code>, <code>console.log()</code>, <code>document.getElementById()</code>, <code>$0</code> (selected element), <code>console.table(data)</code>, and <code>monitorEvents($0, \'click\')</code>.' },
                        { num: '9', title: 'Real-World Debugging Flow', desc: '1. Click Save → 2. Open Console → 3. Read red error → 4. Click <code>app.js:45</code> → 5. Inspect code in Sources → 6. Fix selector/null check → 7. Verify <em>"Patient saved successfully!"</em>' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Console Image)',
                    app: 'ASCWebQI · Patient Information Form',
                    title: 'You Click "Save" on Patient Information (John Doe), But Nothing Happens — No Toast, No API Call',
                    symptom: 'Receptionist enters <em>Patient Name: John Doe</em> and <em>Date of Birth</em> on ASCWebQI and clicks <strong>Save</strong>. Nothing happens on screen and no network request is sent.',
                    evidence: 'Opening <strong>Console</strong> (<code>F12</code>) reveals a red error: <code>Uncaught TypeError: Cannot read properties of undefined (reading \'value\') at HTMLButtonElement.savePatient (app.js:45:28)</code>, plus a yellow warning <code>[Violation] \'click\' handler took 280ms</code>.',
                    cause: 'Clicking <code>app.js:45</code> opens <strong>Sources</strong> at <code>const dob = document.getElementById(\'dob\').value;</code>. In the Razor view, the Date of Birth input has <code>id="patientDob"</code>, so <code>getElementById(\'dob\')</code> returned <code>null</code>/<code>undefined</code> and crashed before the <code>fetch()</code> call!',
                    fix: 'Test in the Console REPL with <code>document.getElementById(\'patientDob\')?.value</code>, then update <code>app.js:45</code> to use the matching ID with optional chaining and defensive validation.'
                },
                {
                    type: 'code', lang: 'javascript', label: 'app.js:45 — The Exact Bug Shown in the Console Guide Image & Its Fix', code: `
// ❌ BUG in app.js (Line 43–48): crashes at line 45 before calling the API
function savePatient() {
    console.log('Save button clicked');
    const name = document.getElementById('patientName').value;
    const dob  = document.getElementById('dob').value; // ❌ Uncaught TypeError at app.js:45:28!
    // ... call API (never reached)
}

// ✅ FIX: Match the actual DOM ID (#patientDob), use optional chaining, and log tabular data
async function savePatient() {
    const nameEl = document.getElementById('patientName');
    const dobEl  = document.getElementById('patientDob'); // Matches Razor view ID
    if (!nameEl || !dobEl) {
        console.error('Required form inputs missing from DOM', { nameEl, dobEl });
        return;
    }
    const payload = { patientName: nameEl.value.trim(), dob: dobEl.value };
    console.table([payload]); // Clean structured verification in Console

    const res = await fetch('/api/patients/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (res.ok) console.info('Patient saved successfully!');
}`
                }
            ]
        },
        sources: {
            sectionTitle: 'Visual Guide, 5-Step Walkthrough & Real-World Lab: Sources Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Step-by-Step Code Debugging',
                    title: 'Sources — Debug Code Step by Step: Which Line of Code Is Causing the Problem?',
                    src: 'assets/devtools/sources-tab-guide.png',
                    alt: 'Chrome DevTools Sources Tab Guide showing breakpoint on line 5 let total = calculate(x), Scope variables, Watch expressions total = NaN, Call Stack, and Source map',
                    caption: 'Sources Tab Visual Guide — Pausing execution on a breakpoint when clicking "Submit", inspecting Scope variables and Watch expressions where total becomes NaN, walking the Call Stack, and tracing back to original code via Source Maps.',
                    callouts: [
                        { num: '1', title: 'A Button’s Handler Executes', desc: 'The user clicks the <strong>Submit</strong> button on the form, triggering the attached JavaScript calculation handler.' },
                        { num: '2', title: 'Pause Execution (Breakpoints & Stepping)', desc: 'Set a <strong>Breakpoint</strong> at line 5 (<code>let total = calculate(x);</code>). Execution freezes in place so you can <strong>Step Into (F11)</strong>, <strong>Step Over (F10)</strong>, or <strong>Step Out (Shift+F11)</strong>.' },
                        { num: '3', title: 'Inspect Variables (Scope & Watch)', desc: 'Examine <strong>Scope (Variables)</strong> (<code>x = 5</code>, <code>wrongValue = undefined</code>) and <strong>Watch Expressions</strong> (<code>total = NaN (Error!)</code>) at the exact moment the calculation corrupts.' },
                        { num: '4', title: 'Follow the Call Stack', desc: 'Walk the <strong>Call Stack</strong> pane backwards through <code>calculate()</code> and its caller functions to see which function passed an invalid or uninitialized value.' },
                        { num: '5', title: 'Find Where the Value Changes & Fix It', desc: '<strong>Source maps</strong> trace minified production bundles back to your original <code>calculate()</code> source file so you can fix the bug and verify immediately.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Sources Image)',
                    app: 'ASCWebQI · Clinical Score & Billing Calculator',
                    title: 'Clicking "Submit" Displays NaN Instead of the Calculated Total — No Console Exception Is Thrown!',
                    symptom: 'When a user clicks <strong>Submit</strong>, the page does not throw a red Console error, because <code>NaN</code> is a valid JavaScript number value — yet the UI displays <code>Total: NaN</code>.',
                    evidence: 'In <strong>Sources</strong>, setting a breakpoint at line 5 (<code>let total = calculate(x);</code>) and stepping into <code>calculate()</code> shows in <strong>Scope</strong> that <code>x = 5</code>, but an uninitialized discount/weight property is <code>undefined</code> (or formatted as <code>"0,5"</code>), turning <code>x + wrongValue</code> into <code>NaN</code> in <strong>Watch Expressions</strong>.',
                    cause: 'Arithmetic with <code>undefined</code> or a non-numeric string silently produces <code>NaN</code> without throwing an exception, making it invisible in Console but immediately obvious in Sources Scope/Watch.',
                    fix: 'Use a breakpoint (or conditional breakpoint <code>isNaN(total)</code>) in Sources to catch the exact line where the number turns into <code>NaN</code>, coerce/default inputs with <code>Number(val) || 0</code>, and ensure the C# API serializes numeric types.'
                },
                {
                    type: 'code', lang: 'javascript', label: 'calculate(x) — Exact Breakpoint Scenario From the Sources Guide Image & Fix', code: `
// ❌ BUG (Shown in Sources Image): Clicking Submit sets total = NaN with zero Console errors
function onSubmit() {
    let x = 5;
    let total = calculate(x); // 🔴 Breakpoint at line 5: Step Into (F11) to inspect Scope!
    document.getElementById('result').textContent = 'Total: ' + total; // Renders "Total: NaN"
}

function calculate(x) {
    let wrongValue = window.patientDiscount; // Scope shows: wrongValue = undefined
    return x + wrongValue;                   // Watch Expression shows: 5 + undefined = NaN (Error!)
}

// ✅ FIX: Guard against undefined / non-numeric values & validate before arithmetic
function calculateFixed(x) {
    const discount = Number(window.patientDiscount ?? 0);
    const base = Number(x ?? 0);
    return (Number.isFinite(base) ? base : 0) + (Number.isFinite(discount) ? discount : 0);
}`
                }
            ]
        },
        network: {
            sectionTitle: 'Visual Guide, 10-Step Walkthrough & Real-World Lab: Network Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · API, Status Codes, Redirects & Auth Cookies',
                    title: 'Chrome DevTools – Network Tab: Investigate Requests and Responses | Find the Real Cause | Debug Like a Pro',
                    src: 'assets/devtools/network-tab-guide.png',
                    alt: 'Chrome DevTools Network Tab Guide showing ASCWebQI Login returning 200 OK but dashboard returning 302 redirect back to login, with 10 numbered inspection panels',
                    caption: 'Network Tab Visual Guide — Solving the classic enterprise "Login succeeds (200 OK), but /dashboard immediately redirects (302) back to /login" bug by inspecting Payload, Response, Set-Cookie (.ASPXAUTH), Timing (TTFB), Redirect Waterfall, and Request Cookies.',
                    callouts: [
                        { num: '1', title: 'Perform a Login (Reproduce)', desc: 'Enter credentials (<code>john.doe</code> / password) and click <strong>Login</strong> on the ASCWebQI application.' },
                        { num: '2', title: 'Open Network Tab First', desc: 'Press <code>F12</code>, select <strong>Network</strong>, and enable <strong>Preserve log</strong> (so redirects don’t wipe the table) and <strong>Disable cache</strong>.' },
                        { num: '3', title: 'Analyze the Requests Table', desc: 'See every request in order: <code>login</code> (<code>200</code>, xhr, <code>app.js:45</code>, <code>320 ms</code>), <code>dashboard</code> (<code>302</code>, document, <code>120 ms</code>), and <code>login</code> (<code>200</code>, document, <code>180 ms</code>).' },
                        { num: '4', title: 'Check HTTP Status Codes', desc: '<code>200</code> Success · <code>301/302</code> Redirect · <code>401</code> Unauthorized · <code>403</code> Forbidden · <code>404</code> Not Found · <code>500</code> Server Error. Here <code>dashboard</code> returns <code>302</code>!' },
                        { num: '5', title: 'Request Details — Payload Sent', desc: 'Open <strong>Payload</strong> on <code>login</code> to verify the browser sent <code>{"username": "john.doe", "password": "••••••••", "rememberMe": true}</code>.' },
                        { num: '6', title: 'Response Details — JSON Returned', desc: 'Open <strong>Response</strong> on <code>login</code>: <code>{"success": true, "token": "eyJhbG...", "userId": 123, "userName": "John Doe"}</code> — proving authentication succeeded on the server!' },
                        { num: '7', title: 'Headers — Inspect Set-Cookie', desc: 'In <strong>Headers → Response Headers</strong> on <code>login</code>, inspect <code>Set-Cookie: .ASPXAUTH=abc123...; path=/; secure; httponly; samesite=Lax</code> from <code>Microsoft-IIS/10.0</code>.' },
                        { num: '8', title: 'Timing — TTFB & Latency', desc: 'Check <strong>Timing</strong>: <code>Queued (0.34 ms)</code>, <code>Request sent (0.45 ms)</code>, <code>Waiting / TTFB (318.67 ms)</code>, <code>Content Download (2.10 ms)</code> — proves 99% of time is server/DB work.' },
                        { num: '9', title: 'Redirect Flow (200 → 302 → 200)', desc: 'Traces why the user lands back on Login: <code>login (200)</code> → <code>dashboard (302)</code> → <code>login (200)</code> because the auth cookie wasn’t sent or accepted on <code>/dashboard</code>.' },
                        { num: '10', title: 'Cookies Sub-Tab (Filtered-Out Cookies)', desc: 'Open <strong>Cookies</strong> on <code>dashboard</code> and tick <strong>show filtered out request cookies</strong> to see if <code>.ASPXAUTH</code> was blocked due to <code>Secure</code> (on HTTP), <code>SameSite</code>, <code>Domain</code>, or <code>Path</code>!' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Network Image)',
                    app: 'ASCWebQI · Authentication & Dashboard Redirect Loop',
                    title: 'Login Succeeds (200 OK), But Navigating to /dashboard Immediately Redirects (302) Back to /login',
                    symptom: 'User <code>john.doe</code> enters valid credentials on ASCWebQI and clicks <strong>Login</strong>. No error message appears, yet the browser flashes and lands right back on the Login screen.',
                    evidence: 'With <strong>Preserve log</strong> ticked in <strong>Network</strong>: <code>POST /api/login</code> returns <code>200 OK</code> with <code>{"success": true}</code> and <code>Set-Cookie: .ASPXAUTH=abc123...; path=/; secure; httponly; samesite=Lax</code>. Immediately after, <code>GET /dashboard</code> returns <code>302 Found → /login</code>, and its <strong>Cookies</strong> tab (with <em>show filtered out request cookies</em> checked) reveals <code>.ASPXAUTH</code> was blocked!',
                    cause: 'The staging environment runs over plain <code>http://</code> behind an unconfigured reverse proxy (or a cross-site subdomain), so Chrome rejects storing/sending the <code>.ASPXAUTH</code> cookie marked <code>Secure</code> (or mismatched <code>Domain</code>/<code>Path</code>).',
                    fix: 'Configure <code>UseForwardedHeaders()</code> in ASP.NET Core / HTTPS binding in IIS so the app runs over HTTPS end-to-end, and ensure <code>credentials: "same-origin"</code> is set on the login <code>fetch()</code> call.'
                },
                {
                    type: 'code', lang: 'csharp', label: 'ASCWebQI Login 200 → Dashboard 302 Redirect Loop Fix (JS Fetch + ASP.NET Core Cookie Config)', code: `
// 1. Frontend (app.js:45) — Ensure fetch() accepts and stores Set-Cookie from /api/login
const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'same-origin', // Required so browser stores Set-Cookie: .ASPXAUTH
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'john.doe', password, rememberMe: true })
});
const result = await response.json();
if (result.success) {
    window.location.href = '/dashboard'; // Now sends Cookie: .ASPXAUTH=abc123... -> 200 OK!
}

// 2. Backend (Program.cs) — Honor X-Forwarded-Proto behind IIS/Reverse Proxy & configure cookie
app.UseForwardedHeaders(new ForwardedHeadersOptions {
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
builder.Services.ConfigureApplicationCookie(options => {
    options.Cookie.Name = ".ASPXAUTH";
    options.Cookie.Path = "/";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Works once HTTPS/ForwardedProto is active
});`
                }
            ]
        },
        performance: {
            sectionTitle: 'Visual Guide, 5-Step Walkthrough & Real-World Lab: Performance Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Flame Charts, Long Tasks & UI Freezes',
                    title: '5. Performance — Find What Makes a Page Slow: Why Does the Application Freeze During an Interaction?',
                    src: 'assets/devtools/performance-tab-guide.png',
                    alt: 'Chrome DevTools Performance Tab Guide showing Filter Data button triggering a 2.5s Long Task with filterGrid() JavaScript execution and Layout-related work',
                    caption: 'Performance Tab Visual Guide — Recording a 2.5-second UI freeze when clicking "Filter Data", spotting the red Long Task bar, reading the Main thread flame chart (filterGrid() + purple Layout blocks), and identifying the 85% Scripting / 10% Rendering bottleneck.',
                    callouts: [
                        { num: '1', title: 'Heavy Interaction Triggers a Freeze', desc: 'User clicks the <strong>Filter Data</strong> button on a large data grid, and the UI freezes (<code>Freeze/Loading...</code>) for 2.5 seconds.' },
                        { num: '2', title: 'Record Performance During the Action', desc: 'Click the red <strong>Record</strong> icon (<code>Ctrl+E</code>) in the Performance tab, click <strong>Filter Data</strong>, and stop recording as soon as the UI unfreezes.' },
                        { num: '3', title: 'Analyze the Timeline (Long Tasks)', desc: 'Spot the red <strong>Long Task - 2.5s</strong> bar (marked with warning triangles) and <strong>Interaction Delays</strong> blocking the browser main thread.' },
                        { num: '4', title: 'Inspect JavaScript & Rendering Flame Chart', desc: 'In the <strong>Main</strong> track, inspect the deep yellow stack of <code>filterGrid()</code> JavaScript calls interleaved with purple <strong>Layout-related work</strong> (forced synchronous reflows) and green <strong>Rendering</strong> bars.' },
                        { num: '5', title: 'Identify the Bottleneck (Summary)', desc: 'The Summary breakdown proves where the 2.5s went: <strong>Scripting (85%)</strong>, <strong>Rendering (10%)</strong>, <strong>Painting (2%)</strong> — pinpointing <code>filterGrid()</code> DOM thrashing as the culprit.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Performance Image)',
                    app: 'ASCWebQI · Clinical Data Grid Filtering',
                    title: 'Clicking "Filter Data" Freezes the Browser Tab for 2.5 Seconds',
                    symptom: 'When a nurse or auditor clicks <strong>Filter Data</strong> on a 5,000-row table, the spinner itself freezes and clicks are ignored for 2.5 seconds.',
                    evidence: 'Recording in <strong>Performance</strong> shows a single red <strong>Long Task - 2.5s</strong> on the <strong>Main</strong> thread. Zooming into the flame chart reveals <code>filterGrid()</code> taking 85% Scripting + 10% purple Layout blocks.',
                    cause: '<code>filterGrid()</code> loops over every DOM <code>&lt;tr&gt;</code>, reads <code>row.offsetHeight</code>, and writes <code>row.style.display</code> inside the loop — forcing the browser to recalculate layout thousands of times synchronously.',
                    fix: 'Filter the underlying JavaScript data array in memory first and render only the visible page (or replace <code>tbody</code> once using a <code>DocumentFragment</code> / CSS classes), dropping the interaction time from <code>2,500 ms</code> to <code>35 ms</code>.'
                },
                {
                    type: 'code', lang: 'javascript', label: 'filterGrid() — Eliminating the 2.5s Long Task & Forced Synchronous Layout', code: `
// ❌ SLOW (2,500 ms Long Task — 85% Scripting, 10% Rendering in Performance Flame Chart):
function filterGrid(searchTerm) {
    const rows = document.querySelectorAll('#patient-grid tbody tr');
    rows.forEach(row => {
        const height = row.offsetHeight; // ⚠️ Forced layout read inside loop!
        const match = row.innerText.toLowerCase().includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none'; // ⚠️ Layout write invalidates geometry every row!
    });
}

// ✅ FAST (18 ms — Single DOM batch update, zero forced reflows):
function filterGridFast(allPatients, searchTerm) {
    const q = searchTerm.trim().toLowerCase();
    const matched = allPatients.filter(p => p.searchKey.includes(q)).slice(0, 100);
    const fragment = document.createDocumentFragment();
    for (const p of matched) {
        const tr = document.createElement('tr');
        tr.innerHTML = \`<td>\${p.mrn}</td><td>\${p.fullName}</td><td>\${p.status}</td>\`;
        fragment.appendChild(tr);
    }
    document.querySelector('#patient-grid tbody').replaceChildren(fragment);
}`
                }
            ]
        },
        memory: {
            sectionTitle: 'Visual Guide, 10-Step Walkthrough & Real-World Lab: Memory Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Heap Snapshots & Detached DOM Leaks',
                    title: 'Chrome DevTools – Memory Tab: Investigate Memory Usage | Find Leaks | Keep Your Application Fast',
                    src: 'assets/devtools/memory-tab-guide.png',
                    alt: 'Chrome DevTools Memory Tab Guide showing ASCWebQI Open Patient Dialog memory leak growing from 5.4 MB to 12.8 MB with +457 Detached HTMLDivElement nodes across 10 steps',
                    caption: 'Memory Tab Visual Guide — Hunting down why the ASCWebQI Dashboard slows down after repeatedly opening and closing "Patient Details" by comparing Snapshot 1 (5.4 MB) vs Snapshot 2 (12.8 MB) and finding +457 Detached HTMLDivElement nodes retained by window.patientDialogs.',
                    callouts: [
                        { num: '1', title: 'Reproduce the Issue in the App', desc: 'On the <strong>ASCWebQI Dashboard</strong>, click <strong>Open Patient Dialog</strong> (<em>John Doe, Age 45</em>) and close it multiple times (e.g., 5 times).' },
                        { num: '2', title: 'Open the Memory Tab', desc: 'Press <code>F12</code> and switch to the <strong>Memory</strong> panel.' },
                        { num: '3', title: 'Take Baseline Heap Snapshot (Snapshot 1)', desc: 'Select <strong>Heap snapshot</strong> and click <strong>Take snapshot</strong> after initial page load (<code>Snapshot 1: 5.4 MB · 42,310 objects · 12 detached nodes</code>).' },
                        { num: '4', title: 'Repeat the Action & Take Snapshot 2', desc: 'Open and close the Patient Details dialog 5 times, then click <strong>Take snapshot</strong> again (<code>Snapshot 2: 12.8 MB · 98,765 objects · 457 detached nodes</code>).' },
                        { num: '5', title: 'Compare Snapshots (Comparison View)', desc: 'Select <strong>Snapshot 2</strong>, change the view dropdown from <em>Summary</em> to <strong>Comparison</strong>, and spot <code>Detached HTMLDivElement: +457</code>!' },
                        { num: '6', title: 'Inspect Detached DOM Nodes & Retainers', desc: 'Filter by <code>Detached HTMLDivElement</code>, expand <code>div.modal-container → div.patient-dialog</code>, and check <strong>Retainers</strong>: <code>window.patientDialogs @ 0x11111</code> and <code>(closure) @ 0x22222</code> are keeping closed dialogs in RAM!' },
                        { num: '7', title: 'Allocation Sampling (Function Hotspots)', desc: 'Run <strong>Allocation sampling</strong> to see which function allocates the most memory: <code>openPatientDialog (4.2 MB)</code>, <code>createGrid (2.1 MB)</code>, <code>renderTemplate (1.3 MB)</code>.' },
                        { num: '8', title: 'Memory Usage Before vs. After', desc: 'JS Heap jumps from <strong>5.4 MB (12 detached nodes)</strong> at initial load to <strong>12.8 MB (457 detached nodes)</strong> after just 5 dialogs.' },
                        { num: '9', title: 'Common Causes of Memory Leaks', desc: 'Unremoved event handlers, undestroyed dialogs/widgets, uncleared timers/intervals, global arrays (<code>window.patientDialogs</code>), and closures holding detached DOM nodes.' },
                        { num: '10', title: 'Fix & Verify With a New Snapshot', desc: 'Remove event listeners, clear references from <code>window.patientDialogs</code> on close, dispose the dialog component, and verify Snapshot 3 stays flat at <code>~5.4 MB</code>.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Memory Image)',
                    app: 'ASCWebQI Dashboard · Patient Details Modal Dialog',
                    title: 'Dashboard Grows From 5.4 MB to 12.8 MB (+457 Detached HTMLDivElements) After Opening & Closing Patient Dialog 5 Times',
                    symptom: 'Clinicians who open and close the <strong>Patient Details</strong> modal throughout their shift complain that the dashboard becomes laggy and unresponsive after 20–30 patients.',
                    evidence: 'Comparing <strong>Snapshot 1 (5.4 MB)</strong> and <strong>Snapshot 2 (12.8 MB)</strong> in <strong>Memory → Comparison</strong> shows <code>+457 Detached HTMLDivElement</code> nodes (<code>div.modal-container → div.patient-dialog</code>). The <strong>Retainers</strong> pane points directly to <code>window.patientDialogs</code> and an unremoved event closure.',
                    cause: '<code>openPatientDialog()</code> pushes every created modal DOM element into a global array <code>window.patientDialogs.push(dialogEl)</code> and binds a document keydown listener without cleaning either up when the user clicks <code>Cancel</code> or <code>✕</code>.',
                    fix: 'Remove the global <code>window.patientDialogs</code> cache, use an <code>AbortController</code> for modal event listeners, and call <code>dialogEl.remove()</code> on close so garbage collection frees 100% of the dialog DOM.'
                },
                {
                    type: 'code', lang: 'javascript', label: 'openPatientDialog() — Exact Leak From the Memory Guide Image & Clean Fix', code: `
// ❌ LEAK: Retains div.modal-container > div.patient-dialog in window.patientDialogs & closure
window.patientDialogs = window.patientDialogs || [];
function openPatientDialog(patient) {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML = \`<div class="patient-dialog">...</div>\`;
    document.body.appendChild(modal);

    // 1. Pushed to global array and never removed -> Retainer @ 0x11111
    window.patientDialogs.push(modal);

    // 2. Global listener closure captures 'modal' -> Retainer (closure) @ 0x22222
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') modal.remove(); // Removes from DOM, but listener & array still hold it!
    });
}

// ✅ FIX: Zero retained Detached HTMLDivElements after closing the dialog
function openPatientDialogFixed(patient) {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML = \`<div class="patient-dialog">...</div>\`;
    document.body.appendChild(modal);

    const abortCtrl = new AbortController();
    function closeDialog() {
        abortCtrl.abort(); // Automatically removes all listeners bound with this signal
        modal.remove();    // Removes DOM node with zero remaining JS retainers!
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDialog();
    }, { signal: abortCtrl.signal });

    modal.querySelector('.btn-close')?.addEventListener('click', closeDialog, { signal: abortCtrl.signal });
}`
                }
            ]
        },
        application: {
            sectionTitle: 'Visual Guide, 4-Step Walkthrough & Real-World Lab: Application Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Browser Storage, Cookies & Session Architecture',
                    title: '7. Application — Understand Browser Storage: Where Is the Browser Storing the Application’s Data?',
                    src: 'assets/devtools/application-tab-guide.png',
                    alt: 'Chrome DevTools Application Tab Guide showing Sign In setting auth_token cookie, inspecting Domain/Path/Expiry/Secure/SameSite attributes, cross-referencing with Network Cookie: [missing], and comparing ASP.NET Session vs Session Storage',
                    caption: 'Application Tab Visual Guide — Verifying stored cookies after Sign In, inspecting Domain/Path/Expiry/Secure/SameSite attributes, cross-referencing with Network when Cookie: [missing] occurs, and distinguishing server-side ASP.NET Session from browser Session Storage.',
                    callouts: [
                        { num: '1', title: 'Verify Data Exists After Sign In', desc: 'Click <strong>Sign In</strong>, open <strong>Application → Cookies</strong> (alongside Local Storage, Session Storage, IndexedDB, Cache Storage, Service Workers), and confirm <code>auth_token</code> exists.' },
                        { num: '2', title: 'Inspect Cookie Attributes Carefully', desc: 'Check <code>Domain (samixipus.com)</code>, <code>Path (/)</code>, <code>Expires / Max-Age</code> (watch for expired timestamps or path mismatches!), <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code>.' },
                        { num: '3', title: 'Cross-Reference With Network Headers', desc: 'Compare <strong>Application → Cookies</strong> with the <strong>Dashboard Request</strong> in <strong>Network → Request Headers</strong>, where <code>Cookie: [missing] ❌</code> proves the browser filtered it out.' },
                        { num: '4', title: 'Identify the Issue & ASP.NET Session Note', desc: 'Fix the mismatched <code>Domain</code>, <code>Path</code>, <code>Secure</code>, or <code>SameSite</code> attribute — and never confuse server-side <strong>ASP.NET Session</strong> with browser-side <strong>Session Storage</strong>!' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Application Image)',
                    app: 'Enterprise Portal · Cookie Attribute Mismatch & Session Confusion',
                    title: 'auth_token Exists in Application → Cookies, Yet the Dashboard Request Sends Cookie: [missing]',
                    symptom: 'After clicking <strong>Sign In</strong>, the user sees <code>auth_token</code> stored in the browser, but the request to load the Dashboard fails as unauthenticated (<code>Cookie: [missing]</code>).',
                    evidence: 'In <strong>Application → Cookies</strong>, <code>auth_token</code> is visible, but inspecting its columns reveals a <strong>Path mismatch</strong> (e.g., <code>Path: /auth</code> while the dashboard is at <code>/dashboard</code>) or an expired <code>Expires/Max-Age</code> timestamp.',
                    cause: 'When a cookie is issued without <code>Path=/</code>, the browser defaults the cookie path to the issuing endpoint’s directory (<code>/auth</code>) and refuses to attach it to requests for <code>/dashboard</code> or <code>/api/*</code>.',
                    fix: 'Explicitly set <code>Path = "/"</code>, a valid <code>Domain</code>, <code>HttpOnly = true</code>, <code>Secure = true</code>, and <code>SameSite = SameSiteMode.Lax</code> when issuing the authentication cookie.'
                },
                {
                    type: 'code', lang: 'csharp', label: 'Fixing auth_token Cookie Attributes & Distinguishing ASP.NET Session vs. Browser sessionStorage', code: `
// ✅ 1. Fix Cookie: [missing] on /dashboard by setting Path = "/" and explicit UTC Expiry
Response.Cookies.Append("auth_token", jwtToken, new CookieOptions {
    Path = "/",                                    // Sent to /dashboard, /api/*, and all routes!
    HttpOnly = true,                               // Blocks XSS document.cookie access
    Secure = true,                                 // Sent over HTTPS only
    SameSite = SameSiteMode.Lax,                   // Sent on top-level navigations
    Expires = DateTimeOffset.UtcNow.AddHours(8)    // Always use UTC so client clock skew won't expire it
});

// ✅ 2. Important Concept From Application Image:
// - Server-Side ASP.NET Session (HttpContext.Session.SetString("Role", "Admin"))
//   lives in server memory/Redis; browser only holds the opaque '.AspNetCore.Session' cookie!
// - Browser Session Storage (window.sessionStorage.setItem('wizardStep', '2'))
//   lives in the browser tab and is NEVER sent to the server automatically.`
                }
            ]
        },
        security: {
            sectionTitle: 'Visual Guide, 10-Step Walkthrough & Real-World Lab: Security Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · HTTPS, TLS 1.3 Certificates & Mixed Content',
                    title: 'Chrome DevTools – Security Tab: Inspect Connection Security | Check Certificates | Identify Security Issues',
                    src: 'assets/devtools/security-tab-guide.png',
                    alt: 'Chrome DevTools Security Tab Guide showing https://deepthimagician.netlify.app TLS 1.3 certificate details, Google Trust Services issuer, and Mixed Content HTTP image/script blocking across 10 steps',
                    caption: 'Security Tab Visual Guide — Inspecting https://deepthimagician.netlify.app connection security, verifying the Google Trust Services TLS 1.3 certificate (X25519, TLS_AES_128_GCM_SHA256), and diagnosing blocked HTTP Mixed Content requests.',
                    callouts: [
                        { num: '1', title: 'Verify HTTPS Padlock in Address Bar', desc: 'Confirm the site URL (<code>https://deepthimagician.netlify.app</code>) uses <code>https://</code> and displays the secure connection indicator.' },
                        { num: '2', title: 'Open DevTools (F12) → Security Tab', desc: 'Shows the <strong>Main origin</strong> (<code>https://deepthimagician.netlify.app</code>) and all <strong>Secure origins</strong> contacted (Google Fonts, Analytics, Netlify API).' },
                        { num: '3', title: 'Security Overview Banner', desc: 'Displays the overall transport status: <code>This page is secure (valid HTTPS)</code> — or flags certificate/mixed-content warnings.' },
                        { num: '4', title: 'Certificate — Valid and Trusted', desc: 'Verifies the server TLS certificate is valid, unexpired, and issued by a trusted Certificate Authority (<strong>Google Trust Services</strong>).' },
                        { num: '5', title: 'Connection — Secure (TLS 1.3)', desc: 'Confirms the connection is encrypted and authenticated using modern <strong>TLS 1.3</strong> rather than deprecated TLS 1.0/1.1.' },
                        { num: '6', title: 'Resources — All Served Securely', desc: 'Confirms every sub-resource (CSS, JS, images, fonts, API calls) on the page was loaded over HTTPS.' },
                        { num: '7', title: 'Mixed Content Example (HTTP on HTTPS)', desc: 'When an HTTPS page requests HTTP assets (<code>Mixed content - 2 requests</code>), Chrome flags/blocks <code>http://example.com/image.jpg</code> and blocks active scripts like <code>http://example.com/script.js</code>.' },
                        { num: '8', title: 'View Certificate (Subject, Issuer & Validity)', desc: 'Click <strong>View certificate</strong> to inspect <code>CN: deepthimagician.netlify.app</code>, <code>Issuer: WR2 (Google Trust Services)</code>, Validity dates, and SHA-256 fingerprints.' },
                        { num: '9', title: 'Connection Details (Cryptographic Suite)', desc: 'Open the <strong>Details</strong> tab in the Certificate Viewer to verify <code>Protocol: TLS 1.3</code>, <code>Key Exchange: X25519</code>, <code>Cipher Suite: TLS_AES_128_GCM_SHA256</code>, and <code>OCSP Stapling: Yes</code>.' },
                        { num: '10', title: 'Security Checklist & Important Scope Note', desc: 'Verify HTTPS, valid cert, TLS 1.2/1.3, and zero mixed content — while remembering DevTools inspects browser-visible transport security, not backend SQLi/auth logic.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Security Image)',
                    app: 'deepthimagician.netlify.app & Enterprise HTTPS Migration',
                    title: 'Page Loads Over HTTPS (TLS 1.3), But Mixed Content Blocks Scripts andTriggers "Not Secure" Warnings',
                    symptom: 'After deploying a web portal to HTTPS, the TLS 1.3 certificate is valid, yet the padlock disappears and a widget fails to initialize because its script and banner image are blocked.',
                    evidence: 'Opening the <strong>Security</strong> tab shows <code>Certificate - valid and trusted</code> and <code>Connection - secure (TLS 1.3)</code>, but under <strong>Resources</strong> it flags <code>Mixed content - 2 requests</code>: <code>http://example.com/image.jpg</code> and <code>http://example.com/script.js</code>.',
                    cause: 'Hardcoded <code>http://</code> URLs in Razor views or database records force the HTTPS page to request insecure sub-resources, which Chrome blocks as Mixed Content.',
                    fix: 'Update all resource URLs to <code>https://</code> (or relative paths), enable <code>app.UseHttpsRedirection()</code> and <code>app.UseHsts()</code>, and add the <code>Content-Security-Policy: upgrade-insecure-requests</code> header.'
                },
                {
                    type: 'code', lang: 'html', label: 'Fixing Mixed Content (http://example.com/image.jpg & script.js) Shown in the Security Guide Image', code: `
<!-- ❌ INSECURE (Triggers "Mixed content - 2 requests" in Security Tab): -->
<img src="http://example.com/image.jpg" alt="Banner">
<script src="http://example.com/script.js"></script>

<!-- ✅ SECURE (All resources served over HTTPS + automatic upgrade-insecure-requests header): -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<img src="https://example.com/image.jpg" alt="Banner">
<script src="https://example.com/script.js" defer></script>`
                }
            ]
        },
        lighthouse: {
            sectionTitle: 'Visual Guide, 5-Step Walkthrough & Real-World Lab: Lighthouse Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Automated Quality & Web Vitals Auditing',
                    title: '9. Lighthouse — Audit and Improve the Experience: How Can We Systematically Assess Website Quality?',
                    src: 'assets/devtools/lighthouse-tab-guide.png',
                    alt: 'Chrome DevTools Lighthouse Tab Guide showing Dashboard audit raising Performance from 52 to 90+ by eliminating render-blocking resources and serving next-gen images',
                    caption: 'Lighthouse Tab Visual Guide — Running an automated page-load audit on the Dashboard (Performance 52, Accessibility 84, Best Practices 91, SEO 96), fixing render-blocking resources (-1.2s) and next-gen image formats (-0.8s), and re-testing to achieve 90+ across all categories.',
                    callouts: [
                        { num: '1', title: 'Run an Audit (Analyze Page Load)', desc: 'Open the <strong>Lighthouse</strong> panel on the Dashboard, choose Mode (Navigation), Device (Mobile/Desktop), and Categories, then click <strong>Analyze page load</strong>.' },
                        { num: '2', title: 'Inspect Score Diagnostics (52 / 84 / 91 / 96)', desc: 'Review the four category scores — <strong>Performance (52)</strong>, <strong>Accessibility (84)</strong>, <strong>Best Practices (84/91)</strong>, <strong>SEO (96)</strong> — and expand the failing checks.' },
                        { num: '3', title: 'Investigate High-Impact Opportunities', desc: 'Prioritize opportunities with the largest estimated time savings: <strong>Eliminate render-blocking resources (Save 1.2s)</strong> and <strong>Serve images in next-gen formats (Save 0.8s)</strong>.' },
                        { num: '4', title: 'Implement Fixes & Retest', desc: 'Add <code>defer</code> to non-critical scripts, inline critical CSS, convert heavy PNG/JPEG images to WebP/AVIF, fix ARIA/contrast issues, and click <strong>re-run</strong>.' },
                        { num: '5', title: 'Assess the Results (All 90+ Green)', desc: 'Verify all four category rings reach <strong>90+</strong> — while keeping in mind that an audit score is a diagnostic signal, not a guarantee of full WCAG compliance or security.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Lighthouse Image)',
                    app: 'Enterprise Dashboard · Performance 52 → 92 Optimization',
                    title: 'Raising a Slow Dashboard From Performance 52 & Accessibility 84 to 90+ Across All Four Categories',
                    symptom: 'Stakeholders report the main Dashboard takes over 4 seconds to paint on standard laptops and scores <strong>52 in Performance</strong> and <strong>84 in Accessibility</strong>.',
                    evidence: '<strong>Lighthouse → Opportunities</strong> pinpoints two concrete bottlenecks: <code>Eliminate render-blocking resources (Save 1.2s)</code> and <code>Serve images in next-gen formats (Save 0.8s)</code>, plus missing form labels and low-contrast badges.',
                    cause: 'Heavy synchronous <code>&lt;script&gt;</code> tags in <code>&lt;head&gt;</code> block first paint for 1.2s, and uncompressed PNG hero/chart graphics delay Largest Contentful Paint (LCP) by 0.8s.',
                    fix: 'Move non-critical scripts to <code>defer</code>, preload the WebP hero image with <code>fetchpriority="high"</code>, enable Brotli/Gzip response compression in ASP.NET Core, and add explicit <code>aria-label</code> attributes.'
                },
                {
                    type: 'code', lang: 'html', label: 'Fixing the 2 Opportunities From the Lighthouse Image (-1.2s Render-Blocking & -0.8s Next-Gen WebP)', code: `
<!-- ❌ BEFORE (Lighthouse Performance: 52 — Render-blocking JS + 1.4 MB PNG): -->
<head>
    <script src="/lib/chart-bundle.js"></script> <!-- Blocks HTML parsing for 1.2s -->
</head>
<body>
    <img src="/images/dashboard-overview.png">   <!-- Uncompressed PNG (+0.8s) & missing dimensions/alt -->
</body>

<!-- ✅ AFTER (Lighthouse Performance: 94 — Deferred JS + Next-Gen WebP/AVIF with explicit dimensions): -->
<head>
    <link rel="preload" as="image" href="/images/dashboard-overview.webp" fetchpriority="high">
    <script src="/lib/chart-bundle.js" defer></script> <!-- Zero render blocking (-1.2s saved) -->
</head>
<body>
    <picture>
        <source srcset="/images/dashboard-overview.avif" type="image/avif">
        <source srcset="/images/dashboard-overview.webp" type="image/webp">
        <img src="/images/dashboard-overview.png" width="1200" height="640"
             fetchpriority="high" alt="ASCWebQI Clinical Quality Dashboard Overview">
    </picture>
</body>`
                }
            ]
        },
        recorder: {
            sectionTitle: 'Visual Guide, 10-Step Walkthrough & Real-World Lab: Recorder Tab',
            blocks: [
                {
                    type: 'infographic',
                    badge: 'Official Visual Guide · Capture, Replay, Edit & Export User Flows',
                    title: 'Chrome DevTools – Recorder Tab: Capture and Replay User Workflows | Create, Edit and Export Recordings',
                    src: 'assets/devtools/recorder-tab-guide.png',
                    alt: 'Chrome DevTools Recorder Tab Guide showing ASCWebQI Patients search workflow recording 10 steps, editing selectors, replaying, and exporting JSON for Playwright across 10 panels',
                    caption: 'Recorder Tab Visual Guide — Capturing the 10-step ASCWebQI "Search and Open Patient" workflow (Patient Name: John, Date Range: 01-01-2026 to 31-01-2026, Status: Active → Search → View row 123), editing selectors, replaying automatically, and exporting JSON for Playwright.',
                    callouts: [
                        { num: '1', title: 'Start a Workflow on ASCWebQI Patients', desc: 'Enter search criteria (<code>Patient Name: John</code>, <code>Date Range: 01-01-2026 to 31-01-2026</code>, <code>Status: Active</code>), click <strong>Search</strong>, and click <strong>View</strong> on row <code>123 John Doe</code>.' },
                        { num: '2', title: 'Open the Recorder Tab', desc: 'Press <code>F12</code> and select the <strong>Recorder</strong> tab (or open via <code>⋮ → More tools → Recorder</code>).' },
                        { num: '3', title: 'Click Start Recording', desc: 'Click <strong>Start recording</strong> and perform the complete Patient Search &amp; View workflow in the application.' },
                        { num: '4', title: 'Click Stop When Completed', desc: 'Click <strong>Stop</strong> as soon as the patient details view finishes loading.' },
                        { num: '5', title: 'Review the 10 Recorded Steps', desc: 'Every interaction is captured in order: <code>1. Navigate to "/patients"</code> → <code>2–3. Fill "John"</code> → <code>4–7. Fill Date Range</code> → <code>8. Select "Active"</code> → <code>9. Click "Search"</code> → <code>10. Click "View"</code>.' },
                        { num: '6', title: 'Edit a Step (Refine Action, Selector, Value)', desc: 'Click the pencil icon on Step 2 (<code>Click input[placeholder="Patient Name"]</code>) to customize the <strong>Action</strong>, make the <strong>Selector</strong> resilient, or change the test <strong>Value</strong>.' },
                        { num: '7', title: 'Replay the Recording Automatically', desc: 'Click <strong>▶ Replay</strong> (or debug step-by-step with <strong>Step over</strong> / <strong>Step into</strong>) to watch Chrome execute the entire 10-step flow automatically.' },
                        { num: '8', title: 'Export or Share (Save to JSON)', desc: 'Open the <code>⋮</code> menu → <strong>Export recording</strong> → <strong>Save to file (JSON)</strong> or <strong>Copy as JSON</strong> to attach to a Jira/Azure DevOps ticket.' },
                        { num: '9', title: 'Recorded JSON Sample & Playwright Ready', desc: 'Inspect the exported JSON (<code>"title": "Search and Open Patient"</code>) and import or convert it directly into an automated <strong>Playwright</strong> E2E test script.' },
                        { num: '10', title: 'Real-World QA Use Case, Benefits & Limitations', desc: 'Ideal for repeatable QA smoke tests after every build and sharing exact bug reproductions with developers; pair with Playwright for full CI/CD assertions.' }
                    ]
                },
                {
                    type: 'realworld',
                    badge: 'Real-World Lab (From Recorder Image)',
                    app: 'ASCWebQI · Patients Search & View Workflow',
                    title: 'Automating the 10-Step "Search and Open Patient (John Doe)" QA Regression Flow & Exporting to Playwright',
                    symptom: 'QA engineers spend 15 minutes after every deployment manually typing <em>John</em>, <em>01-01-2026</em>, <em>31-01-2026</em>, selecting <em>Active</em>, clicking <em>Search</em>, and opening row <em>123 John Doe</em> — and when a regression occurs, developers struggle to reproduce the exact filter combination.',
                    evidence: 'Using <strong>Recorder</strong>, QA captures all 10 steps in 28 seconds, edits Step 2’s selector for stability, verifies it with <strong>▶ Replay</strong>, and exports <code>search-and-open-patient.json</code>.',
                    cause: 'Manual multi-field search testing is repetitive and error-prone without a shareable, replayable browser workflow artifact.',
                    fix: 'Share the exported Recorder JSON for one-click developer replay in Chrome, and convert the 10 steps into an automated C# / TypeScript <strong>Playwright</strong> test in Azure DevOps CI/CD.'
                },
                {
                    type: 'code', lang: 'json', label: 'Exact Recorded JSON From the Recorder Guide Image ("Search and Open Patient")', code: `
{
  "title": "Search and Open Patient",
  "steps": [
    { "type": "navigate", "url": "/patients" },
    { "type": "click", "selector": "input[placeholder=\\"Patient Name\\"]" },
    { "type": "fill",  "selector": "input[placeholder=\\"Patient Name\\"]", "text": "John" },
    { "type": "click", "selector": "input[name=\\"dateFrom\\"]" },
    { "type": "fill",  "selector": "input[name=\\"dateFrom\\"]", "text": "01-01-2026" },
    { "type": "click", "selector": "input[name=\\"dateTo\\"]" },
    { "type": "fill",  "selector": "input[name=\\"dateTo\\"]", "text": "31-01-2026" },
    { "type": "select", "selector": "select[name=\\"status\\"]", "value": "Active" },
    { "type": "click", "selector": "button:text(\\"Search\\")" },
    { "type": "click", "selector": "table tbody tr:first-child button:text(\\"View\\")" }
  ]
}`
                },
                {
                    type: 'code', lang: 'csharp', label: 'Converting the Recorder Workflow into an Automated C# Playwright Test', code: `
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

[TestFixture]
public class PatientSearchWorkflowTests : PageTest
{
    [Test]
    public async Task SearchAndOpenPatient_JohnDoe_OpensPatientRecord()
    {
        // Steps 1–3: Navigate to /patients and fill Patient Name "John"
        await Page.GotoAsync("https://localhost:443/patients");
        await Page.GetByPlaceholder("Patient Name").FillAsync("John");

        // Steps 4–8: Fill Date Range (01-01-2026 to 31-01-2026) and Status "Active"
        await Page.Locator("input[name='dateFrom']").FillAsync("01-01-2026");
        await Page.Locator("input[name='dateTo']").FillAsync("31-01-2026");
        await Page.Locator("select[name='status']").SelectOptionAsync("Active");

        // Steps 9–10: Click Search and click View on first row (123 John Doe)
        await Page.GetByRole(AriaRole.Button, new() { Name = "Search" }).ClickAsync();
        await Page.Locator("table tbody tr:first-child").GetByRole(AriaRole.Button, new() { Name = "View" }).ClickAsync();

        // Assert patient details dialog/page opened for John Doe
        await Expect(Page.Locator(".patient-details-header")).ToContainTextAsync("John Doe");
    }
}`
                }
            ]
        }
    };

    function lesson(d) {
        var s = [];
        var vg = VISUAL_GUIDES[d.short.toLowerCase()];
        if (vg) {
            s.push({ icon: '📸', title: vg.sectionTitle, open: true, blocks: vg.blocks });
        }
        s.push({ icon: '📖', title: 'Additional Enterprise Case Study & Context', open: !vg, blocks: [{ type: 'story', paras: d.story }].concat(d.storyExtra || []) });
        s.push({ icon: '🧭', title: 'What is this tab and where to click', open: true, blocks: [
            { type: 'prose', html: '<h3>What is it?</h3>' + d.what + '<h3>Where to click</h3>' + d.where }
        ].concat(d.whereExtra || []) });
        s.push({ icon: '🖥️', title: 'Understand the screen (Sub-panels & Controls)', open: true, blocks: [{ type: 'panels', items: d.screen }].concat(d.screenExtra || []) });
        s.push({ icon: '🔍', title: 'Step-by-step practical debugging workflow', open: true, blocks: [{ type: 'steps', items: d.steps }].concat(d.stepsExtra || []) });
        if (d.code) s.push({ icon: '💻', title: 'Full-stack code examples (JS, Razor & C# / ASP.NET Core)', open: true, blocks: d.code });
        s.push({ icon: '🧪', title: 'What the evidence means (Diagnostic Matrix)', open: true, blocks: d.evidence });
        (d.extraSections || []).forEach(function (x) { s.push(x); });
        s.push({ icon: '⚠️', title: 'Common mistakes & how to avoid them', blocks: [{ type: 'mistakes', items: d.mistakes }] });
        s.push({ icon: '📒', title: 'Notebook summary', open: true, blocks: [{ type: 'notebook', items: d.notebook }] });
        s.push({ icon: '🎤', title: 'Interview questions (Junior, Senior & Tech Lead)', blocks: [{ type: 'interview', junior: d.interview[0], senior: d.interview[1], lead: d.interview[2] }] });
        s.push({ icon: '🧠', title: 'Interactive quiz', open: true, blocks: [{ type: 'quiz', questions: d.quiz }] });
        return { short: d.short, icon: d.icon, title: d.title, tooltip: d.tooltip, badges: d.badges, tagline: d.tagline, sections: s };
    }
    function Q(q, options, answer, explain) { return { q: q, options: options, answer: answer, explain: explain }; }

    /* =====================================================================
       2. CONSOLE
       ===================================================================== */
    L.console = lesson({
        short: 'Console', icon: '💬', title: 'Console — Errors, Logs and Live JavaScript',
        tooltip: 'Errors, warnings, logs, stack traces, expressions, filtering',
        badges: ['JavaScript', 'Errors', 'Logging', 'jQuery / Kendo'],
        tagline: 'The Console is both a <strong>log viewer</strong> (errors, warnings, your <code>console.log</code> output) and a <strong>JavaScript REPL</strong> running inside the page.',
        story: [
            'After upgrading jQuery in ASCWebQI, the Indicators page loads but the Kendo grid stays empty. No server error is logged in Application Insights.',
            'Ravi opens the Console and sees a red line: <code>Uncaught TypeError: $(...).kendoGrid is not a function at qiDashboard.js:14</code>. The server is fine — the browser never even made the data request.'
        ],
        what: '<p>The Console shows messages produced by the page and by the browser: JavaScript exceptions, failed network requests, CSP and mixed-content violations, deprecation warnings, and anything your code writes with <code>console.*</code>. You can also type JavaScript that runs in the page\'s context — read variables, call functions, query the DOM.</p>',
        where: '<ul><li>Press <code>Ctrl+Shift+J</code> (Cmd+Option+J) to open DevTools straight on Console.</li><li>Or click the <strong>Console</strong> tab. Press <code>Esc</code> in any other tab to open the Console <strong>drawer</strong> underneath — handy while in Elements or Network.</li><li>The red/yellow counters in the DevTools top-right corner jump to errors/warnings.</li></ul>',
        screen: [
            ['🚫', 'Clear console', '<code>Ctrl+L</code>. Tick ⚙ <strong>Preserve log</strong> to keep messages across page navigations (vital for login redirects).'],
            ['🎯', 'JavaScript context', 'Dropdown showing <code>top</code>. Switch to an <code>iframe</code> (e.g. a report viewer) or extension context.'],
            ['🔎', 'Filter', 'Text or regex (<code>/api|grid/</code>), <code>-url:chrome-extension</code> to hide extension noise, <code>url:qiDashboard.js</code>.'],
            ['📶', 'Log levels', 'Verbose, Info, Warnings, Errors. <code>console.debug</code> only appears with Verbose ticked.'],
            ['📁', 'Sidebar', 'Groups messages by source file and by type (errors, warnings, user messages).'],
            ['👁️', 'Live expressions', 'The eye icon pins an expression (e.g. <code>document.activeElement</code>) that re-evaluates continuously.'],
            ['⚙️', 'Settings', 'Hide network, Log XMLHttpRequests, Selected context only, Group similar messages, Eager evaluation, Autocomplete from history.'],
            ['📜', 'Stack trace', 'Expand a red error ▶ to see the call stack. Each line links to Sources.']
        ],
        steps: [
            'Reproduce the problem with the Console open. Tick <strong>Preserve log</strong> if the page navigates.',
            'Set level to <strong>Errors</strong> and filter out extensions (<code>-url:chrome-extension</code>) to focus on your app.',
            'Read the <strong>first</strong> error, not the last — later errors are often consequences of the first.',
            'Expand ▶ to see the stack. Click the top <em>application</em> frame (<code>qiDashboard.js:14</code>) to open it in Sources.',
            'In the Console, test a hypothesis: <code>typeof $.fn.kendoGrid</code> → <code>"undefined"</code>. <code>$.fn.jquery</code> → <code>"3.7.1"</code>. Two jQuery copies are loaded: Kendo registered itself on the old one.',
            'Check Network → JS filter to confirm both <code>jquery-1.12.4.min.js</code> and <code>jquery-3.7.1.min.js</code> are requested.',
            'Fix the layout/bundle so only one jQuery loads before Kendo; reload and confirm the Console is clean.'
        ],
        code: [
            { type: 'code', lang: 'javascript', label: 'Useful console APIs', code: `
console.log("rows", rows);              // general output
console.info / warn / error(...)        // levels (error includes stack)
console.table(rows, ["Id", "Score"]);   // tabular view of arrays
console.group("Save"); ... console.groupEnd();
console.time("load"); ... console.timeEnd("load");   // load: 312 ms
console.count("refresh");               // refresh: 3
console.assert(rows.length > 0, "No rows!");
console.trace();                        // print the current stack
console.dir($0);                        // object view of a DOM node` },
            { type: 'code', lang: 'javascript', label: 'Console utilities (only work when typed in the Console)', code: `
$0                     // currently selected element in Elements
$("#btnSave")          // querySelector (unless the page defines $ e.g. jQuery)
$$(".k-grid tr")       // querySelectorAll -> real array
copy(JSON.stringify(rows))   // copy to clipboard
monitorEvents(window, "resize"); unmonitorEvents(window);
getEventListeners($0)  // listeners on an element
debug(saveIndicators)  // pause when the function is called
queryObjects(Promise)  // live instances of a constructor
$_                     // last evaluated result` },
            { type: 'code', lang: 'cshtml', label: 'Bug: duplicate jQuery in _Layout.cshtml', code: `
<script src="~/lib/jquery/jquery-1.12.4.min.js"></script>
<script src="~/lib/kendo/kendo.all.min.js"></script>   @* attaches to 1.12 *@
@RenderSection("scripts", required: false)
@* A view adds a second jQuery which replaces window.$ — kendoGrid is gone *@
<script src="~/lib/jquery/jquery-3.7.1.min.js"></script>` }
        ],
        evidence: [
            { type: 'table', head: ['Console message', 'Usually means', 'Look next'], rows: [
                ['<code>Uncaught TypeError: x is not a function</code>', 'Script load order, duplicate library, or typo', 'Network → JS; Sources at the line'],
                ['<code>Uncaught ReferenceError: x is not defined</code>', 'Script not loaded, wrong scope, or bundling removed it', 'Network status of the script (404?)'],
                ['<code>Failed to load resource: 404</code>', 'Wrong path, often <code>~/</code> or virtual directory issues on IIS', 'Network → Headers → Request URL'],
                ['<code>Access to fetch … blocked by CORS policy</code>', 'API did not return the required <code>Access-Control-Allow-Origin</code>', 'Network → response headers; ASP.NET Core CORS policy'],
                ['<code>Mixed Content</code>', 'HTTPS page loading HTTP resource', 'Security tab (Lesson 8)'],
                ['<code>Uncaught (in promise)</code>', 'A rejected promise without <code>.catch</code> / try-catch', 'Sources with "Pause on caught exceptions"'],
                ['Yellow deprecation warning', 'Works now, will break in a future Chrome', 'Plan a fix; not the cause of today\'s bug (usually)']
            ] },
            { type: 'callout', kind: 'warn', title: 'Symptom vs root cause', html: '<p>The red line tells you <em>where</em> JavaScript failed, not always <em>why</em>. "kendoGrid is not a function" points at line 14, but the root cause is in <code>_Layout.cshtml</code> load order. Always ask "what state made this line fail?"</p>' }
        ],
        mistakes: [
            ['Reading only the last error.', 'Start with the first error; later ones cascade from it.'],
            ['Forgetting Preserve log during redirects.', 'Without it, the Console clears on navigation and the error is lost.'],
            ['Leaving <code>console.log</code> with tokens or personal data in production.', 'Remove logs or use a logger that strips them in release builds.'],
            ['Assuming <code>$</code> is jQuery in the Console.', 'If the page has no jQuery, <code>$</code> is DevTools\' querySelector. Check <code>$.fn</code>.'],
            ['Hiding all warnings permanently.', 'Use filters per session; warnings like CSP or mixed content can be the actual bug.'],
            ['Logging objects and reading them later.', 'Logged objects are live references; expand later and you see the current state. Log <code>JSON.stringify(obj)</code> for a snapshot.']
        ],
        notebook: [
            '<code>Ctrl+Shift+J</code> opens Console; <code>Esc</code> toggles the drawer anywhere.',
            'Read the <strong>first</strong> red error and expand its stack.',
            'Preserve log for redirects; filter <code>-url:chrome-extension</code>.',
            '<code>console.table</code>, <code>time</code>, <code>group</code>, <code>trace</code> beat plain <code>log</code>.',
            'Utilities: <code>$0</code>, <code>$$</code>, <code>copy()</code>, <code>getEventListeners()</code>, <code>debug(fn)</code>.',
            'Logged objects are live — stringify for snapshots.',
            'Console error = where; Sources + Network = why.'
        ],
        interview: [
            [['How do you keep Console messages after the page navigates?', 'Enable Preserve log in Console settings.'],
             ['What is the difference between console.log and console.error?', 'Level/filtering and styling; console.error also shows a stack trace and counts as an error.'],
             ['What does $0 mean?', 'The element currently selected in the Elements panel.']],
            [['A page shows "Uncaught (in promise)". What does that tell you?', 'A Promise rejected with no handler. Add try/catch around await or .catch(), and use Sources to pause on exceptions to find the origin.'],
             ['Why might a logged object show different values when expanded later?', 'The Console keeps a live reference; expansion reads current values. Snapshot with JSON.stringify or structuredClone.'],
             ['How do you hide noise from browser extensions?', 'Filter with -url:chrome-extension, or test in a guest/Incognito profile without extensions.']],
            [['How would you capture client-side errors from production users?', 'Global window.onerror and unhandledrejection handlers sending to Application Insights JS SDK or Sentry, with source maps uploaded privately and PII scrubbing.'],
             ['Policy on console logging in a large team?', 'Lint rule disallowing console in committed code except via a logger wrapper; log levels configurable per environment; never log tokens or personal data.']]
        ],
        quiz: [
            Q('Which shortcut opens DevTools directly on the Console (Windows)?', ['Ctrl+Shift+C', 'Ctrl+Shift+J', 'Ctrl+U', 'F5'], 1, 'Ctrl+Shift+J opens Console; Ctrl+Shift+C opens the element picker.'),
            Q('A login redirect clears the Console before you can read the error. What do you enable?', ['Selected context only', 'Preserve log', 'Eager evaluation', 'Group similar'], 1, 'Preserve log keeps messages across navigations.'),
            Q('Five red errors appear. Which do you investigate first?', ['The last one', 'The first one', 'The longest one', 'Any — they are independent'], 1, 'The first error often causes the rest.'),
            Q('<code>$.fn.kendoGrid</code> is undefined after a jQuery upgrade. Most likely cause?', ['Server returned 500', 'Two jQuery versions loaded; Kendo attached to the other one', 'CSS bundle missing', 'Cookie expired'], 1, 'A second jQuery replaces window.$ and loses plugins registered on the first.'),
            Q('Which call prints an array of objects as a sortable table?', ['console.dir', 'console.table', 'console.group', 'console.count'], 1, 'console.table renders rows and columns.')
        ]
    });

    /* =====================================================================
       3. SOURCES
       ===================================================================== */
    L.sources = lesson({
        short: 'Sources', icon: '📂', title: 'Sources — Breakpoints and Stepping Through JavaScript',
        tooltip: 'Breakpoints, conditional breakpoints, stepping, Call Stack, Scope, Watch, source maps, async',
        badges: ['Debugger', 'Breakpoints', 'Async/await', 'Source maps'],
        tagline: 'Sources is Chrome\'s <strong>JavaScript debugger</strong> — the browser equivalent of Visual Studio breakpoints, F10/F11 stepping, Locals and Watch windows.',
        story: [
            'In ASCWebQI, the "Overall score" shows <code>NaN%</code> for some facilities only. The API JSON looks correct in Network.',
            'Meera sets a <strong>conditional breakpoint</strong> on the score calculation that pauses only when <code>isNaN(total)</code>. On the third facility it pauses; Scope shows <code>row.weight</code> is the string <code>"0,5"</code> — a European-formatted number from a culture-specific serializer. The bug is in the API\'s formatting, not the JavaScript math.'
        ],
        what: '<p>Sources lets you browse every script, stylesheet and document the page loaded, set breakpoints, pause execution, inspect variables, step line by line and edit code locally. If you have used the Visual Studio debugger, the concepts map one-to-one.</p>',
        where: '<ul><li>Click the <strong>Sources</strong> tab.</li><li><code>Ctrl+P</code> (Cmd+P) → type a file name (<code>qiDash</code>) to open it.</li><li><code>Ctrl+Shift+F</code> searches across all loaded sources.</li><li><code>Ctrl+Shift+O</code> jumps to a function in the open file.</li></ul>',
        whereExtra: [{ type: 'table', head: ['Visual Studio', 'Chrome Sources', 'Shortcut'], rows: [
            ['Continue (F5)', 'Resume script execution', '<code>F8</code> / <code>Ctrl+\\</code>'],
            ['Step Over (F10)', 'Step over next function call', '<code>F10</code>'],
            ['Step Into (F11)', 'Step into next function call', '<code>F11</code>'],
            ['Step Out (Shift+F11)', 'Step out of current function', '<code>Shift+F11</code>'],
            ['Locals / Autos', 'Scope', '—'],
            ['Watch', 'Watch', '—'],
            ['Call Stack', 'Call Stack', '—']
        ] }],
        screen: [
            ['🗂️', 'Navigator (left)', '<strong>Page</strong> (files grouped by origin), <strong>Workspace</strong> (map to local folder), <strong>Overrides</strong> (persist local edits), <strong>Snippets</strong> (saved scripts).'],
            ['📝', 'Editor (centre)', 'Click a line number to add a breakpoint (blue marker). Right-click for conditional breakpoint or logpoint. <code>{ }</code> pretty-prints minified code.'],
            ['⏯️', 'Debugger toolbar', 'Resume, step over, into, out, step, deactivate breakpoints, pause on exceptions.'],
            ['👁️', 'Watch', 'Expressions re-evaluated at every pause, e.g. <code>rows.length</code>, <code>total / count</code>.'],
            ['📚', 'Call Stack', 'How execution reached this line. Click a frame to view its code and scope. Async frames are shown below an "async" separator.'],
            ['🔬', 'Scope', 'Local, Closure, Script, Global variables at the current frame. Double-click a value to change it.'],
            ['🔴', 'Breakpoints', 'All line breakpoints with checkboxes; plus XHR/fetch, DOM, Global listeners and Event listener breakpoints sections.'],
            ['⚡', 'Event Listener Breakpoints', 'Pause on any <code>click</code>, <code>submit</code>, <code>keydown</code>, timer, etc. when you do not know which file handles it.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Illustration of the Sources debugger paused at line 22 of qiDashboard.js with the Call Stack showing calculateScore, renderSummary, onDataBound and an async boundary, and Scope showing row.weight equals the string 0,5.',
              caption: 'Figure 1 — A paused breakpoint with Call Stack and Scope (illustration).',
              html: '<div class="dt-mock"><div class="dt-mock-bar"><span>Elements</span><span>Console</span><span class="on">Sources</span><span>Network</span></div><div class="dt-mock-split">' +
                    '<pre class="dt-mock-code">20  function calculateScore(row) {\n21    var w = row.weight;\n<mark>22    total += row.value * w;</mark>   ⏸ Paused\n23    count++;\n24  }</pre>' +
                    '<div class="dt-mock-side"><b>Call Stack</b><div>▶ calculateScore  qiDashboard.js:22</div><div>renderSummary  qiDashboard.js:40</div><div>onDataBound  qiDashboard.js:61</div><div class="dt-muted">— async —</div><div>(anonymous)  kendo.all.min.js</div><b style="margin-top:.5rem;display:block">Scope › Local</b><div>row.value: 82</div><div>w: <span style="color:#b91c1c">"0,5"</span></div><div>total: NaN</div></div></div></div>' }
        ],
        steps: [
            '<code>Ctrl+P</code> → open <code>qiDashboard.js</code>. If it is minified, click <code>{ }</code> or rely on the source map to show the original.',
            'Right-click line 22 → <strong>Add conditional breakpoint</strong> → <code>isNaN(row.value * row.weight)</code>. An orange marker appears.',
            'Reload the grid. Execution pauses only for the bad row.',
            'Inspect <strong>Scope → Local</strong>: <code>w = "0,5"</code> (a string). Add a <strong>Watch</strong>: <code>typeof row.weight</code>.',
            'Walk up the <strong>Call Stack</strong> to <code>onDataBound</code> and check the raw <code>e.sender.dataSource.data()</code>.',
            'Prefer a <strong>logpoint</strong> (right-click → Add logpoint: <code>"row", row.id, row.weight</code>) when you want a log without pausing or editing code.',
            'Press <code>F8</code> to resume. Fix the API serialization (invariant culture, numeric type) and verify.'
        ],
        stepsExtra: [{ type: 'callout', kind: 'tip', title: 'Pause on exceptions', html: '<p>Click the ⏸ hexagon icon (or in Breakpoints sidebar) and tick <strong>Pause on uncaught exceptions</strong>; add <strong>caught</strong> when a library swallows errors in try/catch. You land exactly where the error is thrown.</p>' }],
        code: [
            { type: 'code', lang: 'javascript', label: 'Async code: the Call Stack keeps async frames', code: `
async function saveIndicators() {
    const rows = collectRows();
    const res = await fetch("/api/indicators", {       // breakpoint here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows)
    });
    if (!res.ok) throw new Error("Save failed " + res.status);  // and here
    return res.json();
}
// When paused after 'await', Call Stack shows:
//   saveIndicators (async)  <- await fetch
//   onSaveClick             <- the click handler that started it` },
            { type: 'code', lang: 'javascript', label: 'debugger statement and XHR/fetch breakpoints', code: `
function calculateScore(row) {
    if (row.id === 1042) debugger;   // pauses only when DevTools is open
    ...
}
// Breakpoints sidebar -> XHR/fetch Breakpoints -> + "api/indicators"
// pauses whenever a request URL contains that text` },
            { type: 'code', lang: 'csharp', label: 'Server-side root cause (ASP.NET)', code: `
// BAD: formats with the thread culture (de-DE -> "0,5")
Weight = indicator.Weight.ToString()

// GOOD: send a number; let System.Text.Json serialize invariantly
public decimal Weight { get; set; }` },
            { type: 'callout', kind: 'info', title: 'Source maps', html: '<p>Bundlers (Webpack, Vite, BundlerMinifier, WebOptimizer) can emit <code>.map</code> files. Chrome then shows original files and lets you set breakpoints in them. Enable in ⚙ Settings → <em>Enable JavaScript source maps</em>. Decide deliberately whether to publish maps in production (they reveal source); many teams upload them only to their error tracker.</p>' }
        ],
        evidence: [
            { type: 'prose', html: '<ul><li><strong>Breakpoint never hits</strong> → the code never runs (handler not bound, wrong file version cached, or the line is in a different bundle). Check Event Listeners and Network → Disable cache.</li><li><strong>Grey/hollow breakpoint</strong> → the line has no executable code or the source map does not match.</li><li><strong>Variable is <code>undefined</code> in Scope</strong> → check the Closure scope; it may be shadowed or not yet assigned.</li><li><strong>Value correct in Network, wrong in Scope</strong> → transformation in your JS. <strong>Wrong in Network</strong> → server problem.</li></ul>' }
        ],
        mistakes: [
            ['Adding <code>console.log</code> everywhere and redeploying.', 'Use logpoints and conditional breakpoints — no code change needed.'],
            ['Stepping into jQuery/Kendo internals for minutes.', 'Add library scripts to the ignore list; step over them.'],
            ['Debugging stale code.', 'Tick Network → Disable cache while DevTools is open, or hard reload.'],
            ['Forgetting breakpoints are still active.', 'Use "Deactivate breakpoints" (<code>Ctrl+F8</code>) or remove them in the Breakpoints pane.'],
            ['Leaving <code>debugger;</code> in committed code.', 'Lint rule <code>no-debugger</code>.']
        ],
        notebook: [
            'F8 resume · F10 over · F11 into · Shift+F11 out.',
            'Conditional breakpoints pause only when needed; logpoints log without pausing.',
            'Scope = Locals; Watch = Watch; Call Stack shows async frames.',
            'Pause on exceptions finds the throw site.',
            'XHR/fetch and Event Listener breakpoints when you do not know the file.',
            'Source maps show original code; ignore-list libraries.',
            'Never hits? → code not running or cached.'
        ],
        interview: [
            [['What is a conditional breakpoint?', 'A breakpoint that pauses only when an expression is true.'],
             ['How do you open a file quickly in Sources?', 'Ctrl+P and type the file name.'],
             ['What does Step Over do?', 'Runs the next line, executing any function call without stepping inside it.']],
            [['How do you debug async/await code?', 'Breakpoints after await; Call Stack shows async frames; pause on caught/uncaught exceptions for rejected promises.'],
             ['A breakpoint in a production bundle is greyed out. Why?', 'Source map mismatch or missing, or the line has no code after minification. Verify map URL and build version.'],
             ['When do you use a logpoint vs a breakpoint?', 'Logpoint for timing-sensitive or high-frequency code where pausing changes behaviour; breakpoint for deep inspection.']],
            [['Should source maps be deployed to production?', 'Trade-off: easier debugging vs exposing source. Common practice: generate them, upload privately to error tracking, restrict public access.'],
             ['How do you make front-end bugs reproducible for the team?', 'Recorder flows or HAR files, environment/version info, Overrides to test fixes, and logpoint recipes shared in the ticket.']]
        ],
        quiz: [
            Q('Which key resumes execution after a breakpoint?', ['F10', 'F11', 'F8', 'F12'], 2, 'F8 (or Ctrl+\\) resumes.'),
            Q('You need to pause only when <code>total</code> becomes NaN. What do you add?', ['A logpoint', 'A conditional breakpoint with isNaN(total)', 'A DOM breakpoint', 'Preserve log'], 1, 'Conditional breakpoints evaluate an expression each time.'),
            Q('Your breakpoint never hits after a fix is deployed. First thing to check?', ['Lighthouse score', 'Cached old script — enable Disable cache and hard reload', 'Cookie size', 'Memory snapshot'], 1, 'Stale cached bundles are the most common cause.'),
            Q('Which pane shows local and closure variables at the paused line?', ['Watch', 'Scope', 'Call Stack', 'Breakpoints'], 1, 'Scope lists Local, Closure, Script and Global variables.'),
            Q('What helps you see original TypeScript/ES modules instead of a minified bundle?', ['Workspaces', 'Source maps', 'Snippets', 'Coverage'], 1, 'Source maps map minified code back to originals.')
        ]
    });

    /* =====================================================================
       4. NETWORK
       ===================================================================== */
    L.network = lesson({
        short: 'Network', icon: '🌐', title: 'Network — Requests, Responses, Cookies and Redirects',
        tooltip: 'Filtering, Fetch/XHR, headers, payload, status codes, timing, cookies, redirects, caching, throttling',
        badges: ['HTTP', 'ASP.NET Core APIs', 'Authentication', 'Cookies'],
        tagline: 'Network records every HTTP request the page makes. It is the boundary between browser and server — the fastest way to decide <strong>"client bug or server bug?"</strong>',
        story: [
            'Users of ASCWebQI enter correct credentials. The login POST succeeds and they land on <code>/Dashboard</code> — but the very next click sends them back to <code>/Account/Login?ReturnUrl=…</code>.',
            'Arjun opens Network with <strong>Preserve log</strong> on and logs in. The <code>POST /Account/Login</code> returns <code>302</code> with a <code>Set-Cookie: .AspNetCore.Cookies=…; secure; samesite=none</code>. The Cookies tab shows a yellow warning on that cookie: <em>blocked because it had the Secure attribute but was not received over a secure connection</em> — the test server runs on plain HTTP behind a load balancer. The next request is sent without the auth cookie, so the server redirects to Login.'
        ],
        what: '<p>The Network panel lists every request — documents, scripts, CSS, images, fonts, and API calls (Fetch/XHR) — with status, size and timing. Click one to see headers, payload, response, cookies and a timing breakdown.</p>',
        where: '<ul><li>Click the <strong>Network</strong> tab <em>before</em> reproducing (it records only while open). Reload if needed.</li><li>Tick <strong>Preserve log</strong> for redirects and logins; tick <strong>Disable cache</strong> while debugging.</li><li><code>Ctrl+E</code> starts/stops recording; <code>Ctrl+F</code> searches headers and bodies.</li></ul>',
        screen: [
            ['🔴', 'Record / Clear', 'Red dot records. 🚫 clears the log.'],
            ['🔎', 'Filter bar', 'Text, <code>-</code> to negate, and properties: <code>status-code:302</code>, <code>method:POST</code>, <code>domain:api.ascwebqi.local</code>, <code>larger-than:500k</code>, <code>is:from-cache</code>.'],
            ['🏷️', 'Type buttons', 'All, <strong>Fetch/XHR</strong>, Doc, CSS, JS, Font, Img, Media, Manifest, WS, Wasm, Other.'],
            ['🐢', 'Throttling', 'No throttling, Fast 4G, Slow 4G, 3G, Offline, or custom profiles.'],
            ['📋', 'Request table', 'Name, Status, Type, Initiator (who triggered it), Size, Time, Waterfall. Right-click headers to add columns like <code>Set-Cookie</code>.'],
            ['📑', 'Headers', 'General (URL, method, status, remote address), Response headers, Request headers.'],
            ['📦', 'Payload / Preview / Response', 'Query string and form/JSON body sent; formatted and raw response.'],
            ['🍪', 'Cookies', 'Cookies sent with the request and set by the response — with warnings when blocked.'],
            ['⏱️', 'Timing', 'Queueing, Stalled, DNS, Initial connection, SSL, Request sent, <strong>Waiting for server response (TTFB)</strong>, Content download.'],
            ['💾', 'Export', 'Import/Export HAR (download arrow). Right-click → Copy as cURL / fetch / PowerShell.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Network waterfall illustration listing POST Account/Login 302, GET Dashboard 200, GET api/indicators 302, and GET Account/Login 200.',
              caption: 'Figure 1 — The redirect loop as it appears in the Network request list with Preserve log on (illustration).',
              html: '<div class="network-waterfall" style="background:#1e1b2e;padding:.8rem;border-radius:.8rem;">' +
                    '<div class="nw-row"><span class="nw-method nw-post">POST</span><span class="nw-url">/Account/Login</span><span class="nw-status nw-302">302</span><span class="nw-bar-wrap"><span class="nw-bar" style="display:block;width:40%"></span></span></div>' +
                    '<div class="nw-row"><span class="nw-method nw-get">GET</span><span class="nw-url">/Dashboard</span><span class="nw-status nw-200">200</span><span class="nw-bar-wrap"><span class="nw-bar" style="display:block;width:55%;margin-left:40%"></span></span></div>' +
                    '<div class="nw-row"><span class="nw-method nw-get">GET</span><span class="nw-url">/api/indicators  (no .AspNetCore.Cookies sent)</span><span class="nw-status nw-302">302</span><span class="nw-bar-wrap"><span class="nw-bar" style="display:block;width:20%;margin-left:75%"></span></span></div>' +
                    '<div class="nw-row"><span class="nw-method nw-get">GET</span><span class="nw-url">/Account/Login?ReturnUrl=%2Fapi%2Findicators</span><span class="nw-status nw-200">200</span><span class="nw-bar-wrap"><span class="nw-bar" style="display:block;width:10%;margin-left:90%"></span></span></div></div>' },
            { type: 'figure', alt: 'Request and response header illustration for the login POST showing Set-Cookie with Secure and SameSite=None and a blocked cookie warning.',
              caption: 'Figure 2 — Headers for the login response (illustration). The warning icon on the cookie is the key evidence.',
              html: '<div class="dt-headers"><div><b>General</b><br>Request URL: http://qa.ascwebqi.local/Account/Login<br>Request Method: POST<br>Status Code: <span class="dt-warn-txt">302 Found</span></div>' +
                    '<div><b>Response Headers</b><br>Location: /Dashboard<br>Set-Cookie: .AspNetCore.Cookies=CfDJ8…; path=/; <u>secure</u>; <u>samesite=none</u>; httponly <span class="dt-warn-txt">⚠ blocked</span></div>' +
                    '<div><b>Request Headers (next request)</b><br>Cookie: .AspNetCore.Antiforgery.x=…  <span class="dt-warn-txt">(auth cookie missing)</span></div></div>' }
        ],
        steps: [
            'Open Network, tick <strong>Preserve log</strong> and <strong>Disable cache</strong>, clear the list.',
            'Log in. Select <code>POST /Account/Login</code>. Status <code>302</code> with <code>Location: /Dashboard</code> = credentials accepted.',
            'Response headers → find <code>Set-Cookie</code>. Note attributes: <code>Secure</code>, <code>HttpOnly</code>, <code>SameSite</code>, <code>Path</code>, <code>Domain</code>, <code>Expires</code>.',
            'Open the <strong>Cookies</strong> sub-tab. Tick "show filtered out request cookies". A ⚠ explains why a cookie was blocked.',
            'Select the next request (<code>GET /api/indicators</code>) → Request headers → <code>Cookie</code>. The auth cookie is absent → server treats the user as anonymous → <code>302</code> to Login (for APIs it should be <code>401</code>).',
            'Check General → Request URL scheme: <code>http://</code>. Secure cookies are never stored from/sent to HTTP.',
            'Fix: serve over HTTPS end-to-end or configure forwarded headers so the app knows the original scheme; align <code>CookieSecurePolicy</code> and <code>SameSite</code> with the hosting setup.'
        ],
        code: [
            { type: 'code', lang: 'csharp', label: 'ASP.NET Core cookie auth configuration', code: `
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o =>
    {
        o.LoginPath = "/Account/Login";
        o.Cookie.HttpOnly = true;
        o.Cookie.SecurePolicy = CookieSecurePolicy.Always;   // requires HTTPS
        o.Cookie.SameSite = SameSiteMode.Lax;                // None only for cross-site, and needs Secure
        // APIs should get 401, not an HTML redirect
        o.Events.OnRedirectToLogin = ctx =>
        {
            if (ctx.Request.Path.StartsWithSegments("/api"))
            { ctx.Response.StatusCode = 401; return Task.CompletedTask; }
            ctx.Response.Redirect(ctx.RedirectUri); return Task.CompletedTask;
        };
    });

// Behind a TLS-terminating load balancer
builder.Services.Configure<ForwardedHeadersOptions>(o =>
    o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
app.UseForwardedHeaders();` },
            { type: 'code', lang: 'javascript', label: 'Client: handle 401 explicitly', code: `
const res = await fetch("/api/indicators", { credentials: "same-origin" });
if (res.status === 401) { location.href = "/Account/Login?ReturnUrl=" + encodeURIComponent(location.pathname); }
else if (!res.ok) { console.error("API failed", res.status, await res.text()); }` }
        ],
        evidence: [
            { type: 'table', head: ['Status', 'Meaning', 'Typical .NET cause'], rows: [
                ['<code>200</code> / <code>204</code>', 'OK / OK with no body', 'Success'],
                ['<code>301</code> / <code>302</code> / <code>307</code>', 'Redirect (check <code>Location</code>)', 'Auth challenge, HTTPS redirection, trailing slash'],
                ['<code>304</code>', 'Not modified — browser used cache', 'ETag/Last-Modified match'],
                ['<code>400</code>', 'Bad request', 'Model binding/validation, missing anti-forgery token'],
                ['<code>401</code> / <code>403</code>', 'Not authenticated / not authorised', 'Missing cookie or bearer token / role or policy failure'],
                ['<code>404</code> / <code>405</code>', 'Not found / wrong method', 'Route mismatch, virtual directory, POST vs GET'],
                ['<code>415</code>', 'Unsupported media type', 'Missing <code>Content-Type: application/json</code>'],
                ['<code>500</code>', 'Server exception', 'Check server logs; response may contain ProblemDetails'],
                ['<code>(blocked:mixed-content)</code>, <code>(failed) net::ERR_…</code>', 'Browser never completed the request', 'CORS, mixed content, certificate, DNS, offline']
            ] },
            { type: 'prose', html: '<h3>Timing</h3><p>Long <strong>Waiting for server response</strong> (TTFB) = slow server/database. Long <strong>Content download</strong> = large payload or slow network. Long <strong>Stalled/Queueing</strong> = too many parallel requests or HTTP/1.1 connection limits.</p><h3>Caching</h3><p><code>(memory cache)</code>/<code>(disk cache)</code> in Size means no request reached the server. Check <code>Cache-Control</code>, <code>ETag</code> and <code>Expires</code> response headers. Use <strong>Disable cache</strong> when testing deployments.</p>' }
        ],
        mistakes: [
            ['Opening Network after the problem happened.', 'Network only records while open — reload or reproduce again.'],
            ['Missing redirects because the log clears.', 'Tick Preserve log.'],
            ['Assuming a 302 from an API is "success".', 'For APIs a 302 to Login means unauthenticated. Configure APIs to return 401.'],
            ['Ignoring the Cookies sub-tab warnings.', 'Blocked cookies (Secure on HTTP, SameSite, domain mismatch) explain most "login loops".'],
            ['Sharing HAR files freely.', 'HAR files contain cookies, tokens and payloads. Sanitize before attaching to tickets.'],
            ['Testing performance with cache enabled only.', 'Test both cold (Disable cache) and warm loads, and with throttling.']
        ],
        notebook: [
            'Open Network <em>before</em> reproducing; Preserve log + Disable cache.',
            'Filter: Fetch/XHR, <code>status-code:</code>, <code>method:</code>, <code>-domain:</code>.',
            'Headers → General / Response / Request; Payload = what you sent.',
            'Cookies sub-tab explains blocked cookies.',
            'Login loop = auth cookie not stored or not sent (Secure/SameSite/HTTP/domain).',
            'APIs should return 401, not 302.',
            'TTFB = server; download = size; stalled = connections.',
            'HAR = full evidence, but contains secrets.'
        ],
        interview: [
            [['What does the Fetch/XHR filter show?', 'Only AJAX/API calls made with fetch or XMLHttpRequest.'],
             ['Difference between 401 and 403?', '401: not authenticated (who are you?). 403: authenticated but not allowed.'],
             ['How do you see the JSON sent to an API?', 'Select the request → Payload tab.']],
            [['Login succeeds but the next request goes to Login. How do you debug?', 'Preserve log; inspect Set-Cookie on the login response and Cookies warnings; check the next request\'s Cookie header; check scheme, SameSite, Secure, domain/path, and server data-protection keys across instances.'],
             ['How do you tell browser cache from server response?', 'Size column shows memory/disk cache; status 304 means revalidated; check Cache-Control/ETag.'],
             ['How do you reproduce a slow mobile user?', 'Network throttling profile plus CPU throttling in Performance; test with cache disabled.']],
            [['Users on a load-balanced farm are randomly logged out. What would you check?', 'Shared Data Protection key ring across instances, machine key in classic ASP.NET, cookie size limits, sticky sessions vs distributed session, clock skew on expiry.'],
             ['What is your policy for HAR files in tickets?', 'Allowed only sanitized; use Chrome\'s "Export HAR (sanitized)" where available or strip cookies/authorization headers; store in restricted locations.']]
        ],
        quiz: [
            Q('Login POST returns 302 to /Dashboard, but the next request is redirected to Login. Where is the best evidence?', ['Console', 'Cookies sub-tab of the login response and Cookie header of the next request', 'Lighthouse', 'Memory'], 1, 'The auth cookie is either blocked when set or not sent on the next request.'),
            Q('A cookie has <code>Secure</code> and the site runs on http://. What happens?', ['It works normally', 'Browser rejects/doesn\'t send it', 'It becomes HttpOnly', 'It converts to sessionStorage'], 1, 'Secure cookies require HTTPS.'),
            Q('Size column shows "(disk cache)". What does that mean?', ['Server returned 500', 'The response came from the browser cache with no network request', 'The file is compressed', 'The request is blocked'], 1, 'No request reached the server.'),
            Q('An API call returns 415. Most likely cause?', ['Missing Content-Type: application/json', 'Wrong password', 'CORS', 'Expired certificate'], 0, '415 Unsupported Media Type — the body type is not accepted.'),
            Q('Which timing phase indicates a slow server/database?', ['Content download', 'Waiting for server response (TTFB)', 'DNS lookup', 'Queueing'], 1, 'TTFB is the time the server takes to start responding.')
        ]
    });

    /* =====================================================================
       5. PERFORMANCE
       ===================================================================== */
    L.performance = lesson({
        short: 'Performance', icon: '⚡', title: 'Performance — Main Thread, Flame Charts and Long Tasks',
        tooltip: 'Recording, page load, interactions, main thread, flame chart, long tasks, rendering, layout',
        badges: ['Core Web Vitals', 'INP', 'Rendering', 'JavaScript'],
        tagline: 'Performance records what the browser did millisecond by millisecond — scripting, style calculation, layout, paint — so you can see <strong>why</strong> the page feels slow.',
        story: [
            'Clicking a facility in the ASCWebQI sidebar freezes the page for about two seconds before the grid updates. The API responds in 120 ms (verified in Network).',
            'Sana records a Performance trace while clicking. The Main track shows one <strong>long task of 1.9 s</strong> with a red corner. The flame chart beneath it shows <code>onFacilityChange → renderRows → row.style.height</code> then <code>offsetHeight</code> repeated 5,000 times, each followed by a purple <strong>Layout</strong> block: <em>forced synchronous layout</em> (layout thrashing).'
        ],
        what: '<p>The Performance panel captures a timeline of CPU work on the page: JavaScript execution, style recalculation, layout, paint, compositing, network events and frames. It highlights <strong>long tasks</strong> (over 50 ms) that block user input, and shows Core Web Vitals such as LCP, CLS and INP.</p>',
        where: '<ul><li>Click the <strong>Performance</strong> tab.</li><li>⏺ <strong>Record</strong> (<code>Ctrl+E</code>) → perform the interaction → Stop.</li><li>↻ <strong>Record and reload</strong> (<code>Ctrl+Shift+E</code>) to profile page load.</li><li>The landing view shows live local metrics (LCP, CLS, INP) as you interact.</li></ul>',
        screen: [
            ['⚙️', 'Capture settings (gear)', 'CPU throttling (4× / 6× slowdown), network throttling, Screenshots, Memory, Enable advanced paint instrumentation.'],
            ['📈', 'Overview', 'CPU chart coloured by category, FPS/frames, screenshots filmstrip. Drag to select a time range.'],
            ['🧵', 'Main track', 'The flame chart of main-thread work. Wider = longer. Parents on top, callees below.'],
            ['🟥', 'Long tasks', 'Tasks > 50 ms are marked with red triangles/stripes.'],
            ['🌐', 'Network track', 'Requests on the same timeline — see if work waits on data.'],
            ['🎞️', 'Frames / Interactions', 'Dropped frames; interaction bars show input delay, processing, presentation.'],
            ['📊', 'Summary / Bottom-up / Call tree / Event log', 'Totals by category; functions by self time; top-down tree; chronological list.'],
            ['💡', 'Insights', 'Newer Chrome versions surface insights such as LCP breakdown, layout shift culprits, forced reflow, render-blocking requests.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Flame chart illustration: a 1.9 second Task containing onFacilityChange, then renderRows, then alternating Recalculate Style and Layout blocks.',
              caption: 'Figure 1 — A long task in the flame chart (illustration). Yellow = scripting, purple = rendering/layout, green = painting.',
              html: '<div class="flame-chart"><div class="flame-row"><div class="flame-bar fb-gray" style="flex:1">Task 1.9 s ▲ long task</div></div>' +
                    '<div class="flame-row"><div class="flame-bar fb-yellow" style="flex:1">Event: click</div></div>' +
                    '<div class="flame-row"><div class="flame-bar fb-yellow" style="flex:1">onFacilityChange  qiDashboard.js:88</div></div>' +
                    '<div class="flame-row"><div class="flame-bar fb-yellow" style="flex:.97">renderRows</div><div class="flame-bar fb-green" style="flex:.03"></div></div>' +
                    '<div class="flame-row"><div class="flame-bar fb-purple" style="flex:1">Layout</div><div class="flame-bar fb-yellow" style="flex:1">set height</div><div class="flame-bar fb-purple" style="flex:1">Layout</div><div class="flame-bar fb-yellow" style="flex:1">set height</div><div class="flame-bar fb-purple" style="flex:1">Layout</div><div class="flame-bar fb-yellow" style="flex:1">…×5000</div></div></div>' }
        ],
        steps: [
            'Open in Incognito (no extensions). In capture settings, set <strong>CPU: 4× slowdown</strong> to mimic average hardware.',
            'Click Record, click a facility in the sidebar, wait for the grid, click Stop.',
            'In the Main track, find the wide grey <strong>Task</strong> with a red triangle. Click it — Summary shows 1.9 s: mostly Rendering/Layout.',
            'Zoom (W/S keys or mouse wheel) into the task. Under <code>renderRows</code> you see alternating yellow (script) and purple (Layout) slices.',
            'Click a Layout slice. Summary shows <strong>"Forced reflow"</strong> with the initiating JS line: <code>qiDashboard.js:97 offsetHeight</code>.',
            'Open <strong>Bottom-up</strong> sorted by Self time to confirm <code>Layout</code> dominates.',
            'Fix by batching reads then writes (or let CSS handle sizing), record again and compare: the task drops to ~80 ms.'
        ],
        code: [
            { type: 'code', lang: 'javascript', label: 'Layout thrashing and the fix', code: `
// BAD: read (offsetHeight) after write (style) in a loop -> forced layout each time
rows.forEach(function (row) {
    row.style.height = (row.offsetHeight + 4) + "px";
});

// GOOD: batch reads, then batch writes
var heights = rows.map(function (r) { return r.offsetHeight; });   // 1 layout
rows.forEach(function (r, i) { r.style.height = (heights[i] + 4) + "px"; });

// BETTER: do it with CSS, or build rows off-DOM and insert once
var frag = document.createDocumentFragment();
data.forEach(function (d) { frag.appendChild(buildRow(d)); });
tbody.replaceChildren(frag);` },
            { type: 'code', lang: 'javascript', label: 'Break long work into chunks to keep input responsive', code: `
async function processInChunks(items, fn) {
    for (let i = 0; i < items.length; i++) {
        fn(items[i]);
        if (i % 200 === 0) await new Promise(r => setTimeout(r, 0)); // yield to the browser
    }
}
// Mark your own code in the trace
performance.mark("grid-start"); renderGrid(); performance.measure("grid", "grid-start");` }
        ],
        evidence: [
            { type: 'table', head: ['Colour / signal', 'Category', 'Common causes'], rows: [
                ['🟨 Yellow', 'Scripting', 'Heavy loops, large JSON parsing, framework re-renders, third-party scripts'],
                ['🟪 Purple', 'Rendering (style, layout)', 'Layout thrashing, huge DOM, complex selectors'],
                ['🟩 Green', 'Painting / compositing', 'Large shadows/filters, animating non-composited properties'],
                ['⬜ Grey', 'System / other', 'Browser internal work, GC'],
                ['🔺 Red triangle', 'Long task (>50 ms)', 'Blocks input → poor INP'],
                ['Idle gaps with network bars', 'Waiting on network', 'Problem is the server/API — go to Network']
            ] },
            { type: 'callout', kind: 'info', title: 'Lab vs field', html: '<p>A Performance trace is <strong>lab data</strong> from your machine. Real users\' experience (<strong>field data</strong>) comes from RUM tools or Chrome UX Report. Use CPU throttling to approximate typical devices.</p>' }
        ],
        mistakes: [
            ['Profiling on a fast developer laptop without throttling.', 'Use 4×–6× CPU slowdown to see what users feel.'],
            ['Recording for 30 seconds of random clicking.', 'Record one focused interaction; shorter traces are easier to read.'],
            ['Optimising the function with the highest Total time.', 'Sort Bottom-up by <strong>Self</strong> time to find where time is actually spent.'],
            ['Blaming JavaScript when the main thread is idle.', 'Idle main thread + long network bar = server problem.'],
            ['Profiling with extensions enabled.', 'Use Incognito or a clean profile; extensions inject scripts.']
        ],
        notebook: [
            'Record one interaction; Record & reload for page load.',
            'CPU throttling 4× for realistic results.',
            'Long task = >50 ms, red triangle, hurts INP.',
            'Yellow script · Purple layout · Green paint.',
            'Forced reflow = read layout after write in a loop.',
            'Bottom-up by Self time finds hotspots.',
            'Idle main thread + long request → Network/server.'
        ],
        interview: [
            [['What is a long task?', 'Main-thread work over 50 ms that blocks input.'],
             ['How do you profile page load?', 'Record and reload in the Performance panel.'],
             ['What does a wide bar in the flame chart mean?', 'The function took a long time (including its callees).']],
            [['What is layout thrashing and how do you fix it?', 'Interleaving DOM writes and layout reads forcing repeated synchronous layout; batch reads then writes or use requestAnimationFrame.'],
             ['How do you improve INP for a slow click handler?', 'Reduce work in the handler, yield with setTimeout/scheduler.yield, defer non-urgent work, avoid large synchronous renders.'],
             ['Self time vs Total time?', 'Self excludes callees; Total includes them.']],
            [['How would you institutionalise front-end performance?', 'Performance budgets in CI (Lighthouse CI), RUM for Core Web Vitals, regression alerts, profiling checklist in code review for large lists/grids.'],
             ['A Kendo grid with 10,000 rows is slow. Architectural options?', 'Server paging, virtual scrolling, reduce templates/columns, avoid per-row widgets, move heavy computation server-side.']]
        ],
        quiz: [
            Q('What qualifies as a long task?', ['Any network request', 'Main-thread task longer than 50 ms', 'Any task with a console error', 'A task longer than 5 seconds only'], 1, 'The 50 ms threshold is used for long tasks.'),
            Q('Alternating yellow and purple slices in a loop usually indicate…', ['Memory leak', 'Forced synchronous layout (layout thrashing)', 'CORS error', 'Cache miss'], 1, 'Script writes then reads layout repeatedly.'),
            Q('To find the function where most time is actually spent, use…', ['Call tree by Total', 'Bottom-up by Self time', 'Event log', 'Screenshots'], 1, 'Self time shows where the CPU actually spent time.'),
            Q('The main thread is idle for 2 s while a request bar spans that time. Where is the problem?', ['JavaScript loop', 'Server/API latency', 'CSS', 'Painting'], 1, 'The browser is waiting on the network.'),
            Q('Why enable CPU throttling?', ['To save battery', 'To approximate slower real-user devices', 'To disable JavaScript', 'To bypass cache'], 1, 'Developer machines are much faster than typical devices.')
        ]
    });

    /* =====================================================================
       6. MEMORY
       ===================================================================== */
    L.memory = lesson({
        short: 'Memory', icon: '🧠', title: 'Memory — Heap Snapshots and Leak Hunting',
        tooltip: 'Heap snapshots, allocation sampling, allocation timelines, retainers, detached DOM nodes',
        badges: ['Heap', 'Leaks', 'Detached DOM', 'SPA'],
        tagline: 'The Memory panel shows what JavaScript objects are alive and <strong>what keeps them alive</strong>. It is how you prove (or disprove) a memory leak.',
        story: [
            'Supervisors keep ASCWebQI open all day. By afternoon, the tab uses 1.8 GB and becomes sluggish. Each facility switch rebuilds a Kendo grid inside a dialog.',
            'Kiran takes a heap snapshot, switches facilities ten times, forces garbage collection, and takes another. Comparison shows <strong>+10 detached <code>HTMLDivElement</code> trees</strong> with thousands of children. The Retainers pane shows each is held by a <code>resize</code> listener on <code>window</code> registered in <code>openFacilityDialog()</code> and never removed; <code>grid.destroy()</code> is never called.'
        ],
        what: '<p>The Memory panel profiles the JavaScript heap. You can take <strong>heap snapshots</strong> (everything alive right now), record <strong>allocations on a timeline</strong> (what was allocated when, and what survived), or use <strong>allocation sampling</strong> (low-overhead view of which functions allocate most).</p>',
        where: '<ul><li>Click the <strong>Memory</strong> tab.</li><li>Choose a profiling type → <strong>Take snapshot</strong> / <strong>Start</strong>.</li><li>Use the 🗑 <strong>Collect garbage</strong> button before snapshots to remove collectable objects.</li><li>For a quick trend, open ⋮ → More tools → <strong>Performance monitor</strong> (JS heap size, DOM nodes, listeners) or tick Memory in the Performance panel.</li></ul>',
        screen: [
            ['📸', 'Heap snapshot', 'Full picture of objects and references at one moment.'],
            ['📈', 'Allocations on timeline', 'Blue bars = allocated and still alive; grey = collected. Available in most Chrome versions (name may vary).'],
            ['🎲', 'Allocation sampling', 'Statistical, low overhead; shows functions responsible for allocations. Good for long sessions.'],
            ['👁️', 'Views', '<strong>Summary</strong> (by constructor), <strong>Comparison</strong> (delta between snapshots), <strong>Containment</strong> (from GC roots), <strong>Statistics</strong> (pie chart).'],
            ['🔢', 'Columns', 'Distance (from GC root), <strong>Shallow size</strong> (object itself), <strong>Retained size</strong> (what would be freed if it were collected).'],
            ['🔗', 'Retainers', 'Lower pane: the chain of references keeping the selected object alive — the key to finding leaks.'],
            ['🔍', 'Class filter', 'Type <code>Detached</code> to list DOM nodes removed from the page but still referenced.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Heap snapshot comparison illustration listing Detached HTMLDivElement with 10 new objects and 41 MB retained, closure and EventListener rows, and a retainer chain from window resize listener to the detached div.',
              caption: 'Figure 1 — Comparison view filtered by "Detached" (illustration).',
              html: '<div class="heap-snapshot"><div class="heap-row heap-header"><span class="heap-name">Constructor</span><span class="heap-count"># New</span><span class="heap-size">Shallow</span><span class="heap-ret">Retained</span></div>' +
                    '<div class="heap-row"><span class="heap-name">Detached HTMLDivElement</span><span class="heap-count">+10</span><span class="heap-size">1.2 KB</span><span class="heap-ret">41 MB</span></div>' +
                    '<div class="heap-row"><span class="heap-name">(closure) onResize</span><span class="heap-count">+10</span><span class="heap-size">0.6 KB</span><span class="heap-ret">41 MB</span></div>' +
                    '<div class="heap-row"><span class="heap-name">kendo.ui.Grid</span><span class="heap-count">+10</span><span class="heap-size">2.4 KB</span><span class="heap-ret">38 MB</span></div>' +
                    '<div class="heap-row" style="color:#fbbf24">Retainers: Window → resize listeners → onResize (closure) → context → grid → element (Detached div)</div></div>' }
        ],
        steps: [
            'Open the page fresh. In Memory, click 🗑 then <strong>Take snapshot</strong> (Snapshot 1 = baseline).',
            'Perform the suspected action several times (open/close the facility dialog 10×). Repetition makes leaks obvious.',
            'Return to the starting state, click 🗑, take Snapshot 2.',
            'Select Snapshot 2 → view <strong>Comparison</strong> against Snapshot 1. Sort by <strong># Delta</strong> or <strong>Size Delta</strong>.',
            'Filter <code>Detached</code>. A count growing by exactly the number of repetitions is a strong leak signal.',
            'Click one instance and read <strong>Retainers</strong> from bottom to top until you reach your code (closure, listener, array, cache).',
            'Fix (remove listener, destroy widget, clear cache) and repeat the test; the delta should be ~0.'
        ],
        code: [
            { type: 'code', lang: 'javascript', label: 'Leak and fix', code: `
// LEAK: every open adds a window listener that captures the grid
function openFacilityDialog(id) {
    var $el = $("<div/>").appendTo("#dialogHost");
    var grid = $el.kendoGrid({ dataSource: ds(id) }).data("kendoGrid");
    window.addEventListener("resize", function onResize() { grid.resize(); });
    $("#dialogHost").one("close", function () { $el.remove(); });   // DOM removed, still referenced
}

// FIX: keep a reference, remove listener, destroy widget
function openFacilityDialog(id) {
    var $el = $("<div/>").appendTo("#dialogHost");
    var grid = $el.kendoGrid({ dataSource: ds(id) }).data("kendoGrid");
    var controller = new AbortController();
    window.addEventListener("resize", function () { grid.resize(); }, { signal: controller.signal });
    $("#dialogHost").one("close", function () {
        controller.abort();       // removes the listener
        grid.destroy();           // Kendo releases its handlers and data
        $el.remove();
    });
}` }
        ],
        evidence: [
            { type: 'prose', html: '<ul><li><strong>Memory grows then drops</strong> in a sawtooth = normal garbage collection.</li><li><strong>Baseline keeps rising after GC</strong> across repetitions = leak.</li><li><strong>Detached DOM nodes</strong> = elements removed from the page but referenced by JS (listeners, arrays, closures, jQuery data caches).</li><li><strong>Retained size</strong> matters more than shallow size — a tiny closure can retain a 40 MB grid.</li><li>Objects with yellow/highlighted background in older versions meant "directly referenced from JS"; read Retainers rather than relying on colours.</li></ul>' },
            { type: 'callout', kind: 'info', title: 'Browser memory vs server memory', html: '<p>This panel shows the <strong>browser tab\'s</strong> JS heap. It tells you nothing about IIS/Kestrel memory. Server leaks need dotnet-counters, dotnet-dump, or Visual Studio diagnostic tools.</p>' }
        ],
        mistakes: [
            ['Taking one snapshot and calling it a leak.', 'Compare snapshots before/after repeated actions with GC in between.'],
            ['Looking at shallow size only.', 'Sort by retained size; small objects can hold huge graphs.'],
            ['Using Task Manager numbers alone.', 'Process memory includes images, GPU and caches. Use heap snapshots for JS objects.'],
            ['Removing DOM with <code>.remove()</code> but not destroying widgets.', 'Call the library\'s <code>destroy()</code> and remove global listeners/timers.'],
            ['Snapshotting with DevTools-held references.', '<code>$0</code> and Console results keep objects alive; clear Console and select another node before snapshots.']
        ],
        notebook: [
            'Snapshot → repeat action ×N → GC → snapshot → Comparison.',
            'Filter <code>Detached</code> for removed-but-alive DOM.',
            'Retained size > shallow size in importance.',
            'Retainers chain shows who keeps it alive.',
            'Common culprits: global listeners, timers, caches, closures, undisposed widgets.',
            'Sawtooth = healthy; rising baseline = leak.',
            'Browser heap ≠ server memory.'
        ],
        interview: [
            [['What is a heap snapshot?', 'A capture of all reachable JavaScript objects and their references at one moment.'],
             ['What is a detached DOM node?', 'An element removed from the document that is still referenced by JavaScript, so it cannot be garbage collected.'],
             ['Shallow vs retained size?', 'Shallow: memory of the object itself. Retained: memory freed if the object were collected.']],
            [['Walk through proving a memory leak.', 'Baseline snapshot, repeat action N times, GC, second snapshot, comparison sorted by delta, inspect retainers, fix, re-test.'],
             ['Why can closures cause leaks?', 'They capture variables (e.g. a grid) and if the closure is referenced globally (listener, timer), everything captured stays alive.'],
             ['When use allocation sampling?', 'For long-running sessions or production-like profiling with low overhead.']],
            [['How do you prevent leaks in a long-lived dashboard?', 'Component lifecycle conventions (create/destroy), AbortController for listeners, lint rules, automated memory tests (e.g. Puppeteer + heap metrics) in CI.'],
             ['Users report tabs crashing after hours. Strategy?', 'Reproduce with Performance monitor, heap snapshot comparison, collect field data (performance.memory where available / RUM), prioritise largest retainers.']]
        ],
        quiz: [
            Q('Which view shows what changed between two snapshots?', ['Summary', 'Comparison', 'Containment', 'Statistics'], 1, 'Comparison shows deltas.'),
            Q('After 10 dialog opens/closes, "Detached HTMLDivElement" increased by 10. This suggests…', ['Normal GC', 'A leak: removed elements still referenced', 'A CSS issue', 'Cache warming'], 1, 'Growth matching repetitions is a classic leak signal.'),
            Q('Which pane tells you why an object is still alive?', ['Retainers', 'Console', 'Network', 'Styles'], 0, 'Retainers show the reference chain to GC roots.'),
            Q('Why click the garbage-collect button before a snapshot?', ['To speed up the page', 'To remove collectable objects so only truly retained objects remain', 'To clear cookies', 'It is required to enable snapshots'], 1, 'Snapshots also trigger GC, but forcing it makes comparisons cleaner.'),
            Q('Which is a common cause of JS memory leaks?', ['Using const', 'Global event listeners never removed', 'Using CSS grid', 'HTTP/2'], 1, 'Listeners on window/document keep closures alive.')
        ]
    });

    /* =====================================================================
       7. APPLICATION
       ===================================================================== */
    L.application = lesson({
        short: 'Application', icon: '🗄️', title: 'Application — Cookies, Storage, Cache and Service Workers',
        tooltip: 'Cookies, Local/Session Storage, IndexedDB, Cache Storage, Service Workers, Manifest, Frames, Clear storage',
        badges: ['Cookies', 'Storage', 'PWA', 'ASP.NET Session'],
        tagline: 'The Application panel shows everything the browser <strong>stores</strong> for your site — and lets you inspect, edit and clear it.',
        story: [
            'After a release, some ASCWebQI users see the <em>old</em> dashboard layout and a JavaScript error, while others are fine. A hard refresh does not help.',
            'Nisha opens Application → <strong>Service workers</strong> and finds an old service worker (from a pilot "offline mode") still controlling the page, serving <code>site.js</code> from <strong>Cache Storage</strong> <code>qi-cache-v1</code>. She also notices the <code>selectedFacility</code> value in <strong>Local Storage</strong> references a facility ID that no longer exists, causing the error.'
        ],
        what: '<p>Application is the browser-side storage inspector. It covers cookies, Web Storage, IndexedDB, Cache Storage, service workers, the web app manifest, background services, frames, and a <strong>Storage</strong> overview with a "Clear site data" button.</p>',
        where: '<ul><li>Click the <strong>Application</strong> tab (it may be under the » overflow).</li><li>Left sidebar groups: <strong>Application</strong> (Manifest, Service workers, Storage), <strong>Storage</strong> (Local, Session, Extension storage, IndexedDB, Cookies, Private state tokens, Interest groups, Shared storage, Cache storage, Storage buckets), <strong>Background services</strong>, <strong>Frames</strong>. Exact items vary by Chrome version.</li></ul>',
        screen: [
            ['🍪', 'Cookies', 'Per origin: Name, Value, Domain, Path, Expires/Max-Age, Size, <strong>HttpOnly</strong>, <strong>Secure</strong>, <strong>SameSite</strong>, Partition key, Priority. Double-click to edit; Delete to remove.'],
            ['📦', 'Local Storage', 'Key/value strings per origin, persist until cleared. Readable by any script on the origin (XSS risk).'],
            ['🗂️', 'Session Storage', 'Like Local Storage but per tab, cleared when the tab closes.'],
            ['🗃️', 'IndexedDB', 'Structured, larger client database. Browse object stores and records; refresh to see changes.'],
            ['💾', 'Cache Storage', 'Request/response pairs cached by service workers (not the HTTP cache).'],
            ['⚙️', 'Service workers', 'Status, Update on reload, Bypass for network, Unregister, Push/Sync test buttons, Offline.'],
            ['📄', 'Manifest', 'Name, icons, start URL, display mode, installability errors.'],
            ['🛰️', 'Background services', 'Record Background Fetch, Background Sync, Notifications, Push, Payment handler events (where available).'],
            ['🖼️', 'Frames', 'Top frame and iframes: URL, origin, security context, cross-origin isolation.'],
            ['🧹', 'Storage (Clear site data)', 'Usage chart and checkboxes to clear storage types for this origin.']
        ],
        screenExtra: [
            { type: 'table', head: ['Name', 'Value', 'HttpOnly', 'Secure', 'SameSite', 'Notes'], rows: [
                ['<code>.AspNetCore.Cookies</code>', 'CfDJ8…', '✓', '✓', 'Lax', 'Auth ticket (encrypted). Should be HttpOnly.'],
                ['<code>.AspNetCore.Session</code>', 'CfDJ8…', '✓', '✓', 'Lax', 'Only an ID — session data lives on the server.'],
                ['<code>.AspNetCore.Antiforgery.xyz</code>', 'CfDJ8…', '✓', '✓', 'Strict', 'Pairs with the form token.'],
                ['<code>ASP.NET_SessionId</code>', 'k3j2…', '✓', '', 'Lax', 'Classic ASP.NET MVC session ID.'],
                ['<code>.ASPXAUTH</code>', 'A1B2…', '✓', '✓', '', 'Classic Forms Authentication ticket.']
            ] }
        ],
        steps: [
            'Application → <strong>Service workers</strong>. If a worker is "activated and is running" for a site that should not have one, that explains stale assets.',
            'Tick <strong>Update on reload</strong> while developing, or <strong>Bypass for network</strong> to ignore it temporarily.',
            'Open <strong>Cache storage → qi-cache-v1</strong>: entries for <code>/js/site.js</code> with an old date confirm stale caching.',
            'Open <strong>Local storage → https://ascwebqi…</strong>: inspect <code>selectedFacility</code>. Edit or delete to test whether the error disappears.',
            'Open <strong>Cookies</strong>: confirm <code>.AspNetCore.Cookies</code> exists, flags are correct, and Expires is sensible.',
            'Fix at source: ship a service worker that cleans old caches and unregisters (or a versioned cache strategy), and validate stored values on read.',
            'Only then use <strong>Storage → Clear site data</strong> on your own machine to confirm a clean first-visit experience.'
        ],
        code: [
            { type: 'code', lang: 'javascript', label: 'Kill-switch service worker (replaces the old one)', code: `
// sw.js deployed at the same URL as the old worker
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        for (const key of await caches.keys()) await caches.delete(key);
        await self.registration.unregister();
        for (const client of await self.clients.matchAll()) client.navigate(client.url);
    })());
});` },
            { type: 'code', lang: 'javascript', label: 'Defensive storage reads', code: `
function getSelectedFacility(validIds) {
    try {
        const v = JSON.parse(localStorage.getItem("selectedFacility"));
        return validIds.includes(v) ? v : null;
    } catch { return null; }
}
sessionStorage.setItem("wizardStep", "2");    // per tab, gone when tab closes` },
            { type: 'code', lang: 'csharp', label: 'Server-side ASP.NET Core Session', code: `
builder.Services.AddDistributedMemoryCache();   // use Redis/SQL in a farm
builder.Services.AddSession(o => {
    o.IdleTimeout = TimeSpan.FromMinutes(20);
    o.Cookie.HttpOnly = true;
    o.Cookie.IsEssential = true;
});
app.UseSession();

HttpContext.Session.SetInt32("FacilityId", 42);   // stored on the SERVER
// The browser only holds the .AspNetCore.Session cookie (an identifier)` }
        ],
        evidence: [
            { type: 'table', head: ['', 'Browser sessionStorage', 'ASP.NET / ASP.NET Core Session'], rows: [
                ['Where data lives', 'In the browser tab', 'On the server (memory, Redis, SQL)'],
                ['What the browser sees', 'The full data (visible in Application)', 'Only a session ID cookie'],
                ['Scope', 'One tab, one origin', 'All tabs sharing the cookie'],
                ['Lifetime', 'Until the tab closes', 'Idle timeout / app restart (in-memory)'],
                ['Readable by JavaScript', 'Yes (XSS can read it)', 'No (data on server; cookie usually HttpOnly)'],
                ['Good for', 'UI state, wizard step, non-sensitive drafts', 'Server-side workflow state; not a replacement for auth']
            ] },
            { type: 'callout', kind: 'danger', title: 'Clear storage — risks', html: '<ul><li>It logs you out and deletes unsynced offline data (IndexedDB drafts) for that origin.</li><li>It hides the evidence — capture screenshots/values first.</li><li>It only fixes <em>your</em> browser. Real users still have the bad state; you need a code fix.</li><li>Never instruct users to clear storage as the permanent solution.</li></ul>' },
            { type: 'callout', kind: 'warn', title: 'Security note', html: '<p>Do not store access tokens, passwords or personal data in Local/Session Storage — any injected script can read them. Prefer HttpOnly, Secure cookies for session credentials.</p>' }
        ],
        mistakes: [
            ['Thinking sessionStorage is the same as ASP.NET Session.', 'One is browser-side per tab; the other is server-side keyed by a cookie.'],
            ['Clearing site data first.', 'Inspect and record values, then clear to verify.'],
            ['Storing JWTs in localStorage by default.', 'Prefer HttpOnly cookies, or carefully evaluate XSS exposure.'],
            ['Forgetting service workers survive hard reloads.', 'Check Service workers; use Update on reload / Bypass for network during development.'],
            ['Editing a cookie in DevTools and expecting HttpOnly to block you.', 'HttpOnly blocks JavaScript, not the user/DevTools.']
        ],
        notebook: [
            'Cookies: check HttpOnly, Secure, SameSite, Domain, Path, Expires.',
            'Local = persistent per origin; Session = per tab.',
            'IndexedDB = structured, large; Cache Storage = service worker caches.',
            'Service worker can serve stale files even after hard reload.',
            'ASP.NET Session data is on the server; browser holds only an ID cookie.',
            'Clear site data = local verification only; it destroys evidence.',
            'Never store secrets in Web Storage.'
        ],
        interview: [
            [['Difference between localStorage and sessionStorage?', 'localStorage persists across tabs and restarts; sessionStorage is per tab and cleared when the tab closes.'],
             ['What does HttpOnly mean on a cookie?', 'JavaScript cannot read it via document.cookie.'],
             ['Where can you see a page\'s cookies?', 'Application → Cookies, or Network → request → Cookies.']],
            [['Users see old JS after a deploy despite hard refresh. Why?', 'A service worker serving Cache Storage, or long Cache-Control on unversioned files. Check Application → Service workers and Network size column.'],
             ['Explain sessionStorage vs ASP.NET Session.', 'Browser-side per-tab storage visible to JS versus server-side storage referenced by an HttpOnly cookie ID.'],
             ['Where should an auth token live?', 'Prefer HttpOnly Secure SameSite cookies; if a SPA must hold tokens, keep them in memory and use short lifetimes and refresh tokens with rotation.']],
            [['How do you safely retire a service worker in production?', 'Deploy a kill-switch worker at the same URL that clears caches and unregisters; versioned caches; monitoring of controlled clients.'],
             ['Session strategy for a multi-instance ASP.NET Core app?', 'Distributed cache (Redis/SQL) for session, shared Data Protection keys, avoid large session payloads, prefer stateless claims where possible.']]
        ],
        quiz: [
            Q('Where does ASP.NET Core Session data live?', ['In sessionStorage', 'On the server; the browser holds only a cookie ID', 'In localStorage', 'In IndexedDB'], 1, 'Session data is server-side.'),
            Q('Hard refresh still serves old JS. Which Application section do you check first?', ['Manifest', 'Service workers / Cache storage', 'Frames', 'Cookies'], 1, 'Service workers can intercept requests and serve cached files.'),
            Q('What is a risk of "Clear site data"?', ['It deletes server data', 'It destroys local evidence and logs you out; real users are not fixed', 'It disables HTTPS', 'It uninstalls Chrome'], 1, 'It only affects your browser and removes evidence.'),
            Q('Which flag prevents JavaScript from reading a cookie?', ['Secure', 'HttpOnly', 'SameSite', 'Path'], 1, 'HttpOnly hides the cookie from document.cookie.'),
            Q('sessionStorage data is shared…', ['Across all tabs', 'Only within the same tab and origin', 'With the server automatically', 'Across browsers'], 1, 'It is per tab, per origin.')
        ]
    });

    /* =====================================================================
       8. SECURITY
       ===================================================================== */
    L.security = lesson({
        short: 'Security', icon: '🔒', title: 'Security — HTTPS, Certificates and Mixed Content',
        tooltip: 'HTTPS, certificates, secure connections, mixed content, browser-visible diagnostics',
        badges: ['HTTPS', 'TLS', 'Mixed content', 'IIS'],
        tagline: 'The Security panel (called <strong>Privacy and security</strong> in some recent versions) summarises what the browser can see about a page\'s connection: certificate, TLS, and insecure sub-resources.',
        story: [
            'ASCWebQI moved to <code>https://</code>. The padlock is replaced with a warning, and the facility logos are missing. The Console shows <em>Mixed Content: The page was loaded over HTTPS, but requested an insecure image \'http://cdn.internal/logos/12.png\'</em>.',
            'Deepak opens Security: <strong>Certificate – valid</strong>, <strong>Connection – secure (TLS 1.3)</strong>, but <strong>Resources – mixed content</strong> with a link "View requests in Network panel" that lists the HTTP logo URLs coming from a database column.'
        ],
        what: '<p>The Security panel gives an overview of the page\'s transport security: whether the main origin uses a valid certificate, the TLS protocol and cipher, and whether any resources were loaded over HTTP. It lists each origin the page contacted with its own connection details.</p>',
        where: '<ul><li>Click the <strong>Security</strong> (or <strong>Privacy and security</strong>) tab, under » if hidden.</li><li>Also: click the site-information icon left of the URL → <strong>Connection is secure</strong> → <strong>Certificate is valid</strong>.</li><li>Reload with the panel open to populate the origin list.</li></ul>',
        screen: [
            ['🛡️', 'Security overview', 'Overall state: secure, not secure, or info with explanations.'],
            ['📜', 'Certificate', 'Valid / invalid / expired; <strong>View certificate</strong> shows subject, SANs, issuer chain, validity dates.'],
            ['🔐', 'Connection', 'Protocol (TLS 1.2/1.3), key exchange, cipher. Old protocols are flagged.'],
            ['🧩', 'Resources', 'Mixed content (passive images vs active scripts), and links to filtered Network view.'],
            ['🌍', 'Origins list', 'Main origin plus every secure/insecure origin contacted, each with its own certificate details.'],
            ['🍪', 'Privacy controls', 'Newer versions include third-party cookie and privacy diagnostics in the same panel.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Security overview illustration with three rows: certificate valid and trusted, connection secure TLS 1.3, resources mixed content with 4 insecure images.',
              caption: 'Figure 1 — Security overview summary (illustration).',
              html: '<div class="dt-sec"><div class="ok">✅ <b>Certificate</b> — valid and trusted (CN=ascwebqi.contoso.org, expires in 212 days)</div><div class="ok">✅ <b>Connection</b> — secure, TLS 1.3, X25519, AES_128_GCM</div><div class="bad">⚠️ <b>Resources</b> — mixed content: 4 images loaded over HTTP · View 4 requests in Network panel</div></div>' }
        ],
        steps: [
            'Open Security and reload. Read the three summary rows.',
            'Certificate invalid? Click <strong>View certificate</strong>: check the hostname is in Subject Alternative Names, the chain includes the intermediate, and dates are valid. Common IIS issue: missing intermediate certificate in the binding.',
            'Mixed content? Click <strong>View requests in Network panel</strong>. Note each insecure URL and its <strong>Initiator</strong>.',
            'Classify: <em>passive</em> (images, video) may be auto-upgraded or shown with warning; <em>active</em> (scripts, iframes, XHR) is blocked.',
            'Fix URLs at source (use https or relative URLs), or add CSP <code>upgrade-insecure-requests</code> as a safety net.',
            'Reload and confirm Security shows a secure page and Console has no mixed-content messages.'
        ],
        code: [
            { type: 'code', lang: 'cshtml', label: 'Fixing URLs in Razor', code: `
@* BAD: absolute http URL from the database *@
<img src="@facility.LogoUrl" alt="@facility.Name logo" />

@* GOOD: normalise to https or serve from the app *@
<img src="@Url.Content("~/logos/" + facility.Id + ".png")" alt="@facility.Name logo" />` },
            { type: 'code', lang: 'csharp', label: 'ASP.NET Core: HTTPS redirection, HSTS, CSP header', code: `
if (!app.Environment.IsDevelopment()) app.UseHsts();
app.UseHttpsRedirection();
app.Use(async (ctx, next) => {
    ctx.Response.Headers["Content-Security-Policy"] = "upgrade-insecure-requests; default-src 'self'";
    ctx.Response.Headers["X-Content-Type-Options"] = "nosniff";
    await next();
});` }
        ],
        evidence: [
            { type: 'prose', html: '<ul><li><strong>Valid cert + secure connection + no mixed content</strong> = transport looks correct from this browser. It says nothing about application vulnerabilities.</li><li><strong>NET::ERR_CERT_COMMON_NAME_INVALID</strong> = hostname not in SANs. <strong>ERR_CERT_DATE_INVALID</strong> = expired or clock wrong. <strong>ERR_CERT_AUTHORITY_INVALID</strong> = untrusted/self-signed or missing intermediate.</li><li>Response security headers (CSP, HSTS, X-Frame-Options) are inspected in <strong>Network → Headers</strong>, not in the Security panel.</li></ul>' },
            { type: 'callout', kind: 'danger', title: 'DevTools is not a security audit', html: '<p>The Security panel checks only what the browser observes about transport. It cannot detect SQL injection, broken authorization, insecure direct object references, weak server configuration, vulnerable NuGet packages, secrets in config, or logic flaws. Use threat modelling, code review, SAST/DAST (e.g. OWASP ZAP), dependency scanning, and penetration testing.</p>' }
        ],
        mistakes: [
            ['"The padlock is green, so the app is secure."', 'The padlock means the connection is encrypted and the certificate valid — nothing more.'],
            ['Silencing mixed content by loading over HTTP everywhere.', 'Move everything to HTTPS; never downgrade.'],
            ['Using self-signed certs in shared environments.', 'Use an internal CA trusted by managed devices or a public CA.'],
            ['Forgetting the intermediate certificate on IIS.', 'Chrome may tolerate it via caching while other clients fail. Install the full chain.'],
            ['Looking for CSP in the Security panel.', 'Check Network → response headers and Console CSP violations.']
        ],
        notebook: [
            'Security panel = certificate + TLS + mixed content overview.',
            'View certificate: SANs, chain, dates.',
            'Mixed content: active is blocked, passive is warned/upgraded.',
            'Fix URLs at source; CSP upgrade-insecure-requests as backup.',
            'Security headers live in Network → Headers.',
            'DevTools ≠ security audit.'
        ],
        interview: [
            [['What is mixed content?', 'Resources loaded over HTTP on an HTTPS page.'],
             ['How do you view a site\'s certificate in Chrome?', 'Security panel → View certificate, or the site-info icon in the address bar.'],
             ['What does HSTS do?', 'Tells browsers to use HTTPS only for the domain for a period.']],
            [['Certificate works in Chrome but fails in a .NET HttpClient. Why?', 'Missing intermediate certificate — Chrome may fetch/cache it (AIA), but other clients do not.'],
             ['Active vs passive mixed content?', 'Active (scripts, iframes, XHR) can alter the page and is blocked; passive (images, media) is lower risk and often auto-upgraded.'],
             ['Where do you verify CSP?', 'Network response headers and Console violation messages.']],
            [['What does a mature web security program include beyond DevTools?', 'Threat modelling, secure SDLC, SAST/DAST, dependency/SBOM scanning, secrets scanning, pen tests, security headers baseline, monitoring and incident response.'],
             ['How would you roll out HSTS safely?', 'Start with a short max-age, verify all subdomains support HTTPS, then increase; consider preload only after full confidence.']]
        ],
        quiz: [
            Q('An HTTPS page loads a script over HTTP. What does Chrome do?', ['Runs it normally', 'Blocks it as active mixed content', 'Converts it to an image', 'Warns but always runs it'], 1, 'Active mixed content is blocked.'),
            Q('The padlock is shown and the certificate is valid. What can you conclude?', ['The app has no vulnerabilities', 'The connection is encrypted with a trusted certificate', 'SQL injection is impossible', 'Authorization is correct'], 1, 'It only confirms transport security.'),
            Q('ERR_CERT_COMMON_NAME_INVALID usually means…', ['Expired cert', 'Hostname not listed in the certificate SANs', 'Weak cipher', 'Mixed content'], 1, 'The host does not match the certificate.'),
            Q('Where do you check the Content-Security-Policy header?', ['Security panel', 'Network → response headers', 'Memory', 'Recorder'], 1, 'Headers are shown in Network.')
        ]
    });

    /* =====================================================================
       9. LIGHTHOUSE
       ===================================================================== */
    L.lighthouse = lesson({
        short: 'Lighthouse', icon: '🏮', title: 'Lighthouse — Automated Audits and Prioritising Fixes',
        tooltip: 'Performance, Accessibility, Best Practices, SEO audits; opportunities, diagnostics, prioritisation',
        badges: ['Audits', 'Core Web Vitals', 'Accessibility', 'SEO'],
        tagline: 'Lighthouse runs a repeatable, automated audit of a page and produces scored reports with <strong>specific, linked recommendations</strong>.',
        story: [
            'Management asks why the ASCWebQI login page "feels slow on hospital laptops". There is no budget for a big rewrite.',
            'Leela runs Lighthouse in <strong>Navigation</strong> mode, <strong>Mobile</strong>, with throttling. Performance scores 38: LCP 6.1 s. Opportunities list a 1.2 MB uncompressed hero PNG, render-blocking <code>kendo.all.min.css</code> and <code>kendo.all.min.js</code> on a page that uses no Kendo widgets, and no text compression. Accessibility 72: low-contrast labels and an image without alt. She fixes the top three items in a day; Performance rises to 86.'
        ],
        what: '<p>Lighthouse is an auditing tool built into DevTools (also available as a CLI and in PageSpeed Insights). It loads the page under controlled conditions and scores categories such as <strong>Performance</strong>, <strong>Accessibility</strong>, <strong>Best Practices</strong> and <strong>SEO</strong> (PWA audits were removed in recent versions).</p>',
        where: '<ul><li>Click the <strong>Lighthouse</strong> tab (under » if hidden).</li><li>Choose <strong>Mode</strong>, <strong>Device</strong> and <strong>Categories</strong> → <strong>Analyze page load</strong>.</li><li>Run in Incognito to avoid extension interference; keep the tab in the foreground.</li></ul>',
        screen: [
            ['🧭', 'Mode', '<strong>Navigation</strong> (page load), <strong>Timespan</strong> (a period of interactions), <strong>Snapshot</strong> (current state, e.g. an open dialog).'],
            ['📱', 'Device', 'Mobile (with simulated throttling) or Desktop.'],
            ['☑️', 'Categories', 'Performance, Accessibility, Best Practices, SEO.'],
            ['🔢', 'Scores', '0–49 red, 50–89 orange, 90–100 green.'],
            ['📏', 'Metrics', 'FCP, LCP, TBT, CLS, Speed Index. Expand for definitions.'],
            ['🚀', 'Opportunities / Insights', 'Changes with estimated savings (e.g. "Serve images in modern formats").'],
            ['🔬', 'Diagnostics', 'Extra information that does not directly translate to savings (large DOM, long main-thread tasks).'],
            ['✅', 'Passed audits', 'What is already good. Also "Not applicable" and "Additional items to manually check".'],
            ['🗂️', 'Report menu', 'View Treemap, Save as HTML/JSON, Open in Viewer; runtime settings (throttling, Chrome version).']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Four Lighthouse category score circles: Performance 38 in red, Accessibility 72 orange, Best Practices 92 green, SEO 83 orange.',
              caption: 'Figure 1 — Category scores before fixes (illustration with sample values).',
              html: '<div class="score-rings"><div class="score-ring-item"><div class="score-circle poor">38</div><div class="score-ring-label">Performance</div></div><div class="score-ring-item"><div class="score-circle ok">72</div><div class="score-ring-label">Accessibility</div></div><div class="score-ring-item"><div class="score-circle good">92</div><div class="score-ring-label">Best Practices</div></div><div class="score-ring-item"><div class="score-circle ok">83</div><div class="score-ring-label">SEO</div></div></div>' }
        ],
        steps: [
            'Open the page in Incognito. Lighthouse → Mode: Navigation, Device: Mobile, all categories → Analyze.',
            'Read the metrics first: which of LCP, TBT, CLS is worst? That tells you <em>what kind</em> of problem you have.',
            'Expand <strong>LCP element</strong> diagnostic to see which element is the largest paint (the hero image).',
            'List Opportunities by estimated savings; map each to a file (Treemap shows unused JS per bundle).',
            'Prioritise by <strong>impact × effort × risk</strong>: compress image, remove unused Kendo bundles from <code>_LoginLayout</code>, enable compression.',
            'Fix accessibility items that block users (contrast, labels, alt text) — they are cheap and important.',
            'Re-run 3 times and compare the median; save the HTML report for the ticket.'
        ],
        code: [
            { type: 'code', lang: 'csharp', label: 'Compression and static file caching in ASP.NET Core', code: `
builder.Services.AddResponseCompression(o => { o.EnableForHttps = true; });
app.UseResponseCompression();
app.UseStaticFiles(new StaticFileOptions {
    OnPrepareResponse = ctx =>
        ctx.Context.Response.Headers.CacheControl = "public,max-age=31536000,immutable"
});
// Use asp-append-version="true" so file names change on deploy` },
            { type: 'code', lang: 'cshtml', label: 'Login layout: load only what the page needs', code: `
<link rel="preload" as="image" href="~/img/login-hero.webp" fetchpriority="high">
<img src="~/img/login-hero.webp" width="960" height="540" alt="ASCWebQI dashboard preview">
<script src="~/js/login.js" asp-append-version="true" defer></script>
@* kendo.all.min.js removed from _LoginLayout *@` },
            { type: 'code', lang: 'bash', label: 'Lighthouse CLI / CI (optional)', code: `
npx lighthouse https://qa.ascwebqi.local/Account/Login --preset=desktop --output=html --output-path=./lh-login.html
# Lighthouse CI can enforce budgets on pull requests` }
        ],
        evidence: [
            { type: 'prose', html: '<ul><li>Scores vary run to run (network, CPU, extensions). Compare medians of several runs, not single numbers.</li><li><strong>Opportunities</strong> have estimated savings; <strong>Diagnostics</strong> explain context. Neither is a guarantee.</li><li>A 100 Accessibility score does not mean the page is accessible — automated checks catch only part of WCAG issues. Do keyboard and screen-reader testing.</li><li>Lighthouse is <strong>lab data</strong>; compare with field data (CrUX, RUM) for real users.</li><li>Lighthouse needs a reachable page; for pages behind login, run while signed in in DevTools (it uses your session) or script authentication in CI.</li></ul>' },
            { type: 'callout', kind: 'danger', title: 'Lighthouse is not a security assessment', html: '<p>Best Practices flags a few browser-visible issues (HTTPS use, known vulnerable JS libraries, console errors). It does not test authentication, authorization, injection, or server configuration.</p>' }
        ],
        mistakes: [
            ['Chasing a perfect 100.', 'Fix the items that move real-user metrics and block users; diminishing returns above ~90.'],
            ['Running with extensions and other tabs busy.', 'Use Incognito, foreground tab, consistent machine.'],
            ['Comparing a single run before and after.', 'Use medians of 3–5 runs.'],
            ['Treating Accessibility 100 as compliant.', 'Automated checks are partial; manual testing is required.'],
            ['Auditing only the home page.', 'Audit key journeys: login, dashboard, heavy grids, forms.']
        ],
        notebook: [
            'Modes: Navigation, Timespan, Snapshot.',
            'Read metrics first (LCP, TBT, CLS), then Opportunities.',
            'Prioritise impact × effort × risk.',
            'Scores vary — use medians.',
            'Accessibility score ≠ full accessibility.',
            'Lab data ≠ field data.',
            'Not a security audit.'
        ],
        interview: [
            [['What categories does Lighthouse audit?', 'Performance, Accessibility, Best Practices, SEO.'],
             ['What is LCP?', 'Largest Contentful Paint — when the largest visible content element renders.'],
             ['Where do you start reading a Lighthouse report?', 'Metrics, then Opportunities and Diagnostics.']],
            [['Why do Lighthouse scores fluctuate?', 'Variability in network, CPU load, extensions, server response; use multiple runs and controlled environments.'],
             ['Difference between Opportunities and Diagnostics?', 'Opportunities estimate savings for specific changes; Diagnostics give additional performance context.'],
             ['How do you audit a page behind authentication?', 'Run in DevTools while logged in, or script login with Puppeteer/Lighthouse user flows in CI.']],
            [['How would you integrate Lighthouse into delivery?', 'Lighthouse CI on PRs with performance budgets, track trends, combine with RUM; fail builds on regressions for key pages.'],
             ['How do you communicate Lighthouse results to non-technical stakeholders?', 'Tie metrics to user impact (time to see content, responsiveness), show before/after medians, and prioritised roadmap with effort estimates.']]
        ],
        quiz: [
            Q('Which mode audits a dialog that is already open without reloading?', ['Navigation', 'Timespan', 'Snapshot', 'Desktop'], 2, 'Snapshot audits the current page state.'),
            Q('Accessibility score is 100. What is true?', ['The page is fully WCAG compliant', 'Automated checks passed; manual testing is still needed', 'No screen reader testing needed', 'SEO is also 100'], 1, 'Automated audits cover only part of accessibility.'),
            Q('How should you compare before/after performance?', ['One run each', 'Median of several runs under the same conditions', 'Only desktop', 'Only with cache disabled in Network'], 1, 'Scores vary; medians are more reliable.'),
            Q('Does Lighthouse replace a security assessment?', ['Yes', 'No — it checks only a few browser-visible best practices', 'Only on HTTPS sites', 'Only in Desktop mode'], 1, 'Security needs dedicated testing.')
        ]
    });

    /* =====================================================================
       10. RECORDER
       ===================================================================== */
    L.recorder = lesson({
        short: 'Recorder', icon: '🎬', title: 'Recorder — Record, Replay and Measure User Flows',
        tooltip: 'Create recordings, replay, inspect steps, measure performance, export',
        badges: ['QA', 'Reproduction', 'Puppeteer', 'User flows'],
        tagline: 'Recorder captures a user journey as editable steps you can <strong>replay</strong>, <strong>measure</strong> and <strong>export</strong> — turning "it sometimes fails" into a repeatable script.',
        story: [
            'QA engineer Anita reports that saving a quality indicator <em>sometimes</em> shows "Record changed by another user" even when nobody else is editing. Developers cannot reproduce it.',
            'Anita records the flow in Recorder: log in → open Facility 12 → edit Target → Save → edit again → Save. She shares the exported JSON. A developer imports it, replays it with <strong>Slow</strong> network, and the second save fails every time: the client sends the <em>old</em> concurrency token (row version) because the grid does not refresh the model after the first save.'
        ],
        what: '<p>Recorder records clicks, typing, navigation and other interactions as a list of steps with selectors. You can replay them at normal or slow speed, edit steps, add assertions (waitForElement), measure the flow with the Performance panel, and export to JSON, Puppeteer scripts, or other formats via extensions.</p>',
        where: '<ul><li>Click the <strong>Recorder</strong> tab (under » or via ⋮ → More tools → Recorder).</li><li>Click <strong>Create a new recording</strong>, give it a name, choose the selector attribute (e.g. <code>data-testid</code>), then <strong>Start recording</strong>.</li><li>Perform the flow on the page, then <strong>End recording</strong>.</li></ul>',
        screen: [
            ['➕', 'Create / Import', 'Start a new recording or import a JSON recording from a colleague.'],
            ['🎯', 'Selector attribute', 'Custom attribute Recorder should prefer (e.g. <code>data-testid</code>) — makes replays robust.'],
            ['📋', 'Steps list', 'setViewport, navigate, click, change, keyDown, waitForElement, etc. Expand to edit selectors and values.'],
            ['▶️', 'Replay', 'Replay at Normal, Slow, Very slow or Extremely slow speed. Failing step is highlighted.'],
            ['📊', 'Performance panel', 'Replay while recording a Performance trace to measure the flow.'],
            ['⏸️', 'Step breakpoints', 'Pause replay before a step to inspect state (available in recent versions).'],
            ['💾', 'Export', 'JSON, @puppeteer/replay, Puppeteer script; extensions add Cypress, Playwright, WebPageTest and more.'],
            ['🔗', 'Code view', 'Show the recording as code side-by-side with steps.']
        ],
        screenExtra: [
            { type: 'figure', alt: 'Recorder workflow illustration: Record, Edit steps, Replay with slow network, Measure performance, Export JSON or Puppeteer.',
              caption: 'Figure 1 — Recorder workflow (illustration).',
              html: '<div class="dt-flow"><span>⏺ Record flow</span><span>✏️ Edit steps &amp; selectors</span><span>▶ Replay (slow / throttled)</span><span>📊 Measure performance</span><span>💾 Export &amp; share</span></div>' }
        ],
        steps: [
            'Add stable test hooks to the Razor views (<code>data-testid="btn-save"</code>). Set Recorder\'s selector attribute to <code>data-testid</code>.',
            'Create a recording "Save indicator twice" → Start → perform the flow → End recording.',
            'Review steps: remove accidental clicks, check each selector, add a <strong>waitForElement</strong> step for the success toast.',
            'Replay at <strong>Normal</strong> — passes. Set Network throttling to Slow 4G, replay again — step 9 fails.',
            'Add a breakpoint before step 9 (or replay with Performance) and open Network: the second PUT sends the old <code>RowVersion</code> and returns <code>409 Conflict</code>.',
            'Export the recording as JSON and attach to the bug; export as Puppeteer for an automated regression test.',
            'After the fix (refresh model after save), replay throttled 5 times — all pass.'
        ],
        code: [
            { type: 'code', lang: 'json', label: 'Exported recording (excerpt)', code: `
{
  "title": "Save indicator twice",
  "selectorAttribute": "data-testid",
  "steps": [
    { "type": "setViewport", "width": 1366, "height": 768, "deviceScaleFactor": 1, "isMobile": false, "hasTouch": false, "isLandscape": true },
    { "type": "navigate", "url": "https://qa.ascwebqi.local/Dashboard?facility=12" },
    { "type": "click", "selectors": [["[data-testid='cell-target-1042']"]], "offsetX": 20, "offsetY": 10 },
    { "type": "change", "selectors": [["[data-testid='input-target']"]], "value": "90" },
    { "type": "click", "selectors": [["[data-testid='btn-save']"]], "offsetX": 30, "offsetY": 12 },
    { "type": "waitForElement", "selectors": [["[data-testid='toast-success']"]] }
  ]
}` },
            { type: 'code', lang: 'bash', label: 'Replay in CI with @puppeteer/replay', code: `
npx @puppeteer/replay ./recordings/save-indicator-twice.json` },
            { type: 'code', lang: 'csharp', label: 'Server: optimistic concurrency returns 409', code: `
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, IndicatorDto dto)
{
    var entity = await _db.Indicators.FindAsync(id);
    _db.Entry(entity).Property(e => e.RowVersion).OriginalValue = dto.RowVersion;
    entity.Target = dto.Target;
    try { await _db.SaveChangesAsync(); }
    catch (DbUpdateConcurrencyException) { return Conflict(); }       // 409
    return Ok(new { entity.Id, entity.RowVersion });                   // client must store the new RowVersion
}` }
        ],
        evidence: [
            { type: 'prose', html: '<ul><li><strong>Fails only when throttled</strong> → timing/race condition (waiting for a response, stale state).</li><li><strong>Selector not found</strong> → fragile selector (auto-generated Kendo IDs, nth-child) or the UI changed. Prefer <code>data-testid</code> or ARIA selectors.</li><li><strong>Passes in Recorder, fails for users</strong> → differences in data, permissions, browser extensions, or screen size (check setViewport).</li><li>Recorder replays in <em>your</em> browser session (your cookies). Exported scripts in CI need their own login steps and test accounts.</li></ul>' },
            { type: 'callout', kind: 'warn', title: 'Sensitive data', html: '<p>Recordings capture typed values — including passwords. Edit them out or use test accounts before sharing or committing recordings.</p>' }
        ],
        mistakes: [
            ['Recording with auto-generated IDs.', 'Add <code>data-testid</code> attributes and set the selector attribute.'],
            ['Never adding waits/assertions.', 'Add waitForElement/expectations so replays verify outcomes, not just clicks.'],
            ['Sharing recordings with real credentials.', 'Remove typed passwords; use dedicated QA accounts.'],
            ['Only replaying at normal speed on a fast network.', 'Replay slow/throttled to expose race conditions.'],
            ['Treating Recorder as a full test framework.', 'Export to Puppeteer/Playwright for maintained automated suites.']
        ],
        notebook: [
            'Record → edit steps → replay → measure → export.',
            'Use <code>data-testid</code> as the selector attribute.',
            'Replay slow/throttled to expose timing bugs.',
            'Add waitForElement steps as assertions.',
            'Export JSON for tickets; Puppeteer for CI.',
            'Strip credentials before sharing.'
        ],
        interview: [
            [['What does Chrome Recorder do?', 'Records user interactions as steps that can be replayed, edited, measured and exported.'],
             ['How can QA share a reproduction with developers?', 'Export the recording as JSON; developers import and replay it.'],
             ['Why use data-testid attributes?', 'Stable selectors that do not change with styling or generated IDs.']],
            [['A replay fails only on slow network. What does that suggest?', 'A race condition or missing wait — state used before a response arrives.'],
             ['How do you measure a user flow\'s performance?', 'Replay the recording with Performance measurement to get a trace of the whole flow.'],
             ['Limitations of Recorder?', 'Runs in your session; no built-in data setup; selectors can break; complex assertions require exported code.']],
            [['How would you build a regression strategy using Recorder?', 'QA records critical journeys, developers export to Puppeteer/Playwright, add assertions and test data setup, run in CI against staging, review flaky tests.'],
             ['Governance for recordings?', 'Store in repo with review, no secrets, naming conventions, owners per journey, update when UI changes.']]
        ],
        quiz: [
            Q('Which setting makes Recorder selectors more robust?', ['Recording at Extremely slow speed', 'Setting a custom selector attribute like data-testid', 'Disabling cache', 'Using Snapshot mode'], 1, 'Custom attributes are stable across UI changes.'),
            Q('A flow fails only when replayed with throttling. Likely cause?', ['CSS specificity', 'Race condition / missing wait', 'Certificate error', 'Memory leak'], 1, 'Slower responses expose timing bugs.'),
            Q('Best format to share a recording with a developer?', ['Screenshot', 'Exported JSON recording', 'Lighthouse report', 'HAR only'], 1, 'JSON can be imported and replayed.'),
            Q('What must you do before sharing a login flow recording?', ['Nothing', 'Remove typed passwords or use test accounts', 'Convert to PNG', 'Disable JavaScript'], 1, 'Recordings store typed values.')
        ]
    });

})(window.DEVTOOLS_LESSONS);
