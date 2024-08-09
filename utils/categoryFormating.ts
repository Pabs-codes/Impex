// helper function for converting URL category name to friendly and more readable name
// For example "smart-watches" after this function will be "smart watches"
const formatCategoryName = (categoryName: string) => {
    const categoryNameArray = categoryName.split("-");
    categoryNameArray.forEach((word, index) => {
        categoryNameArray[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return categoryNameArray.join(" ");
};

// helper function for converting category name to URL category name
// For example "smart watches" after this function will be "smart-watches"
const convertCategoryNameToURLFriendly = (categoryName: string) => {
    const categoryNameArray = categoryName.split(" ");
    return categoryNameArray.join("-").toLowerCase();
};

export {formatCategoryName, convertCategoryNameToURLFriendly};
