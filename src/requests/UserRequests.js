import axios from "axios";

export const authenticateByUsernameAndPassword = async (body) => {
  try {
    const response = await axios.post(`http://localhost:8080/auth/`, body);
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};

export const authenticateByParams = async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/by-params`,
      body
    );
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};

export const getAllProducts = async (accessToken) => {
  try {
    const response = await axios.get(`http://localhost:8080/products/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const createProduct = async (body, accessToken) => {
  try {
    const response = await axios.post(`http://localhost:8080/products`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const createUser = async (body) => {
  try {
    const response = await axios.post(`http://localhost:8080/users/`, body);
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const payment = async (body) => {
  try {
    const response = await axios.post(`endpoint ekleyeceksin`, body);
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const createAddress = async (body, accessToken) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/addresses/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const getAllAddress = async (accessToken, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/addresses/all/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
export const updateAddress = async (body, accessToken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/addresses/update`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { data: response.data };
  } catch (err) {
    return { err };
  }
};
