export default class Formatter {
  static formatDate(dateTarget,fmt) {
    let date=dateTarget;
    if(typeof(dateTarget)==='string'){
      date=new Date(dateTarget);
    }
    if('yyyy-MM-dd HH:mm:ss'===fmt){
      return date.getFullYear()
        +'-'+(date.getMonth()+1)
        +'-'+date.getDate()
        +' '+date.getHours()
        +':'+date.getMinutes()
        +':'+date.getSeconds();
    }else{
     return date.getFullYear()
        +'-'+(date.getMonth()+1)
        +'-'+date.getDate();
    }
  }
}
