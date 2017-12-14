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

  /** master method for sending requests and caching responses using $http requests
    @cfg{
      catch:'data'//typically only error data is returned, but if catch!='data' then entire response is returned for a caught error
      promise:'data'//typically only data is returned, but if promise!='data' then entire response is returned
      headers:{}//when sending a file 'Content-Type':undefined so that no content-type header is sent
    }
  */
  _fetch(cfg) {
    upgradeConfig(cfg)

    return this.$http(cfg)
    .then(response => {
      response = !cfg.promise || cfg.promise=='data' ? response.data : response

      if (cfg.method === "GET" && cfg.queModel) {
        this.AckOffline.setCache(cfg.queModel.config.name, response.data)
      }

      return response
    })
    .catch(e=>{
      const isReduceData = cfg.catch==null||cfg.catch=='data'
      const isCatchData = isReduceData && e.data && e.data.error

      //find JSON error object and reduce to
      if(isCatchData){
        const newError = new Error()
        Object.assign(newError, e.data.error)
        e = newError
      }
      throw e
    })
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

/** prevent angular1 from assuming the header to send is application/json */
function upgradeConfig(cfg){
  const isFormData = cfg.data && FormData && cfg.data.constructor==FormData
  if(isFormData){
    const preventAutoContentType =  !cfg.headers || Object.keys(cfg.headers).filter(h=>h.search(/content-type/i)<0)
    
    if(preventAutoContentType){
      cfg.headers['Content-Type'] = undefined//'multipart/form-data;'
    }
  }
}

AckApi.$inject = ["$http", "AckOffline"]