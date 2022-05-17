/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/api/src/app/helpers/pushDiscordWebhook.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("axios");
const { DISCORD_WEBHOOK_URL } = process.env;
function default_1(webhook_body, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('[WEBHOOK] New push on discord');
        return axios_1.default
            .post(DISCORD_WEBHOOK_URL, JSON.stringify(webhook_body), {
            headers: { 'Content-Type': 'application/json' },
        })
            .catch((err) => res.status(500).json({ err: err.message }));
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./packages/api/src/app/routes/auth/github.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const uuid_1 = __webpack_require__("uuid");
const axios_1 = __webpack_require__("axios");
const hyper_express_1 = __webpack_require__("hyper-express");
const pushDiscordWebhook_1 = __webpack_require__("./packages/api/src/app/helpers/pushDiscordWebhook.ts");
const githubRouter = new hyper_express_1.Router();
const { GITHUB_APP_SECRET, GITHUB_APP_ID, FRONTEND_URL } = process.env;
//Dictionary for request state checks
const stateDict = {};
//Route for Oauth login with github
githubRouter.get('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!GITHUB_APP_ID) {
        res.send('GitHub app id not specified');
    }
    const state = (0, uuid_1.v4)();
    stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&state=${state}`);
}));
//Route for Oauth login callback
//handle cancelation + token requesting
githubRouter.get('/callback', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { error, code, state } = req.query;
    //If github user cancels auth
    if (error) {
        //redirect to app
        res.redirect(FRONTEND_URL);
    }
    //Check state parameter in case of cross-forgery attempt
    if (!stateDict[state]) {
        res.send('State diff, possible cross-forgery attempt');
    }
    //Delete unused memory
    delete stateDict[state];
    const body = {
        client_id: GITHUB_APP_ID,
        client_secret: GITHUB_APP_SECRET,
        code,
    };
    const opts = { headers: { accept: 'application/json' } };
    yield axios_1.default
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data)
        .then((git_res) => {
        //https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps
        const oauthToken = git_res.access_token;
        axios_1.default
            .get('https://api.github.com/user', {
            headers: { Authorization: `token ${oauthToken}` },
        })
            .then((_res) => _res.data)
            .then((git_user_data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            console.log(git_user_data);
            const webhBody = {
                embeds: [
                    {
                        title: `Github new user: ${git_user_data.login}`,
                        description: `user authorization accepted`,
                    },
                ],
            };
            yield (0, pushDiscordWebhook_1.default)(webhBody, res).then(() => res.status(200).end());
            //TODO add user to database, forward token data to frontend
        }));
    })
        .catch((err) => res.status(500).json({ err: err.message }));
    res.redirect(FRONTEND_URL);
}));
//Handle Github hook events.
githubRouter.post('/hook', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.json();
    const { action } = body;
    if (action === 'revoked') {
        //TODO implement app revoke
        //TODO Drop user data?
        //https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#github_app_authorization=
        const webhBody = {
            embeds: [
                {
                    title: `Github revoked for ${body.login}`,
                    description: `user authorization removed`,
                },
            ],
        };
        yield (0, pushDiscordWebhook_1.default)(webhBody, res).then(() => res.status(200).end());
    }
    else {
        res.end();
    }
}));
exports["default"] = githubRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/auth/google.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const hyper_express_1 = __webpack_require__("hyper-express");
const googleRouter = new hyper_express_1.Router();
googleRouter.get('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.redirect('https://github.com/login/oauth/authorize');
}));
exports["default"] = googleRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const hyper_express_1 = __webpack_require__("hyper-express");
const github_1 = __webpack_require__("./packages/api/src/app/routes/auth/github.ts");
const google_1 = __webpack_require__("./packages/api/src/app/routes/auth/google.ts");
const authRouter = new hyper_express_1.Router();
authRouter.post('/signin', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send('amogus');
}));
authRouter.post('/signup', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send('mogus');
}));
authRouter.use('/signin/github', github_1.default);
authRouter.use('/signin/google', google_1.default);
exports["default"] = authRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userGroupRouter = exports.userRouter = exports.tagRouter = exports.linkGroupRouter = exports.linkRouter = exports.authRouter = void 0;
const auth_1 = __webpack_require__("./packages/api/src/app/routes/auth/index.ts");
exports.authRouter = auth_1.default;
const link_1 = __webpack_require__("./packages/api/src/app/routes/link/index.ts");
exports.linkRouter = link_1.default;
const linkgroup_1 = __webpack_require__("./packages/api/src/app/routes/linkgroup/index.ts");
exports.linkGroupRouter = linkgroup_1.default;
const tag_1 = __webpack_require__("./packages/api/src/app/routes/tag/index.ts");
exports.tagRouter = tag_1.default;
const user_1 = __webpack_require__("./packages/api/src/app/routes/user/index.ts");
exports.userRouter = user_1.default;
const usergroup_1 = __webpack_require__("./packages/api/src/app/routes/usergroup/index.ts");
exports.userGroupRouter = usergroup_1.default;


/***/ }),

/***/ "./packages/api/src/app/routes/link/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
const linkRouter = new hyper_express_1.Router();
exports["default"] = linkRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/linkgroup/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
const linkGroupRouter = new hyper_express_1.Router();
exports["default"] = linkGroupRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/tag/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
const tagRouter = new hyper_express_1.Router();
exports["default"] = tagRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/user/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
const userRouter = new hyper_express_1.Router();
exports["default"] = userRouter;


/***/ }),

/***/ "./packages/api/src/app/routes/usergroup/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
const userGroupRouter = new hyper_express_1.Router();
exports["default"] = userGroupRouter;


/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "hyper-express":
/***/ ((module) => {

module.exports = require("hyper-express");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const hyper_express_1 = __webpack_require__("hyper-express");
__webpack_require__("dotenv");
const routes_1 = __webpack_require__("./packages/api/src/app/routes/index.ts");
const app = new hyper_express_1.Server();
// Create GET route to serve 'Hello World'
app.get('/hello', (request, response) => {
    response.send('Hello World');
});
const port = process.env.PORT || 80;
app.use('/auth', routes_1.authRouter);
app.use('/users', routes_1.userRouter);
app.use('/usersgroup', routes_1.userGroupRouter);
app.use('/link', routes_1.linkRouter);
app.use('/linkgroup', routes_1.linkGroupRouter);
app.use('/tag', routes_1.tagRouter);
app
    .listen(port)
    .then(() => console.log('[START] LYNX API ONLINE: ' + port))
    .catch((error) => console.log('[ERROR] FAILED TO START API: ' + port + ' Error ' + error));
//Handle all of unsuported routes
app.get('/*', (req, res) => {
    res.status(404).send('Unsuported route');
});

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map