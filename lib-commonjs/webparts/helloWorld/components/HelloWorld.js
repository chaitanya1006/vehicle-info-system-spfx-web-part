"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var HelloWorld_module_scss_1 = tslib_1.__importDefault(require("./HelloWorld.module.scss"));
var VehicleComponent_1 = tslib_1.__importDefault(require("./VehicleComponent"));
var UserProfile_1 = tslib_1.__importDefault(require("./UserProfile"));
var GetDetailsFromAzureFunctionComponent_1 = tslib_1.__importDefault(require("./GetDetailsFromAzureFunctionComponent"));
var HelloWorld = /** @class */ (function (_super) {
    tslib_1.__extends(HelloWorld, _super);
    function HelloWorld(props) {
        return _super.call(this, props) || this;
    }
    HelloWorld.prototype.render = function () {
        return (React.createElement("section", { className: "".concat(HelloWorld_module_scss_1.default.helloWorld, "}") },
            React.createElement("div", null,
                React.createElement(UserProfile_1.default, tslib_1.__assign({}, this.props)),
                React.createElement("hr", null),
                React.createElement(VehicleComponent_1.default, tslib_1.__assign({}, this.props)),
                React.createElement("hr", null),
                React.createElement(GetDetailsFromAzureFunctionComponent_1.default, tslib_1.__assign({}, this.props)))));
    };
    return HelloWorld;
}(React.Component));
exports.default = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map