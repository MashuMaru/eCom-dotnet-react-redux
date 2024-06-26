import axios, {AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {router} from "../router/Routes.tsx";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
  await sleep();
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  switch (status) {
    case 400:
      const message:string = "";
      if (data.errors) {
        const modelStateErrors:string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key])
          }
        }
        throw modelStateErrors.flat();
      }
      toast.error(message.length ? message : data.title);
      break;
    case 401:
      toast.warning("Permission denied.");
      break;
    case 404:
      router.navigate('/not-found')
      break;
    case 500:
      toast.error("Something went wrong...")
      // router.navigate('/server-error', { state: { error: data }})
      break;
    default: break;
  }
  return Promise.reject(error.response);
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`)
}

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId: number, quantity: number) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const TestErrors = {
  get400: () => requests.get('bug/bad-request'),
  get401: () => requests.get('bug/unauthorised'),
  get404: () => requests.get('bug/not-found'),
  get500: () => requests.get('bug/server-error'),
  getValidationE: () => requests.get('bug/validation-error')
}

const agent = {
  Catalog,
  TestErrors,
  Basket
}

export default agent;


