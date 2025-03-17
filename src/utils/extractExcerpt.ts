export const extractExcerpt = (content: string, length: number = 150): string => {
    // Supprimer les balises HTML (si le contenu en contient)
    const textWithoutTags = content.replace(/<[^>]+>/g, '');
  
    // Extraire les premiers `length` caractères
    const excerpt = textWithoutTags.slice(0, length);
  
    // Ajouter des points de suspension si le contenu est tronqué
    return textWithoutTags.length > length ? `${excerpt}...` : excerpt;
  };