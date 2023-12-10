import axios from "axios"
import { $serverAPI } from "."



class ServerAPI {
  async getUser() {
    return $serverAPI.get('me')
  }

  async login(username, password) {
    return axios.post('login', {username, password}, {baseURL: 'http://localhost:5000/api/'})
  }

  async registration(username, password, email) {
    return $serverAPI.post('registration', {username, password, email}, {baseURL: 'http://localhost:5000/api/'})
  }

  async saveNews(newsId) {
    return $serverAPI.post('add_news', {newsId})
  }

  async getSavedNews() {
    return $serverAPI.get('saved-news')
  }

  async deleteNews(newsId) {
    return $serverAPI.delete('delete_news', {
      params: {
        newsId
      }
    })
  }
}

export const serverAPI = new ServerAPI()
