"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
var react_2 = tslib_1.__importDefault(require("react"));
/**
 * Functional component to fetch the user photo, email from azure tenant by using Microsoft Graph API and render the UserProfile component
 * @param param0
 * @returns
 */
var UserProfile = function (_a) {
    var msGraphClientFactory = _a.msGraphClientFactory;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(null), photoUrl = _c[0], setPhotoUrl = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchGraphData = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var client, profile, photoBlob, url, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, msGraphClientFactory.getClient('3')];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.api('/me').get()];
                    case 2:
                        profile = _a.sent();
                        //Update the user state
                        setUser(profile);
                        return [4 /*yield*/, client.api('/me/photo/$value').responseType(microsoft_graph_client_1.ResponseType.BLOB).get()];
                    case 3:
                        photoBlob = _a.sent();
                        url = window.URL.createObjectURL(photoBlob);
                        //Update the component state with photo
                        setPhotoUrl(url);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error("ERROR: ".concat(e_1));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchGraphData();
    }, [msGraphClientFactory]);
    return (react_2.default.createElement(react_1.Fragment, null,
        react_2.default.createElement("h2", { style: { color: 'blue' } }, "Task #1"),
        react_2.default.createElement("p", null,
            "This UserProfile component is rendered by fetching the logged in user's data from Azure tenant by using ",
            react_2.default.createElement("strong", null, "Microsoft Graph API")),
        react_2.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '15px', padding: '10px' } },
            photoUrl ? (react_2.default.createElement("img", { src: photoUrl, alt: "Profile", style: { width: '60px', height: '60px', borderRadius: '50%' } })) : (react_2.default.createElement("div", { style: { width: '60px', height: '60px', backgroundColor: '#ccc', borderRadius: '50%' } })),
            react_2.default.createElement("div", null,
                react_2.default.createElement("h3", { style: { margin: 0 } },
                    "User Display Name: ", user === null || user === void 0 ? void 0 :
                    user.displayName),
                react_2.default.createElement("p", { style: { margin: 0, fontSize: '14px', color: '#666' } },
                    "User Email: ", user === null || user === void 0 ? void 0 :
                    user.mail)))));
};
exports.default = UserProfile;
//# sourceMappingURL=UserProfile.js.map