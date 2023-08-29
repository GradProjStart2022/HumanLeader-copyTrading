import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = 'http://124.50.247.56:3000';

// 회원 등록
export async function postPublic(params) {
    const response = await fetch(`${API_URI}/user/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
}

// 회원 등록 여부
export async function postPublicExist(id) {
    const response = await fetch(`${API_URI}/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        }),
    });
    const data = await response.json();
    return data;
}

// 회원 정보 조회
export async function getPublic(uid) {
    const response = await fetch(`${API_URI}/user/info/${uid}`, {
        method: 'GET',
    });
    const data = await response.json();
    await AsyncStorage.setItem('id', data[0].PUBLIC_ID);
    await AsyncStorage.setItem('publicSeq', data[0].PUBLIC_SEQ.toString());
    await AsyncStorage.setItem('token', data[0].TOKEN);
    // return data;
}

// fcm 토큰 등록
export async function postPublicToken(params) {
    const response = await fetch(`${API_URI}/user/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
}

// upbit key 등록
export async function postPublicKey(params) {
    const response = await fetch(`${API_URI}/user/key`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
}

// Leader 목록 조회
export const getLeaders = async () => {
    const response = await fetch(`${API_URI}/leader/all`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
};

// Leader 거래 기록 조회
export const postHistory = async params => {
    const response = await fetch(`${API_URI}/leader/history`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
};

// 구독 여부 확인
export const getSubscribed = async (LeaderSeq, PublicSeq) => {
    const response = await fetch(`${API_URI}/sub/${LeaderSeq}/${PublicSeq}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
};

// 구독한 Leader 목록 조회
export async function getSubLeaders() {
    const publicSeq = await AsyncStorage.getItem('publicSeq');
    const response = await fetch(`${API_URI}/leader/leaders/${publicSeq}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

// 구독
export async function postSubscribe(params) {
    const response = await fetch(`${API_URI}/leader/histroy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
}

// 구독 취소
export async function postUnsubscribe(params) {
    const response = await fetch(`${API_URI}/sub/disable`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
}
