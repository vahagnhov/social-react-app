export const updateObjectInArray = (items, itemId, objPropsName, newObjectProps) => {
    return items.map(u => {
        if (u[objPropsName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u;
    });
}