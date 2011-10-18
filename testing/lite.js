document.body.innerHTML = '';
var styles = document.styleSheets, len = styles.length;
while(len){
  var sheet = styles[--len], rules = sheet.cssRules, rlength = rules.length;
  while(rlength) sheet.deleteRule(--rlength);
}

function send(json){
  frames[0].postMessage(JSON.stringify(json), 'https://plus.google.com');
}

function showSharebox(){
  send({"s":"onShowShareboxOnly","f":"..","c":0,"a":["",{}]})
}

function showNotifications(){
  send({"s":"onShowNotificationsOnly","f":"..","c":0,"a":["",{"maxWidgetHeight":311}],"t":"86208861","l":false,"g":true,"r":".."})
}

function hideWidgets(){
  send({"s":"onHide","f":"..","c":0,"a":["",{}]})
}

var container = document.createElement('div');
container.style.width = '440px';
container.style.overflow = 'hidden';
container.style.position = 'absolute';

var iframe = document.createElement('iframe');
iframe.scrolling = 'no';
iframe.width = '100%';
iframe.frameBorder = 'no';

onmessage = function(e){
  var j = JSON.parse(e.data);
  if(j.s == 'setNotificationWidgetHeight'){
    container.style.height = j.a[1];
  }else if(j.s == '_resizeMe'){
    iframe.style.height = j.a[1].height+'px';
  }else if(j.s == '_ready'){
    send({"s":"__cb","f":"..","c":1,"a":[1,null],"t":"86208861","l":false,"g":true,"r":".."});
     send({"s":"getVarc","f":"..","c":2,"a":["","base"],"t":"86208861","l":false,"g":true,"r":".."})
    showNotifications();
  }else if(j.s == 'navigateTo'){
    console.log(j.a[1].url); //this is the magical command to open a tab
  }else if(j.s == 'hideNotificationWidget'){
    //then reopen the default.
  }
  console.log(j.s,e)
}
container.appendChild(iframe)
document.body.appendChild(container)

iframe.src = 'https://plus.google.com/u/0/_/notifications/frame?hl=en&origin=http%3A%2F%2Fwww.google.com&jsh=r%3Bgc%2F23980661-3686120e#pid=1&id=gbsf&parent=http%3A%2F%2Fwww.google.com&rpctoken=86208861&_methods=onError%2ConInfo%2ChideNotificationWidget%2CpostSharedMessage%2CsetNotificationWidgetHeight%2CswitchTo%2CnavigateTo%2CsetNotificationText%2ChandlePosted%2C_ready%2C_close%2C_open%2C_resizeMe'
