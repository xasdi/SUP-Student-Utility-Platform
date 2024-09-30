var box;var kolor; var children;
function generatecolors(){
    children = document.getElementById('colorgrid').children;
   


    for(var i = 0; i < 9; i++){ 
    var rgba1 = Math.floor(Math.random() * 256);
    var rgba2 = Math.floor(Math.random() * 256);
    var rgba3 = Math.floor(Math.random() * 256);
    children[i].style.backgroundColor ="rgb(" + rgba1 + ", " + rgba2 + ", " + rgba3 + ")"
    }

    box = Math.floor(Math.random() * 9);
    kolor = children[box].style.backgroundColor;
    document.getElementById('actualdisplay').innerHTML = kolor;
    
    

   
    
    
    
    
}
var boxnumber = 100;
var answer;
var timeswon = 0;


function reply_click()
{
    a = event.srcElement.id;
   
    if(a == "color1"){
        boxnumber = 0;
    }
    if(a == "color2"){
        boxnumber = 1;
    }
    if(a == "color3"){
        boxnumber = 2;
    }
    if(a == "color4"){
        boxnumber = 3;
    }
    if(a == "color5"){
        boxnumber = 4;
    }
    if(a == "color6"){
        boxnumber = 5;
    }
    if(a == "color7"){
        boxnumber = 6;
    }
    if(a == "color8"){
        boxnumber = 7;
    }
    if(a == "color9"){
        boxnumber = 8;
    }
    
    if(boxnumber == box){
        alert('correct answer')
        generatecolors();
        timeswon += 1;
        document.getElementById('wincounter').innerHTML = timeswon;
    } else {
        alert('wrong answer')
        generatecolors();
        timeswon = 0;
        document.getElementById('wincounter').innerHTML = timeswon;
    }

    
}

setInterval(colorrotation, 1000);

function colorrotation(){
    var rgba1 = Math.floor(Math.random() * 256);
    var rgba2 = Math.floor(Math.random() * 256);
    var rgba3 = Math.floor(Math.random() * 256);
    document.getElementById('actuallogo').style.color ="rgb(" + rgba1 + ", " + rgba2 + ", " + rgba3 + ")"
    
}


