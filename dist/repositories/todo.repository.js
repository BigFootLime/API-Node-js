"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const mongoose_repository_1 = require("./mongoose.repository");
const todo_schema_1 = require("../models/schemas/todo.schema");
class TodoRepository extends mongoose_repository_1.MongooseRepository {
    constructor() {
        super(todo_schema_1.TodoModel);
    }
    // Conversion Document Mongoose vers ITodo
    mapToEntity(doc) {
        const _a = doc.toObject(), { _id } = _a, rest = __rest(_a, ["_id"]);
        return Object.assign({ id: _id.toString() }, rest);
    }
    // Trouver par statut
    findByStatus(completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield this.model.find({ completed }).exec();
            return docs.map((doc) => this.mapToEntity(doc));
        });
    }
    // Trouver par priorité
    findByPriority(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield this.model.find({ priority }).exec();
            return docs.map((doc) => this.mapToEntity(doc));
        });
    }
}
exports.TodoRepository = TodoRepository;
