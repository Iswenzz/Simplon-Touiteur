![](https://i.imgur.com/XFvRaaO.png)

# Simplon-Touiteur
![](https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/image/jpeg/e844e3d2-971a-44e7-930e-ef6422261a2b.jpeg)

## Contexte du projet

Le site est composé de Membres, qui peuvent s'inscrire et se connecter. Un email valide est nécessaire. 

Les membres ont des followers, qui sont eux mêmes des membres du site. Les membres peuvent poster des messages (< 140 caractères). Un message peut contenir du texte mais aussi une image, une vidéo ou un fichier audio. Chaque message peut être liké par les membres. 
Un compteur affichera le nombre de like. Un message doit pouvoir être renvoyé par un autre Membre (notion de retweet). 

Un compteur affichera le nombre de retweet. Chaque message peut avoir des Commentaires. Ces commentaires sont créés par des Membres. Les commentaires ne peuvent être que du texte. Les messages sont publics, les personnes non-membres peuvent les voir mais ne peuvent pas interagir avec (like, retweet, commentaire …) Chaque message disposera d’une URL unique permettant de le visualiser, ainsi que ses commentaires. 

Cette URL doit être facilement partageable Chaque message peut contenir 1 ou plusieurs Hashtags (mot dièses). Un hashtag peut être dans 1 ou plusieurs messages. Les Hashtags sont représentés par un # Chaque message peut contenir 1 ou plusieurs Mentions à d'autres Membres. Une Mention peut être dans 1 ou plusieurs messages. Les Mentions sont représentées par un @ On doit avoir une page qui permet d'afficher tous les Messages des Membres que l’on suit. Il doit y avoir une page qui permet de voir le profil d'un Membre. Dans cette page on voit que les Messages de cet utilisateur. 

Les profils des membres sont publics mais les non-membres ne peuvent pas interagir avec le profil. On peut cliquer sur les @mentions, qui nous amène directement à la page du profil de l'utilisateur mentionné. On peut cliquer sur les #Hashtags, qui nous amène sur une page contenant tous les messages avec cet #Hashtag.

## Contraintes techniques

* Vous devrez réaliser le backend de ce projet avec le Framework Symfony. 
* Tout le backend devra s’organiser en API de type REST. Aucune obligation pour les technologies front. 
* Vous avez le choix en terme de framework CSS / JS (jQuery, Bootstrap, etc…). Vous devez créer la maquette de votre site. 
* La couleur principale du site vous est donné (couleur du groupe). 
* Vous devrez mettre l’accent sur le responsive design (80% d’utilisateurs mobiles) 
* Vous devrez intégrer une interface back-office, pour la gestion des données. Ce back-office devra contenir une page de statistiques : nombre total de membres, nombres de messages etc ... 
* Votre projet doit avoir des tests unitaires et fonctionnels. Une couverture de code d’au moins 50% vous ai demandé.
Contraintes organisationnelles

**Ce projet sera réalisé en groupe de 4 personnes. **

Vous devez suivre la méthodologie Agile pour l’organisation de votre projet. 

A vous de définir les rôles de chacun, la taille des sprints (au minimum 4), les user stories, le backlog etc … 

Vous pouvez aussi choisir les outils nécessaires à cette organisation. Les formateurs jouent le rôle de client / Product Owner. Ils pourront vous demandez d’ajouter des fonctionnalités ou d’en accélérer d’autres. C’est à eux que vous devez poser des questions sur les fonctionnalités demandées. 

Ce projet sera celui que vous allez présenter lors de votre certification Agilité. Veuillez à bien conserver tous les documents concernant la mise en place d’une telle organisation (qui, quand, comment, pourquoi) Le projet est à rendre sur Gitlab ainsi que sur Simplonline. 

La deadline finale est fixée au vendredi 6 novembre 2020 à 17h30. Vous aurez toutes les journées (matin ET après-midi) pour travailler sur ce projet.

**Une présentation complète de ce projet sera fait à l’ensemble de la promo.**

## Installation

* clone the repo.
* git clone https://github.com/Iswenzz/Simplon-Touiteur.git .
* npm install
* cd server && composer install
* lancer le serveur de développement de Symfony: symfony serve.

## Usage

The first step in our app is to register and log in with an active email and password, now you have an account so you can search for friends and do 'add friend' and wait to accept the request, after this step now you can see all your friends tweets and you can like, dislike and share.

## Contributing

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## Built With

* PHP7
* Symfony
* React
* Material-UI
* Javascript
* SASS
* MariaDB


## Authors

* Déborrah Brunier
* Estefania Vila
* Majdeddine ALHAFEZ
* Alexis Nardiello
* Hayette Lachhab
