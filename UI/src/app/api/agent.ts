import axios, {AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {router} from "../router/Routes.tsx";

axios.defaults.baseURL = "http://localhost:5000/api/";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  switch (status) {
    case 400:
      let message:string = "";
      if (data.errors) {
        message = "Validation error. "
        for (const key in data.errors) {
          if (data.errors[key]) {
            message += data.errors[key] + " "
          }
        }
      }
      console.log(message)
      toast.error(message.length ? message : data.title);
      break;
    case 401:
      toast.warning("Permission denied.");
      break;
    case 404:
      router.navigate('/not-found')
      break;
    case 500:
      router.navigate('/server-error', { state: { error: data }})
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

const TestErrors = {
  get400: () => requests.get('bug/bad-request'),
  get401: () => requests.get('bug/unauthorised'),
  get404: () => requests.get('bug/not-found'),
  get500: () => requests.get('bug/server-error'),
  getValidationE: () => requests.get('bug/validation-error')
}

const agent = {
  Catalog,
  TestErrors
}

export default agent;


