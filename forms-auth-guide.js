/**
 * ASP.NET Forms Authentication Interactive Controller
 * Deepthi T Portfolio
 */

// Tab Switching
function switchAuthTab(tabName) {
    const validTabs = ['beginner', 'intermediate', 'advanced'];
    if (!validTabs.includes(tabName)) tabName = 'beginner';

    // Update buttons
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });

    // Update panels
    document.querySelectorAll('.auth-tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    // Update subnav jumps
    document.querySelectorAll('.auth-subnav-group').forEach(group => {
        group.style.display = 'none';
    });
    const targetSubnav = document.getElementById(`subnav-${tabName}`);
    if (targetSubnav) {
        targetSubnav.style.display = 'flex';
    }

    // Update URL hash without jumping
    if (history.replaceState) {
        history.replaceState(null, null, `#${tabName}`);
    } else {
        location.hash = `#${tabName}`;
    }

    // Scroll to tabs bar if below or above
    const tabsContainer = document.querySelector('.auth-level-tabs-container');
    if (tabsContainer) {
        const rect = tabsContainer.getBoundingClientRect();
        if (rect.top < 0) {
            tabsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Code Copying
function copyAuthCode(button) {
    const wrapper = button.closest('.auth-code-wrapper');
    if (!wrapper) return;
    const codeEl = wrapper.querySelector('code');
    if (!codeEl) return;

    const textToCopy = codeEl.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = button.innerHTML;
        button.innerHTML = '<span>Copied! ✓</span>';
        button.style.background = '#10b981';
        button.style.borderColor = '#10b981';
        button.style.color = '#ffffff';

        setTimeout(() => {
            button.innerHTML = originalHtml;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Lightbox Modal
function openImageLightbox(imgSrc, captionText = '') {
    const modal = document.getElementById('image-lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const modalCaption = document.getElementById('lightbox-caption');

    if (modal && modalImg) {
        modalImg.src = imgSrc;
        if (modalCaption) {
            modalCaption.innerText = captionText;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageLightbox() {
    const modal = document.getElementById('image-lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Live Sandbox Bridge
function openSandboxWithAuthCode(snippetKey) {
    const AUTH_SNIPPETS = {
        login: `using System;
using System.Web.Security;

// Classic ASP.NET MVC Forms Authentication Login Action
public class AccountDemo {
    public static void Main() {
        string userEmail = "arjuna@enterprise.org";
        bool rememberMe = false;

        Console.WriteLine("=== Forms Authentication Cookie Issuer ===");
        
        // 1. Validate Credentials
        bool isValid = ValidateCredentials(userEmail, "SecureP@ss123");
        Console.WriteLine($"Credential Check: {isValid}");

        if (isValid) {
            // 2. SetAuthCookie generates encrypted .ASPXAUTH cookie
            Console.WriteLine($"Issuing Auth Cookie for: {userEmail}");
            Console.WriteLine($"Cookie Name: .ASPXAUTH");
            Console.WriteLine($"Persistent: {rememberMe}");
            Console.WriteLine($"Protection: Encryption (AES) + Validation (HMAC-SHA256)");
            Console.WriteLine("Authentication Ticket issued successfully.");
        }
    }

    static bool ValidateCredentials(string email, string password) {
        return !string.IsNullOrEmpty(email) && password.Length >= 8;
    }
}`,
        ticket: `using System;
using System.Web.Security;

// Manual FormsAuthenticationTicket Construction with UserData Roles
public class TicketDemo {
    public static void Main() {
        int version = 2;
        string userName = "arjuna@enterprise.org";
        DateTime issueDate = DateTime.UtcNow;
        DateTime expiration = issueDate.AddMinutes(30);
        bool isPersistent = false;
        string userDataRoles = "Admin,SecurityLead,BillingApprover";
        string cookiePath = "/";

        Console.WriteLine("=== FormsAuthenticationTicket Custom Creation ===");
        Console.WriteLine($"Ticket Version : {version}");
        Console.WriteLine($"Subject        : {userName}");
        Console.WriteLine($"Issued At      : {issueDate:u}");
        Console.WriteLine($"Expires At     : {expiration:u}");
        Console.WriteLine($"Persistent     : {isPersistent}");
        Console.WriteLine($"UserData Roles : {userDataRoles}");
        Console.WriteLine($"Cookie Path    : {cookiePath}");
        Console.WriteLine("Ticket serialized and encrypted via MachineKey.");
    }
}`,
        revocation: `using System;
using System.Collections.Concurrent;

// Server-Side Revocation Store Simulation (Redis Blacklist Pattern)
public class RevocationDemo {
    private static ConcurrentDictionary<string, DateTime> RevokedTickets = new();

    public static void Main() {
        string sessionTicketId = Guid.NewGuid().ToString("N");
        Console.WriteLine($"Session Ticket ID: {sessionTicketId}");

        // Normal check
        Console.WriteLine("Is Ticket Revoked? " + IsRevoked(sessionTicketId));

        // User logs out or resets password -> Add to Redis Revocation List
        Console.WriteLine("\n[ACTION] User clicked Logout or Password Reset!");
        RevokeTicket(sessionTicketId, DateTime.UtcNow.AddMinutes(30));

        // Subsequent check with the same stolen/cached cookie
        Console.WriteLine("Is Ticket Revoked now? " + IsRevoked(sessionTicketId));
        Console.WriteLine("Server blocks request with HTTP 401 Unauthorized!");
    }

    static void RevokeTicket(string ticketId, DateTime expiresAt) {
        RevokedTickets[ticketId] = expiresAt;
    }

    static bool IsRevoked(string ticketId) {
        return RevokedTickets.ContainsKey(ticketId);
    }
}`
    };

    const code = AUTH_SNIPPETS[snippetKey] || AUTH_SNIPPETS.login;
    if (typeof openSandbox === 'function') {
        openSandbox(code, 'Forms Authentication Practice');
    } else {
        // Fallback: save to localStorage and navigate to sandbox-guide.html
        try {
            localStorage.setItem('customSandboxCode', code);
        } catch(e){}
        window.location.href = 'sandbox-guide.html';
    }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    // Check URL Hash on load
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['beginner', 'intermediate', 'advanced'].includes(hash)) {
        switchAuthTab(hash);
    } else {
        switchAuthTab('beginner');
    }

    // Lightbox modal keyboard handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageLightbox();
        }
    });

    // Close on click outside lightbox content
    const modal = document.getElementById('image-lightbox-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageLightbox();
            }
        });
    }
});
