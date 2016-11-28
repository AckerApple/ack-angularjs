export default class AckApi {
  constructor($http, AckOffline){
    this.config = {
      baseUrl:'',
      $http:{
        headers:{}
      }
    }
    this.$http = $http
    this.AckOffline = AckOffline
  }

  /** master method for sending requests and caching responses using $http requests
    @cfg{
      promise:'data'//typically only data is returned, but if promise!='data' then entire response is returned
    }
  */
  _fetch(cfg) {
    return this.$http(cfg)
    .then(response => {
      response = !cfg.promise || cfg.promise=='data' ? response.data : response

      if (cfg.method === "GET" && cfg.queModel) {
        this.AckOffline.cacheResponse(cfg.queModel.config.name, response)
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

    @config.queModel - When supplied, POST and PUTS goto que if they fail. GET responses are cached
  */
  request(method, url, config) {
    const defaults = {
      method,
      url:this.config.baseUrl+url,
      headers:{},
      timeout: 6500//4000//8000
    }

    const cfg = Object.assign(defaults, config)

    Object.assign(cfg.headers, this.config.$http.headers)//enforced config/defaults

    //has cache instructions?
    if (cfg.queModel) {
      const cacheName = cfg.queModel.config.name
      //const { ...cacheOptions } = cfg.queModel
      if (method === "GET") {
        return this.AckOffline.getCache(cacheName, cfg.queModel)
        .catch(() => this._fetch(cfg))
        //.catch(() => this.AckOffline.getCache(cacheName))
      }

      //request is a PUT, POST, or DELETE
      return this._fetch(cfg)
      .catch(() => this.AckOffline.enqueue(cacheName, cfg))//if fail, save for later
    }
    
    return this._fetch(cfg)
  }

  /**
    @path:url
    @config:{
      params:{}//url parameters
    }
  */
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