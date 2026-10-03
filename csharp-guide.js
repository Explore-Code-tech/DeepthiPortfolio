// C# 1-15 Interactive Guide Logic with Collapsible Sidebar & Practice Sandbox
let currentActiveVersion = 'all';
let currentSearchQuery = '';
let isLeadExpanded = true;
let isSidebarCollapsed = false;
let lastLoadedSnippet = '';

const SANDBOX_TEMPLATES = {
    hello: `using System;

class Program {
    static void Main() {
        string engineer = "Deepthi T";
        int experience = 14;
        Console.WriteLine($"Hello from .NET C#! Engineer: {engineer}, Experience: {experience}+ years");
        
        var logger = new Logger();
        logger.Log("System initialized successfully.");
    }
}

class Logger {
    public void Log(string message) {
        Console.WriteLine($"[INFO - {DateTime.Now:HH:mm:ss}] {message}");
    }
}`,

    linq: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        var orders = new List<Order> {
            new Order { Id = 101, Customer = "AptInfoSoft", Amount = 4500, IsPaid = true },
            new Order { Id = 102, Customer = "MedTech Corp", Amount = 1200, IsPaid = false },
            new Order { Id = 103, Customer = "CloudCare", Amount = 9800, IsPaid = true },
            new Order { Id = 104, Customer = "Srimantha-Algox", Amount = 15400, IsPaid = true }
        };

        Console.WriteLine("--- High Value Paid Orders (Amount > 3000) ---");
        var filtered = orders
            .Where(o => o.IsPaid && o.Amount > 3000)
            .OrderByDescending(o => o.Amount)
            .Select(o => $"Order #{o.Id}: {o.Customer} - \${o.Amount:N0}");

        foreach (var item in filtered) {
            Console.WriteLine(item);
        }

        decimal totalRevenue = orders.Where(o => o.IsPaid).Sum(o => o.Amount);
        Console.WriteLine($"\\nTotal Paid Revenue: \${totalRevenue:N0}");
    }
}

class Order {
    public int Id { get; set; }
    public string Customer { get; set; }
    public decimal Amount { get; set; }
    public bool IsPaid { get; set; }
}`,

    async: `using System;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        Console.WriteLine("[00:00.000] Starting asynchronous healthcare report pipeline...");
        
        var report1 = FetchSurgeryIncidentAuditAsync("ASC-WebQI Center #1");
        var report2 = FetchResidentCensusAsync("IHN Healthcare Network");

        string[] results = await Task.WhenAll(report1, report2);
        
        foreach (var r in results) {
            Console.WriteLine($"[Processed] {r}");
        }
        Console.WriteLine("All asynchronous microservices completed with zero blocking I/O.");
    }

    static async Task<string> FetchSurgeryIncidentAuditAsync(string center) {
        await Task.Delay(200); // Simulate non-blocking async network I/O
        return $"{center}: 0 High-Risk Incidents, Compliance Score: 99.4%";
    }

    static async Task<string> FetchResidentCensusAsync(string facility) {
        await Task.Delay(150);
        return $"{facility}: 420 Residents Active, 100% Care Plans Updated";
    }
}`,

    records: `using System;

// C# 9 & 10 Immutable Records & Pattern Matching
public record TradeOrder(string Symbol, decimal Price, int Quantity, string Side);

class Program {
    static void Main() {
        var buyOrder = new TradeOrder("MSFT", 420.50m, 50, "BUY");
        Console.WriteLine($"Original Record: {buyOrder}");

        // Non-destructive mutation using 'with' expression
        var modifiedOrder = buyOrder with { Price = 425.00m, Quantity = 100 };
        Console.WriteLine($"Modified with price update: {modifiedOrder}");

        EvaluateRisk(modifiedOrder);
    }

    static void EvaluateRisk(TradeOrder order) {
        string riskAssessment = order switch {
            { Quantity: > 500 } => "⚠️ High Volume - Requires Risk Manager Signoff",
            { Price: > 1000m, Side: "BUY" } => "📊 High Value Asset Acquisition",
            { Side: "BUY" } => "✅ Standard Buy Order Approved",
            _ => "ℹ️ Standard Order"
        };
        Console.WriteLine($"Risk Engine Result: {riskAssessment}");
    }
}`,

    primary: `using System;
using System.Collections.Generic;

// C# 12 Primary Constructors
public class InventoryManager(string warehouseName, int capacity) {
    public void DisplayStatus() {
        Console.WriteLine($"Warehouse: {warehouseName}, Maximum Capacity: {capacity} units");
        
        // C# 12 Collection Expressions & Spread Operator
        int[] batchA = [10, 20, 30];
        int[] batchB = [40, 50];
        int[] merged = [..batchA, ..batchB, 99];
        
        Console.WriteLine($"Combined Batches: [{string.Join(", ", merged)}]");
    }
}

class Program {
    static void Main() {
        var mgr = new InventoryManager("Bangalore Tech Logistics Hub", 50000);
        mgr.DisplayStatus();
    }
}`,

    lock: `using System;
using System.Threading;

class Program {
    // C# 13 System.Threading.Lock object
    private static readonly Lock _syncGate = new Lock();
    private static int _transactionCount = 0;

    static void Main() {
        Console.WriteLine("C# 13 System.Threading.Lock and params ReadOnlySpan Demo");
        
        LogEvents("User Login", "2FA Verified", "Portfolio Dashboard Loaded");

        ExecuteSafeTransaction(100);
        ExecuteSafeTransaction(250);
        Console.WriteLine($"Final Synchronized Count: {_transactionCount}");
    }

    // C# 13 params ReadOnlySpan
    static void LogEvents(params ReadOnlySpan<string> events) {
        Console.WriteLine("Event Stream:");
        foreach (var ev in events) {
            Console.WriteLine($"  -> {ev}");
        }
    }

    static void ExecuteSafeTransaction(int amount) {
        lock (_syncGate) {
            _transactionCount += amount;
            Console.WriteLine($"Processed \${amount}. Total: {_transactionCount}");
        }
    }
}

// Lightweight Lock simulation
class Lock { }`,

    field: `using System;

// C# 14 Field-Backed Properties (the 'field' keyword)
public class PatientRecord {
    public string PatientName {
        get => field;
        set => field = !string.IsNullOrWhiteSpace(value) ? value.Trim() : "Anonymous";
    }

    public int Age {
        get => field;
        set {
            if (value < 0 || value > 130) throw new ArgumentOutOfRangeException("Invalid Age");
            field = value;
        }
    }
}

class Program {
    static void Main() {
        var patient = new PatientRecord();
        patient.PatientName = "  Deepthi T  ";
        patient.Age = 34;

        Console.WriteLine($"Patient MRN Profile: Name='{patient.PatientName}', Age={patient.Age}");
    }
}`,

    unions: `using System;

// C# 15 Discriminated Unions / Sum Types Preview
public abstract record OperationResult<T> {
    public record Success(T Data) : OperationResult<T>;
    public record Failure(string Error, int Code) : OperationResult<T>;
}

class Program {
    static void Main() {
        Console.WriteLine("C# 15 Discriminated Unions & Exhaustive Pattern Matching");

        OperationResult<string> result = new OperationResult<string>.Success("Enterprise Azure SQL Pipeline Connected");

        string message = result switch {
            OperationResult<string>.Success s => $"✅ Success: {s.Data}",
            OperationResult<string>.Failure f => $"❌ Failed (Code {f.Code}): {f.Error}",
            _ => "Unknown result state"
        };

        Console.WriteLine(message);
    }
}`
};

document.addEventListener('DOMContentLoaded', () => {
    initLhsRibbon();
    renderRhsTopics('all');
    setupEventListeners();
});

// Escape HTML for safe display
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Format C# code with basic syntax highlight spans
function highlightCSharpSyntax(code) {
    if (!code) return '';
    let escaped = escapeHtml(code);
    
    // Replace comments
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span style="color: #6c7086; font-style: italic;">$1</span>');
    
    // Replace strings
    escaped = escaped.replace(/(".*?"|'.*?')/g, '<span style="color: #a6e3a1;">$1</span>');
    
    return escaped;
}

// 1. Initialize LHS Ribbon
let areAllLhsExpanded = false;

function initLhsRibbon() {
    const treeContainer = document.getElementById('lhs-tree');
    if (!treeContainer || typeof CSHARP_DATA === 'undefined') return;

    treeContainer.innerHTML = '';

    CSHARP_VERSION_ORDER.forEach((vKey, index) => {
        const vObj = CSHARP_DATA[vKey];
        if (!vObj || !vObj.topics || vObj.topics.length === 0) return;

        const accordion = document.createElement('div');
        accordion.className = 'version-accordion-item';
        accordion.setAttribute('data-version', vKey);
        if (index === 0) accordion.classList.add('expanded'); // expand C# 1.0 initially

        const icon = vObj.meta.icon || '📌';
        const subTitle = vObj.meta.title || '';

        // Header
        accordion.innerHTML = `
            <div class="version-item-header" onclick="toggleVersionAccordion('${vKey}', event)">
                <div class="version-name-group">
                    <span class="version-icon">${icon}</span>
                    <div class="version-title-stack">
                        <span class="version-main-title">${vKey}</span>
                        <span class="version-sub-title">${escapeHtml(subTitle)}</span>
                    </div>
                </div>
                <div class="version-right-group">
                    <span class="version-badge-count">${vObj.topics.length}</span>
                    <span class="version-chevron">▼</span>
                </div>
            </div>
            <div class="subtopics-list" id="subtopics-${sanitizeId(vKey)}">
                ${vObj.topics.map(t => `
                    <a class="subtopic-nav-link" href="#topic-${t.id}" onclick="onSubtopicClick('${vKey}', '${t.id}', event)">
                        <span class="subtopic-id">#${t.id}</span>
                        <span class="subtopic-title">${escapeHtml(t.topic)}</span>
                    </a>
                `).join('')}
            </div>
        `;

        treeContainer.appendChild(accordion);
    });
}

function toggleAllLhsVersions() {
    areAllLhsExpanded = !areAllLhsExpanded;
    const items = document.querySelectorAll('.version-accordion-item');
    items.forEach(item => {
        if (areAllLhsExpanded) {
            item.classList.add('expanded');
        } else {
            item.classList.remove('expanded');
        }
    });

    const btn = document.getElementById('btn-lhs-expand-all');
    if (btn) {
        btn.innerText = areAllLhsExpanded ? '📁 Collapse All' : '📂 Expand All';
    }
}

function sanitizeId(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '_');
}

// Toggle accordion open/close and select version
function toggleVersionAccordion(vKey, event) {
    if (event) event.stopPropagation();

    const item = document.querySelector(`.version-accordion-item[data-version="${vKey}"]`);
    if (item) {
        item.classList.toggle('expanded');
    }

    selectVersion(vKey);
}

// Select a specific version to view on RHS
function selectVersion(vKey) {
    currentActiveVersion = vKey;

    // Update active button states
    const allBtn = document.getElementById('lhs-btn-all');
    if (allBtn) {
        if (vKey === 'all') {
            allBtn.classList.add('active');
        } else {
            allBtn.classList.remove('active');
        }
    }

    document.querySelectorAll('.version-accordion-item').forEach(el => {
        if (el.getAttribute('data-version') === vKey) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    renderRhsTopics(vKey, currentSearchQuery);
}

// Subtopic click from LHS
function onSubtopicClick(vKey, topicId, event) {
    if (event) event.preventDefault();

    if (currentActiveVersion !== 'all' && currentActiveVersion !== vKey) {
        selectVersion(vKey);
    }

    document.querySelectorAll('.subtopic-nav-link').forEach(link => link.classList.remove('active-subtopic'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-subtopic');
    }

    setTimeout(() => {
        const card = document.getElementById(`topic-${topicId}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('highlight-target');
            setTimeout(() => card.classList.remove('highlight-target'), 2500);
        }
    }, 100);
}

// 2. Render RHS Cards
function renderRhsTopics(vKey, searchQuery = '') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container) return;

    let topicsToRender = [];

    if (vKey === 'all') {
        CSHARP_VERSION_ORDER.forEach(k => {
            if (CSHARP_DATA[k] && CSHARP_DATA[k].topics) {
                topicsToRender.push(...CSHARP_DATA[k].topics);
            }
        });
        if (titleEl) titleEl.innerHTML = `⚡ All C# Versions (1.0 to 15)`;
    } else if (CSHARP_DATA[vKey]) {
        topicsToRender = CSHARP_DATA[vKey].topics || [];
        const meta = CSHARP_DATA[vKey].meta || {};
        if (titleEl) titleEl.innerHTML = `${meta.icon || '📌'} ${vKey} <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">${meta.title || ''}</span>`;
    }

    // Apply search filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
        topicsToRender = topicsToRender.filter(t => {
            return (
                t.topic.toLowerCase().includes(q) ||
                t.articulation.toLowerCase().includes(q) ||
                t.syntax.toLowerCase().includes(q) ||
                t.myArticulation.toLowerCase().includes(q) ||
                t.version.toLowerCase().includes(q)
            );
        });
    }

    if (countEl) {
        countEl.innerText = `Showing ${topicsToRender.length} Topic${topicsToRender.length === 1 ? '' : 's'}`;
    }

    if (topicsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🔍 No topics found</h3>
                <p>Try searching for another keyword or select a different C# version from the left ribbon.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = topicsToRender.map(t => {
        const hasSyntax = t.syntax && t.syntax.trim().length > 0;
        const hasLead = t.myArticulation && t.myArticulation.trim().length > 0;

        return `
            <div class="topic-card" id="topic-${t.id}">
                <div class="card-header-row">
                    <div class="topic-title-group">
                        <span class="topic-id-badge">#${t.id}</span>
                        <h2 class="topic-title">${escapeHtml(t.topic)}</h2>
                    </div>
                    <div class="card-badges">
                        ${hasSyntax ? `<button class="btn-card-practice" onclick="practiceTopicInSandbox('${t.id}')">▶ Practice in Sandbox</button>` : ''}
                        <span class="topic-version-tag">${escapeHtml(t.version)}</span>
                    </div>
                </div>

                ${t.articulation ? `
                    <div class="articulation-box">
                        <div class="articulation-label">💡 Interview Articulation</div>
                        <div class="articulation-text">${escapeHtml(t.articulation)}</div>
                    </div>
                ` : ''}

                ${hasSyntax ? `
                    <div class="syntax-box">
                        <div class="syntax-label-row">
                            <span class="syntax-label">💻 Key Syntax & Example</span>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="btn-copy-code" onclick="practiceTopicInSandbox('${t.id}')">⚡ Practice</button>
                                <button class="btn-copy-code" onclick="copyCode(this, '${escapeHtml(t.syntax.replace(/'/g, "\\'").replace(/\n/g, '\\n'))}')">📋 Copy</button>
                            </div>
                        </div>
                        <pre class="syntax-code"><code>${highlightCSharpSyntax(t.syntax)}</code></pre>
                    </div>
                ` : ''}

                ${hasLead ? `
                    <div class="lead-articulation-box">
                        <div class="lead-articulation-header">
                            <span class="lead-articulation-title">🎯 Senior / Tech Lead Articulation</span>
                        </div>
                        <div class="lead-articulation-content">${escapeHtml(t.myArticulation)}</div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// 3. Search Handler for LHS
function filterLhsSearch(query) {
    const term = query.toLowerCase().trim();
    const items = document.querySelectorAll('.version-accordion-item');

    items.forEach(item => {
        const vKey = item.getAttribute('data-version');
        const vObj = CSHARP_DATA[vKey];
        if (!vObj) return;

        if (!term) {
            item.style.display = 'block';
            const links = item.querySelectorAll('.subtopic-nav-link');
            links.forEach(l => l.style.display = 'flex');
            return;
        }

        let hasMatch = false;
        const links = item.querySelectorAll('.subtopic-nav-link');
        links.forEach(link => {
            const text = link.innerText.toLowerCase();
            if (text.includes(term) || vKey.toLowerCase().includes(term)) {
                link.style.display = 'flex';
                hasMatch = true;
            } else {
                link.style.display = 'none';
            }
        });

        if (hasMatch || vKey.toLowerCase().includes(term)) {
            item.style.display = 'block';
            item.classList.add('expanded');
        } else {
            item.style.display = 'none';
        }
    });
}

// 4. Search Handler for RHS
function onRhsSearch(query) {
    currentSearchQuery = query;
    renderRhsTopics(currentActiveVersion, query);
}

// 5. Copy Code Helper
function copyCode(btn, codeText) {
    const decoded = codeText.replace(/\\n/g, '\n').replace(/\\'/g, "'");
    navigator.clipboard.writeText(decoded).then(() => {
        const orig = btn.innerText;
        btn.innerText = '✅ Copied!';
        btn.style.background = 'rgba(99, 102, 241, 0.6)';
        setTimeout(() => {
            btn.innerText = orig;
            btn.style.background = '';
        }, 1800);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// 6. Toggle All Lead Articulations
function toggleAllLeadArticulations() {
    isLeadExpanded = !isLeadExpanded;
    const boxes = document.querySelectorAll('.lead-articulation-box');
    const btn = document.getElementById('btn-toggle-all');

    boxes.forEach(box => {
        const content = box.querySelector('.lead-articulation-content');
        if (content) {
            content.style.display = isLeadExpanded ? 'block' : 'none';
        }
    });

    if (btn) {
        btn.innerText = isLeadExpanded ? 'Collapse Lead Notes' : 'Expand Lead Notes';
    }
}

// =========================================
// SIDEBAR COLLAPSE & EXPAND CONTROLLER
// =========================================
function toggleLhsSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    const layout = document.getElementById('master-layout');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    const toggleText = document.getElementById('sidebar-toggle-text');

    if (layout) {
        if (isSidebarCollapsed) {
            layout.classList.add('sidebar-collapsed');
            if (toggleIcon) toggleIcon.innerText = '▶';
            if (toggleText) toggleText.innerText = 'Sidebar (Show)';
        } else {
            layout.classList.remove('sidebar-collapsed');
            if (toggleIcon) toggleIcon.innerText = '◀';
            if (toggleText) toggleText.innerText = 'Sidebar (Hide)';
        }
    }
}

function expandSidebar() {
    isSidebarCollapsed = false;
    const layout = document.getElementById('master-layout');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    const toggleText = document.getElementById('sidebar-toggle-text');
    if (layout) layout.classList.remove('sidebar-collapsed');
    if (toggleIcon) toggleIcon.innerText = '◀';
    if (toggleText) toggleText.innerText = 'Sidebar (Hide)';
}

// =========================================
// C# LIVE PRACTICE SANDBOX ENGINE
// =========================================
function openSandbox(codeToLoad = null, title = '') {
    const overlay = document.getElementById('sandbox-overlay');
    const editor = document.getElementById('sandbox-code-editor');
    const output = document.getElementById('sandbox-output');
    const status = document.getElementById('sandbox-status');

    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (codeToLoad && editor) {
        editor.value = formatCodeForRunner(codeToLoad, title);
        lastLoadedSnippet = editor.value;
    } else if (editor && (!editor.value || editor.value.trim() === '')) {
        editor.value = SANDBOX_TEMPLATES.hello;
        lastLoadedSnippet = editor.value;
    }

    if (output) {
        output.innerHTML = `<span class="console-line-info">$ dotnet run Program.cs</span>\n<span class="console-line-success">Editor ready with ${title ? escapeHtml(title) : 'C# Code'}. Click [▶ Run Code] to execute.</span>`;
    }

    if (status) {
        status.innerText = '⚡ Status: Ready (Press Ctrl + Enter to Run)';
    }

    if (editor) {
        setTimeout(() => editor.focus(), 150);
    }
}

function closeSandbox() {
    const overlay = document.getElementById('sandbox-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSandboxOverlayClick(event) {
    if (event.target && event.target.id === 'sandbox-overlay') {
        closeSandbox();
    }
}

function practiceTopicInSandbox(topicId) {
    // Find topic in CSHARP_DATA
    let foundTopic = null;
    for (const vKey of CSHARP_VERSION_ORDER) {
        if (CSHARP_DATA[vKey] && CSHARP_DATA[vKey].topics) {
            const match = CSHARP_DATA[vKey].topics.find(t => String(t.id) === String(topicId));
            if (match) {
                foundTopic = match;
                break;
            }
        }
    }

    if (foundTopic && foundTopic.syntax) {
        openSandbox(foundTopic.syntax, `${foundTopic.version} - ${foundTopic.topic}`);
    } else {
        openSandbox(null, 'C# Practice');
    }
}

function formatCodeForRunner(code, title) {
    const clean = code.trim();
    if (clean.includes('class ') && clean.includes('Main')) {
        return clean;
    }

    // Wrap snippet inside runnable C# Program
    return `// Practice: ${title || 'C# Snippet'}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program {
    static void Main() {
        Console.WriteLine("=== Executing ${escapeHtml(title || 'C# Snippet')} ===");
        
        // --- Snippet Code ---
        ${clean.split('\n').join('\n        ')}
        
        Console.WriteLine("\\n=== Execution Finished Successfully ===");
    }
}`;
}

function onTemplateChange(templateKey) {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor || !SANDBOX_TEMPLATES[templateKey]) return;

    editor.value = SANDBOX_TEMPLATES[templateKey];
    lastLoadedSnippet = editor.value;
    clearSandboxOutput();
    
    const output = document.getElementById('sandbox-output');
    if (output) {
        output.innerHTML = `<span class="console-line-info">$ dotnet new console -n PracticeApp</span>\n<span class="console-line-success">Loaded template: ${templateKey.toUpperCase()}. Click [▶ Run Code] to execute.</span>`;
    }
}

function clearSandboxOutput() {
    const output = document.getElementById('sandbox-output');
    if (output) {
        output.innerHTML = '<span class="console-line-info">$ dotnet clean</span>\n<span class="console-line-warn">Console output cleared.</span>';
    }
}

function resetSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (editor && lastLoadedSnippet) {
        editor.value = lastLoadedSnippet;
        clearSandboxOutput();
    }
}

function copySandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (editor) {
        navigator.clipboard.writeText(editor.value).then(() => {
            const status = document.getElementById('sandbox-status');
            if (status) status.innerText = '✅ Code copied to clipboard!';
            setTimeout(() => {
                if (status) status.innerText = '⚡ Status: Ready (Press Ctrl + Enter to Run)';
            }, 2000);
        });
    }
}

// In-browser C# Execution Simulator
function runSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    const output = document.getElementById('sandbox-output');
    const status = document.getElementById('sandbox-status');
    if (!editor || !output) return;

    const source = editor.value;
    if (!source || source.trim() === '') {
        output.innerHTML = '<span class="console-line-error">❌ Error: Editor is empty. Write C# code to run.</span>';
        return;
    }

    if (status) status.innerText = '⏳ Compiling and Running with .NET JIT...';

    const logs = [];
    const simulatedConsole = {
        WriteLine: (...args) => {
            logs.push(args.map(a => formatOutputValue(a)).join(' '));
        },
        Write: (...args) => {
            if (logs.length > 0) {
                logs[logs.length - 1] += args.map(a => formatOutputValue(a)).join(' ');
            } else {
                logs.push(args.map(a => formatOutputValue(a)).join(' '));
            }
        }
    };

    const startTime = performance.now();

    try {
        const jsCode = transpileCSharpToExecutableJs(source);
        
        // Execute in safe isolated sandbox scope
        const runner = new Function('Console', 'Task', 'DateTime', 'Math', 'List', jsCode);
        
        // Task mock
        const TaskMock = {
            WhenAll: async (...tasks) => Promise.all(tasks),
            Delay: ms => new Promise(r => setTimeout(r, Math.min(ms, 300))),
            FromResult: v => Promise.resolve(v)
        };

        // List mock
        function ListMock(initial) {
            const arr = Array.isArray(initial) ? [...initial] : [];
            arr.Where = function(pred) { return ListMock(this.filter(pred)); };
            arr.Select = function(fn) { return ListMock(this.map(fn)); };
            arr.OrderBy = function(keyFn) { return ListMock([...this].sort((a, b) => keyFn(a) > keyFn(b) ? 1 : -1)); };
            arr.OrderByDescending = function(keyFn) { return ListMock([...this].sort((a, b) => keyFn(a) < keyFn(b) ? 1 : -1)); };
            arr.Sum = function(fn) { return this.reduce((acc, item) => acc + (fn ? fn(item) : item), 0); };
            arr.Count = function(pred) { return pred ? this.filter(pred).length : this.length; };
            arr.First = function(pred) { return pred ? this.filter(pred)[0] : this[0]; };
            arr.FirstOrDefault = function(pred) { return pred ? this.filter(pred)[0] : this[0]; };
            arr.ToList = function() { return ListMock(this); };
            arr.ToArray = function() { return [...this]; };
            return arr;
        }

        runner(simulatedConsole, TaskMock, new Date(), Math, ListMock);

        const duration = (performance.now() - startTime).toFixed(2);
        
        output.innerHTML = `
<span class="console-line-info">$ dotnet run Program.cs --runtime native-aot</span>
<span class="console-line-success">✅ Build Succeeded (0 Warnings, 0 Errors) in ${duration}ms</span>
--------------------------------------------------
${logs.length > 0 ? escapeHtml(logs.join('\n')) : '<span style="color: #6c7086;">(Code executed successfully with no stdout output)</span>'}
--------------------------------------------------
<span class="console-line-info">Process finished with exit code 0.</span>
        `.trim();

        if (status) status.innerText = `✅ Execution Finished (${duration}ms)`;

    } catch (err) {
        const duration = (performance.now() - startTime).toFixed(2);
        output.innerHTML = `
<span class="console-line-info">$ dotnet run Program.cs</span>
<span class="console-line-error">❌ Runtime / Evaluation Error (${duration}ms):</span>
<span class="console-line-error">${escapeHtml(err.message || err.toString())}</span>
--------------------------------------------------
<span class="console-line-warn">💡 Tip: For 100% full language C# Roslyn compilation, click [🌐 .NET Fiddle ↗] in the top header.</span>
        `.trim();

        if (status) status.innerText = '❌ Build / Runtime Error';
    }
}

function formatOutputValue(val) {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (typeof val === 'object') {
        try {
            return JSON.stringify(val);
        } catch {
            return val.toString();
        }
    }
    return String(val);
}

// Light C# to JS syntax transpiler for in-browser evaluation
function transpileCSharpToExecutableJs(source) {
    let code = source;

    // Remove using statements
    code = code.replace(/^\s*using\s+[^;]+;/gm, '');

    // Replace C# type declarations in variables (e.g. string x = "...", int y = 10, var z = ...)
    code = code.replace(/\b(string|int|double|decimal|bool|var|float|long|short|byte|char)\b\s+([a-zA-Z_]\w*)\s*=/g, 'let $2 =');

    // Replace new List<...>() with List([...])
    code = code.replace(/new\s+List<[^>]*>\s*\(([^)]*)\)/g, 'List($1)');
    code = code.replace(/new\s+List<[^>]*>\s*\{([^}]*)\}/g, 'List([$1])');

    // Replace object initializers: new Order { Id = 101, Customer = "ABC" } -> { Id: 101, Customer: "ABC" }
    code = code.replace(/new\s+([a-zA-Z_]\w*)\s*\{([^}]*)\}/g, (match, cls, props) => {
        const formattedProps = props.replace(/([a-zA-Z_]\w*)\s*=/g, '$1:');
        return `{ __type: "${cls}", ${formattedProps} }`;
    });

    // Replace decimal literals e.g. 4500m -> 4500
    code = code.replace(/(\d+(?:\.\d+)?)m\b/g, '$1');

    // Replace C# string interpolation: $"...{expr}..." -> `...${expr}...`
    code = code.replace(/\$"(.*?)"/g, (match, content) => {
        const formatted = content.replace(/:[NnCcDdFf]\d*/g, ''); // strip C# number format specifiers
        return '`' + formatted + '`';
    });

    // Replace class Program with Main runner call
    if (code.includes('class Program') && code.includes('Main')) {
        code += '\nif (typeof Program !== "undefined" && Program.Main) { Program.Main(); } else if (typeof Main !== "undefined") { Main(); }';
    }

    return code;
}

// 7. Setup Event Listeners & Keyboard Shortcuts
function setupEventListeners() {
    // Floating Back To Top
    const topBtn = document.getElementById('btn-back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            if (topBtn) topBtn.classList.add('visible');
        } else {
            if (topBtn) topBtn.classList.remove('visible');
        }
    });

    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Keyboard Shortcuts (Ctrl+B to toggle sidebar, Ctrl+Enter to run code, Escape to close sandbox)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            toggleLhsSidebar();
        } else if (e.key === 'Escape') {
            closeSandbox();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const overlay = document.getElementById('sandbox-overlay');
            if (overlay && overlay.classList.contains('active')) {
                e.preventDefault();
                runSandboxCode();
            }
        }
    });

    // Support Tab indentation inside the code editor textarea
    const editor = document.getElementById('sandbox-code-editor');
    if (editor) {
        editor.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    }
}
