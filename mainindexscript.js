var link;var uselist = []; var enter = document.getElementById("enterlink"); 
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            
         

           
            b.innerHTML = arr[i];
            

           
            
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                
                addvalue();

                
                
              
                
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
        
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  })};

  var officialsubpagelist = ["guessthecolor", "landingpagezadanie", "rockpaperscisors", "todo", "jdnotes", "christmasspecial" ];
  var unofficialsubpagelist = ["amogus", "cumculator", "guessthecolor", "hentai", "landingpagezadanie", "niga", "rnghentai", "rybajpg", "checkthisout", "rockpaperscisors", "fnati", "todo", "jdnotes", "christmasspecial" ];
  

  
  var konamipasswd = [];
  
  function konamihandle(event){
    autocomplete(document.getElementById("myInput"), uselist);
    let keypressed = event.key;
    konamipasswd.push(keypressed);
    let stringifiedkonamipasswd = konamipasswd.join(',');
      if (stringifiedkonamipasswd.includes('ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight')){
        document.getElementById('hiddenhintrow').style.display = 'block';
        uselist = unofficialsubpagelist;
        autocomplete(document.getElementById("myInput"), uselist);
      }
      if ((keypressed == 'r' || keypressed == 'R') && document.activeElement !== document.getElementById("myInput")){
        document.getElementById('hiddenhintrow').style.display = 'none';
        console.log(konamipasswd);
        uselist = officialsubpagelist;
        konamipasswd = [];
      }
  }
  document.addEventListener("keydown", konamihandle)
  

  autocomplete(document.getElementById("myInput"), uselist);

   

  function addvalue(){
  if(document.getElementById("myInput").value == "amogus"){
      enter.href = 'amogus/amogus.html';
  }
  if(document.getElementById("myInput").value == "cumculator"){
      enter.href = 'cumculator/cumculator.html';
  }
  if(document.getElementById("myInput").value == "fnati"){
    enter.href = '/fnati/fnatiindex.html';
  }
  if(document.getElementById("myInput").value == "niga"){
    enter.href = '/firstjsusage/niga.html';
  }
  if(document.getElementById("myInput").value == "guessthecolor"){
    enter.href = '/guessthecolorgame/guessthecolor.html';
  }
  if(document.getElementById("myInput").value == "hentai"){
    enter.href = '/genshindle/hentai.html';
  }
  if(document.getElementById("myInput").value == "rnghentai"){
    enter.href = '/rnghentai/hentai.html';
  }
  if(document.getElementById("myInput").value == "rybajpg"){
    enter.href = '/inf03speedrun/rybajpghtml.html';
  }
  if(document.getElementById("myInput").value == "checkthisout"){
    enter.href = '/animationwithmusic/checkthisout.html';
  }
  if(document.getElementById("myInput").value == "rockpaperscisors"){
    enter.href = '/rockpaperscisors/simplegamehtml.html';
  }
  if(document.getElementById("myInput").value == "landingpagezadanie"){
    enter.href = 'landingpagezadanie/landingpagezadanie.html';
  }
  if(document.getElementById("myInput").value == "todo"){
    enter.href = '/todo/todo.html';
  };
  if(document.getElementById("myInput").value == "jdnotes"){
    enter.href = '/jdnotes/jdnotesindex.html';
  };
  if(document.getElementById("myInput").value == "christmasspecial"){
    enter.href = '/threejspov/christmasspecial.html';
  };

};

async function resetinput(){
  uselist = officialsubpagelist;
  await sleep(500);
  actualreset();
  
} 

function actualreset(){
  document.getElementById("myInput").value = "";
  enter.href = "";
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const search = document.querySelector('[name="myCountry"]');

 search.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        console.log("huh");
        addvalue();

        url = enter.href;

        window.location.href = url;

        resetinput();

    }});
