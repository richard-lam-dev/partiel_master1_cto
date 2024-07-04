# Analyse des Adhérents de l'Association Sportive

Ce projet contient un script Python conçu pour analyser les données démographiques des membres d'une association sportive. Le script offre des visualisations qui aident à comprendre la répartition par âge et par genre des adhérents, facilitant ainsi la planification des activités et la gestion des communications.

## Prérequis

Pour exécuter ce script, vous aurez besoin de Python et de quelques bibliothèques externes. Voici comment vous pouvez les installer sur votre machine.

### Installation de Python

- **Windows** : Téléchargez et installez Python depuis [python.org](https://www.python.org/downloads/). Assurez-vous de cocher "Add Python to PATH" pendant l'installation.
- **macOS** : Utilisez Homebrew pour installer Python avec la commande `brew install python`.
- **Linux** : Python est généralement préinstallé, sinon vous pouvez l'installer via le gestionnaire de paquets (ex. `sudo apt install python3`).

### Dépendances Python

Ce script utilise `pandas` pour la manipulation de données et `matplotlib` pour la visualisation. Installez ces packages en utilisant pip :

```bash
pip install pandas matplotlib
```

Structure du Projet  
analyse_adherents.py : Script Python contenant tout le code pour charger, analyser et visualiser les données des adhérents.
adherents.csv : Fichier CSV généré contenant les données fictives des adhérents (créé par le script).
Utilisation
Pour exécuter le script, suivez ces étapes :

1. Cloner le Répository :
   
```bash
git clone https://github.com/votre-utilisateur/analyse-adherents.git
cd analyse-adherents
```

2. Exécuter le script

```bash
python analyse_adherents.py
```

Fonctionnalités du Script
Génération des Données
Le script génère des données fictives pour 1000 adhérents avec des informations telles que l'identifiant, le nom, l'âge, le genre, l'email et le contact parental pour les mineurs.

Chargement des Données
Les données générées sont chargées à partir du fichier CSV dans un DataFrame pandas.

Analyse des Données
Le script segmente les adhérents en catégories d'âge et calcule la distribution des genres. Cela permet de comprendre combien d'adhérents appartiennent à chaque groupe d'âge, essentiel pour la planification des cours et des événements.

Visualisation des Résultats
Le script génère des graphiques illustrant la répartition des adhérents par âge et par genre. Ces visualisations aident à comprendre rapidement les données démographiques et à prendre des décisions informées.

Exemple de Sortie
Voici un aperçu de la sortie générée par le script :

```bash
   id          nom  age     genre                     email
0   1     Person_1   25  Masculin       person_1@example.com
1   2     Person_2   17   Féminin       person_2@example.com
2   3     Person_3   15  Masculin       person_3@example.com
3   4     Person_4   30   Féminin       person_4@example.com
4   5     Person_5    9  Masculin       person_5@example.com

Distribution des adhérents par catégorie d'âge:
adulte          342
jeune adulte    318
adolescent      223
enfant          117
Name: categorie_age, dtype: int64
```
