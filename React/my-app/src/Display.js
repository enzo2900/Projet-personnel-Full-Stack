import React, { createContext, useState } from 'react';

// Créer le contexte
export const DisplayContext = createContext(1);


// Créer un fournisseur de contexte
export const DisplayProvider = ({ children , initialContent}) => {
    // Content of the page
    const [content, setContent] = useState(initialContent); 
    //SubContent shouldn't move the content state in the webPage
    //SubContent should refer to content that is on top of content that is intented to be remove at some point
    // This could be a popup for example
    const [subContent,setSubContent] = useState("");

    // Fonction pour mettre à jour le contenu
    const updateContent = (newContent) => {
        setContent(newContent);
    };

    return (
        <DisplayContext.Provider value={{updateDisplay:setContent,updateSubDisplay:setSubContent}}>
            {children}
            {subContent}
            {content}
            
        </DisplayContext.Provider>
    );
};
