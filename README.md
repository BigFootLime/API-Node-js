# 📝 API NODE JS - RESTful API with Express, TypeScript, MongoDB

Une API REST construite avec **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Zod**, **Swagger** et testée avec **Jest**.

## 🚀 Objectif du projet
Créer une API REST complète pour gérer des "todos", avec :
- Architecture MVC propre
- Validation avec Zod
- Documentation interactive Swagger
- Tests unitaires et d'intégration
- Middleware générique pour les erreurs et la validation
- Séparation d'environnement (prod, test)

---

## 🧱 Technologies utilisées

| Outil               | Rôle |
|---------------------|------|
| **TypeScript**      | Typage statique fort |
| **Express**         | Framework HTTP |
| **MongoDB**         | Base de données NoSQL |
| **Mongoose**        | ODM MongoDB |
| **Zod**             | Validation des données |
| **Swagger UI**      | Documentation interactive |
| **Jest**            | Framework de test |
| **ESLint / Prettier** | Linting & Formatage |
| **dotenv**          | Gestion des variables d'environnement |

---

## 📂 Structure de l'application

```
src/
├── config/           # Configuration (app.ts, db.ts)
├── controllers/      # Contrôleurs Express
├── docs/             # Swagger (swagger.ts)
├── models/           # Modèles Mongoose
│   └── schemas/      # Schémas Mongoose purs
├── routes/           # Définition des routes
├── repositories/     # Abstraction des accès à la base
├── services/         # Logique métier
├── middlewares/      # Middlewares personnalisés (erreurs, validation)
├── types/            # Types & interfaces
│   └── validators/   # Schémas Zod (validation des DTO)
├── utils/            # Fonctions utilitaires
├── index.ts          # Point d'entrée principal
```

---

## ⚙️ Setup du projet

### 1. Cloner le dépôt
```bash
git clone https://github.com/BigFootLime/API-Node-js
```

### 2. Installer les dépendances
```bash
pnpm install
```

### 3. Fichier `.env`
```env
PORT=5000
MONGODB_URI=mongodb:/exemple avec utilisateur et mot de passe/erp-database
JWT_SECRET=ton_secret_jwt
```

🔁 Pour les tests : créer aussi un `.env.test`
```env
MONGODB_URI=mongodb://exemple avec utilisateur et mot de passe/erp-database-test
```

---

## 🔨 Scripts utiles

| Script          | Commande                | Description |
|----------------|--------------------------|-------------|
| Lancer l'API   | `pnpm run dev`           | Démarre en dev avec `ts-node-dev` |
| Build          | `pnpm run build`         | Compile en JavaScript dans `/dist` |
| Lancer en prod | `pnpm start`         | Démarre `/dist/index.js` avec `nodemon` |
| Tests          | `pnpm test`              | Lance tous les tests Jest |
| Lint           | `pnpm lint`              | Lint les fichiers TypeScript |
| Format         | `pnpm format`            | Formate le code avec Prettier |

---

## ✅ Validation avec Zod

Validation centralisée avec Zod. Exemple :
```ts
const CreateTodoSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
})
```
Utilisé avec un middleware générique :
```ts
app.post('/api/todos', validate(CreateTodoSchema), controller.createTodo)
```

🔗 **Source :** [zod.dev](https://zod.dev) / [dev.to guide Zod](https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j)

---

## 📚 Documentation Swagger

📍 Accessible à : [http://localhost:5000/api-docs](http://localhost:3000/api-docs)

Annotations `@swagger` dans les routes :
```ts
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
```

⚙️ Configuré avec `swagger-jsdoc` dans `src/docs/swagger.ts`.

🔗 **Sources :**  
- [Swagger UI Guide](https://swagger.io/docs/open-source-tools/swagger-ui/usage/oauth2/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)

---

## 🧪 Tests avec Jest + Supertest

📁 Dossier `__test__/` contient les tests d’intégration et unitaires.

✔️ Utilise `supertest` pour tester les routes :
```ts
const res = await request(app).post('/api/todos').send({...})
```
✔️ Base Mongo dédiée aux tests avec `.env.test`

🔗 **Doc Jest :** [jestjs.io](https://jestjs.io/docs/cli)

---

## 📏 ESLint + Prettier

✨ Code propre garanti avec :
```bash
pnpm lint
pnpm format
```

Fichiers configurés :
- `.eslintrc.js`
- `.prettierrc`

🔗 **Guides :**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [ESLint config TS](https://typescript-eslint.io/)

---

## 🧠 Difficultés rencontrées & remarques

### Cette partie regroupe les principaux problèmes rencontrés durant la création de l’API avec leurs solutions associées, dont les extraits de code utilisés lorsque c’est pertinent.

 ### Problème n°1 :

- ❗ `mongodb-memory-server` trop lourd à télécharger,

Lors des tests avec Jest, le package mongodb-memory-server essayait de télécharger un binaire de ~600 Mo. Cela causait des erreurs de type : 
```powershell
Exceeded timeout of 30000 ms for a hook
```
### Solution :

- Remplacement par une base MongoDB locale dédiée aux tests.
- Utilisation d’un fichier `.env.test` :

```.env
PORT=5000
MONGODB_URI=mongodb+srv:/cluster mongo......../erp-database-test
JWT_SECRET=votresecret
```
 ### Problème n°2 :
- ❗ `$ref` introuvable dans Swagger UI,

Swagger affichait des erreurs comme :
```
Resolver error at paths./todos.post.requestBody.content.application/json.schema.$ref
Could not resolve reference: /components/schemas/CreateTodo does not exist in document
```
### Cause :
Les schémas `Swagger` `Todo`, `CreateTodo`, `UpdateTodo` n’étaient pas définis dans swagger.ts.

### Solution :
- Ajout des schémas manquants dans `swagger.ts` :

```ts
components: {
  schemas: {
    Todo: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        completed: { type: 'boolean' },
        dueDate: { type: 'string', format: 'date-time' },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    },
    CreateTodo: {
      type: 'object',
      required: ['title', 'priority'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        dueDate: { type: 'string', format: 'date-time' },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] }
      }
    }
  }
}
```
---

## 📸 Captures d’écran importantes

🟢 Exemple d'une requete GET Postman :
![Postman](/public/images/Postman-image-for-documentation.png)

🟢 Swagger UI :
![Swagger UI](/public/images/SwaggerUI.png)

🟢 Exemple d’interface TS :
![Readonly TypeScript](/public/images/TodoModel.png)

---

## 🔗 Références utilisées

- https://www.typescriptlang.org/docs/handbook/2/classes.html
- https://mongoosejs.com/docs/6.x/docs/typescript.html
- https://mongoosejs.com/docs/schematypes.html
- https://www.typescriptlang.org/docs/handbook/2/objects.html
- https://zod.dev
- https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j
- https://www.premieroctet.com/blog/zod-et-les-validateurs
- https://swagger.io/docs/open-source-tools/swagger-ui/usage/oauth2/
- https://aws.amazon.com/what-is/restful-api/#:~:text=RESTful%20API%20is%20an%20interface,applications%20to%20perform%20various%20tasks.
- https://www.npmjs.com/package/cors#installation

---

## 🧠 Auteur
Développé par Keenan MARTIN / BigFootLime 

---
