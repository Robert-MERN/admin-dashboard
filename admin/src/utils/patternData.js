export const readableData  = (Data)=>{
    const data = Data.map((a) => {
        return Object.values(a)
    });
    return data[0]
}