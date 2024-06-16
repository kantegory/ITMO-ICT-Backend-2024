"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const controller = new controllers_1.UnicornController();
router.get("/", controller.getAll);
router.post("/", controller.post);
router.put("/:id", controller.update);
exports.default = router;
//# sourceMappingURL=index.js.map