export default class ReqUtils{
    static getReq(token,data){
      return {
        header:{
          from :'pc',
          token:token
        },
        data:data
      }
    }
    static getHttpRoot(){
      return 'http://localhost:8011/api';
    }
}
