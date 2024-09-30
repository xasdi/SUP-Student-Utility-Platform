function pojawdodawacz(){
    document.getElementById("inputbox").style.display = "flex";
}
var taskinlistnumber = 0;
function dodajdolisty(){
    var userinput;
    userinput = document.getElementById("tekstinput").value;
    var newli;
    newli = document.createElement("li");
    newli.innerHTML = "- " + userinput;
    taskinlistnumber++;
    newli.id = "taskinlist" + taskinlistnumber;
    newli.className = "newlistyle";
    var newbutton;
    newbutton = document.createElement("button");
    newbutton.innerHTML = "Done";
    newbutton.className = "deletebutton"
    newbutton.setAttribute('onclick', 'document.getElementById("taskinlist' + taskinlistnumber + '").remove();');
    newli.appendChild(newbutton);
    document.getElementById("tasklist").appendChild(newli);
    document.getElementById("inputbox").style.display = "none";
}

function zapisz(){
    localStorage.setItem('notatka', 'To jest zawartość mojej notatki');
}


