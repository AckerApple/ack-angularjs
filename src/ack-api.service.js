const apiConfig = {
  baseUrl:'',
  config:{}
}


export default class AckApi {
  constructor($http, AckOffline){
    this.config = apiConfig
    this.$http = $http
    this.AckOffline = AckOffline
  }

  /** master method for sending requests and caching responses using $http requests */
  _fetch(cfg) {
    return this.$http(cfg)
    .then(response => {
      if (cfg.method === "GET" && cfg.queModel) {
        this.AckOffline.cacheResponse(cfg.queModel.name, response)
      }
      return response
    })
  }

  /** method all request transactions tunnel thru to instead try for cache first
    @method:GET,POST,DELETE,PUT
    @url
    @config - {
      queModel:{
        config:{
          name, expires, allowExpired
        }
      }
    }
  */
  request(method, url, config) {
    const defaults = {
      method,
      url:this.config.baseUrl+url,
      timeout: 4000//8000
    }

    const cfg = Object.assign(defaults, config)

    Object.assign(cfg, this.config)

    if (cfg.queModel) {
      const cache = cfg.queModel.name
      //const { ...cacheOptions } = cfg.queModel
      if (method === "GET") {
        return this.AckOffline.getCache(cache, cfg.queModel)
        .catch(() => this._fetch(cfg))
        .catch(() => this.AckOffline.getCache(cache))
      } else {
        return this._fetch(cfg)
        .catch(() => this.AckOffline.enqueue(cache, cfg))
      }
    } else {
      return this._fetch(cfg)
    }
  }

  get(path, config) {
    return this.request("GET", path, config)
  }

  post(path, data, config) {
    const cfg = Object.assign({}, config, {data})
    return this.request("POST", path, cfg)
  }

  delete(path, config) {
    return this.request("DELETE", path, config)
  }

  put(path, data, config) {
    const cfg = Object.assign({}, config, {data})
    return this.request("PUT", path, cfg)
  }

}

AckApi.$inject = ["$http", "AckOffline"]