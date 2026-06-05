# Clipboard Indicator (Minh Quan's Fork)

This is a customized fork of the popular [Clipboard Indicator](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator) GNOME Shell Extension. 
It adds a clipboard indicator to the top panel, and caches clipboard history.

## Features
- Clipboard history manager
- Quick access to recently copied texts
- Configurable history size
- Star/pin favorite items
- Private mode (pause clipboard monitoring)

## Installation

### Manual Installation from ZIP
1. Download or generate the `.zip` file (`clipboard-indicator-minh-quann@github.com.shell-extension.zip`).
2. Extract the contents of the zip file into a new folder named `clipboard-indicator-minh-quann@github.com` inside your extensions directory:
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/clipboard-indicator-minh-quann@github.com
   unzip clipboard-indicator-minh-quann@github.com.shell-extension.zip -d ~/.local/share/gnome-shell/extensions/clipboard-indicator-minh-quann@github.com
   ```
3. Log out and log back in (or press `Alt+F2`, type `r`, and press `Enter` if you are on X11).
4. Enable the extension via the **Extensions** app or **GNOME Tweaks**.

### Packing the Extension
If you are modifying the source code and want to pack it yourself, simply run:
```bash
gnome-extensions pack
```
This will generate the `.zip` file ready for installation or uploading.

## Credits & License
This project is a fork of the original [Clipboard Indicator](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator) by Yotam Bar-On (Tudmotu).

Licensed under the [MIT License](LICENSE.rst).
