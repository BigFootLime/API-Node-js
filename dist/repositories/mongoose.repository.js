"use strict";
// Code pour le repository générique pour Mongoose
// Ce code est générique et peut être utilisé pour n'importe quel modèle Mongoose
// Il suffit de créer un nouveau fichier pour chaque modèle et d'importer ce code
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
// T est le type de l'entité, U est le type du document Mongoose
class MongooseRepository {
    // Le constructeur prend un modèle Mongoose en paramètre
    constructor(model) {
        this.model = model;
    }
    // Implémentation des méthodes de l'interface IRepository
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            // On utilise exec() pour exécuter la requête
            // On mappe le document Mongoose en entité
            // On retourne null si aucun document n'est trouvé
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
    // On utilise le type Partial pour permettre la mise à jour partielle
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // On cast le type Partial en UpdateQuery pour éviter les erreurs de types
            const updateQuery = data;
            // On utilise l'option { new: true } pour retourner le document mis à jour
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
