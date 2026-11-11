/**
 * DSA 90-Day Curriculum & Practice Lab Data
 * Day 1: Understanding Big O Notation
 * Application Context: Magician Technical Training
 * Deepthi T Portfolio
 */

const DSA_DAY1_META = {
    day: 1,
    title: "Understanding Big O Notation",
    subtitle: "Understanding how algorithms perform as input data grows.",
    totalDays: 90,
    domain: "Magician Technical Training",
    badgeText: "Day 1 Available",
    author: "Deepthi T",
    role: "Senior .NET Developer / Technical Architect"
};

// 90-Day Curriculum Outline
const DSA_ROADMAP = [
    // Phase 1: Algorithmic Complexity & Foundations (Days 1–10)
    { day: 1, title: "Understanding Big O Notation (Time & Space Complexity)", phase: "Foundations & Asymptotic Analysis", status: "Available", active: true },
    { day: 2, title: "Array Data Structures & In-Memory Contiguity in .NET CLR", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 3, title: "Dynamic Arrays & System.Collections.Generic.List<T> Internals", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 4, title: "String Manipulation, ReadOnlySpan<char> & Memory Allocation", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 5, title: "Two Pointers Technique: Symmetric & Converging Scenarios", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 6, title: "Sliding Window Algorithm: Fixed & Dynamic Window Optimization", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 7, title: "Prefix Sum & Range Query Acceleration in Real-Time Pipelines", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 8, title: "Hashing Architecture: Dictionary<TKey, TValue> & Hash Collision Resolution", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 9, title: "HashSet<T> Unique Entity Sets & BitArray Implementations", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },
    { day: 10, title: "Foundations Checkpoint: BenchmarkDotNet Profiling & Complexity Audits", phase: "Foundations & Asymptotic Analysis", status: "Coming Soon", active: false },

    // Phase 2: Linear Data Structures & Sequential Algorithms (Days 11–25)
    { day: 11, title: "Singly Linked Lists: Node Allocation & Pointer Manipulation", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 12, title: "Doubly Linked Lists & Sentinel Nodes in High-Throughput Buffers", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 13, title: "Fast and Slow Pointers (Floyd's Cycle-Finding Algorithm)", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 14, title: "In-Place Linked List Reversal & Sublist Partitioning", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 15, title: "Stack Architecture: LIFO Execution & Call Stack Mechanics", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 16, title: "Monotonic Stacks: Next Greater Element & Range Peak Detection", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 17, title: "Queue Architecture: FIFO Scheduling & Ring Buffer Channels", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 18, title: "Double-Ended Queues (Deque) & Sliding Window Extremums", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 19, title: "PriorityQueue<TElement, TPriority> in .NET 6+ & Min-Heap Schedules", phase: "Linear Data Structures", status: "Coming Soon", active: false },
    { day: 20, title: "Binary Search Deep-Dive: Lower Bound, Upper Bound & Search Range", phase: "Searching & Sorting", status: "Coming Soon", active: false },
    { day: 21, title: "Binary Search on Answer / Solution Space Optimization", phase: "Searching & Sorting", status: "Coming Soon", active: false },
    { day: 22, title: "Merge Sort: Divide & Conquer, Inversion Counting & Stability", phase: "Searching & Sorting", status: "Coming Soon", active: false },
    { day: 23, title: "Quick Sort: Partitioning Strategies, Dual-Pivot & Introsort (.NET Array.Sort)", phase: "Searching & Sorting", status: "Coming Soon", active: false },
    { day: 24, title: "Non-Comparison Sorting: Counting Sort, Radix Sort & Bucket Sort", phase: "Searching & Sorting", status: "Coming Soon", active: false },
    { day: 25, title: "Sorting Checkpoint: Large-Scale Dataset Benchmarks & Memory Footprint", phase: "Searching & Sorting", status: "Coming Soon", active: false },

    // Phase 3: Non-Linear Structures: Trees & Heaps (Days 26–42)
    { day: 26, title: "Tree Terminology, Representation & Memory Layout", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 27, title: "Binary Tree Traversals: Recursive & Iterative (Pre, In, Post-Order)", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 28, title: "Breadth-First Search (BFS) & Level-Order Traversal", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 29, title: "Binary Search Trees (BST): Insertion, Search, Deletion & Invariant", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 30, title: "Balanced Trees: AVL Tree Rotations & Balance Factor Calculations", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 31, title: "Red-Black Trees: Color Invariants & SortedDictionary<TKey, TValue> Engine", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 32, title: "Trie (Prefix Tree): Fast Autocomplete & IP Prefix Matching", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 33, title: "Radix Trees & Compressed Tries in Routing Engines", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 34, title: "Binary Heap: Array-Based Representation, Sift-Up & Sift-Down", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 35, title: "Top-K Frequent Elements: Streaming Data & Bounded Heaps", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 36, title: "Median Finding in Dynamic Data Streams (Two-Heap Pattern)", phase: "Hierarchical Structures", status: "Coming Soon", active: false },
    { day: 37, title: "Segment Trees: Range Sum & Point Updates in O(log n)", phase: "Advanced Trees", status: "Coming Soon", active: false },
    { day: 38, title: "Lazy Propagation in Segment Trees for Mass Range Updates", phase: "Advanced Trees", status: "Coming Soon", active: false },
    { day: 39, title: "Binary Indexed Trees (Fenwick Trees): Prefix Frequencies", phase: "Advanced Trees", status: "Coming Soon", active: false },
    { day: 40, title: "Lowest Common Ancestor (LCA) in Trees & Binary Lifting", phase: "Advanced Trees", status: "Coming Soon", active: false },
    { day: 41, title: "Tree Serialization & Deserialization Protocols", phase: "Advanced Trees", status: "Coming Soon", active: false },
    { day: 42, title: "Tree Checkpoint: Hierarchical Org-Charts & Permission Tree Traversal", phase: "Advanced Trees", status: "Coming Soon", active: false },

    // Phase 4: Graph Algorithms & Network Theory (Days 43–58)
    { day: 43, title: "Graph Representations: Adjacency Matrix vs Adjacency List", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 44, title: "Graph Traversal: Depth-First Search (DFS) & Connected Components", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 45, title: "Graph Traversal: Breadth-First Search (BFS) & Shortest Path in Unweighted Graphs", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 46, title: "Cycle Detection in Directed Graphs: 3-Color DFS & Kahn's Algorithm", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 47, title: "Topological Sort: Course Prerequisites & Build Pipeline Dependency Resolvers", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 48, title: "Disjoint Set Union (DSU / Union-Find) with Path Compression & Union by Rank", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 49, title: "Kruskal's Minimum Spanning Tree Algorithm", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 50, title: "Prim's Algorithm for Minimum Spanning Trees", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 51, title: "Dijkstra's Algorithm: Single-Source Shortest Path with Min-Heap", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 52, title: "Bellman-Ford Algorithm & Negative Cycle Detection", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 53, title: "Floyd-Warshall Algorithm: All-Pairs Shortest Path in O(V³)", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 54, title: "A* Search Algorithm: Heuristic Pathfinding & Grid Navigation", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 55, title: "Tarjan's & Kosaraju's Strongly Connected Components (SCC)", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 56, title: "Bridges and Articulation Points in Resilient Network Meshes", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 57, title: "Bipartite Graph Matching & Hopcroft-Karp Algorithm", phase: "Graph Algorithms", status: "Coming Soon", active: false },
    { day: 58, title: "Graph Checkpoint: Microservice Dependency Graph & Circular Dependency Detection", phase: "Graph Algorithms", status: "Coming Soon", active: false },

    // Phase 5: Dynamic Programming & Optimization (Days 59–74)
    { day: 59, title: "Dynamic Programming Principles: Optimal Substructure & Overlapping Subproblems", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 60, title: "1D DP: Fibonacci, Climbing Stairs & House Robber Pattern", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 61, title: "0/1 Knapsack Problem: Space-Optimized Tabulation", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 62, title: "Unbounded Knapsack & Coin Change Combinations", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 63, title: "Longest Increasing Subsequence (LIS): O(n²) to O(n log n) Patience Sorting", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 64, title: "Longest Common Subsequence (LCS) & Diff Generation Engines", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 65, title: "Edit Distance (Levenshtein Distance): String Similarity & Typo Suggestion", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 66, title: "2D Grid DP: Unique Paths, Minimum Path Sum & Dungeon Game", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 67, title: "Palindromic DP: Longest Palindromic Substring & Subsequence", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 68, title: "Interval DP: Matrix Chain Multiplication & Burst Balloons", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 69, title: "DP on Trees: Tree Diameter & Maximum Independent Set", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 70, title: "Bitmask DP: Traveling Salesperson Problem (TSP) & Assignment Optimization", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 71, title: "Digit DP: Counting Numbers with Specific Digit Constraints", phase: "Dynamic Programming", status: "Coming Soon", active: false },
    { day: 72, title: "Greedy Algorithms: Activity Selection & Interval Scheduling", phase: "Greedy Algorithms", status: "Coming Soon", active: false },
    { day: 73, title: "Huffman Coding & Data Compression Algorithms", phase: "Greedy Algorithms", status: "Coming Soon", active: false },
    { day: 74, title: "DP Checkpoint: Dynamic Pricing Engine & Resource Allocation Optimizers", phase: "Dynamic Programming", status: "Coming Soon", active: false },

    // Phase 6: Advanced Strings, Math & Bit Manipulation (Days 75–82)
    { day: 75, title: "Bit Manipulation Mastery: Bitwise Flags, Masks & XOR Tricks", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 76, title: "Fast Exponentiation, Modular Arithmetic & GCD (Euclidean Algorithm)", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 77, title: "Prime Sieve of Eratosthenes & Prime Factorization at Scale", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 78, title: "Knuth-Morris-Pratt (KMP) String Pattern Matching", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 79, title: "Rabin-Karp Rolling Hash Algorithm for Substring Detection", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 80, title: "Z-Algorithm & Suffix Automata Introduction", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 81, title: "Bloom Filters: Probabilistic Membership Testing in Redis & DB Indexes", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },
    { day: 82, title: "HyperLogLog: Cardinality Estimation in Massive User Analytics", phase: "Bit Manipulation & Strings", status: "Coming Soon", active: false },

    // Phase 7: Enterprise System Architecture & Applied Scale (Days 83–90)
    { day: 83, title: "LRU & LFU Cache Eviction Implementations with O(1) Operations", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 84, title: "Rate Limiting Algorithms: Token Bucket & Leaky Bucket in ASP.NET Core", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 85, title: "Consistent Hashing & Virtual Nodes for Distributed Caching (Memcached/Redis)", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 86, title: "Lock-Free Data Structures & Interlocked Atomic Operations in .NET", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 87, title: "B-Tree & B+ Tree Architecture: How SQL Server Indexes Really Work", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 88, title: "LSM-Trees (Log-Structured Merge-Trees) in NoSQL Storage Engines", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 89, title: "Geo-Spatial Indexing: Geohash, QuadTree & R-Tree Spatial Lookups", phase: "System Architecture", status: "Coming Soon", active: false },
    { day: 90, title: "Senior Architect Capstone: Architecting Billion-Scale DSA Infrastructure", phase: "System Architecture", status: "Coming Soon", active: false }
];

// Five Complexity Categories for Day 1 Dashboard
const DSA_COMPLEXITIES = [
    {
        notation: "O(1)",
        name: "Constant Time",
        badgeColor: "#10b981",
        growthType: "Constant",
        perfRating: "Excellent",
        summary: "The execution time remains constant regardless of whether the collection contains 10 items or 10,000,000 items.",
        example: "Retrieving a course using direct array indexing (courseIds[2]) or looking up an enrolled learner by unique ID from a Dictionary in Magician Technical Training.",
        csharpSnippet: `int[] courseIds = { 101, 102, 103, 104, 105 };\nint courseId = courseIds[2]; // Direct memory offset calculation`,
        growthSvg: `<svg viewBox="0 0 100 40" class="growth-mini-chart"><line x1="5" y1="28" x2="95" y2="28" stroke="#10b981" stroke-width="3" stroke-linecap="round"/></svg>`,
        operationsAtN: { n10: "1", n100: "1", n1000: "1", n1000000: "1" }
    },
    {
        notation: "O(log n)",
        name: "Logarithmic Time",
        badgeColor: "#06b6d4",
        growthType: "Logarithmic",
        perfRating: "Excellent",
        summary: "The algorithm reduces the active search space in half with every single step, offering exceptional scalability.",
        example: "Finding a course ID in a sorted course catalog of 1,000,000 entries using Binary Search takes only ~20 comparisons.",
        csharpSnippet: `int[] sortedIds = { 101, 105, 108, 112, 120, 125, 130 };\nint result = Array.BinarySearch(sortedIds, 112);`,
        growthSvg: `<svg viewBox="0 0 100 40" class="growth-mini-chart"><path d="M 5,34 Q 30,22 95,16" fill="none" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/></svg>`,
        operationsAtN: { n10: "3.3", n100: "6.6", n1000: "10", n1000000: "20" }
    },
    {
        notation: "O(n)",
        name: "Linear Time",
        badgeColor: "#f59e0b",
        growthType: "Linear",
        perfRating: "Fair",
        summary: "Execution time and required operations grow directly proportional to the total number of input elements.",
        example: "Iterating through an unsorted course collection to locate a course title or filter active learners in Magician Technical Training.",
        csharpSnippet: `foreach (int id in courseIds) {\n    if (id == searchId) { Console.WriteLine("Course found"); break; }\n}`,
        growthSvg: `<svg viewBox="0 0 100 40" class="growth-mini-chart"><line x1="5" y1="35" x2="95" y2="8" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/></svg>`,
        operationsAtN: { n10: "10", n100: "100", n1000: "1,000", n1000000: "1,000,000" }
    },
    {
        notation: "O(n log n)",
        name: "Linearithmic Time",
        badgeColor: "#6366f1",
        growthType: "Linearithmic",
        perfRating: "Good",
        summary: "The theoretical lower bound for general comparison-based sorting algorithms like Merge Sort and Heap Sort.",
        example: "Sorting learner assessment scores or calculating leaderboard course rankings across all active batches in Magician Technical Training.",
        csharpSnippet: `int[] scores = { 75, 92, 60, 88, 95, 70 };\nArray.Sort(scores); // Dual-Pivot Quicksort / Merge Sort`,
        growthSvg: `<svg viewBox="0 0 100 40" class="growth-mini-chart"><path d="M 5,35 Q 40,24 95,6" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/></svg>`,
        operationsAtN: { n10: "33", n100: "664", n1000: "9,966", n1000000: "19,931,568" }
    },
    {
        notation: "O(n²)",
        name: "Quadratic Time",
        badgeColor: "#ef4444",
        growthType: "Quadratic",
        perfRating: "Poor / Risk",
        summary: "Execution time grows with the square of the input size, typically caused by nested loops over the same dataset.",
        example: "Comparing every course ID against every other course ID using nested loops to detect duplicate catalog registrations in Magician Technical Training.",
        csharpSnippet: `for (int i = 0; i < courseIds.Length; i++) {\n    for (int j = i + 1; j < courseIds.Length; j++) {\n        if (courseIds[i] == courseIds[j]) { /* Duplicate */ }\n    }\n}`,
        growthSvg: `<svg viewBox="0 0 100 40" class="growth-mini-chart"><path d="M 5,36 Q 60,34 95,4" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/></svg>`,
        operationsAtN: { n10: "100", n100: "10,000", n1000: "1,000,000", n1000000: "1,000,000,000,000" }
    }
];

// 15 Practical C# Programming Challenges for Day 1
const DSA_DAY1_CHALLENGES = [
    // Group 1: O(1) – Constant Time
    {
        id: "prog-1",
        number: 1,
        title: "Retrieve Course by Index",
        group: "O(1) – Constant Time",
        groupSlug: "o1",
        difficulty: "Easy",
        expectedComplexity: "O(1)",
        spaceComplexity: "O(1)",
        statement: "Given an array of course IDs in Magician Technical Training, retrieve the course ID located at a specified integer index in constant time.",
        scenario: "In the Magician Technical Training platform, course catalogs are stored in contiguous memory arrays. When a user requests a course by its tab index, we must return the item with direct pointer offset arithmetic.",
        starterCode: `using System;

public class CourseService
{
    // Task: Retrieve the course ID at the specified index
    // Expected Time Complexity: O(1)
    // Expected Space Complexity: O(1)
    public static int GetCourseByIndex(int[] courseIds, int index)
    {
        // TODO: Write your O(1) solution here
        
    }

    public static void Main()
    {
        int[] courseIds = { 101, 102, 103, 104, 105 };
        int requestedIndex = 2;
        int courseId = GetCourseByIndex(courseIds, requestedIndex);
        Console.WriteLine($"Course at index {requestedIndex}: {courseId}");
    }
}`
    },
    {
        id: "prog-2",
        number: 2,
        title: "Retrieve First Course Rating",
        group: "O(1) – Constant Time",
        groupSlug: "o1",
        difficulty: "Easy",
        expectedComplexity: "O(1)",
        spaceComplexity: "O(1)",
        statement: "Given an array of course ratings in Magician Technical Training, retrieve the rating of the first course.",
        scenario: "When rendering the course feedback summary header, Magician Technical Training shows the benchmark lead rating (first item). We access the head element in O(1) time without scanning subsequent ratings.",
        starterCode: `using System;

public class RatingService
{
    // Task: Retrieve the rating of the first course
    // Expected Time Complexity: O(1)
    // Expected Space Complexity: O(1)
    public static double GetFirstCourseRating(double[] ratings)
    {
        // TODO: Write your O(1) solution here
        
    }

    public static void Main()
    {
        double[] courseRatings = { 4.8, 4.5, 4.9, 4.2, 4.7 };
        double leadRating = GetFirstCourseRating(courseRatings);
        Console.WriteLine($"First Course Rating: {leadRating}");
    }
}`
    },
    {
        id: "prog-3",
        number: 3,
        title: "Developer Lookup",
        group: "O(1) – Constant Time",
        groupSlug: "o1",
        difficulty: "Easy",
        expectedComplexity: "O(1) average",
        spaceComplexity: "O(1)",
        statement: "Given a Dictionary containing developer IDs and developer names, retrieve a developer's name using the developer ID.",
        scenario: "The platform maintains a lookup table of registered learners. Given a unique learner/developer ID key, retrieve their profile name in O(1) average time via hash bucket resolution.",
        starterCode: `using System;
using System.Collections.Generic;

public class LearnerDirectory
{
    // Task: Retrieve developer name using developer ID from Dictionary
    // Expected Time Complexity: O(1) average
    // Expected Space Complexity: O(1)
    public static string GetDeveloperName(Dictionary<int, string> developers, int developerId)
    {
        // TODO: Write your O(1) average lookup here
        
    }

    public static void Main()
    {
        var developers = new Dictionary<int, string>
        {
            { 2001, "Deepthi" },
            { 2002, "Alex" },
            { 2003, "Rajesh" },
            { 2004, "Elena" }
        };

        string devName = GetDeveloperName(developers, 2001);
        Console.WriteLine($"Developer 2001 Name: {devName}");
    }
}`
    },

    // Group 2: O(n) – Linear Time
    {
        id: "prog-4",
        number: 4,
        title: "Find Course ID",
        group: "O(n) – Linear Time",
        groupSlug: "on",
        difficulty: "Easy",
        expectedComplexity: "O(n)",
        spaceComplexity: "O(1)",
        statement: "Given an unsorted array of course IDs, find whether a particular course ID exists.",
        scenario: "In an unsorted batch of recent course submissions in Magician Technical Training, check whether target course 108 has been scheduled by inspecting items sequentially.",
        starterCode: `using System;

public class CourseCatalog
{
    // Task: Check if target course ID exists in unsorted array
    // Expected Time Complexity: O(n)
    // Expected Space Complexity: O(1)
    public static bool ContainsCourse(int[] courseIds, int targetCourseId)
    {
        // TODO: Write your O(n) linear search here
        
    }

    public static void Main()
    {
        int[] courseIds = { 105, 120, 101, 112, 108, 130 };
        int searchTarget = 108;
        bool exists = ContainsCourse(courseIds, searchTarget);
        Console.WriteLine($"Course {searchTarget} exists: {exists}");
    }
}`
    },
    {
        id: "prog-5",
        number: 5,
        title: "Find Maximum Course Rating",
        group: "O(n) – Linear Time",
        groupSlug: "on",
        difficulty: "Easy",
        expectedComplexity: "O(n)",
        spaceComplexity: "O(1)",
        statement: "Given an array of course ratings, find the highest rating.",
        scenario: "Compute the top course rating across a newly submitted batch of reviews in Magician Technical Training by executing a single linear pass.",
        starterCode: `using System;

public class RatingAnalytics
{
    // Task: Find the maximum course rating in the array
    // Expected Time Complexity: O(n)
    // Expected Space Complexity: O(1)
    public static double FindMaxRating(double[] ratings)
    {
        // TODO: Write your O(n) max search here
        
    }

    public static void Main()
    {
        double[] courseRatings = { 4.5, 4.9, 4.2, 4.8, 4.6, 4.95 };
        double topRating = FindMaxRating(courseRatings);
        Console.WriteLine($"Highest Course Rating: {topRating}");
    }
}`
    },
    {
        id: "prog-6",
        number: 6,
        title: "Count Completed Courses",
        group: "O(n) – Linear Time",
        groupSlug: "on",
        difficulty: "Easy",
        expectedComplexity: "O(n)",
        spaceComplexity: "O(1)",
        statement: "Given a collection of developer course-completion statuses, count how many developers have completed a particular course.",
        scenario: "In Magician Technical Training, the training coordinator needs to tally the total completions for Course ID 101 across an active enrollment dataset in a single linear scan.",
        starterCode: `using System;
using System.Collections.Generic;

public class EnrollmentRecord
{
    public int DeveloperId { get; set; }
    public int CourseId { get; set; }
    public bool IsCompleted { get; set; }
}

public class CompletionReporter
{
    // Task: Count completed courses for target course ID
    // Expected Time Complexity: O(n)
    // Expected Space Complexity: O(1)
    public static int CountCompletions(IEnumerable<EnrollmentRecord> records, int targetCourseId)
    {
        // TODO: Write your O(n) counting routine here
        
    }

    public static void Main()
    {
        var records = new List<EnrollmentRecord>
        {
            new() { DeveloperId = 101, CourseId = 101, IsCompleted = true },
            new() { DeveloperId = 102, CourseId = 101, IsCompleted = false },
            new() { DeveloperId = 103, CourseId = 101, IsCompleted = true },
            new() { DeveloperId = 104, CourseId = 205, IsCompleted = true },
            new() { DeveloperId = 105, CourseId = 101, IsCompleted = true }
        };

        int completed = CountCompletions(records, 101);
        Console.WriteLine($"Total completions for Course 101: {completed}");
    }
}`
    },

    // Group 3: O(log n) – Logarithmic Time
    {
        id: "prog-7",
        number: 7,
        title: "Binary Search Course ID",
        group: "O(log n) – Logarithmic Time",
        groupSlug: "ologn",
        difficulty: "Medium",
        expectedComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        statement: "Given a sorted array of course IDs, find a particular course ID using Binary Search.",
        scenario: "In Magician Technical Training's indexed archive, 1,000,000 course records are pre-sorted. Locate course ID 112 in ~20 steps by repeatedly bisecting the search window.",
        starterCode: `using System;

public class BinarySearchEngine
{
    // Task: Implement Binary Search on sorted course IDs
    // Expected Time Complexity: O(log n)
    // Expected Space Complexity: O(1)
    public static int BinarySearchCourse(int[] sortedCourseIds, int targetCourseId)
    {
        // TODO: Implement your O(log n) binary search here
        
    }

    public static void Main()
    {
        int[] sortedCourses = { 101, 105, 108, 112, 120, 125, 130, 140, 150 };
        int target = 112;
        int index = BinarySearchCourse(sortedCourses, target);
        Console.WriteLine($"Course {target} found at index: {index}");
    }
}`
    },
    {
        id: "prog-8",
        number: 8,
        title: "First Occurrence of Developer ID",
        group: "O(log n) – Logarithmic Time",
        groupSlug: "ologn",
        difficulty: "Medium",
        expectedComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        statement: "Given a sorted array containing duplicate developer IDs, find the first occurrence of a specified developer ID using Binary Search.",
        scenario: "Learner attendance logs are ordered by developer ID, but learners check in multiple times. Find the earliest recorded entry for Developer ID 105 in O(log n) time.",
        starterCode: `using System;

public class AttendanceTracker
{
    // Task: Find first occurrence index of developer ID in sorted array with duplicates
    // Expected Time Complexity: O(log n)
    // Expected Space Complexity: O(1)
    public static int FindFirstOccurrence(int[] sortedDevIds, int targetDevId)
    {
        // TODO: Implement your O(log n) lower-bound binary search here
        
    }

    public static void Main()
    {
        int[] devIds = { 101, 102, 105, 105, 105, 108, 112, 120 };
        int target = 105;
        int firstIndex = FindFirstOccurrence(devIds, target);
        Console.WriteLine($"First occurrence of Developer {target} is at index: {firstIndex}");
    }
}`
    },
    {
        id: "prog-9",
        number: 9,
        title: "Find Insertion Position",
        group: "O(log n) – Logarithmic Time",
        groupSlug: "ologn",
        difficulty: "Medium",
        expectedComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        statement: "Given a sorted array of course IDs and a new course ID, find the position where the new ID should be inserted while maintaining sorted order.",
        scenario: "When adding a newly approved course ID (e.g., 108) to the sorted curriculum registry in Magician Technical Training, determine its target insertion slot without shifting or re-sorting.",
        starterCode: `using System;

public class CurriculumRegistry
{
    // Task: Find insertion index for new course ID to maintain sorted order
    // Expected Time Complexity: O(log n)
    // Expected Space Complexity: O(1)
    public static int SearchInsertPosition(int[] sortedCourseIds, int newCourseId)
    {
        // TODO: Write your O(log n) insertion position search here
        
    }

    public static void Main()
    {
        int[] courses = { 101, 105, 110, 115, 120 };
        int newId = 108;
        int insertIdx = SearchInsertPosition(courses, newId);
        Console.WriteLine($"Insertion index for Course {newId}: {insertIdx}"); // Expected: 2
    }
}`
    },

    // Group 4: O(n log n) – Linearithmic Time
    {
        id: "prog-10",
        number: 10,
        title: "Merge Sort Course Ratings",
        group: "O(n log n) – Linearithmic Time",
        groupSlug: "onlogn",
        difficulty: "Medium",
        expectedComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        statement: "Given an array of course ratings, implement Merge Sort to arrange the ratings in ascending order.",
        scenario: "In Magician Technical Training, course ratings must be sorted stably so that courses with identical ratings preserve their submission hierarchy. Implement divide-and-conquer Merge Sort.",
        starterCode: `using System;

public class CourseRatingSorter
{
    // Task: Implement Merge Sort to sort course ratings in ascending order
    // Expected Time Complexity: O(n log n)
    // Expected Space Complexity: O(n)
    public static void MergeSortRatings(double[] ratings)
    {
        // TODO: Implement divide-and-conquer Merge Sort here
        
    }

    public static void Main()
    {
        double[] ratings = { 4.8, 3.9, 4.9, 4.2, 4.5, 4.0 };
        MergeSortRatings(ratings);
        Console.WriteLine("Sorted Ratings: " + string.Join(", ", ratings));
    }
}`
    },
    {
        id: "prog-11",
        number: 11,
        title: "Heap Sort Assessment Scores",
        group: "O(n log n) – Linearithmic Time",
        groupSlug: "onlogn",
        difficulty: "Hard",
        expectedComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        statement: "Given an array of assessment scores, implement Heap Sort to arrange the scores in descending order.",
        scenario: "For generating the Magician Technical Training monthly leaderboard, sort 10,000 exam scores in descending order with zero additional heap memory allocations using in-place Heap Sort.",
        starterCode: `using System;

public class AssessmentRanker
{
    // Task: Implement Heap Sort to sort assessment scores in descending order
    // Expected Time Complexity: O(n log n)
    // Expected Space Complexity: O(1) in-place
    public static void HeapSortScoresDescending(int[] scores)
    {
        // TODO: Build heap & implement in-place heap sort descending
        
    }

    public static void Main()
    {
        int[] scores = { 72, 95, 60, 88, 91, 84, 99 };
        HeapSortScoresDescending(scores);
        Console.WriteLine("Sorted Scores (Descending): " + string.Join(", ", scores));
    }
}`
    },
    {
        id: "prog-12",
        number: 12,
        title: "Quick Sort Course Prices",
        group: "O(n log n) – Linearithmic Time",
        groupSlug: "onlogn",
        difficulty: "Medium",
        expectedComplexity: "O(n log n) average (O(n²) worst case)",
        spaceComplexity: "O(log n)",
        statement: "Given an array of course prices, implement Quick Sort using a good pivot strategy. Mention that the worst-case complexity of Quick Sort is O(n²).",
        scenario: "Sort the subscription course catalog pricing in Magician Technical Training using Quick Sort with median-of-three or randomized pivot selection to protect against O(n²) degenerate cases.",
        starterCode: `using System;

public class PricingCatalog
{
    // Task: Implement Quick Sort with pivot strategy
    // Expected Time Complexity: O(n log n) average case; O(n²) worst case
    // Expected Space Complexity: O(log n) call stack
    public static void QuickSortPrices(decimal[] prices)
    {
        // TODO: Implement Quick Sort with robust pivot partition
        
    }

    public static void Main()
    {
        decimal[] prices = { 49.99m, 19.99m, 99.00m, 29.50m, 79.99m, 15.00m };
        QuickSortPrices(prices);
        Console.WriteLine("Sorted Prices: " + string.Join(", ", prices));
    }
}`
    },

    // Group 5: O(n²) – Quadratic Time
    {
        id: "prog-13",
        number: 13,
        title: "Find Duplicate Course IDs",
        group: "O(n²) – Quadratic Time",
        groupSlug: "on2",
        difficulty: "Easy",
        expectedComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        statement: "Given an array of course IDs, compare every element with every other element and identify duplicates using nested loops.",
        scenario: "In an unoptimized legacy module of Magician Technical Training, find duplicate course registrations by running a nested comparison loop across all pairs.",
        starterCode: `using System;
using System.Collections.Generic;

public class DuplicateDetector
{
    // Task: Find duplicate course IDs using nested loops (compare every pair)
    // Expected Time Complexity: O(n²)
    // Expected Space Complexity: O(1) auxiliary (ignoring result list)
    public static List<int> FindDuplicatesNested(int[] courseIds)
    {
        // TODO: Write your O(n²) nested loop duplicate finder
        
    }

    public static void Main()
    {
        int[] courseIds = { 101, 105, 108, 101, 120, 105, 140 };
        var duplicates = FindDuplicatesNested(courseIds);
        Console.WriteLine("Duplicate IDs: " + string.Join(", ", duplicates));
    }
}`
    },
    {
        id: "prog-14",
        number: 14,
        title: "Compare Developer Assessment Scores",
        group: "O(n²) – Quadratic Time",
        groupSlug: "on2",
        difficulty: "Easy",
        expectedComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        statement: "Given an array of developer assessment scores, compare every developer with every other developer and identify matching scores.",
        scenario: "To analyze peer score clusters in Magician Technical Training, compare each learner's assessment score against every other learner's score using an all-pairs quadratic matrix traversal.",
        starterCode: `using System;
using System.Collections.Generic;

public class PeerScoreComparison
{
    // Task: Compare every score with every other score to find pairs of matching scores
    // Expected Time Complexity: O(n²)
    // Expected Space Complexity: O(1) auxiliary
    public static List<(int indexA, int indexB, int score)> FindMatchingScorePairs(int[] scores)
    {
        // TODO: Write your O(n²) all-pairs score matching loop
        
    }

    public static void Main()
    {
        int[] scores = { 85, 90, 78, 85, 92, 90 };
        var matches = FindMatchingScorePairs(scores);
        foreach (var m in matches)
        {
            Console.WriteLine($"Match between index {m.indexA} and {m.indexB}: Score {m.score}");
        }
    }
}`
    },
    {
        id: "prog-15",
        number: 15,
        title: "Bubble Sort Course Ratings",
        group: "O(n²) – Quadratic Time",
        groupSlug: "on2",
        difficulty: "Easy",
        expectedComplexity: "O(n²) worst case",
        spaceComplexity: "O(1)",
        statement: "Implement Bubble Sort to arrange course ratings in ascending order.",
        scenario: "Demonstrate why quadratic algorithms degrade under scale: sort course ratings in Magician Technical Training using repeated adjacent item swaps via Bubble Sort.",
        starterCode: `using System;

public class BubbleSorter
{
    // Task: Implement Bubble Sort to arrange ratings in ascending order
    // Expected Time Complexity: O(n²) worst case
    // Expected Space Complexity: O(1) in-place
    public static void BubbleSortRatings(double[] ratings)
    {
        // TODO: Implement Bubble Sort with early termination flag
        
    }

    public static void Main()
    {
        double[] ratings = { 4.9, 4.1, 4.7, 4.3, 4.8 };
        BubbleSortRatings(ratings);
        Console.WriteLine("Bubble Sorted Ratings: " + string.Join(", ", ratings));
    }
}`
    }
];
