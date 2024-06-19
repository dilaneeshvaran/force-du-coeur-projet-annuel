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
//Tasks should only appear to assigned users by id
//activity visible to public only if membersOnly is falses
//public : voir les evenements / votes / sondages
//équipes real data
//contact with real data
//mot de passe oublié
//GED : edit & le classement
//Chatbot (réponses automatique)

--------------------------------------BACKOFFICE------------------------------------------------
TODO
//login with api
//real performance
//content manage clean
//content manager with real api
//members with search+real api
//task manage filter/search+real api
//real finance info+clean up
//ressources>inventory management/used+real api
//clean mesages+real api(doc/message)
//admin setting clean+real api
//alerts with mail alert+ clean up
//real logout
//change email & password in admin settings
//replace fakedata with the database

--------------------------------------BACKEND--------------------------------------------------
TODO
  //routes > authentification des tokens pour les routes, routes associées aux tables jointes
  //controllers pour les tables jointes
  //services > gérer les envois d\'emails, les changements de mot passe, etc.
  //tests > tests en tous genres
  //validation > valider les données des cotisations
 //participer à un evenement/annuler la participation (respect capacité evenement+gestion du quorum = nombre requis de participants pour que la réunion puisse se tenir )
//Rappels (automatique) : prévenir un prochain payment mensuel
  //manage members(ban/change role admin/member)
    //Alerts and Notifications??>critical events like low inventory levels, unusual website traffic, or overdue tasks.

--------------------------------------JAVA--------------------------------------------------

```
```
