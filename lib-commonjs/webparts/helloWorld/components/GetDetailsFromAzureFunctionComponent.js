"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var sp_http_1 = require("@microsoft/sp-http");
var HelloWorld_module_scss_1 = tslib_1.__importDefault(require("./HelloWorld.module.scss"));
/**
 * React functional component to fetch the data from the Azure function and render the result in a HTML table.
 * @param param0
 * @returns
 */
var GetDetailsFromAzureFunctionComponent = function (_a) {
    var aadHttpClientFactory = _a.aadHttpClientFactory;
    var initialData = [];
    var _b = (0, react_1.useState)(initialData), dataFromAzureFunction = _b[0], setDataFromAzureFunction = _b[1];
    /**
     * Function to fetch the data from the azure function exposed through an API.
     * The Azure function is protected by Microsoft Entra ID
     * @returns
     */
    var fetchDetailsFromAzureFunction = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var resultJson, functionUrl, functionAppIdUri, functionKey, requestHeaders, aadHttpClient, response, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultJson = [];
                    functionUrl = "".concat(process.env.SPFX_AZURE_FUNCTION_BASE_URL, "/").concat(process.env.SPFX_AZURE_FUNCTION_ENDPOINT);
                    functionAppIdUri = "api://".concat(process.env.SPFX_AZURE_FUNCTION_APP_CLIENT_ID);
                    functionKey = process.env.SPFX_AZURE_FUNCTION_KEY;
                    requestHeaders = new Headers();
                    requestHeaders.append('x-functions-key', functionKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, aadHttpClientFactory.getClient(functionAppIdUri)];
                case 2:
                    aadHttpClient = _a.sent();
                    return [4 /*yield*/, aadHttpClient.get(functionUrl, sp_http_1.AadHttpClient.configurations.v1, {
                            headers: requestHeaders
                        })];
                case 3:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 4:
                    resultJson = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error(response.statusText);
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error(error_1.message);
                    }
                    else {
                        console.error("An unexpected error occurred", error_1);
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, resultJson];
            }
        });
    }); };
    //The useEffect hook will be called once the component is rendered
    (0, react_1.useEffect)(function () {
        var exe = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchDetailsFromAzureFunction()];
                    case 1:
                        result = _a.sent();
                        setDataFromAzureFunction(result);
                        return [2 /*return*/];
                }
            });
        }); };
        exe();
    }, []);
    return (react_1.default.createElement("div", { style: { paddingTop: '30px' } },
        react_1.default.createElement("h2", { style: { color: 'blue' } }, "Task #3"),
        react_1.default.createElement("p", null,
            "The below HTML table is rendered by accessing the data from Azure Function. The function endpoint is exposed as a REST API GET endpoint and will be invoked by HTTP trigger.  ",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("strong", null, "The Azure Function is protected by Entra ID"),
            ". ",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            "This component will act ",
            react_1.default.createElement("strong", null, "on-behalf of the logged in user"),
            " and access the Azure Function."),
        " ",
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { className: HelloWorld_module_scss_1.default['vehicle-table'] },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "ID"),
                    react_1.default.createElement("th", null, "Vehicle"),
                    react_1.default.createElement("th", null, "Last Service"),
                    react_1.default.createElement("th", null, "Next Service"),
                    react_1.default.createElement("th", null, "Status"))),
            react_1.default.createElement("tbody", null, dataFromAzureFunction.map(function (item) {
                return (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, item.id),
                    react_1.default.createElement("td", null, item.vehicle),
                    react_1.default.createElement("td", null, item.lastService),
                    react_1.default.createElement("td", null, item.nextService),
                    react_1.default.createElement("td", null, item.status)));
            })))));
};
exports.default = GetDetailsFromAzureFunctionComponent;
//# sourceMappingURL=GetDetailsFromAzureFunctionComponent.js.map