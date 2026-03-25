# THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!!

# Copyright 2020-2023 Tauri Programme within The Commons Conservancy
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-Identifier: MIT

-keep class com.tugnodev.campus_colobane_frontend.* {
  native <methods>;
}

-keep class com.tugnodev.campus_colobane_frontend.WryActivity {
  public <init>(...);

  void setWebView(com.tugnodev.campus_colobane_frontend.RustWebView);
  java.lang.Class getAppClass(...);
  java.lang.String getVersion();
}

-keep class com.tugnodev.campus_colobane_frontend.Ipc {
  public <init>(...);

  @android.webkit.JavascriptInterface public <methods>;
}

-keep class com.tugnodev.campus_colobane_frontend.RustWebView {
  public <init>(...);

  void loadUrlMainThread(...);
  void loadHTMLMainThread(...);
  void evalScript(...);
}

-keep class com.tugnodev.campus_colobane_frontend.RustWebChromeClient,com.tugnodev.campus_colobane_frontend.RustWebViewClient {
  public <init>(...);
}
