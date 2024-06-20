
## Installation

Installa sagragest con npm

```bash
  npm install sagragest
  cd sagragest
```

Esegui il comando per creare e applicare le migrazioni:

```bash
  npx prisma migrate dev --name init
```

Dopo aver applicato le migrazioni, genera il client Prisma:

```bash
  npx prisma generate
```

Modifica l'env file per impostare l'user admin

```bash
  DEFAULT_ADMIN_USERNAME=
  DEFAULT_ADMIN_PASSWORD=
```
    