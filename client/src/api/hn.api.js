import {$api} from "./index.js";
import {getStartAndEndIdx} from "./helpers/getStartAndEndIdx.js";



class HnApi {
  async getPopularNews(pageSize = 10, page = 1) {
    try {
      let {data: newsIds} = await $api.get("topstories.json")
      const itemsCount = newsIds.length
      const [startIdx, endIdx] = getStartAndEndIdx(page, pageSize)
      newsIds = newsIds.slice(startIdx, endIdx)

      const itemsList =  await Promise.all(newsIds.map(newsItem => this.getOneItemById(newsItem)))

      return {
        itemsList,
        itemsCount
      }
    } catch (e){
      console.log(e)
      return false
    }
  }

  async getPopularAsks(pageSize = 10, page = 1) {
    try {
      let {data: askIds} = await $api.get("askstories.json?print=pretty")
      const itemsCount = askIds.length

      const [startIdx, endIdx] = getStartAndEndIdx(page, pageSize)
      askIds = askIds.slice(startIdx, endIdx)

      const itemsList = await Promise.all(askIds.map(askId => this.getOneItemById(askId)))

      return {
        itemsList,
        itemsCount
      }
    } catch {
      return false
    }
  }

  async getPopularJobs(pageSize = 10, page = 1) {
    try {
      let {data: askIds} = await $api.get("jobstories.json?print=pretty")
      const itemsCount = askIds.length

      const [startIdx, endIdx] = getStartAndEndIdx(page, pageSize)
      askIds = askIds.slice(startIdx, endIdx)

      const itemsList = await Promise.all(askIds.map(askId => this.getOneItemById(askId)))

      return {
        itemsList,
        itemsCount
      }
    } catch {
      return false
    }
  }

  async getPopularShows(pageSize = 10, page = 1) {
    try {
      let {data: showIds} = await $api.get("showstories.json?print=pretty")
      const itemsCount = showIds.length

      const [startIdx, endIdx] = getStartAndEndIdx(page, pageSize)
      showIds = showIds.slice(startIdx, endIdx)

      const itemsList = await Promise.all(showIds.map(askId => this.getOneItemById(askId)))

      return {
        itemsList,
        itemsCount
      }
    } catch {
      return false
    }
  }

  async getUserComments(commentIds) {
    try {
      const itemsList = await Promise.all(commentIds.map(commentId => this.getOneItemById(commentId)))

      return {
        itemsList,
      }
    } catch {
      return false
    }
  }

  async getOneItemById(id) {
    return (await $api.get(`item/${id}.json`)).data
  }

  async getUserById(id) {
    return $api.get(`user/${id}.json?print=pretty`)
  }
}

export const hn = new HnApi()
