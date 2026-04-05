"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VehicleComponent;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var HelloWorld_module_scss_1 = tslib_1.__importDefault(require("./HelloWorld.module.scss"));
var react_icons_1 = require("@fluentui/react-icons");
var sp_http_1 = require("@microsoft/sp-http");
var react_2 = require("@fluentui/react");
var initialState = {
    id: 0,
    make: '',
    vin: '',
    model: '',
    trim: '',
    price: ''
};
function VehicleComponent(props) {
    var _this = this;
    var _a = (0, react_1.useState)(initialState), formData = _a[0], setFormData = _a[1];
    var initialData = [];
    var _b = (0, react_1.useState)(initialData), dataGrid = _b[0], setDataGrid = _b[1];
    var initialDataMakeItem = [];
    var _c = (0, react_1.useState)(initialDataMakeItem), makeDropDown = _c[0], setMakeDropDown = _c[1];
    var siteUrl = "".concat(props.context.pageContext.web.absoluteUrl, "/sites/allcompany");
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleReset = function () {
        setFormData(initialState);
    };
    //Fetching data from the SharePoint 'Vehicles' list
    var fetchData = function (apiUrl) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, data, items, _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, props.context.spHttpClient.get(apiUrl, sp_http_1.SPHttpClient.configurations.v1)];
                case 1:
                    response = _d.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _d.sent();
                    items = data.value;
                    return [2 /*return*/, items];
                case 3:
                    _b = (_a = console).error;
                    _c = ["Error fetching items:"];
                    return [4 /*yield*/, response.text()];
                case 4:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    _d.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var loadVehicleListForDataGrid = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var apiUrl, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "".concat(siteUrl, "/_api/web/lists/getbytitle('Vehicles')/items?$select=Id,Make,VIN,Model,Trim");
                    return [4 /*yield*/, fetchData(apiUrl)];
                case 1:
                    result = _a.sent();
                    setDataGrid(result);
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        loadVehicleListForDataGrid();
    }, []);
    // Layout spacing
    var stackTokens = { childrenGap: 15 };
    var stackStyles = { root: { width: 400, margin: '20px auto' } };
    /**
     * ADD new record handler - Form submit
     * @param event
     * @returns
     */
    var formRef = (0, react_1.useRef)(null);
    var handleSubmit = function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var formData_1, formValues, url, body;
        return tslib_1.__generator(this, function (_a) {
            event.preventDefault();
            try {
                if (!formRef.current)
                    return [2 /*return*/];
                formData_1 = new FormData(formRef.current);
                formValues = Object.fromEntries(formData_1.entries());
                url = "".concat(props.context.pageContext.web.absoluteUrl, "/sites/allcompany/_api/web/lists/getbytitle('Vehicles')/items");
                body = {
                    __metadata: {
                        type: "SP.Data.VehiclesListItem"
                    },
                    Make: formValues.make,
                    VIN: formValues.vin,
                    Model: formValues.model,
                    Trim: formValues.trim,
                    Price: formValues.price
                };
                if (formValues.id === 0) {
                    performAdd(url, body);
                }
                else {
                    performUpdate(formValues.id, url, body);
                }
            }
            catch (error) {
                console.error("Error while adding new vehicle information");
            }
            return [2 /*return*/];
        });
    }); };
    //Add new vehicle handler
    var performAdd = function (url, body) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, props.context.spHttpClient.post(url, sp_http_1.SPHttpClient.configurations.v1, {
                            headers: {
                                'Accept': 'application/json;odata=verbose',
                                'Content-type': 'application/json;odata=verbose',
                                'odata-version': ''
                            },
                            body: JSON.stringify(body)
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        handleReset();
                        loadVehicleListForDataGrid();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error(error_1.message);
                    }
                    else {
                        console.error("An unexpected error occurred", error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //Update vehicle handler
    var performUpdate = function (id, url, body) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var __metadata, bodyWithoutMetadata, response, error;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    __metadata = body.__metadata, bodyWithoutMetadata = tslib_1.__rest(body, ["__metadata"]);
                    return [4 /*yield*/, props.context.spHttpClient.post("".concat(url, "(").concat(id, ")"), sp_http_1.SPHttpClient.configurations.v1, {
                            headers: {
                                'Accept': 'application/json;odata=nometadata',
                                'Content-type': 'application/json;odata=nometadata',
                                'odata-version': '',
                                'IF-MATCH': '*',
                                'X-HTTP-Method': 'MERGE'
                            },
                            body: JSON.stringify(bodyWithoutMetadata)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 2];
                    alert("Vehicle Updated Successfully");
                    handleReset();
                    loadVehicleListForDataGrid();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    error = _a.sent();
                    console.error(error);
                    alert("Error: " + error.error.message.value);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Delete vehicle handler
     * @param id
     */
    var handleDelete = function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var endpoint, headers, response, error, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alert("Delete: ".concat(id));
                    endpoint = "".concat(props.context.pageContext.web.absoluteUrl, "/sites/allcompany/_api/web/lists/getbytitle('Vehicles')/items(").concat(id, ")");
                    headers = {
                        'X-HTTP-Method': 'DELETE',
                        'IF-MATCH': '*'
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, props.context.spHttpClient.post(endpoint, sp_http_1.SPHttpClient.configurations.v1, { headers: headers })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    console.log("Item ".concat(id, " deleted successfully."));
                    loadVehicleListForDataGrid();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    error = _a.sent();
                    console.error("Error deleting item:", error);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error("Request failed:", error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Edit Vehiele handler
     */
    var handleEdit = function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var apiUrl, response, item, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "".concat(siteUrl, "/_api/web/lists/getbytitle('Vehicles')/items(").concat(id, ")");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, props.context.spHttpClient.get(apiUrl, sp_http_1.SPHttpClient.configurations.v1)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    item = _a.sent();
                    setFormData({
                        id: item === null || item === void 0 ? void 0 : item.Id,
                        make: item === null || item === void 0 ? void 0 : item.Make,
                        vin: item === null || item === void 0 ? void 0 : item.VIN,
                        model: item === null || item === void 0 ? void 0 : item.Model,
                        trim: item === null || item === void 0 ? void 0 : item.Trim,
                        price: item === null || item === void 0 ? void 0 : item.Price
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    alert(error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { style: { paddingTop: '30px' } },
        react_1.default.createElement("h2", { style: { color: 'blue' } }, "Task #2"),
        react_1.default.createElement("p", null,
            "This below is the Vehicle Entry Form performs ADD / UPDATE / DELTE operations.",
            react_1.default.createElement("p", null,
                "- ",
                react_1.default.createElement("strong", null, "GET"),
                " the data from SharePoint List"),
            react_1.default.createElement("p", null,
                "- ",
                react_1.default.createElement("strong", null, "ADD"),
                " new vehicle to SharePoint List"),
            react_1.default.createElement("p", null,
                "- ",
                react_1.default.createElement("strong", null, "UPDATE"),
                " the vehicle info to SharePoint List"),
            react_1.default.createElement("p", null,
                "- ",
                react_1.default.createElement("strong", null, "DELETE"),
                " the vehicle data from SharePoint List")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("form", { ref: formRef, onSubmit: handleSubmit },
                react_1.default.createElement(react_2.Stack, { styles: stackStyles, tokens: stackTokens },
                    react_1.default.createElement("h2", null, "Vehicle Entry Form"),
                    react_1.default.createElement(react_2.TextField, { name: "id", styles: { root: { display: 'none' } }, value: String(formData.id) }),
                    react_1.default.createElement(react_2.TextField, { label: "Make", name: "make", placeholder: "e.g. Toyota", required: true, value: formData.make, onChange: handleChange }),
                    react_1.default.createElement(react_2.TextField, { label: "VIN", name: "vin", placeholder: "17-character VIN", value: formData.vin, onChange: handleChange }),
                    react_1.default.createElement(react_2.TextField, { label: "Model", name: "model", placeholder: "e.g. Camry", value: formData.model, onChange: handleChange }),
                    react_1.default.createElement(react_2.TextField, { label: "Trim", name: "trim", placeholder: "e.g. XLE", value: formData.trim, onChange: handleChange }),
                    react_1.default.createElement(react_2.TextField, { label: "Price", name: "price", prefix: "$", type: "number", value: formData.price, onChange: handleChange }),
                    react_1.default.createElement(react_2.Stack, { horizontal: true, tokens: { childrenGap: 10 } },
                        react_1.default.createElement(react_2.PrimaryButton, { type: "submit", text: formData.id ? "Update Vehicle Info" : "Add Vehicle" }),
                        react_1.default.createElement(react_2.PrimaryButton, { text: "Clear", onClick: handleReset }))))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Vehicle stock list:"),
            react_1.default.createElement(react_2.PrimaryButton, { text: "Refresh", onClick: loadVehicleListForDataGrid, allowDisabledFocus: true })),
        react_1.default.createElement("table", { className: HelloWorld_module_scss_1.default['vehicle-table'] },
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
                        react_1.default.createElement(react_icons_1.EditRegular, { style: { cursor: 'pointer' }, onClick: function () { return handleEdit(item.Id); } }),
                        " "),
                    react_1.default.createElement("td", null,
                        " ",
                        react_1.default.createElement(react_icons_1.DeleteRegular, { style: { cursor: 'pointer' }, onClick: function () { return handleDelete(item.Id); } }),
                        " ")));
            })))));
}
//# sourceMappingURL=VehicleComponent.js.map