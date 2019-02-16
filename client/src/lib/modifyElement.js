export function modifyElement({ elements, id, updatedFields }) {
    const elementToBeModified = elements.find(el => el.id === id);

    if (!elementToBeModified) {
        return elements;
    }

    const index = elements.indexOf(elementToBeModified);
    const updatedElement = {
        ...elementToBeModified,
        ...updatedFields,
    };

    return [...elements.slice(0, index), updatedElement, ...elements.slice(index + 1)];
}
