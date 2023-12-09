import axios from "axios"
import { $serverAPI } from "."



class ServerAPI {
  async getUser() {
    return $serverAPI.get('me')
  }

  async login(username, password) {
    return axios.post('login', {username, password}, {baseURL: 'http://localhost:5000/api/'})
  }

  async registration(username, password) {
    return $serverAPI.post('registration', {username, password}, {baseURL: 'http://localhost:5000/api/'})
  }
}

export const serverAPI = new ServerAPI()
