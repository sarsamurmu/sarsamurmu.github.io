# Removing Luckypatcher in CandyBar Dashboard
If you tried to edit the source code, First of all revert back to the stage when you just started editing source code.

1. Go to build.gradle(Module: app) then follow [this](https://github.com/sarsamurmu/uses/commit/25d89e417dccf6f7ef08454e4daa9f2723ded612) commit.
2. Download [this](https://drive.google.com/file/d/14MPDCdr4m2dl3VWCgCsxYv-1QmTyoeaS/view?usp=drivesdk) zip and extract files, copy the "com" folder.
3. Go to app>src>main>java and paste the copied "com" folder. If it says something merges or replaces then merge or replace them.
4. Done! Open Android Studio, Sync Project and then Clean Project.

Hope it helps.
