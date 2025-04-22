"use strict";
// Purpose: Define the Todo interface and the TodoDocument interface.
// The Todo interface defines the structure of a todo object.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priority = void 0;
// Defines the Priority enum
// This enum defines the priority levels for a todo
var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
})(Priority || (exports.Priority = Priority = {}));
