const formatCarNumber = (carNumber) => {
    return carNumber
        .toUpperCase()
        .replace(/([^0-9])+(\d+)+([^0-9])/g, '$1,$2,$3')
        .replaceAll(',', ' ');
};

export default formatCarNumber;
