/**
 * DSA Guide Interactive Engine
 * Day 1: Understanding Big O Notation
 * Application: Magician Technical Training
 * Split Layout: LHS Ribbon + RHS Content
 * Deepthi T Portfolio
 */

// State Management
const STORAGE_KEY_COMPLETED = 'dsa_day1_completed_programs';
const STORAGE_KEY_CODE_PREFIX = 'dsa_solution_';

let completedPrograms = [];
let currentPracticeChallengeId = null;
let activeFilterGroup = 'all';
let isSidebarCollapsed = false;
let areAllLhsDaysExpanded = true;
let activeSelectedDay = 1;

// Subtopic quick navigation links for Day 1
const DSA_DAY1_SUBTOPICS = [
    { title: "⚡ Day 1 Dashboard", targetId: "day1-hero" },
    { title: "📊 5 Complexity Tiers", targetId: "complexity-overview" },
    { title: "📖 Master Article: Big O", targetId: "article-content" },
    { title: "  ▸ Section 1: O(1) Constant", targetId: "section-o1", nested: true },
    { title: "  ▸ Section 2: O(n) Linear", targetId: "section-on", nested: true },
    { title: "  ▸ Section 3: O(log n) Logarithmic", targetId: "section-ologn", nested: true },
    { title: "  ▸ Section 4: O(n log n) Linearithmic", targetId: "section-onlogn", nested: true },
    { title: "  ▸ Section 5: O(n²) Quadratic", targetId: "section-on2", nested: true },
    { title: "📈 Growth Chart & Benchmark", targetId: "section-comparison" },
    { title: "🏢 Architectural Study (O(n+m))", targetId: "section-architect" },
    { title: "💻 Practice Lab (15 C# Programs)", targetId: "practice-lab", hasBadge: true },
    { title: "🎯 Key Takeaways & Mindset", targetId: "day1-summary" }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    loadCompletedState();
    initLhsRibbon();
    renderComplexityCards();
    renderPracticeLab();
    initBigOChart();
    updateProgressDisplays();
    setupKeyboardShortcuts();
});

// --------------------------------------------------------------------------
// 1. Persistence & Progress Tracking
// --------------------------------------------------------------------------
function loadCompletedState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
        if (saved) {
            completedPrograms = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Could not read from localStorage:', e);
        completedPrograms = [];
    }
}

function saveCompletedState() {
    try {
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedPrograms));
    } catch (e) {
        console.warn('Could not write to localStorage:', e);
    }
    updateProgressDisplays();
}

function toggleChallengeCompletion(challengeId, forceStatus = null) {
    const idx = completedPrograms.indexOf(challengeId);
    const shouldComplete = forceStatus !== null ? forceStatus : idx === -1;

    if (shouldComplete && idx === -1) {
        completedPrograms.push(challengeId);
        showToast('Challenge marked as completed!');
    } else if (!shouldComplete && idx !== -1) {
        completedPrograms.splice(idx, 1);
        showToast('Challenge marked as in-progress');
    }

    saveCompletedState();
    syncChallengeCardUI(challengeId);

    if (currentPracticeChallengeId === challengeId) {
        syncPracticeModalState(challengeId);
    }
}

function syncChallengeCardUI(challengeId) {
    const card = document.getElementById(`card-${challengeId}`);
    const checkbox = document.getElementById(`cb-${challengeId}`);
    const isCompleted = completedPrograms.includes(challengeId);

    if (card) {
        card.classList.toggle('completed', isCompleted);
    }
    if (checkbox) {
        checkbox.checked = isCompleted;
    }
}

function updateProgressDisplays() {
    const total = DSA_DAY1_CHALLENGES.length;
    const count = completedPrograms.length;
    const pct = Math.round((count / total) * 100);

    // Dashboard Hero Progress
    const heroCountEl = document.getElementById('hero-completed-count');
    const heroPctEl = document.getElementById('hero-completed-pct');
    const heroBarEl = document.getElementById('hero-progress-bar');

    if (heroCountEl) heroCountEl.textContent = `${count} / ${total}`;
    if (heroPctEl) heroPctEl.textContent = `${pct}% Solved`;
    if (heroBarEl) heroBarEl.style.width = `${pct}%`;

    // Practice Lab Toolbar Progress
    const labCountEl = document.getElementById('lab-completed-count');
    const labBarEl = document.getElementById('lab-progress-bar');

    if (labCountEl) labCountEl.textContent = `${count} / ${total}`;
    if (labBarEl) labBarEl.style.width = `${pct}%`;

    // LHS Ribbon Badge
    const lhsLabBadge = document.getElementById('lhs-lab-badge');
    if (lhsLabBadge) lhsLabBadge.textContent = `${count}/${total}`;
}

// --------------------------------------------------------------------------
// 2. LHS Ribbon Architecture & Navigation
// --------------------------------------------------------------------------
function initLhsRibbon() {
    const container = document.getElementById('lhs-days-tree');
    if (!container || typeof DSA_ROADMAP === 'undefined') return;

    renderLhsDaysList(DSA_ROADMAP);
}

function renderLhsDaysList(days) {
    const container = document.getElementById('lhs-days-tree');
    if (!container) return;

    container.innerHTML = days.map(d => {
        if (d.day === 1) {
            // Day 1: Prominent Active Day with Subtopics
            return `
                <div class="dsa-day-nav-card active ${areAllLhsDaysExpanded ? 'expanded' : ''}" id="lhs-day-1">
                    <div class="dsa-day-nav-head" onclick="toggleLhsDayItem(1)">
                        <div class="dsa-day-nav-left">
                            <span class="dsa-day-tag active">Day 1</span>
                            <div class="dsa-day-title-wrap">
                                <span class="dsa-day-nav-title">Understanding Big O Notation</span>
                                <span class="dsa-day-badge-live">Active • Available</span>
                            </div>
                        </div>
                        <span class="dsa-day-arrow">▼</span>
                    </div>
                    <div class="dsa-day-subtopics" id="lhs-day-subtopics-1">
                        ${DSA_DAY1_SUBTOPICS.map(s => `
                            <a href="#${s.targetId}" class="dsa-subtopic-link ${s.nested ? 'sub-nested' : ''}" onclick="selectDay(1)">
                                <span>${s.title}</span>
                                ${s.hasBadge ? `<span class="dsa-subtopic-badge" id="lhs-lab-badge">${completedPrograms.length}/15</span>` : ''}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            // Days 2 to 90: Upcoming Days
            const isSelected = activeSelectedDay === d.day;
            return `
                <div class="dsa-day-nav-card ${isSelected ? 'active' : ''} coming-soon" id="lhs-day-${d.day}" onclick="selectDay(${d.day})">
                    <div class="dsa-day-nav-head">
                        <div class="dsa-day-nav-left">
                            <span class="dsa-day-tag">Day ${d.day}</span>
                            <div class="dsa-day-title-wrap">
                                <span class="dsa-day-nav-title">${d.title}</span>
                                <span class="dsa-day-phase-text">${d.phase}</span>
                            </div>
                        </div>
                        <span class="dsa-day-status-pill">Coming Soon</span>
                    </div>
                </div>
            `;
        }
    }).join('');
}

function toggleLhsDayItem(dayNum) {
    if (dayNum === 1) {
        const card = document.getElementById('lhs-day-1');
        if (card) {
            card.classList.toggle('expanded');
        }
        selectDay(1);
    } else {
        selectDay(dayNum);
    }
}

function selectDay(dayNum) {
    activeSelectedDay = dayNum;

    // Update active class across all LHS cards
    document.querySelectorAll('.dsa-day-nav-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`lhs-day-${dayNum}`);
    if (activeCard) activeCard.classList.add('active');

    const day1Container = document.getElementById('day1-content-container');
    const previewContainer = document.getElementById('upcoming-day-preview-container');

    if (dayNum === 1) {
        if (day1Container) day1Container.style.display = 'flex';
        if (previewContainer) {
            previewContainer.style.display = 'none';
            previewContainer.classList.remove('active');
        }
    } else {
        // Show upcoming day preview in RHS
        const dayObj = DSA_ROADMAP.find(d => d.day === dayNum);
        if (!dayObj) return;

        if (day1Container) day1Container.style.display = 'none';
        if (previewContainer) {
            previewContainer.style.display = 'flex';
            previewContainer.classList.add('active');

            const titleEl = document.getElementById('preview-day-title');
            const phaseEl = document.getElementById('preview-day-phase');
            const descEl = document.getElementById('preview-day-desc');

            if (titleEl) titleEl.textContent = `Day ${dayObj.day}: ${dayObj.title}`;
            if (phaseEl) phaseEl.textContent = `Phase: ${dayObj.phase}`;
            if (descEl) {
                descEl.innerHTML = `
                    <strong>Day ${dayObj.day}</strong> is part of our comprehensive 90-day DSA curriculum and is actively in development.
                    <br/><br/>
                    Currently, <strong>Day 1: Understanding Big O Notation</strong> is fully unlocked with 5 complexity tiers, an interactive SVG growth chart, real-world Magician Technical Training architectural benchmarks, and 15 practical C# programming challenges.
                `;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

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

function toggleAllLhsDays() {
    areAllLhsDaysExpanded = !areAllLhsDaysExpanded;
    const day1Card = document.getElementById('lhs-day-1');
    const btn = document.getElementById('btn-lhs-expand-all');

    if (day1Card) {
        day1Card.classList.toggle('expanded', areAllLhsDaysExpanded);
    }
    if (btn) {
        btn.textContent = areAllLhsDaysExpanded ? '📁 Collapse' : '📂 Expand';
    }
}

function filterLhsDays(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderLhsDaysList(DSA_ROADMAP);
        return;
    }
    const filtered = DSA_ROADMAP.filter(d => 
        d.title.toLowerCase().includes(q) ||
        d.phase.toLowerCase().includes(q) ||
        `day ${d.day}`.includes(q)
    );
    renderLhsDaysList(filtered);
}

function filterLhsPhase(phasePrefix, btn) {
    document.querySelectorAll('.dsa-phase-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (phasePrefix === 'all') {
        renderLhsDaysList(DSA_ROADMAP);
        return;
    }

    const filtered = DSA_ROADMAP.filter(d => d.phase.toLowerCase().includes(phasePrefix.toLowerCase()));
    renderLhsDaysList(filtered);
}

// --------------------------------------------------------------------------
// 3. Render Complexity Cards
// --------------------------------------------------------------------------
function renderComplexityCards() {
    const grid = document.getElementById('dsa-complexity-grid');
    if (!grid) return;

    grid.innerHTML = DSA_COMPLEXITIES.map(c => `
        <div class="dsa-complexity-card" id="card-${c.notation.replace(/[^a-zA-Z0-9]/g, '')}">
            <div>
                <div class="complexity-card-top">
                    <span class="complexity-notation-pill" style="background: ${c.badgeColor}18; color: ${c.badgeColor}; border: 1px solid ${c.badgeColor}40;">
                        ${c.notation}
                    </span>
                    <span class="complexity-rating-pill" style="color: ${c.badgeColor}; font-weight: 700;">
                        ${c.perfRating}
                    </span>
                </div>
                <h3 class="complexity-card-name">${c.name}</h3>
                <p class="complexity-card-explanation">${c.summary}</p>
                <div class="complexity-example-box">
                    <span class="complexity-example-label">Magician Technical Training Example:</span>
                    ${c.example}
                </div>
            </div>
            <div class="complexity-card-footer">
                <div class="growth-mini-chart-wrap" title="Growth curve: ${c.growthType}">
                    ${c.growthSvg}
                </div>
                <a href="#section-${c.notation.toLowerCase().replace(/[^a-z0-9]/g, '')}" class="btn-card-learn-more">
                    Deep Dive ↓
                </a>
            </div>
        </div>
    `).join('');
}

// --------------------------------------------------------------------------
// 4. Render Practice Lab
// --------------------------------------------------------------------------
function renderPracticeLab() {
    const container = document.getElementById('practice-lab-cards-container');
    if (!container) return;

    const groups = [
        { slug: 'o1', name: 'Group 1: O(1) – Constant Time', badge: 'O(1)', color: '#10b981' },
        { slug: 'on', name: 'Group 2: O(n) – Linear Time', badge: 'O(n)', color: '#f59e0b' },
        { slug: 'ologn', name: 'Group 3: O(log n) – Logarithmic Time', badge: 'O(log n)', color: '#06b6d4' },
        { slug: 'onlogn', name: 'Group 4: O(n log n) – Linearithmic Time', badge: 'O(n log n)', color: '#6366f1' },
        { slug: 'on2', name: 'Group 5: O(n²) – Quadratic Time', badge: 'O(n²)', color: '#ef4444' }
    ];

    container.innerHTML = groups.map(grp => {
        const challenges = DSA_DAY1_CHALLENGES.filter(c => c.groupSlug === grp.slug);
        if (challenges.length === 0) return '';

        return `
            <div class="challenge-group-block" data-group="${grp.slug}">
                <div class="challenge-group-header">
                    <span class="challenge-group-badge" style="background: ${grp.color}20; color: ${grp.color}; border: 1px solid ${grp.color}40;">
                        ${grp.badge}
                    </span>
                    <h3 class="challenge-group-title">${grp.name}</h3>
                </div>
                <div class="challenge-group-items">
                    ${challenges.map(c => renderSingleChallengeCard(c)).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderSingleChallengeCard(c) {
    const isCompleted = completedPrograms.includes(c.id);
    const diffClass = c.difficulty.toLowerCase() === 'easy' ? 'diff-easy' : (c.difficulty.toLowerCase() === 'medium' ? 'diff-medium' : 'diff-hard');

    return `
        <div class="challenge-card ${isCompleted ? 'completed' : ''}" id="card-${c.id}" data-id="${c.id}" data-group="${c.groupSlug}">
            <div class="challenge-card-header" onclick="toggleChallengeAccordion('${c.id}')">
                <div class="challenge-header-left">
                    <span class="challenge-num-badge">P${c.number}</span>
                    <span class="challenge-title-text">${c.title}</span>
                    <span class="challenge-complexity-badge" style="background: #eef2ff; color: #4f46e5;">${c.expectedComplexity}</span>
                    <span class="challenge-difficulty-pill ${diffClass}">${c.difficulty}</span>
                </div>
                <div class="challenge-header-right">
                    <button type="button" class="btn-start-practice" onclick="openPracticePanel('${c.id}', event)">
                        <span>💻 Start Practice</span>
                    </button>
                    <span class="challenge-toggle-arrow">▼</span>
                </div>
            </div>
            <div class="challenge-card-body" id="body-${c.id}">
                <div class="challenge-statement-box">
                    <p class="challenge-statement-text"><strong>Problem Statement:</strong> ${c.statement}</p>
                    <div class="challenge-scenario-text">
                        <strong>Magician Training Context:</strong> ${c.scenario}
                    </div>
                </div>
                <div class="challenge-card-actions">
                    <label class="challenge-checkbox-label">
                        <input type="checkbox" class="challenge-checkbox" id="cb-${c.id}" ${isCompleted ? 'checked' : ''} onchange="toggleChallengeCompletion('${c.id}', this.checked)">
                        <span>Mark as Completed</span>
                    </label>
                    <button type="button" class="btn-dsa-secondary" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;" onclick="openPracticePanel('${c.id}', event)">
                        Open Code Editor ↗
                    </button>
                </div>
            </div>
        </div>
    `;
}

function toggleChallengeAccordion(challengeId) {
    const card = document.getElementById(`card-${challengeId}`);
    if (card) {
        card.classList.toggle('expanded');
    }
}

function filterChallenges(groupSlug, btn) {
    activeFilterGroup = groupSlug;
    document.querySelectorAll('.challenge-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const groupBlocks = document.querySelectorAll('.challenge-group-block');
    groupBlocks.forEach(block => {
        const bg = block.getAttribute('data-group');
        if (groupSlug === 'all' || bg === groupSlug) {
            block.style.display = 'block';
        } else {
            block.style.display = 'none';
        }
    });
}

// --------------------------------------------------------------------------
// 5. Dedicated Coding Practice Panel Modal
// --------------------------------------------------------------------------
function openPracticePanel(challengeId, event) {
    if (event) event.stopPropagation();

    const challenge = DSA_DAY1_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;

    currentPracticeChallengeId = challengeId;

    const titleEl = document.getElementById('practice-modal-title');
    const compEl = document.getElementById('practice-modal-complexity');
    const diffEl = document.getElementById('practice-modal-difficulty');
    const stmtEl = document.getElementById('practice-modal-statement');
    const scenEl = document.getElementById('practice-modal-scenario');
    const editorEl = document.getElementById('practice-code-editor');

    if (titleEl) titleEl.textContent = `Program ${challenge.number}: ${challenge.title}`;
    if (compEl) compEl.textContent = `Expected: ${challenge.expectedComplexity} | Space: ${challenge.spaceComplexity}`;
    if (diffEl) {
        diffEl.textContent = challenge.difficulty;
        diffEl.className = `challenge-difficulty-pill diff-${challenge.difficulty.toLowerCase()}`;
    }
    if (stmtEl) stmtEl.textContent = challenge.statement;
    if (scenEl) scenEl.textContent = challenge.scenario;

    let savedCode = null;
    try {
        savedCode = localStorage.getItem(STORAGE_KEY_CODE_PREFIX + challengeId);
    } catch (e) {}

    if (editorEl) {
        editorEl.value = savedCode || challenge.starterCode;
    }

    syncPracticeModalState(challengeId);

    const modal = document.getElementById('practice-panel-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePracticePanel() {
    if (currentPracticeChallengeId) {
        saveCurrentEditorDraft();
    }

    const modal = document.getElementById('practice-panel-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentPracticeChallengeId = null;
}

function syncPracticeModalState(challengeId) {
    const isCompleted = completedPrograms.includes(challengeId);
    const btn = document.getElementById('btn-modal-checkpoint');
    const statusText = document.getElementById('practice-modal-status-text');

    if (btn) {
        if (isCompleted) {
            btn.innerHTML = '✓ Completed (Click to Reopen)';
            btn.style.background = '#059669';
        } else {
            btn.innerHTML = '✓ Mark as Completed';
            btn.style.background = '#10b981';
        }
    }

    if (statusText) {
        statusText.textContent = isCompleted ? 'Status: Marked as Completed' : 'Status: Ready for Solution';
    }
}

function handleModalCheckpoint() {
    if (!currentPracticeChallengeId) return;
    saveCurrentEditorDraft();
    toggleChallengeCompletion(currentPracticeChallengeId);
}

function saveCurrentEditorDraft() {
    if (!currentPracticeChallengeId) return;
    const editorEl = document.getElementById('practice-code-editor');
    if (editorEl) {
        try {
            localStorage.setItem(STORAGE_KEY_CODE_PREFIX + currentPracticeChallengeId, editorEl.value);
        } catch (e) {}
    }
}

function resetEditorToStarter() {
    if (!currentPracticeChallengeId) return;
    const challenge = DSA_DAY1_CHALLENGES.find(c => c.id === currentPracticeChallengeId);
    if (!challenge) return;

    const editorEl = document.getElementById('practice-code-editor');
    if (editorEl) {
        editorEl.value = challenge.starterCode;
        saveCurrentEditorDraft();
        showToast('Reset to original starter code');
    }
}

function copyEditorCode() {
    const editorEl = document.getElementById('practice-code-editor');
    if (!editorEl) return;

    navigator.clipboard.writeText(editorEl.value).then(() => {
        showToast('Solution copied to clipboard!');
    }).catch(() => {
        showToast('Could not copy to clipboard');
    });
}

// --------------------------------------------------------------------------
// 6. Reset Progress Workflow
// --------------------------------------------------------------------------
function promptResetProgress() {
    const modal = document.getElementById('dsa-confirm-modal');
    if (modal) modal.classList.add('active');
}

function closeConfirmModal() {
    const modal = document.getElementById('dsa-confirm-modal');
    if (modal) modal.classList.remove('active');
}

function confirmResetProgress() {
    completedPrograms = [];
    try {
        localStorage.removeItem(STORAGE_KEY_COMPLETED);
        DSA_DAY1_CHALLENGES.forEach(c => {
            localStorage.removeItem(STORAGE_KEY_CODE_PREFIX + c.id);
        });
    } catch (e) {}

    DSA_DAY1_CHALLENGES.forEach(c => syncChallengeCardUI(c.id));
    updateProgressDisplays();
    closeConfirmModal();
    showToast('Progress and solution drafts reset successfully');
}

// --------------------------------------------------------------------------
// 7. Interactive Big O Growth Chart
// --------------------------------------------------------------------------
function initBigOChart() {
    const svg = document.getElementById('dsa-bigo-svg');
    const tooltip = document.getElementById('chart-tooltip');
    if (!svg || !tooltip) return;

    const lines = svg.querySelectorAll('.chart-line');
    lines.forEach(line => {
        line.addEventListener('mouseenter', (e) => {
            const label = line.getAttribute('data-label');
            const formula = line.getAttribute('data-formula');
            const color = line.getAttribute('stroke');
            tooltip.innerHTML = `
                <strong style="color: ${color}; font-size: 0.9rem;">${label}</strong><br/>
                <span>Growth: <code>${formula}</code></span>
            `;
            tooltip.style.opacity = '1';
        });

        line.addEventListener('mousemove', (e) => {
            const chartWrap = svg.parentElement;
            const rect = chartWrap.getBoundingClientRect();
            tooltip.style.left = `${e.clientX - rect.left + 15}px`;
            tooltip.style.top = `${e.clientY - rect.top - 40}px`;
        });

        line.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

function toggleChartSeries(complexityKey, legendEl) {
    const line = document.getElementById(`chart-line-${complexityKey}`);
    if (!line) return;

    const isHidden = line.style.display === 'none';
    line.style.display = isHidden ? 'block' : 'none';
    if (legendEl) {
        legendEl.style.opacity = isHidden ? '1' : '0.4';
    }
}

// --------------------------------------------------------------------------
// 8. General Helpers & Keyboard Shortcuts
// --------------------------------------------------------------------------
function copyCode(btn, rawCode) {
    navigator.clipboard.writeText(rawCode).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.style.background = '#4f46e5';
        setTimeout(() => {
            btn.innerHTML = origText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function showToast(message) {
    let toast = document.getElementById('dsa-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dsa-toast';
        toast.className = 'dsa-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function setupKeyboardShortcuts() {
    const editor = document.getElementById('practice-code-editor');
    if (editor) {
        editor.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            toggleLhsSidebar();
        } else if (e.key === 'Escape') {
            closePracticePanel();
            closeConfirmModal();
        }
    });
}
