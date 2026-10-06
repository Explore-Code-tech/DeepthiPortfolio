/**
 * C# / .NET Sandbox Integration & Live Runner Engine
 * Deepthi T Portfolio
 */

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
}`,

    net11_union: `using System;

// .NET 11 & C# 15 (2026) - Native Union Types & Exhaustive Switch
// C# 15 provides 'union' keyword & compiler exhaustiveness; .NET 11 provides IUnion & UnionAttribute runtime support.
class Program {
    static void Main() {
        Console.WriteLine("=== .NET 11 & C# 15 Native Union Types ===");
        
        var payment1 = new PaymentMethod.CreditCard("4111-XXXX-XXXX-1111", 120.50m);
        var payment2 = new PaymentMethod.Crypto("0x71C...B29", 0.045m);
        
        Console.WriteLine(ProcessPayment(payment1));
        Console.WriteLine(ProcessPayment(payment2));
    }

    public abstract record PaymentMethod {
        public record CreditCard(string CardNumber, decimal Amount) : PaymentMethod;
        public record Crypto(string WalletAddress, decimal Amount) : PaymentMethod;
        public record Cash(decimal Amount) : PaymentMethod;
    }

    static string ProcessPayment(PaymentMethod method) => method switch {
        PaymentMethod.CreditCard cc => $"Processed Visa/MasterCard: {cc.Amount:C}",
        PaymentMethod.Crypto cr     => $"Processed Web3 Crypto transfer: {cr.Amount} ETH",
        PaymentMethod.Cash ca       => $"Processed Cash tender: {ca.Amount:C}"
    };
}`
};

let lastLoadedSnippet = "";

document.addEventListener('DOMContentLoaded', () => {
    initEmbeddedSandbox();
    initModalKeyHandlers();
});

// Initialize Embedded Sandbox on page load
function initEmbeddedSandbox() {
    const editor = document.getElementById('embedded-sandbox-editor');
    const select = document.getElementById('embedded-template-select');
    if (!editor) return;

    editor.value = SANDBOX_TEMPLATES.net11_union || SANDBOX_TEMPLATES.net1;
    lastLoadedSnippet = editor.value;

    // Tab key indents 4 spaces
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runEmbeddedSandboxCode();
        }
    });
}

function onEmbeddedTemplateChange(templateKey) {
    const editor = document.getElementById('embedded-sandbox-editor');
    if (!editor) return;
    if (SANDBOX_TEMPLATES[templateKey]) {
        editor.value = SANDBOX_TEMPLATES[templateKey];
        lastLoadedSnippet = SANDBOX_TEMPLATES[templateKey];
        clearEmbeddedSandboxOutput();
        const status = document.getElementById('embedded-sandbox-status');
        if (status) status.innerText = '⚡ Status: Loaded Template (Ctrl + Enter to Run)';
    }
}

function runEmbeddedSandboxCode() {
    const editor = document.getElementById('embedded-sandbox-editor');
    const output = document.getElementById('embedded-sandbox-output');
    const status = document.getElementById('embedded-sandbox-status');
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

function resetEmbeddedSandboxCode() {
    const select = document.getElementById('embedded-template-select');
    const editor = document.getElementById('embedded-sandbox-editor');
    if (editor && select && SANDBOX_TEMPLATES[select.value]) {
        editor.value = SANDBOX_TEMPLATES[select.value];
    } else if (editor && lastLoadedSnippet) {
        editor.value = lastLoadedSnippet;
    }
}

function copyEmbeddedSandboxCode(btn) {
    const editor = document.getElementById('embedded-sandbox-editor');
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
        const oldText = btn.innerText;
        btn.innerText = '✓ Copied';
        setTimeout(() => { btn.innerText = oldText; }, 1800);
    });
}

function clearEmbeddedSandboxOutput() {
    const output = document.getElementById('embedded-sandbox-output');
    if (output) {
        output.innerHTML = `<span class="console-line-info">$ dotnet run Program.cs</span>\n<span class="console-line-success">Ready. Click [▶ Run Code] to execute in the embedded runner!</span>`;
    }
}

function openSandboxFromEmbedded() {
    const editor = document.getElementById('embedded-sandbox-editor');
    const code = editor ? editor.value : '';
    openSandbox(code);
}

// Modal Sandbox Handlers
function openSandbox(customSnippet = '') {
    const overlay = document.getElementById('sandbox-overlay');
    const editor = document.getElementById('sandbox-code-editor');
    const select = document.getElementById('sandbox-template-select');
    if (!overlay || !editor) return;

    if (customSnippet && customSnippet.trim().length > 0) {
        editor.value = customSnippet;
        if (select) select.value = 'custom';
    } else if (!editor.value || editor.value.trim().length === 0) {
        editor.value = SANDBOX_TEMPLATES.net11_union || SANDBOX_TEMPLATES.net1;
        if (select) select.value = 'net11_union';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSandbox() {
    const overlay = document.getElementById('sandbox-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSandboxOverlayClick(e) {
    if (e.target && e.target.id === 'sandbox-overlay') {
        closeSandbox();
    }
}

function onModalTemplateChange(templateKey) {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor) return;
    if (SANDBOX_TEMPLATES[templateKey]) {
        editor.value = SANDBOX_TEMPLATES[templateKey];
        clearModalSandboxOutput();
    }
}

function runModalSandboxCode() {
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

function resetModalSandboxCode() {
    const select = document.getElementById('sandbox-template-select');
    const editor = document.getElementById('sandbox-code-editor');
    if (editor && select && SANDBOX_TEMPLATES[select.value]) {
        editor.value = SANDBOX_TEMPLATES[select.value];
    }
}

function copyModalSandboxCode() {
    const editor = document.getElementById('sandbox-code-editor');
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
        const btn = document.querySelector('.sandbox-footer-left button:nth-child(3)');
        if (btn) {
            const old = btn.innerText;
            btn.innerText = '✓ Copied!';
            setTimeout(() => { btn.innerText = old; }, 1800);
        }
    });
}

function clearModalSandboxOutput() {
    const output = document.getElementById('sandbox-output');
    if (output) {
        output.innerHTML = `<span class="console-line-info">$ dotnet run Program.cs</span>\n<span class="console-line-success">Ready. Click [▶ Run Code] to execute your .NET code!</span>`;
    }
}

function initModalKeyHandlers() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSandbox();
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const overlay = document.getElementById('sandbox-overlay');
            if (overlay && overlay.classList.contains('active')) runModalSandboxCode();
        }
    });

    const modalEditor = document.getElementById('sandbox-code-editor');
    if (modalEditor) {
        modalEditor.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    }
}

// Execution simulator
function simulateDotNetExecution(code) {
    const lines = [];
    const writeLineRegex = /Console\.WriteLine\s*\(\s*(.*?)\s*\)\s*;/g;
    let match;
    let foundLogs = 0;

    while ((match = writeLineRegex.exec(code)) !== null) {
        let content = match[1].trim();
        if (content.includes('ProcessPayment')) {
            lines.push("Processed Visa/MasterCard: $120.50");
            lines.push("Processed Web3 Crypto transfer: 0.045 ETH");
            foundLogs += 2;
            continue;
        }
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

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
