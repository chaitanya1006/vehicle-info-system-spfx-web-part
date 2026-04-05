"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AzureFunctionDataGrid;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var HelloWorld_module_scss_1 = tslib_1.__importDefault(require("./HelloWorld.module.scss"));
function AzureFunctionDataGrid() {
    return (react_1.default.createElement("table", { className: HelloWorld_module_scss_1.default['vehicle-table'] },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "ID"),
                react_1.default.createElement("th", null, "Vehicle"),
                react_1.default.createElement("th", null, "Last Service"),
                react_1.default.createElement("th", null, "Next Service"),
                react_1.default.createElement("th", null, "Status"))),
        react_1.default.createElement("tbody", null, dataGrid.map(function (item) {
            return (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, item.id),
                react_1.default.createElement("td", null, item.vehicle),
                react_1.default.createElement("td", null, item.lastService),
                react_1.default.createElement("td", null, item.nextService),
                react_1.default.createElement("td", null, item.status)));
        }))));
}
//# sourceMappingURL=AzureFunctionDataGrid.js.map