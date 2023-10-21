import {$api} from "./index.js";

class HnApi {
  async getPopularNews(pageSize = 10, page = 1) {
    try {
      debugger
      let {data: newsIds} = await $api.get("topstories.json")
      const newsCount = newsIds.length
      const startIdx = (page - 1) * pageSize;
      const endIdx = page * pageSize;
      newsIds = newsIds.slice(startIdx, endIdx)

      const newsList =  await Promise.all(newsIds.map(newsItem => this.getOneNewsById(newsItem)))

      return {
        newsList,
        newsCount
      }
    } catch {
      return false
    }
  }

  async getOneNewsById(id) {
    return (await $api.get(`item/${id}.json`)).data
  }
}

export const hn = new HnApi()
