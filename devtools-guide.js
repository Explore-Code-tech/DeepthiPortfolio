/* ==========================================================================
   Chrome Developer Tool Learning Center — devtools-guide.js
   Renders all 10 DevTools tabs from window.DEVTOOLS_LESSONS (devtools-data-*.js),
   with interactive visual infographic guides, numbered image callout breakdowns,
   real-world case studies, zoomable lightbox, progress persistence, and quizzes.
   ========================================================================== */
(function () {
    'use strict';

    var STORAGE_KEY = 'deepthi.devtools.progress.v1';
    var ORDER = ['elements', 'console', 'sources', 'network', 'performance',
                 'memory', 'application', 'security', 'lighthouse', 'recorder'];
    var SUBTITLES = {
        elements:    'DOM, Styles, Computed, Box Model, Events',
        console:     'Errors, Stack Trace, Logs & Live JS REPL',
        sources:     'Breakpoints, Stepping, Scope & Watch',
        network:     'API Calls, Status 200/302, Headers & Cookies',
        performance: 'Long Tasks, Flame Chart & Main Thread',
        memory:      'Heap Snapshots, Detached DOM & Leaks',
        application: 'Cookies, Local/Session Storage & Cache',
        security:    'HTTPS, TLS 1.3 Certificates & Mixed Content',
        lighthouse:  'Performance, A11y, Best Practices & SEO',
        recorder:    'Record, Edit, Replay & Export to Playwright'
    };
    var lessons = (window.DEVTOOLS_LESSONS || {});

    /* ---------------- State / persistence ---------------- */
    function loadState() {
        try {
            var s = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (s && typeof s === 'object') {
                s.completed = s.completed || {};
                s.quiz = s.quiz || {};
                s.open = s.open || {};
                return s;
            }
        } catch (e) { /* ignore corrupt or unavailable storage */ }
        return { active: 'elements', completed: {}, quiz: {}, open: {} };
    }
    var state = loadState();
    function saveState() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage may be disabled */ }
    }

    /* ---------------- Helpers ---------------- */
    function esc(s) {
        return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    var KW = 'const|let|var|function|return|if|else|await|async|new|class|public|private|protected|void|using|try|catch|finally|throw|for|of|in|while|true|false|null|undefined|this|static|string|int|bool|namespace|import|export|from|typeof|interface|override|get|set';
    var TOKEN_RE = new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|<!--[\\s\\S]*?-->|@\\*[\\s\\S]*?\\*@)' +   // 1 comment
        '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'|`[^`]*`)' +            // 2 string
        '|\\b(' + KW + ')\\b' +                                                      // 3 keyword
        '|\\b(\\d+(?:\\.\\d+)?(?:px|ms|rem|em|%|s)?)\\b' +                            // 4 number
        '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()', 'g');                                   // 5 function
    function highlight(code) {
        var out = '', last = 0, m;
        TOKEN_RE.lastIndex = 0;
        while ((m = TOKEN_RE.exec(code)) !== null) {
            out += esc(code.slice(last, m.index));
            var cls = m[1] ? 'tok-cmt' : m[2] ? 'tok-str' : m[3] ? 'tok-kw' : m[4] ? 'tok-num' : 'tok-fn';
            out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
            last = TOKEN_RE.lastIndex;
            if (m[0].length === 0) TOKEN_RE.lastIndex++;
        }
        return out + esc(code.slice(last));
    }

    /* ---------------- Block renderers ---------------- */
    var R = {
        infographic: function (b) {
            var calloutsHtml = '';
            if (b.callouts && b.callouts.length) {
                calloutsHtml =
                    '<div class="infographic-callouts-title">🔢 Step-by-Step Visual Breakdown (Matching Numbers in Image Above)</div>' +
                    '<div class="infographic-callouts-grid">' +
                    b.callouts.map(function (c, i) {
                        var num = c.num !== undefined ? c.num : (i + 1);
                        return '<div class="infographic-callout-item">' +
                            '<span class="infographic-callout-num" aria-hidden="true">' + esc(num) + '</span>' +
                            '<div class="infographic-callout-body"><strong>' + esc(c.title) + '</strong>' + c.desc + '</div>' +
                            '</div>';
                    }).join('') +
                    '</div>';
            }
            return '<div class="infographic-card">' +
                '<div class="infographic-header">' +
                    '<div class="infographic-title-wrap">' +
                        '<span class="infographic-badge">📸 ' + esc(b.badge || 'Visual Architecture & Debugging Infographic') + '</span>' +
                        '<h3 class="infographic-title">' + esc(b.title) + '</h3>' +
                    '</div>' +
                    '<button type="button" class="btn-zoom-infographic" data-zoom-src="' + esc(b.src) + '" data-zoom-title="' + esc(b.title) + '">🔍 Click to Zoom Full-Screen</button>' +
                '</div>' +
                '<div class="infographic-img-container">' +
                    '<img src="' + esc(b.src) + '" alt="' + esc(b.alt || b.title) + '" class="devtools-zoomable-img" data-zoom-src="' + esc(b.src) + '" data-zoom-title="' + esc(b.title) + '" loading="lazy">' +
                '</div>' +
                (b.caption ? '<div class="infographic-caption">' + b.caption + '</div>' : '') +
                calloutsHtml +
                '</div>';
        },
        realworld: function (b) {
            return '<div class="realworld-card">' +
                '<div class="realworld-header">' +
                    '<span class="realworld-badge">🚀 ' + esc(b.badge || 'Practical Real-World Scenario') + '</span>' +
                    (b.app ? '<span class="realworld-app-tag">🏥 ' + esc(b.app) + '</span>' : '') +
                '</div>' +
                '<h3 class="realworld-title">' + esc(b.title) + '</h3>' +
                '<div class="realworld-grid">' +
                    '<div class="realworld-box symptom"><div class="realworld-box-label">🚨 1. Symptom (What Users See)</div><div class="realworld-box-text">' + b.symptom + '</div></div>' +
                    '<div class="realworld-box evidence"><div class="realworld-box-label">🔎 2. DevTools Evidence</div><div class="realworld-box-text">' + b.evidence + '</div></div>' +
                    '<div class="realworld-box cause"><div class="realworld-box-label">🎯 3. Root Cause</div><div class="realworld-box-text">' + b.cause + '</div></div>' +
                    '<div class="realworld-box fix"><div class="realworld-box-label">✅ 4. Permanent Production Fix</div><div class="realworld-box-text">' + b.fix + '</div></div>' +
                '</div>' +
                '</div>';
        },
        story: function (b) {
            return '<div class="story-block"><div class="story-block-label">📖 ' + esc(b.label || 'Real-world story') + '</div>' +
                b.paras.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';
        },
        prose: function (b) { return '<div class="lesson-prose">' + b.html + '</div>'; },
        callout: function (b) {
            var icons = { info: 'ℹ️', tip: '💡', warn: '⚠️', danger: '🚫' };
            return '<div class="callout callout-' + b.kind + '"><span class="callout-icon" aria-hidden="true">' + icons[b.kind] + '</span>' +
                '<div class="callout-content">' + (b.title ? '<div class="callout-title">' + esc(b.title) + '</div>' : '') + b.html + '</div></div>';
        },
        code: function (b) {
            return '<div class="code-block-wrap"><div class="code-block-header"><span><span class="code-block-lang">' + esc(b.lang) + '</span>' +
                (b.label ? ' <span class="code-block-label">· ' + esc(b.label) + '</span>' : '') + '</span>' +
                '<button class="btn-copy-code" type="button" aria-label="Copy ' + esc(b.lang) + ' code">📋 Copy</button></div>' +
                '<pre class="code-block-pre"><code>' + highlight(b.code.replace(/^\n/, '')) + '</code></pre></div>';
        },
        steps: function (b) {
            return '<ol class="step-list">' + b.items.map(function (s, i) {
                return '<li class="step-item"><span class="step-num" aria-hidden="true">' + (i + 1) + '</span><div class="step-content">' + s + '</div></li>';
            }).join('') + '</ol>';
        },
        panels: function (b) {
            return '<div class="panel-grid">' + b.items.map(function (p) {
                return '<div class="panel-card"><div class="panel-card-icon" aria-hidden="true">' + p[0] + '</div><div class="panel-card-name">' + esc(p[1]) +
                    '</div><div class="panel-card-desc">' + p[2] + '</div></div>';
            }).join('') + '</div>';
        },
        table: function (b) {
            return '<div class="dt-table-wrap"><table class="cookie-table"><thead><tr>' + b.head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') +
                '</tr></thead><tbody>' + b.rows.map(function (r) {
                    return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
                }).join('') + '</tbody></table></div>';
        },
        mistakes: function (b) {
            return '<ul class="mistakes-list">' + b.items.map(function (m) {
                return '<li class="mistake-item"><span class="mistake-icon" aria-hidden="true">❌</span><div class="mistake-content"><div class="mistake-wrong">' + m[0] +
                    '</div><div class="mistake-right">✅ ' + m[1] + '</div></div></li>';
            }).join('') + '</ul>';
        },
        figure: function (b) {
            return '<figure class="devtools-diagram"><div class="dt-figure-tag">Interactive / Structural Diagram</div>' +
                '<div role="img" aria-label="' + esc(b.alt) + '">' + b.html + '</div><figcaption>' + b.caption + '</figcaption></figure>';
        },
        notebook: function (b) {
            return '<div class="notebook-summary"><div class="notebook-summary-title">📒 ' + esc(b.title || 'Notebook summary') + '</div><ul class="notebook-list">' +
                b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
        },
        interview: function (b) {
            var tiers = [['junior', '🌱 Junior developer'], ['senior', '🚀 Senior developer'], ['lead', '🧭 Technical lead']];
            return tiers.map(function (t) {
                var qs = b[t[0]] || [];
                return '<div class="interview-tier tier-' + t[0] + '"><button type="button" class="interview-tier-header" aria-expanded="false">' + t[1] +
                    ' <span style="margin-left:auto;font-weight:500;">' + qs.length + ' questions ▸</span></button><div class="interview-tier-body">' +
                    qs.map(function (q) { return '<div class="interview-qa"><div class="interview-q">Q. ' + q[0] + '</div><div class="interview-a">' + q[1] + '</div></div>'; }).join('') +
                    '</div></div>';
            }).join('');
        },
        quiz: function (b, ctx) {
            return '<div class="quiz-block"><div class="quiz-title">🧠 ' + esc(b.title || 'Interactive quiz') +
                ' <span class="dt-quiz-score" data-quiz-score="' + ctx.lesson + '"></span></div>' +
                b.questions.map(function (q, qi) {
                    var key = ctx.lesson + ':' + ctx.quizIndex + ':' + qi;
                    return '<div class="quiz-q-block" data-quiz-key="' + key + '" data-answer="' + q.answer + '"><div class="quiz-question" id="q-' + key.replace(/:/g, '-') + '">' + (qi + 1) + '. ' + q.q + '</div>' +
                        '<div class="quiz-options" role="group" aria-labelledby="q-' + key.replace(/:/g, '-') + '">' +
                        q.options.map(function (o, oi) { return '<button type="button" class="quiz-option-btn" data-option="' + oi + '">' + String.fromCharCode(65 + oi) + '. ' + o + '</button>'; }).join('') +
                        '</div><div class="quiz-feedback" aria-live="polite" data-explain="' + esc(q.explain) + '"></div></div>';
                }).join('') + '</div>';
        }
    };

    function renderSection(sec, lessonId, si, ctx) {
        var key = lessonId + ':' + si;
        var open = state.open[key] !== undefined ? state.open[key] : !!sec.open;
        var bodyId = 'sec-' + lessonId + '-' + si;
        var body = sec.blocks.map(function (b) {
            if (b.type === 'quiz') { var h = R.quiz(b, ctx); ctx.quizIndex++; return h; }
            return R[b.type] ? R[b.type](b, ctx) : '';
        }).join('');
        return '<section class="lesson-section' + (open ? ' open' : '') + '" data-sec-key="' + key + '">' +
            '<h2 style="margin:0;"><button type="button" class="section-toggle-header" aria-expanded="' + open + '" aria-controls="' + bodyId + '">' +
            '<span class="section-toggle-icon" aria-hidden="true">' + sec.icon + '</span><span class="section-toggle-title">' + esc(sec.title) + '</span>' +
            '<span class="section-toggle-chevron" aria-hidden="true">▶</span></button></h2>' +
            '<div class="lesson-section-body" id="' + bodyId + '">' + body + '</div></section>';
    }

    function renderLesson(id) {
        var L = lessons[id];
        var idx = ORDER.indexOf(id);
        var ctx = { lesson: id, quizIndex: 0 };
        var prev = ORDER[idx - 1], next = ORDER[idx + 1];
        var done = !!state.completed[id];
        var html =
            '<article class="devtools-lesson-panel active" aria-labelledby="lesson-title-' + id + '">' +
            '<div class="lesson-hero"><div class="lesson-hero-badges"><span class="lesson-badge lesson-badge-tab">Tab ' + (idx + 1) + ' of 10</span>' +
            L.badges.map(function (b) { return '<span class="lesson-badge">' + esc(b) + '</span>'; }).join('') + '</div>' +
            '<h2 class="lesson-hero-title" id="lesson-title-' + id + '">' + L.icon + ' ' + esc(L.title) + '</h2>' +
            '<p class="lesson-hero-subtitle">' + L.tagline + '</p>' +
            '<button type="button" class="lesson-hero-mark-btn' + (done ? ' done' : '') + '" data-mark="' + id + '" aria-pressed="' + done + '">' +
            (done ? '✅ Completed — click to undo' : '☐ Mark tab lesson as complete') + '</button></div>' +
            L.sections.map(function (s, si) { return renderSection(s, id, si, ctx); }).join('') +
            '<nav class="lesson-nav-row" aria-label="Lesson navigation">' +
            '<button type="button" class="btn-lesson-nav' + (prev ? '' : ' disabled') + '" ' + (prev ? 'data-goto="' + prev + '"' : 'disabled') + '>← ' + (prev ? esc(lessons[prev].short) : 'Start') + '</button>' +
            '<button type="button" class="btn-lesson-nav' + (next ? '' : ' disabled') + '" ' + (next ? 'data-goto="' + next + '"' : 'disabled') + '>' + (next ? esc(lessons[next].short) : 'Finished') + ' →</button>' +
            '</nav></article>';
        var host = document.getElementById('devtools-lesson-host');
        host.innerHTML = html;
        host.setAttribute('aria-labelledby', 'tab-' + id);
        restoreQuiz(id);
        document.getElementById('devtools-rhs-title').textContent = L.icon + ' ' + L.title;
        document.getElementById('devtools-rhs-meta').textContent = L.sections.length + ' sections · Visual guide + Real-world lab · ' + countQuestions(L) + ' quiz questions';
    }

    function countQuestions(L) {
        var n = 0;
        L.sections.forEach(function (s) { s.blocks.forEach(function (b) { if (b.type === 'quiz') n += b.questions.length; }); });
        return n;
    }

    /* ---------------- Quiz ---------------- */
    function applyAnswer(block, chosen, persist) {
        var answer = +block.getAttribute('data-answer');
        var fb = block.querySelector('.quiz-feedback');
        block.querySelectorAll('.quiz-option-btn').forEach(function (btn) {
            var o = +btn.getAttribute('data-option');
            btn.disabled = true;
            if (o === answer) btn.classList.add('correct');
            else if (o === chosen) btn.classList.add('wrong');
        });
        var ok = chosen === answer;
        fb.className = 'quiz-feedback show ' + (ok ? 'correct' : 'wrong');
        fb.innerHTML = (ok ? '✅ Correct. ' : '❌ Not quite — the answer is ' + String.fromCharCode(65 + answer) + '. ') + fb.getAttribute('data-explain');
        if (persist) { state.quiz[block.getAttribute('data-quiz-key')] = chosen; saveState(); }
    }
    function restoreQuiz(id) {
        document.querySelectorAll('.quiz-q-block').forEach(function (block) {
            var v = state.quiz[block.getAttribute('data-quiz-key')];
            if (v !== undefined) applyAnswer(block, v, false);
        });
        updateQuizScore(id);
    }
    function updateQuizScore(id) {
        var blocks = document.querySelectorAll('.quiz-q-block');
        var answered = 0, correct = 0;
        blocks.forEach(function (b) {
            var v = state.quiz[b.getAttribute('data-quiz-key')];
            if (v !== undefined) { answered++; if (v === +b.getAttribute('data-answer')) correct++; }
        });
        document.querySelectorAll('[data-quiz-score="' + id + '"]').forEach(function (el) {
            el.textContent = answered ? '· ' + correct + ' / ' + blocks.length + ' correct' : '';
        });
    }

    /* ---------------- Sidebar & Top Quick Pills ---------------- */
    function renderTabs() {
        var list = document.getElementById('devtools-tab-list');
        list.innerHTML = ORDER.map(function (id, i) {
            var L = lessons[id];
            var active = id === state.active, done = !!state.completed[id];
            var sub = SUBTITLES[id] || L.tooltip;
            return '<li role="presentation"><button type="button" role="tab" id="tab-' + id + '" class="devtools-tab-btn' + (active ? ' active' : '') + (done ? ' completed' : '') +
                '" data-tab="' + id + '" aria-selected="' + active + '" aria-controls="devtools-lesson-host" tabindex="' + (active ? '0' : '-1') +
                '" title="' + esc(L.tooltip) + '"><span class="tab-icon" aria-hidden="true">' + L.icon + '</span>' +
                '<span class="tab-text-group"><span class="tab-label-text">' + (i + 1) + '. ' + esc(L.short) + '</span>' +
                '<span class="tab-sub-text">' + esc(sub) + '</span></span>' +
                '<span class="tab-check" aria-label="' + (done ? 'completed' : 'not completed') + '">✔</span></button></li>';
        }).join('');

        var pills = document.getElementById('devtools-quick-pills');
        if (pills) {
            pills.innerHTML = ORDER.map(function (id, i) {
                var L = lessons[id];
                var active = id === state.active;
                return '<button type="button" class="devtools-quick-pill' + (active ? ' active' : '') + '" data-tab="' + id + '" title="Jump to ' + esc(L.title) + '">' +
                    '<span>' + L.icon + '</span><span>' + (i + 1) + '. ' + esc(L.short) + '</span></button>';
            }).join('');
        }

        var n = ORDER.filter(function (id) { return state.completed[id]; }).length;
        document.getElementById('devtools-progress-bar').style.width = (n * 10) + '%';
        document.getElementById('devtools-progress-wrap').setAttribute('aria-valuenow', n);
        document.getElementById('devtools-progress-label').textContent = n + ' / 10 tabs complete';
    }

    function go(id, focusContent) {
        if (!lessons[id]) id = 'elements';
        state.active = id; saveState();
        if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
        renderTabs(); renderLesson(id); closeDrawer();
        if (focusContent) {
            var c = document.getElementById('devtools-content');
            c.scrollIntoView({ behavior: 'smooth', block: 'start' });
            c.focus({ preventScroll: true });
        }
    }

    function openDrawer() {
        document.getElementById('devtools-lhs').classList.add('mobile-open');
        document.getElementById('devtools-sidebar-overlay').classList.add('show');
        document.getElementById('btn-devtools-open-sidebar').setAttribute('aria-expanded', 'true');
        var a = document.querySelector('.devtools-tab-btn.active'); if (a) a.focus();
    }
    function closeDrawer() {
        document.getElementById('devtools-lhs').classList.remove('mobile-open');
        document.getElementById('devtools-sidebar-overlay').classList.remove('show');
        document.getElementById('btn-devtools-open-sidebar').setAttribute('aria-expanded', 'false');
    }

    /* ---------------- Lightbox Zoom Viewer ---------------- */
    var currentZoom = 100;
    function applyZoom() {
        var img = document.getElementById('devtools-lightbox-img');
        var resetBtn = document.getElementById('btn-zoom-reset');
        if (!img) return;
        if (currentZoom === 100) {
            img.style.maxWidth = '100%';
            img.style.width = 'auto';
        } else {
            img.style.maxWidth = 'none';
            img.style.width = currentZoom + '%';
        }
        if (resetBtn) resetBtn.textContent = currentZoom + '%';
    }
    function openLightbox(src, title) {
        var lb = document.getElementById('devtools-lightbox');
        var img = document.getElementById('devtools-lightbox-img');
        var ttl = document.getElementById('devtools-lightbox-title');
        var raw = document.getElementById('btn-open-newtab');
        if (!lb || !img) return;
        img.src = src;
        img.alt = title || 'Chrome DevTools Visual Guide';
        if (ttl) ttl.textContent = title || 'Chrome DevTools Visual Guide';
        if (raw) raw.href = src;
        currentZoom = 100;
        applyZoom();
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        document.getElementById('btn-lightbox-close').focus();
    }
    function closeLightbox() {
        var lb = document.getElementById('devtools-lightbox');
        if (!lb || lb.hidden) return;
        lb.hidden = true;
        document.body.style.overflow = '';
    }

    /* ---------------- Events ---------------- */
    function bind() {
        document.getElementById('devtools-tab-list').addEventListener('click', function (e) {
            var b = e.target.closest('[data-tab]'); if (b) go(b.getAttribute('data-tab'), window.innerWidth <= 1100);
        });
        var pills = document.getElementById('devtools-quick-pills');
        if (pills) {
            pills.addEventListener('click', function (e) {
                var b = e.target.closest('[data-tab]'); if (b) go(b.getAttribute('data-tab'), true);
            });
        }
        document.getElementById('devtools-tab-list').addEventListener('keydown', function (e) {
            var b = e.target.closest('[data-tab]'); if (!b) return;
            var i = ORDER.indexOf(b.getAttribute('data-tab')), j = null;
            if (e.key === 'ArrowDown') j = (i + 1) % 10;
            else if (e.key === 'ArrowUp') j = (i + 9) % 10;
            else if (e.key === 'Home') j = 0;
            else if (e.key === 'End') j = 9;
            if (j !== null) { e.preventDefault(); go(ORDER[j], false); document.getElementById('tab-' + ORDER[j]).focus(); }
        });

        /* Master 10-tab infographic drawer toggle */
        var toggleMapBtn = document.getElementById('btn-toggle-master-map');
        var mapDrawer = document.getElementById('devtools-master-map-drawer');
        var closeMapBtn = document.getElementById('btn-close-master-map');
        if (toggleMapBtn && mapDrawer) {
            toggleMapBtn.addEventListener('click', function () {
                var show = mapDrawer.hidden;
                mapDrawer.hidden = !show;
                toggleMapBtn.setAttribute('aria-expanded', String(show));
                toggleMapBtn.innerHTML = show ? '🗺️ Hide All-in-One 10-Tab Infographic' : '🗺️ View All-in-One 10-Tab Infographic';
            });
        }
        if (closeMapBtn && mapDrawer && toggleMapBtn) {
            closeMapBtn.addEventListener('click', function () {
                mapDrawer.hidden = true;
                toggleMapBtn.setAttribute('aria-expanded', 'false');
                toggleMapBtn.innerHTML = '🗺️ View All-in-One 10-Tab Infographic';
            });
        }

        /* Delegate clicks inside lesson host and master drawer for zoomable images */
        document.addEventListener('click', function (e) {
            var zoomTarget = e.target.closest('[data-zoom-src]');
            if (zoomTarget) {
                openLightbox(zoomTarget.getAttribute('data-zoom-src'), zoomTarget.getAttribute('data-zoom-title'));
                return;
            }
        });

        /* Lightbox controls */
        var lbClose = document.getElementById('btn-lightbox-close');
        var lbBackdrop = document.getElementById('devtools-lightbox-backdrop');
        var btnZoomIn = document.getElementById('btn-zoom-in');
        var btnZoomOut = document.getElementById('btn-zoom-out');
        var btnZoomReset = document.getElementById('btn-zoom-reset');
        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
        if (btnZoomIn) btnZoomIn.addEventListener('click', function () { currentZoom = Math.min(250, currentZoom + 25); applyZoom(); });
        if (btnZoomOut) btnZoomOut.addEventListener('click', function () { currentZoom = Math.max(50, currentZoom - 25); applyZoom(); });
        if (btnZoomReset) btnZoomReset.addEventListener('click', function () { currentZoom = 100; applyZoom(); });

        document.getElementById('devtools-lesson-host').addEventListener('click', function (e) {
            var t;
            if ((t = e.target.closest('.section-toggle-header'))) {
                var sec = t.closest('.lesson-section');
                var open = !sec.classList.contains('open');
                sec.classList.toggle('open', open); t.setAttribute('aria-expanded', open);
                state.open[sec.getAttribute('data-sec-key')] = open; saveState();
            } else if ((t = e.target.closest('.interview-tier-header'))) {
                var tier = t.closest('.interview-tier');
                tier.classList.toggle('open'); t.setAttribute('aria-expanded', tier.classList.contains('open'));
            } else if ((t = e.target.closest('.quiz-option-btn'))) {
                if (t.disabled) return;
                applyAnswer(t.closest('.quiz-q-block'), +t.getAttribute('data-option'), true);
                updateQuizScore(state.active);
            } else if ((t = e.target.closest('.btn-copy-code'))) {
                var text = t.closest('.code-block-wrap').querySelector('code').textContent;
                var done = function () { t.textContent = '✅ Copied'; t.classList.add('copied'); setTimeout(function () { t.textContent = '📋 Copy'; t.classList.remove('copied'); }, 1600); };
                if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
                else { fallbackCopy(text); done(); }
            } else if ((t = e.target.closest('[data-mark]'))) {
                var id = t.getAttribute('data-mark');
                state.completed[id] = !state.completed[id]; saveState();
                renderTabs();
                t.classList.toggle('done', !!state.completed[id]);
                t.setAttribute('aria-pressed', !!state.completed[id]);
                t.textContent = state.completed[id] ? '✅ Completed — click to undo' : '☐ Mark tab lesson as complete';
            } else if ((t = e.target.closest('[data-goto]'))) {
                go(t.getAttribute('data-goto'), true);
            }
        });

        function setAll(open) {
            document.querySelectorAll('#devtools-lesson-host .lesson-section').forEach(function (s) {
                s.classList.toggle('open', open);
                s.querySelector('.section-toggle-header').setAttribute('aria-expanded', open);
                state.open[s.getAttribute('data-sec-key')] = open;
            });
            saveState();
        }
        document.getElementById('btn-expand-all').addEventListener('click', function () { setAll(true); });
        document.getElementById('btn-collapse-all').addEventListener('click', function () { setAll(false); });
        document.getElementById('btn-devtools-reset').addEventListener('click', function () {
            if (!confirm('Clear all saved lesson progress and quiz answers?')) return;
            state = { active: state.active, completed: {}, quiz: {}, open: {} }; saveState(); go(state.active, false);
        });
        document.getElementById('btn-devtools-open-sidebar').addEventListener('click', openDrawer);
        document.getElementById('btn-devtools-close-sidebar').addEventListener('click', closeDrawer);
        document.getElementById('devtools-sidebar-overlay').addEventListener('click', closeDrawer);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeLightbox();
                closeDrawer();
            }
        });
        window.addEventListener('hashchange', function () {
            var id = location.hash.slice(1); if (lessons[id] && id !== state.active) go(id, true);
        });
        var top = document.getElementById('btn-back-to-top');
        window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 600); }, { passive: true });
        top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var missing = ORDER.filter(function (id) { return !lessons[id]; });
        if (missing.length) { console.error('DevTools lessons missing:', missing); }
        var fromHash = location.hash.slice(1);
        bind();
        go(lessons[fromHash] ? fromHash : (lessons[state.active] ? state.active : 'elements'), false);
    });
})();
