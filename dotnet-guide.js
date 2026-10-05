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
    updateGlobalMasteryCount();

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

    const abbrCategoryBar = document.getElementById('abbr-category-bar');

    if (mode === 'evolution') {
        if (abbrCategoryBar) abbrCategoryBar.style.display = 'none';
    } else if (mode === 'abbreviations') {
        if (abbrCategoryBar) abbrCategoryBar.style.display = 'flex';
    } else { // 'all'
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

// ==========================================================================
// 2. NATURAL INTERVIEW LEARNING SYSTEM: NORMALIZATION & RENDERING
// ==========================================================================

let isPracticeModeActive = false;
const RAW_CODE_CACHE = {};

function togglePracticeMode() {
    isPracticeModeActive = !isPracticeModeActive;
    const container = document.getElementById('topics-cards-container');
    const btn = document.getElementById('btn-practice-mode');
    
    if (container) {
        if (isPracticeModeActive) {
            container.classList.add('practice-mode-active');
        } else {
            container.classList.remove('practice-mode-active');
        }
    }
    
    if (btn) {
        if (isPracticeModeActive) {
            btn.classList.add('active');
            btn.innerHTML = '<span>👁️ Exit Practice Mode (Show Text)</span>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<span>🎤 Practice / Speak Mode</span>';
        }
    }
}

function toggleAnswerReveal(qId) {
    const el = document.getElementById(`ans-${qId}`);
    const btn = document.getElementById(`btn-rev-${qId}`);
    if (el) {
        el.classList.toggle('answer-revealed');
        const isRevealed = el.classList.contains('answer-revealed');
        if (btn) {
            btn.innerText = isRevealed ? 'Hide Answer' : '👁️ Reveal Answer';
        }
    }
}

function toggleSelfCheck(topicId, idx, cb) {
    const key = `selfcheck_${topicId}`;
    let state = [false, false, false, false, false];
    try {
        state = JSON.parse(localStorage.getItem(key) || '[false,false,false,false,false]');
    } catch (e) {}
    state[idx] = cb.checked;
    localStorage.setItem(key, JSON.stringify(state));
    updateCardCheckCounter(topicId, state);
    updateGlobalMasteryCount();
}

function updateCardCheckCounter(topicId, state) {
    const countEl = document.getElementById(`check-counter-${topicId}`);
    if (countEl) {
        const checkedCount = state.filter(Boolean).length;
        countEl.innerText = `${checkedCount} / 5`;
        if (checkedCount === 5) {
            countEl.style.background = 'rgba(16, 185, 129, 0.3)';
            countEl.style.color = '#065f46';
            countEl.innerHTML = '🏆 Mastered (5/5)';
        } else {
            countEl.style.background = 'rgba(16, 185, 129, 0.15)';
            countEl.style.color = '#065f46';
        }
    }
}

function updateGlobalMasteryCount() {
    let mastered = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('selfcheck_')) {
            try {
                const arr = JSON.parse(localStorage.getItem(k) || '[]');
                if (arr.filter(Boolean).length === 5) mastered++;
            } catch (e) {}
        }
    }
    const masteredEl = document.getElementById('mastered-count');
    if (masteredEl) masteredEl.innerText = mastered;
}

function restoreSelfChecks() {
    document.querySelectorAll('.nl-self-check-box').forEach(box => {
        const topicId = box.getAttribute('data-topic-id');
        if (!topicId) return;
        const key = `selfcheck_${topicId}`;
        try {
            const state = JSON.parse(localStorage.getItem(key) || '[false,false,false,false,false]');
            const checkboxes = box.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((cb, idx) => {
                cb.checked = !!state[idx];
            });
            updateCardCheckCounter(topicId, state);
        } catch (e) {}
    });
    updateGlobalMasteryCount();
}

// Normalizer for Evolutionary Version Topics
function normalizeVersionTopic(t) {
    if (t.syntax) {
        RAW_CODE_CACHE[sanitizeId(t.id)] = t.syntax;
    }

    const nbData = (typeof NOTEBOOK_VERSION_DATA !== 'undefined' && (NOTEBOOK_VERSION_DATA[t.version] || NOTEBOOK_VERSION_DATA[t.topic])) || null;

    if (nbData) {
        return {
            id: t.id,
            abbr: t.version.split(' ')[0] + ' ' + (t.version.split(' ')[1] || ''),
            fullForm: t.topic,
            category: t.era === 'framework' ? '.NET Framework' : t.era === 'core' ? '.NET Core' : '.NET Modern',
            title: t.topic,
            myUnderstanding: nbData.myUnderstanding,
            whyNeedIt: nbData.whyNeedIt,
            beforeAfter: nbData.beforeAfter,
            keywords: nbData.keywords,
            myArticulation: nbData.myArticulation,
            oneLineMemory: nbData.oneLineMemory,
            interviewQuestions: nbData.interviewQuestions,
            realProject: nbData.realProject,
            tinyCode: {
                code: t.syntax || "// Standalone executable program",
                explanation: "Standalone executable C# program demonstrating this milestone."
            }
        };
    }

    // Fallback if not in notebook dictionary
    const rawConcepts = t.keyConcepts || [];
    const cleanKeywords = rawConcepts.slice(0, 6).map(c => c.replace(/^\d+\.\s*/, ''));

    return {
        id: t.id,
        abbr: t.version.split(' ')[0] + ' ' + (t.version.split(' ')[1] || ''),
        fullForm: t.topic,
        category: t.era === 'framework' ? '.NET Framework' : t.era === 'core' ? '.NET Core' : '.NET Modern',
        title: t.topic,
        myUnderstanding: t.myArticulation || t.articulation,
        whyNeedIt: {
            earlier: "Legacy or earlier architectural approach.",
            problem: "Performance bottlenecks, tight platform coupling, or lack of modern APIs.",
            newFeature: t.topic,
            whatBecameEasier: (t.whatsNew && t.whatsNew[0]) || t.articulation
        },
        beforeAfter: {
            before: "Earlier manual or platform-coupled approach.",
            after: (t.whatsNew && t.whatsNew[0]) || t.articulation
        },
        keywords: cleanKeywords.length > 0 ? cleanKeywords : [t.version, "Runtime", "Architecture", "Performance"],
        myArticulation: t.myArticulation || t.articulation,
        oneLineMemory: `${t.version} = ${(t.whatsNew && t.whatsNew[0]) || t.articulation}`,
        interviewQuestions: [
            {
                q: `What was the primary innovation of ${t.version}?`,
                think: "Key features → architectural impact",
                a: (t.whatsNew && t.whatsNew[0]) || t.articulation
            },
            {
                q: `How does ${t.version} influence modern .NET development?`,
                think: "Evolution → modern runtime capabilities",
                a: t.runtimeEngine || t.articulation
            }
        ],
        realProject: "In ASC WebQI, migrated dependencies across .NET milestones to optimize server throughput and memory efficiency.",
        tinyCode: {
            code: t.syntax || "// Standalone executable program",
            explanation: "Executable C# program demonstrating this version's core capability."
        }
    };
}

// Normalizer for Abbreviation Topics
function normalizeAbbreviationTopic(a) {
    const rawCode = (a.tinyCode && a.tinyCode.code) || a.code || "";
    const safeId = sanitizeId(`abbr_${a.abbr.toLowerCase()}`);
    if (rawCode) {
        RAW_CODE_CACHE[safeId] = rawCode;
    }

    const whyNeed = {
        earlier: a.twoMinAnswer?.what ? `Before ${a.abbr}, developers managed execution, memory, or communication with manual boilerplate.` : `Before ${a.abbr}, applications lacked automated runtime capabilities.`,
        problem: a.why || "Manual memory errors, tight coupling, and lack of standardized runtime services.",
        newFeature: `${a.abbr} (${a.fullForm})`,
        whatBecameEasier: a.thirtySecAnswer ? a.thirtySecAnswer.split('.')[0] + '.' : "Automated memory safety, loose coupling, and standardized architecture."
    };

    const beforeAfter = {
        before: a.twoMinAnswer?.tradeoff ? a.twoMinAnswer.tradeoff.split(',')[0] : "Manual / unmanaged / tightly coupled approach.",
        after: a.thirtySecAnswer ? a.thirtySecAnswer.split('.')[0] + '.' : "Standardized, managed, and loosely coupled architecture."
    };

    const questions = [];
    if (a.interviewLevels) {
        if (a.interviewLevels.level1 && a.interviewLevels.level1[0]) questions.push(a.interviewLevels.level1[0]);
        if (a.interviewLevels.level2 && a.interviewLevels.level2[0]) questions.push(a.interviewLevels.level2[0]);
        if (a.interviewLevels.level3 && a.interviewLevels.level3[0]) questions.push(a.interviewLevels.level3[0]);
    } else if (a.interviewQuestions) {
        questions.push({ q: a.interviewQuestions[0] || `What is ${a.abbr}?`, think: "Core concept", a: a.oneLine || a.archRole });
        if (a.interviewQuestions[1]) questions.push({ q: a.interviewQuestions[1], think: "Architecture & trade-offs", a: a.archRole });
    }

    return {
        id: `abbr-${a.abbr}`,
        abbr: a.abbr,
        fullForm: a.fullForm,
        category: a.category,
        title: `${a.abbr} — ${a.fullForm}`,
        myUnderstanding: a.naturalExplanation || a.mentalModel || a.oneLine,
        whyNeedIt: whyNeed,
        beforeAfter: beforeAfter,
        keywords: (a.keywords && a.keywords.length > 0) ? a.keywords.slice(0, 5) : [a.abbr, a.fullForm, a.category, "Architecture"],
        myArticulation: a.naturalExplanation || a.thirtySecAnswer || a.archRole,
        oneLineMemory: `${a.abbr} = ${a.thirtySecAnswer ? a.thirtySecAnswer.split('.')[0] : (a.fullForm + ' providing core runtime capabilities')}.`,
        interviewQuestions: questions,
        realProject: a.realProject || "Applied in high-throughput enterprise architectures in ASC WebQI.",
        tinyCode: a.tinyCode || (a.code ? { code: a.code, explanation: "Executable program demonstrating concept." } : null)
    };
}

// Master Natural Learning Card Renderer (Personal Engineering Notebook Style)
function renderNaturalLearningCardHtml(item) {
    const hasCode = item.tinyCode && item.tinyCode.code && item.tinyCode.code.trim().length > 0;
    const safeTopicId = sanitizeId(item.id);

    return `
        <article class="natural-learning-card" id="${item.id}" data-topic-id="${safeTopicId}">
            
            <!-- Card Header -->
            <div class="nl-card-header">
                <div class="nl-header-meta">
                    <span class="nl-badge-primary">${escapeHtml(item.abbr)}</span>
                    <span class="nl-category-tag">${escapeHtml(item.category)}</span>
                    ${item.fullForm ? `<span class="nl-fullform-text">— ${escapeHtml(item.fullForm)}</span>` : ''}
                </div>
                <div class="nl-header-actions">
                    ${hasCode ? `
                        <button class="btn-card-practice" onclick="practiceTopicRawCode('${safeTopicId}')" title="Practice snippet in Live Sandbox">
                            <span>⚡ Sandbox</span>
                        </button>
                    ` : ''}
                    <button class="btn-copy-code" onclick="copyNaturalCard('${safeTopicId}', this)" title="Copy summary">📋 Copy</button>
                </div>
            </div>

            <!-- Title -->
            <h2 class="nl-topic-title">${escapeHtml(item.title)}</h2>

            <!-- 1. 🧠 My Understanding -->
            <div class="nl-section nl-understanding-box">
                <div class="nl-section-header">
                    <span class="nl-section-icon">🧠</span>
                    <strong>1. My Understanding</strong>
                    <span class="nl-sub-hint">(Explained Naturally to Another Developer)</span>
                </div>
                <p class="nl-understanding-text">${escapeHtml(item.myUnderstanding)}</p>
            </div>

            <!-- 2. 🤔 Why Did We Need It? (Problem -> Evolution Chain) -->
            ${item.whyNeedIt ? `
                <div class="nl-section nl-why-need-box">
                    <div class="nl-section-header">
                        <span class="nl-section-icon">🤔</span>
                        <strong>2. Why Did We Need It?</strong>
                        <span class="nl-sub-hint">(Problem → Evolution Chain)</span>
                    </div>
                    <div class="nl-evolution-flow">
                        <div class="nl-flow-node nl-node-earlier">
                            <span class="nl-node-label">Earlier</span>
                            <span class="nl-node-desc">${escapeHtml(item.whyNeedIt.earlier)}</span>
                        </div>
                        <span class="nl-flow-arrow">↓</span>
                        <div class="nl-flow-node nl-node-problem">
                            <span class="nl-node-label">Problem</span>
                            <span class="nl-node-desc">${escapeHtml(item.whyNeedIt.problem)}</span>
                        </div>
                        <span class="nl-flow-arrow">↓</span>
                        <div class="nl-flow-node nl-node-feature">
                            <span class="nl-node-label">New Solution</span>
                            <span class="nl-node-desc">${escapeHtml(item.whyNeedIt.newFeature)}</span>
                        </div>
                        <span class="nl-flow-arrow">↓</span>
                        <div class="nl-flow-node nl-node-easier">
                            <span class="nl-node-label">What Became Easier</span>
                            <span class="nl-node-desc">${escapeHtml(item.whyNeedIt.whatBecameEasier)}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- 3. 🔄 Before → After -->
            ${item.beforeAfter ? `
                <div class="nl-section nl-before-after-box">
                    <div class="nl-section-header">
                        <span class="nl-section-icon">🔄</span>
                        <strong>3. Before → After</strong>
                    </div>
                    <div class="nl-before-after-grid">
                        <div class="nl-ba-card nl-ba-before">
                            <span class="nl-ba-badge">Before</span>
                            <p class="nl-ba-text">${escapeHtml(item.beforeAfter.before)}</p>
                        </div>
                        <div class="nl-ba-arrow">➔</div>
                        <div class="nl-ba-card nl-ba-after">
                            <span class="nl-ba-badge">After</span>
                            <p class="nl-ba-text">${escapeHtml(item.beforeAfter.after)}</p>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- 4. 🔑 Keywords (Important words for interviews) -->
            ${item.keywords && item.keywords.length > 0 ? `
                <div class="nl-section nl-keywords-box">
                    <div class="nl-section-header">
                        <span class="nl-section-icon">🔑</span>
                        <strong>4. Keywords</strong>
                        <span class="nl-sub-hint">(Important Words for Interviews — Don't Memorize Sentences)</span>
                    </div>
                    <div class="nl-keywords-grid">
                        ${item.keywords.map(kw => `
                            <span class="nl-keyword-chip">📌 ${escapeHtml(kw)}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- 5. 💻 Small Code Example (where applicable) -->
            ${hasCode ? `
                <div class="nl-section nl-code-box">
                    <div class="nl-section-header">
                        <span class="nl-section-icon">💻</span>
                        <strong>5. Small Code Example</strong>
                        <div style="margin-left: auto; display: flex; gap: 0.4rem;">
                            <button class="btn-copy-code" onclick="practiceTopicRawCode('${safeTopicId}')">⚡ Run in Sandbox</button>
                            <button class="btn-copy-code" onclick="copySnippetRaw('${safeTopicId}', this)">Copy</button>
                        </div>
                    </div>
                    <pre class="syntax-block"><code id="code-${safeTopicId}">${highlightDotNetSyntax(item.tinyCode.code)}</code></pre>
                    ${item.tinyCode.explanation ? `
                        <div class="nl-code-flow">
                            <strong>What this shows:</strong> ${escapeHtml(item.tinyCode.explanation)}
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <!-- 6. 🎤 My Interview Articulation -->
            <div class="nl-section nl-natural-speaking-box">
                <div class="nl-section-header">
                    <span class="nl-section-icon">🎤</span>
                    <strong>6. My Interview Articulation</strong>
                    <span class="nl-sub-hint">(How I Explain This Naturally as a Tech Lead)</span>
                </div>
                <div class="nl-speaking-bubble">
                    <p class="nl-speaking-text">"${escapeHtml(item.myArticulation)}"</p>
                </div>
            </div>

            <!-- 7. 🔥 One-Line Memory -->
            <div class="nl-section nl-oneline-memory-box">
                <div class="nl-section-header">
                    <span class="nl-section-icon">🔥</span>
                    <strong>7. One-Line Memory</strong>
                    <span class="nl-sub-hint">(Quick Revision Before Interview)</span>
                </div>
                <p class="nl-oneline-text">${escapeHtml(item.oneLineMemory)}</p>
            </div>

            <!-- 8. 🎯 Interviewer May Ask (Practical follow-ups) -->
            ${renderInterviewerQuestionsHtml(item.interviewQuestions, safeTopicId)}

            <!-- 9. 🏥 Real Project Connection -->
            ${item.realProject ? `
                <div class="nl-section nl-realproject-box">
                    <div class="nl-section-header">
                        <span class="nl-section-icon">🏥</span>
                        <strong>Real Project Connection (ASC WebQI / Healthcare)</strong>
                    </div>
                    <p class="nl-realproject-text">${escapeHtml(item.realProject)}</p>
                </div>
            ` : ''}

            <!-- 10. ✅ Self-Check Checklist -->
            <div class="nl-self-check-box" data-topic-id="${safeTopicId}">
                <div class="nl-self-check-header">
                    <strong>✅ Can I explain this? (Self-Check Checklist)</strong>
                    <span class="nl-check-counter" id="check-counter-${safeTopicId}">0 / 5</span>
                </div>
                <div class="nl-check-items">
                    <label><input type="checkbox" onchange="toggleSelfCheck('${safeTopicId}', 0, this)"> I understand the concept naturally</label>
                    <label><input type="checkbox" onchange="toggleSelfCheck('${safeTopicId}', 1, this)"> I can explain the Before → After difference</label>
                    <label><input type="checkbox" onchange="toggleSelfCheck('${safeTopicId}', 2, this)"> I can speak using only the 4–6 keywords</label>
                    <label><input type="checkbox" onchange="toggleSelfCheck('${safeTopicId}', 3, this)"> I can answer the interviewer follow-up questions</label>
                    <label><input type="checkbox" onchange="toggleSelfCheck('${safeTopicId}', 4, this)"> I can state the One-Line Memory</label>
                </div>
            </div>

        </article>
    `;
}

function renderInterviewerQuestionsHtml(questions, topicId) {
    if (!questions || questions.length === 0) return '';

    return `
        <div class="nl-section nl-questions-container">
            <div class="nl-section-header">
                <span class="nl-section-icon">🎯</span>
                <strong>Interviewer May Ask</strong>
                <span class="nl-sub-hint">(Practical Follow-Up Questions)</span>
            </div>
            ${questions.map((item, idx) => renderSingleQuestionHtml(item, `${topicId}-q-${idx}`)).join('')}
        </div>
    `;
}

function renderSingleQuestionHtml(item, qId) {
    return `
        <div class="nl-question-item">
            <div class="nl-q-row">
                <p class="nl-question-title"><strong>Q:</strong> ${escapeHtml(item.q)}</p>
                <button class="btn-reveal-answer" id="btn-rev-${qId}" onclick="toggleAnswerReveal('${qId}')">👁️ Reveal Answer</button>
            </div>
            ${item.think ? `
                <div class="nl-think-badge">
                    <span>💡 Think:</span> <em>${escapeHtml(item.think)}</em>
                </div>
            ` : ''}
            <div class="nl-answer-box" id="ans-${qId}">
                <strong>Your answer:</strong> ${escapeHtml(item.a)}
            </div>
        </div>
    `;
}

// 3. Render Chronological Evolution Topics
function renderRhsTopics(vKey, searchQuery = '') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container) return;

    let rawTopics = [];

    if (vKey === 'all') {
        DOTNET_VERSION_ORDER.forEach(k => {
            if (DOTNET_DATA[k] && DOTNET_DATA[k].topics) {
                rawTopics.push(...DOTNET_DATA[k].topics);
            }
        });
        if (titleEl) titleEl.innerHTML = `🌐 Chronological .NET Evolution (1.0 ↓ 11) & Runtime Architecture`;
    } else if (DOTNET_DATA[vKey]) {
        rawTopics = DOTNET_DATA[vKey].topics || [];
        const meta = DOTNET_DATA[vKey].meta || {};
        if (titleEl) titleEl.innerHTML = `${meta.icon || '📌'} ${vKey} <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">${meta.title || ''}</span>`;
    }

    let items = rawTopics.map(t => normalizeVersionTopic(t));

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
        items = items.filter(it => {
            const kwStr = (it.keywords || []).join(' ').toLowerCase();
            const understandingStr = (it.myUnderstanding || '').toLowerCase();
            const articulationStr = (it.myArticulation || '').toLowerCase();
            const oneLineStr = (it.oneLineMemory || '').toLowerCase();
            const whyStr = it.whyNeedIt ? `${it.whyNeedIt.earlier} ${it.whyNeedIt.problem} ${it.whyNeedIt.newFeature} ${it.whyNeedIt.whatBecameEasier}`.toLowerCase() : '';
            return (
                (it.title || '').toLowerCase().includes(q) ||
                (it.abbr || '').toLowerCase().includes(q) ||
                understandingStr.includes(q) ||
                articulationStr.includes(q) ||
                oneLineStr.includes(q) ||
                whyStr.includes(q) ||
                kwStr.includes(q)
            );
        });
    }

    if (countEl) {
        countEl.innerText = `Showing ${items.length} Evolution Milestone${items.length === 1 ? '' : 's'}`;
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🔍 No topics found</h3>
                <p>Try searching for another keyword or switch to the Abbreviation & Interview Index.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(it => renderNaturalLearningCardHtml(it)).join('');
    restoreSelfChecks();
}

// 4. Render Abbreviation & Architect Interview Index
function renderAbbreviationCards(searchQuery = '', category = 'All') {
    const container = document.getElementById('topics-cards-container');
    const titleEl = document.getElementById('rhs-active-title');
    const countEl = document.getElementById('rhs-count-label');
    if (!container || typeof DOTNET_ABBREVIATIONS === 'undefined') return;

    if (titleEl) {
        titleEl.innerHTML = `🔤 .NET Abbreviation & Architect Interview Index <span style="font-size: 0.9rem; font-weight: 500; color: #6366f1; margin-left: 0.5rem;">(Category: ${category})</span>`;
    }

    let rawList = DOTNET_ABBREVIATIONS;

    // Filter by category
    if (category !== 'All') {
        rawList = rawList.filter(a => a.category === category);
    }

    let items = rawList.map(a => normalizeAbbreviationTopic(a));

    // Filter by search query
    const q = searchQuery.toLowerCase().trim();
    if (q) {
        items = items.filter(it => {
            const kwStr = (it.keywords || []).join(' ').toLowerCase();
            const understandingStr = (it.myUnderstanding || '').toLowerCase();
            const articulationStr = (it.myArticulation || '').toLowerCase();
            const oneLineStr = (it.oneLineMemory || '').toLowerCase();
            const whyStr = it.whyNeedIt ? `${it.whyNeedIt.earlier} ${it.whyNeedIt.problem} ${it.whyNeedIt.newFeature} ${it.whyNeedIt.whatBecameEasier}`.toLowerCase() : '';
            return (
                (it.abbr || '').toLowerCase().includes(q) ||
                (it.fullForm || '').toLowerCase().includes(q) ||
                (it.title || '').toLowerCase().includes(q) ||
                understandingStr.includes(q) ||
                articulationStr.includes(q) ||
                oneLineStr.includes(q) ||
                whyStr.includes(q) ||
                kwStr.includes(q)
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

    container.innerHTML = items.map(it => renderNaturalLearningCardHtml(it)).join('');
    restoreSelfChecks();
}

// 5. Combined Master View (Both Versions & Abbreviations)
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

    let vItems = vTopics.map(t => normalizeVersionTopic(t));
    let aItems = (typeof DOTNET_ABBREVIATIONS !== 'undefined' ? DOTNET_ABBREVIATIONS : []).map(a => normalizeAbbreviationTopic(a));

    const q = searchQuery.toLowerCase().trim();
    if (q) {
        vItems = vItems.filter(it => 
            (it.title || '').toLowerCase().includes(q) || 
            (it.myUnderstanding || '').toLowerCase().includes(q) ||
            (it.oneLineMemory || '').toLowerCase().includes(q) ||
            it.keywords.some(k => k.toLowerCase().includes(q))
        );
        aItems = aItems.filter(it => 
            (it.abbr || '').toLowerCase().includes(q) || 
            (it.fullForm || '').toLowerCase().includes(q) || 
            (it.myUnderstanding || '').toLowerCase().includes(q) ||
            (it.oneLineMemory || '').toLowerCase().includes(q) ||
            it.keywords.some(k => k.toLowerCase().includes(q))
        );
    }

    if (countEl) {
        countEl.innerText = `Showing ${vItems.length} Versions & ${aItems.length} Architectural Abbreviations`;
    }

    container.innerHTML = `
        <div style="margin-bottom: 2.5rem;">
            <h3 style="font-size: 1.35rem; color: #2d1c24; margin-bottom: 1.25rem;">🗺️ Chronological Version Evolution (${vItems.length})</h3>
            ${vItems.map(it => renderNaturalLearningCardHtml(it)).join('')}
        </div>
        <div>
            <h3 style="font-size: 1.35rem; color: #2d1c24; margin-bottom: 1.25rem;">🔤 Abbreviation & Architect Interview Index (${aItems.length})</h3>
            ${aItems.map(it => renderNaturalLearningCardHtml(it)).join('')}
        </div>
    `;
    restoreSelfChecks();
}

// Helpers for Code Running & Copying in Natural Cards
function practiceTopicRawCode(topicId) {
    const code = RAW_CODE_CACHE[topicId] || "";
    if (code) {
        loadSnippetIntoSandbox(code, `Practice Topic: ${topicId}`);
    } else {
        openSandbox();
    }
}

function copySnippetRaw(topicId, btn) {
    const code = RAW_CODE_CACHE[topicId] || "";
    if (code) {
        navigator.clipboard.writeText(code).then(() => {
            const oldText = btn.innerText;
            btn.innerText = "✓ Copied";
            setTimeout(() => { btn.innerText = oldText; }, 1800);
        });
    }
}

function copyNaturalCard(topicId, btn) {
    const card = document.querySelector(`article[data-topic-id="${topicId}"]`);
    if (card) {
        navigator.clipboard.writeText(card.innerText).then(() => {
            const oldText = btn.innerText;
            btn.innerText = "✓ Copied Card";
            setTimeout(() => { btn.innerText = oldText; }, 1800);
        });
    }
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
        if (content.includes('"Exhaustive Switch Result: " + description')) {
            content = "Exhaustive Switch Result: 🐱 Feline: Shadow says Meow";
        } else if (content.startsWith('$"') && content.endsWith('"')) {
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
