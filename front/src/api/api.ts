import axios from "axios";

const backendPortNumber = "5003";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function updateToken() {
  if (localStorage.getItem("refreshToken")) {
    let refreshedAccessTokenResponse = await fetch(serverUrl + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });

    let refreshedAccessToken = await refreshedAccessTokenResponse.json();
    if (refreshedAccessToken.Logout) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      window.location.reload();
    } else {
      sessionStorage.setItem("accessToken", refreshedAccessToken.accessToken);
      localStorage.setItem("refreshToken", refreshedAccessToken.refreshToken);
    }
  }
}
// axios 에러날때 잡아줌
axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async (error) => {
    // 오류 응답 처리
    if (error.response.status === 490) {
      let refreshedAccessTokenResponse = await fetch(serverUrl + "token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });

      let refreshedAccessToken = await refreshedAccessTokenResponse.json();
      if (refreshedAccessToken.logout) {
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      } else {
        await sessionStorage.setItem(
          "accessToken",
          refreshedAccessToken.accessToken
        );
        await localStorage.setItem(
          "refreshToken",
          refreshedAccessToken.refreshToken
        );
        let retryData = error.config;
        retryData.headers.Authorization = `Bearer ${refreshedAccessToken.accessToken}`;
        return await axios.request(retryData);
      }

      return Promise.reject(error);
    }
  }
);

interface PostPayload {
  [key: string]: string | null;
}

async function get(endpoint: string, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function post(endpoint: string, data?: PostPayload) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function patch(endpoint: string, data?: any) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.patch(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}
const customAxios = axios.create({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
});

async function put(endpoint: string, data?: PostPayload) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint: string, data?: PostPayload) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.delete(serverUrl + endpoint, {
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete, patch, updateToken };
