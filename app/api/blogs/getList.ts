import axios from "axios";

const api_url = process.env.SERVER_URL;

export const getList = async (page: number, pageSize: number) => {
  const response = await axios.get(`${api_url}/Blogs/getList?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
