// C# 1-15 Interactive Guide Logic
let currentActiveVersion = 'all';
let currentSearchQuery = '';
let isLeadExpanded = true;

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
    
    // Keywords
    const keywords = ['public', 'private', 'protected', 'internal', 'static', 'readonly', 'class', 'struct', 'interface', 'record', 'enum', 'void', 'int', 'string', 'bool', 'double', 'decimal', 'var', 'new', 'return', 'yield', 'async', 'await', 'task', 'using', 'get', 'set', 'init', 'switch', 'case', 'default', 'if', 'else', 'for', 'foreach', 'in', 'where', 'select', 'lock', 'params', 'ref', 'out', 'in', 'throw', 'try', 'catch', 'when', 'nameof', 'required', 'global', 'file', 'allows'];
    
    // Replace comments
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span style="color: #6c7086; font-style: italic;">$1</span>');
    
    // Replace strings
    escaped = escaped.replace(/(".*?"|'.*?')/g, '<span style="color: #a6e3a1;">$1</span>');
    
    return escaped;
}

// 1. Initialize LHS Ribbon
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

        // Header
        accordion.innerHTML = `
            <div class="version-item-header" onclick="toggleVersionAccordion('${vKey}', event)">
                <div class="version-name-group">
                    <span>${icon}</span>
                    <span>${vKey}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <span class="version-badge-count">${vObj.topics.length}</span>
                    <span class="version-chevron">▶</span>
                </div>
            </div>
            <div class="subtopics-list" id="subtopics-${sanitizeId(vKey)}">
                ${vObj.topics.map(t => `
                    <a class="subtopic-nav-link" href="#topic-${t.id}" onclick="onSubtopicClick('${vKey}', '${t.id}', event)">
                        <span style="font-size: 0.7rem; opacity: 0.6;">#${t.id}</span>
                        <span>${escapeHtml(t.topic)}</span>
                    </a>
                `).join('')}
            </div>
        `;

        treeContainer.appendChild(accordion);
    });
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

    renderRhsTopics(vKey);
}

// Subtopic click from LHS
function onSubtopicClick(vKey, topicId, event) {
    if (event) event.preventDefault();

    // If we're not viewing this version or all, switch to it
    if (currentActiveVersion !== 'all' && currentActiveVersion !== vKey) {
        selectVersion(vKey);
    }

    // Mark active subtopic link in LHS
    document.querySelectorAll('.subtopic-nav-link').forEach(link => link.classList.remove('active-subtopic'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-subtopic');
    }

    // Scroll to the card on RHS
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

    // Apply search filter if query present
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
                            <button class="btn-copy-code" onclick="copyCode(this, '${escapeHtml(t.syntax.replace(/'/g, "\\'").replace(/\n/g, '\\n'))}')">📋 Copy</button>
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

// 7. Setup Event Listeners & Back to Top
function setupEventListeners() {
    // Floating Back To Top
    const topBtn = document.getElementById('btn-back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
