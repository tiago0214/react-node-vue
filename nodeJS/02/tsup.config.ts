// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  loader: {
    '.db': 'file', 
  },
});