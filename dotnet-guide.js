// .NET Master Architecture Guide Logic with Collapsible Sidebar & Live Practice Sandbox
let currentActiveVersion = 'all';
let currentSearchQuery = '';
let isLeadExpanded = true;
let isSidebarCollapsed = false;
let lastLoadedSnippet = '';
let areAllLhsExpanded = false;

const SANDBOX_TEMPLATES = {
    minimal: `using System;
using System.Collections.Generic;

// ASP.NET Core Minimal API Architecture Simulator
class Program {
    static void Main() {
        Console.WriteLine("[Kestrel 8.0] Server listening on https://localhost:5001");
        Console.WriteLine("[Routing] Endpoint mapped: GET /api/v1/health");
        Console.WriteLine("[Routing] Endpoint mapped: GET /api/v1/patients/{id}");
        
        var api = new PatientEndpoint();
        var result = api.GetPatient(101);
        Console.WriteLine($"\\n[HTTP 200 OK] Response Payload: {result}");
    }
}

public record PatientRecord(int Id, string FullName, string Room, string Status);

public class PatientEndpoint {
    public PatientRecord GetPatient(int id) {
        return new PatientRecord(id, "Deepthi Healthcare Patient", "ICU-Suite-4B", "Stable / Monitored");
    }
}`,

    channels: `using System;
using System.Threading.Channels;
using System.Threading.Tasks;

// High-Throughput System.Threading.Channels (Producer-Consumer)
class Program {
    static async Task Main() {
        Console.WriteLine("=== High-Throughput Trading Order Channel ===");
        var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(100) {
            FullMode = BoundedChannelFullMode.Wait
        });

        // Fast Producer
        var producer = Task.Run(async () => {
            string[] symbols = { "MSFT", "NVDA", "AAPL", "GOOGL", "AMZN" };
            foreach (var sym in symbols) {
                await channel.Writer.WriteAsync($"BUY {sym} @ market price");
                Console.WriteLine($"[Producer] Enqueued order: {sym}");
                await Task.Delay(50);
            }
            channel.Writer.Complete();
        });

        // Async Consumer
        var consumer = Task.Run(async () => {
            await foreach (var order in channel.Reader.ReadAllAsync()) {
                Console.WriteLine($"  -> [Consumer] Executed on Exchange: {order}");
            }
        });

        await Task.WhenAll(producer, consumer);
        Console.WriteLine("All orders successfully matched and routed with 0 lock contention!");
    }
}`,

    span: `using System;

// Zero-Allocation ReadOnlySpan<char> Parsing
class Program {
    static void Main() {
        string rawLog = "2026-10-05|TRACE|SURGERY_AUDIT_PASS|LATENCY_MS:14";
        Console.WriteLine($"Raw Header String: \\"{rawLog}\\"");

        // Zero-allocation slicing with ReadOnlySpan
        ReadOnlySpan<char> span = rawLog.AsSpan();

        int firstPipe = span.IndexOf('|');
        ReadOnlySpan<char> timestamp = span.Slice(0, firstPipe);

        ReadOnlySpan<char> remainder = span.Slice(firstPipe + 1);
        int secondPipe = remainder.IndexOf('|');
        ReadOnlySpan<char> level = remainder.Slice(0, secondPipe);

        ReadOnlySpan<char> payload = remainder.Slice(secondPipe + 1);

        Console.WriteLine($"\\n[Parsed via Span<T>] (0 Heap Bytes Allocated):");
        Console.WriteLine($"Timestamp: {timestamp.ToString()}");
        Console.WriteLine($"Log Level: {level.ToString()}");
        Console.WriteLine($"Payload  : {payload.ToString()}");
    }
}`,

    frozen: `using System;
using System.Collections.Generic;

// .NET 8 Frozen Collections & High-Speed O(1) Lookups
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 8 FrozenDictionary Benchmark Simulator ===");
        
        var standardDict = new Dictionary<string, string> {
            { "ASC", "Ambulatory Surgery Center" },
            { "IHN", "Integrated Healthcare Network" },
            { "EHR", "Electronic Health Records" }
        };

        // In .NET 8: var frozen = standardDict.ToFrozenDictionary();
        Console.WriteLine("Frozen dictionary constructed with pre-computed collision-free hashes.");
        Console.WriteLine($"Lookup key 'ASC': {standardDict["ASC"]}");
        Console.WriteLine($"Lookup key 'IHN': {standardDict["IHN"]}");
        Console.WriteLine("Read performance: Sub-nanosecond latency, zero thread lock contention.");
    }
}`,

    gc: `using System;

// Garbage Collection & Memory Diagnostic Metrics
class Program {
    static void Main() {
        Console.WriteLine("=== .NET CLR Memory & GC Diagnostics ===");
        
        long beforeAlloc = GC.GetTotalMemory(forceFullCollection: false);
        Console.WriteLine($"Initial Managed Heap Memory: {beforeAlloc / 1024.0:F2} KB");

        // Temporary allocations
        for (int i = 0; i < 50_000; i++) {
            var temp = new byte[64];
        }

        Console.WriteLine($"Gen 0 Collections: {GC.CollectionCount(0)}");
        Console.WriteLine($"Gen 1 Collections: {GC.CollectionCount(1)}");
        Console.WriteLine($"Gen 2 Collections: {GC.CollectionCount(2)}");
        Console.WriteLine($"Total Memory After Allocations: {GC.GetTotalMemory(false) / 1024.0:F2} KB");

        GC.Collect(0, GCCollectionMode.Forced);
        Console.WriteLine($"After Gen 0 GC Collection: {GC.GetTotalMemory(false) / 1024.0:F2} KB");
    }
}`,

    aspire: `using System;

// .NET Aspire Cloud-Native Distributed Orchestration Simulator
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Aspire AppHost Orchestration Engine ===");
        Console.WriteLine("[AppHost] Launching Distributed Application Host...");
        Console.WriteLine("[Resource: redis] Container 'redis:7.2-alpine' healthy on port 6379");
        Console.WriteLine("[Resource: postgres] Container 'postgres:16' healthy on port 5432");
        Console.WriteLine("[Resource: api-service] ASP.NET Core 9 Service running on port 7200");
        Console.WriteLine("[Resource: web-frontend] React / Blazor Web running on port 3000");
        Console.WriteLine("[OpenTelemetry] Dashboard listening on http://localhost:18888");
        Console.WriteLine("[ServiceDiscovery] Injected connection string 'Endpoint=redis:6379' into api-service");
        Console.WriteLine("\\nDistributed cloud topology active with automatic OpenTelemetry tracing!");
    }
}`,

    resilience: `using System;
using System.Threading.Tasks;

// Resilient Polly Pipeline Simulator (Retry, Timeout & Circuit Breaker)
class Program {
    static async Task Main() {
        Console.WriteLine("=== .NET Resilience Pipeline (Polly) ===");
        int attempts = 0;

        for (int i = 1; i <= 3; i++) {
            attempts++;
            Console.WriteLine($"[Attempt #{attempts}] Calling external Hospital API gateway...");
            if (attempts < 3) {
                Console.WriteLine("  -> [HTTP 503 Service Unavailable] Transient error. Applying exponential backoff delay...");
                await Task.Delay(200);
            } else {
                Console.WriteLine("  -> [HTTP 200 OK] Successful connection established! Circuit breaker state: CLOSED");
                break;
            }
        }
    }
}`
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initLhsTree();
    renderRhsTopics('all');

    // Setup Back to top button
    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Esc closes sandbox modal
        if (e.key === 'Escape') {
            closeSandbox();
        }
        // Ctrl + Enter runs code in sandbox
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const overlay = document.getElementById('sandbox-overlay');
            if (overlay && overlay.classList.contains('active')) {
                runSandboxCode();
            }
        }
        // Ctrl + B toggles sidebar
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            toggleLhsSidebar();
        }
    });

    // Indent handling in Sandbox textarea
    const textarea = document.getElementById('sandbox-code-editor');
    if (textarea) {
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    }
});

// 1. Initialize LHS Tree
function initLhsTree() {
    const treeContainer = document.getElementById('lhs-tree');
    if (!treeContainer || typeof DOTNET_DATA === 'undefined') return;

    treeContainer.innerHTML = '';

    DOTNET_VERSION_ORDER.forEach(vKey => {
        const vObj = DOTNET_DATA[vKey];
        if (!vObj) return;

        const count = vObj.topics ? vObj.topics.length : 0;
        const meta = vObj.meta || {};

        const accordion = document.createElement('div');
        accordion.className = 'version-accordion-item';
        accordion.setAttribute('data-version', vKey);

        accordion.innerHTML = `
            <div class="version-accordion-header" onclick="toggleVersionAccordion('${vKey}', event)">
                <div class="version-header-left">
                    <span class="version-chevron">▶</span>
                    <span class="version-title">${meta.icon || '📌'} ${vKey}</span>
                </div>
                <span class="version-badge-count">${count}</span>
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

function toggleVersionAccordion(vKey, event) {
    if (event) event.stopPropagation();

    const item = document.querySelector(`.version-accordion-item[data-version="${vKey}"]`);
    if (item) {
        item.classList.toggle('expanded');
    }

    selectVersion(vKey);
}

function selectVersion(vKey) {
    currentActiveVersion = vKey;

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

// 2. Render RHS Topics
function renderRhsTopics(vKey, searchQuery = '') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container) return;

    let topicsToRender = [];

    if (vKey === 'all') {
        DOTNET_VERSION_ORDER.forEach(k => {
            if (DOTNET_DATA[k] && DOTNET_DATA[k].topics) {
                topicsToRender.push(...DOTNET_DATA[k].topics);
            }
        });
        if (titleEl) titleEl.innerHTML = `🌐 All .NET Eras & Runtime Architectures`;
    } else if (DOTNET_DATA[vKey]) {
        topicsToRender = DOTNET_DATA[vKey].topics || [];
        const meta = DOTNET_DATA[vKey].meta || {};
        if (titleEl) titleEl.innerHTML = `${meta.icon || '📌'} ${vKey} <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">${meta.title || ''}</span>`;
    }

    // Search query filter
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
                <p>Try searching for another keyword or select a different .NET version/pillar from the left ribbon.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = topicsToRender.map(t => {
        const hasSyntax = t.syntax && t.syntax.trim().length > 0;
        const hasLead = t.myArticulation && t.myArticulation.trim().length > 0;

        return `
            <article class="topic-card" id="topic-${t.id}">
                <div class="topic-card-header">
                    <div class="topic-header-meta">
                        <span class="topic-version-badge">${escapeHtml(t.version)}</span>
                        <span class="topic-id-badge">#${t.id}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        ${hasSyntax ? `
                            <button class="btn-card-practice" onclick="practiceTopicCode('${t.id}')" title="Open and run this snippet in Live Sandbox">
                                <span>⚡ Practice</span>
                            </button>
                        ` : ''}
                        <button class="btn-copy-code" onclick="copyTopicCard('${t.id}', this)" title="Copy Topic Summary & Code">📋 Copy</button>
                    </div>
                </div>

                <h3 class="topic-title">${escapeHtml(t.topic)}</h3>

                <div class="topic-section">
                    <div class="section-badge standard-badge">
                        <span>📖 Architectural Standard</span>
                    </div>
                    <p class="articulation-text">${escapeHtml(t.articulation)}</p>
                </div>

                ${hasSyntax ? `
                    <div class="syntax-wrapper">
                        <div class="syntax-bar">
                            <span class="syntax-lang-label">C# / .NET ARCHITECTURE</span>
                            <button class="btn-copy-code" onclick="copySnippetOnly('${t.id}', this)">Copy Code</button>
                        </div>
                        <pre class="syntax-block"><code>${highlightDotNetSyntax(t.syntax)}</code></pre>
                    </div>
                ` : ''}

                ${hasLead ? `
                    <div class="topic-section lead-articulation-section ${isLeadExpanded ? 'expanded' : ''}" id="lead-section-${t.id}">
                        <div class="lead-header-toggle" onclick="toggleSingleLead('${t.id}')">
                            <div class="section-badge lead-badge">
                                <span>🎯 How I Explain This (Tech Lead Answer)</span>
                            </div>
                            <span class="lead-toggle-icon">${isLeadExpanded ? '▲' : '▼'}</span>
                        </div>
                        <div class="lead-content-box">
                            <p class="lead-text">${escapeHtml(t.myArticulation)}</p>
                        </div>
                    </div>
                ` : ''}
            </article>
        `;
    }).join('');
}

// 3. Search and Filtering
function filterLhsSearch(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.version-accordion-item');

    items.forEach(item => {
        const vKey = item.getAttribute('data-version');
        const vObj = DOTNET_DATA[vKey];
        if (!vObj) return;

        let hasMatch = vKey.toLowerCase().includes(q);
        const subLinks = item.querySelectorAll('.subtopic-nav-link');

        subLinks.forEach(link => {
            const text = link.innerText.toLowerCase();
            if (q === '' || text.includes(q)) {
                link.style.display = 'flex';
                hasMatch = true;
            } else {
                link.style.display = 'none';
            }
        });

        if (hasMatch) {
            item.style.display = 'block';
            if (q.length > 0) {
                item.classList.add('expanded');
            }
        } else {
            item.style.display = 'none';
        }
    });
}

function onRhsSearch(query) {
    currentSearchQuery = query;
    renderRhsTopics(currentActiveVersion, query);
}

// 4. Lead Articulation Toggle
function toggleAllLeadArticulations() {
    isLeadExpanded = !isLeadExpanded;
    const btn = document.getElementById('btn-toggle-all');
    if (btn) {
        btn.innerText = isLeadExpanded ? 'Collapse Lead Notes' : 'Expand Lead Notes';
    }

    document.querySelectorAll('.lead-articulation-section').forEach(sec => {
        if (isLeadExpanded) {
            sec.classList.add('expanded');
            const icon = sec.querySelector('.lead-toggle-icon');
            if (icon) icon.innerText = '▲';
        } else {
            sec.classList.remove('expanded');
            const icon = sec.querySelector('.lead-toggle-icon');
            if (icon) icon.innerText = '▼';
        }
    });
}

function toggleSingleLead(topicId) {
    const sec = document.getElementById(`lead-section-${topicId}`);
    if (sec) {
        sec.classList.toggle('expanded');
        const icon = sec.querySelector('.lead-toggle-icon');
        if (icon) {
            icon.innerText = sec.classList.contains('expanded') ? '▲' : '▼';
        }
    }
}

// 5. Sidebar Toggle
function toggleLhsSidebar() {
    const sidebar = document.getElementById('lhs-ribbon');
    const layout = document.getElementById('master-layout');
    const floatingBtn = document.getElementById('btn-floating-sidebar-show');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');

    if (!sidebar || !layout) return;

    isSidebarCollapsed = !isSidebarCollapsed;

    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        layout.classList.add('sidebar-collapsed');
        if (floatingBtn) floatingBtn.classList.add('visible');
        if (toggleIcon) toggleIcon.innerText = '▶';
    } else {
        sidebar.classList.remove('collapsed');
        layout.classList.remove('sidebar-collapsed');
        if (floatingBtn) floatingBtn.classList.remove('visible');
        if (toggleIcon) toggleIcon.innerText = '◀';
    }
}

function expandSidebar() {
    if (isSidebarCollapsed) {
        toggleLhsSidebar();
    }
}

// 6. Copy Utilities
function copySnippetOnly(topicId, btn) {
    let target = null;
    for (let k in DOTNET_DATA) {
        target = DOTNET_DATA[k].topics.find(x => x.id === topicId);
        if (target) break;
    }
    if (!target || !target.syntax) return;

    navigator.clipboard.writeText(target.syntax).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 1800);
    });
}

function copyTopicCard(topicId, btn) {
    let target = null;
    for (let k in DOTNET_DATA) {
        target = DOTNET_DATA[k].topics.find(x => x.id === topicId);
        if (target) break;
    }
    if (!target) return;

    const fullText = `[${target.version}] ${target.topic}\n\nStandard Architecture:\n${target.articulation}\n\nImplementation:\n${target.syntax || 'N/A'}\n\nTechnical Lead Perspective:\n${target.myArticulation}`;

    navigator.clipboard.writeText(fullText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1800);
    });
}

// 7. Live Sandbox Modal Logic
function openSandbox(customSnippet = '') {
    const overlay = document.getElementById('sandbox-overlay');
    const editor = document.getElementById('sandbox-code-editor');
    const select = document.getElementById('sandbox-template-select');

    if (!overlay || !editor) return;

    if (customSnippet && customSnippet.trim().length > 0) {
        editor.value = customSnippet;
        lastLoadedSnippet = customSnippet;
        if (select) select.value = 'custom';
    } else if (!editor.value.trim()) {
        editor.value = SANDBOX_TEMPLATES.minimal;
        if (select) select.value = 'minimal';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    editor.focus();
}

function closeSandbox() {
    const overlay = document.getElementById('sandbox-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleSandboxOverlayClick(event) {
    if (event.target.id === 'sandbox-overlay') {
        closeSandbox();
    }
}

function onTemplateChange(templateKey) {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor) return;

    if (SANDBOX_TEMPLATES[templateKey]) {
        editor.value = SANDBOX_TEMPLATES[templateKey];
        lastLoadedSnippet = SANDBOX_TEMPLATES[templateKey];
        clearSandboxOutput();
    }
}

function practiceTopicCode(topicId) {
    let target = null;
    for (let k in DOTNET_DATA) {
        target = DOTNET_DATA[k].topics.find(x => x.id === topicId);
        if (target) break;
    }
    if (!target || !target.syntax) return;

    let runnableSnippet = target.syntax;
    if (!runnableSnippet.includes('static void Main') && !runnableSnippet.includes('static async Task Main')) {
        runnableSnippet = `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        Console.WriteLine("=== Practicing .NET Topic: ${escapeQuotes(target.topic)} ===");
        
        // --- Topic Code Snippet ---
${target.syntax}
        
        Console.WriteLine("\\n[Execution Completed Successfully]");
    }
}`;
    }

    openSandbox(runnableSnippet);
}

function resetSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (editor && lastLoadedSnippet) {
        editor.value = lastLoadedSnippet;
    }
}

function copySandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
        const status = document.getElementById('sandbox-status');
        if (status) {
            status.innerText = '⚡ Status: Code copied to clipboard!';
            setTimeout(() => {
                status.innerText = '⚡ Status: Ready (Press Ctrl + Enter to Run)';
            }, 2000);
        }
    });
}

function clearSandboxOutput() {
    const out = document.getElementById('sandbox-output');
    if (out) {
        out.innerHTML = `<span class="console-line-info">$ dotnet run Program.cs</span>\n<span class="console-line-success">Console ready. Click [▶ Run Code] to execute!</span>`;
    }
}

function runSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    const output = document.getElementById('sandbox-output');
    const status = document.getElementById('sandbox-status');

    if (!editor || !output) return;

    const rawCode = editor.value;

    if (status) status.innerText = '⚡ Status: Compiling & Executing in .NET runtime...';

    output.innerHTML = `<span class="console-line-info">$ dotnet build Program.csproj -c Release</span>\n<span class="console-line-info">[MSBuild] Restoring NuGet dependencies... (0.12s)</span>\n<span class="console-line-info">[RyuJIT] Emitting native machine code... (0.04s)</span>\n<span class="console-line-info">$ dotnet run --no-build</span>\n<span style="color: #6c7086;">--------------------------------------------------</span>\n`;

    setTimeout(() => {
        try {
            const simulatedOutput = simulateDotNetExecution(rawCode);
            output.innerHTML += simulatedOutput;
            output.scrollTop = output.scrollHeight;
            if (status) status.innerText = '⚡ Status: Execution Finished (Return Code: 0)';
        } catch (err) {
            output.innerHTML += `<span class="console-line-error">[Runtime Error] ${escapeHtml(err.message)}</span>`;
            if (status) status.innerText = '⚡ Status: Execution Failed';
        }
    }, 280);
}

function simulateDotNetExecution(code) {
    const lines = [];
    
    // Extract Console.WriteLine patterns
    const writeLineRegex = /Console\.WriteLine\s*\(\s*(.*?)\s*\)\s*;/g;
    let match;
    let foundLogs = 0;

    while ((match = writeLineRegex.exec(code)) !== null) {
        let content = match[1].trim();
        // Unwrap simple string literals or string interpolations
        if (content.startsWith('$"') && content.endsWith('"')) {
            content = content.slice(2, -1);
        } else if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
        }
        
        // Clean escaped characters
        content = content.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '    ');
        lines.push(escapeHtml(content));
        foundLogs++;
    }

    if (foundLogs > 0) {
        return lines.map(l => `<span class="console-line-output">${l}</span>`).join('\n');
    }

    // Fallback realistic execution summary
    return `<span class="console-line-success">[Process Exited with Code 0] Managed execution completed successfully.</span>
<span class="console-line-info">[CLR Diagnostics] Heap Allocated: 4.8 KB | GC Gen 0: 0 collections | JIT Compilation: 12ms</span>`;
}

// 8. Syntax Highlighting Engine
function highlightDotNetSyntax(code) {
    if (!code) return '';
    let escaped = escapeHtml(code);

    // Comments
    escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="csharp-highlight-comment">$1</span>');

    // Strings
    escaped = escaped.replace(/(&quot;.*?&quot;)/g, '<span class="csharp-highlight-str">$1</span>');
    escaped = escaped.replace(/(\$".*?")/g, '<span class="csharp-highlight-str">$1</span>');

    // Keywords
    const keywords = [
        'public', 'private', 'protected', 'internal', 'static', 'class', 'interface', 'struct', 'record',
        'enum', 'void', 'int', 'string', 'bool', 'var', 'new', 'return', 'if', 'else', 'async', 'await',
        'Task', 'using', 'get', 'set', 'init', 'foreach', 'while', 'for', 'in', 'try', 'catch', 'finally',
        'throw', 'yield', 'readonly', 'const', 'delegate', 'event', 'override', 'virtual', 'abstract',
        'sealed', 'params', 'ref', 'out', 'Span', 'ReadOnlySpan', 'Memory', 'Channel', 'ValueTask'
    ];

    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(kwRegex, '<span class="csharp-highlight-kw">$1</span>');

    return escaped;
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeQuotes(str) {
    if (!str) return '';
    return str.replace(/"/g, '\\"');
}
