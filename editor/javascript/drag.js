var node;
var div;
function num(string) {
      return parseInt(string.slice(0, string.length - 2));
}
var mydragg = function(){
   return {
       move : function(divid,xpos,ypos){
           divid.style.left = xpos + 'px';
           divid.style.top = ypos + 'px';

           updateConnections();
       },
       startMoving : function(divid,container,evt){
           evt = evt || window.event;
           var posX = evt.clientX,
               posY = evt.clientY,
           divTop = divid.style.top,
           divLeft = divid.style.left,
                       eWi = parseInt(divid.style.width),
                       eHe = parseInt(divid.style.height),
                       cWi = parseInt(document.getElementById(container).style.width),
                       cHe = parseInt(document.getElementById(container).style.height);
           divTop = divTop.replace('px','');
           divLeft = divLeft.replace('px','');
           var diffX = posX - divLeft,
               diffY = posY - divTop;
           document.onmousemove = function(evt){
               evt = evt || window.event;
               var posX = evt.clientX,
                  posY = evt.clientY,
                  aX = posX - diffX,
                  aY = posY - diffY;
                                   if (aX < 0) aX = 0;
                                   if (aY < 0) aY = 0;
                                   if (aX + eWi > cWi) aX = cWi - eWi;
                                   if (aY + eHe > cHe) aY = cHe -eHe;
               mydragg.move(divid,aX,aY);
           }

           div = divid;
       },
       stopMoving : function(container){
           var a = document.createElement('script');
           document.onmousemove = function(){}

            node = nodeList.find(x => x.id == div.id);
            node.display.position.x = num(div.style.left);
            node.display.position.y = num(div.style.top);
            save();
       },
   }
}();
