const API_URI = 'http://124.50.247.56:3000/api';

export const LT_history = async () => {
    const response = await fetch(`${API_URI}/LT_history`, {
        method: 'GET',
    });
    const data = await response.json();

    return data;
};

export const LT_info = async () => {
    const response = await fetch(`${API_URI}/LT_info`, {
        method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    return data;
};

export const ex = () => {
    console.log('ex');
    const data = {a: 1, b: 2};
    return data;
};

export const ex1 = () => {
    console.log('ex1');
    const data = {a: 3, b: 4};
    return data;
};
