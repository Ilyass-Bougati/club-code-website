# Guide d'utilisation du thème personnalisé

## Vue d'ensemble

Ce projet utilise un système de thème personnalisé avec des variables CSS et Tailwind CSS pour maintenir une cohérence visuelle et faciliter la gestion des couleurs. Au lieu d'utiliser des couleurs hardcodées comme `bg-blue-500` ou `text-red-600`, utilisez les variables de thème définies.

## Variables de couleur disponibles

### Couleurs de base
- `bg-background` / `text-foreground` - Couleurs principales de fond et de texte
- `bg-card` / `text-card-foreground` - Couleurs pour les cartes
- `bg-primary` / `text-primary-foreground` - Couleurs primaires
- `bg-secondary` / `text-secondary-foreground` - Couleurs secondaires
- `bg-muted` / `text-muted-foreground` - Couleurs atténuées
- `bg-accent` / `text-accent-foreground` - Couleurs d'accent
- `bg-destructive` / `text-destructive-foreground` - Couleurs destructives

### Couleurs sémantiques (nouvelles)
- `bg-success` / `text-success-foreground` - Couleurs de succès (remplace `bg-green-*`)
- `bg-info` / `text-info-foreground` - Couleurs d'information (remplace `bg-blue-*`)
- `bg-warning` / `text-warning-foreground` - Couleurs d'avertissement (remplace `bg-yellow-*`)

## Exemples d'utilisation

### ❌ À éviter (couleurs hardcodées)
```tsx
<div className="bg-blue-500 text-white">
<div className="text-red-600">
<div className="bg-green-200">
```

### ✅ À utiliser (variables de thème)
```tsx
<div className="bg-primary text-primary-foreground">
<div className="text-destructive">
<div className="bg-success text-success-foreground">
```

## Badges avec variantes

Le composant `Badge` a été étendu avec de nouvelles variantes qui utilisent le thème :

```tsx
<Badge variant="success">Succès</Badge>
<Badge variant="info">Information</Badge>
<Badge variant="warning">Avertissement</Badge>
<Badge variant="destructive">Erreur</Badge>
```

## Mappage automatique des types d'événements

La fonction `getEventTypeBadgeVariant()` mappe automatiquement les types d'événements aux variantes appropriées :

```tsx
import { getEventTypeBadgeVariant } from "@/lib/utils"

<Badge variant={getEventTypeBadgeVariant(event.eventType)}>
  {event.eventType}
</Badge>
```

### Types mappés
- **Workshop/Training/Course** → `info` (bleu)
- **Hackathon/Competition/Contest** → `warning` (jaune/orange)
- **Conference/Meetup/Networking** → `success` (vert)
- **Project/Collaboration/Team** → `secondary` (violet)
- **Autres** → `default` (couleur primaire)

## Support du mode sombre

Toutes les variables de couleur s'adaptent automatiquement au mode sombre grâce aux variables CSS définies dans `:root` et `.dark`.

## Personnalisation

Pour ajouter de nouvelles couleurs au thème :

1. Ajoutez les variables dans `globals.css` (mode clair et sombre)
2. Ajoutez les couleurs dans `tailwind.config.ts`
3. Créez les variantes correspondantes dans les composants

## Avantages

- **Cohérence** : Toutes les couleurs suivent le même système
- **Maintenabilité** : Changement centralisé des couleurs
- **Accessibilité** : Contraste automatique entre modes clair/sombre
- **Flexibilité** : Facile d'ajouter de nouvelles couleurs
- **Performance** : Pas de classes CSS inutiles


