const itemsPerPage = 10;
export const paginationOptions = (itemsNumber = 10) => {
    return [
        itemsNumber,
        ...Array.from(
            {length: 4},
            (_, i) => Math.pow(itemsNumber, 2) * Math.pow(2, i)
        ),
    ];
};

// export const pagination = {
//     itemsPerPage: itemsPerPage,
//     options: paginationOptions(itemsPerPage)
// };


export const pagination = (itemsNumber = 10) => {
    return {
        itemsPerPage: itemsNumber,
        options: paginationOptions(itemsNumber)
    }
};



