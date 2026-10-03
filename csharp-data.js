// C# 1 to 15 Comprehensive Topic Dataset from prepint.xlsx
const CSHARP_VERSION_ORDER = [
  "C# 1.0",
  "C# 2.0",
  "C# 3.0",
  "C# 4.0",
  "C# 5.0",
  "C# 6.0",
  "C# 7.0",
  "C# 7.1",
  "C# 7.2",
  "C# 7.3",
  "C# 8.0",
  "C# 9.0",
  "C# 10",
  "C# 11",
  "C# 12",
  "C# 13",
  "C# 14",
  "C# 15"
];

const CSHARP_DATA = {
  "C# 1.0": {
    "version": "C# 1.0",
    "meta": {
      "title": ".NET Framework 1.0/1.1 (2002)",
      "era": "Foundations",
      "icon": "🏛"
    },
    "topics": [
      {
        "id": "1",
        "version": "C# 1.0",
        "topic": "Classes",
        "articulation": "Class is a blueprint encapsulating state and behavior.",
        "syntax": "class Person { }",
        "myArticulation": "Class is basically a blueprint or template which encapsulates the related state and behavior of an entity in one unit. For example, if I have a Person entity, the class can contain person-related data like ID, name and age, and behavior like CalculateAge() or Validate()."
      },
      {
        "id": "2",
        "version": "C# 1.0",
        "topic": "Objects",
        "articulation": "Object is a runtime instance of a class.",
        "syntax": "Person p = new Person();",
        "myArticulation": "Object is the runtime instance of that class. We normally create an object using new, and the class-type variable holds a reference to that object. In larger applications, object creation can also be encapsulated using Factory or other creational patterns when we don't want the calling code to directly depend on concrete object creation"
      },
      {
        "id": "3",
        "version": "C# 1.0",
        "topic": "Value vs Reference Types",
        "articulation": "Value types contain values; reference variables hold references to objects.",
        "syntax": "int x=10; Person p=new();",
        "myArticulation": "The main difference is what gets copied during assignment. A value type contains its actual value, so when I assign it to another variable, a copy of the value is created. For example, if a=10 and b=a, changing b doesn't affect a. Reference types work differently: the variable normally contains a reference to an object. If p2=p1, the reference is copied, so both variables can point to the same object. Therefore, the easiest way to remember is value type → copy of value; reference type → copy of reference. I would not simply say value types are always on stack and reference types are always on heap because actual memory placement depends on the runtime context."
      },
      {
        "id": "4",
        "version": "C# 1.0",
        "topic": "Fields",
        "articulation": "Fields represent data/state maintained by a type.",
        "syntax": "private int age;",
        "myArticulation": "Fields represent the state or data maintained by a type. For example, id, name and age can be fields. ."
      },
      {
        "id": "5",
        "version": "C# 1.0",
        "topic": "Properties",
        "articulation": "Properties provide controlled access to state.",
        "syntax": "public int Age { get; set; }",
        "myArticulation": "Properties provide controlled access to that state, using get and set; they are not specifically database getters and setters. They can perform validation or restrict modification."
      },
      {
        "id": "6",
        "version": "C# 1.0",
        "topic": "Methods",
        "articulation": "Methods represent behavior or operations.",
        "syntax": "public void Save() { }",
        "myArticulation": "Methods represent the behavior or action of the object, such as CalculateSalary() or Save(). So I remember it as field → stores state, property → controls access to state, method → performs behavior. Also, an auto-property like public string Name { get; set; } is a property, not a field; the compiler manages its backing field"
      },
      {
        "id": "7",
        "version": "C# 1.0",
        "topic": "Constructors",
        "articulation": "Constructors initialize an object during creation.",
        "syntax": "public Person() { }",
        "myArticulation": "Constructor is a special member used to initialize an object. It has the same name as the class and doesn't have a return type. It is automatically invoked as part of object creation."
      },
      {
        "id": "8",
        "version": "C# 1.0",
        "topic": "Constructor Overloading",
        "articulation": "Multiple constructors can initialize objects in different ways.",
        "syntax": "Person(); Person(string n);",
        "myArticulation": "We can have a parameterless constructor, parameterized constructor and overloaded constructors depending on how the object needs to be initialized. For example, new Person(\"Deepthi\") invokes the parameterized constructor and allows the initial state to be supplied during creation"
      },
      {
        "id": "9",
        "version": "C# 1.0",
        "topic": "static r private conatructor",
        "articulation": "private & Static  constructors",
        "syntax": "Private Person(); Static Person();",
        "myArticulation": "We can also have private constructors to restrict direct creation, although in modern ASP.NET Core applications object lifetime such as Singleton is normally managed by the DI container. A static constructor is used to initialize static state and is invoked automatically by the runtime when type initialization is required."
      },
      {
        "id": "10",
        "version": "C# 1.0",
        "topic": "Access Modifiers",
        "articulation": "Access modifiers control visibility and encapsulation.",
        "syntax": "public/private/protected/internal",
        "myArticulation": "Access modifiers control the visibility and accessibility of types and their members, and they are an important part of encapsulation. public exposes a member to callers that can access the containing type. private restricts access to the containing type. protected allows the containing type and derived types to access the member. internal restricts access to the same assembly. We also have protected internal, which effectively means protected OR internal, and private protected, which means derived type AND same assembly. In architecture, I use the least visibility required so that implementation details are not unnecessarily exposed."
      },
      {
        "id": "11",
        "version": "C# 1.0",
        "topic": "Inheritance",
        "articulation": "Derived classes reuse and extend base-class behavior.",
        "syntax": "class Dog : Animal { }",
        "myArticulation": "Inheritance is one of the four pillars of OOP. It allows a derived class to reuse and extend the common state and behavior of a base class.\nWhen multiple entities have a genuine IS-A relationship, we can identify their common properties and methods and place them in a base class. The specialized classes can then inherit from that base class and add their own properties and behavior.\nFor example, if Patient and Physician genuinely share common incident behavior, we could have an Incident base class containing common properties such as IncidentId and IncidentDescription, and common operations such as Create() or Update(). Patient and Physician can derive from it and add their specialized behavior such as ValidatePatient() or ValidatePhysician()"
      },
      {
        "id": "12",
        "version": "C# 1.0",
        "topic": "Composisiton",
        "articulation": "Has - A relationship",
        "syntax": "class Dog : Animal { }",
        "myArticulation": "Composition represents a HAS-A relationship where one class is built by combining other objects or components instead of inheriting from a base class.\nFor example, suppose an Incident needs incident CRUD functionality and also needs incident validation. Instead of creating a large inheritance hierarchy, I can separate these responsibilities into components such as IIncidentValidator and IIncidentRepository, and the IncidentService can compose those dependencies.\nThis gives me more precise reuse. A Patient doesn't need to inherit unrelated functionality such as PhysicianLicenseId or ValidatePhysician(). It can compose only the components relevant to its responsibility.\nIn modern application architecture, composition is often preferred when we want loose coupling and flexible behavior, whereas inheritance should be used when there is a genuine IS-A relationship."
      },
      {
        "id": "13",
        "version": "C# 1.0",
        "topic": "Association",
        "articulation": "week has- a relationship",
        "syntax": "class Dog : Animal { }",
        "myArticulation": "General relationship between two independent objects Association represents a general relationship between two independent classes where one object uses, interacts with, or knows about another object, without implying ownership or inheritance.\nFor example, suppose a Doctor treats a Patient. A Doctor and a Patient are separate entities with their own responsibilities and lifecycles. The Doctor does not inherit from Patient, and the Patient does not inherit from Doctor. Instead, the Doctor can interact with a Patient through a method or reference"
      },
      {
        "id": "14",
        "version": "C# 1.0",
        "topic": "Aggregation",
        "articulation": "HAS-A relationship; child can exist independently",
        "syntax": "class Dog : Animal { }",
        "myArticulation": "Aggregation represents a weak HAS-A relationship where one class groups or contains other objects, but those objects can exist independently of the parent object.\nFor example, suppose a Department has Employees. The Department maintains a collection of employees, but an Employee does not depend on the Department for its existence. If the Department is removed, the Employee can still exist and can potentially belong to another Department"
      },
      {
        "id": "15",
        "version": "C# 1.0",
        "topic": "Method Overloading",
        "articulation": "Same method name can have different parameter signatures.",
        "syntax": "Add(int,int) / Add(double,double)",
        "myArticulation": "Method overloading is a form of compile-time polymorphism where we can have multiple methods with the same name in the same class, but with different parameter lists or signatures. The compiler determines which overloaded method to call based on the arguments supplied at compile time. eg construtor overloading  person class with zeroparameter constructor /parameterized constructor / method overlaoding take orderfood from hotel with only type and quantity if its from online same order method will have location parameter also very important just changing return type is not method overload"
      },
      {
        "id": "16",
        "version": "C# 1.0",
        "topic": "Method Overriding",
        "articulation": "Derived classes can provide a specialized implementation of virtual behavior.",
        "syntax": "override void Draw()",
        "myArticulation": "Overriding is runtime polymorphism.\nBase class gives the method, derived class changes the implementation.\nAt runtime, the actual object decides which method runs.\nInterface also allows different classes to implement the same contract differently Virtual → Override → Runtime → Object decides"
      },
      {
        "id": "17",
        "version": "C# 1.0",
        "topic": "Polymorphism",
        "articulation": "Same contract can produce different implementations.",
        "syntax": "Animal a = new Dog();",
        "myArticulation": "Polymorphism means one method name can represent different behaviors/implementations. It is mainly of two types: compile-time polymorphism and runtime polymorphism.  Compile-time → Overloading\nSame method name with different parameter lists. The compiler decides which method to invoke based on the arguments supplied. It can exist in the same class, and no special   Runtime → Different implementation\nThe same operation can have different implementations, and the implementation is determined at runtime based on the actual object. keyword is required."
      },
      {
        "id": "18",
        "version": "C# 1.0",
        "topic": "Virtual/Override",
        "articulation": "virtual enables overriding; override replaces inherited behavior.",
        "syntax": "virtual void Run()",
        "myArticulation": "virtual/override is one common mechanism; abstract classes and interfaces also provide runtime polymorphic behavior"
      },
      {
        "id": "19",
        "version": "C# 1.0",
        "topic": "Abstract Classes",
        "articulation": "Abstract classes provide a common base with incomplete/complete behavior.",
        "syntax": "abstract class Shape",
        "myArticulation": "an abstract class is a special base class that cannot be instantiated directly. It can contain properties, fully implemented methods, and also abstract methods or properties that do not have an implementation.\n\nDerived classes can reuse the common properties and fully implemented methods from the abstract class, but they must provide implementations for the abstract members unless the derived class is also abstract.\n\nWe use an abstract class when multiple related classes have common state and behavior, but some behavior needs different implementation in each derived class.\n\nFor example, in an employee management system, PermanentEmployee and DailyWageEmployee are both types of Employee. They have common properties such as EmployeeId and EmployeeName, and common operations such as Login, Logout, and ApplyLeave. So I can put these common members in an abstract Employee class.\n\nHowever, salary calculation is different for each employee type. A PermanentEmployee may have a monthly salary calculation, while a DailyWageEmployee may be paid based on working hours or days. Therefore, I can make CalculateSalary an abstract method and let each derived class provide its own implementation."
      },
      {
        "id": "20",
        "version": "C# 1.0",
        "topic": "sealed classes",
        "articulation": "Class that cannot be inherited. Used when behavior should not be extended through inheritance.",
        "syntax": "public sealed class AuthService { }\nclass MyService : AuthService { } //",
        "myArticulation": "A sealed class is a class that cannot be inherited by another class. We use it when the behavior of a class is complete and we don't want derived classes to extend or modify it through inheritance. For example, if I have an AuthenticationService whose token-validation behavior is finalized and should not be changed through inheritance, I can make it a sealed class. The class can still be instantiated and can implement interfaces; only further inheritance is restricted"
      },
      {
        "id": "22",
        "version": "C# 1.0",
        "topic": "Interfaces",
        "articulation": "Interfaces define contracts independent of implementation.",
        "syntax": "interface IRepository { }",
        "myArticulation": "An interface is a contract that defines what a class must provide without depending on its concrete implementation. A class implementing the interface must provide the required members, otherwise we get a compile-time error. Interfaces support loose coupling and are heavily used with ISP and DIP. ISP says I should create focused interfaces instead of forcing a class to implement unwanted contracts. DIP says high-level code should depend on abstractions rather than concrete implementations; in ASP.NET Core, DI provides the required implementation to the dependent class."
      },
      {
        "id": "23",
        "version": "C# 1.0",
        "topic": "New keyword  -Object",
        "articulation": "The new keyword is used to create an object of a class. When I use new, memory is allocated for the object and the appropriate constructor is invoked to initialize it.",
        "syntax": "Person person = new Person(); --object creation",
        "myArticulation": "The new keyword is used to create an object of a class. When I use new, memory is allocated for the object and the appropriate constructor is invoked to initialize it."
      },
      {
        "id": "24",
        "version": "C# 1.0",
        "topic": "new – Member Hiding",
        "articulation": "The new keyword is used to create an object of a class. When I use new, memory is allocated for the object and the appropriate constructor is invoked to initialize it.",
        "syntax": "Base Report has Generate(), but a derived PatientReport wants its own Generate() implementation → use new to hide the base member",
        "myArticulation": "The new keyword can also be used in a derived class when I intentionally want to hide a member of the base class and provide a separate implementation in the derived class. This is different from override because member hiding does not provide runtime overriding behavior."
      },
      {
        "id": "25",
        "version": "C# 1.0",
        "topic": "Structs",
        "articulation": "Structs are user-defined value types.",
        "syntax": "struct Point { public int X; }",
        "myArticulation": "A struct is a value type that can contain fields, properties, methods, constructors, and can support encapsulation. When a struct is assigned to another struct variable, its value is copied, so we get an independent copy. Structs are generally suitable for small, lightweight data rather than large objects Struct cannot inherit from another class or struct, but it CAN implement interfaces. Struct does not support class inheritance, but it can implement interfaces and participate in interface-based polymorphism.For example, if I have a small Point or Coordinate containing X and Y values, a struct can be appropriate because it represents a small value and copying it gives me an independent value"
      },
      {
        "id": "26",
        "version": "C# 1.0",
        "topic": "Enums",
        "articulation": "Enums define named integral constants.",
        "syntax": "public enum WeekDay\n{\nMonday,Tuesday,  Wednesday,Thursday,\nFriday,Saturday,Sunday\n}    //// public enum CurtainColor\n{\n    Red,Blue,Green,Yellow,\n    White\n}  how to use WeekDay changeDay = WeekDay.Friday;\nCurtainColor color = CurtainColor.Blue;",
        "myArticulation": "An enum is a value type used to represent a fixed set of named integral constants. I use it when a property can have only a predefined set of values, because it makes the code more readable and type-safe than using raw numbers.  An enum is a value type used to represent a fixed set of named integral constants. I use it when a property can have only a predefined set of values, because it makes the code more readable and type-safe than using raw numbers.  it is for representing a fixed, predefined set of named choices."
      },
      {
        "id": "27",
        "version": "C# 1.0",
        "topic": "Arrays",
        "articulation": "Arrays store a fixed-size collection of elements of one type.",
        "syntax": "int[] a = new int[5];",
        "myArticulation": "An array is a reference type used to store a fixed-size collection of elements of the same type. The size is fixed when the array is created, and indexing starts from zero, so the last index is always length minus one. For example, if I have an array to store 5 patient IDs, it can store 5 integer values with indexes from 0 to 4. I cannot directly add a sixth element because the array size is fixed. If I try to access index 5, I get an IndexOutOfRangeException at runtime."
      },
      {
        "id": "28",
        "version": "C# 1.0",
        "topic": "Delegates",
        "articulation": "A delegate is a type-safe reference to a method. I use delegates when I want to pass a method as a parameter or allow one method to call another method indirectly. Delegates are also the foundation for events, callbacks, Action, Func, and Predicate.",
        "syntax": "public delegate void Notify(string message);",
        "myArticulation": "A delegate is a type-safe method reference, so I can pass a method as a parameter as long as its signature matches the delegate.\n\nFor example, I can declare `public delegate void Notify(string msg);`. This means the delegate can accept any method that takes a string parameter and returns void.\n\nSuppose I have a normal `NotificationService` class with two methods: `SendSms(string msg)` and `SendEmail(string msg)`. Both methods accept a string and return void, so both match the `Notify` delegate.\n\nIn my normal `IncidentService` class, I can have a `CreateIncident` method that accepts the incident data, the message, and the `Notify` delegate. When I call `CreateIncident(incidentModel, \"Incident created successfully\", notificationService.SendSms)`, I am passing the `SendSms` method as a parameter to the delegate. After the incident is saved, when `IncidentService` calls `notify(msg)`, the delegate invokes `SendSms` with that message.\n\nIf I instead pass `notificationService.SendEmail`, the same `CreateIncident` method will invoke `SendEmail`. So I can change the notification behavior by passing a different method without changing the IncidentService logic."
      },
      {
        "id": "29",
        "version": "C# 1.0",
        "topic": "Actions",
        "articulation": "Action is a built-in delegate, so I don't have to declare public delegate void Notify(string msg) myself. Action<string> already represents a method that accepts a string and returns void.",
        "syntax": "public void CreateIncident(\n    IncidentModel incident,\n    string message,\n    Action<string> notify)\n{\n    // Save incident\n\n    notify(message);\n}",
        "myArticulation": "`Action` is a built-in generic delegate used when I want to pass a method as a parameter and that method does not return a value.\n\nFor example, instead of declaring my own `public delegate void Notify(string msg)`, I can use `Action<string>`. This means I can pass any method that accepts a string parameter and returns void.\n\nSuppose my normal `NotificationService` class has `SendSms(string msg)` and `SendEmail(string msg)`. Both methods accept a string and return void, so both match `Action<string>`.\n\nIn my `IncidentService`, the `CreateIncident` method can accept an `Action<string>` parameter. When I call `CreateIncident(incidentModel, \"Incident created successfully\", notificationService.SendSms)`, I am passing the `SendSms` method as a parameter. After saving the incident, when I call the Action with the message, it invokes the method that I passed.\n\nIf I instead pass `notificationService.SendEmail`, the same `CreateIncident` method will execute `SendEmail`. So `Action` gives me the same delegate behavior without having to declare my own delegate type."
      },
      {
        "id": "30",
        "version": "C# 1.0",
        "topic": "Func",
        "articulation": "Func is a built-in generic delegate used when the method returns a value. The last generic type is always the return type.",
        "syntax": "Func<IncidentModel, string> calculatePriority",
        "myArticulation": "Suppose after creating an incident, I want to calculate and return the incident priority.\nMy IncidentService can accept a Func:  `Func` is a built-in generic delegate used when I want to pass a method as a parameter and that method returns a value. Unlike `Action`, which always returns void, `Func` can return a value, and the last generic type parameter represents the return type.\n\nFor example, in my IncidentService, after creating an incident I may need to calculate its priority. I can define a `Func<IncidentModel, string>` parameter, which means the method I pass must accept an IncidentModel and return a string.\n\nSuppose I have a `CalculatePriority(IncidentModel incident)` method that returns the priority as a string. I can pass that method to my CreateIncident method. After saving the incident, IncidentService can invoke the Func with the incident object, and the returned priority can be used by the service.\n\nSo the same CreateIncident method can receive different calculation methods without hardcoding the priority calculation logic."
      },
      {
        "id": "31",
        "version": "C# 1.0",
        "topic": "Predicate",
        "articulation": "Predicate<T> is a built-in delegate used when I want to pass a method that takes one value of type T and returns true or false",
        "syntax": "Predicate<IncidentModel> isCritical = IsCritical;\n\nbool result = isCritical(incidentModel); Predicate<IncidentModel> isCritical =\n    incident => incident.Severity == \"Critical\";",
        "myArticulation": "`Predicate<T>` is a built-in delegate used when I need to pass a method that accepts one parameter of type T and returns a Boolean value. I can use it when I want to check a condition.\n\nFor example, in my IncidentService, I can use `Predicate<IncidentModel>` to check whether an incident is critical. The method receives an IncidentModel and returns true or false. I can pass that method as a parameter and execute it when I need the validation or condition check.\n\nSo I remember Predicate as a delegate specifically for condition checking: one input and a Boolean result."
      },
      {
        "id": "32",
        "version": "C# 1.0",
        "topic": "Events",
        "articulation": "An event is a notification mechanism built on delegates. It allows one class to notify other interested objects when something happens, without directly knowing who the subscribers are.",
        "syntax": "incidentService.IncidentCreated += SendEmail; incidentService.IncidentCreated -= SendEmail;",
        "myArticulation": "An event is a notification mechanism built on delegates. I use it when one class needs to notify other interested objects that something has happened, without directly depending on those objects.\n\nFor example, in my IncidentService, after an incident is created, I can raise an IncidentCreated event. Email, SMS, or audit components can subscribe to that event. When IncidentService raises the event, all subscribed handlers are called.\n\nThe publisher only knows about the event, not the individual subscribers. We use `+=` to subscribe, `-=` to unsubscribe, and `Invoke` to raise the event.\n\nSo I remember: delegate provides the method reference, while an event provides controlled publish-subscribe notification."
      },
      {
        "id": "33",
        "version": "C# 1.0",
        "topic": "Exceptions",
        "articulation": "Exceptions represent runtime failures that can be handled or propagated.",
        "syntax": "try { } catch { }",
        "myArticulation": "An exception represents a runtime problem that interrupts the normal flow of execution. I use `try` for code that may fail, `catch` to handle specific exceptions, and `finally` for cleanup that should normally happen regardless of success or failure.\n\nFor example, while saving an incident, a database or validation operation may throw an exception. I can catch a specific exception when I can handle it meaningfully, otherwise I can allow it to propagate to a higher layer such as global exception-handling middleware.\n\nI prefer specific exception handling instead of catching `Exception` everywhere. If I need to rethrow an exception, I use `throw` rather than `throw ex` because `throw` preserves the original stack trace."
      },
      {
        "id": "34",
        "version": "C# 1.0",
        "topic": "ref parameter",
        "articulation": "ref passes an already-initialized variable by reference, so the method can read and modify the caller's variable.",
        "syntax": "int i = 0; Call(ref i);",
        "myArticulation": "`ref` passes an existing variable by reference, so the caller must initialize the variable before passing it. The method can read the existing value and modify it, and the modification is reflected back in the caller because both are referring to the same variable."
      },
      {
        "id": "35",
        "version": "C# 1.0",
        "topic": "out parameter",
        "articulation": "out passes a variable by reference when the caller doesn't have to initialize it; the called method must assign a value before returning.",
        "syntax": "int x; Call(out x);",
        "myArticulation": "`out` passes a variable by reference, but unlike `ref`, the caller doesn't need to initialize the variable before passing it. The called method is responsible for assigning a value to the `out` parameter before it returns. It is useful when a method needs to return an additional value along with its normal return value. For example, `TryParse` returns `true` or `false` through its normal return value to indicate whether conversion was successful, and it returns the converted value through the `out` parameter."
      },
      {
        "id": "36",
        "version": "C# 1.0",
        "topic": "in",
        "articulation": "in passes a variable by reference for read-only access. The method can use the existing value, but it cannot modify the caller's variable through that parameter",
        "syntax": "Call(in patient);",
        "myArticulation": "`in` passes a variable by reference for read-only access. Unlike `ref`, the method is not supposed to modify the value through the `in` parameter. It is useful when I want to pass an existing value without making a copy, especially for larger value types such as structs, while ensuring that the method only reads the data."
      },
      {
        "id": "37",
        "version": "C# 1.0",
        "topic": "Boxing",
        "articulation": "Boxing converts a value type into an object reference.",
        "syntax": "int i= 10 ;object o = i;",
        "myArticulation": "Boxing means converting a value type into an object reference. Since value types like `int` and structs normally hold their value directly, when I assign them to an `object`, C# creates a boxed object containing a copy of that value, and the object variable holds a reference to it.\n\nFor example, in my IncidentService, if I have `int incidentId = 101` and assign it to `object value = incidentId`, boxing happens. The original `incidentId` and the boxed value are separate, so if I later change `incidentId` to 200, the boxed value still contains 101.\n\nBoxing can have performance and allocation overhead, which is one reason generic collections like `List<int>` are preferred over older non-generic collections such as `ArrayList`."
      },
      {
        "id": "38",
        "version": "C# 1.0",
        "topic": "Unboxing",
        "articulation": "Unboxing extracts the value type from a boxed object.",
        "syntax": "int x = (int)o;",
        "myArticulation": "Unboxing means extracting the value type from a boxed object. The object must actually contain a boxed value of the compatible value type, and I need an explicit cast to get the value back.\n\nFor example, in my IncidentService, if I have `int incidentId = 101` and assign it to `object value = incidentId`, boxing happens. Later, when I write `int id = (int)value`, I am unboxing the value from the object back to an `int`.\n\nIf I try to unbox it into an incompatible type, I get an `InvalidCastException`."
      },
      {
        "id": "39",
        "version": "C# 1.0",
        "topic": "object",
        "articulation": "System.Object is the root type of the .NET type hierarchy.",
        "syntax": "object o = new Person();",
        "myArticulation": "`object o = new Person()` means `new Person()` creates a Person object at runtime, and `o` is a reference variable declared as `object` that refers to that Person object. The actual runtime type of the object is `Person`, while the compile-time type of the variable is `object`. I prefer to say that `o` holds a reference to the object rather than saying it holds the memory address, because C# abstracts the actual memory address from us."
      },
      {
        "id": "40",
        "version": "C# 1.0",
        "topic": "is",
        "articulation": "is = type compatibility check; if it matches, I can get a typed variable using the pattern.",
        "syntax": "object incident = new CriticalIncident();\n\nif (incident is CriticalIncident critical)\n{\n    critical.Escalate();\n}",
        "myArticulation": "`is` checks whether an object is compatible with a particular type. For example, in my IncidentService, if I have an `object incident` but the actual runtime object is a `CriticalIncident`, I can use `if (incident is CriticalIncident critical)`. Here C# checks whether the runtime object is a `CriticalIncident`; if it is, the `critical` variable gives me a typed reference to that object, so I can access `CriticalIncident`-specific functionality such as `Escalate()`. If the object is not a `CriticalIncident`, the condition simply becomes false."
      },
      {
        "id": "41",
        "version": "C# 1.0",
        "topic": "as",
        "articulation": "is tests compatibility; as attempts safe reference/nullable conversion.",
        "syntax": "object incident = new CriticalIncident();\n\nCriticalIncident? critical = incident as CriticalIncident;\n\nif (critical != null)\n{\n    critical.Escalate();\n}",
        "myArticulation": "`as` attempts to convert an object to a compatible reference type or nullable value type. If the conversion is successful, I get the converted reference; if it is not compatible, `as` returns `null` instead of throwing a casting exception. For example, in my IncidentService, if I have an `object incident`, I can use `CriticalIncident? critical = incident as CriticalIncident`. If the actual object is a `CriticalIncident`, I get the reference and can use its specific functionality; otherwise, `critical` becomes `null`."
      },
      {
        "id": "42",
        "version": "C# 1.0",
        "topic": "Namespaces",
        "articulation": "Namespaces organize types and prevent naming collisions.",
        "syntax": "namespace MyApp { }",
        "myArticulation": "A namespace is used to organize related types such as classes, interfaces, structs and enums, and it also helps prevent naming conflicts when different parts of an application have classes with the same name. For example, in my Incident application, I can keep `IncidentService` under a Services namespace and `IncidentModel` under a Models namespace. If another module also has a class called `IncidentService`, different namespaces allow both types to exist without a naming collision."
      },
      {
        "id": "43",
        "version": "C# 1.0",
        "topic": "Attributes",
        "articulation": "Attributes attach metadata to program elements.",
        "syntax": "[[Authorize]\npublic class IncidentController\n{\n}]",
        "myArticulation": "An attribute is metadata that I can attach to a class, method, property, parameter, or other program element to provide additional information about it. The application or framework can read that metadata at runtime or compile time and use it to change or control behavior. For example, in my ASP.NET Core application, I can use attributes such as `[Authorize]` on a controller or action to indicate that authentication or authorization is required."
      },
      {
        "id": "44",
        "version": "C# 1.0",
        "topic": "Reflection Basics",
        "articulation": "Reflection allows runtime inspection of types and members.",
        "syntax": "typeof(Person)",
        "myArticulation": "Reflection allows me to inspect types and their members at runtime instead of knowing everything about them at compile time. For example, in my Incident application, if I have an `IncidentService` object, I can use reflection to find its type, methods, properties, or custom attributes at runtime. This is useful in frameworks, dependency injection, serialization, testing tools, and scenarios where the type or members need to be discovered dynamically."
      },
      {
        "id": "45",
        "version": "C# 1.0",
        "topic": "C# program structure",
        "articulation": "A C# program is organized into namespaces, types such as classes, and members such as fields, properties and methods.",
        "syntax": "namespace MyApp { class Program { } }",
        "myArticulation": "A C# program is organized into namespaces, types such as classes, interfaces, structs and enums, and members such as fields, properties, methods, constructors and events. For example, in my Incident application, I can have an `IncidentApp.Services` namespace containing `IncidentService`, and inside that class I can have properties, methods and other members that define its state and behavior."
      },
      {
        "id": "46",
        "version": "C# 1.0",
        "topic": "Comments",
        "articulation": "Comments explain code and are ignored by the compiler.",
        "syntax": "// Save the incident to database single line\nSaveIncident();\n// multiline \n/*\n   Validate incident\n   Save incident\n   Send notification\n*/\n/// <summary>\n/// Saves an incident.\n/// </summary>\npublic void SaveIncident()\n{\n}",
        "myArticulation": "Comments are used to explain or document code for developers, and they are ignored by the compiler when building the program. C# supports single-line comments, multi-line comments, and XML documentation comments."
      },
      {
        "id": "47",
        "version": "C# 1.0",
        "topic": "Variables",
        "articulation": "A variable is a named storage location whose value can change during program execution.",
        "syntax": "int age = 30;",
        "myArticulation": "A variable is a named storage location used to hold a value during program execution, and its value can change during the execution of the program. The variable has a type that determines what kind of value it can store. For example, in my IncidentService, I can have an `int incidentCount` variable to store the current number of incidents, and its value can change as new incidents are created."
      },
      {
        "id": "48",
        "version": "C# 1.0",
        "topic": "Local variable",
        "articulation": "A local variable is declared inside a method or block and is accessible only within that scope.",
        "syntax": "public void SaveIncident()\n{\n    int priority = 1;\n\n    if (priority > 0)\n    {\n        string status = \"Valid\";\n\n        Console.WriteLine(status);\n    }\n\n    Console.WriteLine(priority);\n}",
        "myArticulation": "A local variable is a variable declared inside a method or a block, and it can be accessed only within that method or block's scope. It is used for temporary data needed while that particular code is executing. For example, in my IncidentService, if I declare `int priority` inside `SaveIncident()`, I can use it inside that method, but I cannot directly access it from another method."
      },
      {
        "id": "49",
        "version": "C# 1.0",
        "topic": "Field",
        "articulation": "A field is a variable declared inside a class or struct that represents state belonging to that type or object.",
        "syntax": "public class IncidentService\n{\n    private int incidentCount;          // Instance field\n    private static int totalIncidents;  // Static field\n\n    public void SaveIncident()\n    {\n        int priority = 1;              // Local variable\n\n        incidentCount++;\n        totalIncidents++;\n    }\n}",
        "myArticulation": "A field is a variable declared inside a class or struct that represents state belonging to the object or type. An instance field has a separate value for each object, while a static field is shared by all objects of that type. For example, in my IncidentService, `incidentCount` can be an instance field representing state maintained by that service object."
      },
      {
        "id": "50",
        "version": "C# 1.0",
        "topic": "Static field/member",
        "articulation": "A static field belongs to the type rather than an individual object, so all instances share it.",
        "syntax": "class Company { public static string CompanyName = \"ABC Ltd\"; } Company c1 = new Company(); Company c2 = new Company(); Company.CompanyName = \"XYZ Ltd\"; → both objects see \"XYZ Ltd\". Memory: static field → one shared field per type within the process",
        "myArticulation": "A static field belongs to the type rather than an individual object, so all objects of that type share the same field. For example, if a Company class has a static companyName, every Company object sees the same value. If one object changes the static field, the updated value is visible through the other objects as well."
      },
      {
        "id": "51",
        "version": "C# 1.0",
        "topic": "Global variable clarification",
        "articulation": "C# does not have traditional global variables; values declared at class level are fields, and static fields can provide type-level shared state.",
        "syntax": "public static string AppName;",
        "myArticulation": "C# does not have traditional global variables like some languages. If I declare a variable at class or struct level, it is a field. If I make that field static, it belongs to the type and is shared by all instances within the same application process. For example, in my IncidentService, `static totalIncidents` is shared by all IncidentService objects, but it is not automatically shared between separate application instances."
      },
      {
        "id": "52",
        "version": "C# 1.0",
        "topic": "Constants",
        "articulation": "A constant is a value fixed at compile time and cannot be changed after declaration.",
        "syntax": "public class IncidentService\n{\n    private const int MaxRetryCount = 3;\n\n    public void ProcessIncident()\n    {\n        // MaxRetryCount = 5;  // ❌ Compile-time error\n    }\n}",
        "myArticulation": "A constant is a value that is fixed at compile time and cannot be changed after declaration. I use constants when a value should remain the same throughout the application logic. For example, in my IncidentService, if the maximum allowed incident retry count is always 3, I can define it as a `const` so no code can change that value. A const is implicitly static.so dont write as static const int MaxRetryCount = 3; // ❌ you can write const int MaxRetryCount = 3; and access it through the type when appropriate:  IncidentService.MaxRetryCount"
      },
      {
        "id": "53",
        "version": "C# 1.0",
        "topic": "Literals",
        "articulation": "A literal is a fixed value written directly in source code.",
        "syntax": "int incidentId = 101;              // 101 → integer literal\nstring status = \"Open\";            // \"Open\" → string literal\nbool isCritical = true;            // true → boolean literal\ndecimal amount = 2500.50m;         // 2500.50m → decimal literal\nchar grade = 'A';                  // 'A' → character literal",
        "myArticulation": "“A literal is a fixed value written directly in the source code. It represents the actual value assigned to a variable or used in an expression. For example, 101, \"Incident Created\", true, and 3.14 are literals.” int → type\nincidentId → variable\n101 → literal Literal = actual value written directly in the code."
      },
      {
        "id": "54",
        "version": "C# 1.0",
        "topic": "Primitive/value data types",
        "articulation": "C# provides built-in value types such as integral, floating-point, decimal, Boolean and character types.",
        "syntax": "int, long, float, double, decimal, bool, char",
        "myArticulation": "C# provides several built-in value types for representing data directly. They include integral types for whole numbers, floating-point types for approximate decimal values, decimal for high-precision financial calculations, bool for true or false values, and char for a single character."
      },
      {
        "id": "55",
        "version": "C# 1.0",
        "topic": "sbyte / byte",
        "articulation": "These are small unsigned/signed integral types useful when the required numeric range is small or when working with raw data.",
        "syntax": "byte sensorValue = 250; Suppose a medical device sends a single byte representing a sensor reading: byte is appropriate because the value is between 0 and 255 and we don't need negative numbers.",
        "myArticulation": "C# provides smaller signed and unsigned integral types such as byte, sbyte, short, and ushort. I use them when the numeric range I need is small, or when I am working with raw data such as bytes from a file, network stream, or image. For example, if I receive raw binary data from a healthcare device, I can use byte to represent each value because a byte stores a small non-negative number."
      },
      {
        "id": "56",
        "version": "C# 1.0",
        "topic": "short / ushort",
        "articulation": "These are 16-bit integral types used when their specific range is appropriate.",
        "syntax": "short temperatureOffset = -25;\nshort patientAgeInMonths = 240;",
        "myArticulation": "short is a signed integral value type used when I need to store whole numbers in a smaller range than int, including both positive and negative values. For example, if a medical device sends a temperature adjustment value that can be positive or negative, I can use short."
      },
      {
        "id": "57",
        "version": "C# 1.0",
        "topic": "int",
        "articulation": "int is the commonly used 32-bit signed integral type for whole numbers.",
        "syntax": "int incidentId = 101;\nint incidentCount = 250;\nint temperatureOffset = -10;",
        "myArticulation": "int is a signed 32-bit integral value type used to store whole numbers, including both negative and positive values. It is the most commonly used integral type in C# when I don't have a specific reason to use a smaller or larger integer type. For example, in my IncidentService, I can use int to store an Incident ID or an incident count."
      },
      {
        "id": "58",
        "version": "C# 1.0",
        "topic": "long",
        "articulation": "Long is a signed 64-bit integral type that I use when a whole-number value can exceed the range of int. For example, in a healthcare application, I could use long for a large transaction ID or the size of a large medical imaging file in bytes.”",
        "syntax": "long transactionId = 9876543210123;\nlong totalRecords = 5000000000;\nlong offset = -10000000000;",
        "myArticulation": "long is a signed 64-bit integral value type used when the value may exceed the range of int. It can store very large whole numbers, both positive and negative. For example, in my healthcare application, if I have a very large number of records or a system-wide transaction ID that can grow beyond the int range, I can use long"
      },
      {
        "id": "59",
        "version": "C# 1.0",
        "topic": "float",
        "articulation": "For example, in a healthcare application, a monitoring device may continuously send sensor values such as temperature or oxygen level. If the application needs fractional values but doesn't require very high precision, I can use float. Since decimal literals are double by default in C#, I add the f suffix.",
        "syntax": "float temperature = 98.6f;\nfloat sensorReading = 72.5f;",
        "myArticulation": "float is a 32-bit single-precision floating-point value type used to store numbers with fractional or decimal values. In C#, a decimal numeric literal is treated as double by default, so when I want to explicitly use a float, I normally add the f or F suffix. For example, if my healthcare application receives a sensor reading where high precision is not required, I can use float.  why f  float temperature = 98.6;   // ❌ normally gives a compile-time error because 98.6 is a double literal. float has less precision than double, so use it when its precision/range is sufficient.Suppose a patient-monitoring device continuously sends a body temperature reading: float bodyTemperature = 98.6f;Here, float is suitable when the application only needs reasonable precision for a sensor value and doesn't require the higher precision of double."
      },
      {
        "id": "60",
        "version": "C# 1.0",
        "topic": "double",
        "articulation": "double represents double-precision floating-point numbers and is commonly used for general fractional calculations.",
        "syntax": "double totalResponseTime = 125.75;\ndouble averageResponseTime = totalResponseTime / 10; double bloodPressureValue = 120.75;",
        "myArticulation": "double is a 64-bit double-precision floating-point value type used for numbers with fractional values when I need more range and precision than float. In my healthcare application, I can use double for measurements such as dosage calculations, sensor readings, or statistical calculations where higher precision is useful.”"
      },
      {
        "id": "61",
        "version": "C# 1.0",
        "topic": "decimal",
        "articulation": "decimal provides higher decimal precision and is commonly preferred for financial or monetary calculations.",
        "syntax": "decimal treatmentCost = 12500.75m;\ndecimal insuranceAmount = 10000.25m;\n\ndecimal patientPayable = treatmentCost - insuranceAmount;",
        "myArticulation": "decimal is a 128-bit value type designed for high-precision decimal calculations. It is commonly used for financial and monetary calculations because it provides better decimal precision and avoids many of the rounding issues associated with binary floating-point types like float and double. For example, in a healthcare application, I can use decimal for billing amounts, treatment costs, or insurance claim amounts. Why m?\nA decimal literal needs the m or M suffix: decimal amount = 12500.75m; without m  decimal amount = 12500.75;   // ❌ decimal variable cannot directly take double literal"
      },
      {
        "id": "62",
        "version": "C# 1.0",
        "topic": "bool",
        "articulation": "bool represents a logical value with only true or false.",
        "syntax": "bool isCritical = true;\nbool isIncidentSaved = false;\nbool isPatientValid = true;",
        "myArticulation": "bool is a value type used to represent a logical condition, and it can have only two values: true or false. I use it whenever I need to represent whether something is enabled, valid, completed, or meets a condition. For example, in my IncidentService, I can use a bool to indicate whether an incident is critical or whether it has been successfully saved."
      },
      {
        "id": "63",
        "version": "C# 1.0",
        "topic": "char",
        "articulation": "char represents a single UTF-16 character.",
        "syntax": "char priority = 'H';\nchar genderCode = 'M';\nchar grade = 'A';",
        "myArticulation": "char is a 16-bit value type that represents a(Unicode Transformation Format) UTF-16 code unit. I use it when I need to store a single character, such as a grade, status code, or priority indicator. For example, in my healthcare application, I can use a char to represent an incident priority like H for High."
      },
      {
        "id": "64",
        "version": "C# 1.0",
        "topic": "string",
        "articulation": "string is a reference type used to represent text and is immutable.",
        "syntax": "string name string patientName = \"Ravi Kumar\";\nstring incidentDescription = \"Medication delay\";\nstring status = \"Open\"; \"Deepthi\";",
        "myArticulation": "string is a reference type used to represent a sequence of characters. In C#, strings are immutable, which means once a string object is created, its contents cannot be changed. If I appear to modify a string, C# actually creates a new string object. For example, in my healthcare application, I can use a string to store a patient name, incident description, or status. string status = \"Open\"; If I do: status = \"Closed\"; I'm not modifying the existing \"Open\" string. A new string value \"Closed\" is assigned to the variable.string status = \"Open\";\nstatus += \" - Resolved\"; Because strings are immutable, this creates a new string rather than modifying the original string"
      },
      {
        "id": "65",
        "version": "C# 1.0",
        "topic": "object",
        "articulation": "object is the ultimate base type in C#, so a variable of type object can reference values of any C# type, with boxing where necessary for value types.",
        "syntax": "int incidentId = 101;\n\nobject value = incidentId;   // Boxing The object variable now refers to a boxed copy of 101. If you later need the original value type: int id = (int)value;   // Unboxing",
        "myArticulation": "object is the ultimate base type in C#, so every C# type ultimately derives from System.Object. Because of this, a variable declared as object can reference an instance of any type. If I assign a value type such as int to an object, boxing happens and the value is wrapped in an object. For example, in my IncidentService, I can use an object variable when I need to temporarily hold different types of values."
      },
      {
        "id": "66",
        "version": "C# 1.0",
        "topic": "Value types",
        "articulation": "A value type variable contains its value directly, and assigning it to another variable normally copies that value.",
        "syntax": "int priority1 = 2;\nint priority2 = priority1;\nHealthcare example with struct PatientVitals v1 = new PatientVitals(); v1.Bloodpressure = 100;\nPatientVitals v2 = v1;\n\nv2.BloodPressure = 150;\npriority2 = 5;  so v1.bp = 100 and v2.bp = 150 cz both are differnt object so they have their own copy",
        "myArticulation": "A value type variable contains its value directly, and when I assign it to another variable, the value is normally copied. So both variables have their own independent values, and changing one doesn't affect the other. Examples of value types include int, bool, char, struct, and enum."
      },
      {
        "id": "67",
        "version": "C# 1.0",
        "topic": "Reference types",
        "articulation": "A reference type variable holds a reference to an object, so two variables can refer to the same object.",
        "syntax": "Incident incident1 = new Incident();\nincident1.Status = \"Open\";\n\nIncident incident2 = incident1;\n\nincident2.Status = \"Closed\";",
        "myArticulation": "A reference type variable holds a reference to an object, so when I assign one reference variable to another, both variables can refer to the same object. Because they refer to the same object, changing the object's state through one variable is visible through the other variable. Classes, arrays, delegates, and strings are examples of reference types"
      },
      {
        "id": "68",
        "version": "C# 1.0",
        "topic": "Nullable value type",
        "articulation": "Nullable value types allow value types such as int to also represent null.",
        "syntax": "int? incidentPriority = null;\n\nincidentPriority = 2; int normally cannot be null: int priority = null;   // ❌ but int? priority = null;  // ✅",
        "myArticulation": "In my healthcare application, an incident may not have a priority assigned initially. Since int normally cannot represent null, I can use int? to represent either a priority value or the absence of a value."
      },
      {
        "id": "69",
        "version": "C# 1.0",
        "topic": "null",
        "articulation": "null represents the absence of an object/reference value; nullable value types can also represent null.",
        "syntax": "Physician physician = null;\n\nif (physician == null)\n{\n    Console.WriteLine(\"No physician assigned\");\n}",
        "myArticulation": "null represents the absence of a value or a reference to an object. For reference types, a variable can contain null when it isn't referring to any object. For nullable value types, null means that the value is not currently present. For example, in my healthcare application, an incident may not have a physician assigned yet, so the physician reference can be null."
      },
      {
        "id": "70",
        "version": "C# 1.0",
        "topic": "Type conversion",
        "articulation": "C# supports implicit and explicit conversions between compatible types.",
        "syntax": "int incidentCount = 100;\nlong totalIncidents = incidentCount; Smaller range → larger compatible range: int → long No cast is required. The value 100 can safely fit into long.",
        "myArticulation": "C# supports implicit and explicit conversions between compatible types. An implicit conversion happens automatically when the conversion is safe and there is no significant risk of losing information. An explicit conversion requires me to tell the compiler to perform the conversion using a cast, usually when data loss or narrowing is possible."
      },
      {
        "id": "71",
        "version": "C# 1.0",
        "topic": "Implicit conversion",
        "articulation": "An implicit conversion is allowed automatically when the conversion is considered safe without explicit casting.",
        "syntax": "int incidentCount = 100;\nlong totalIncidents = incidentCount; Smaller range → larger compatible range: int → long No cast is required. The value 100 can safely fit into long. long totalIncidents = 1000;\nint incidentCount = (int)totalIncidents; Larger range → smaller range: This is an explicit conversion.",
        "myArticulation": "C# supports implicit and explicit conversions between compatible types. An implicit conversion happens automatically when the conversion is safe and there is no significant risk of losing information . Implicit → compiler converts automatically → generally safe"
      },
      {
        "id": "72",
        "version": "C# 1.0",
        "topic": "Explicit conversion / casting",
        "articulation": "Explicit casting is required when the conversion may lose information or isn't automatically allowed.",
        "syntax": "long totalIncidents = 1000;\nint incidentCount = (int)totalIncidents; Larger range → smaller range: This is an explicit conversion.  long value = 5000000000;\nint result = (int)value; The value is outside the int range, so the conversion can produce an incorrect/truncated result.",
        "myArticulation": "An explicit conversion requires me to tell the compiler to perform the conversion using a cast, usually when data loss or narrowing is possible . Explicit conversion can cause data loss: Explicit → developer uses cast → possible data loss"
      },
      {
        "id": "73",
        "version": "C# 1.0",
        "topic": "Convert",
        "articulation": "Convert provides methods for converting values between common types.",
        "syntax": "Suppose an API or configuration gives me an incident count as a string: string countFromApi = \"125\";\n\nint incidentCount = Convert.ToInt32(countFromApi);",
        "myArticulation": "Convert provides built-in methods for converting values between common data types. I can use methods such as Convert.ToInt32, Convert.ToDouble, Convert.ToDecimal, and Convert.ToString. It is useful when the input type or value needs to be converted into the type required by my application. Convert → built-in conversion methods → ToInt32, ToDecimal, ToDouble, ToString, etc."
      },
      {
        "id": "74",
        "version": "C# 1.0",
        "topic": "Parse",
        "articulation": "Parse converts a valid string representation into a target type and throws if the input is invalid.",
        "syntax": "string incidentIdText = \"101\"; int incidentId = int.Parse(incidentIdText); → 101 becomes 101. Invalid: int.Parse(\"ABC\") → FormatException. Memory: Parse → string → target type → invalid input → exception.",
        "myArticulation": "Parse converts a valid string representation into a target type. If the input cannot be converted, it throws an exception. In my healthcare application, if an Incident ID comes from an input field as \"101\", I can use int.Parse() to convert it to an integer. If the input is \"ABC\", Parse throws a FormatException. I use Parse when I expect the input to be valid."
      },
      {
        "id": "75",
        "version": "C# 1.0",
        "topic": "TryParse",
        "articulation": "TryParse attempts conversion without throwing for normal invalid input and returns success/failure through a Boolean result.",
        "syntax": "bool success = int.TryParse(\"ABC\", out int incidentId); → success = false. Memory: TryParse → string → target type → success/failure, no exception for invalid format.",
        "myArticulation": "TryParse also converts a string into a target type, but instead of throwing an exception for invalid input, it returns true or false and provides the converted value through an out parameter. In my healthcare application, if an Incident ID comes from user input and may be invalid, I can use TryParse safely."
      },
      {
        "id": "76",
        "version": "C# 1.0",
        "topic": "int.TryParse()",
        "articulation": "int.TryParse() to check whether it can be converted to an integer",
        "syntax": "if (int.TryParse(incidentIdText, out int incidentId))\n{\n    // Valid Incident ID\n}",
        "myArticulation": "If an Incident ID comes from user input, I don't assume that it is valid. I can use int.TryParse() to check whether it can be converted to an integer. Similarly, if a date comes from an input field, I can use DateTime.TryParse() rather than directly calling Parse() and risking an exception.”"
      },
      {
        "id": "77",
        "version": "C# 1.0",
        "topic": "DateTime.TryParse()",
        "articulation": "if a date comes from an input field, I can use DateTime.TryParse() rather than directly calling Parse() and risking an exception.",
        "syntax": "if (DateTime.TryParse(dateText, out DateTime incidentDate))\n{\n    // Valid date\n}",
        "myArticulation": "TryParse = validate + convert + true/false + no exception for invalid format."
      },
      {
        "id": "78",
        "version": "C# 1.0",
        "topic": "Arithmetic operators",
        "articulation": "Arithmetic operators perform numeric calculations.",
        "syntax": "int totalIncidents = 100 + 20;      // 120\nint remaining = 100 - 20;           // 80\nint totalCost = 100 * 5;             // 500\nint average = 100 / 5;               // 20\nint remainder = 101 % 10;            // 1",
        "myArticulation": "Arithmetic operators are used to perform numeric calculations. The main arithmetic operators are + addition, - subtraction, * multiplication, / division, and % modulus, which gives the remainder. In my healthcare application, I can use them for calculations such as incident counts, response times, or billing amounts."
      },
      {
        "id": "79",
        "version": "C# 1.0",
        "topic": "Relational operators",
        "articulation": "Relational operators compare values and produce a Boolean result.",
        "syntax": "int priority = 5;\n\nbool result1 = priority == 5;   // true\nbool result2 = priority != 3;   // true\nbool result3 = priority > 3;    // true\nbool result4 = priority < 10;   // true\nbool result5 = priority >= 5;   // true\nbool result6 = priority <= 4;   // false",
        "myArticulation": "Relational operators are used to compare two values, and the result is always a Boolean value, either true or false. They are commonly used in conditions and decision-making. In my healthcare application, I can compare an incident priority, patient age, or response time to determine whether a condition is satisfied."
      },
      {
        "id": "80",
        "version": "C# 1.0",
        "topic": "Logical operators",
        "articulation": "Logical operators combine Boolean conditions.",
        "syntax": "int priority = 5;\nbool isCritical = true;\n\nbool escalate = priority >= 5 && isCritical;",
        "myArticulation": "Logical operators are used to combine or negate Boolean conditions, and the result is also a Boolean value. The main logical operators are && for AND, || for OR, and ! for NOT. In my healthcare application, I can combine conditions to determine whether an incident needs immediate escalation."
      },
      {
        "id": "81",
        "version": "C# 1.0",
        "topic": "Assignment operators",
        "articulation": "Assignment operators assign or update values.",
        "syntax": "int incidentCount = 10;   // =\nincidentCount += 5;       // 15\nincidentCount -= 2;       // 13\nincidentCount *= 2;       // 26\nincidentCount /= 2;       // 13\nincidentCount %= 5;       // 3",
        "myArticulation": "Assignment operators are used to assign a value to a variable or update its existing value. The basic assignment operator is =, and C# also provides compound assignment operators such as +=, -=, *=, /=, and %=. In my healthcare application, I can use them to update incident counts, costs, or other values."
      },
      {
        "id": "82",
        "version": "C# 1.0",
        "topic": "Increment/decrement",
        "articulation": "++ and -- increase or decrease a numeric value by one.",
        "syntax": "int incidentCount = 10;\n\nincidentCount++;   // 11\nincidentCount--;   // 10",
        "myArticulation": "the ++ and -- are increment and decrement operators. ++ increases a numeric value by one, and -- decreases it by one. In my healthcare application, I can use them to increment an incident count when a new incident is created or decrement a counter when an item is processed."
      },
      {
        "id": "83",
        "version": "C# 1.0",
        "topic": "Equals()",
        "articulation": "Equals() is used to determine whether two objects or values are considered equal",
        "syntax": "bool result = object.Equals(value1, value2);",
        "myArticulation": "Equals() is used to determine whether two objects or values are considered equal. object.Equals() is part of the base System.Object functionality, and types can override it to define their equality behavior"
      },
      {
        "id": "84",
        "version": "C# 1.0",
        "topic": "string.IsNullOrEmpty()",
        "articulation": "string.IsNullOrEmpty() checks whether a string is either null or an empty string.",
        "syntax": "if (string.IsNullOrEmpty(incidentDescription))\n{\n    // Invalid or missing description\n}",
        "myArticulation": "string.IsNullOrEmpty() checks whether a string is either null or an empty string. In my healthcare application, I can use it to validate an incident description or patient name before processing it."
      },
      {
        "id": "85",
        "version": "C# 1.0",
        "topic": "string.IsNullOrWhiteSpace()",
        "articulation": "string.IsNullOrWhiteSpace() is similar, but it also treats a string containing only spaces or other whitespace as empty.",
        "syntax": "if (string.IsNullOrWhiteSpace(incidentDescription))\n{\n    // Missing or whitespace-only description\n}",
        "myArticulation": "string.IsNullOrWhiteSpace() is similar, but it also treats a string containing only spaces or other whitespace as empty."
      },
      {
        "id": "86",
        "version": "C# 1.0",
        "topic": "Conditional operator",
        "articulation": "The ternary operator is a short form for a simple two-way condition.",
        "syntax": "bool isCritical = true; string status = isCritical ? \"Critical\" : \"Normal\"; → true = \"Critical\", false = \"Normal\". Memory: condition ? trueValue : falseValue",
        "myArticulation": "The ternary operator is a short form of a simple two-way if-else condition. It checks a Boolean condition and returns one value when the condition is true and another when it is false. In my healthcare application, I can use it to determine an incident status based on whether the incident is critical"
      },
      {
        "id": "87",
        "version": "C# 1.0",
        "topic": "if",
        "articulation": "if executes a block when its condition evaluates to true.",
        "syntax": "if (isCritical) { EscalateIncident(); } Memory: if → condition true → execute block",
        "myArticulation": "The if statement executes a block of code only when its condition evaluates to true. I use it when I need to perform an action based on a specific condition. For example, in my healthcare application, I can check whether an incident is critical and escalate it only when the condition is true."
      },
      {
        "id": "88",
        "version": "C# 1.0",
        "topic": "if-else",
        "articulation": "if-else provides two alternative execution paths.",
        "syntax": "if (isCritical) { EscalateIncident(); } else { ProcessNormally(); } Memory: true → if block; false → else block",
        "myArticulation": "The if-else statement provides two alternative execution paths. If the condition is true, the if block executes; otherwise, the else block executes. For example, in my healthcare application, I can check whether an incident is critical and either escalate it or continue normal processing."
      },
      {
        "id": "89",
        "version": "C# 1.0",
        "topic": "else-if",
        "articulation": "else-if allows multiple conditions to be checked sequentially.",
        "syntax": "if (priority >= 5) { status = \"Critical\"; } else if (priority >= 4) { status = \"High\"; } else if (priority >= 2) { status = \"Medium\"; } else { status = \"Low\"; } Memory: Check top → first true → execute → skip remaining",
        "myArticulation": "An else-if statement allows me to check multiple conditions sequentially. C# evaluates the conditions from top to bottom, and when it finds the first condition that is true, it executes that block and skips the remaining conditions. For example, in my healthcare application, I can classify an incident as Critical, High, Medium, or Low based on its priority."
      },
      {
        "id": "90",
        "version": "C# 1.0",
        "topic": "Else-if ladder",
        "articulation": "An else-if ladder checks multiple conditions from top to bottom and executes the first matching branch.",
        "syntax": "if (priority >= 5) { status = \"Critical\"; } else if (priority >= 4) { status = \"High\"; } else if (priority >= 2) { status = \"Medium\"; } else { status = \"Low\"; } Memory: Top → first true → execute → skip remaining",
        "myArticulation": "An else-if ladder checks multiple conditions sequentially from top to bottom. It executes the first condition that evaluates to true and skips the remaining branches. If none of the conditions are true, the final else block executes, if provided. For example, in my healthcare application, I can classify an incident based on its priority."
      },
      {
        "id": "91",
        "version": "C# 1.0",
        "topic": "Nested if",
        "articulation": "A nested if is a conditional statement placed inside another conditional block.",
        "syntax": "if (isCritical) { if (requiresEscalation) { EscalateIncident(); } } Memory: Outer condition true → check inner condition → execute if inner is true",
        "myArticulation": "A nested if is an if statement placed inside another conditional block. I use it when the second condition needs to be checked only after the first condition is satisfied. For example, in my healthcare application, I can first check whether an incident is critical and then check whether it requires immediate escalation."
      },
      {
        "id": "92",
        "version": "C# 1.0",
        "topic": "switch",
        "articulation": "switch selects a branch based on the value of an expression.",
        "syntax": "switch (status) { case \"Open\": ProcessOpen(); break; case \"Closed\": ArchiveIncident(); break; case \"Pending\": ReviewIncident(); break; default: HandleUnknownStatus(); break; } Memory: Expression value → matching case → execute branch",
        "myArticulation": "The switch statement selects a branch based on the value of an expression. It is useful when I need to handle multiple known values without writing many separate if-else conditions. For example, in my healthcare application, I can use switch to process different incident statuses."
      },
      {
        "id": "93",
        "version": "C# 1.0",
        "topic": "switch case",
        "articulation": "A case defines one possible value or branch in a traditional switch statement.",
        "syntax": "switch (status) { case \"Open\": ProcessOpen(); break; case \"Closed\": CloseIncident(); break; case \"Pending\": ReviewIncident(); break; } Memory: case → possible value → matching branch executes",
        "myArticulation": "A case defines one possible value or branch in a traditional switch statement. C# compares the switch expression with each case, and when a matching case is found, its associated code executes. For example, in my healthcare application, I can define separate cases for Open, Closed, and Pending incident statuses."
      },
      {
        "id": "94",
        "version": "C# 1.0",
        "topic": "default",
        "articulation": "default provides a fallback branch when no switch case matches.",
        "syntax": "switch (status) { case \"Open\": ProcessOpen(); break; case \"Closed\": CloseIncident(); break; default: HandleUnknownStatus(); break; } Memory: No case matches → default executes",
        "myArticulation": "The default branch provides a fallback when none of the case values match the switch expression. It is optional, but I can use it to handle unexpected or unsupported values. For example, in my healthcare application, if an incident status is not one of the expected statuses, I can handle it through the default branch."
      },
      {
        "id": "95",
        "version": "C# 1.0",
        "topic": "break",
        "articulation": "break immediately exits the current loop or traditional switch statement.",
        "syntax": "switch (status) { case \"Open\": ProcessOpen(); break; case \"Closed\": CloseIncident(); break; default: HandleUnknownStatus(); break; } Memory: break → exit nearest loop or switch",
        "myArticulation": "The break statement immediately terminates the nearest enclosing loop or switch statement and continues execution with the statement after it. In a switch, I commonly use break to stop execution of the current case. In my healthcare application, once the matching incident status is processed, break exits the switch."
      },
      {
        "id": "96",
        "version": "C# 1.0",
        "topic": "continue",
        "articulation": "continue skips the remaining code in the current loop iteration and moves to the next iteration.",
        "syntax": "foreach (var incident in incidents) { if (!incident.IsValid) continue; ProcessIncident(incident); } Memory: continue → skip current iteration → move to next iteration;",
        "myArticulation": "The continue statement skips the remaining code in the current loop iteration and moves directly to the next iteration. In my healthcare application, if I find an invalid incident record while processing a list, I can use continue to skip that record and continue processing the remaining incidents"
      },
      {
        "id": "97",
        "version": "C# 1.0",
        "topic": "goto / Label",
        "articulation": "goto Retry; → Retry: Console.WriteLine(\"Retrying...\"); Memory: goto → jump to label within the same method",
        "syntax": "goto Retry; → Retry: Console.WriteLine(\"Retrying...\"); Memory: goto → jump to label within the same method",
        "myArticulation": "The goto statement transfers execution directly to a labeled statement in the same method. A label is an identifier followed by a colon. Although goto is supported in C#, I generally avoid it in application code because structured constructs such as if, switch, and loops usually make the code easier to understand and maintain. It can be useful in a few specific control-flow scenarios."
      },
      {
        "id": "98",
        "version": "C# 1.0",
        "topic": "for loop",
        "articulation": "for is useful when I know or control the iteration using initialization, condition and increment/decrement.",
        "syntax": "for (int i = 0; i < incidents.Count; i++) { ProcessIncident(incidents[i]); } Memory: for → initialization → condition → body → increment/decrement → repeat",
        "myArticulation": "A for loop is useful when I have a counter or when I need clear control over the initialization, condition, and increment or decrement of each iteration. In my healthcare application, I can use it when processing a fixed number of incident records or when I need to access records by index"
      },
      {
        "id": "99",
        "version": "C# 1.0",
        "topic": "foreach loop",
        "articulation": "foreach iterates through elements of a collection without manually managing the index.",
        "syntax": "foreach (var incident in incidents) { ProcessIncident(incident); } Memory: foreach → each element → no manual index management",
        "myArticulation": "A foreach loop iterates through each element of a collection without requiring me to manually manage the index. In my healthcare application, I can use it to process each incident in an incident collection when I don't need direct index-based access."
      },
      {
        "id": "100",
        "version": "C# 1.0",
        "topic": "while loop",
        "articulation": "while repeatedly executes while its condition remains true and may execute zero times.",
        "syntax": "while (retryCount < 3) { RetryRequest(); retryCount++; } Memory: Check condition first → true = execute → false = stop; can execute zero time",
        "myArticulation": "A while loop repeatedly executes a block of code as long as its condition remains true. Because the condition is checked before the loop body executes, the loop can execute zero times if the condition is initially false. In my healthcare application, I can use it when I need to continue processing while a particular condition remains valid"
      },
      {
        "id": "101",
        "version": "C# 1.0",
        "topic": "do-while loop",
        "articulation": "do-while executes the body first and checks the condition afterward, so it executes at least once.",
        "syntax": "do { retryCount++; RetryRequest(); } while (retryCount < 3); Memory: Execute first → check condition → true = repeat, false = stop → at least once",
        "myArticulation": "A do-while loop executes the loop body first and checks the condition afterward. Because the condition is checked after the first execution, the loop always executes at least once. In my healthcare application, I can use it when an operation must happen once before I decide whether it should continue."
      },
      {
        "id": "102",
        "version": "C# 1.0",
        "topic": "Nested loops",
        "articulation": "A nested loop is a loop inside another loop and is commonly used for multidimensional data or combinations.",
        "syntax": "for (int i = 0; i < rows; i++) { for (int j = 0; j < columns; j++) { Process(data[i, j]); } } Memory: Outer loop → inner loop runs completely → next outer iteration",
        "myArticulation": "A nested loop is a loop placed inside another loop. The inner loop completes its iterations for each iteration of the outer loop. In my healthcare application, I can use nested loops to process multidimensional data, such as patient measurements stored in rows and columns, or to compare combinations of records."
      },
      {
        "id": "103",
        "version": "C# 1.0",
        "topic": "Single-dimensional array",
        "articulation": "A single-dimensional array stores a fixed-size sequence of elements of the same type with zero-based indexing.",
        "syntax": "int[] patientIds = new int[5]; patientIds[0] = 101; patientIds[1] = 102; Memory: Array → same type → fixed size → zero-based index → last index = Length - 1",
        "myArticulation": "A single-dimensional array stores a fixed-size sequence of elements of the same type using zero-based indexing. In my healthcare application, if I know I need to store exactly five patient IDs, I can use an integer array. Once the array is created, its size cannot be changed"
      },
      {
        "id": "104",
        "version": "C# 1.0",
        "topic": "Array initialization",
        "articulation": "Arrays can be initialized with a fixed size or directly with values.",
        "syntax": "Fixed size: int[] patientIds = new int[5]; Direct values: int[] patientIds = { 101, 102, 103 }; Memory: Size specified → fixed capacity; values specified → compiler determines size",
        "myArticulation": "An array can be initialized by specifying its size or by directly providing its values. When I specify the size, C# creates an array with that fixed number of elements. When I provide values directly, C# determines the array size from the number of values. In my healthcare application, I can use either approach depending on whether I know the required number of elements or already have the data."
      },
      {
        "id": "105",
        "version": "C# 1.0",
        "topic": "Array indexing",
        "articulation": "Array indexes start at zero and the final valid index is Length - 1.",
        "syntax": "int[] patientIds = { 101, 102, 103 }; → patientIds[0] = 101, patientIds[1] = 102, patientIds[2] = 103. patientIds[3] → IndexOutOfRangeException. Memory: First index = 0; last index = Length - 1",
        "myArticulation": "Array indexing is used to access individual elements of an array. C# arrays use zero-based indexing, so the first element is at index 0 and the last element is at Length - 1. In my healthcare application, if I store patient IDs in an array, I can access a specific patient ID using its index"
      },
      {
        "id": "106",
        "version": "C# 1.0",
        "topic": "Array length",
        "articulation": "Length returns the total number of elements in an array.",
        "syntax": "int[] patientIds = { 101, 102, 103, 104, 105 }; int count = patientIds.Length; → count = 5. Memory: Length → total elements; last index = Length - 1",
        "myArticulation": "The Length property returns the total number of elements in an array. I can use it to determine the array size or control loops when processing all elements. In my healthcare application, if I have an array containing five patient IDs, Length returns 5."
      },
      {
        "id": "107",
        "version": "C# 1.0",
        "topic": "2D array",
        "articulation": "A two-dimensional rectangular array stores values using row and column indexes.",
        "syntax": "int[,] vitals = new int[3, 2]; → vitals[0, 0] = 120; vitals[0, 1] = 80; Memory: [,] → rows + columns → same column count for every row → access using [row, column]",
        "myArticulation": "A two-dimensional rectangular array stores elements in rows and columns, and every row has the same number of columns. I access an element using two indexes: row and column. In my healthcare application, I can use it to represent tabular data such as patient measurements recorded across multiple days and different parameters."
      },
      {
        "id": "108",
        "version": "C# 1.0",
        "topic": "Multidimensional array",
        "articulation": "A multidimensional rectangular array can have more than two dimensions.",
        "syntax": "double[,,] measurements = new double[10, 7, 3]; → [patient, day, measurementType]. Example: measurements[0, 1, 2] = 98.6; Memory: [,] → 2D; [,,] → 3D; more commas → more dimensions",
        "myArticulation": "A multidimensional rectangular array can have more than two dimensions, such as three or four dimensions. Each dimension has a fixed size, and every row or section follows the same structure. In my healthcare application, I could use a three-dimensional array to represent data such as patients, days, and measurement types."
      },
      {
        "id": "109",
        "version": "C# 1.0",
        "topic": "Jagged array",
        "articulation": "A jagged array is an array whose elements are themselves arrays, so each inner array can have a different length.",
        "syntax": "int[][] data int[][] patientMeasurements = new int[3][]; patientMeasurements[0] = new int[] { 120, 80 }; patientMeasurements[1] = new int[] { 110, 70, 98 }; patientMeasurements[2] = new int[] { 130 }; Memory: int[][] → array of arrays → each inner array can have different length new int[3][];",
        "myArticulation": "A jagged array is an array whose elements are themselves arrays, so each inner array can have a different length. I use it when the amount of data is different for each group. For example, in my healthcare application, different patients may have different numbers of recorded measurements, so each patient's inner array can have its own length."
      },
      {
        "id": "110",
        "version": "C# 1.0",
        "topic": "Array vs jagged array",
        "articulation": "A rectangular array has fixed dimensions for all rows, while a jagged array contains separate arrays that can have different lengths.",
        "syntax": "Rectangular: int[,] data = new int[3, 4]; → 3 rows × 4 columns, same size for every row. Jagged: int[][] data = new int[3][]; data[0] = new int[2]; data[1] = new int[4]; data[2] = new int[1]; → different row lengths. Memory: Rectangular = fixed rows/columns; Jagged = array of arrays, variable inner lengths.",
        "myArticulation": "A rectangular array has fixed dimensions, so every row has the same number of columns. A jagged array is an array of separate arrays, so each inner array can have a different length. In my healthcare application, I would use a rectangular array for consistent tabular data and a jagged array when each patient or group can have a different number of records"
      },
      {
        "id": "111",
        "version": "C# 1.0",
        "topic": "ArrayList awareness",
        "articulation": "ArrayList is an older non-generic collection; modern code normally prefers List<T> for type safety and reduced boxing.",
        "syntax": "Old: ArrayList ids = new ArrayList(); ids.Add(101); ids.Add(\"ABC\"); Modern: List<int> ids = new List<int>(); ids.Add(101); Memory: ArrayList → non-generic → object → possible boxing; List<T> → generic → type-safe",
        "myArticulation": "ArrayList is an older non-generic collection that can store elements of different types because it works with object. In modern C# code, I normally prefer List<T> because generics provide compile-time type safety and avoid unnecessary boxing and unboxing for value types. For example, instead of using an ArrayList for incident IDs, I would use List<int>."
      },
      {
        "id": "112",
        "version": "C# 1.0",
        "topic": "Hashtable awareness",
        "articulation": "Hashtable is an older non-generic key/value collection; modern code normally prefers Dictionary<TKey,TValue>.",
        "syntax": "Old: Hashtable incidents = new Hashtable(); incidents[101] = \"Open\"; Modern: Dictionary<int, string> incidents = new Dictionary<int, string>(); incidents[101] = \"Open\"; Memory: Hashtable → non-generic → object; Dictionary<TKey,TValue> → generic → type-safe",
        "myArticulation": "Hashtable is an older non-generic key/value collection that stores keys and values as object. In modern C# code, I normally prefer Dictionary<TKey,TValue> because generics provide compile-time type safety and avoid unnecessary casting and boxing for value types. For example, instead of using a Hashtable for incident status by ID, I would use a Dictionary<int, string>"
      },
      {
        "id": "113",
        "version": "C# 1.0",
        "topic": "String immutability",
        "articulation": "A string cannot be modified after creation; operations that appear to modify it create another string.",
        "syntax": "string status = \"Open\"; status = \"Closed\"; → \"Open\" remains unchanged; status now references a new string. Memory: string → immutable → modification creates a new string",
        "myArticulation": "A string is immutable, which means once a string object is created, its contents cannot be changed. When an operation appears to modify a string, C# actually creates a new string object and the variable refers to that new object. For example, if I update an incident status from Open to Closed, the original string is not modified; a new string is created.”"
      },
      {
        "id": "114",
        "version": "C# 1.0",
        "topic": "StringBuilder",
        "articulation": "StringBuilder is useful when repeatedly modifying or building large strings to avoid creating many intermediate string objects.",
        "syntax": "var report = new StringBuilder(); report.Append(\"Incident ID: 101\"); report.AppendLine(); report.Append(\"Status: Open\"); string result = report.ToString(); Memory: string → immutable → new object on modification; StringBuilder → mutable buffer → efficient repeated modifications",
        "myArticulation": "StringBuilder is useful when I need to repeatedly modify or build a string, because string is immutable and repeated concatenation can create multiple intermediate string objects. StringBuilder maintains a mutable character buffer, so I can append or modify content efficiently. For example, when generating a large incident report containing many incident records, I can use StringBuilder instead of repeatedly concatenating strings."
      },
      {
        "id": "115",
        "version": "C# 1.0",
        "topic": "Method parameters",
        "articulation": "Parameters are inputs supplied to a method and can be value, reference, ref, out, in, etc.",
        "syntax": "void Save(int idValue: void SaveIncident(int incidentId) ref: void UpdatePriority(ref int priority) out: bool TryGetPriority(int id, out int priority) in: void Validate(in PatientVitals vitals) Memory: Value → copy; ref → read/modify; out → method provides value; in → read-only reference",
        "myArticulation": "Parameters are inputs defined by a method to receive data from the caller. Depending on how I want the data to be passed, parameters can be passed by value or by reference using ref, out, or in. For example, an IncidentService method can receive an incident ID by value, update a priority using ref, return an additional value using out, or receive a large struct as a read-only reference using in"
      },
      {
        "id": "116",
        "version": "C# 1.0",
        "topic": "Return type",
        "articulation": "A method's return type specifies the type of value it gives back; void means it returns no value.",
        "syntax": "Value: public int GetIncidentCount() { return 10; } → returns int String: public string GetStatus() { return \"Open\"; } Void: public void SaveIncident() { /* save */ } → no value returned. Memory: Return type → what the method gives back; void → no return value",
        "myArticulation": "A method's return type specifies the type of value the method gives back to its caller. If a method does not return a value, I use void. The return statement is used to send a value back when the method has a non-void return type."
      },
      {
        "id": "117",
        "version": "C# 1.0",
        "topic": "Scope",
        "articulation": "Scope determines where a variable or member can be accessed in the program.",
        "syntax": "Local scope: void SaveIncident() { int priority = 1; } → priority is accessible only inside that method/block. Member: private int incidentCount; → accessible within the containing class. Block: if (isCritical) { int level = 1; } → level is accessible only inside that block. Memory: Scope → where a variable/member can be accessed",
        "myArticulation": "Scope determines where a variable or member can be accessed in the program. A local variable is accessible only within the method or block where it is declared, while a class member can be accessed according to its accessibility and the context in which it is defined. For example, a variable declared inside SaveIncident() cannot be directly accessed from another method"
      },
      {
        "id": "118",
        "version": "C# 1.0",
        "topic": "Lifetime",
        "articulation": "Lifetime describes how long a variable or object remains available during execution; it depends on whether it is local, an instance field, static field, etc.",
        "syntax": "Local: void Save() { int priority = 1; } → associated with the method execution. Instance: private int incidentCount; → associated with the object's lifetime. Static: private static int totalIncidents; → shared by instances within the process. Memory: Scope → where it can be accessed; Lifetime → how long it exists/retains its value",
        "myArticulation": "Lifetime describes how long a variable or object remains available during program execution. It depends on what kind of variable or member it is. A local variable normally exists during the execution of its scope, an instance field exists as long as its object is reachable, and a static field exists for the lifetime of the application process or type context. For example, each IncidentService object has its own instance field, while a static field is shared by instances within the same process."
      },
      {
        "id": "260",
        "version": "C# 1.0",
        "topic": "NullReferenceException",
        "articulation": "Accessing a member through a null reference",
        "syntax": "Example: Patient patient = null; string name = patient.Name; → NullReferenceException. Safe: string? name = patient?.Name; Check: if (patient != null) { Console.WriteLine(patient.Name); } Memory: null reference + instance member access → NullReferenceException",
        "myArticulation": "NullReferenceException occurs when I try to access an instance member through a reference that is null. In my Incident application, if an IncidentModel or related Patient object has not been assigned and I try to access its property, the runtime can throw this exception. I can prevent it by validating for null, using null-conditional operators where appropriate, or designing the code with nullable reference type analysis"
      },
      {
        "id": "261",
        "version": "C# 1.0",
        "topic": "ArgumentNullException",
        "articulation": "A method receives an unexpected null argument",
        "syntax": "Example: public void SaveIncident(IncidentModel incident) { if (incident == null) throw new ArgumentNullException(nameof(incident)); } Modern: ArgumentNullException.ThrowIfNull(incident); Memory: null argument → ArgumentNullException",
        "myArticulation": "ArgumentNullException occurs when a method receives null for a parameter that must not be null. I typically use it to validate method arguments at the beginning of a method, so the caller gets a clear indication that a required argument was missing. For example, if IncidentService requires an IncidentModel, I can throw ArgumentNullException when the model is null"
      },
      {
        "id": "262",
        "version": "C# 1.0",
        "topic": "ArgumentException",
        "articulation": "Argument value is invalid",
        "syntax": "public void SetPriority(int priority) { if (priority < 1",
        "myArticulation": "ArgumentException occurs when a method receives an argument that is invalid for the expected operation. The argument may be non-null, but its value is not acceptable. For example, if my IncidentService expects an incident priority between 1 and 5 and the caller provides 10, I can throw ArgumentException"
      },
      {
        "id": "263",
        "version": "C# 1.0",
        "topic": "ArgumentOutOfRangeException",
        "articulation": "Argument is outside an allowed range",
        "syntax": "`public void SetPriority(int priority) { if (priority < 1",
        "myArticulation": "ArgumentOutOfRangeException is a specialized form of ArgumentException that occurs when a method receives an argument whose value is outside the allowed range. For example, if my IncidentService accepts an incident priority only from 1 to 5 and the caller provides 10, I can throw ArgumentOutOfRangeException because the value is outside the valid range"
      },
      {
        "id": "264",
        "version": "C# 1.0",
        "topic": "DivideByZeroException",
        "articulation": "Division by zero",
        "syntax": "int totalIncidents = 100; int departments = 0; int average = totalIncidents / departments; → DivideByZeroException. Safe: if (departments != 0) { int average = totalIncidents / departments; } Memory: division by zero → DivideByZeroException",
        "myArticulation": "DivideByZeroException occurs when I attempt to divide an integral or decimal value by zero. In my healthcare application, if I calculate an average or rate and the denominator is zero, the operation can fail. I should validate the denominator before performing the calculation when zero is not a valid input."
      },
      {
        "id": "265",
        "version": "C# 1.0",
        "topic": "FormatException",
        "articulation": "String cannot be converted to expected format",
        "syntax": "Example: string incidentIdText = \"ABC\"; int incidentId = int.Parse(incidentIdText); → FormatException. Safer: bool success = int.TryParse(incidentIdText, out int incidentId); → false, no FormatException. Memory: wrong string format → FormatException; TryParse → false",
        "myArticulation": "FormatException occurs when I try to convert a value from a string representation, but the string is not in the expected format. For example, if an Incident ID is expected to be numeric but the input contains alphabetic characters, Parse can throw a FormatException. When invalid user input is expected, I can use TryParse instead."
      },
      {
        "id": "266",
        "version": "C# 1.0",
        "topic": "InvalidCastException",
        "articulation": "Invalid explicit/reference cast",
        "syntax": "bject value = \"101\"; int id = (int)value; → InvalidCastException. Safe check: if (value is int id) { ... } Reference conversion: var incident = value as IncidentModel; → null if incompatible. Memory: wrong runtime type cast → InvalidCastException",
        "myArticulation": "InvalidCastException occurs when I explicitly cast an object to a type that the actual object cannot be converted to. For example, if an object actually contains a string and I try to cast it directly to an int, the runtime throws InvalidCastException. I can use is or as when I need to safely check or attempt a compatible reference conversion."
      },
      {
        "id": "267",
        "version": "C# 1.0",
        "topic": "IndexOutOfRangeException",
        "articulation": "Array index is outside valid range",
        "syntax": "int[] incidentIds = { 101, 102, 103, 104, 105 }; int id = incidentIds[5]; → IndexOutOfRangeException. Valid: incidentIds[0] to incidentIds[4]. Memory: invalid array index → IndexOutOfRangeException",
        "myArticulation": "IndexOutOfRangeException occurs when I try to access an array or similar indexed collection using an index outside its valid range. Since C# arrays are zero-based, the valid indexes are from 0 to Length - 1. For example, if an incident ID array has five elements, accessing index 5 causes this exception."
      },
      {
        "id": "268",
        "version": "C# 1.0",
        "topic": "KeyNotFoundException",
        "articulation": "Dictionary key doesn't exist",
        "syntax": "Example: Dictionary<int, string> incidents = new(); incidents[101] = \"Open\"; string status = incidents[999]; → KeyNotFoundException. Safe: if (incidents.TryGetValue(999, out string? status)) { ... } Memory: missing Dictionary key → KeyNotFoundException",
        "myArticulation": "KeyNotFoundException occurs when I try to retrieve a value from a dictionary using a key that does not exist in that dictionary. For example, if my IncidentService stores incident status by incident ID and I access an ID that isn't present, the dictionary indexer can throw this exception. I can avoid it by using TryGetValue when the key may not exist"
      },
      {
        "id": "269",
        "version": "C# 1.0",
        "topic": "FileNotFoundException",
        "articulation": "Requested file doesn't exist",
        "syntax": "Example: string path = \"C:\\\\Reports\\\\IncidentReport.txt\"; string content = File.ReadAllText(path); → FileNotFoundException if the file doesn't exist. Safer: if (File.Exists(path)) { string content = File.ReadAllText(path); } Memory: file doesn't exist → FileNotFoundException",
        "myArticulation": "FileNotFoundException occurs when an application tries to access a file that does not exist at the specified location. For example, if my healthcare application tries to read an incident report from a configured file path but the file has been deleted or the path is incorrect, the operation can throw this exception."
      },
      {
        "id": "270",
        "version": "C# 1.0",
        "topic": "IOException",
        "articulation": "General I/O failure",
        "syntax": "Example: using FileStream stream = File.OpenRead(\"C:\\\\Reports\\\\IncidentReport.txt\"); → an I/O failure can result in IOException. Hierarchy: IOException → FileNotFoundException / other specific I/O exceptions. Memory: I/O operation fails → IOException; specific file missing → FileNotFoundException",
        "myArticulation": "IOException represents an input/output error that occurs while working with files, streams, or other I/O operations. For example, while generating or reading an incident report file, the operation may fail because of an I/O problem. FileNotFoundException is a more specific exception derived from IOException, so I can catch specific exceptions before the general IOException."
      },
      {
        "id": "271",
        "version": "C# 1.0",
        "topic": "UnauthorizedAccessException",
        "articulation": "Access to a resource is not permitted",
        "syntax": "No Example: File.WriteAllText(@\"C:\\Protected\\IncidentReport.txt\", \"Incident details\"); → can throw UnauthorizedAccessException when access is denied. Memory: access denied / insufficient permission → UnauthorizedAccessException to access file",
        "myArticulation": "UnauthorizedAccessException occurs when the application does not have the required permission to access a resource. For example, if my healthcare application tries to write an incident report to a protected folder and the application process does not have write permission, the operation can throw this exception."
      },
      {
        "id": "272",
        "version": "C# 1.0",
        "topic": "InvalidOperationException",
        "articulation": "Operation isn't valid for the object's current state",
        "syntax": "Example: if (incident.Status == \"Closed\") throw new InvalidOperationException(\"A closed incident cannot be processed.\"); Collection example: var first = incidents.First(); → can throw InvalidOperationException if the sequence is empty. Memory: valid call/arguments + invalid current state → InvalidOperationException",
        "myArticulation": "InvalidOperationException occurs when a method is called at a time when the object's current state does not allow that operation. The arguments themselves may be valid, but the operation is invalid for the current state. For example, if my IncidentService tries to process an incident that has already been closed, I can throw InvalidOperationException because processing is not valid in that state."
      },
      {
        "id": "273",
        "version": "C# 1.0",
        "topic": "TimeoutException",
        "articulation": "An operation exceeds its allowed time",
        "syntax": "Example: try { externalService.Call(); } catch (TimeoutException ex) { Log(ex); } Memory: operation exceeds allowed time → TimeoutException",
        "myArticulation": "TimeoutException occurs when an operation does not complete within the allowed time limit. For example, in my healthcare application, if an external API or database operation is expected to respond within a certain time but takes too long, the operation may time out. I can handle the exception and decide whether to retry, return a controlled response, or log the failure."
      },
      {
        "id": "274",
        "version": "C# 1.0",
        "topic": "OperationCanceledException",
        "articulation": "An operation was cancelled",
        "syntax": "Example: public async Task GenerateReportAsync(CancellationToken token) { await Task.Delay(5000, token); } If cancellation is requested → OperationCanceledException. Catch: catch (OperationCanceledException) { /* handle cancellation */ } Memory: CancellationToken → cancellation requested → OperationCanceledException",
        "myArticulation": "OperationCanceledException indicates that an operation was canceled before it completed. In modern .NET applications, this commonly happens when I use CancellationToken and the caller requests cancellation. For example, if a long-running incident report generation request is canceled by the user or by a request timeout, the operation can observe the cancellation token and throw OperationCanceledException. Cancellation is different from a failure—the operation was intentionally stopped"
      },
      {
        "id": "275",
        "version": "C# 1.0",
        "topic": "XML Comment tags <summary>",
        "articulation": "Describes a type/member",
        "syntax": "<summary>Saves an incident.</summary>",
        "myArticulation": "/// <summary>\n/// Creates a new incident.\n/// </summary>\n/// <param name=\"incident\">Incident information.</param>\n/// <returns>The created incident ID.</returns>\n/// <exception cref=\"ArgumentNullException\">\n/// Thrown when incident is null.\n/// </exception>\npublic int CreateIncident(IncidentModel incident)\n{\n    // ...\n}"
      },
      {
        "id": "276",
        "version": "C# 1.0",
        "topic": "XML Comment tags <param>",
        "articulation": "Describes a parameter",
        "syntax": "<param name=\"id\">Incident ID</param>",
        "myArticulation": ""
      },
      {
        "id": "277",
        "version": "C# 1.0",
        "topic": "XML Comment tags <returns>",
        "articulation": "Describes return value",
        "syntax": "<returns>Created incident ID</returns>",
        "myArticulation": ""
      },
      {
        "id": "278",
        "version": "C# 1.0",
        "topic": "XML Comment tags <exception>",
        "articulation": "Documents an exception",
        "syntax": "<exception cref=\"ArgumentException\">Invalid ID</exception>",
        "myArticulation": ""
      },
      {
        "id": "279",
        "version": "C# 1.0",
        "topic": "XML Comment tags <remarks>",
        "articulation": "Provides additional details",
        "syntax": "<remarks>Used by Incident API.</remarks>",
        "myArticulation": ""
      },
      {
        "id": "280",
        "version": "C# 1.0",
        "topic": "XML Comment tags<example>",
        "articulation": "Provides usage example",
        "syntax": "<example>var x = ...</example>",
        "myArticulation": ""
      },
      {
        "id": "281",
        "version": "C# 1.0",
        "topic": "XML Comment tags<see>",
        "articulation": "Creates a reference to another type/member",
        "syntax": "<see cref=\"IncidentService\"/>",
        "myArticulation": ""
      },
      {
        "id": "282",
        "version": "C# 1.0",
        "topic": "XML Comment tags<seealso>",
        "articulation": "Adds related reference",
        "syntax": "<seealso cref=\"AuditService\"/>",
        "myArticulation": ""
      }
    ]
  },
  "C# 2.0": {
    "version": "C# 2.0",
    "meta": {
      "title": ".NET Framework 2.0 (2005)",
      "era": "Foundations",
      "icon": "⚡"
    },
    "topics": [
      {
        "id": "21",
        "version": "C# 2.0",
        "topic": "static class",
        "articulation": "A static class is used for common functionality that doesn't depend on an object; it cannot be instantiated or inherited, and we access its members directly using the class name.",
        "syntax": "public static class DateHelper { } — I can call its static methods using DateHelper.MethodName(). I cannot create new DateHelper() or inherit from it.",
        "myArticulation": "Suppose in my application I have some common functionality which doesn't depend on any particular object. For example, different modules may need common date formatting or calculation functionality. Instead of creating an object every time, I can make the helper class static and directly access its methods using the class name. A static class cannot be instantiated or inherited, and its members are static"
      },
      {
        "id": "161",
        "version": "C# 2.0",
        "topic": "Generics",
        "articulation": "Generics provide type-safe reusable algorithms without unnecessary casting.",
        "syntax": "List<int> incidentIds = new List<int>(); incidentIds.Add(101); Generic method: public T GetValue<T>(T value) => value; Memory: Generics → reusable + type-safe + less casting + avoid unnecessary boxing",
        "myArticulation": "Generics allow me to create reusable classes, methods, interfaces, and delegates that work with different data types while maintaining compile-time type safety. They reduce the need for explicit casting and can avoid boxing and unboxing when working with value types. For example, List<int> can store only integers, so type errors are caught at compile time."
      },
      {
        "id": "162",
        "version": "C# 2.0",
        "topic": "Generic Classes",
        "articulation": "Classes can operate over a type parameter.",
        "syntax": "public class Repository<T> { private T _data; public void Save(T data) { _data = data; } public T Get() => _data; } Usage: Repository<IncidentModel> incidentRepo = new(); Repository<PatientModel> patientRepo = new(); Memory: Generic class → one class → works with different types → type-safe",
        "myArticulation": "A generic class is a class that operates on a type parameter, allowing me to define the class once and use it with different data types while maintaining compile-time type safety. For example, instead of creating separate repository classes for IncidentModel and PatientModel, I can create one reusable Repository<T> class."
      },
      {
        "id": "163",
        "version": "C# 2.0",
        "topic": "Generic Methods",
        "articulation": "Methods can independently declare type parameters.",
        "syntax": "public T GetValue<T>(T value) { return value; } Usage: IncidentModel incident = GetValue(new IncidentModel()); int id = GetValue(101); Memory: Generic method → method declares its own <T> → reusable + type-safe",
        "myArticulation": "A generic method can independently declare its own type parameter, so the method can work with different data types without making the entire class generic. The compiler can often infer the type from the argument passed to the method. For example, a common utility method can accept an IncidentModel, PatientModel, or another type while maintaining compile-time type safety."
      },
      {
        "id": "164",
        "version": "C# 2.0",
        "topic": "Generic Constraints",
        "articulation": "Constraints restrict what types can be used as generic arguments.",
        "syntax": "Reference type: public class Repository<T> where T : class { } Interface: public class Repository<T> where T : IEntity { } Value type: where T : struct Parameterless constructor: where T : new() Base class: where T : Entity Memory: Constraint → restrict allowed T → compiler guarantees required capability",
        "myArticulation": "Generic constraints restrict which types can be used as generic arguments. This allows me to tell the compiler what capabilities or characteristics the type must have, so the generic code can safely use them. For example, if my repository should work only with classes, I can use the class constraint; if the type must implement an interface, I can specify that interface as a constraint."
      },
      {
        "id": "165",
        "version": "C# 2.0",
        "topic": "Nullable Value Types",
        "articulation": "Nullable value types allow value types such as int to also represent null",
        "syntax": "int? incidentPriority = null;\n\nincidentPriority = 2; int normally cannot be null:",
        "myArticulation": "Nullable value types allow value types such as int to also represent null Nullable value types were introduced in C# 2.0 to allow value types such as int to represent null. Reference types such as string could already be null from C# 1.0. C# 8.0 introduced nullable reference type annotations such as string?, which allow the compiler to warn me about possible null references."
      },
      {
        "id": "166",
        "version": "C# 2.0",
        "topic": "Null Coalescing",
        "articulation": "?? provides a fallback when a value is null.",
        "syntax": "string? status = incident.Status; string finalStatus = status ?? \"Unknown\"; If: status = \"Open\" → \"Open\" If: status = null → \"Unknown\". Memory: value ?? fallback → use value if not null, otherwise fallback",
        "myArticulation": "The null-coalescing operator ?? provides a fallback value when the left-hand expression is null. It is useful when I want to use a default value instead of writing a separate if condition. For example, if an incident does not have a status, I can use Unknown as the default."
      },
      {
        "id": "167",
        "version": "C# 2.0",
        "topic": "Iterators",
        "articulation": "Iterators simplify producing sequences lazily.",
        "syntax": "public IEnumerable<int> GetIncidentIds() { yield return 101; yield return 102; yield return 103; } Usage: foreach (int id in GetIncidentIds()) { Console.WriteLine(id); } Memory: Iterator → produce sequence one-by-one → yield → foreach",
        "myArticulation": "Iterators allow me to define how a collection or sequence produces its elements one at a time. Using yield return, I can create an iterator without manually implementing IEnumerator and its state-management logic. The caller can consume the sequence using foreach, and values can be produced on demand."
      },
      {
        "id": "168",
        "version": "C# 2.0",
        "topic": "yield",
        "articulation": "yield enables deferred sequence generation without manually implementing enumerators.",
        "syntax": "public IEnumerable<int> GetIncidentIds() { yield return 101; yield return 102; yield return 103; } foreach (var id in GetIncidentIds()) { ... } Also: yield break; stops iteration. Memory: yield → one item at a time → deferred execution → no manual enumerator",
        "myArticulation": "The yield keyword allows me to generate sequence elements one at a time without manually implementing IEnumerable and IEnumerator. It supports deferred execution, so the iterator code starts producing values when the caller actually iterates over the sequence. This can avoid creating the entire result set in memory at once."
      },
      {
        "id": "169",
        "version": "C# 2.0",
        "topic": "Anonymous Methods",
        "articulation": "Anonymous methods allow inline delegate implementation.",
        "syntax": "Action<string> notify = delegate(string message) { Console.WriteLine(message); }; notify(\"Incident created\"); Memory: Anonymous method → inline delegate implementation → no method name → C# 2.0",
        "myArticulation": "Anonymous methods allow me to provide an inline method implementation where a delegate is expected, without creating a separate named method. They were useful for callbacks and event handlers before lambda expressions were introduced in C# 3.0."
      },
      {
        "id": "170",
        "version": "C# 2.0",
        "topic": "Partial Classes",
        "articulation": "A class can be split across multiple files.",
        "syntax": "Generated: public partial class MyPage { public string Title { get; set; } } Custom: public partial class MyPage { public void Validate() { } } → compiler treats both as one MyPage class. Razor connection: generated C# code can be kept separate from developer code.",
        "myArticulation": "A partial class allows me to split the definition of the same class across multiple files. For example, in ASP.NET Core Razor, some C# code can be generated by the framework. I can keep generated code and my custom code in separate files using partial. At compile time, the compiler combines the partial definitions and treats them as one class. This is useful because when generated code is regenerated, my custom code remains separate and is not overwritten.” Memory: partial → same class → multiple files → compiler combines → generated code + custom code."
      },
      {
        "id": "171",
        "version": "C# 2.0",
        "topic": "Partial Methods",
        "articulation": "Partial classes can declare optional method implementations.",
        "syntax": "Generated: partial void OnIncidentCreated(); Custom: partial void OnIncidentCreated() { Console.WriteLine(\"Audit incident creation\"); } Usage: OnIncidentCreated(); → If no implementation is provided, the optional partial method can be omitted by the compiler.",
        "myArticulation": "Partial methods allow one part of a partial class to declare a method and another part to optionally provide its implementation. They are especially useful with generated code, where the generated class can define an optional extension point and the developer can implement it in a separate partial file when needed.” Memory: partial method → declaration in one part → optional implementation in another par"
      },
      {
        "id": "172",
        "version": "C# 2.0",
        "topic": "Generic Delegates",
        "articulation": "Delegates can be parameterized using generics.",
        "syntax": "Action<string> notify = message => Console.WriteLine(message); Action<int> processId = id => Console.WriteLine(id); Custom: public delegate T Converter<T>(T value); Common built-in generic delegates: Action<T> → returns void; Func<T,TResult> → returns value; Predicate<T> → returns bool",
        "myArticulation": "Generic delegates allow me to define a delegate that works with different data types using type parameters, instead of creating separate delegate types for each data type. They provide compile-time type safety and make callback code reusable. For example, Action<T> can represent a method that accepts a value of type T and returns void.” Memory: Generic delegate → delegate + type parameter → reusable + type-safe"
      },
      {
        "id": "173",
        "version": "C# 2.0",
        "topic": "Nullable<T>",
        "articulation": "Nullable<T> is the underlying generic representation of nullable value types.",
        "syntax": "Nullable<int> priority = null; Same as: int? priority = null; Nullable<DateTime> closedDate = null; Key: int? → Nullable<int>",
        "myArticulation": "Nullable<T> is the generic structure used to represent a value type that can also have a null state. The shorthand syntax T? is used in normal C# code. For example, int? is equivalent to Nullable<int>, which is useful when a value such as an incident priority or closure date may not yet be available.” Memory: Nullable<T> → value type + null → T? shorthand"
      },
      {
        "id": "174",
        "version": "C# 2.0",
        "topic": "Anonymous Types Foundation",
        "articulation": "Compiler-generated types support temporary data projections.",
        "syntax": "var incident = new { Id = 101, Status = \"Open\", Priority = 1 }; Console.WriteLine(incident.Status); LINQ example: var result = incidents.Select(x => new { x.Id, x.Status }); → projects only required fields. Important: properties are read-only after initialization.",
        "myArticulation": "Anonymous types allow me to create a temporary object with a set of properties without explicitly defining a class for it. The compiler generates the underlying type automatically. They are useful for temporary data projections, especially with LINQ, when I only need a few selected fields and don't need a named model.” Memory: Anonymous type → temporary object → compiler-generated type → no named class"
      },
      {
        "id": "175",
        "version": "C# 2.0",
        "topic": "List<T>",
        "articulation": "List<T> is a generic dynamic-size collection that lets me add and remove elements without defining the final size upfront.",
        "syntax": "List<int> incidentIds = new List<int>(); incidentIds.Add(101); incidentIds.Add(102); incidentIds.Remove(101); int id = incidentIds[0]; Note: Internally, List<T> uses a dynamically resized array.",
        "myArticulation": "List<T> is a generic, strongly typed collection that can grow or shrink dynamically as I add or remove elements, so I don't need to define the final size upfront. It provides type safety and supports index-based access. For example, in my Incident application, I can use List<int> to store incident IDs and add or remove IDs as needed.” Memory: List<T> → generic + type-safe + dynamic size + index-based"
      },
      {
        "id": "176",
        "version": "C# 2.0",
        "topic": "List Add/Remove",
        "articulation": "List<T> provides methods such as Add, Remove and Contains for managing elements.",
        "syntax": "List<int> incidentIds = new List<int>(); incidentIds.Add(101); incidentIds.Remove(101); bool exists = incidentIds.Contains(102); Other useful methods: Count, Clear, Insert, RemoveAt, IndexOf, Find",
        "myArticulation": "List<T> provides methods such as Add, Remove, and Contains to manage and check elements in a strongly typed collection. For example, in my Incident application, I can add a new incident ID, remove an existing ID, and check whether a particular incident ID already exists.” Memory: Add → insert; Remove → delete; Contains → check existence"
      },
      {
        "id": "177",
        "version": "C# 2.0",
        "topic": "List indexing",
        "articulation": "A list supports zero-based indexing similar to an array.",
        "syntax": "List<int> incidentIds = new() { 101, 102, 103 }; int id = incidentIds[0]; → 101 incidentIds[1] = 200; → updates second element. incidentIds[5] → ArgumentOutOfRangeException",
        "myArticulation": "A List<T> supports zero-based index access similar to an array, so I can retrieve or update an element using its index. The first element is at index 0, and the last element is at Count - 1. If I access an invalid index, the list throws an ArgumentOutOfRangeException.” Memory: List → zero-based → first 0 → last Count - 1"
      },
      {
        "id": "178",
        "version": "C# 2.0",
        "topic": "Dictionary<TKey,TValue>",
        "articulation": "A dictionary stores values using unique keys and is useful when I need lookup by key.",
        "syntax": "Dictionary<int, string> incidents = new(); incidents.Add(101, \"Open\"); incidents[102] = \"Closed\"; string status = incidents[101]; Check safely: if (incidents.TryGetValue(101, out string? status)) { ... }",
        "myArticulation": "A Dictionary<TKey,TValue> stores data as key-value pairs, where each key must be unique. It is useful when I need to quickly look up a value using a key instead of searching through elements by position. For example, in my Incident application, I can store an incident status using the incident ID as the key.” Memory: Dictionary → unique key → key/value pair → lookup by key"
      },
      {
        "id": "179",
        "version": "C# 2.0",
        "topic": "HashSet<T>",
        "articulation": "A HashSet stores unique values and is useful when duplicates should not be allowed.",
        "syntax": "HashSet<int> processedIds = new(); processedIds.Add(101); processedIds.Add(102); processedIds.Add(101); → duplicate 101 is not added. processedIds.Contains(101) → true. Note: No index-based access like List<T>.",
        "myArticulation": "A HashSet<T> is a generic collection that stores unique values and automatically prevents duplicate elements. I use it when uniqueness is more important than maintaining index-based access. For example, in my Incident application, if I need to maintain a unique set of incident IDs that have already been processed, I can use a HashSet<int>.” Memory: HashSet → unique values → no duplicates → fast membership checking"
      },
      {
        "id": "180",
        "version": "C# 2.0",
        "topic": "Queue<T>",
        "articulation": "A queue follows FIFO, meaning the first item added is normally the first item removed.",
        "syntax": "Queue<int> incidentQueue = new(); incidentQueue.Enqueue(101); incidentQueue.Enqueue(102); int id = incidentQueue.Dequeue(); → 101. Peek() → views the next item without removing it.",
        "myArticulation": "A Queue<T> follows FIFO, meaning First In, First Out. The first item added to the queue is normally the first item removed. I use it when work needs to be processed in arrival order, such as a queue of incident-processing requests.” Memory: Queue → FIFO → first in, first out"
      },
      {
        "id": "181",
        "version": "C# 2.0",
        "topic": "Stack<T>",
        "articulation": "A stack follows LIFO, meaning the last item added is the first item removed.",
        "syntax": "Stack<string> actions = new(); actions.Push(\"Create\"); actions.Push(\"Update\"); string action = actions.Pop(); → \"Update\". Peek() → views the top item without removing it.",
        "myArticulation": "A Stack<T> follows LIFO, meaning Last In, First Out. The last item added to the stack is normally the first item removed. I can use it when the most recently added item needs to be processed first, such as maintaining a history of actions for an undo operation.” Memory: Stack → LIFO → last in, first out"
      },
      {
        "id": "182",
        "version": "C# 2.0",
        "topic": "IEnumerable<T>",
        "articulation": "IEnumerable<T> represents a sequence that can be iterated, commonly using foreach.",
        "syntax": "IEnumerable<int> incidentIds = new List<int> { 101, 102, 103 }; foreach (int id in incidentIds) { Console.WriteLine(id); } Iterator: public IEnumerable<int> GetIds() { yield return 101; yield return 102; }",
        "myArticulation": "IEnumerable<T> represents a strongly typed sequence that can be iterated, commonly using foreach. It provides a way to read elements sequentially without requiring the caller to know the underlying collection type. For example, an IEnumerable<IncidentModel> can represent incidents from a List, array, or iterator.” Memory: IEnumerable<T> → sequence → iterate → foreach"
      }
    ]
  },
  "C# 3.0": {
    "version": "C# 3.0",
    "meta": {
      "title": ".NET Framework 3.5 (2007)",
      "era": "Foundations",
      "icon": "🔍"
    },
    "topics": [
      {
        "id": "183",
        "version": "C# 3.0",
        "topic": "Implicitly Typed Variables",
        "articulation": "var is a statically typed, implicitly typed local variable. Its type is inferred by the compiler at compile time and cannot change afterward",
        "syntax": "var name = \"Deepthi\"; → compiler infers string",
        "myArticulation": "var does not mean dynamic typing. The compiler identifies the actual type at compile time based on the assigned value. So var name = \"Deepthi\" is still a strongly typed string variable."
      },
      {
        "id": "184",
        "version": "C# 3.0",
        "topic": "Object Initializers",
        "articulation": "Object initializers allow an object to be created and its accessible properties/fields to be assigned in the same expression, without explicitly passing those values through a constructor.",
        "syntax": "var emp = new Employee { Name = \"Deepthi\", Age = 37 };",
        "myArticulation": "Object initializer syntax allows me to create an object and initialize its properties or fields in the same statement. I don't need a parameterized constructor just to assign those values.”"
      },
      {
        "id": "185",
        "version": "C# 3.0",
        "topic": "Collection Initializers",
        "articulation": "Collection initializers provide a concise syntax for creating a collection and adding initial elements during object creation.",
        "syntax": "var numbers = new List<int> { 10, 20, 30 };",
        "myArticulation": "Collection initializer syntax allows me to create a collection and add its initial elements in the same statement. Internally, the compiler translates the initializer into calls to the collection's Add() method."
      },
      {
        "id": "186",
        "version": "C# 3.0",
        "topic": "Anonymous Types",
        "articulation": "Anonymous types allow the compiler to create a temporary type with a set of read-only properties without explicitly declaring a class.",
        "syntax": "var person = new { Name = \"Deepthi\", Age = 37 };",
        "myArticulation": "An anonymous type is a compiler-generated temporary type. I don't explicitly define a class; the compiler creates the type based on the properties I provide. Its properties are read-only after initialization."
      },
      {
        "id": "187",
        "version": "C# 3.0",
        "topic": "Lambda Expressions",
        "articulation": "Lambda expressions provide a concise way to define anonymous functions that can be converted to delegate or expression-tree types",
        "syntax": "Func<int, int> square = x => x * x;\n\nConsole.WriteLine(square(5)); // 25",
        "myArticulation": "A lambda expression is a concise inline anonymous function. I can use it to pass behavior as data, especially with delegates, LINQ and expression trees. The => is called the lambda operator."
      },
      {
        "id": "188",
        "version": "C# 3.0",
        "topic": "Expression Trees",
        "articulation": "Expression trees represent code as a tree-like data structure that can be inspected, analyzed, modified, or translated at runtime.",
        "syntax": "Expression<Func<int, bool>> exp = x => x > 10;",
        "myArticulation": "An expression tree represents a lambda expression as data instead of just executable code. I can inspect its structure and a framework like Entity Framework Core can translate that expression into another form, such as SQL.The key difference is that a delegate represents executable behavior, whereas an expression tree represents that behavior as data. Because it's represented as data, frameworks such as EF Core can inspect and translate it, for example from a LINQ expression into SQL"
      },
      {
        "id": "189",
        "version": "C# 3.0",
        "topic": "Extension Methods",
        "articulation": "Extension methods allow methods to be added to an existing type without modifying, inheriting from, or recompiling the original type",
        "syntax": "public static string ToTitle(this string value) { ... }",
        "myArticulation": "An extension method allows me to add method-like functionality to an existing type that I don't own. I define it as a static method inside a static class, and the this parameter identifies the type being extended. Extension methods provide a way to add method-like functionality to an existing type without modifying its source code or using inheritance. They are actually static methods, and the compiler provides instance-method-like syntax."
      },
      {
        "id": "190",
        "version": "C# 3.0",
        "topic": "LINQ",
        "articulation": "LINQ provides a unified query model for querying different data sources such as in-memory collections, databases, XML, and other queryable data sources",
        "syntax": "var result = employees.Where(e => e.Salary > 50000).Select(e => e.Name);",
        "myArticulation": "LINQ integrates query capabilities directly into C#. It gives me a consistent way to filter, project, sort, group, and aggregate data across different data sources. The actual execution depends on whether I'm working with IEnumerable or IQueryable. LINQ gives C# a consistent query syntax over different data sources. But LINQ itself doesn't determine where the query executes. With IEnumerable, operations generally execute against in-memory objects; with IQueryable, a provider can translate the expression into the target query language, such as SQL."
      },
      {
        "id": "191",
        "version": "C# 3.0",
        "topic": "Deferred Execution",
        "articulation": "Many LINQ operators defer query execution until the query result is actually enumerated",
        "syntax": "var result = numbers.Where(x => x > 10); → execution occurs during foreach, ToList(), etc",
        "myArticulation": "Deferred execution means defining a LINQ query does not necessarily execute it immediately. The query is executed when I enumerate the result, such as with foreach, ToList(), ToArray(), or another terminal operation."
      },
      {
        "id": "192",
        "version": "C# 3.0",
        "topic": "IEnumerable<T>",
        "articulation": "IEnumerable<T> represents a strongly typed sequence that can be iterated forward using an enumerator. It is commonly used for in-memory collections and supports LINQ-to-Objects",
        "syntax": "IEnumerable<int> numbers = new List<int> { 1, 2, 3 };",
        "myArticulation": "IEnumerable<T> represents a strongly typed sequence that I can iterate forward using foreach. When used with in-memory collections, LINQ operations generally execute against the objects in memory. IEnumerable<T> represents a strongly typed, forward-only iterable sequence. For LINQ-to-Objects, the operations are executed against the objects in memory, whereas IQueryable<T> allows a provider to translate the query."
      },
      {
        "id": "193",
        "version": "C# 3.0",
        "topic": "LINQ Operators",
        "articulation": "LINQ standard query operators provide reusable operations for filtering, projecting, sorting, grouping, joining, partitioning, and aggregating sequences.",
        "syntax": "numbers.Where(x => x > 10).Select(x => x * 2).Sum()",
        "myArticulation": "LINQ standard query operators are predefined methods that let me work with sequences in a consistent way. They cover operations such as filtering with Where, transformation with Select, sorting, grouping, joining, and aggregation with methods like Sum and Count."
      },
      {
        "id": "194",
        "version": "C# 3.0",
        "topic": "Query Syntax",
        "articulation": "LINQ provides a declarative, SQL-like query syntax for querying sequences and supported data sources",
        "syntax": "from e in employees where e.Salary > 50000 select e.Name;",
        "myArticulation": "LINQ supports two styles: query syntax and method syntax. Query syntax looks similar to SQL and is useful for readability, while the compiler translates it into method calls such as Where and Select."
      },
      {
        "id": "195",
        "version": "C# 3.0",
        "topic": "IQueryable<T>",
        "articulation": "IQueryable<T> represents a queryable data source where the LINQ expression can be represented as an expression tree and translated/executed by a query provider.",
        "syntax": "IQueryable<Employee> query = db.Employees.Where(e => e.Salary > 50000);",
        "myArticulation": "IQueryable<T> represents a query that can be translated by a provider. Instead of immediately executing the C# logic in memory, the LINQ expression is represented as an expression tree, which a provider such as EF Core can translate into SQL and execute at the database."
      }
    ]
  },
  "C# 4.0": {
    "version": "C# 4.0",
    "meta": {
      "title": ".NET Framework 4.0 (2010)",
      "era": "Foundations",
      "icon": "🔄"
    },
    "topics": [
      {
        "id": "196",
        "version": "C# 4.0",
        "topic": "Dynamic",
        "articulation": "dynamic defers member binding to runtime.",
        "syntax": "dynamic x = obj;",
        "myArticulation": ""
      },
      {
        "id": "197",
        "version": "C# 4.0",
        "topic": "Named Arguments",
        "articulation": "Arguments can be supplied by parameter name.",
        "syntax": "M(age:30, name:\"A\")",
        "myArticulation": ""
      },
      {
        "id": "198",
        "version": "C# 4.0",
        "topic": "Optional Arguments",
        "articulation": "Parameters can have default values.",
        "syntax": "void M(int x=10)",
        "myArticulation": ""
      },
      {
        "id": "199",
        "version": "C# 4.0",
        "topic": "COM Interop",
        "articulation": "C# improved interaction with COM APIs.",
        "syntax": "word.Visible = true;",
        "myArticulation": ""
      },
      {
        "id": "200",
        "version": "C# 4.0",
        "topic": "Dynamic Binding",
        "articulation": "Runtime binding can simplify dynamic object interaction.",
        "syntax": "dynamic excel",
        "myArticulation": ""
      },
      {
        "id": "201",
        "version": "C# 4.0",
        "topic": "Optional/Named API Design",
        "articulation": "APIs can reduce overloads using defaults and named parameters.",
        "syntax": "Create(timeout:30)",
        "myArticulation": ""
      },
      {
        "id": "202",
        "version": "C# 4.0",
        "topic": "Variance Awareness",
        "articulation": "Generic interfaces/delegates support covariance/contravariance.",
        "syntax": "IEnumerable<string> → IEnumerable<object>",
        "myArticulation": ""
      },
      {
        "id": "203",
        "version": "C# 4.0",
        "topic": "dynamic vs var",
        "articulation": "var is compile-time inferred; dynamic is runtime-bound.",
        "syntax": "var x=1; dynamic y=1;",
        "myArticulation": ""
      }
    ]
  },
  "C# 5.0": {
    "version": "C# 5.0",
    "meta": {
      "title": ".NET Framework 4.5 (2012)",
      "era": "Async Revolution",
      "icon": "🚀"
    },
    "topics": [
      {
        "id": "204",
        "version": "C# 5.0",
        "topic": "async",
        "articulation": "Marks a method containing asynchronous operations.",
        "syntax": "async Task M()",
        "myArticulation": ""
      },
      {
        "id": "205",
        "version": "C# 5.0",
        "topic": "await",
        "articulation": "Asynchronously waits for a task without blocking the async flow.",
        "syntax": "await service.GetAsync()",
        "myArticulation": ""
      },
      {
        "id": "206",
        "version": "C# 5.0",
        "topic": "Task-based Async",
        "articulation": "Task represents an asynchronous operation.",
        "syntax": "Task<T>",
        "myArticulation": ""
      },
      {
        "id": "207",
        "version": "C# 5.0",
        "topic": "Async Exception Handling",
        "articulation": "Exceptions from awaited tasks propagate through normal try/catch.",
        "syntax": "try { await M(); }",
        "myArticulation": ""
      },
      {
        "id": "208",
        "version": "C# 5.0",
        "topic": "Caller Information",
        "articulation": "Compiler can provide caller metadata automatically.",
        "syntax": "[CallerMemberName]",
        "myArticulation": ""
      },
      {
        "id": "209",
        "version": "C# 5.0",
        "topic": "Async State Machine",
        "articulation": "Compiler transforms async methods into a state-machine representation.",
        "syntax": "async/await",
        "myArticulation": ""
      }
    ]
  },
  "C# 6.0": {
    "version": "C# 6.0",
    "meta": {
      "title": ".NET Framework 4.6 / Roslyn (2015)",
      "era": "Async Revolution",
      "icon": "✨"
    },
    "topics": [
      {
        "id": "210",
        "version": "C# 6.0",
        "topic": "String Interpolation",
        "articulation": "Embeds expressions directly in strings.",
        "syntax": "$\"Hello {name}\"",
        "myArticulation": ""
      },
      {
        "id": "211",
        "version": "C# 6.0",
        "topic": "Null-Conditional Operator",
        "articulation": "Safely accesses members when receiver may be null.",
        "syntax": "person?.Name",
        "myArticulation": ""
      },
      {
        "id": "212",
        "version": "C# 6.0",
        "topic": "Null-Coalescing Assignment Awareness",
        "articulation": "?? supplies a fallback for null values.",
        "syntax": "x ?? y",
        "myArticulation": ""
      },
      {
        "id": "213",
        "version": "C# 6.0",
        "topic": "nameof",
        "articulation": "Produces a symbol's name as a compile-time string.",
        "syntax": "nameof(Employee.Name)",
        "myArticulation": ""
      },
      {
        "id": "214",
        "version": "C# 6.0",
        "topic": "Expression-Bodied Members",
        "articulation": "Concise syntax for expression-based members.",
        "syntax": "int Age => 30;",
        "myArticulation": ""
      },
      {
        "id": "215",
        "version": "C# 6.0",
        "topic": "Auto-Property Initializers",
        "articulation": "Properties can have initialization expressions.",
        "syntax": "int Id { get; } = 10;",
        "myArticulation": ""
      },
      {
        "id": "216",
        "version": "C# 6.0",
        "topic": "Using Static",
        "articulation": "Imports static members directly.",
        "syntax": "using static Math;",
        "myArticulation": ""
      },
      {
        "id": "217",
        "version": "C# 6.0",
        "topic": "Exception Filters",
        "articulation": "catch can conditionally handle exceptions.",
        "syntax": "catch(Exception e) when (...)",
        "myArticulation": ""
      },
      {
        "id": "218",
        "version": "C# 6.0",
        "topic": "Index Initializers",
        "articulation": "Dictionary/indexer initialization became more concise.",
        "syntax": "new Dictionary<int,string> { [1]=\"A\" }",
        "myArticulation": ""
      }
    ]
  },
  "C# 7.0": {
    "version": "C# 7.0",
    "meta": {
      "title": ".NET Core 2.0 (2017)",
      "era": "Modern Core",
      "icon": "📦"
    },
    "topics": [
      {
        "id": "219",
        "version": "C# 7.0",
        "topic": "Tuples",
        "articulation": "Tuples group multiple values without creating a custom type.",
        "syntax": "(int Id,string Name)",
        "myArticulation": ""
      },
      {
        "id": "220",
        "version": "C# 7.0",
        "topic": "Tuple Deconstruction",
        "articulation": "Tuple values can be assigned to separate variables.",
        "syntax": "(id,name) = GetPerson();",
        "myArticulation": ""
      },
      {
        "id": "221",
        "version": "C# 7.0",
        "topic": "Pattern Matching",
        "articulation": "Pattern matching combines type testing and extraction.",
        "syntax": "if(x is Person p)",
        "myArticulation": ""
      },
      {
        "id": "222",
        "version": "C# 7.0",
        "topic": "is Patterns",
        "articulation": "is can test type/value patterns.",
        "syntax": "x is int i",
        "myArticulation": ""
      },
      {
        "id": "223",
        "version": "C# 7.0",
        "topic": "switch Patterns",
        "articulation": "Switch can select based on patterns.",
        "syntax": "case Person p:",
        "myArticulation": ""
      },
      {
        "id": "224",
        "version": "C# 7.0",
        "topic": "out var",
        "articulation": "Out variables can be declared at call site.",
        "syntax": "int.TryParse(s,out var n)",
        "myArticulation": ""
      },
      {
        "id": "225",
        "version": "C# 7.0",
        "topic": "Local Functions",
        "articulation": "Functions can be declared inside methods.",
        "syntax": "int Add(int a,int b)",
        "myArticulation": ""
      },
      {
        "id": "226",
        "version": "C# 7.0",
        "topic": "Ref Returns",
        "articulation": "Methods can return references to variables.",
        "syntax": "ref int Find()",
        "myArticulation": ""
      },
      {
        "id": "227",
        "version": "C# 7.0",
        "topic": "Ref Locals",
        "articulation": "Local variables can alias storage by reference.",
        "syntax": "ref int x = ref y;",
        "myArticulation": ""
      },
      {
        "id": "228",
        "version": "C# 7.0",
        "topic": "Binary Literals",
        "articulation": "Binary integer literals improve readability.",
        "syntax": "0b1010",
        "myArticulation": ""
      },
      {
        "id": "229",
        "version": "C# 7.0",
        "topic": "Digit Separators",
        "articulation": "_ separates digits for readability.",
        "syntax": "1_000_000",
        "myArticulation": ""
      },
      {
        "id": "230",
        "version": "C# 7.0",
        "topic": "Expression-Bodied Improvements",
        "articulation": "More members support expression-bodied syntax.",
        "syntax": "void M() => Do();",
        "myArticulation": ""
      }
    ]
  },
  "C# 7.1": {
    "version": "C# 7.1",
    "meta": {
      "title": ".NET Core 2.0 (2017)",
      "era": "Modern Core",
      "icon": "📦"
    },
    "topics": [
      {
        "id": "231",
        "version": "C# 7.1",
        "topic": "Async Main",
        "articulation": "Console entry point can be asynchronous.",
        "syntax": "static async Task Main()",
        "myArticulation": ""
      },
      {
        "id": "232",
        "version": "C# 7.1",
        "topic": "Default Literal",
        "articulation": "Compiler infers default value type.",
        "syntax": "T x = default;",
        "myArticulation": ""
      },
      {
        "id": "233",
        "version": "C# 7.1",
        "topic": "Tuple Names",
        "articulation": "Tuple elements can have meaningful names.",
        "syntax": "(int id,string name)",
        "myArticulation": ""
      }
    ]
  },
  "C# 7.2": {
    "version": "C# 7.2",
    "meta": {
      "title": ".NET Core 2.0 (2017)",
      "era": "Modern Core",
      "icon": "📦"
    },
    "topics": [
      {
        "id": "234",
        "version": "C# 7.2",
        "topic": "in Parameters",
        "articulation": "Passes arguments by readonly reference.",
        "syntax": "M(in value)",
        "myArticulation": ""
      },
      {
        "id": "235",
        "version": "C# 7.2",
        "topic": "private protected",
        "articulation": "Accessible to derived types within the same assembly.",
        "syntax": "private protected int X;",
        "myArticulation": ""
      },
      {
        "id": "236",
        "version": "C# 7.2",
        "topic": "ref readonly",
        "articulation": "Returns or aliases a readonly reference.",
        "syntax": "ref readonly int X",
        "myArticulation": ""
      }
    ]
  },
  "C# 7.3": {
    "version": "C# 7.3",
    "meta": {
      "title": ".NET Core 2.1 (2018)",
      "era": "Modern Core",
      "icon": "📦"
    },
    "topics": [
      {
        "id": "237",
        "version": "C# 7.3",
        "topic": "Generic Constraints Improvements",
        "articulation": "Additional combinations of generic constraints became available.",
        "syntax": "where T: unmanaged",
        "myArticulation": ""
      },
      {
        "id": "238",
        "version": "C# 7.3",
        "topic": "in/ref Improvements",
        "articulation": "Ref-related overload resolution and behavior improved.",
        "syntax": "M(in x)",
        "myArticulation": ""
      }
    ]
  },
  "C# 8.0": {
    "version": "C# 8.0",
    "meta": {
      "title": ".NET Core 3.0 (2019)",
      "era": "Modern Core",
      "icon": "🛡"
    },
    "topics": [
      {
        "id": "239",
        "version": "C# 8.0",
        "topic": "Nullable Reference Types",
        "articulation": "Compiler analysis helps identify possible null dereferences.",
        "syntax": "string? name",
        "myArticulation": ""
      },
      {
        "id": "240",
        "version": "C# 8.0",
        "topic": "Nullability Annotations",
        "articulation": "? communicates whether reference may be null.",
        "syntax": "Person? p",
        "myArticulation": ""
      },
      {
        "id": "241",
        "version": "C# 8.0",
        "topic": "Null-Forgiving Operator",
        "articulation": "! suppresses compiler nullability warnings.",
        "syntax": "name!",
        "myArticulation": ""
      },
      {
        "id": "242",
        "version": "C# 8.0",
        "topic": "Async Streams",
        "articulation": "Asynchronous sequences can be consumed incrementally.",
        "syntax": "IAsyncEnumerable<T>",
        "myArticulation": ""
      },
      {
        "id": "243",
        "version": "C# 8.0",
        "topic": "await foreach",
        "articulation": "Asynchronously enumerates an async stream.",
        "syntax": "await foreach(var x in stream)",
        "myArticulation": ""
      },
      {
        "id": "244",
        "version": "C# 8.0",
        "topic": "Indices",
        "articulation": "^ indexes from the end.",
        "syntax": "array[^1]",
        "myArticulation": ""
      },
      {
        "id": "245",
        "version": "C# 8.0",
        "topic": "Ranges",
        "articulation": ".. creates slices/ranges.",
        "syntax": "array[1..4]",
        "myArticulation": ""
      },
      {
        "id": "246",
        "version": "C# 8.0",
        "topic": "Default Interface Methods",
        "articulation": "Interfaces can provide implementations.",
        "syntax": "interface I { void M() { } }",
        "myArticulation": ""
      },
      {
        "id": "247",
        "version": "C# 8.0",
        "topic": "Switch Expressions",
        "articulation": "switch can return a value concisely.",
        "syntax": "x switch { 1=>\"A\", _=>\"B\" }",
        "myArticulation": ""
      },
      {
        "id": "248",
        "version": "C# 8.0",
        "topic": "Property Patterns",
        "articulation": "Patterns can inspect object properties.",
        "syntax": "p is { Age: > 18 }",
        "myArticulation": ""
      },
      {
        "id": "249",
        "version": "C# 8.0",
        "topic": "Using Declarations",
        "articulation": "Resources can be scoped without explicit braces.",
        "syntax": "using var conn = ...;",
        "myArticulation": ""
      },
      {
        "id": "250",
        "version": "C# 8.0",
        "topic": "Readonly Members",
        "articulation": "Struct members can be declared readonly.",
        "syntax": "readonly int GetX()",
        "myArticulation": ""
      }
    ]
  },
  "C# 9.0": {
    "version": "C# 9.0",
    "meta": {
      "title": ".NET 5.0 (2020)",
      "era": "Modern Core",
      "icon": "💎"
    },
    "topics": [
      {
        "id": "251",
        "version": "C# 9.0",
        "topic": "Records",
        "articulation": "Records provide concise data-oriented reference types with value-based equality.",
        "syntax": "record Person(string Name);",
        "myArticulation": ""
      },
      {
        "id": "252",
        "version": "C# 9.0",
        "topic": "init Accessor",
        "articulation": "Allows property initialization only during object initialization.",
        "syntax": "string Name { get; init; }",
        "myArticulation": ""
      },
      {
        "id": "253",
        "version": "C# 9.0",
        "topic": "Init-Only Properties",
        "articulation": "Supports immutable-style object construction.",
        "syntax": "new Person { Name=\"A\" }",
        "myArticulation": ""
      },
      {
        "id": "254",
        "version": "C# 9.0",
        "topic": "With Expressions",
        "articulation": "Creates a modified copy of a record.",
        "syntax": "p with { Name=\"B\" }",
        "myArticulation": ""
      },
      {
        "id": "255",
        "version": "C# 9.0",
        "topic": "Top-Level Statements",
        "articulation": "Program entry code can omit explicit Main.",
        "syntax": "Console.WriteLine(\"Hi\");",
        "myArticulation": ""
      },
      {
        "id": "256",
        "version": "C# 9.0",
        "topic": "Relational Patterns",
        "articulation": "Patterns can compare relationally.",
        "syntax": "x is > 10 and < 20",
        "myArticulation": ""
      },
      {
        "id": "257",
        "version": "C# 9.0",
        "topic": "Logical Patterns",
        "articulation": "Patterns can use and, or, not.",
        "syntax": "x is not null",
        "myArticulation": ""
      },
      {
        "id": "258",
        "version": "C# 9.0",
        "topic": "Covariant Returns",
        "articulation": "Overrides can return more specific types.",
        "syntax": "public override Dog Clone()",
        "myArticulation": ""
      },
      {
        "id": "259",
        "version": "C# 9.0",
        "topic": "Target-Typed new",
        "articulation": "Compiler infers constructor target type.",
        "syntax": "Person p = new(\"A\");",
        "myArticulation": ""
      }
    ]
  },
  "C# 10": {
    "version": "C# 10",
    "meta": {
      "title": ".NET 6.0 LTS (2021)",
      "era": "Modern Core",
      "icon": "🌐"
    },
    "topics": [
      {
        "id": "119",
        "version": "C# 10",
        "topic": "Global Usings",
        "articulation": "Imports can apply to the whole project.",
        "syntax": "GlobalUsings.cs: global using System; global using System.Collections.Generic; global using IncidentApp.Services; Any file: List<int> incidentIds = new(); without repeating the using. Memory: global using → declare once → available to all files in the project",
        "myArticulation": "Global usings allow me to declare a namespace import once and make it available across all C# files in the project. This reduces repetitive using statements and keeps files cleaner. For example, if many files in my Incident application use System, System.Collections.Generic, or application namespaces, I can declare them once in a GlobalUsings.cs file.”"
      },
      {
        "id": "120",
        "version": "C# 10",
        "topic": "File-Scoped Namespaces",
        "articulation": "Namespace declaration can avoid nesting braces.",
        "syntax": "Traditional: namespace IncidentApp.Services { public class IncidentService { } } File-scoped: namespace IncidentApp.Services; public class IncidentService { } Memory: namespace X; → entire file belongs to namespace → less indentation",
        "myArticulation": "File-scoped namespaces allow me to declare the namespace for the entire file without wrapping the code inside an additional namespace block. This reduces indentation and makes the file structure cleaner. In my Incident application, I can use a file-scoped namespace when the entire file belongs to the same namespace."
      },
      {
        "id": "121",
        "version": "C# 10",
        "topic": "Record Structs",
        "articulation": "Structs can use record-style value semantics.",
        "syntax": "record struct Point(int X,int Y);",
        "myArticulation": ""
      },
      {
        "id": "122",
        "version": "C# 10",
        "topic": "with for Structs",
        "articulation": "Creates modified copies of record structs.",
        "syntax": "p with { X=10 }",
        "myArticulation": ""
      },
      {
        "id": "123",
        "version": "C# 10",
        "topic": "Extended Property Patterns",
        "articulation": "Nested property patterns are more concise.",
        "syntax": "p is { Address.City.Name: \"NY\" }",
        "myArticulation": ""
      },
      {
        "id": "124",
        "version": "C# 10",
        "topic": "Lambda Improvements",
        "articulation": "Lambdas gained more natural typing and attributes/modifiers.",
        "syntax": "var f = static x => x*2;",
        "myArticulation": ""
      },
      {
        "id": "125",
        "version": "C# 10",
        "topic": "Interpolated String Handlers",
        "articulation": "Frameworks can optimize/customize interpolation processing.",
        "syntax": "$\"Value: {x}\"",
        "myArticulation": ""
      },
      {
        "id": "126",
        "version": "C# 10",
        "topic": "CallerArgumentExpression",
        "articulation": "Captures source expression text.",
        "syntax": "[CallerArgumentExpression(\"x\")]",
        "myArticulation": ""
      }
    ]
  },
  "C# 11": {
    "version": "C# 11",
    "meta": {
      "title": ".NET 7.0 (2022)",
      "era": "Modern Core",
      "icon": "📐"
    },
    "topics": [
      {
        "id": "127",
        "version": "C# 11",
        "topic": "required Members",
        "articulation": "Required members must be initialized during object creation.",
        "syntax": "required string Name {get;init;}",
        "myArticulation": ""
      },
      {
        "id": "128",
        "version": "C# 11",
        "topic": "Raw String Literals",
        "articulation": "Multiple quotes allow convenient multiline/raw text.",
        "syntax": "\"\"\" { \"x\": 1 } \"\"\"",
        "myArticulation": ""
      },
      {
        "id": "129",
        "version": "C# 11",
        "topic": "List Patterns",
        "articulation": "Patterns can match array/list shapes and elements.",
        "syntax": "[1, 2, ..]",
        "myArticulation": ""
      },
      {
        "id": "130",
        "version": "C# 11",
        "topic": "UTF-8 String Literals",
        "articulation": "u8 creates UTF-8 byte representations.",
        "syntax": "\"hello\"u8",
        "myArticulation": ""
      },
      {
        "id": "131",
        "version": "C# 11",
        "topic": "Generic Math",
        "articulation": "Static abstract interface members enable generic numeric algorithms.",
        "syntax": "where T : INumber<T>",
        "myArticulation": ""
      },
      {
        "id": "132",
        "version": "C# 11",
        "topic": "Static Abstract Interface Members",
        "articulation": "Interfaces can require static members from implementations.",
        "syntax": "static abstract T Parse(...)",
        "myArticulation": ""
      },
      {
        "id": "133",
        "version": "C# 11",
        "topic": "file Types",
        "articulation": "Restricts a type to the current source file.",
        "syntax": "file class Helper { }",
        "myArticulation": ""
      },
      {
        "id": "134",
        "version": "C# 11",
        "topic": "Extended nameof Scope",
        "articulation": "nameof works in additional contexts.",
        "syntax": "nameof(parameter)",
        "myArticulation": ""
      },
      {
        "id": "135",
        "version": "C# 11",
        "topic": "nint / nuint Awareness",
        "articulation": "Native-sized integer types represent platform-sized integers.",
        "syntax": "nint x = 10;",
        "myArticulation": ""
      }
    ]
  },
  "C# 12": {
    "version": "C# 12",
    "meta": {
      "title": ".NET 8.0 LTS (2023)",
      "era": "Next-Gen",
      "icon": "🧩"
    },
    "topics": [
      {
        "id": "136",
        "version": "C# 12",
        "topic": "Primary Constructors",
        "articulation": "Constructor parameters can be declared directly on type declaration.",
        "syntax": "class Person(string name)",
        "myArticulation": ""
      },
      {
        "id": "137",
        "version": "C# 12",
        "topic": "Collection Expressions",
        "articulation": "Unified syntax creates collections.",
        "syntax": "int[] x = [1,2,3];",
        "myArticulation": ""
      },
      {
        "id": "138",
        "version": "C# 12",
        "topic": "Spread Operator",
        "articulation": ".. spreads elements into collection expressions.",
        "syntax": "[..items, 4]",
        "myArticulation": ""
      },
      {
        "id": "139",
        "version": "C# 12",
        "topic": "Inline Arrays",
        "articulation": "Structs can represent fixed-size inline buffers.",
        "syntax": "[InlineArray(10)]",
        "myArticulation": ""
      },
      {
        "id": "140",
        "version": "C# 12",
        "topic": "Alias Any Type",
        "articulation": "using aliases can target broader type forms.",
        "syntax": "using Point = (int X,int Y);",
        "myArticulation": ""
      },
      {
        "id": "141",
        "version": "C# 12",
        "topic": "Lambda Default Parameters",
        "articulation": "Lambda parameters can have defaults.",
        "syntax": "var f = (int x=10) => x;",
        "myArticulation": ""
      },
      {
        "id": "142",
        "version": "C# 12",
        "topic": "ref readonly Parameters",
        "articulation": "Improved readonly reference parameter support.",
        "syntax": "M(ref readonly value)",
        "myArticulation": ""
      },
      {
        "id": "143",
        "version": "C# 12",
        "topic": "Interceptors Awareness",
        "articulation": "Compiler interception supports source-generator scenarios.",
        "syntax": "[InterceptsLocation(...)]",
        "myArticulation": ""
      },
      {
        "id": "144",
        "version": "C# 12",
        "topic": "Experimental Features",
        "articulation": "Understand compiler/platform feature lifecycle.",
        "syntax": "Feature-specific attributes",
        "myArticulation": ""
      }
    ]
  },
  "C# 13": {
    "version": "C# 13",
    "meta": {
      "title": ".NET 9.0 (2024)",
      "era": "Next-Gen",
      "icon": "🔒"
    },
    "topics": [
      {
        "id": "145",
        "version": "C# 13",
        "topic": "params Collections",
        "articulation": "params can work with collection-compatible types beyond arrays.",
        "syntax": "void M(params ReadOnlySpan<int> x)",
        "myArticulation": ""
      },
      {
        "id": "146",
        "version": "C# 13",
        "topic": "lock Improvements",
        "articulation": "lock gains optimized behavior for System.Threading.Lock.",
        "syntax": "lock (lockObj) { }",
        "myArticulation": ""
      },
      {
        "id": "147",
        "version": "C# 13",
        "topic": "New Escape Sequences",
        "articulation": "Additional escape-sequence capabilities simplify text literals.",
        "syntax": "\\e",
        "myArticulation": ""
      },
      {
        "id": "148",
        "version": "C# 13",
        "topic": "Partial Properties",
        "articulation": "Properties can participate in partial declarations.",
        "syntax": "partial string Name { get; }",
        "myArticulation": ""
      },
      {
        "id": "149",
        "version": "C# 13",
        "topic": "Partial Indexers",
        "articulation": "Indexers can be declared partially.",
        "syntax": "partial string this[int i]",
        "myArticulation": ""
      },
      {
        "id": "150",
        "version": "C# 13",
        "topic": "ref struct Improvements",
        "articulation": "ref struct restrictions and usage become more flexible.",
        "syntax": "ref struct Buffer",
        "myArticulation": ""
      },
      {
        "id": "151",
        "version": "C# 13",
        "topic": "ref/unsafe Improvements",
        "articulation": "Additional compiler support improves low-level programming.",
        "syntax": "ref, unsafe",
        "myArticulation": ""
      },
      {
        "id": "152",
        "version": "C# 13",
        "topic": "await in lock-related Patterns",
        "articulation": "Understand newer synchronization/compiler capabilities.",
        "syntax": "Lock APIs",
        "myArticulation": ""
      }
    ]
  },
  "C# 14": {
    "version": "C# 14",
    "meta": {
      "title": ".NET 10 (2025-2026)",
      "era": "Next-Gen",
      "icon": "🏷"
    },
    "topics": [
      {
        "id": "153",
        "version": "C# 14",
        "topic": "Extension Members",
        "articulation": "Extension blocks allow extensions beyond traditional extension methods.",
        "syntax": "extension(string s) { ... }",
        "myArticulation": ""
      },
      {
        "id": "154",
        "version": "C# 14",
        "topic": "field Keyword",
        "articulation": "Accesses compiler-generated backing field inside property accessors.",
        "syntax": "set => field = value;",
        "myArticulation": ""
      },
      {
        "id": "155",
        "version": "C# 14",
        "topic": "Null-Conditional Assignment",
        "articulation": "?./?[] can participate in assignment.",
        "syntax": "obj?.Property = value;",
        "myArticulation": ""
      },
      {
        "id": "156",
        "version": "C# 14",
        "topic": "Implicit Span Conversions",
        "articulation": "Improved conversions make Span-based APIs easier to use.",
        "syntax": "Span<int> s = arr;",
        "myArticulation": ""
      },
      {
        "id": "157",
        "version": "C# 14",
        "topic": "Lambda Parameter Modifiers",
        "articulation": "Lambda parameters gain additional modifier capabilities.",
        "syntax": "(ref int x) => ...",
        "myArticulation": ""
      },
      {
        "id": "158",
        "version": "C# 14",
        "topic": "Partial Constructors/Events",
        "articulation": "Partial types gain additional partial member capabilities.",
        "syntax": "partial void ... / partial constructor",
        "myArticulation": ""
      },
      {
        "id": "159",
        "version": "C# 14",
        "topic": "User-Defined Compound Assignment",
        "articulation": "Types can customize compound assignment behavior.",
        "syntax": "a += b",
        "myArticulation": ""
      },
      {
        "id": "160",
        "version": "C# 14",
        "topic": "Extended Partial/Member Features",
        "articulation": "Latest C# member-extension capabilities for advanced APIs.",
        "syntax": "C# 14 member syntax",
        "myArticulation": ""
      }
    ]
  },
  "C# 15": {
    "version": "C# 15",
    "meta": {
      "title": ".NET Next / Future",
      "era": "Future Architecture",
      "icon": "🔮"
    },
    "topics": [
      {
        "id": "283",
        "version": "C# 15",
        "topic": "Collection Expression Arguments",
        "articulation": "C# 15 enhances collection expressions by allowing additional arguments to control collection construction.",
        "syntax": "List<int> numbers =\n[\n    with(capacity: 3),\n    10,\n    20,\n    30\n];\n\nConsole.WriteLine(numbers.Count);\nConsole.WriteLine(numbers.Capacity);",
        "myArticulation": "C# 15 allows collection expressions to supply arguments used when creating the underlying collection through with(...). Memory: with(...) → collection creation arguments"
      },
      {
        "id": "284",
        "version": "C# 15",
        "topic": "with(...) Collection Arguments",
        "articulation": "with(...) isn't itself the capacity. It is the mechanism for supplying an argument.",
        "syntax": "List<int> numbers =\n[\n    with(capacity: 5),\n    10,\n    20\n];",
        "myArticulation": "with(...) allows me to provide arguments to the constructor or collection-builder mechanism used to create the target collection. Memory: with(...) → pass creation arguments."
      },
      {
        "id": "285",
        "version": "C# 15",
        "topic": "Collection Capacity",
        "articulation": "Collection expressions can communicate capacity information during construction.",
        "syntax": "List<string> statuses =\n[\n    with(capacity: 5),\n    \"New\",\n    \"Open\",\n    \"Resolved\",\n    \"Closed\"\n];\n\nConsole.WriteLine(statuses.Count);    // 4\nConsole.WriteLine(statuses.Capacity); // 5",
        "myArticulation": "capacity specifies the List's initial allocated capacity; it is not a maximum number of elements. The List can automatically grow when more elements are added. Memory: Count = actual items; Capacity = allocated space."
      },
      {
        "id": "286",
        "version": "C# 15",
        "topic": "Collection Comparer",
        "articulation": "Collection construction can specify comparer-related behavior where supported.",
        "syntax": "HashSet<string> names =\n[\n    with(StringComparer.OrdinalIgnoreCase),\n    \"Deepthi\",\n    \"DEEPTHI\",\n    \"deepthi\"\n];\n\nConsole.WriteLine(names.Count);",
        "myArticulation": "A collection expression can pass a comparer to the underlying collection, allowing me to control how values are compared. Here, OrdinalIgnoreCase makes the HashSet treat different casing of the same string as equal. Memory: comparer → controls equality/comparison behavior."
      },
      {
        "id": "287",
        "version": "C# 15",
        "topic": "Collection Arguments with List<T>",
        "articulation": "Collection expression arguments can be used with supported collection types such as List<T>.",
        "syntax": "List<int> numbers =\n[\n    with(capacity: 10),\n    1,\n    2,\n    3\n];",
        "myArticulation": "With List<T>, I can use a collection expression argument such as capacity to provide the List's initial capacity while creating the collection. Memory: List<T> → capacity."
      },
      {
        "id": "288",
        "version": "C# 15",
        "topic": "Collection Arguments with HashSet<T>",
        "articulation": "Collection expressions can work with constructor information such as comparer configuration.",
        "syntax": "HashSet<string> statuses =\n[\n    with(StringComparer.OrdinalIgnoreCase),\n    \"Open\",\n    \"OPEN\",\n    \"open\"\n];\n\nConsole.WriteLine(statuses.Count);",
        "myArticulation": "With HashSet<T>, I can pass a comparer through with(...) so the collection uses the required equality rules when determining duplicate values. Memory: HashSet + comparer → controls duplicate detection."
      },
      {
        "id": "289",
        "version": "C# 15",
        "topic": "Collection Arguments + Spread",
        "articulation": "Collection-expression arguments work together with collection expressions and spread elements.",
        "syntax": "List<int> first =\n[\n    1,\n    2,\n    3\n];\n\nList<int> second =\n[\n    with(capacity: 10),\n    ..first,\n    4,\n    5\n];\n\nforeach (int number in second)\n{\n    Console.WriteLine(number);\n}",
        "myArticulation": "I can combine collection arguments with the spread operator. with(...) configures the target collection, while .. expands another collection's elements into it. Memory: with → configure; .. → expand/copy elements."
      },
      {
        "id": "290",
        "version": "C# 15",
        "topic": "Collection Expression vs Initializer",
        "articulation": "Collection expressions and traditional collection initializers solve similar problems but have different syntax and capabilities.",
        "syntax": "traditional:-  List<int> numbers = new List<int>\n{\n    1,\n    2,\n    3\n};   Collection expression: List<int> numbers =\n[\n    1,\n    2,\n    3\n];",
        "myArticulation": "A collection initializer works with an explicitly created collection object, while a collection expression provides a concise syntax for creating collections and can target different collection types. C# 15 further extends collection expressions with with(...) arguments. Memory: initializer → new Type {}; expression → []."
      },
      {
        "id": "291",
        "version": "C# 15",
        "topic": "Union Types",
        "articulation": "Union = OR\n\nSuccess OR Error\nPatientFound OR PatientNotFound\nCash OR Card",
        "syntax": "`union Result = Success",
        "myArticulation": "A union type represents a value that can be one of several predefined alternatives. It is useful when a method can return different well-defined outcomes, because the possible cases are explicitly modeled instead of using loosely typed values such as object"
      },
      {
        "id": "292",
        "version": "C# 15",
        "topic": "Union Cases",
        "articulation": "A union defines a fixed set of possible cases.",
        "syntax": "Union Type  → Result\nUnion Cases → Success, Error",
        "myArticulation": "A union case represents one specific alternative within a union type. For example, Success and Error are cases of the Result type."
      },
      {
        "id": "293",
        "version": "C# 15",
        "topic": "Union Pattern Matching",
        "articulation": "Union values can be handled using pattern matching.",
        "syntax": "Result\n   │\n   ├── Success → extract Message\n   │\n   └── Error   → extract Message",
        "myArticulation": "Union pattern matching means examining a union value to determine which case it represents and then safely accessing the data associated with that case."
      },
      {
        "id": "294",
        "version": "C# 15",
        "topic": "Exhaustive Union Handling",
        "articulation": "Pattern matching can ensure that all union cases are considered.",
        "syntax": "Result result = new Success(\"Patient found\");\n\nstring message = result switch\n{\n    Success success => $\"Success: {success.Message}\",\n    Error error => $\"Error: {error.Message}\"\n};\n\nConsole.WriteLine(message);",
        "myArticulation": "\"Exhaustive union handling means ensuring that every possible case of a union is handled. This prevents an unhandled case from being silently ignored when new cases are introduced."
      },
      {
        "id": "295",
        "version": "C# 15",
        "topic": "Union + switch",
        "articulation": "Union cases can be processed through switch expressions/statements.",
        "syntax": "result switch { ... }",
        "myArticulation": "We can use C# switch pattern matching to handle each union case explicitly. This makes the code readable and allows us to process the data associated with each case."
      },
      {
        "id": "296",
        "version": "C# 15",
        "topic": "Union + Records",
        "articulation": "Records can be used to model individual alternatives in a union hierarchy.",
        "syntax": "record Success(...);",
        "myArticulation": "Records can be used to model union cases because they provide concise, immutable data-oriented types. A base record can represent the union-style type, while derived records represent the individual cases, which can then be handled using pattern matching."
      },
      {
        "id": "297",
        "version": "C# 15",
        "topic": "Closed Hierarchies",
        "articulation": "C# 15 introduces closed hierarchies to explicitly restrict the permitted derived types.",
        "syntax": "closed class Result",
        "myArticulation": "A closed hierarchy defines a controlled set of related types, making the hierarchy predictable and particularly useful for exhaustive pattern matching."
      },
      {
        "id": "298",
        "version": "C# 15",
        "topic": "closed Modifier",
        "articulation": "The closed modifier expresses that a type hierarchy has a known set of descendants.",
        "syntax": "closed hierarchy → CONCEPT\nsealed           → ACTUAL C# modifier          public abstract record Result;\n\npublic sealed record Success : Result;\n\npublic sealed record NotFound : Result;\n\npublic sealed record AccessDenied : Result;",
        "myArticulation": "closed is not a general C# class modifier. A closed hierarchy is a design concept where the permitted cases of a type hierarchy are known and controlled. In C#, this can be modeled using mechanisms such as abstract base types and sealed derived types."
      },
      {
        "id": "299",
        "version": "C# 15",
        "topic": "Closed Class Hierarchy",
        "articulation": "A closed hierarchy allows exhaustive reasoning over derived types.",
        "syntax": "public abstract record ApiResult;\n\n// Each case is sealed so nobody can derive another type from it.\npublic sealed record Success(string Data) : ApiResult;\n\npublic sealed record NotFound(string Message) : ApiResult;\n\npublic sealed record AccessDenied(string Message) : ApiResult;",
        "myArticulation": "A closed class hierarchy is a hierarchy where the set of permitted derived types is intentionally controlled. In C#, this can be modeled using an abstract base type and sealed derived types, which is useful for representing a fixed set of domain cases and performing pattern matching."
      },
      {
        "id": "300",
        "version": "C# 15",
        "topic": "Closed Hierarchy + Pattern Matching",
        "articulation": "Closed hierarchies improve compiler knowledge during pattern matching.",
        "syntax": "shape switch { ... }",
        "myArticulation": "A closed hierarchy works well with pattern matching because the application has a controlled set of derived types. We can use switch pattern matching to explicitly handle each known case."
      },
      {
        "id": "301",
        "version": "C# 15",
        "topic": "closed vs sealed",
        "articulation": "sealed prevents further inheritance from a particular type, while closed describes a controlled hierarchy.",
        "syntax": "sealed class A vs closed class A",
        "myArticulation": "sealed is a C# modifier that prevents further inheritance from a specific type. A closed hierarchy is a broader design concept where the complete set of permitted types or cases is known and controlled.\""
      },
      {
        "id": "302",
        "version": "C# 15",
        "topic": "closed vs abstract",
        "articulation": "abstract prevents direct instantiation but does not by itself close the inheritance hierarchy.",
        "syntax": "abstract class Shape",
        "myArticulation": "abstract prevents direct instantiation of a type while still allowing inheritance. A closed hierarchy is concerned with restricting or knowing the complete set of types in the hierarchy. Therefore, abstract and closed solve different problems."
      },
      {
        "id": "303",
        "version": "C# 15",
        "topic": "Extension Indexers",
        "articulation": "Extension indexers provide indexer-style [] access to an existing type without modifying its source.",
        "syntax": "Extension indexers provide indexer-style [] access to an existing type without modifying its source. Add []-style access externally.",
        "myArticulation": "Accessing domain collection data such as patients[id] without changing the original collection class."
      },
      {
        "id": "304",
        "version": "C# 15",
        "topic": "Extension Indexer",
        "articulation": "Indexer An extension indexer is the indexer-style member being conceptually added to an existing type.",
        "syntax": "Instead of calling obj.Get(index), access data using obj[index]",
        "myArticulation": "patients[patientId] for convenient domain-object lookup."
      },
      {
        "id": "305",
        "version": "C# 15",
        "topic": "Extension Indexer Receiver",
        "articulation": "The receiver is the existing object/type on which the extension member operates.",
        "syntax": "extension(Type receiver) It identifies which type is being extended.",
        "myArticulation": "extension(PatientCollection patients) → patients is the receiver."
      },
      {
        "id": "306",
        "version": "C# 15",
        "topic": "Extension Indexer vs Extension Method",
        "articulation": "Extension methods use (), while indexer-style access uses [].",
        "syntax": "Method: obj.Get(id) / obj.Get() → Indexer: obj[id] Method = invoke behavior; Indexer = access an item.",
        "myArticulation": "patients.GetById(id) vs patients[id]."
      },
      {
        "id": "307",
        "version": "C# 15",
        "topic": "Extension Members Evolution",
        "articulation": "C# extension functionality evolved from standalone extension methods toward grouped extension-member syntax such as extension blocks.",
        "syntax": "extension(Type receiver) { ... } Extension functionality becomes more structured and can group members for a receiver.",
        "myArticulation": "Keep related domain extensions together instead of scattering many extension methods across files."
      },
      {
        "id": "308",
        "version": "C# 15",
        "topic": "Labeled break",
        "articulation": "C# 15 allows break to target a labeled statement.",
        "syntax": "break outerLoop;",
        "myArticulation": ""
      },
      {
        "id": "309",
        "version": "C# 15",
        "topic": "Labeled continue",
        "articulation": "C# 15 allows continue to target a labeled loop.",
        "syntax": "continue outerLoop;",
        "myArticulation": ""
      },
      {
        "id": "310",
        "version": "C# 15",
        "topic": "Nested Loop Control",
        "articulation": "Labeled control flow simplifies certain deeply nested-loop scenarios.",
        "syntax": "outer: + break outer;",
        "myArticulation": ""
      },
      {
        "id": "311",
        "version": "C# 15",
        "topic": "Labeled break vs goto",
        "articulation": "Labeled break provides structured loop control without general-purpose goto.",
        "syntax": "break outer;",
        "myArticulation": ""
      },
      {
        "id": "312",
        "version": "C# 15",
        "topic": "Memory Safety",
        "articulation": "C# 15 introduces changes aimed at improving compile-time memory-safety analysis around unsafe code.",
        "syntax": "unsafe / safe contexts",
        "myArticulation": ""
      },
      {
        "id": "313",
        "version": "C# 15",
        "topic": "unsafe Context",
        "articulation": "Unsafe operations continue to require explicit unsafe contexts where applicable.",
        "syntax": "unsafe { ... }",
        "myArticulation": ""
      },
      {
        "id": "314",
        "version": "C# 15",
        "topic": "unsafe Expression",
        "articulation": "Unsafe context can be scoped more precisely around an expression.",
        "syntax": "unsafe(expr)",
        "myArticulation": ""
      },
      {
        "id": "315",
        "version": "C# 15",
        "topic": "safe Context",
        "articulation": "C# 15 introduces additional concepts for identifying code that can remain within safe memory rules.",
        "syntax": "safe",
        "myArticulation": ""
      },
      {
        "id": "316",
        "version": "C# 15",
        "topic": "Pointer Safety",
        "articulation": "Pointer operations remain subject to unsafe/memory-safety rules.",
        "syntax": "int* p",
        "myArticulation": ""
      },
      {
        "id": "317",
        "version": "C# 15",
        "topic": "fixed",
        "articulation": "fixed is used when a managed object needs to be pinned for pointer-based access.",
        "syntax": "fixed (int* p = array)",
        "myArticulation": ""
      },
      {
        "id": "318",
        "version": "C# 15",
        "topic": "stackalloc",
        "articulation": "stackalloc allocates memory on the stack rather than the managed heap.",
        "syntax": "Span<int> buffer = stackalloc int[10];",
        "myArticulation": ""
      },
      {
        "id": "319",
        "version": "C# 15",
        "topic": "sizeof",
        "articulation": "sizeof obtains the size of a type in bytes in supported contexts.",
        "syntax": "sizeof(int)",
        "myArticulation": ""
      },
      {
        "id": "320",
        "version": "C# 15",
        "topic": "Function Pointers",
        "articulation": "Function pointers provide low-level callable addresses.",
        "syntax": "delegate*<int,int>",
        "myArticulation": ""
      },
      {
        "id": "321",
        "version": "C# 15",
        "topic": "Memory Safety Attributes",
        "articulation": "C# 15 adds mechanisms for communicating memory-safety requirements to the compiler.",
        "syntax": "Memory-safety attributes",
        "myArticulation": ""
      },
      {
        "id": "322",
        "version": "C# 15",
        "topic": "Caller Safety Requirements",
        "articulation": "Unsafe requirements can propagate to callers depending on the API.",
        "syntax": "unsafe API call",
        "myArticulation": ""
      },
      {
        "id": "323",
        "version": "C# 15",
        "topic": "C# 15 + Pattern Matching",
        "articulation": "C# 15 features continue the language's pattern-matching direction.",
        "syntax": "switch expressions",
        "myArticulation": ""
      },
      {
        "id": "324",
        "version": "C# 15",
        "topic": "C# 15 + Records",
        "articulation": "Records remain useful for immutable, data-oriented domain models.",
        "syntax": "record Success(...)",
        "myArticulation": ""
      },
      {
        "id": "325",
        "version": "C# 15",
        "topic": "C# 15 + Extension Blocks",
        "articulation": "C# 15 builds on the extension-member model introduced in C# 14.",
        "syntax": "extension(Type value)",
        "myArticulation": ""
      },
      {
        "id": "326",
        "version": "C# 15",
        "topic": "C# 15 + Collection Expressions",
        "articulation": "Collection expressions continue to evolve from C# 12 onward.",
        "syntax": "var items = [1,2,3];",
        "myArticulation": ""
      },
      {
        "id": "327",
        "version": "C# 15",
        "topic": "C# 15 Language Version",
        "articulation": "C# 15 is associated with the .NET 11 generation.",
        "syntax": "<LangVersion>15.0</LangVersion> / preview",
        "myArticulation": ""
      },
      {
        "id": "328",
        "version": "C# 15",
        "topic": "C# 14 → C# 15",
        "articulation": "C# 15 continues the extension-member and modern type-system evolution from C# 14.",
        "syntax": "C# 14 → C# 15",
        "myArticulation": ""
      },
      {
        "id": "329",
        "version": "C# 15",
        "topic": "C# 13 → C# 15",
        "articulation": "C# 15 builds on modern collection expressions, pattern matching, and low-level programming capabilities.",
        "syntax": "C# 13 → 14 → 15",
        "myArticulation": ""
      },
      {
        "id": "330",
        "version": "C# 15",
        "topic": "Architect-Level Use Case",
        "articulation": "Union/closed types can model finite business states.",
        "syntax": "`Success",
        "myArticulation": ""
      },
      {
        "id": "331",
        "version": "C# 15",
        "topic": "Architect-Level Use Case",
        "articulation": "Extension indexers can provide domain-specific access syntax without modifying external types.",
        "syntax": "customer[accountId]",
        "myArticulation": ""
      },
      {
        "id": "332",
        "version": "C# 15",
        "topic": "Architect-Level Use Case",
        "articulation": "Closed hierarchies can make domain states exhaustive and compiler-verifiable.",
        "syntax": "closed + switch",
        "myArticulation": ""
      }
    ]
  }
};
