import traderlist from '../../testdata/traderlist.json';
import traderdetail from '../../testdata/traderdetail.json';

const API_URI = 'http://124.50.247.56:3000';

export const LT_history = async () => {
    const response = await fetch(`${API_URI}/LT_info`, {
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

    return data;
};

export const getLeaders = async () => {
    const response = await fetch(`${API_URI}/app/leader/all`, {
        method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    return data;
};

export const ex = () => {
    const data = {a: 1, b: 2};
    return data;
};

export const ex1 = () => {
    const data = {a: 3, b: 4};
    return data;
};

export const getTraders = () => {
    const data = traderlist.ct_leader;
    return data;
};

export const getTraderDetail = () => {
    const data = traderdetail.ct_leader;
    return data;
};
