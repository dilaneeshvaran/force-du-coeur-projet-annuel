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
//resultat votes + date invalide

--------------------------------------BACKOFFICE------------------------------------------------
TODO
//real performance
//content manager with real api
//members with search+real api
//task manage filter/search+real api
//real finance info+clean up
//ressources>inventory management/used+real api
//clean mesages+real api(doc/message)
//alerts with mail alert+ clean up
//real logout
--------------------------------------BACKEND--------------------------------------------------
TODO
  //routes > authentification des tokens pour les routes, routes associées aux tables jointes
  //services > gérer les envois d\'emails
  //tests > tests en tous genres
 //participer : respect capacité evenement+gestion du quorum = nombre requis de participants pour que la réunion puisse se tenir
  //manage members(ban/change role admin/member)
  //Alerts && Rappels (automatique) : prévenir un prochain payment mensuel>critical events> low inventory levels, or overdue tasks.
  //conditions> events/votes enddate + results
--------------------------------------JAVA--------------------------------------------------
```
