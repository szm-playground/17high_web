import axios from "axios"

class ActivityApiService {
  list(){
    var promise = new Promise(function(resolve, reject) {
      axios.get("/v1/activities?size=6&page=0").then(function(result){
        if(result.status != 200) {
          resolve([]);
          console.error("invalid error");
          console.error(result);
          return;
        }
        resolve(result.data);
      }).catch(function (e) {
        reject(e);
      })
    });
    return promise;

  }
}

export default ActivityApiService