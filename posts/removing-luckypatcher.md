# Removing Luckypatcher in CandyBar Dashboard
If you tried to edit the source code, First of all revert back to the stage when you just started editing source code.

1. Go to build.gradle(app) then you will find something like this
```
compile 'com.github.danimahardhika.candybar-library:core:3.5.0-b4'
```
Edit it to
```
implementation 'com.github.danimahardhika.candybar-library:core:3.5.0-b4'

implementation('com.github.danimahardhika.android-helpers:core:-SNAPSHOT') {

changing = true

}

implementation 'com.afollestad.material-dialogs:core:0.9.5.0'

```
Then in build.gradle(module) add this
