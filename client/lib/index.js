import baseUrl from "../utils/baseUrl";

const API_URL = baseUrl;
import axios from "axios";

export const fetchHouses = async () => {
    const response = await axios.get(`${API_URL}/house`);
    const data = await response.data;
    return data;
  };

  export const fetchSlots = async (hid,date) => {
    const response = await axios.get(`${API_URL}/slot/${hid}/${date}`);
    const data = await response.data;
    return data;
  };

  export const fetchSlot = async (sid) => {
    const response = await axios.get(`${API_URL}/slot/${sid}`);
    const data = await response.data;
    return data;
  };

  export const fetchBookedSlot = async (sid) => {
    const response = await axios.get(`${API_URL}/visitation/${sid}`);
    const data = await response.data;
    return data;
  };

  export const bookSlot = async (data) => {
    const response = await axios.post(`${API_URL}/visitation/add`, { data });
    const booked = await response.data;
    return booked;
  };

  