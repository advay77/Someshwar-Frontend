

export const createBookingOrder = async (bookingData) => {
  return await fetch("/api/v1/bookings/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData)
  });
};

export const getBookingById = async (bookingId) => {
  const response = await fetch(`/api/v1/bookings/get-booking/${bookingId}`);
  if (!response.ok) {
    throw new Error("Booking not found");
  }
  const data = await response.json();
  return data.booking;
}

export const failBookingPayment = async (bookingId: string) => {
  try {
    await fetch(`/api/v1/bookings/fail/${bookingId}`, {
      method: "POST",
    });
  } catch (err) {
    console.error("Failed to mark booking as failed on server", err);
  }
};

export const getAllBookings = async (page = 1, date = "", status = "all", month = "", year = "") => {
  let url = `/api/v1/bookings/get-all-bookings?page=${page}&limit=10`;
  if (date) {
    url += `&date=${date}`;
  }
  if (status !== "all") {
    url += `&status=${status}`;
  }
  if (month) {
    url += `&month=${month}`;
  }
  if (year) {
    url += `&year=${year}`;
  }
  return await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export const getAllPujas = async () => {
  const response = await fetch(`/api/v1/pujas`);
  return await response.json();
}

export const getPuja = async (id) => {
  const response = await fetch(`/api/v1/pujas/${id}`);
  return await response.json();
}

export const createPuja = async (pujaData) => {
  const response = await fetch(`/api/v1/pujas`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pujaData),
  });
  return await response.json();
}

export const updatePuja = async (id, pujaData) => {
  const response = await fetch(`/api/v1/pujas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pujaData),
  });
  return await response.json();
}

export const deletePuja = async (id) => {
  const response = await fetch(`/api/v1/pujas/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

export const adminLogin = async (username, password) => {
  return await fetch("/api/v1/auth/admin/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}