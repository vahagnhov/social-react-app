export const updateObjectInArray = (items: any, itemId: any, objPropsName: any, newObjectProps: any) => {
    return items.map((u: any) => {
        if (u[objPropsName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u;
    });
}