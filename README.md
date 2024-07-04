# FORCE DU COEUR

Ce projet comprend un client, un backoffice et un backend.

## Installation FRONT

Pour démarrer le client/backoffice, exécutez les commandes suivantes une après l'autre:
```bash
1) cd client
(or cd backoffice)

2) npm install

3) npm run dev

```
## Installation BACKEND
```bash

1) cd backend

2) npm install

3) docker compose up -d

4) npm run start:dev

5) stripe listen --forward-to http://localhost:8088/payments/webhook
command to trigger successful payment :
stripe trigger checkout.session.completed

--------------------------------------CLIENT---------------------------------------------------
TODO
//Home screen add infos
//équipes real data
//mot de passe oublié
--------------------------------------BACKOFFICE------------------------------------------------
TODO
//add search for members
//alerts with mail alert+ clean up
//div msg when logout
//content manage (filter finished and ongoing)
//alerts if task is not success before deadline/if new donation/new membership
//alerts 
//mot de passe oublié
--------------------------------------BACKEND---------------------------------------------------
TODO
//routes > authentification des tokens pour les routes, routes associées aux tables jointes
//participer : respect capacité+ quorum = nombre requis de participants pour que la réunion puisse se tenir
--------------------------------------JAVA------------------------------------------------------
```
