# HLabs

This is the working repository for HLabs, a free open-source server which provides an opinionated desktop virtual environment for bioinformatics work.

<img width="1900" height="915" alt="Users" src="https://github.com/user-attachments/assets/6945b5f7-719c-47b1-867c-45ffc5e95af5" />
Figure 1. Showing inbuilt-windows using `iframe` components, which we can add added contexct to through the `window` property (red), allowing seamless IPC communication. Permissions (yellow) showing users, organisations, teams, billing etc. Workspaces (purple).

<img width="1899" height="911" alt="connections" src="https://github.com/user-attachments/assets/34f8dfc1-d986-46ef-b9c6-edd418d9f4a3" />
Figure 2. Showing connections to different compute environments (red)
. The idea is that similar to jupyter notebooks and their compute environments, you can write custom (or download) _adapters_ which can connect you to any compute you wish (local \[either machine or local cluster\], AWS HPC, GADI, etc). You should be able to get a full virtual environment including storage and compute, from which to work.

<img width="1906" height="915" alt="window_extensions" src="https://github.com/user-attachments/assets/0812a24b-cbb7-4aa0-8160-fa4561110886" />
Figure 3. Custom window widgits which get added to your desktop environment. These should be plugins which users can write their own and these emulate the applications needed in bioinfomatics workflows. Pictured is mol*, an open-source web based molecule viewer.
