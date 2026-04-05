"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainComponent;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
function MainComponent() {
    var _a = (0, react_1.useState)('Chaitanya'), name = _a[0], setName = _a[1];
    return (react_1.default.createElement("section", null,
        react_1.default.createElement("h1", null, "Main Component"),
        react_1.default.createElement("h2", null,
            "Welcome ",
            name)));
}
//# sourceMappingURL=MainComponent.js.map