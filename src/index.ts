import dotenv from 'dotenv';
import {app} from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
}).on ('error', (error) => {
  throw new Error(error.message)
});
