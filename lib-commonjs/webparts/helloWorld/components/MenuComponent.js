"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuComponent;
var tslib_1 = require("tslib");
var react_1 = require("@fluentui/react");
var react_2 = tslib_1.__importDefault(require("react"));
function MenuComponent() {
    return (react_2.default.createElement("div", null,
        react_2.default.createElement(react_1.Pivot, { "aria-label": "Large Link Size Pivot Example", linkSize: "large" },
            react_2.default.createElement(react_1.PivotItem, { headerText: "My Files" },
                react_2.default.createElement(react_1.Label, null, "Pivot #1")),
            react_2.default.createElement(react_1.PivotItem, { headerText: "Recent" },
                react_2.default.createElement(react_1.Label, null, "Pivot #2")),
            react_2.default.createElement(react_1.PivotItem, { headerText: "Shared with me" },
                react_2.default.createElement(react_1.Label, null, "Pivot #3")))));
}
//# sourceMappingURL=MenuComponent.js.map