# ProGuard rules for Gservia Android Release Build

# Keep WebView JavaScript Interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keepattributes JavascriptInterface
-keepattributes *Annotation*

# Keep WebKit and Custom Tabs
-keep class androidx.webkit.** { *; }
-keep class androidx.browser.customtabs.** { *; }

# Keep App Package Models
-keep class com.gservia.app.** { *; }
