"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ButtonComponent;
var tslib_1 = require("tslib");
var react_1 = require("@fluentui/react");
var react_2 = tslib_1.__importDefault(require("react"));
function ButtonComponent(props) {
    var buttonName = props === null || props === void 0 ? void 0 : props.name;
    return (react_2.default.createElement(react_1.PrimaryButton, { text: buttonName, style: { marginRight: '5px' } }));
}
//# sourceMappingURL=ButtonComponent.js.map