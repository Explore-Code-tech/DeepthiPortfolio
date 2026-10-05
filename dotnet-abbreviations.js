// .NET Abbreviation & Architect Interview Index Dataset
// Engineered for Deepthi T - Technical Lead (.NET & Cloud Architecture)
// Pattern: Full Form -> One-line meaning -> Why it exists -> Architecture role -> Interview questions -> Senior/Architect question -> Real Project Example -> Sandbox snippet

const ABBREVIATION_CATEGORIES = [
  "All",
  "Runtime",
  "ASP.NET Core & Web",
  "Security & Auth",
  "Data & EF Core",
  "Architecture & Design",
  "Cloud & DevOps"
];

const DOTNET_ABBREVIATIONS = [
  // ==========================================
  // RUNTIME & EXECUTION ENGINE
  // ==========================================
  {
    abbr: "CLR",
    fullForm: "Common Language Runtime",
    category: "Runtime",
    oneLine: "The virtual execution engine that manages the execution of .NET programs (memory, JIT, GC, type safety, thread pools).",
    why: "Why it exists: To eliminate C++ unmanaged memory corruption, buffer overflows, and platform lock-in by executing managed MSIL with automated Garbage Collection.",
    archRole: "Loads assemblies, validates MSIL bytecode, boots JIT compilation, manages thread scheduling, enforces type safety, and reclaims memory via GC.",
    interviewQuestions: [
      "What is CLR and what core responsibilities does it handle?",
      "What happens between compiling C# source code and executing native CPU machine code?",
      "What is the difference between Managed Code and Unmanaged Code?",
      "How does the CLR isolate applications (AppDomains vs OS Processes)?"
    ],
    architectScenario: {
      question: "Your high-throughput API experiences sudden 500ms latency spikes and CPU spikes under load. How do you determine whether it's caused by CLR JIT compilation, GC compaction, or ThreadPool starvation?",
      answer: "Use dotnet-trace and dotnet-counters to monitor '% Time in GC', 'Gen 2 GC collections', and 'ThreadPool Work Items'. If GC pauses dominate, analyze allocations with PerfView/dotMemory and convert hot paths to Span<T> and ArrayPool<T>. If JIT is the issue, enable Dynamic PGO or compile with ReadyToRun / Native AOT. If ThreadPool starvation is occurring, verify that asynchronous I/O is not blocked by sync-over-async (.Result or .Wait())."
    },
    realProject: "In ASC WebQI and Srimantha-Algox, we tuned the CLR Server GC configuration and monitored allocations in high-volume surgery reporting and order-routing routines to keep latency under 15ms.",
    code: `// Inspecting CLR Environment
using System;

class Program {
    static void Main() {
        Console.WriteLine("=== CLR Runtime Inspection ===");
        Console.WriteLine("CLR Version: " + Environment.Version);
        Console.WriteLine("64-Bit OS  : " + Environment.Is64BitOperatingSystem);
        Console.WriteLine("CPU Cores  : " + Environment.ProcessorCount);
        Console.WriteLine("Heap Memory: " + (GC.GetTotalMemory(false) / 1024) + " KB");
    }
}`
  },

  {
    abbr: "CTS",
    fullForm: "Common Type System",
    category: "Runtime",
    oneLine: "The universal type standard that defines all data types and programming constructs supported by the CLR.",
    why: "Why it exists: To enable seamless cross-language interoperability (e.g. C# and VB.NET sharing identical integer and object definitions without translation).",
    archRole: "Specifies how types are declared, used, and managed in the CLR, dividing everything into Value Types (System.ValueType) and Reference Types (System.Object).",
    interviewQuestions: [
      "What is CTS and how does it differ from CLS?",
      "How does CTS categorize value types vs reference types?",
      "Why can a C# class inherit from a VB.NET class without conversion issues?"
    ],
    architectScenario: {
      question: "In a multi-language microservice environment, how does CTS guarantee memory layout compatibility when sharing compiled assemblies?",
      answer: "CTS guarantees that primitive types like System.Int32 or System.String have identical byte sizes and metadata definitions across all .NET languages. An assembly compiled in C# exposes standardized metadata tokens that any CLS-compliant language can consume directly without serialization or FFI wrappers."
    },
    realProject: "Used when integrating legacy VB.NET reporting components into our modern C# ASC WebQI healthcare analytics platform.",
    code: `// CTS Type Hierarchy Verification
using System;

class Program {
    static void Main() {
        int x = 42; // C# keyword
        Int32 y = 42; // CTS Type in BCL
        Console.WriteLine("Are types identical? " + (x.GetType() == typeof(Int32)));
        Console.WriteLine("Base Type: " + x.GetType().BaseType); // System.ValueType
    }
}`
  },

  {
    abbr: "CLS",
    fullForm: "Common Language Specification",
    category: "Runtime",
    oneLine: "A set of baseline rules and restrictions that guarantees interoperability across all .NET languages.",
    why: "Why it exists: Different languages have different features (e.g., C# is case-sensitive and supports unsigned ints; VB.NET is case-insensitive and historically lacked unsigned ints). CLS defines the common denominator.",
    archRole: "Acts as a contract for public APIs. Types marked with [assembly: CLSCompliant(true)] ensure any .NET language can consume them without errors.",
    interviewQuestions: [
      "Why is CLS required when we already have CTS?",
      "Give an example of C# code that violates CLS compliance?",
      "How do you enforce CLS compliance in an enterprise NuGet package?"
    ],
    architectScenario: {
      question: "You are authoring a shared enterprise library distributed across both C# and legacy VB.NET development teams. How do you prevent breaking consumers with non-compliant public members?",
      answer: "Decorate the assembly with [assembly: CLSCompliant(true)]. Avoid public unsigned types like uint/ulong or public methods that differ only by casing (e.g., Run() vs run()). CSC compiler will emit build warnings/errors if any public API violates CLS rules."
    },
    realProject: "Enforced in our shared core clinical validation DLLs to allow consumption by both modern C# web backends and legacy client applications.",
    code: `using System;

[assembly: CLSCompliant(true)]

public class ComplianceAudit {
    // CLS Compliant: uses signed integer
    public int CalculateScore(int score) => score * 2;

    // Non-compliant if made public: uint is not CLS compliant!
    // public uint GetId() => 10;
}`
  },

  {
    abbr: "MSIL",
    fullForm: "Microsoft Intermediate Language (IL / CIL)",
    category: "Runtime",
    oneLine: "CPU-independent assembly bytecode emitted by the C# compiler and executed by the CLR.",
    why: "Why it exists: Enables hardware neutrality (write once, execute on x86, x64, ARM64) and enables JIT optimizations based on target CPU capabilities.",
    archRole: "Acts as the universal binary contract. JIT converts MSIL instructions (like ldarg, stloc, callvirt) into optimized native CPU machine code.",
    interviewQuestions: [
      "What is MSIL and how does it differ from native machine code?",
      "What is the difference between call and callvirt IL instructions?",
      "How do you inspect MSIL bytecode in production debugging?"
    ],
    architectScenario: {
      question: "Why does the C# compiler emit callvirt even for non-virtual methods when calling on an object reference?",
      answer: "The C# compiler emits callvirt for instance method calls to perform a null check before invocation. If the target reference is null, callvirt throws a NullReferenceException immediately. In contrast, the call instruction would invoke the method without a null check, causing crashes if the method accesses instance state."
    },
    realProject: "Used ILSpy and WinDbg during performance audits of ASC WebQI database wrappers to verify zero-boxing on hot execution paths.",
    code: `// MSIL Stack-based Evaluation Simulator
using System;

class Program {
    static void Main() {
        int a = 10; // IL: ldc.i4.s 10 -> stloc.0
        int b = 20; // IL: ldc.i4.s 20 -> stloc.1
        int c = a + b; // IL: ldloc.0 -> ldloc.1 -> add -> stloc.2
        Console.WriteLine("MSIL Computed Sum: " + c);
    }
}`
  },

  {
    abbr: "JIT",
    fullForm: "Just-In-Time Compiler",
    category: "Runtime",
    oneLine: "Converts intermediate MSIL bytecode into CPU-native machine instructions at runtime.",
    why: "Why it exists: To allow portable code execution while taking full advantage of the specific CPU features (AVX2, AVX-512, ARM Neon) of the host server.",
    archRole: "RyuJIT acts as the compiler engine inside CoreCLR. Implements Tiered Compilation (Tier 0 quick JIT, Tier 1 optimized JIT) and Dynamic PGO.",
    interviewQuestions: [
      "What is JIT and where does it fit inside the CLR?",
      "Does JIT compile the entire application at startup?",
      "What is Tiered Compilation (Tier 0 vs Tier 1)?",
      "What is the difference between JIT and Ahead-Of-Time (AOT) compilation?"
    ],
    architectScenario: {
      question: "Your API has excellent steady-state throughput but poor cold-start performance in autoscaling cloud pods. Would you investigate JIT, ReadyToRun, Native AOT, or something else? Why?",
      answer: "Investigate Tiered Compilation settings, ReadyToRun (R2R), and Native AOT. JIT compiles methods on first execution, causing cold-start latency. ReadyToRun pre-compiles MSIL to native machine code at build time while keeping JIT fallback, significantly improving container startup without reflection breaking changes. For stateless microservices with no dynamic reflection, Native AOT drops cold-start to under 10ms."
    },
    realProject: "Optimized cold start times of ASC WebQI containerized audit reporting workers from 4.2s down to 450ms using Tiered Compilation and ReadyToRun.",
    code: `// Measuring JIT Compilation First-Call Overhead
using System;
using System.Diagnostics;

class Program {
    static void Main() {
        // First Call: Includes JIT compilation time
        var sw = Stopwatch.StartNew();
        ComputeHeavy(5);
        sw.Stop();
        Console.WriteLine("First Invocation (with JIT): " + sw.ElapsedTicks + " ticks");

        // Second Call: Native code executed directly!
        sw.Restart();
        ComputeHeavy(5);
        sw.Stop();
        Console.WriteLine("Second Invocation (pre-JITted): " + sw.ElapsedTicks + " ticks");
    }

    static int ComputeHeavy(int n) => n * n * n;
}`
  },

  {
    abbr: "AOT",
    fullForm: "Ahead-Of-Time Compilation (Native AOT)",
    category: "Runtime",
    oneLine: "Compiles .NET code directly into native platform machine binaries at build time, bypassing the runtime JIT compiler.",
    why: "Why it exists: To deliver instant startup (<10ms), tiny memory footprints (<20MB), and eliminate JIT overhead in auto-scaling container environments.",
    archRole: "Uses ILCompiler and ILLink to prune unused code, emitting a standalone ELF or PE native binary with no JIT or dynamic MSIL loader.",
    interviewQuestions: [
      "Why would you choose Native AOT over standard JIT?",
      "What are the major limitations and trade-offs of Native AOT?",
      "How does Native AOT affect reflection and serialization?"
    ],
    architectScenario: {
      question: "When should an enterprise software architect recommend AGAINST Native AOT?",
      answer: "When the application relies heavily on dynamic reflection (Assembly.Load, Type.GetType), runtime dynamic code generation (Reflection.Emit), older ORMs that lack Roslyn Source Generators, or heavy ASP.NET Core MVC with dynamic Razor runtime compilation. Native AOT requires closed-world analysis at build time."
    },
    realProject: "Evaluated and implemented Native AOT for high-speed background queue consumer microservices in Magician Hub, reducing RAM footprint from 140MB to 18MB per container.",
    code: `// Native AOT Friendly JSON Serialization (Source Generated)
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public record AuditItem(int Id, string CaseCode);

[JsonSerializable(typeof(AuditItem))]
internal partial class AuditJsonContext : JsonSerializerContext {}

class Program {
    static void Main() {
        var item = new AuditItem(1, "ASC-SURGERY-99");
        // Zero-reflection serialization ready for Native AOT:
        string json = JsonSerializer.Serialize(item, AuditJsonContext.Default.AuditItem);
        Console.WriteLine("AOT Serialized JSON: " + json);
    }
}`
  },

  {
    abbr: "R2R",
    fullForm: "ReadyToRun Compilation",
    category: "Runtime",
    oneLine: "A hybrid format where assemblies contain pre-compiled native machine code alongside standard MSIL.",
    why: "Why it exists: Improves application startup times by eliminating JIT compilation on initial method calls, while preserving 100% full reflection and CLR compatibility.",
    archRole: "The CLR loads pre-compiled native code directly into memory. If code runs on a CPU with newer instruction sets, RyuJIT can re-JIT hot methods with superior optimizations.",
    interviewQuestions: [
      "What is ReadyToRun (R2R) and how does it differ from JIT and Native AOT?",
      "What are the trade-offs of publishing an application with ReadyToRun enabled?",
      "How does R2R improve startup without breaking dynamic reflection?"
    ],
    architectScenario: {
      question: "Why would you choose ReadyToRun instead of Native AOT for an existing monolithic enterprise application?",
      answer: "ReadyToRun preserves 100% .NET compatibility. Unlike Native AOT, R2R does NOT require trimming, does not break dynamic reflection, and retains the full CLR runtime. It provides 60-80% of the startup benefits of AOT with zero risk of runtime trimming exceptions."
    },
    realProject: "Adopted ReadyToRun in ASC WebQI backend Docker images to drop cold start latency without refactoring third-party legacy report generators.",
    code: `// Project configuration for ReadyToRun:
// <PropertyGroup>
//   <PublishReadyToRun>true</PublishReadyToRun>
// </PropertyGroup>
using System;

class Program {
    static void Main() {
        Console.WriteLine("ReadyToRun: Native code loaded upfront. Cold start latency eliminated!");
    }
}`
  },

  {
    abbr: "PGO",
    fullForm: "Profile-Guided Optimization (Dynamic PGO)",
    category: "Runtime",
    oneLine: "A JIT compilation technique that monitors live execution behavior and optimizes hot paths dynamically.",
    why: "Why it exists: To de-virtualize interface method calls, inline frequent delegates, and optimize memory layout based on real production traffic.",
    archRole: "Tier 0 JIT instruments methods with counters. When promoted to Tier 1, RyuJIT uses this profile data to transform virtual calls into direct jumps and unroll frequent loops.",
    interviewQuestions: [
      "What is Dynamic PGO and how does it work in modern .NET?",
      "How does Dynamic PGO de-virtualize interface calls?",
      "What performance improvement does Dynamic PGO deliver to enterprise workloads?"
    ],
    architectScenario: {
      question: "How does Dynamic PGO improve performance in a microservice where all business logic is programmed against interfaces (e.g., IRepository, ILogger)?",
      answer: "In standard OOP, invoking an interface method requires a virtual dispatch through a vtable. Dynamic PGO monitors which concrete class is actually called. If 99% of calls go to SurgerySqlRepository, RyuJIT emits an inlined branch: 'if (type == SurgerySqlRepository) inline_code(); else virtual_call();'. This eliminates virtual indirection and enables aggressive loop vectorization."
    },
    realProject: "Enabled DOTNET_TieredPGO=1 in our .NET 8 services, yielding an immediate 18% increase in requests-per-second on our healthcare report generation endpoints.",
    code: `using System;

public interface ICalculator { int Calculate(int x); }
public class FastCalculator : ICalculator { public int Calculate(int x) => x * 2; }

class Program {
    static void Main() {
        ICalculator calc = new FastCalculator();
        // Dynamic PGO detects FastCalculator is always passed, de-virtualizes and inlines Calculate!
        int sum = 0;
        for (int i = 0; i < 100_000; i++) sum += calc.Calculate(i);
        Console.WriteLine("Dynamic PGO Execution Sum: " + sum);
    }
}`
  },

  {
    abbr: "GC",
    fullForm: "Garbage Collector",
    category: "Runtime",
    oneLine: "The automatic memory management engine in the CLR that allocates and reclaims managed heap memory.",
    why: "Why it exists: Eliminates manual memory management bugs (dangling pointers, double free, memory leaks) while ensuring memory compaction.",
    archRole: "Implements a generational mark-and-compact algorithm dividing managed memory into Generation 0, 1, 2, LOH, and POH.",
    interviewQuestions: [
      "How does the .NET Garbage Collector work (Mark, Sweep, Compact)?",
      "Explain the Generational Hypothesis (Gen 0, Gen 1, Gen 2).",
      "What is the difference between Workstation GC and Server GC?",
      "What causes a full Gen 2 collection and why is it expensive?"
    ],
    architectScenario: {
      question: "You observe high CPU usage and long application pauses. PerfView shows 35% '% Time in GC'. How do you diagnose and architecturally resolve this issue?",
      answer: "A high '% Time in GC' indicates severe memory allocation pressure. Look at Gen 2 collection counts and LOH allocations. If temporary objects are surviving into Gen 2 ('Mid-Life Crisis'), refactor code to reduce allocations by using struct/in parameters, Span<T>, ArrayPool<T>. If LOH is fragmented, inspect byte arrays >= 85KB and migrate them to POH or RecyclableMemoryStream."
    },
    realProject: "Diagnosed high GC pauses in ASC WebQI file export pipeline; refactored byte buffer allocations to ArrayPool<byte>.Shared, dropping Gen 2 collections from 42/min to 0.",
    code: `// GC Diagnostics Demonstration
using System;

class Program {
    static void Main() {
        Console.WriteLine("=== Garbage Collector Diagnostics ===");
        Console.WriteLine("Gen 0 Collections: " + GC.CollectionCount(0));
        Console.WriteLine("Gen 1 Collections: " + GC.CollectionCount(1));
        Console.WriteLine("Gen 2 Collections: " + GC.CollectionCount(2));
        Console.WriteLine("Total Allocated  : " + (GC.GetTotalMemory(false) / 1024) + " KB");
    }
}`
  },

  {
    abbr: "LOH",
    fullForm: "Large Object Heap",
    category: "Runtime",
    oneLine: "A specialized heap in the CLR where objects 85,000 bytes or larger are allocated.",
    why: "Why it exists: Moving large memory blocks during GC compaction is very CPU-expensive. LOH treats large objects with sweep-based reclamation rather than compaction.",
    archRole: "Allocates large arrays and strings directly in Gen 2. By default, it is not compacted to prevent thread stalls, which can lead to memory fragmentation.",
    interviewQuestions: [
      "What threshold triggers an allocation on the Large Object Heap (LOH)?",
      "Why is LOH not compacted by default?",
      "How does LOH fragmentation occur and how do you prevent it?"
    ],
    architectScenario: {
      question: "Your application downloads 100KB PDF files concurrently. Over time, memory consumption climbs to 8GB even though active load is small. What is happening and how do you fix it?",
      answer: "LOH fragmentation. Each 100KB byte array allocates on the LOH. When freed, the memory leaves holes. New requests needing slightly different sizes cannot fit into these gaps, forcing the heap to expand. Fix: Use ArrayPool<byte>.Shared or Microsoft.IO.RecyclableMemoryStream to reuse pooled buffers, or configure GCSettings.LargeObjectHeapCompactionMode = GCLargeObjectHeapCompactionMode.CompactOnce."
    },
    realProject: "Solved PDF export memory bloating in ASC WebQI surgical report downloads by switching from new MemoryStream(120000) to Microsoft.IO.RecyclableMemoryStream.",
    code: `using System;

class Program {
    static void Main() {
        // 85,000 bytes threshold:
        byte[] normalObj = new byte[84_000]; // SOH (Gen 0)
        byte[] largeObj  = new byte[85_000]; // LOH (Gen 2 immediately!)

        Console.WriteLine("normalObj Generation: " + GC.GetGeneration(normalObj)); // 0
        Console.WriteLine("largeObj  Generation: " + GC.GetGeneration(largeObj));  // 2 (LOH)
    }
}`
  },

  {
    abbr: "POH",
    fullForm: "Pinned Object Heap",
    category: "Runtime",
    oneLine: "A dedicated GC heap introduced in .NET 5 for objects pinned in memory for unmanaged I/O operations.",
    why: "Why it exists: Pinning objects in Gen 0/1/2 creates 'sandbars' that prevent GC compaction. POH isolates pinned objects so standard heaps compact freely.",
    archRole: "Stores buffers pinned for socket and disk async I/O. The GC never moves objects on the POH, preventing native pointer invalidation.",
    interviewQuestions: [
      "What is the Pinned Object Heap (POH) and why was it introduced in .NET 5?",
      "How does pinning objects in Gen 0 degrade GC compaction performance?",
      "How do you allocate an array directly on the POH?"
    ],
    architectScenario: {
      question: "In a high-concurrency socket server, how does POH eliminate memory fragmentation compared to GCHandle.Alloc(Pin)?",
      answer: "Using GCHandle.Alloc with Pin locks an object inside Gen 0 or Gen 1. When the GC sweeps, it cannot relocate the pinned object, leaving dead memory gaps around it. By allocating buffers with GC.AllocateArray<byte>(length, pinned: true) directly on the POH, pinned buffers live in an isolated heap, allowing the SOH to compact freely with zero fragmentation."
    },
    realProject: "Utilized in Srimantha-Algox WebSocket order stream receiver to allocate pinned network socket buffers with zero SOH heap fragmentation.",
    code: `using System;

class Program {
    static void Main() {
        // Allocate array directly on Pinned Object Heap (.NET 5+)
        byte[] pinnedBuffer = GC.AllocateArray<byte>(4096, pinned: true);
        Console.WriteLine("POH Buffer Allocated: " + pinnedBuffer.Length + " bytes");
        Console.WriteLine("Generation: " + GC.GetGeneration(pinnedBuffer)); // 2
    }
}`
  },

  {
    abbr: "TFM",
    fullForm: "Target Framework Moniker",
    category: "Runtime",
    oneLine: "A standardized token that specifies the target runtime and API surface an assembly or NuGet package compiles against.",
    why: "Why it exists: Tells the compiler and NuGet packager what APIs are available (e.g., net8.0 vs net48 vs netstandard2.0).",
    archRole: "Configured in <TargetFramework> within .csproj to govern assembly references and compilation symbols.",
    interviewQuestions: [
      "What is a Target Framework Moniker (TFM)? Give examples.",
      "What is the difference between net8.0 and netstandard2.0?",
      "How do you multi-target a library across multiple TFMs?"
    ],
    architectScenario: {
      question: "You are designing a shared domain model library that must be consumed by a legacy .NET Framework 4.8 monolith and a new .NET 8 cloud microservice. Which TFM do you choose and why?",
      answer: "Target netstandard2.0. .NET Standard 2.0 is supported by both .NET Framework 4.8 and modern .NET (Core 2.0 through .NET 8/9). If modern APIs (like Span<T>) are needed, configure multi-targeting in .csproj: <TargetFrameworks>netstandard2.0;net8.0</TargetFrameworks> using conditional compilation (#if NET8_0_OR_GREATER)."
    },
    realProject: "Multi-targeted our core healthcare data models across netstandard2.0 (for legacy ASC WebQI modules) and net8.0 (for new cloud APIs).",
    code: `// csproj configuration:
// <Project Sdk="Microsoft.NET.Sdk">
//   <PropertyGroup>
//     <TargetFramework>net8.0</TargetFramework>
//   </PropertyGroup>
// </Project>`
  },

  {
    abbr: "RID",
    fullForm: "Runtime Identifier",
    category: "Runtime",
    oneLine: "A standardized string that identifies the target operating system and CPU architecture for publishing native .NET binaries.",
    why: "Why it exists: Needed when publishing self-contained or Native AOT applications so the SDK knows which native runtime libraries to bundle (e.g. win-x64, linux-arm64).",
    archRole: "Directs NuGet and the Roslyn linker to package native OS-specific binaries (.so, .dylib, .dll) into the application payload.",
    interviewQuestions: [
      "What is a RID and when is it required during the dotnet publish process?",
      "Give examples of common RIDs for cloud and container deployments.",
      "What is the difference between framework-dependent and self-contained deployments?"
    ],
    architectScenario: {
      question: "You are building a Docker image for AWS Graviton (ARM64) vs standard x86 servers. How do RIDs impact your CI/CD pipeline and binary sizes?",
      answer: "Targeting linux-arm64 bundles ARM64-specific CoreCLR binaries, maximizing price-to-performance on Graviton processors. For framework-dependent deployments, RID is omitted and the host .NET container runtime is shared; for self-contained or Native AOT, RID is mandatory (dotnet publish -r linux-arm64 --self-contained) and produces an architecture-specific standalone executable."
    },
    realProject: "Configured CI/CD Azure DevOps pipelines to emit linux-x64 and linux-arm64 container images for our microservices.",
    code: `// CLI Publish Command:
// dotnet publish -c Release -r linux-x64 --self-contained true /p:PublishAot=true`
  },

  {
    abbr: "SDK",
    fullForm: "Software Development Kit",
    category: "Runtime",
    oneLine: "The collection of developer tools, CLI, Roslyn compilers, MSBuild, and templates used to build and run .NET applications.",
    why: "Why it exists: Decouples development tooling (SDK) from production hosting environments (Runtime).",
    archRole: "The SDK contains the C# compiler (CSC), MSBuild engine, and dotnet CLI. Production Docker containers only require the lighter .NET Runtime or ASP.NET Core Runtime.",
    interviewQuestions: [
      "What is the difference between the .NET SDK and the .NET Runtime?",
      "Why do multi-stage Docker builds use the SDK image for building and Runtime image for deployment?",
      "What is global.json and how does it lock the SDK version?"
    ],
    architectScenario: {
      question: "Why should production Docker containers never use the .NET SDK base image?",
      answer: "Security and image size. The SDK image is ~800MB and contains compilers, debugging tools, and build utilities, vastly expanding the attack surface. The ASP.NET Runtime image is ~200MB (and Native AOT chiseled image is <30MB) containing only the binaries required to execute, reducing container startup time and vulnerabilities."
    },
    realProject: "Standardized multi-stage Dockerfiles across Magician Hub microservices, dropping production container sizes from 850MB to 110MB.",
    code: `// Multi-Stage Dockerfile pattern:
// FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
// WORKDIR /src
// RUN dotnet publish -c Release -o /app
// FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
// WORKDIR /app
// COPY --from=build /app .
// ENTRYPOINT ["dotnet", "App.dll"]`
  },

  // ==========================================
  // ASP.NET CORE & WEB ARCHITECTURE
  // ==========================================
  {
    abbr: "Kestrel",
    fullForm: "Kestrel Web Server",
    category: "ASP.NET Core & Web",
    oneLine: "The cross-platform, asynchronous, high-performance HTTP web server included with ASP.NET Core.",
    why: "Why it exists: Replaced heavy, Windows-only IIS and System.Web dependencies with an ultra-fast, cross-platform socket engine.",
    archRole: "Listens directly on network sockets, terminates HTTP/1.1, HTTP/2, HTTP/3 QUIC connections, parses requests into HttpContext, and forwards them to the middleware pipeline.",
    interviewQuestions: [
      "What is Kestrel and why is it used in ASP.NET Core?",
      "How does Kestrel differ from Microsoft IIS?",
      "Why is Kestrel typically placed behind a reverse proxy (Nginx, YARP, Cloudflare) in production?"
    ],
    architectScenario: {
      question: "Can Kestrel be exposed directly to the public internet without a reverse proxy?",
      answer: "Yes, modern Kestrel is fully hardened for edge exposure with configurable request limits (MaxRequestBodySize, MinDataRate for Slowloris mitigation) and TLS termination. However, architects often place reverse proxies (Nginx/YARP) or Cloudflare in front for edge caching, WAF inspection, global SSL offloading, and blue/green zero-downtime routing."
    },
    realProject: "Configured Kestrel limits and SSL bindings directly in Docker containers for ASC WebQI internal microservices, fronted by Azure Application Gateway.",
    code: `// Kestrel Configuration
using System;

class Program {
    static void Main() {
        Console.WriteLine("=== Kestrel 8.0 Architecture ===");
        Console.WriteLine("Protocol Support: HTTP/1.1, HTTP/2, HTTP/3 (QUIC)");
        Console.WriteLine("Socket Engine   : Managed SocketsHttpHandler + Pipelines");
        Console.WriteLine("Performance     : Top 10 TechEmpower plain-text benchmark.");
    }
}`
  },

  {
    abbr: "DI",
    fullForm: "Dependency Injection",
    category: "ASP.NET Core & Web",
    oneLine: "A software design pattern where an object receives its dependencies from an external assembler rather than creating them itself.",
    why: "Why it exists: To achieve loose coupling, adherence to Dependency Inversion (SOLID), and effortless unit testing through mock dependencies.",
    archRole: "Managed natively in ASP.NET Core via IServiceCollection and IServiceProvider with Transient, Scoped, and Singleton service lifecycles.",
    interviewQuestions: [
      "What is Dependency Injection and why is it built into ASP.NET Core?",
      "Explain the differences between Transient, Scoped, and Singleton lifecycles.",
      "What is a 'Captive Dependency' and how do you prevent it?",
      "What are Keyed Services in .NET 8?"
    ],
    architectScenario: {
      question: "What happens if a Singleton service injects an EF Core DbContext (Scoped) in its constructor? How does modern .NET prevent this?",
      answer: "This is a 'Captive Dependency' anti-pattern. The Scoped DbContext is held alive for the entire application lifetime. Its ChangeTracker will continuously accumulate entities, causing severe memory leaks, stale cached data, and threading concurrency exceptions when multiple requests invoke the Singleton. Modern ASP.NET Core detects this at startup if ValidateScopes is enabled in WebApplicationBuilder."
    },
    realProject: "Structured DI architecture across ASC WebQI, ensuring repositories and DbContexts remain Scoped, while cache stores and brokers remain Singleton.",
    code: `using System;
using Microsoft.Extensions.DependencyInjection;

public interface IAuditService { string Audit(); }
public class AuditService : IAuditService { public string Audit() => "Audit Passed"; }

class Program {
    static void Main() {
        var services = new ServiceCollection();
        services.AddScoped<IAuditService, AuditService>(); // Scoped per HTTP request
        var provider = services.BuildServiceProvider();

        using (var scope = provider.CreateScope()) {
            var service = scope.ServiceProvider.GetRequiredService<IAuditService>();
            Console.WriteLine(service.Audit());
        }
    }
}`
  },

  {
    abbr: "IoC",
    fullForm: "Inversion of Control",
    category: "ASP.NET Core & Web",
    oneLine: "An architectural principle in which the control of object creation and program flow is inverted from application code to a framework container.",
    why: "Why it exists: Prevents modules from being tightly coupled to concrete implementations, enabling modular architecture.",
    archRole: "The foundational principle behind Dependency Injection (DI), Factory pattern, and Event-driven callbacks.",
    interviewQuestions: [
      "What is the difference between Inversion of Control (IoC) and Dependency Injection (DI)?",
      "How does the Hollywood Principle ('Don't call us, we'll call you') relate to IoC?",
      "Is an IoC Container required to achieve Inversion of Control?"
    ],
    architectScenario: {
      question: "How do you explain the exact relationship between IoC, DI, and DIP (Dependency Inversion Principle) to junior engineers?",
      answer: "DIP is the architectural goal (High-level modules should not depend on low-level modules; both should depend on abstractions). IoC is the broad design principle (framework manages execution flow and object creation). DI is the specific design pattern used to achieve IoC (passing abstractions via constructors)."
    },
    realProject: "Applied IoC across Magician BOM/BOQ platform to decouple costing explosion calculators from ERP data providers.",
    code: `// DIP & IoC in action:
public interface IPriceCalculator { decimal Calculate(decimal basePrice); }
public class OrderService {
    private readonly IPriceCalculator _calc;
    public OrderService(IPriceCalculator calc) { _calc = calc; } // Injected!
}`
  },

  {
    abbr: "MVC",
    fullForm: "Model-View-Controller",
    category: "ASP.NET Core & Web",
    oneLine: "An architectural pattern that separates an application into Model (data/logic), View (UI presentation), and Controller (request routing).",
    why: "Why it exists: Decouples UI presentation from business logic and database models, enabling unit testing of controllers without UI dependencies.",
    archRole: "Implemented in ASP.NET Core via Microsoft.AspNetCore.Mvc with action filters, model binding, and Razor view rendering.",
    interviewQuestions: [
      "What are the roles of Model, View, and Controller in ASP.NET Core?",
      "How does MVC differ from Minimal APIs?",
      "What are Action Filters and what lifecycle order do they follow?"
    ],
    architectScenario: {
      question: "When should you choose Minimal APIs over traditional MVC Controllers in modern .NET?",
      answer: "Choose Minimal APIs for microservices, cloud serverless functions, and high-throughput REST APIs where low cold-start latency and minimal memory overhead are vital. Choose MVC Controllers when building rich web applications needing Razor views, complex action filter pipelines, or large monolithic backends with dozens of actions per domain entity."
    },
    realProject: "Maintained ASC WebQI enterprise web portals on ASP.NET Core MVC, while writing new high-speed microservices in Minimal APIs.",
    code: `// MVC Controller pattern:
// public class CasesController : Controller {
//     [HttpGet]
//     public IActionResult Index() => View(_repo.GetAll());
// }`
  },

  {
    abbr: "REST",
    fullForm: "Representational State Transfer",
    category: "ASP.NET Core & Web",
    oneLine: "An architectural style for distributed systems based on stateless communication, standard HTTP verbs, and resource URIs.",
    why: "Why it exists: Created by Roy Fielding to leverage existing web standards (HTTP, caching, status codes) for scalable distributed interoperability.",
    archRole: "Standard API design pattern using GET, POST, PUT, PATCH, DELETE verbs with JSON/XML payloads and HTTP status codes (200, 201, 400, 404, 500).",
    interviewQuestions: [
      "Is REST a protocol or an architectural style?",
      "What are the 6 architectural constraints of REST?",
      "What is the difference between PUT and PATCH?",
      "What does Idempotence mean in REST API design?"
    ],
    architectScenario: {
      question: "Which HTTP methods are idempotent and why does idempotence matter when designing payment or healthcare order APIs?",
      answer: "GET, PUT, DELETE, HEAD, and OPTIONS are idempotent (calling them multiple times produces the exact same server state). POST is NOT idempotent. Idempotence is critical in payment/order systems: if a network drops before a response is received, the client can safely retry a PUT without causing duplicate charges, whereas retrying a POST could create duplicate orders unless guarded by an Idempotency-Key header."
    },
    realProject: "Designed RESTful API standards across ASC WebQI with Idempotency-Key headers for surgical incident signoffs and billing mutations.",
    code: `// RESTful Minimal API Endpoint:
// app.MapPut("/api/cases/{id}", async (int id, CaseDto dto, CaseDb db) => {
//     // Idempotent update
// });`
  },

  {
    abbr: "WASM",
    fullForm: "WebAssembly",
    category: "ASP.NET Core & Web",
    oneLine: "A low-level binary code format that executes inside modern web browsers at near-native speed.",
    why: "Why it exists: Allows languages like C#, C++, and Rust to execute directly on the client browser without JavaScript.",
    archRole: "Powers Blazor WebAssembly, compiling .NET code and a compact .NET runtime directly into WASM bytecode executed by the browser's V8 engine.",
    interviewQuestions: [
      "What is WebAssembly (WASM) and how does Blazor WebAssembly work?",
      "What are the trade-offs between Blazor WebAssembly and Blazor Server?",
      "What is Blazor United / Auto Interactive mode in .NET 8?"
    ],
    architectScenario: {
      question: "How do you architecturally mitigate the initial download size penalty in Blazor WebAssembly?",
      answer: "Enable Brotli/Gzip compression, configure IL Linker trimming to strip unused BCL methods, utilize lazy loading of feature assemblies, and adopt .NET 8 Blazor Auto Interactive mode (which renders server-side immediately for 0ms cold-start while streaming the WASM bundle in the background)."
    },
    realProject: "Built interactive CAD/BOM visualization modules in Magician Hub using Blazor WebAssembly for instant client-side calculations.",
    code: `// Blazor WebAssembly executes C# directly in client browser memory!`
  },

  {
    abbr: "MAUI",
    fullForm: ".NET Multi-platform App UI",
    category: "ASP.NET Core & Web",
    oneLine: "A cross-platform framework for building native mobile (iOS, Android) and desktop (Windows, macOS) applications with C# and XAML.",
    why: "Why it exists: Replaced Xamarin.Forms with a single unified project structure, modern performance, and multi-window desktop support.",
    archRole: "Maps cross-platform XAML abstractions to native platform UI controls (UIKit on iOS, Android Views, WinUI 3 on Windows).",
    interviewQuestions: [
      "What is .NET MAUI and how does it differ from Xamarin.Forms?",
      "How does .NET MAUI achieve native performance on iOS and Android?",
      "What is MAUI Blazor Hybrid?"
    ],
    architectScenario: {
      question: "When would you choose .NET MAUI Hybrid (with Blazor) over pure native XAML controls for an enterprise mobile app?",
      answer: "Choose MAUI Blazor Hybrid when your organization has existing React/Blazor web UI components that need 100% code reuse on mobile, or when you need identical UI and CSS styling across Web, Android, and iOS while still accessing native device hardware (camera, GPS, offline SQLite) via C#."
    },
    realProject: "Architected Magician Language Suite cross-platform mobile app using .NET MAUI with Clean Architecture, SQLite offline storage, and MVVM.",
    code: `// MAUI Single Project Structure:
// Platforms/Android, Platforms/iOS, Platforms/Windows with unified C# XAML.`
  },

  // ==========================================
  // SECURITY & AUTHENTICATION
  // ==========================================
  {
    abbr: "JWT",
    fullForm: "JSON Web Token",
    category: "Security & Auth",
    oneLine: "A compact, URL-safe standard (RFC 7519) for transmitting cryptographically signed claims between two parties.",
    why: "Why it exists: Enables stateless authentication in distributed microservices without querying a shared session database on every HTTP request.",
    archRole: "Composed of Header.Payload.Signature. Validated in ASP.NET Core via JwtBearerHandler using public/private key cryptography (RS256 or HS256).",
    interviewQuestions: [
      "What are the three parts of a JWT and what does each contain?",
      "Is the payload of a JWT encrypted by default?",
      "How do you implement secure token revocation with stateless JWTs?",
      "What is the difference between an Access Token and a Refresh Token?"
    ],
    architectScenario: {
      question: "JWTs are stateless. If a user is fired or their permissions are revoked immediately, how do you prevent them from using an active 1-hour JWT?",
      answer: "Three architectural strategies: 1) Short access token lifetimes (5-15 minutes) paired with refresh token verification against Redis. 2) Token Revocation Blacklist: Publish revoked JTI (JWT ID) tokens into a fast distributed Redis cache with TTL matching token expiration; middleware checks Redis on sensitive endpoints. 3) Back-Channel Logout via OpenID Connect."
    },
    realProject: "Implemented stateless RS256 JWT auth across ASC WebQI APIs with Redis refresh token rotation and immediate role eviction.",
    code: `// Validating JWT in ASP.NET Core:
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//   .AddJwtBearer(options => {
//       options.TokenValidationParameters = new TokenValidationParameters {
//           ValidateIssuer = true,
//           ValidateAudience = true,
//           ValidateLifetime = true,
//           IssuerSigningKey = mySecurityKey
//       };
//   });`
  },

  {
    abbr: "CORS",
    fullForm: "Cross-Origin Resource Sharing",
    category: "Security & Auth",
    oneLine: "A browser security mechanism that allows or restricts web pages from requesting resources from a different domain/port.",
    why: "Why it exists: Prevents malicious websites from making unauthorized AJAX requests to banking/healthcare APIs using the victim's stored credentials.",
    archRole: "Enforced by browsers using preflight HTTP OPTIONS requests. Configured in ASP.NET Core via UseCors with allowed origins, headers, and methods.",
    interviewQuestions: [
      "What is CORS and why is it enforced by browsers?",
      "What is a CORS preflight request (OPTIONS) and when is it triggered?",
      "Why is AllowAnyOrigin() with AllowCredentials() an invalid and dangerous configuration?"
    ],
    architectScenario: {
      question: "Your React SPA on https://app.healthcare.com fails to call https://api.healthcare.com with a CORS error. The junior developer suggests AllowAnyOrigin(). How do you guide them?",
      answer: "AllowAnyOrigin() (*) disables credentialed requests (cookies, auth headers) in modern browsers according to the CORS specification, and exposes the API to CSRF attacks from malicious sites. The correct fix is to explicitly configure allowed origins: .WithOrigins('https://app.healthcare.com').AllowCredentials().WithMethods('GET','POST','PUT').WithHeaders('Authorization','Content-Type')."
    },
    realProject: "Configured strict CORS policies in ASC WebQI to allow only verified healthcare portal subdomains with credentials.",
    code: `// ASP.NET Core Strict CORS Configuration:
// builder.Services.AddCors(opt => {
//     opt.AddPolicy("HealthcareApp", p => p
//         .WithOrigins("https://portal.ascwebqi.com")
//         .AllowAnyHeader()
//         .AllowAnyMethod()
//         .AllowCredentials());
// });`
  },

  {
    abbr: "CSRF",
    fullForm: "Cross-Site Request Forgery",
    category: "Security & Auth",
    oneLine: "An attack that tricks an authenticated victim's browser into executing unwanted actions on a trusted web application.",
    why: "Why it exists: Browsers automatically attach cookies (including session cookies) to cross-origin requests unless protected.",
    archRole: "Mitigated via Anti-Forgery Tokens (Synchronizer Token Pattern), SameSite=Strict cookie attributes, and custom HTTP headers.",
    interviewQuestions: [
      "What is a CSRF attack and how does it work?",
      "Does an API using JWT in the Authorization header require CSRF protection?",
      "How do SameSite cookies (Strict vs Lax) prevent CSRF?"
    ],
    architectScenario: {
      question: "If an application stores JWTs in httpOnly cookies, is it vulnerable to CSRF? How do you architect a secure defense?",
      answer: "Yes! Because the browser automatically attaches cookies to cross-origin requests, storing a JWT in a cookie re-introduces CSRF vulnerability. Defense: 1) Set cookie SameSite=Strict or Lax. 2) Implement the Double Submit Cookie pattern or Angular/React X-XSRF-TOKEN header verification. 3) Validate Origin/Referer headers on all state-changing requests."
    },
    realProject: "Enforced SameSite=Strict cookies and AntiForgeryToken middleware across ASC WebQI MVC form submissions.",
    code: `// Anti-Forgery Token Validation in ASP.NET Core:
// [ValidateAntiForgeryToken]
// public IActionResult SubmitIncident(IncidentModel model) => Ok();`
  },

  {
    abbr: "XSS",
    fullForm: "Cross-Site Scripting",
    category: "Security & Auth",
    oneLine: "A security vulnerability where an attacker injects malicious client-side JavaScript into web pages viewed by other users.",
    why: "Why it exists: Occurs when user input is rendered into HTML without proper encoding or sanitization.",
    archRole: "Mitigated via context-aware HTML/JS encoding, Content Security Policy (CSP) headers, and storing sensitive tokens in httpOnly cookies.",
    interviewQuestions: [
      "What are the differences between Stored, Reflected, and DOM-based XSS?",
      "How does ASP.NET Core protect against XSS by default?",
      "Why should JWTs never be stored in browser localStorage if XSS is a concern?"
    ],
    architectScenario: {
      question: "Why is storing JWT access tokens in browser localStorage considered an architectural anti-pattern for sensitive healthcare/banking apps?",
      answer: "JavaScript running in the browser has full read access to localStorage. If the application has a single XSS vulnerability (or a compromised third-party npm package), an attacker can execute localStorage.getItem('token') and exfiltrate the JWT. Storing tokens in httpOnly, Secure, SameSite cookies prevents JavaScript from ever reading the token."
    },
    realProject: "Implemented CSP (Content Security Policy) headers and HTML sanitization on surgical notes and patient incident fields in ASC WebQI.",
    code: `// Content Security Policy (CSP) Header Middleware:
// context.Response.Headers.Append("Content-Security-Policy", "default-src 'self'; script-src 'self';");`
  },

  {
    abbr: "RBAC",
    fullForm: "Role-Based Access Control",
    category: "Security & Auth",
    oneLine: "An authorization approach that assigns permissions to specific roles, and users to those roles.",
    why: "Why it exists: Simplifies permission management in enterprise organizations with hundreds of users by decoupling users from direct permissions.",
    archRole: "Implemented in ASP.NET Core via [Authorize(Roles = 'Surgeon,Administrator')] or Claims-Based and Policy-Based Authorization.",
    interviewQuestions: [
      "What is RBAC and how does it compare to ABAC (Attribute-Based Access Control)?",
      "Why is Policy-Based Authorization preferred over raw Roles in ASP.NET Core?",
      "How do you implement dynamic permission checks without recompiling roles?"
    ],
    architectScenario: {
      question: "In an enterprise multi-tenant system, why is hardcoding [Authorize(Roles = 'Admin')] an architectural anti-pattern?",
      answer: "Hardcoding roles creates rigid coupling. In tenant A, an 'Admin' may edit cases; in tenant B, only 'ChiefMedicalOfficer' can. Instead, use Policy-Based Authorization: [Authorize(Policy = 'CanSignOffSurgery')]. Behind the policy, an AuthorizationHandler dynamically evaluates the user's tenant permissions and claims from the database."
    },
    realProject: "Designed policy-based healthcare role access in ASC WebQI, separating Surgeons, Nurses, Auditors, and System Admins across surgical centers.",
    code: `// Policy-Based Authorization in ASP.NET Core:
// builder.Services.AddAuthorization(options => {
//     options.AddPolicy("CanSignOffSurgery", policy =>
//         policy.RequireClaim("Permission", "SignOff_Cases"));
// });`
  },

  {
    abbr: "OAuth",
    fullForm: "Open Authorization (OAuth 2.0)",
    category: "Security & Auth",
    oneLine: "An open standard authorization framework that allows third-party applications to obtain limited access to user resources without exposing credentials.",
    why: "Why it exists: Replaced the dangerous anti-pattern of users giving third-party apps their raw usernames and passwords.",
    archRole: "Defines authorization flows (Authorization Code with PKCE, Client Credentials) issuing Access Tokens for API authorization.",
    interviewQuestions: [
      "What is OAuth 2.0 and what problem does it solve?",
      "Explain the roles: Resource Owner, Client, Authorization Server, Resource Server.",
      "What is the difference between OAuth 2.0 and OpenID Connect (OIDC)?",
      "Why is Authorization Code Flow with PKCE mandatory for SPA and mobile apps?"
    ],
    architectScenario: {
      question: "Why should Client Credentials grant be used for machine-to-machine microservices, and PKCE for single-page applications?",
      answer: "Client Credentials is designed for trusted backend server-to-server calls where the client secret is securely stored in cloud secrets (Azure Key Vault). SPAs (React/Angular) and mobile apps are 'Public Clients' that cannot keep a secret safe. PKCE (Proof Key for Code Exchange) uses dynamic cryptographic code verifiers and challenges to prevent authorization code interception without needing a static secret."
    },
    realProject: "Integrated OAuth 2.0 Client Credentials flow for Srimantha-Algox broker order routing and external hospital EHR sync.",
    code: `// Client Credentials Flow Token Request:
// POST /oauth/v2/token
// grant_type=client_credentials&client_id=algox_engine&client_secret=***`
  },

  {
    abbr: "OIDC",
    fullForm: "OpenID Connect",
    category: "Security & Auth",
    oneLine: "An identity layer built on top of the OAuth 2.0 framework that provides user authentication and SSO.",
    why: "Why it exists: OAuth 2.0 is purely for authorization (delegated access); OIDC adds standardized identity verification and ID Tokens.",
    archRole: "Issues an ID Token (JWT containing user profile claims) alongside an Access Token. Powers modern enterprise Single Sign-On (SSO).",
    interviewQuestions: [
      "What is the core difference between OAuth 2.0 and OpenID Connect (OIDC)?",
      "What is an ID Token vs an Access Token?",
      "How does Single Sign-On (SSO) work with OIDC?"
    ],
    architectScenario: {
      question: "An interviewer asks: 'Can you use OAuth 2.0 for user authentication?' How do you answer as a Technical Lead?",
      answer: "Technically people have abused OAuth for auth (pseudofederation), but it is an anti-pattern. OAuth issues an access token for authorization (what APIs can be called), but tells the client nothing standardized about who the user is, when they logged in, or how they authenticated. OIDC was specifically designed for authentication by adding standardized ID Tokens (id_token) and a /userinfo endpoint."
    },
    realProject: "Configured OIDC SSO with Microsoft Entra ID (Azure AD) for hospital healthcare workers accessing ASC WebQI.",
    code: `// ASP.NET Core OpenID Connect setup:
// services.AddAuthentication(options => {
//     options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
// }).AddOpenIdConnect(options => {
//     options.Authority = "https://login.microsoftonline.com/{tenant}";
//     options.ClientId = "asc-webqi-client";
// });`
  },

  // ==========================================
  // DATA & EF CORE
  // ==========================================
  {
    abbr: "EF Core",
    fullForm: "Entity Framework Core",
    category: "Data & EF Core",
    oneLine: "A modern, lightweight, extensible, and open-source Object-Relational Mapper (ORM) for .NET.",
    why: "Why it exists: Rewrote legacy EF6 from scratch to achieve cross-platform capability, high performance, and eliminate Cartesian explosion issues.",
    archRole: "Translates LINQ expressions into parameterized SQL, handles change tracking, manages database migrations, and maps relational rows to C# entities.",
    interviewQuestions: [
      "What is EF Core and how does it differ from legacy EF6?",
      "How does the Change Tracker work in EF Core?",
      "What is the performance impact of AsNoTracking()?",
      "What is Cartesian Explosion and how does AsSplitQuery() resolve it?"
    ],
    architectScenario: {
      question: "Your clinical query uses .Include(c => c.PatientAudits).Include(c => c.Notes). It generates 100,000 joined SQL rows and causes high database CPU. How do you optimize it?",
      answer: "This is a classic Cartesian product. If a case has 10 audits and 10 notes, SQL Server returns 100 rows per case with duplicated parent columns. Fix: 1) Add .AsSplitQuery() so EF Core executes 3 targeted SELECTs. 2) Add .AsNoTracking() to bypass ChangeTracker memory snapshots. 3) Select only required columns via projection: .Select(c => new CaseSummaryDto { ... })."
    },
    realProject: "Applied AsNoTracking(), AsSplitQuery(), and DbContext pooling across ASC WebQI, slashing SQL Server query execution times by 65%.",
    code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("=== EF Core High-Performance Query Pattern ===");
        Console.WriteLine("var cases = await dbContext.Cases");
        Console.WriteLine("    .AsNoTracking()");
        Console.WriteLine("    .Include(c => c.Audits)");
        Console.WriteLine("    .AsSplitQuery()");
        Console.WriteLine("    .ToListAsync();");
    }
}`
  },

  {
    abbr: "ORM",
    fullForm: "Object-Relational Mapper",
    category: "Data & EF Core",
    oneLine: "A software technique that bridges the impedance mismatch between object-oriented code and relational database tables.",
    why: "Why it exists: Eliminates thousands of lines of boilerplate ADO.NET SQL string parsing, command execution, and manual property mapping.",
    archRole: "Abstracts database interactions into strongly typed C# domain entities, generating parameterized SQL queries and handling change persistence.",
    interviewQuestions: [
      "What is an ORM and what problems does it solve?",
      "What is the Object-Relational Impedance Mismatch?",
      "When would you choose a micro-ORM like Dapper over a full ORM like EF Core?"
    ],
    architectScenario: {
      question: "As an architect, when do you recommend Dapper vs Entity Framework Core in an enterprise platform?",
      answer: "Adopt EF Core for transactional, Domain-Driven Design (DDD) write operations requiring change tracking, business validation, and database migrations. Adopt Dapper for high-throughput, read-heavy reporting queries, complex financial analytics, or batch processing where maximum execution speed, raw SQL control, and near-zero memory allocation are paramount."
    },
    realProject: "Employed a hybrid CQRS data architecture: EF Core for transactional state writes and Dapper for high-throughput financial backtesting reports in Srimantha-Algox.",
    code: `// Hybrid Architecture:
// Write side: EF Core DbContext.Cases.Add(newCase);
// Read side : Dapper connection.QueryAsync<CaseDto>("SELECT * FROM Cases WHERE Active=1");`
  },

  {
    abbr: "LINQ",
    fullForm: "Language Integrated Query",
    category: "Data & EF Core",
    oneLine: "A uniform query syntax built into C# for querying collections, databases, and XML documents.",
    why: "Why it exists: Replaced disparate query languages with compile-time type-safe querying, IntelliSense, and compile-time syntax validation.",
    archRole: "Operates over IEnumerable<T> (in-memory traversal) or IQueryable<T> (translating Expression Trees into SQL).",
    interviewQuestions: [
      "What is LINQ and what are its core flavors (LINQ to Objects, LINQ to Entities)?",
      "What is the difference between IEnumerable<T> and IQueryable<T>?",
      "What is Deferred Execution vs Immediate Execution in LINQ?"
    ],
    architectScenario: {
      question: "What happens if a developer writes: dbContext.Cases.ToList().Where(c => c.HospitalId == 42)?",
      answer: "Calling .ToList() triggers immediate execution, downloading the entire table across the network into application RAM. The WHERE clause executes client-side in C#. In a table with 5,000,000 rows, this causes massive database I/O, network saturation, and Out-Of-Memory exceptions. Leaving it as IQueryable (dbContext.Cases.Where(...).ToList()) pushes the WHERE clause to SQL Server."
    },
    realProject: "Audited and refactored queries across our healthcare portal to eliminate premature .ToList() materializations, improving server stability.",
    code: `// Deferred vs Immediate Execution in LINQ
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        var nums = new List<int> { 1, 2, 3 };
        var query = nums.Where(n => n > 1); // Deferred: Nothing executed yet!
        nums.Add(4); // Added before execution
        
        foreach (var n in query) Console.WriteLine(n); // Prints 2, 3, 4!
    }
}`
  },

  {
    abbr: "DTO",
    fullForm: "Data Transfer Object",
    category: "Data & EF Core",
    oneLine: "An object that carries data between processes or application layers without containing business logic.",
    why: "Why it exists: Prevents over-posting attacks, hides internal database schema details, and decouples API contracts from domain models.",
    archRole: "Acts as the public contract of an API, mapped to and from internal domain entities using AutoMapper, Mapster, or manual projections.",
    interviewQuestions: [
      "What is a DTO and why shouldn't domain entities be exposed directly from API controllers?",
      "What is an Over-Posting / Mass Assignment attack and how do DTOs prevent it?",
      "How do Record types in modern C# improve DTO implementation?"
    ],
    architectScenario: {
      question: "A junior developer exposes the EF Core User entity directly from a PUT endpoint: UpdateUser(User user). What security vulnerability is created?",
      answer: "Mass Assignment / Over-Posting vulnerability. An attacker can inspect the JSON payload and send {'Id': 10, 'IsAdmin': true, 'PasswordHash': 'new'}. EF Core's model binder will bind these fields to the entity, allowing the attacker to elevate their privileges. Using a dedicated UpdateUserDto containing only editable fields (e.g., FirstName, Phone) completely eliminates this risk."
    },
    realProject: "Enforced strict request/response DTO contracts across all ASC WebQI REST endpoints to prevent accidental exposure of patient PII.",
    code: `// Immutable DTO using C# Record
public record PatientCaseDto(int Id, string CaseCode, string Room);`
  },

  {
    abbr: "ACID",
    fullForm: "Atomicity, Consistency, Isolation, Durability",
    category: "Data & EF Core",
    oneLine: "A set of four properties that guarantee database transactions are processed reliably.",
    why: "Why it exists: Prevents data corruption during system crashes, power failures, or concurrent multi-threaded modifications.",
    archRole: "Enforced by relational database engines (SQL Server, PostgreSQL) during transaction execution (BEGIN TRAN ... COMMIT).",
    interviewQuestions: [
      "Explain the four ACID properties in relational database management.",
      "What are SQL Server Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)?",
      "What is a Dirty Read, Non-Repeatable Read, and Phantom Read?"
    ],
    architectScenario: {
      question: "How do you maintain data consistency in a distributed microservices architecture where ACID transactions across databases are impossible?",
      answer: "Use the SAGA Pattern (Choreography or Orchestration) with Compensating Transactions and Outbox Pattern. Because two-phase commit (2PC) does not scale in cloud microservices, each service commits its local ACID transaction and emits an event. If a downstream service fails, compensating transactions are triggered to rollback previous steps."
    },
    realProject: "Designed ACID transaction boundaries for multi-stage surgical billing signoffs in ASC WebQI to guarantee zero partial records.",
    code: `// Database Transaction in EF Core:
// using var tx = await dbContext.Database.BeginTransactionAsync();
// await dbContext.SaveChangesAsync();
// await tx.CommitAsync();`
  },

  // ==========================================
  // ARCHITECTURE & SYSTEM DESIGN
  // ==========================================
  {
    abbr: "SOLID",
    fullForm: "Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
    category: "Architecture & Design",
    oneLine: "Five fundamental design principles for building maintainable, understandable, and flexible software architectures.",
    why: "Why it exists: Prevents software rot, fragile dependencies, and rigid codebases that break whenever requirements change.",
    archRole: "Guiding principles for class design, interface modeling, and dependency injection.",
    interviewQuestions: [
      "Explain each of the five SOLID principles with a real-world enterprise example.",
      "What is the difference between Interface Segregation and Single Responsibility?",
      "How does Dependency Inversion (DIP) differ from Dependency Injection (DI)?"
    ],
    architectScenario: {
      question: "Can you give a practical violation of the Liskov Substitution Principle (LSP) you fixed in an enterprise project?",
      answer: "Classic example: A base class HealthcareProvider with a method PrescribeMedication(). A subclass PhysicalTherapist inherits from it but throws new NotSupportedException('Cannot prescribe'). Any calling service expecting a HealthcareProvider crashes when passed a PhysicalTherapist. We fixed it using Interface Segregation: split into IPrescriber and ITherapist."
    },
    realProject: "Applied SOLID principles when refactoring ASC WebQI audit processors, splitting monolithic 3,000-line manager classes into single-responsibility handlers.",
    code: `// Single Responsibility Principle (SRP) Example:
public class SurgeryAuditValidator { public bool Validate(Surgery s) => true; }
public class SurgeryAuditNotifier  { public void Notify(Surgery s) { /* Email */ } }
public class SurgeryAuditRepository{ public void Save(Surgery s) { /* DB */ } }`
  },

  {
    abbr: "CQRS",
    fullForm: "Command Query Responsibility Segregation",
    category: "Architecture & Design",
    oneLine: "An architectural pattern that separates read operations (Queries) from write operations (Commands).",
    why: "Why it exists: Read workloads and write workloads have completely different performance, data modeling, and scaling requirements.",
    archRole: "Implemented using MediatR in .NET, dividing operations into IRequest<TResponse> for Queries and Commands, often with separate read/write models.",
    interviewQuestions: [
      "What is CQRS and what problem does it solve?",
      "When is CQRS justified and when is it an architectural over-engineering antipattern?",
      "How does CQRS relate to Event Sourcing?"
    ],
    architectScenario: {
      question: "An engineer wants to introduce CQRS and Event Sourcing into a simple CRUD administration portal. How do you evaluate this decision as a Lead Architect?",
      answer: "Reject or push back against full CQRS/Event Sourcing for simple CRUD. CQRS introduces substantial operational complexity: eventual consistency, separate models, synchronization events, and multiple databases. Full CQRS is justified for high-scale, domain-rich domains (e.g., algorithmic trading or clinical case logs) where read volume is 100x write volume or where complex historical audit trails are mandatory."
    },
    realProject: "Architected CQRS with MediatR in Srimantha-Algox: Write side validated trading orders via EF Core; Read side queried pre-computed materialized views via Dapper.",
    code: `// CQRS with MediatR:
public record CreateCaseCommand(string Code) : MediatR.IRequest<int>;
public record GetCaseByIdQuery(int Id) : MediatR.IRequest<CaseDto>;`
  },

  {
    abbr: "DDD",
    fullForm: "Domain-Driven Design",
    category: "Architecture & Design",
    oneLine: "An approach to software development that centers the architecture around a rich domain model and ubiquitous language.",
    why: "Why it exists: Aligns complex software engineering with real-world business domains, preventing 'Anemic Domain Models'.",
    archRole: "Structures code into Entities, Value Objects, Aggregates, Bounded Contexts, and Domain Events.",
    interviewQuestions: [
      "What are the core strategic and tactical patterns of Domain-Driven Design (DDD)?",
      "What is the difference between an Entity and a Value Object?",
      "What is an Aggregate Root and what invariant rules does it enforce?",
      "What is a Bounded Context?"
    ],
    architectScenario: {
      question: "What is an Anemic Domain Model and why is it considered an antipattern in DDD?",
      answer: "An Anemic Domain Model consists of entities with only public getters and setters (data bags) with all business logic living in massive Service classes. This violates encapsulation because any caller can mutate properties into invalid states. In a rich DDD model, entities protect their invariants via private setters and meaningful domain methods (e.g., case.SignOffSurgery(surgeonId))."
    },
    realProject: "Modeled surgical cases, clinical audits, and regulatory incident invariants as DDD Aggregate Roots in ASC WebQI.",
    code: `// Rich DDD Entity:
public class SurgeryCase {
    public int Id { get; private set; }
    public bool IsClosed { get; private set; }
    
    // Encapsulated behavior protecting domain invariants:
    public void CloseCase() {
        if (IsClosed) throw new InvalidOperationException("Case already closed.");
        IsClosed = true;
    }
}`
  },

  {
    abbr: "ADR",
    fullForm: "Architecture Decision Record",
    category: "Architecture & Design",
    oneLine: "A lightweight document that captures an important architectural decision, its context, consequences, and trade-offs.",
    why: "Why it exists: Prevents teams from asking 'Why was this built this way?' two years later, preserving technical context.",
    archRole: "Stored in Git repositories alongside code (docs/adr/0001-use-native-aot.md) to document choices like adopting Kafka vs RabbitMQ or PostgreSQL vs SQL Server.",
    interviewQuestions: [
      "What is an Architecture Decision Record (ADR) and why should a development team maintain them?",
      "What are the core sections of an ADR (Context, Decision, Consequences)?",
      "How do ADRs improve technical governance and onboarding?"
    ],
    architectScenario: {
      question: "How do you handle disagreement in your engineering team when deciding between two competing architectures (e.g., gRPC vs REST)?",
      answer: "Conduct a time-boxed Spike / Proof-of-Concept evaluated against clear criteria (latency, throughput, developer velocity, tooling). Author an Architecture Decision Record (ADR) detailing the Context, Options Evaluated, Decision Made, and Accepted Consequences. This depersonalizes the decision and creates transparency."
    },
    realProject: "Maintained ADRs in Git across Magician Hub and Srimantha-Algox to document choices regarding database sharding and containerization.",
    code: `// ADR Format:
// # ADR 004: Adopt Redis for Distributed Caching
// ## Status: Accepted
// ## Context: Single-server memory cache limits scalability across pods.
// ## Decision: Use Redis Cluster with HybridCache.
// ## Consequences: Network overhead, requires connection resilience.`
  },

  {
    abbr: "BFF",
    fullForm: "Backend for Frontend",
    category: "Architecture & Design",
    oneLine: "An architectural pattern where dedicated backend services are tailored to the specific needs of different client UIs (Mobile, Web, Desktop).",
    why: "Why it exists: Prevents a single bloated generic API from trying to serve both high-bandwidth Desktop browsers and low-bandwidth mobile apps.",
    archRole: "Acts as an orchestration layer that aggregates data from downstream microservices, formatting payloads specifically for React Web vs MAUI Mobile.",
    interviewQuestions: [
      "What is the Backend for Frontend (BFF) pattern and when is it used?",
      "How does a BFF differ from a generic API Gateway?",
      "What are the trade-offs of maintaining multiple BFF services?"
    ],
    architectScenario: {
      question: "Your web application needs detailed patient history with 50 fields, while your mobile app needs 5 fields and push notification tokens. How do you design this?",
      answer: "Implement the BFF pattern. Create a Web BFF tailored to high-density desktop displays, and a Mobile BFF that strips unneeded fields and combines calls to reduce mobile battery and radio usage. Both BFFs query the same core downstream domain microservices."
    },
    realProject: "Used BFF architecture to serve our React web analytics dashboard and .NET MAUI mobile audit companion app from tailored endpoints.",
    code: `// Mobile BFF endpoint returning compact payload:
// app.MapGet("/api/mobile/cases", async () => Results.Ok(new MobileCaseSummary(id, code)));`
  },

  // ==========================================
  // CLOUD & DEVOPS
  // ==========================================
  {
    abbr: "CI/CD",
    fullForm: "Continuous Integration & Continuous Delivery / Deployment",
    category: "Cloud & DevOps",
    oneLine: "An automated software delivery practice that builds, tests, packages, and deploys code changes frequently and reliably.",
    why: "Why it exists: Eliminates manual deployment errors, catches bugs early via automated unit tests, and speeds time-to-market.",
    archRole: "Configured using Azure DevOps Pipelines, GitHub Actions, or GitLab CI via YAML configurations.",
    interviewQuestions: [
      "What is the difference between Continuous Delivery and Continuous Deployment?",
      "How do you implement zero-downtime deployments in Azure / Kubernetes?",
      "What are Blue/Green deployments and Canary releases?"
    ],
    architectScenario: {
      question: "How do you architect a zero-downtime deployment pipeline for a mission-critical 24/7 healthcare database application?",
      answer: "Use Blue/Green deployment with backward-compatible database schema migrations. Step 1: Apply additive database changes (new columns as nullable). Step 2: Deploy new code to the Green slot and verify health checks. Step 3: Swap production traffic to Green via Azure App Service deployment slots or Kubernetes ingress. Step 4: Run background migration scripts for old data. Step 5: Clean up legacy columns in a subsequent release."
    },
    realProject: "Managed Azure DevOps CI/CD release pipelines for AptInfoSoft/ASC WebQI across multiple hospital staging and production environments.",
    code: `// Azure DevOps Pipeline snippet:
// steps:
// - task: DotNetCoreCLI@2
//   inputs:
//     command: 'test'
// - task: DotNetCoreCLI@2
//   inputs:
//     command: 'publish'
//     arguments: '-c Release -o $(Build.ArtifactStagingDirectory)'`
  },

  {
    abbr: "PaaS",
    fullForm: "Platform as a Service",
    category: "Cloud & DevOps",
    oneLine: "A cloud computing model where a cloud provider delivers hardware, operating systems, and runtimes, allowing developers to focus on application code.",
    why: "Why it exists: Eliminates OS patching, VM maintenance, hardware provisioning, and manual server administration.",
    archRole: "Services like Azure App Service, Azure SQL Database, and AWS Elastic Beanstalk.",
    interviewQuestions: [
      "What is the difference between IaaS, PaaS, and SaaS?",
      "What are the benefits and limitations of Azure App Service (PaaS) vs Azure Kubernetes Service (AKS)?",
      "When is PaaS more cost-effective than managing your own VMs?"
    ],
    architectScenario: {
      question: "As an architect, when do you recommend PaaS over Kubernetes (AKS) for an enterprise software team?",
      answer: "Choose PaaS (Azure App Service) for small-to-medium teams that lack dedicated DevOps infrastructure engineers, needing turnkey autoscaling, built-in deployment slots, automatic TLS certificates, and zero OS maintenance. Choose AKS when you require multi-container orchestration, microservice mesh architecture, vendor portability across clouds, and fine-grained hardware control."
    },
    realProject: "Deployed ASC WebQI portals to Azure App Service (PaaS) with autoscaling rules based on CPU and memory thresholds.",
    code: `// PaaS Model: Developer deploys code -> Cloud provider manages OS, runtime, and hardware scaling.`
  },

  {
    abbr: "SLA",
    fullForm: "Service Level Agreement (with SLO & SLI)",
    category: "Cloud & DevOps",
    oneLine: "A formal commitment between a service provider and customer defining expected service quality, availability, and financial penalties for downtime.",
    why: "Why it exists: Establishes legal and business uptime guarantees (e.g. 99.9% uptime = max 43 minutes downtime/month).",
    archRole: "Drives architectural decisions regarding multi-region redundancy, database replication, and failover clustering.",
    interviewQuestions: [
      "What is the difference between SLA, SLO, and SLI in Site Reliability Engineering?",
      "What does 'Four Nines' (99.99%) availability mean in terms of allowed downtime?",
      "How do you calculate composite SLA across multi-tier cloud architectures?"
    ],
    architectScenario: {
      question: "Your app runs on Azure App Service (99.95% SLA) and queries Azure SQL (99.99% SLA). What is the Composite SLA of your system and how do you improve it?",
      answer: "Composite SLA is calculated by multiplying availability percentages: 99.95% * 99.99% = 99.94% (approx 26 minutes of allowed downtime per month). To increase the SLA to 99.99%, you must eliminate single points of failure by architecting multi-region active-active deployment fronted by Azure Front Door or Traffic Manager with automatic failover."
    },
    realProject: "Engineered high-availability cloud configurations in Azure for ASC WebQI to meet hospital enterprise SLAs of 99.9% uptime.",
    code: `// Composite SLA:
// App Service (99.95%) * Azure SQL (99.99%) * Redis (99.9%) = 99.84% availability.`
  }
];
