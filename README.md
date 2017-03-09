Account-manager
===============

account-manager est une application de suivi des dépenses développée avec la suite [elasic](https://www.elastic.co/) (elasicsearch et kibana)

**important** les versions >= `1.0.0` ne sont pas compatibles avec les versions
`0.4.0` et `0.5.0`

Ce projet utilise `elasicsearch` en tant que base de données et `kibana` en tant
qu'interface de tableau de bord et de requêtage.

# Lancement rapide

`$ docker-compose up`

@todo environnement variable ?

# Pourquoi utiliser elasic ?

* tableau de bord évolutif
* interface de requêtage puissante
* évolutivité et prise en compte des besoins pontuels

# todo

* création des index au démarrage
* référencement des index dans kibana
