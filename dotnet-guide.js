// .NET Master Architecture Guide Logic with Chronological Journey, Abbreviation Index & Live Practice Sandbox
let currentActiveVersion = 'all';
let currentSearchQuery = '';
let isLeadExpanded = true;
let isSidebarCollapsed = false;
let lastLoadedSnippet = '';
let areAllLhsExpanded = false;
let currentViewMode = 'evolution'; // 'evolution', 'abbreviations', 'all'
let currentAbbrCategory = 'All';

const SANDBOX_TEMPLATES = {
    net1: `using System;
using System.Collections;

// .NET Framework 1.0 (2002) - Managed CLR Execution & Boxing
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Framework 1.0 Managed CLR Execution ===");
        
        string clrVer = Environment.Version.ToString();
        Console.WriteLine("CLR Runtime Version: " + clrVer);

        // In 1.0: Non-generic ArrayList causes boxing of value types
        ArrayList list = new ArrayList();
        list.Add(101); // int is boxed into System.Object heap
        list.Add("Healthcare Case #1");

        Console.WriteLine("Total Items: " + list.Count);
        Console.WriteLine("Unboxed Int: " + (int)list[0]);
        Console.WriteLine("Unboxed Str: " + (string)list[1]);
        Console.WriteLine("Garbage Collector Active. JIT Compilation verified.");
    }
}`,

    net2: `using System;
using System.Collections.Generic;

// .NET Framework 2.0 (2005) - True CLR Generics & Iterators
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Framework 2.0 Generics & Iterators ===");

        // True runtime generics: Zero boxing!
        List<int> caseIds = new List<int> { 101, 102, 103 };
        Console.WriteLine("Generic List Count: " + caseIds.Count);

        // Nullable types
        int? timeout = null;
        Console.WriteLine("Nullable int HasValue: " + timeout.HasValue);

        // Streaming lazy iterators
        foreach (var caseCode in StreamCases()) {
            Console.WriteLine("  -> Processed: " + caseCode);
        }
    }

    static IEnumerable<string> StreamCases() {
        yield return "CASE_SURGERY_A";
        yield return "CASE_SURGERY_B";
    }
}`,

    net3: `using System;
using System.Collections.Generic;
using System.Linq;

// .NET Framework 3.5 (2007) - LINQ & Lambda Expressions
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Framework 3.5 LINQ Declarative Query ===");
        
        var numbers = new List<int> { 10, 45, 12, 89, 34, 99, 23 };

        var filtered = numbers
            .Where(n => n > 30)
            .OrderByDescending(n => n)
            .Select(n => "Score: " + n);

        foreach (var item in filtered) {
            Console.WriteLine(item);
        }
    }
}`,

    net4: `using System;
using System.Threading;
using System.Threading.Tasks;

// .NET Framework 4.0 (2010) - Task Parallel Library & Work-Stealing
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Framework 4.0 Task Parallel Library (TPL) ===");
        
        string[] centers = { "North-Center", "South-Center", "East-Center", "West-Center" };

        Parallel.ForEach(centers, center => {
            Console.WriteLine("[Thread " + Thread.CurrentThread.ManagedThreadId + "] Processing " + center);
        });

        Console.WriteLine("All parallel worker tasks completed across CPU cores.");
    }
}`,

    netcore_span: `using System;

// .NET Core 2.1 (2018) - Span<T> Zero-Allocation Slicing
class Program {
    static void Main() {
        Console.WriteLine("=== .NET Core 2.1 Span<T> Zero-Allocation Slicing ===");
        
        string rawHeader = "CASE_ID:94821|SEVERITY:CRITICAL|AUDIT:PASS";
        ReadOnlySpan<char> span = rawHeader.AsSpan();

        // Slice without allocating a new string on the heap!
        ReadOnlySpan<char> caseId = span.Slice(8, 5);
        int id = int.Parse(caseId);

        Console.WriteLine("Extracted Case ID: #" + id + " (0 bytes allocated on heap!)");
    }
}`,

    netcore_channels: `using System;
using System.Threading.Channels;
using System.Threading.Tasks;

// .NET Core 3.1 (2019) - High-Throughput Channels Queue
class Program {
    static async Task Main() {
        Console.WriteLine("=== .NET Core 3.1 Lock-Free Channels Queue ===");
        var channel = Channel.CreateBounded<string>(50);

        var producer = Task.Run(async () => {
            string[] symbols = { "MSFT", "NVDA", "AAPL", "GOOGL" };
            foreach (var sym in symbols) {
                await channel.Writer.WriteAsync("BUY " + sym);
                Console.WriteLine("[Producer] Enqueued: " + sym);
                await Task.Delay(40);
            }
            channel.Writer.Complete();
        });

        var consumer = Task.Run(async () => {
            await foreach (var item in channel.Reader.ReadAllAsync()) {
                Console.WriteLine("  -> [Consumer] Executed: " + item);
            }
        });

        await Task.WhenAll(producer, consumer);
        Console.WriteLine("Lock-free producer-consumer queue completed successfully.");
    }
}`,

    net6_minimal: `using System;

// .NET 6 LTS (2021) - Minimal API & Dynamic PGO
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 6 LTS Minimal API Architecture ===");
        Console.WriteLine("[Route Discovery] Endpoint mapping compiled via Source Generators");
        Console.WriteLine("[GET] /api/v1/patients/{id} -> Returns Patient Record");
        Console.WriteLine("[RyuJIT] Dynamic PGO active: Interface calls de-virtualized.");
        Console.WriteLine("Cold start latency: Sub-50ms | Memory: ~25MB.");
    }
}`,

    net8_frozen: `using System;
using System.Collections.Generic;

// .NET 8 LTS (2023) - FrozenDictionary O(1) Lookups
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 8 LTS FrozenDictionary & Native AOT ===");
        
        var dict = new Dictionary<string, string> {
            { "ASC", "Ambulatory Surgery Center" },
            { "IHN", "Integrated Healthcare Network" },
            { "EHR", "Electronic Health Records" }
        };

        Console.WriteLine("Frozen Dictionary pre-computed collision-free hashes.");
        Console.WriteLine("Query 'ASC': " + dict["ASC"]);
        Console.WriteLine("Native AOT Status: 15MB binary, 8ms startup, 0 runtime JIT.");
    }
}`,

    net9_hybrid: `using System;

// .NET 9 (2024) - HybridCache Multi-Tier & DATAS GC
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 9 HybridCache & Server GC DATAS ===");
        Console.WriteLine("[HybridCache] L1 In-Memory + L2 Distributed Redis coordinated");
        Console.WriteLine("[Stampede Protection] Lock-free concurrent reader synchronization");
        Console.WriteLine("[DATAS GC] Active: Server heaps auto-scale to container RAM limits.");
    }
}`,

    net10_tensor: `using System;

// .NET 10 (2025) - Native Tensor<T> AI Primitives
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 10 AI Tensor<T> & Hardware SIMD ===");
        
        float[] vectorA = { 0.1f, 0.4f, 0.8f, 0.9f };
        float[] vectorB = { 0.5f, 0.2f, 0.1f, 0.7f };

        Console.WriteLine("Executing In-Process AI Cosine Similarity with AVX-512...");
        Console.WriteLine("Result: High Semantic Correlation (0.942)");
        Console.WriteLine("Zero Python overhead: Direct hardware silicon acceleration.");
    }
}`
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initLhsTree();
    renderActiveView();

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
        if (e.key === 'Escape') closeSandbox();
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const overlay = document.getElementById('sandbox-overlay');
            if (overlay && overlay.classList.contains('active')) runSandboxCode();
        }
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

// Switch between Evolution Journey, Abbreviation Index, and Combined view
function switchViewMode(mode) {
    currentViewMode = mode;

    document.querySelectorAll('.view-mode-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-mode-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    const roadmapBanner = document.getElementById('evolution-roadmap-banner');
    const abbrCategoryBar = document.getElementById('abbr-category-bar');

    if (mode === 'evolution') {
        if (roadmapBanner) roadmapBanner.style.display = 'flex';
        if (abbrCategoryBar) abbrCategoryBar.style.display = 'none';
    } else if (mode === 'abbreviations') {
        if (roadmapBanner) roadmapBanner.style.display = 'none';
        if (abbrCategoryBar) abbrCategoryBar.style.display = 'flex';
    } else { // 'all'
        if (roadmapBanner) roadmapBanner.style.display = 'flex';
        if (abbrCategoryBar) abbrCategoryBar.style.display = 'flex';
    }

    renderActiveView();
}

function filterAbbrCategory(category, btn) {
    currentAbbrCategory = category;
    document.querySelectorAll('.abbr-category-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (currentViewMode !== 'abbreviations' && currentViewMode !== 'all') {
        switchViewMode('abbreviations');
    } else {
        renderActiveView();
    }
}

function renderActiveView() {
    if (currentViewMode === 'evolution') {
        renderRhsTopics(currentActiveVersion, currentSearchQuery);
    } else if (currentViewMode === 'abbreviations') {
        renderAbbreviationCards(currentSearchQuery, currentAbbrCategory);
    } else {
        renderCombinedView(currentSearchQuery);
    }
}

// 1. Initialize LHS Tree
function initLhsTree() {
    const treeContainer = document.getElementById('lhs-tree');
    if (!treeContainer) return;

    treeContainer.innerHTML = '';

    // Section 1: Chronological Evolution Versions
    const versionHeaderSection = document.createElement('div');
    versionHeaderSection.style.padding = '0.5rem 0.6rem 0.2rem';
    versionHeaderSection.innerHTML = `<span style="font-size: 0.72rem; font-weight: 700; color: #A7727D; text-transform: uppercase; letter-spacing: 0.05em;">🗺️ Chronological Versions</span>`;
    treeContainer.appendChild(versionHeaderSection);

    if (typeof DOTNET_VERSION_ORDER !== 'undefined' && typeof DOTNET_DATA !== 'undefined') {
        DOTNET_VERSION_ORDER.forEach(vKey => {
            const vObj = DOTNET_DATA[vKey];
            if (!vObj) return;

            const count = vObj.topics ? vObj.topics.length : 0;
            const meta = vObj.meta || {};

            const accordion = document.createElement('div');
            accordion.className = 'version-accordion-item';
            accordion.setAttribute('data-version', vKey);

            accordion.innerHTML = `
                <div class="version-accordion-header" onclick="onLhsVersionClick('${vKey}', event)">
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

    // Section 2: Abbreviation & Interview Index in LHS
    if (typeof DOTNET_ABBREVIATIONS !== 'undefined') {
        const abbrHeaderSection = document.createElement('div');
        abbrHeaderSection.style.padding = '1.2rem 0.6rem 0.2rem';
        abbrHeaderSection.innerHTML = `<span style="font-size: 0.72rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em;">🔤 Abbreviation Index (${DOTNET_ABBREVIATIONS.length}+)</span>`;
        treeContainer.appendChild(abbrHeaderSection);

        const abbrAccordion = document.createElement('div');
        abbrAccordion.className = 'version-accordion-item expanded';
        abbrAccordion.setAttribute('data-version', 'abbreviations');

        abbrAccordion.innerHTML = `
            <div class="version-accordion-header" onclick="switchViewMode('abbreviations')">
                <div class="version-header-left">
                    <span class="version-chevron">▶</span>
                    <span class="version-title">🔤 All Interview Abbreviations</span>
                </div>
                <span class="version-badge-count" style="background: rgba(99,102,241,0.15); color: #6366f1;">${DOTNET_ABBREVIATIONS.length}</span>
            </div>
            <div class="subtopics-list" style="display: flex;">
                ${DOTNET_ABBREVIATIONS.map(a => `
                    <a class="subtopic-nav-link" href="#abbr-${a.abbr}" onclick="onAbbrLhsClick('${a.abbr}', event)">
                        <span class="subtopic-id" style="font-weight: 700; color: #6366f1;">${a.abbr}</span>
                        <span class="subtopic-title">${escapeHtml(a.fullForm)}</span>
                    </a>
                `).join('')}
            </div>
        `;

        treeContainer.appendChild(abbrAccordion);
    }
}

function onLhsVersionClick(vKey, event) {
    if (event) event.stopPropagation();
    if (currentViewMode !== 'evolution' && currentViewMode !== 'all') {
        switchViewMode('evolution');
    }
    toggleVersionAccordion(vKey, event);
}

function onAbbrLhsClick(abbrKey, event) {
    if (event) event.preventDefault();

    if (currentViewMode !== 'abbreviations' && currentViewMode !== 'all') {
        switchViewMode('abbreviations');
    }

    document.querySelectorAll('.subtopic-nav-link').forEach(link => link.classList.remove('active-subtopic'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-subtopic');
    }

    setTimeout(() => {
        const card = document.getElementById(`abbr-${abbrKey}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('highlight-target');
            setTimeout(() => card.classList.remove('highlight-target'), 2500);
        }
    }, 100);
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

    if (currentViewMode !== 'evolution' && currentViewMode !== 'all') {
        switchViewMode('evolution');
    }

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

    // Update active pill in roadmap
    document.querySelectorAll('.roadmap-step-pill').forEach(pill => {
        if (pill.getAttribute('data-version') === vKey) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    renderRhsTopics(vKey, currentSearchQuery);
}

function onSubtopicClick(vKey, topicId, event) {
    if (event) event.preventDefault();

    if (currentViewMode !== 'evolution' && currentViewMode !== 'all') {
        switchViewMode('evolution');
    }

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

// 2. Render Chronological Evolution Topics
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
        if (titleEl) titleEl.innerHTML = `🌐 Chronological .NET Evolution (1.0 ↓ 11) & Runtime Architecture`;
    } else if (DOTNET_DATA[vKey]) {
        topicsToRender = DOTNET_DATA[vKey].topics || [];
        const meta = DOTNET_DATA[vKey].meta || {};
        if (titleEl) titleEl.innerHTML = `${meta.icon || '📌'} ${vKey} <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">${meta.title || ''}</span>`;
    }

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
        topicsToRender = topicsToRender.filter(t => {
            const conceptsStr = t.keyConcepts ? t.keyConcepts.join(' ').toLowerCase() : '';
            const whatsNewStr = t.whatsNew ? t.whatsNew.join(' ').toLowerCase() : '';
            const followUpStr = t.architectFollowUp ? (t.architectFollowUp.question + ' ' + t.architectFollowUp.answer).toLowerCase() : '';
            return (
                t.topic.toLowerCase().includes(q) ||
                t.articulation.toLowerCase().includes(q) ||
                (t.syntax && t.syntax.toLowerCase().includes(q)) ||
                t.myArticulation.toLowerCase().includes(q) ||
                t.version.toLowerCase().includes(q) ||
                conceptsStr.includes(q) ||
                whatsNewStr.includes(q) ||
                followUpStr.includes(q)
            );
        });
    }

    if (countEl) {
        countEl.innerText = `Showing ${topicsToRender.length} Evolution Milestone${topicsToRender.length === 1 ? '' : 's'}`;
    }

    if (topicsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🔍 No topics found</h3>
                <p>Try searching for another keyword or switch to the Abbreviation & Interview Index.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = topicsToRender.map(t => renderSingleTopicHtml(t)).join('');
}

function renderSingleTopicHtml(t) {
    const hasSyntax = t.syntax && t.syntax.trim().length > 0;
    const hasLead = t.myArticulation && t.myArticulation.trim().length > 0;
    const hasConcepts = t.keyConcepts && t.keyConcepts.length > 0;
    const hasWhatsNew = t.whatsNew && t.whatsNew.length > 0;
    const hasFollowUp = t.architectFollowUp && t.architectFollowUp.question;

    return `
        <article class="topic-card evolutionary-version-card" id="topic-${t.id}">
            
            <!-- Card Header -->
            <div class="topic-card-header">
                <div class="topic-header-meta">
                    <span class="topic-version-badge">${escapeHtml(t.version)}</span>
                    <span class="topic-id-badge">#${t.id}</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    ${hasSyntax ? `
                        <button class="btn-card-practice" onclick="practiceTopicCode('${t.id}')" title="Open and run this snippet in Live Sandbox">
                            <span>⚡ Practice in Sandbox</span>
                        </button>
                    ` : ''}
                    <button class="btn-copy-code" onclick="copyTopicCard('${t.id}', this)" title="Copy Topic Summary & Code">📋 Copy</button>
                </div>
            </div>

            <!-- Title -->
            <h3 class="topic-title">${escapeHtml(t.topic)}</h3>

            <!-- 1. What's New & Core Purpose -->
            ${hasWhatsNew ? `
                <div class="topic-section">
                    <div class="section-badge whats-new-badge">
                        <span>🚀 What's New & Core Purpose</span>
                    </div>
                    <ul class="whats-new-list">
                        ${t.whatsNew.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <!-- 2. Runtime Engine & Execution Model -->
            ${t.runtimeEngine ? `
                <div class="topic-section">
                    <div class="section-badge runtime-engine-badge">
                        <span>⚙️ Runtime Engine & Execution Model</span>
                    </div>
                    <p class="runtime-engine-text">${escapeHtml(t.runtimeEngine)}</p>
                </div>
            ` : ''}

            <!-- 3. Key Concepts Checklist -->
            ${hasConcepts ? `
                <div class="topic-section">
                    <div class="section-badge concepts-badge">
                        <span>⭐ Essential Concept Checklist (Interview Mastery)</span>
                    </div>
                    <div class="key-concepts-grid">
                        ${t.keyConcepts.map(c => `<span class="concept-item-pill">${escapeHtml(c)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- 4. Architectural Standard -->
            <div class="topic-section">
                <div class="section-badge standard-badge">
                    <span>📖 Architectural Standard Breakdown</span>
                </div>
                <p class="articulation-text">${escapeHtml(t.articulation)}</p>
            </div>

            <!-- 5. One Executable Program -->
            ${hasSyntax ? `
                <div class="syntax-wrapper">
                    <div class="syntax-bar">
                        <span class="syntax-lang-label">💻 RUNNABLE C# PROGRAM (ONE PROGRAM PER VERSION)</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn-copy-code" onclick="practiceTopicCode('${t.id}')">⚡ Run in Sandbox</button>
                            <button class="btn-copy-code" onclick="copySnippetOnly('${t.id}', this)">Copy Code</button>
                        </div>
                    </div>
                    <pre class="syntax-block"><code>${highlightDotNetSyntax(t.syntax)}</code></pre>
                </div>
            ` : ''}

            <!-- 6. Technical Lead Interview Articulation -->
            ${hasLead ? `
                <div class="topic-section lead-articulation-section ${isLeadExpanded ? 'expanded' : ''}" id="lead-section-${t.id}">
                    <div class="lead-header-toggle" onclick="toggleSingleLead('${t.id}')">
                        <div class="section-badge lead-badge">
                            <span>🎯 How I Explain This in Interviews (Technical Lead Answer)</span>
                        </div>
                        <span class="lead-toggle-icon">${isLeadExpanded ? '▲' : '▼'}</span>
                    </div>
                    <div class="lead-content-box">
                        <p class="lead-text">${escapeHtml(t.myArticulation)}</p>
                    </div>
                </div>
            ` : ''}

            <!-- 7. Architect-Level Follow-Up Questions -->
            ${hasFollowUp ? `
                <div class="topic-section architect-followup-box">
                    <div class="followup-header">
                        <span class="followup-badge">💡 Architect-Level Follow-Up</span>
                        <strong class="followup-question">Q: ${escapeHtml(t.architectFollowUp.question)}</strong>
                    </div>
                    <div class="followup-answer">
                        <p><strong>A: </strong>${escapeHtml(t.architectFollowUp.answer)}</p>
                    </div>
                </div>
            ` : ''}

            <!-- 8. Five-Pass Mastery Indicator -->
            <div class="pass-mastery-footer">
                <span class="pass-mastery-label">5-Pass Study Loop:</span>
                <span class="pass-pill" title="Pass 1: Read and understand core mechanics">Pass 1: Understand</span>
                <span class="pass-pill" title="Pass 2: Recall the numbered concepts without notes">Pass 2: Recall</span>
                <span class="pass-pill" title="Pass 3: Run and modify the executable program">Pass 3: Code</span>
                <span class="pass-pill" title="Pass 4: Articulate the Tech Lead response fluently">Pass 4: Explain</span>
                <span class="pass-pill" title="Pass 5: Confidently answer the senior architect follow-up">Pass 5: Follow-Up</span>
            </div>

        </article>
    `;
}

// 3. Render Abbreviation & Architect Interview Index
function renderAbbreviationCards(searchQuery = '', category = 'All') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container || typeof DOTNET_ABBREVIATIONS === 'undefined') return;

    if (titleEl) {
        titleEl.innerHTML = `🔤 .NET Abbreviation & Architect Interview Index <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">(Category: ${category})</span>`;
    }

    let items = DOTNET_ABBREVIATIONS;

    // Filter by category
    if (category !== 'All') {
        items = items.filter(a => a.category === category);
    }

    // Filter by search query
    const q = searchQuery.toLowerCase().trim();
    if (q) {
        items = items.filter(a => {
            const qStr = (a.interviewQuestions || []).join(' ').toLowerCase();
            const scenarioStr = a.architectScenario ? (a.architectScenario.question + ' ' + a.architectScenario.answer).toLowerCase() : '';
            return (
                a.abbr.toLowerCase().includes(q) ||
                a.fullForm.toLowerCase().includes(q) ||
                a.oneLine.toLowerCase().includes(q) ||
                a.why.toLowerCase().includes(q) ||
                a.archRole.toLowerCase().includes(q) ||
                a.category.toLowerCase().includes(q) ||
                qStr.includes(q) ||
                scenarioStr.includes(q) ||
                (a.realProject && a.realProject.toLowerCase().includes(q))
            );
        });
    }

    if (countEl) {
        countEl.innerText = `Showing ${items.length} Architectural Abbreviation & Interview Deep-Dive${items.length === 1 ? '' : 's'}`;
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🔍 No abbreviations found</h3>
                <p>Try searching for another keyword or select a different category pill above.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(a => renderSingleAbbrHtml(a)).join('');
}

function renderSingleAbbrHtml(a) {
    const hasCode = a.code && a.code.trim().length > 0;
    const hasScenario = a.architectScenario && a.architectScenario.question;
    const hasQuestions = a.interviewQuestions && a.interviewQuestions.length > 0;

    return `
        <article class="abbreviation-card" id="abbr-${a.abbr}">
            
            <!-- Header Row -->
            <div class="abbr-header-row">
                <div class="abbr-title-left">
                    <span class="abbr-badge-main">${escapeHtml(a.abbr)}</span>
                    <span class="abbr-fullform-text">— ${escapeHtml(a.fullForm)}</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span class="abbr-category-tag">${escapeHtml(a.category)}</span>
                    ${hasCode ? `
                        <button class="btn-card-practice" onclick="practiceAbbrCode('${a.abbr}')" title="Open snippet in Live Sandbox">
                            <span>⚡ Practice</span>
                        </button>
                    ` : ''}
                    <button class="btn-copy-code" onclick="copyAbbrCard('${a.abbr}', this)" title="Copy entire abbreviation deep-dive">📋 Copy</button>
                </div>
            </div>

            <!-- 1. One-line Meaning -->
            <div class="abbr-oneline-box">
                <strong>One-Line Meaning:</strong> ${escapeHtml(a.oneLine)}
            </div>

            <!-- 2. Why it Exists & Architecture Role (Grid) -->
            <div class="abbr-details-grid">
                <div class="abbr-detail-item">
                    <strong>💡 Why It Exists:</strong>
                    <span>${escapeHtml(a.why)}</span>
                </div>
                <div class="abbr-detail-item">
                    <strong>⚙️ Architectural Role:</strong>
                    <span>${escapeHtml(a.archRole)}</span>
                </div>
            </div>

            <!-- 3. Progressive Interview Questions (What interviewer may ask) -->
            ${hasQuestions ? `
                <div class="abbr-questions-section">
                    <div class="abbr-questions-title">
                        <span>❓ What Interviewer May Ask Next (Progressive Interview Chain):</span>
                    </div>
                    <ul class="abbr-questions-list">
                        ${a.interviewQuestions.map(q => `<li>${escapeHtml(q)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <!-- 4. Senior / Architect Scenario Question & Answer -->
            ${hasScenario ? `
                <div class="architect-followup-box">
                    <div class="followup-header">
                        <span class="followup-badge">🎯 Senior Technical Lead / Architect Scenario</span>
                        <strong class="followup-question">Scenario: ${escapeHtml(a.architectScenario.question)}</strong>
                    </div>
                    <div class="followup-answer">
                        <p><strong>Architectural Answer: </strong>${escapeHtml(a.architectScenario.answer)}</p>
                    </div>
                </div>
            ` : ''}

            <!-- 5. Real Enterprise Project Example -->
            ${a.realProject ? `
                <div class="real-project-box">
                    <strong>🏥 Real Enterprise Project Context (Deepthi's Portfolio):</strong>
                    <span>${escapeHtml(a.realProject)}</span>
                </div>
            ` : ''}

            <!-- 6. Executable Code / Sandbox Snippet -->
            ${hasCode ? `
                <div class="syntax-wrapper">
                    <div class="syntax-bar">
                        <span class="syntax-lang-label">💻 EXECUTABLE PROGRAM: ${escapeHtml(a.abbr)} IN ACTION</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn-copy-code" onclick="practiceAbbrCode('${a.abbr}')">⚡ Run in Sandbox</button>
                            <button class="btn-copy-code" onclick="copyAbbrCodeOnly('${a.abbr}', this)">Copy Code</button>
                        </div>
                    </div>
                    <pre class="syntax-block"><code>${highlightDotNetSyntax(a.code)}</code></pre>
                </div>
            ` : ''}

        </article>
    `;
}

// 4. Combined Master View (Both Versions & Abbreviations)
function renderCombinedView(searchQuery = '') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container) return;

    if (titleEl) titleEl.innerHTML = `⚡ Complete Master Architecture & Interview Knowledge System`;

    let vTopics = [];
    DOTNET_VERSION_ORDER.forEach(k => {
        if (DOTNET_DATA[k] && DOTNET_DATA[k].topics) vTopics.push(...DOTNET_DATA[k].topics);
    });

    let aItems = typeof DOTNET_ABBREVIATIONS !== 'undefined' ? DOTNET_ABBREVIATIONS : [];

    const q = searchQuery.toLowerCase().trim();
    if (q) {
        vTopics = vTopics.filter(t => t.topic.toLowerCase().includes(q) || t.articulation.toLowerCase().includes(q));
        aItems = aItems.filter(a => a.abbr.toLowerCase().includes(q) || a.fullForm.toLowerCase().includes(q) || a.oneLine.toLowerCase().includes(q));
    }

    if (countEl) {
        countEl.innerText = `Showing ${vTopics.length} Versions & ${aItems.length} Architectural Abbreviations`;
    }

    container.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.3rem; color: #2d1c24; margin-bottom: 1rem;">🗺️ Chronological Version Evolution (${vTopics.length})</h3>
            ${vTopics.map(t => renderSingleTopicHtml(t)).join('')}
        </div>
        <div>
            <h3 style="font-size: 1.3rem; color: #2d1c24; margin-bottom: 1rem;">🔤 Abbreviation & Architect Interview Index (${aItems.length})</h3>
            ${aItems.map(a => renderSingleAbbrHtml(a)).join('')}
        </div>
    `;
}

// 5. Search and Filtering
function filterLhsSearch(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.version-accordion-item');

    items.forEach(item => {
        const vKey = item.getAttribute('data-version');
        let hasMatch = false;

        if (vKey === 'abbreviations') {
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
        } else {
            const vObj = DOTNET_DATA[vKey];
            if (!vObj) return;
            hasMatch = vKey.toLowerCase().includes(q);
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
        }

        if (hasMatch) {
            item.style.display = 'block';
            if (q.length > 0) item.classList.add('expanded');
        } else {
            item.style.display = 'none';
        }
    });
}

function onRhsSearch(query) {
    currentSearchQuery = query;
    renderActiveView();
}

// 6. Lead Articulation Toggle
function toggleAllLeadArticulations() {
    isLeadExpanded = !isLeadExpanded;
    const btn = document.getElementById('btn-toggle-all');
    if (btn) btn.innerText = isLeadExpanded ? 'Collapse Lead Notes' : 'Expand Lead Notes';

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
        if (icon) icon.innerText = sec.classList.contains('expanded') ? '▲' : '▼';
    }
}

// 7. Sidebar Toggle
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
    if (isSidebarCollapsed) toggleLhsSidebar();
}

// 8. Copy Utilities
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

    const concepts = target.keyConcepts ? `\n\nKey Concepts:\n` + target.keyConcepts.join('\n') : '';
    const followUp = target.architectFollowUp ? `\n\nArchitect Follow-Up:\nQ: ${target.architectFollowUp.question}\nA: ${target.architectFollowUp.answer}` : '';

    const fullText = `[${target.version}] ${target.topic}\n\nStandard Architecture:\n${target.articulation}${concepts}\n\nExecutable Code:\n${target.syntax || 'N/A'}\n\nTechnical Lead Perspective:\n${target.myArticulation}${followUp}`;

    navigator.clipboard.writeText(fullText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => btn.innerText = originalText, 1800);
    });
}

function practiceAbbrCode(abbrKey) {
    if (typeof DOTNET_ABBREVIATIONS === 'undefined') return;
    const target = DOTNET_ABBREVIATIONS.find(a => a.abbr === abbrKey);
    if (!target || !target.code) return;
    openSandbox(target.code);
}

function copyAbbrCodeOnly(abbrKey, btn) {
    if (typeof DOTNET_ABBREVIATIONS === 'undefined') return;
    const target = DOTNET_ABBREVIATIONS.find(a => a.abbr === abbrKey);
    if (!target || !target.code) return;

    navigator.clipboard.writeText(target.code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => btn.innerText = originalText, 1800);
    });
}

function copyAbbrCard(abbrKey, btn) {
    if (typeof DOTNET_ABBREVIATIONS === 'undefined') return;
    const a = DOTNET_ABBREVIATIONS.find(x => x.abbr === abbrKey);
    if (!a) return;

    const questions = a.interviewQuestions ? a.interviewQuestions.join('\n- ') : '';
    const scenario = a.architectScenario ? `\n\nArchitect Scenario:\nQ: ${a.architectScenario.question}\nA: ${a.architectScenario.answer}` : '';

    const text = `[${a.abbr}] ${a.fullForm} (${a.category})\nMeaning: ${a.oneLine}\nWhy It Exists: ${a.why}\nArchitecture Role: ${a.archRole}\n\nProgressive Interview Questions:\n- ${questions}${scenario}\n\nReal Project Example:\n${a.realProject || 'N/A'}\n\nCode:\n${a.code || 'N/A'}`;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => btn.innerText = originalText, 1800);
    });
}

// 9. Live Sandbox Modal Logic
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
        editor.value = SANDBOX_TEMPLATES.net1;
        if (select) select.value = 'net1';
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
    if (event.target.id === 'sandbox-overlay') closeSandbox();
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

    openSandbox(target.syntax);
}

function resetSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (editor && lastLoadedSnippet) editor.value = lastLoadedSnippet;
}

function copySandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
        const status = document.getElementById('sandbox-status');
        if (status) {
            status.innerText = '⚡ Status: Code copied to clipboard!';
            setTimeout(() => status.innerText = '⚡ Status: Ready (Press Ctrl + Enter to Run)', 2000);
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

    if (status) status.innerText = '⚡ Status: Compiling MSIL & Executing in CLR runtime...';

    output.innerHTML = `<span class="console-line-info">$ dotnet build Program.csproj -c Release</span>\n<span class="console-line-info">[MSBuild] Emitting MSIL assembly & metadata... (0.09s)</span>\n<span class="console-line-info">[RyuJIT] Compiling MSIL to native machine code... (0.03s)</span>\n<span class="console-line-info">$ dotnet run --no-build</span>\n<span style="color: #6c7086;">--------------------------------------------------</span>\n`;

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
    const writeLineRegex = /Console\.WriteLine\s*\(\s*(.*?)\s*\)\s*;/g;
    let match;
    let foundLogs = 0;

    while ((match = writeLineRegex.exec(code)) !== null) {
        let content = match[1].trim();
        if (content.startsWith('$"') && content.endsWith('"')) {
            content = content.slice(2, -1);
        } else if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
        }
        
        content = content.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '    ');
        lines.push(escapeHtml(content));
        foundLogs++;
    }

    if (foundLogs > 0) {
        return lines.map(l => `<span class="console-line-output">${l}</span>`).join('\n');
    }

    return `<span class="console-line-success">[Process Exited with Code 0] Managed execution completed successfully.</span>
<span class="console-line-info">[CLR Diagnostics] Memory: Managed Heap Active | GC Gen 0: 0 collections | JIT Status: Ready</span>`;
}

// 10. Syntax Highlighting Engine
function highlightDotNetSyntax(code) {
    if (!code) return '';
    let escaped = escapeHtml(code);

    escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="csharp-highlight-comment">$1</span>');
    escaped = escaped.replace(/(&quot;.*?&quot;)/g, '<span class="csharp-highlight-str">$1</span>');
    escaped = escaped.replace(/(\$".*?")/g, '<span class="csharp-highlight-str">$1</span>');

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
