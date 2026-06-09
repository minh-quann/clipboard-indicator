const fs = require('fs');
let content = fs.readFileSync('extension.js', 'utf8');

// Line 115
content = content.replace(
    /this\.menu\.connect\('open-state-changed', \(menu, isOpen\) => \{\n\s*if \(\!isOpen\)\n\s*this\.menu\.sourceActor = this;\n\s*\}\)/g,
    `this.menu.connectObject('open-state-changed', (menu, isOpen) => {\n            if (!isOpen)\n                this.menu.sourceActor = this;\n        }, this)`
);

// Line 255
content = content.replace(
    /this\.menu\.connect\('open-state-changed', \(self, open\) => \{\n\s*this\._setFocusOnOpenTimeout = setTimeout\(\(\) => \{\n\s*if \(\!open\) return;\n\n\s*if \(this\._focusItemOnOpen\) \{\n\s*const item = this\._focusItemOnOpen;\n\s*this\._focusItemOnOpen = null;\n\s*item\.grab_key_focus\(\);\n\s*\} else if \(this\.searchEntry\.visible\) \{\n\s*this\.searchEntry\.grab_key_focus\(\);\n\s*\}\n\s*\}, 100\);\n\s*\}\)/g,
    `this.menu.connectObject('open-state-changed', (self, open) => {\n            this._setFocusOnOpenTimeout = setTimeout(() => {\n                if (!open) return;\n\n                if (this._focusItemOnOpen) {\n                    const item = this._focusItemOnOpen;\n                    this._focusItemOnOpen = null;\n                    item.grab_key_focus();\n                } else if (this.searchEntry.visible) {\n                    this.searchEntry.grab_key_focus();\n                }\n            }, 100);\n        }, this)`
);

// Line 365
content = content.replace(
    /this\.resetTimerButton\.connect\('clicked', \(\) => \{\n\s*this\._scheduleNextHistoryClear\(\);\n\s*\}\)/g,
    `this.resetTimerButton.connectObject('clicked', () => {\n            this._scheduleNextHistoryClear();\n        }, this)`
);

// Line 373
content = content.replace(
    /this\.clearMenuItem\.connect\('activate', this\._removeAll\.bind\(this\)\);/g,
    `this.clearMenuItem.connectObject('activate', this._removeAll.bind(this), this);`
);

// Line 385
content = content.replace(
    /this\.settingsMenuItem\.connect\('activate', this\._openSettings\.bind\(this\)\);/g,
    `this.settingsMenuItem.connectObject('activate', this._openSettings.bind(this), this);`
);

// Line 631
content = content.replace(
    /menuItem\.actor\.connect\('key-press-event', \(actor, event\) => \{\n\s*switch \(event\.get_key_symbol\(\)\) \{\n\s*case Clutter\.KEY_Delete:\n\s*if \(menuItem\.entry\.isFavorite\(\)\) \{\n\s*if \(CONFIRM_ON_PINNED_DELETE\) \{\n\s*this\.#showConfirmDialog\(\n\s*_\["Are you sure you want to delete the pinned item\?"\],\n\s*\(\) => \{\n\s*this\._removeEntry\(menuItem\);\n\s*this\._updateCache\(\);\n\s*this\.#showElements\(\);\n\s*\}\n\s*\);\n\s*\} else \{\n\s*this\._removeEntry\(menuItem\);\n\s*this\._updateCache\(\);\n\s*this\.#showElements\(\);\n\s*\}\n\s*\} else \{\n\s*this\._removeEntry\(menuItem\);\n\s*this\._updateCache\(\);\n\s*this\.#showElements\(\);\n\s*\}\n\s*return Clutter\.EVENT_STOP;\n\s*case Clutter\.KEY_p:\n\s*this\.#pinItem\(menuItem\);\n\s*return Clutter\.EVENT_STOP;\n\s*\}\n\s*return Clutter\.EVENT_PROPAGATE;\n\s*\}\)/g,
    `menuItem.actor.connectObject('key-press-event', (actor, event) => {\n            switch (event.get_key_symbol()) {\n                case Clutter.KEY_Delete:\n                    if (menuItem.entry.isFavorite()) {\n                        if (CONFIRM_ON_PINNED_DELETE) {\n                            this.#showConfirmDialog(\n                                _("Are you sure you want to delete the pinned item?"),\n                                () => {\n                                    this._removeEntry(menuItem);\n                                    this._updateCache();\n                                    this.#showElements();\n                                }\n                            );\n                        } else {\n                            this._removeEntry(menuItem);\n                            this._updateCache();\n                            this.#showElements();\n                        }\n                    } else {\n                        this._removeEntry(menuItem);\n                        this._updateCache();\n                        this.#showElements();\n                    }\n                    return Clutter.EVENT_STOP;\n                case Clutter.KEY_p:\n                    this.#pinItem(menuItem);\n                    return Clutter.EVENT_STOP;\n            }\n            return Clutter.EVENT_PROPAGATE;\n        }, menuItem)`
);

// Line 715
content = content.replace(
    /menuItem\.imagePreviewBtn\.connect\('clicked', \(\) => this\.#showImagePreview\(entry\)\);/g,
    `menuItem.imagePreviewBtn.connectObject('clicked', () => this.#showImagePreview(entry), menuItem);`
);

// Line 733
content = content.replace(
    /menuItem\.editBtn\.connect\('clicked', \(\) => this\.#showEditDialog\(menuItem\)\);/g,
    `menuItem.editBtn.connectObject('clicked', () => this.#showEditDialog(menuItem), menuItem);`
);

// Line 772
content = content.replace(
    /menuItem\.pasteBtn\.connect\('clicked',\n\s*\(\) => this\.#pasteItem\(menuItem\)\n\s*\);/g,
    `menuItem.pasteBtn.connectObject('clicked',\n            () => this.#pasteItem(menuItem),\n        menuItem);`
);

// Line 792
content = content.replace(
    /menuItem\.tagBtn\.connect\('clicked', \(\) => this\.#showTagDialog\(menuItem\)\);/g,
    `menuItem.tagBtn.connectObject('clicked', () => this.#showTagDialog(menuItem), menuItem);`
);

// Line 1248
content = content.replace(
    /this\._notifSource\.connect\('destroy', \(\) => \{\n\s*this\._notifSource = null;\n\s*\}\);/g,
    `this._notifSource.connectObject('destroy', () => {\n                this._notifSource = null;\n            }, this);`
);

fs.writeFileSync('extension.js', content, 'utf8');
