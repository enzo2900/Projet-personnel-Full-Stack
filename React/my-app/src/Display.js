import React, { createContext, useState } from 'react';

// Créer le contexte
export const DisplayContext = createContext(1);


// Créer un fournisseur de contexte
export const DisplayProvider = ({ children , initialContent}) => {
    const [content, setContent] = useState(initialContent); 

    // Fonction pour mettre à jour le contenu
    const updateContent = (newContent) => {
        setContent(newContent);
    };

    return (
        <DisplayContext.Provider value={setContent}>
            {content}
        </DisplayContext.Provider>
    );
};
