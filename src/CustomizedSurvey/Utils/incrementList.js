export const incrementList = (list) => {
    const newList = list.map(e => {
        return (e + 1);
    })
    return newList;
}
export const decrementList = (list) => {
    const newList = list.map(e => {
        return (e - 1);
    })
    return newList;
}