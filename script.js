function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }
}

// C# 1-15 Interactive Filter & Search Engine
function filterCSharpEra(era, btn) {
    // Update active era button
    document.querySelectorAll('.csharp-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Reset pill buttons & search input
    document.querySelectorAll('.csharp-pill-btn').forEach(p => p.classList.remove('active'));
    const searchInput = document.getElementById('csharp-search');
    if (searchInput) searchInput.value = '';

    const cards = document.querySelectorAll('.csharp-card');
    cards.forEach(card => {
        const cardEra = card.getAttribute('data-era');
        if (era === 'all' || cardEra === era) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCSharpVersion(versionNumber, pill) {
    // Update active pill button
    document.querySelectorAll('.csharp-pill-btn').forEach(p => p.classList.remove('active'));
    if (pill) pill.classList.add('active');

    // Reset era buttons & search input
    document.querySelectorAll('.csharp-filter-btn').forEach(b => b.classList.remove('active'));
    const searchInput = document.getElementById('csharp-search');
    if (searchInput) searchInput.value = '';

    const cards = document.querySelectorAll('.csharp-card');
    cards.forEach(card => {
        const cardVersion = card.getAttribute('data-version');
        if (versionNumber === 'all' || cardVersion === String(versionNumber)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCSharp(query) {
    const term = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.csharp-card');

    // Clear active button states if searching
    if (term.length > 0) {
        document.querySelectorAll('.csharp-filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.csharp-pill-btn').forEach(p => p.classList.remove('active'));
    } else {
        const allBtn = document.querySelector('.csharp-filter-btn[data-era="all"]');
        if (allBtn) allBtn.classList.add('active');
    }

    cards.forEach(card => {
        const textContent = card.innerText.toLowerCase();
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        if (term === '' || textContent.includes(term) || keywords.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// .NET Architecture Interactive Filter & Search Engine
function filterDotNetEra(era, btn) {
    document.querySelectorAll('.dotnet-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.dotnet-pill-btn').forEach(p => p.classList.remove('active'));
    const searchInput = document.getElementById('dotnet-search');
    if (searchInput) searchInput.value = '';

    const cards = document.querySelectorAll('.dotnet-card');
    cards.forEach(card => {
        const cardEra = card.getAttribute('data-era');
        if (era === 'all' || cardEra === era) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterDotNetVersion(versionKey, pill) {
    document.querySelectorAll('.dotnet-pill-btn').forEach(p => p.classList.remove('active'));
    if (pill) pill.classList.add('active');

    document.querySelectorAll('.dotnet-filter-btn').forEach(b => b.classList.remove('active'));
    const searchInput = document.getElementById('dotnet-search');
    if (searchInput) searchInput.value = '';

    const cards = document.querySelectorAll('.dotnet-card');
    cards.forEach(card => {
        const cardVersion = card.getAttribute('data-version');
        if (versionKey === 'all' || cardVersion === String(versionKey)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchDotNet(query) {
    const term = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.dotnet-card');

    if (term.length > 0) {
        document.querySelectorAll('.dotnet-filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dotnet-pill-btn').forEach(p => p.classList.remove('active'));
    } else {
        const allBtn = document.querySelector('.dotnet-filter-btn[data-era="all"]');
        if (allBtn) allBtn.classList.add('active');
    }

    cards.forEach(card => {
        const textContent = card.innerText.toLowerCase();
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        if (term === '' || textContent.includes(term) || keywords.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

