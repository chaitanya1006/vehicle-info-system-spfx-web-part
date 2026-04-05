"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AzureFunctionDataGrid;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var HelloWorld_module_scss_1 = tslib_1.__importDefault(require("./HelloWorld.module.scss"));
function AzureFunctionDataGrid(_a) {
    var IAzureDataGrid = _a.dataGrid;
    return (react_1.default.createElement("table", { className: HelloWorld_module_scss_1.default['vehicle-table'] },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "Make"),
                react_1.default.createElement("th", null, "VIN"),
                react_1.default.createElement("th", null, "Model"),
                react_1.default.createElement("th", null, "Trim"),
                react_1.default.createElement("th", null, "Price"),
                react_1.default.createElement("th", null),
                react_1.default.createElement("th", null))),
        react_1.default.createElement("tbody", null, dataGrid.map(function (item) {
            return (react_1.default.createElement("tr", { id: item.Id },
                react_1.default.createElement("td", null, item.Make),
                react_1.default.createElement("td", null, item.VIN),
                react_1.default.createElement("td", null, item.Model),
                react_1.default.createElement("td", null, item.Trim),
                react_1.default.createElement("td", null, item.Price),
                react_1.default.createElement("td", null,
                    " ",
                    react_1.default.createElement(EditRegular, { style: { cursor: 'pointer' }, onClick: function () { return handleEdit(item.Id); } }),
                    " "),
                react_1.default.createElement("td", null,
                    " ",
                    react_1.default.createElement(DeleteRegular, { style: { cursor: 'pointer' }, onClick: function () { return handleDelete(item.Id); } }),
                    " ")));
        }))));
}
//# sourceMappingURL=DummyList.js.map