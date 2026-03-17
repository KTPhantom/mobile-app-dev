export const moduleTheoryData = {
  m1: {
    title: "Mobile Ecosystem Overview",
    sections: [
      {
        heading: "What is a Mobile Ecosystem?",
        content: "A mobile ecosystem is the collection of multiple devices, software (OS), developers, and the app stores that allow developers to reach users. The two dominant ecosystems today are Apple's iOS and Google's Android."
      },
      {
        heading: "Android vs. iOS",
        content: "Android is open-source (AOSP), allowing any manufacturer (Samsung, Nothing, Xiaomi) to customize and use it. This leads to high market share but severe fragmentation. iOS is a closed ecosystem, running only on Apple hardware. It offers immense control, strict quality standards, and uniformity, but requires developers to own Mac hardware to build apps."
      },
      {
        heading: "The App Stores",
        content: "The Google Play Store and Apple App Store act as the distributors. They manage payments, security reviews, and updates, usually taking a 15-30% cut of revenue. They are the essential gateway to reaching the billions of smartphone users worldwide."
      }
    ]
  },
  m2: {
    title: "Designing for Mobile Context",
    sections: [
      {
        heading: "What is 'Context'?",
        content: "Context refers to the physical and physical environment in which a user interacts with your app. Unlike desktop users who are seated with reliable power and internet, mobile users are often moving, distracted, or dealing with poor signal."
      },
      {
        heading: "Key Contextual Constraints",
        content: "1. Battery Life: Heavy animations or constant GPS tracking will drain the battery, causing users to uninstall the app.\n2. Network Reliability: Mobile connections drop frequently (elevators, tunnels). Apps must cache data and handle offline states gracefully (e.g., Skeleton loaders).\n3. Attention Span: Mobile sessions are often micro-interactions (glancing while waiting for a bus). UIs must be instantly readable."
      },
      {
        heading: "One-Handed Use",
        content: "As screens get larger, the 'thumb zone' becomes critical. Primary actions (like navigation or 'Add to Cart' buttons) should be placed at the bottom of the screen where the thumb naturally rests."
      }
    ]
  },
  m3: {
    title: "Mobile Information Architecture (IA)",
    sections: [
      {
        heading: "Defining Mobile IA",
        content: "Information Architecture is the structural design of an application. It involves organizing, labeling, and navigating content so users can find what they need easily on a tiny 6-inch screen."
      },
      {
        heading: "Common Navigation Patterns",
        content: "1. Bottom Navigation Bar: Excellent for main top-level destinations (3-5 items). Instantly visible and reachable via thumb.\n2. Hamburger Menu (Navigation Drawer): Good for secondary links (Settings, Help, Profile). However, it hides content from the user, reducing engagement.\n3. Tabs: Used to organize closely related content at the top of the screen (e.g., 'Chats', 'Status', 'Calls' in WhatsApp)."
      },
      {
        heading: "The 'Three-Click Rule'",
        content: "A common UX principle stating that a user should be able to find any information with no more than three screen taps. While not a strict law, it emphasizes reducing friction and deep nested menus."
      }
    ]
  },
  m4: {
    title: "Types of Mobile Applications",
    sections: [
      {
        heading: "Native Applications",
        content: "Apps built specifically for one platform using its native languages (Kotlin/Java for Android, Swift/Objective-C for iOS). They offer the best performance, full hardware access (Camera, Bluetooth), and native UI feel, but require two separate development teams."
      },
      {
        heading: "Cross-Platform Frameworks",
        content: "Tools like React Native or Flutter allow developers to write code once (in JavaScript or Dart) and deploy to both iOS and Android. They are highly cost-effective and faster to build, though they can sometimes suffer slight performance hits on complex animations."
      },
      {
        heading: "Progressive Web Apps (PWAs)",
        content: "PWAs are essentially websites that act like apps. They load in the browser but can be 'installed' to the home screen, send push notifications, and work offline. They bypass the App Stores entirely, avoiding revenue cuts and review processes."
      }
    ]
  },
  m5: {
    title: "Deploying Android Applications",
    sections: [
      {
        heading: "APK vs AAB",
        content: "Historically, Android apps were packaged as APKs (Android Package Kit). Today, Google requires AABs (Android App Bundles). An AAB contains all your compiled code and resources, but Google Play uses it to generate and serve optimized, smaller APKs tailored to specific devices (e.g., stripping out high-res assets for a low-res phone)."
      },
      {
        heading: "App Signing (Keystore)",
        content: "Before uploading to the Play Store, an app must be cryptographically signed using a Keystore. This proves that you are the authentic developer. If you lose your Keystore password, you cannot update your app ever again."
      },
      {
        heading: "The Play Console",
        content: "The Google Play Console is the dashboard where developers upload AABs, write store listings (Title, Description, Screenshots), set pricing, and monitor crash reports and user reviews."
      }
    ]
  },
  m6: {
    title: "Embedded Systems & OS Architecture",
    sections: [
      {
        heading: "The Android Stack Overview",
        content: "Android is built in software layers. At the bottom is the hardware, and at the top is the UI the user sees. The OS manages the translation between the two."
      },
      {
        heading: "1. The Linux Kernel",
        content: "The foundational layer. It handles the lowest-level tasks: managing the device's physical memory, powering the screen, and communicating with the Bluetooth/Wi-Fi chips."
      },
      {
        heading: "2. HAL & ART (Hardware Abstraction & RunTime)",
        content: "The HAL provides standard interfaces that expose hardware capabilities to the higher-level Java framework. ART (Android Runtime) is the engine that compiles and executes the app's code efficiently."
      },
      {
        heading: "3. Application Framework",
        content: "The collection of APIs (LocationManager, NotificationManager, ActivityManager) that developers interact with when writing Java/Kotlin code to build apps."
      }
    ]
  },
  m7: {
    title: "Design Constraints (Memory & Battery)",
    sections: [
      {
        heading: "The Harsh Mobile Environment",
        content: "Desktop apps assume infinite power and massive RAM. Mobile apps operate in a hostile environment where the OS is constantly looking for ways to kill background processes to save battery or free up memory for the foreground active app."
      },
      {
        heading: "Memory Management (OOM)",
        content: "If your app loads massive uncompressed images or leaks memory, the Android OS will forcefully crash it resulting in an Out Of Memory (OOM) error. Developers must proactively recycle bitmaps and release resources."
      },
      {
        heading: "Battery Drainers",
        content: "The biggest drains on a battery are: Screen Brightness, Cellular Radio (Network requests), and the GPS chip. To optimize, developers should batch network requests together instead of making constant tiny pings."
      }
    ]
  },
  m8: {
    title: "The Activity Lifecycle",
    sections: [
      {
        heading: "What is the Lifecycle?",
        content: "An Activity (a screen in Android) is controlled by the OS, not the user. As the user navigates, gets phone calls, or switches apps, the OS moves the Activity through different states using callback methods."
      },
      {
        heading: "Core Callbacks",
        content: "• onCreate(): Called once when the app launches. Used to initialize UI (setContentView).\n• onStart(): Activity becomes visible to the user.\n• onResume(): Activity is in the foreground and actively accepting user input.\n• onPause(): Activity loses focus (partially obscured by a dialog or incoming call). Save draft UI state here!\n• onStop(): Activity is no longer visible (User pressed Home button).\n• onDestroy(): Activity is killed by the OS to reclaim memory."
      },
      {
        heading: "State Restoration",
        content: "If an app is killed while in the background, Android provides a Bundle in `onSaveInstanceState` to let developers save small amounts of data (like text typed in a box) so the app can restore it when reopened, creating the illusion it was never killed."
      }
    ]
  },
  m9: {
    title: "Activities and Views (Layouts)",
    sections: [
      {
        heading: "View vs ViewGroup",
        content: "A 'View' is a single, visible UI component like a Button, TextView, or ImageView. A 'ViewGroup' is an invisible container that holds and positions multiple Views (e.g., placing them in a row or grid)."
      },
      {
        heading: "Common ViewGroups (Layouts)",
        content: "• LinearLayout: Arranges children in a single column (vertical) or row (horizontal).\n• RelativeLayout: Arranges children relative to one another (e.g., 'Button A is below Button B').\n• ConstraintLayout: The modern standard. Creates flat, complex view hierarchies by constraining elements to guidelines or other views, improving rendering performance."
      },
      {
        heading: "XML Declarations",
        content: "Android UIs are typically written in XML. This allows for clean separation of concerns: Designers can look at the XML structure, while developers handle the Java/Kotlin logic separately."
      }
    ]
  },
  m10: {
    title: "Introduction to Event Listeners",
    sections: [
      {
        heading: "The Event-Driven Paradigm",
        content: "Mobile apps are 'event-driven'. They sit idle until the user does something (taps, swipes, types). When the hardware detects a touch, it sends an 'Event' object to the OS, which routes it to your specific View."
      },
      {
        heading: "What is a Listener?",
        content: "A Listener is an Interface that waits for a specific event to occur on a View. When the event happens, the Listener triggers a 'Callback Function' containing the logic you want to execute."
      },
      {
        heading: "Types of Events",
        content: "While 'Clicks' are the most common, developers must also listen for Long-Presses, Swipes, Scroll events, Keyboard 'Done' button presses, and focus changes."
      }
    ]
  },
  m11: {
    title: "Handling Events & The Main Thread",
    sections: [
      {
        heading: "The UI Thread (Main Thread)",
        content: "Android has a single main thread dedicated exclusively to drawing the UI and processing user input events (like clicks). It redraws the screen every 16 milliseconds (to hit 60 FPS)."
      },
      {
        heading: "The Fatal Mistake: Blocking the UI",
        content: "If you place a heavy task (like downloading a 10MB image or querying a large database) inside a Click Listener, the Main Thread becomes stuck doing that work. It can no longer draw the screen or process other clicks."
      },
      {
        heading: "Application Not Responding (ANR)",
        content: "If the Main Thread is blocked for more than 5 seconds, the OS assumes the app has frozen and displays the dreaded ANR dialog, asking the user to rigidly 'Force Close' the app. Heavy tasks MUST be offloaded to Background or Worker Threads."
      }
    ]
  },
  m12: {
    title: "Event Listener Implementations",
    sections: [
      {
        heading: "The Interface Contract",
        content: "In Java, an Event Listener is just an Interface. For example, `View.OnClickListener`. To attach it to a button, you must provide an object that implements this interface and overrides its `onClick(View v)` method."
      },
      {
        heading: "Anonymous Inner Classes & Lambdas",
        content: "Historically, developers used anonymous inner classes to declare listeners right where they needed them. Today, modern Java (and Kotlin) use Lambda expressions (`v -> doSomething()`) to dramatically reduce boilerplate code and make listeners readable."
      },
      {
        heading: "Specific Listener Types",
        content: "Different views emit different events. A Button uses `OnClickListener`. A CheckBox uses `OnCheckedChangeListener` (because it can change state without a physical touch). A ListView uses `OnItemClickListener` (passing the position of the tapped row)."
      }
    ]
  },
  m13: {
    title: "Toast Messages and User Feedback",
    sections: [
      {
        heading: "What is a Toast?",
        content: "A Toast is a brief, transient popup message that appears at the bottom of the screen. It fades in, displays text for a few seconds, and fades out automatically. Crucially, it does not steal focus or interrupt what the user is doing."
      },
      {
        heading: "When to Use Toasts",
        content: "Toasts are perfect for non-critical feedback where no action is required. Examples: 'Draft saved', 'Email sent', or 'Welcome back'. If the user misses the message, it shouldn't be a disaster."
      },
      {
        heading: "Toasts vs. Dialogs vs. Snackbars",
        content: "• Toasts: Temporary, automatic, no actions.\n• Snackbars: Like Toasts, but often include a single action button (e.g., 'Item deleted. [UNDO]').\n• AlertDialogs: Intrusive popups that block the entire screen, dim the background, and rigidly lock the user until they press 'OK' or 'Cancel'. Use only for critical, destructive actions (e.g., 'Delete account?')."
      }
    ]
  },
  m14: {
    title: "Connecting XML and Java",
    sections: [
      {
        heading: "Separation of Concerns",
        content: "Android enforces separating the UI definition (XML) from the application logic (Java/Kotlin). This makes the app easier to maintain, localize into different languages, and allows designers to work independently of programmers."
      },
      {
        heading: "The R Class",
        content: "When you compile your app, Android parses all your XML files and creates a giant auto-generated index file called `R.java`. This file assigns unique integer IDs to every View, String, and Image you defined."
      },
      {
        heading: "findViewById()",
        content: "The bridge between XML and Java. In your Java code, you call `findViewById(R.id.myButton)`. The OS looks up that ID, finds the visual button you drew in XML, and gives you a Java reference to it so you can attach listeners or change its text dynamically."
      }
    ]
  }
};
