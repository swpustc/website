function setCookie(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+"="+escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString())+";path=/";
}
function getCookie(c_name){
  if(document.cookie.length>0){
    c_start=document.cookie.indexOf(c_name+"=");
    if(c_start!=-1){
      c_start=c_start+c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
    if(c_end==-1)
      c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}
function getCss(name){
  cssid=getCookie(name);
  if (cssid!=null&&cssid!=""){
    return cssid;
  }
  else{
    return 0;
  }
}
function changeCss(name,id){
  if(id>=0&&id<10){
    for(var i=0;i<10;i++){
      if(i==id){
        document.getElementById("CSS"+i).disabled=false;
        setCookie(name,i,365);
      }
      else
        document.getElementById("CSS"+i).disabled=true;
      }
  }
}
function selectCss(name){
   changeCss(name,document.getElementById("select-css").value);
}
