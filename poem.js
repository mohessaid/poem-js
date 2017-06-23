(function(){
        // an object constructor which take an array of dom table with poem as class
        // it will be used:
        //                var poems = new Poem(hasClass('peom','table'));
        //                poems.adjust();
        function Poem(poems){
          this.poems = poems;
          this.adjust = function(){
            for(var i=0;i<this.poems.length;i++){
              if(isPoem(this.poems[i])){
                AdjustPoem(this.poems[i]);
              }
            }
          }; // end of adjust method
          // these are private methods
          function AdjustPoem(poem){
            var part1With = poem.rows[0].cells[0].offsetWidth;
            var rWidth = part1With;
            if(poem.rows[0].cells[1])
            {
              var part2With = poem.rows[0].cells[1].offsetWidth;
              rWidth = part1With >= part2With ? part1With : part2With;
            }
            for (var i=0;i<poem.rows.length;i++){
              for (var j=0;j<poem.rows[i].cells.length;j++){
                AdjustCell(poem.rows[i].cells[j],rWidth);
              }
            }
          }
          function AdjustCell(cell,rWidth){
            var span = cell.getElementsByTagName('span')[0];
            var matched = span.innerHTML.match(/([^اأدإلءؤرآوزذـ \s\d\u064c\u064b\u064d\u064e\u064f\u0650\u0651\u0652])([\u064c\u064b\u064d\u064e\u064f\u0650\u0651\u0652])?([^ ـ\s\d\u064c\u064b\u064d\u064e\u064f\u0650\u0651\u0652])/g);
            var i=0;
            while(span.offsetWidth<=rWidth){
              var ml=matched[i].length-1;//  to avoid adding tatoil before el-haraka
              span.innerHTML = span.innerHTML.replace(matched[i],matched[i].slice(0,ml) + '\u0640' + matched[i].slice(ml));
              matched[i] = matched[i].slice(0,ml) + '\u0640' + matched[i].slice(ml);
              i = (i+1) % matched.length;
            }
          }
          function isPoem(poem){
            var pattern=/^([\s]*?<span>)(.|\s)+(<\/span>[\s]*?)$/;
            for(var i=0;i<poem.rows.length;i++)
            {
              for(var j=0;j<poem.rows[i].cells.length;j++){
                if(!pattern.test(poem.rows[i].cells[j].innerHTML.toLowerCase()))
                  return false;
              }
            }
            return true;	
          }
          // end of private methods
        }// end of Poem constructor
        // hasClass function for selecting DOM elements by class name, taken from 
        // the book pro javascript techniques by John Resig
        function hasClass(name,type) {
          var r = [];
          // Locate the class name (allows for multiple class names)
          var re = new RegExp("(^|\s)" + name + "(\s|$)");
          // Limit search by type, or look through all elements
          var e = document.getElementsByTagName(type || "*");
          for ( var j = 0; j < e.length; j++ )
            // If the element has the class, add it for return
            if ( re.test(e[j].className)) r.push( e[j] );
          // Return the list of matched elements
          return r;
        }// end has class
        // add event
        function addEvent(target,type,handler){
          if (typeof target.addEventListener != "undefined")
          {
            target.addEventListener(type,handler, false);
          }
          else if (typeof target.attachEvent != "undefined")
          {
            target.attachEvent('on'+type,handler);
          }
        }// end add event function
        addEvent(window,'load',function(){poems = new Poem(hasClass('poem','table')); poems.adjust();});
      })();