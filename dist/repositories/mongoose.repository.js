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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseRepository = void 0;
class MongooseRepository {
    constructor(model) {
        this.model = model;
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.model.findOne(filter).exec();
            return doc ? this.mapToEntity(doc) : null;
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            const docs = yield this.model.find(filter).exec();
            return docs.map((doc) => this.mapToEntity(doc));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.model.findById(id).exec();
            return doc ? this.mapToEntity(doc) : null;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.model.create(data);
            return this.mapToEntity(doc);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateQuery = data;
            const doc = yield this.model.findByIdAndUpdate(id, updateQuery, {
                new: true,
            }).exec();
            return doc instanceof this.model ? this.mapToEntity(doc) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndDelete(id).exec();
            return !!result;
        });
    }
}
exports.MongooseRepository = MongooseRepository;
