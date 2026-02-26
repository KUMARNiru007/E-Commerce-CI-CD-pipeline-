const BASE = 'https://api.freeapi.app/api/v1';

/* ───── helpers ───── */

const getToken = () => localStorage.getItem('ecom_token');

const authHeaders = () => {
  const token = getToken();
  return {
    accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const jsonHeaders = () => ({
  ...authHeaders(),
  'content-type': 'application/json',
});

const handle = async (res) => {
  const data = await res.json();
  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || 'Request failed');
  }
  return data.data;
};

/* ================= PUBLIC (no auth) ================= */

export const getRandomProducts = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/public/randomproducts?page=${page}&limit=${limit}`,
    { headers: { accept: 'application/json' } },
  );
  return handle(res);
};

export const getRandomProductById = async (id) => {
  const res = await fetch(`${BASE}/public/randomproducts/${id}`, {
    headers: { accept: 'application/json' },
  });
  return handle(res);
};

/* ================= AUTH ================= */

export const registerUser = async (email, password, username, role = 'USER') => {
  const res = await fetch(`${BASE}/users/register`, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, username, role }),
  });
  return handle(res);
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE}/users/login`, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handle(res);
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE}/users/current-user`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE}/users/logout`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return handle(res);
};

/* ================= PROFILE ================= */

export const getProfile = async () => {
  const res = await fetch(`${BASE}/ecommerce/profile`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const getMyOrders = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/ecommerce/profile/my-orders?page=${page}&limit=${limit}`,
    { headers: authHeaders() },
  );
  return handle(res);
};

/* ================= PRODUCTS (authenticated) ================= */

export const getProducts = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/ecommerce/products?page=${page}&limit=${limit}`,
    { headers: authHeaders() },
  );
  return handle(res);
};

export const getProductById = async (productId) => {
  const res = await fetch(`${BASE}/ecommerce/products/${productId}`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const createProduct = async (formData) => {
  const token = getToken();
  const res = await fetch(`${BASE}/ecommerce/products`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData, // multipart, browser sets content-type
  });
  return handle(res);
};

export const updateProduct = async (productId, formData) => {
  const token = getToken();
  const res = await fetch(`${BASE}/ecommerce/products/${productId}`, {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return handle(res);
};

export const deleteProduct = async (productId) => {
  const res = await fetch(`${BASE}/ecommerce/products/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
};

export const getProductsByCategory = async (categoryId, page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/ecommerce/products/category/${categoryId}?page=${page}&limit=${limit}`,
    { headers: authHeaders() },
  );
  return handle(res);
};

/* ================= CATEGORIES ================= */

export const getCategories = async (page = 1, limit = 20) => {
  const res = await fetch(
    `${BASE}/ecommerce/categories?page=${page}&limit=${limit}`,
    { headers: authHeaders() },
  );
  return handle(res);
};

/* ================= CART ================= */

export const getCart = async () => {
  const res = await fetch(`${BASE}/ecommerce/cart`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await fetch(`${BASE}/ecommerce/cart/item/${productId}`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ quantity }),
  });
  return handle(res);
};

export const removeFromCart = async (productId) => {
  const res = await fetch(`${BASE}/ecommerce/cart/item/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
};

export const clearCart = async () => {
  const res = await fetch(`${BASE}/ecommerce/cart/clear`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
};

/* ================= ORDERS ================= */

export const getOrderById = async (orderId) => {
  const res = await fetch(`${BASE}/ecommerce/orders/${orderId}`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(`${BASE}/ecommerce/orders/status/${orderId}`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ status }),
  });
  return handle(res);
};

export const createRazorpayOrder = async (addressId) => {
  const res = await fetch(`${BASE}/ecommerce/orders/provider/razorpay`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ addressId }),
  });
  return handle(res);
};

export const verifyRazorpayPayment = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
) => {
  const res = await fetch(
    `${BASE}/ecommerce/orders/provider/razorpay/verify-payment`,
    {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    },
  );
  return handle(res);
};

/* ================= ADDRESSES ================= */

export const getAddresses = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${BASE}/ecommerce/addresses?page=${page}&limit=${limit}`,
    { headers: authHeaders() },
  );
  return handle(res);
};

export const getAddressById = async (addressId) => {
  const res = await fetch(`${BASE}/ecommerce/addresses/${addressId}`, {
    headers: authHeaders(),
  });
  return handle(res);
};

export const createAddress = async (address) => {
  const res = await fetch(`${BASE}/ecommerce/addresses`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(address),
  });
  return handle(res);
};

export const updateAddress = async (addressId, address) => {
  const res = await fetch(`${BASE}/ecommerce/addresses/${addressId}`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify(address),
  });
  return handle(res);
};

export const deleteAddress = async (addressId) => {
  const res = await fetch(`${BASE}/ecommerce/addresses/${addressId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
};
