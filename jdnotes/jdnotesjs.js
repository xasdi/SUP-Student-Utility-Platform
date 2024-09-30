var pokaokno = document.getElementById("pokaoknob");
var okno = document.getElementById("okno");
var schowajokno = document.getElementById("schowajokno");
var dodajnotke = document.getElementById("dodajnotke");
var newtytul = document.getElementById("newnotetitle");
var newcontent = document.getElementById("newnotecontent");
var notecontainer = document.getElementById("noteheadercontainer");
var okno2 = document.getElementById("okno2");
var schowajokno2 = document.getElementById("schowajokno2");

pokaokno.addEventListener('click', () => {
    okno.showModal();
})

schowajokno.addEventListener('click', () => {
    newtytul.value = "";
    newcontent.value = "";
    okno.close();
})

schowajokno2.addEventListener('click', () => {
    okno2.close();
})
var date = new Date;
var number = 1;
var miesionc = date.getMonth();
    miesionc = miesionc + 1;
var actualdate = date.getDate() + "."+ miesionc + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

dodajnotke.addEventListener('click', () => {

    
    
    var newnotediv = document.createElement("div");
    newnotediv.className = "note";
    newnotediv.id = "newnoteid" + number;

    var newnotetitle = document.createElement("div");
    newnotetitle.className = "title";
    newnotetitle.innerHTML = newtytul.value;


    var newnotedate = document.createElement("div");
    newnotedate.className = "date";
    if(date.getMinutes < 10){
        date.getMinutes = "0" + date.getMinutes;
    }
    
    newnotedate.innerHTML = actualdate;


    var newnoteshortview = document.createElement("div");
    newnoteshortview.className = "shortview";
    newnoteshortview.id = "shortview" + number;
    newnoteshortview.setAttribute('onclick', 'document.getElementById("openednotecontent").innerHTML = document.getElementById("storednote' + number + '").innerHTML; okno2.showModal()');
    
    newnoteshortview.innerHTML = newcontent.value.substr(0,150) + "...";

    newnotediv.appendChild(newnotetitle);
    newnotediv.appendChild(newnoteshortview);
    newnotediv.appendChild(newnotedate);
    notecontainer.appendChild(newnotediv);


   

    var storedtitle = document.createElement("div");
    storedtitle.innerHTML = newtytul.value;
    storedtitle.id = "storedtitle" + number;
    document.getElementById("titlestorage").appendChild(storedtitle);

    var storednote = document.createElement("div");
    storednote.innerHTML = newcontent.value;
    storednote.id = "storednote" + number;
    document.getElementById("notestorage").appendChild(storednote);

    var storeddata = document.createElement("div");
    storeddata.innerHTML = actualdate;
    storeddata.id = "storeddate" + number;
    document.getElementById("datestorage").appendChild(storeddata);
    






    

    

    







    newtytul.value = "";
    newcontent.value = "";
    number++;
    okno.close();
})

var savestring = [];

function save(){
    let childrencount = document.getElementById("noteheadercontainer").childElementCount;
    console.log(childrencount);

    for(i = 1;i <= childrencount; i++){
        console.log(i);
        var element = {
            id: "storedtitle" + i,
            name: document.getElementById("storedtitle" + i).innerHTML,
        };
          savestring.push(element);
    }
    for(i = 1;i <= childrencount; i++){
        var element = {
            id: "storednote" + i,
            name: document.getElementById("storednote" + i).innerHTML,
        };
          savestring.push(element);
    }
    for(i = 1;i <= childrencount; i++){
        var element = {
            id: "storeddate" + i,
            name: document.getElementById("storeddate" + i).innerHTML,
        };
          savestring.push(element);
    }
    localStorage.setItem('savestring', JSON.stringify(savestring));
}

function load(){
    var storedList = localStorage.getItem('savestring');
    var parsedList = JSON.parse(storedList);


    if (parsedList) {
        var storagelistlength = parsedList.length;
        storagelistlength = storagelistlength / 3;
        

        for (var i = 1; i <= storagelistlength; i++) {

            if((i == 1 || i % 3 === 0) ){
                var newnotediv = document.createElement("div");
                newnotediv.className = "note";
                newnotediv.id = "newnoteid" + i;
            }
            


          var titleEntry = parsedList.find(function(entry) {
            return entry.id === 'storedtitle' + i;
          });
          if (titleEntry) {
            var titleValue = titleEntry.name;
            console.log("Wartość title" + i + ": " + titleValue);
            var newnotetitle = document.createElement("div");
            newnotetitle.className = "title";
            newnotetitle.id = "storedtitle" + i;
            newnotetitle.innerHTML = titleValue;
            newnotediv.appendChild(newnotetitle);
          }


          var titleEntry = parsedList.find(function(entry) {
            return entry.id === 'storednote' + i;
          });
          if (titleEntry) {
          var titleValue = titleEntry.name;
          console.log("Wartość note" + i + ": " + titleValue)
          var newnoteshortview = document.createElement("div");
          newnoteshortview.className = "shortview";
          newnoteshortview.id = "shortview" + number;
          newnoteshortview.setAttribute('onclick', 'document.getElementById("openednotecontent").innerHTML = document.getElementById("restorednote' + number + '").innerHTML; okno2.showModal()');
          newnotediv.appendChild(newnoteshortview);
          newnoteshortview.innerHTML = titleValue.substr(0,150) + "...";
          
          var restorednote = document.createElement("div");
          restorednote.innerHTML = titleValue;
          restorednote.id = "restorednote" + i;
          document.getElementById("notestorage").appendChild(restorednote);
      
        }


          var titleEntry = parsedList.find(function(entry) {
            return entry.id === 'storeddate' + i;
          });
          if (titleEntry) {
          var titleValue = titleEntry.name;
          console.log("Wartość date" + i + ": " + titleValue);
          var newnotedate = document.createElement("div");
          newnotedate.className = "date";
          newnotedate.id = "storeddate" + i;
          newnotedate.innerHTML = titleValue;
          newnotediv.appendChild(newnotedate);
          }
          notecontainer.appendChild(newnotediv);
        }
      }
    }


function check(){
    var check = localStorage.getItem('savestring');
    alert(check);
}

function reset(){
    localStorage.clear()
}