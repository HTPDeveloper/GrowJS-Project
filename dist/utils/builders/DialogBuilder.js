"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _DialogBuilder_str;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogBuilder = void 0;
class DialogBuilder {
    constructor() {
        _DialogBuilder_str.set(this, "");
    }
    /**
     * Sets the default color of the dialog
     * @param {string} color
     * @returns {DialogBuilder}
     */
    defaultColor(color) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `set_default_color|${color || "`o"}\n`, "f");
        return this;
    }
    /**
     * Adds a spacer for the dialog
     * @param {string} type Spacer type, 'big' or 'small'
     * @returns {DialogBuilder}
     */
    addSpacer(type) {
        switch (type.toUpperCase()) {
            case "BIG":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + "add_spacer|big|\n", "f");
                break;
            case "SMALL":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + "add_spacer|small|\n", "f");
                break;
        }
        return this;
    }
    /**
     * Adds a label
     * @param {string} text Title of the label
     * @returns {DialogBuilder}
     */
    addLabel(text) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_label|${text}|\n`, "f");
        return this;
    }
    /**
     * Adds a label with an icon
     * @param {string} text Title of the label
     * @param {string} titleid The icon to add to the label
     * @param {string | number} type The type of the label, 'big' or 'small'
     * @returns {DialogBuilder}
     */
    addLabelWithIcon(text, titleid, type) {
        switch (type.toUpperCase()) {
            case "BIG":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_label_with_icon|big|${text}|left|${titleid}|\n`, "f");
                break;
            case "SMALL":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_label_with_icon|small|${text}|left|${titleid}|\n`, "f");
                break;
        }
        return this;
    }
    embed(key, val) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `embed_data|${key}|${val}\n`, "f");
        return this;
    }
    /**
     * Adds a button
     * @param {string} name The name of the button
     * @param {string} text The text in the button
     * @returns {DialogBuilder}
     */
    addButton(name, text) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_button|${name}|${text}|noflags|0|0|\n`, "f");
        return this;
    }
    /**
     * Adds a button with icon.
     * @param {string | number} name The name of the button
     * @param {string | number} itemID The button icon using itemID
     * @param {string} text The text in the button
     * @returns {DialogBuilder}
     */
    addButtonWithIcon(name, itemID, text, frame = "left", count = 0) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_button_with_icon|${name}|${text}|${frame}|${itemID}|${count ? count : ""}\n`, "f");
        return this;
    }
    /**
     * Adds a custom butto with rttex icon on it.
     * @param name The name of the button
     * @param imageLocation The rttex location
     * @param image_size The image size
     * @param btnWidth The button width
     * @returns {DialogBuilder}
     */
    addCustomButton(name, imageLocation, image_size = { width: 400, height: 260 }, btnWidth = 0.24) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_custom_button|${name}|image:${imageLocation};image_size:${image_size.width},${image_size.height};width:${btnWidth};|\n`, "f");
        return this;
    }
    /**
     * Adds a custom break.
     * @returns {DialogBuilder}
     */
    addCustomBreak() {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_custom_break|\n`, "f");
        return this;
    }
    /**
     * Adds a checkbox
     * @param {string} name The name of the checkbox
     * @param {string} string The text in the checkbox
     * @param {string} type The type of the checkbox 'select' or 'not_selected'
     * @returns {DialogBuilder}
     */
    addCheckbox(name, string, type) {
        switch (type.toUpperCase()) {
            case "SELECTED":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_checkbox|${name}|${string}|1|\n`, "f");
                break;
            case "NOT_SELECTED":
                __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_checkbox|${name}|${string}|0|\n`, "f");
                break;
        }
        return this;
    }
    /**
     * Adds a text box
     * @param {string} str The str to add
     * @returns {DialogBuilder}
     */
    addTextBox(str) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_textbox|${str}|left|\n`, "f");
        return this;
    }
    /**
     * Adds a small text
     * @param {string} str The text to add
     * @returns {DialogBuilder}
     */
    addSmallText(str) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_smalltext|${str}|\n`, "f");
        return this;
    }
    /**
     * Adds an input box
     * @param {string} name The id of the input box
     * @param {string} text The text beside it
     * @param {string | number} cont Default content?
     * @param {string | number} size The max size of the box
     * @returns {DialogBuilder}
     */
    addInputBox(name = "", text = "", cont = "", size = 0) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `add_text_input|${name}|${text}|${cont}|${size}|\n`, "f");
        return this;
    }
    /**
     * Adds quick exit button
     * @returns {DialogBuilder}
     */
    addQuickExit() {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + "add_quick_exit|\n", "f");
        return this;
    }
    /**
     * Adds buttons at the end of the dialog
     * @param {string} name The id of the dialog
     * @param {string} nvm The value of the button when you want it closed/cancelled.
     * @param {string} accept The value of the button when you want it to add a value to the 'dialog_return' packet
     * @returns {DialogBuilder}
     */
    endDialog(name, nvm, accept) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `end_dialog|${name || ""}|${nvm || ""}|${accept || ""}|\n`, "f");
        return this;
    }
    /**
     * Adds a raw dialog, useful if the function for that specific dialog would not be here
     * @param {string} str The dialog to add
     * @return {DialogBuilder}
     */
    raw(str) {
        __classPrivateFieldSet(this, _DialogBuilder_str, __classPrivateFieldGet(this, _DialogBuilder_str, "f") + `${str}`, "f");
        return this;
    }
    /**
     * Returns the created string
     * @returns {string}
     */
    str() {
        return __classPrivateFieldGet(this, _DialogBuilder_str, "f");
    }
    /**
     * Removes the value of the str to return
     * @return {DialogBuilder}
     */
    reconstruct() {
        __classPrivateFieldSet(this, _DialogBuilder_str, "", "f");
        return this;
    }
}
exports.DialogBuilder = DialogBuilder;
_DialogBuilder_str = new WeakMap();
