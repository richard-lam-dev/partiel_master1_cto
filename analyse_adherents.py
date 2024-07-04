import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Étape 1 : Génération des Données

# Nombre d'adhérents à générer
n_adherents = 1000

# Générer des données fictives
np.random.seed(0)  # Pour la reproductibilité
data = {
    'id': np.arange(1, n_adherents + 1),
    'nom': [f'Person_{i}' for i in range(1, n_adherents + 1)],
    'age': np.random.randint(5, 80, n_adherents),  # Âges entre 5 et 80 ans
    'genre': np.random.choice(['Féminin', 'Masculin'], n_adherents),
    'email': [f'person_{i}@example.com' for i in range(1, n_adherents + 1)],
    'contact_parental': np.random.choice(['parent@example.com', ''], n_adherents, p=[0.2, 0.8])
}

# Créer un DataFrame
df = pd.DataFrame(data)

# Ajuster le contact parental pour les mineurs seulement
df.loc[df['age'] < 18, 'contact_parental'] = 'parent@example.com'

# Sauvegarder en CSV
df.to_csv('adherents.csv', index=False)

# Étape 2 : Chargement des Données

# Charger les données des adhérents
data = pd.read_csv('adherents.csv')

# Afficher les premières lignes pour vérifier les données
print(data.head())

# Étape 3 : Analyse des Données

# Calculer le nombre d'adhérents par catégorie d'âge
age_categories = ['enfant', 'adolescent', 'jeune adulte', 'adulte']
data['categorie_age'] = pd.cut(data['age'], bins=[0, 12, 18, 30, 100], labels=age_categories, right=False)
age_distribution = data['categorie_age'].value_counts()

# Afficher les résultats
print("\nDistribution des adhérents par catégorie d'âge:")
print(age_distribution)

# Étape 4 : Visualisation des Résultats

# Visualiser la distribution des genres
plt.figure(figsize=(8, 4))
plt.bar(data['genre'].unique(), data['genre'].value_counts(), color=['blue', 'pink'])
plt.xlabel('Genre')
plt.ylabel('Nombre d\'adhérents')
plt.title('Distribution des genres parmi les adhérents')
plt.show()

# Visualiser la distribution des adhérents par catégorie d'âge
age_distribution.plot(kind='bar', color='skyblue')
plt.xlabel('Catégorie d\'âge')
plt.ylabel('Nombre d\'adhérents')
plt.title('Distribution des adhérents par catégorie d\'âge')
plt.xticks(rotation=0)
plt.show()

