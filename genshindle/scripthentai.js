var genderkey; var elementkey; var typekey;var currentchar;var randomCHARsplit; var gendercolor; var elementcolor; var typecolor;var chargender;var found; var character;var tries = 0; var keycharacterimage;
const charname = ["Kaeya", "Bennett", "Amber", "Ganyu", "Rosaria"]
    const postacie = ["121", "111", "212", "222", "221" ];


function setrandom(){
    
    const random = Math.floor(Math.random() * postacie.length);
    randomCHARsplit = postacie[random];

    keycharacterimage = charname[random];

    console.log(keycharacterimage);
   
    genderkey = randomCHARsplit[0];

    elementkey = randomCHARsplit[1];

    typekey = randomCHARsplit[2];    
}

function confirm(){

    character = document.getElementById('myInput').value;
    var foundCHAR = (charactersCHECK.indexOf(character) > -1);
    if(foundCHAR == true){
        var characterNUM = charactersCHECK.indexOf(character);
        currentchar = postacie[characterNUM];
        var characterimage = charname[characterNUM];
        var charactericon = `/charsw/Character_${character}_Thumb.webp`;
    }

    var charNUM ;
    charNUM = currentchar;

    var charNUMsplit = charNUM.split('');

    var gender = charNUMsplit[0];

    var element = charNUMsplit[1];

    var type = charNUMsplit[2];

    if(charNUMsplit[0] == 1){
        chargender = "Male";
    } else {
        chargender = "Female";
    }

    if(charNUMsplit[1] == 1){
        charelement = "Pyro";
    } else {
        charelement = "Cryo";
    }

    if(charNUMsplit[2] == 1){
        chartype = "Mele";
    } else {
        chartype = "Range";
    }


    if(gender == genderkey){
        gendercolor = "lightgreen";
    } else{
        gendercolor = "lightcoral";
    }

    if(element == elementkey){
        elementcolor = "lightgreen";
    } else{
        elementcolor = "lightcoral";
    }

    if(type == typekey){
        typecolor = "lightgreen";
    } else{
        typecolor = "lightcoral";
    }

    var postac = document.getElementById('myInput').value;
    var found = (characters.indexOf(postac) > -1);
    document.getElementById('myInput').value = '';
    
    if(found == true){
        var delarrNUM = characters.indexOf(postac);
        characters.splice(delarrNUM,1);
        autocomplete(document.getElementById("myInput"), characters);
    } else {
      
    }

    if(currentchar == randomCHARsplit)
    {
        var div = document.createElement("div");
                    div.setAttribute("class", "answercontainer");
                    
                    var order = document.getElementById('main');
                    order.insertBefore(div, order.children[0]);


                    var imgdiv = document.createElement("div");
                    imgdiv.classList.add('answerimg', 'answers');
                    
                    
                    var img = document.createElement("img");
                    img.classList.add('picture');
                    img.src = charactericon;
                    
                    imgdiv.appendChild(img);


                    
                    div.appendChild(imgdiv);
                    
                    var genderdiv = document.createElement("div");
                    genderdiv.classList.add('answergender', 'answers')
                    genderdiv.style.backgroundColor = gendercolor;
                    
                    genderdiv.innerHTML = chargender;
                    div.appendChild(genderdiv);

                    var elementdiv = document.createElement("div");
                    elementdiv.classList.add('answerelement', 'answers')
                    elementdiv.style.backgroundColor = elementcolor;
                    
                    elementdiv.innerHTML = charelement;
                    div.appendChild(elementdiv);

                    var typediv = document.createElement("div");
                    typediv.classList.add('answertype', 'answers')
                    typediv.style.backgroundColor = typecolor;
                    
                    typediv.innerHTML = chartype;
                    div.appendChild(typediv);
                    
                    tries ++;
                    setTimeout(function() {
                        winresult();
                        scroll();
                      }, 3000)
    } else {
                tries ++;
    
                if(found == true){
                    
                    var div = document.createElement("div");
                    div.setAttribute("class", "answercontainer");
                    
                    var order = document.getElementById('main');
                    order.insertBefore(div, order.children[0]);


                    var imgdiv = document.createElement("div");
                    imgdiv.classList.add('answerimg', 'answers');
                    
                    
                    var img = document.createElement("img");
                    img.classList.add('picture');
                    img.src = charactericon;
                    
                    imgdiv.appendChild(img);


                    
                    div.appendChild(imgdiv);
                    
                    var genderdiv = document.createElement("div");
                    genderdiv.classList.add('answergender', 'answers')
                    genderdiv.style.backgroundColor = gendercolor;
                    genderdiv.innerHTML = chargender;
                    div.appendChild(genderdiv);

                    var elementdiv = document.createElement("div");
                    elementdiv.classList.add('answerelement', 'answers')
                    elementdiv.style.backgroundColor = elementcolor;
                    elementdiv.innerHTML = charelement;
                    div.appendChild(elementdiv);

                    var typediv = document.createElement("div");
                    typediv.classList.add('answertype', 'answers')
                    typediv.style.backgroundColor = typecolor;
                    typediv.innerHTML = chartype;
                    div.appendChild(typediv);

                    
                }
            }
}

var characters;
function restore(){
  
  
  characters = ["Alhaitham", 'Ayaka', "Bennett", "Eula", "Fischl", "Ganyu", "Hu Tao", "Itto", "Kazuha", "Kokomi", "Nahida", " Raiden Shogun", "Venti", "Xiangling", "Yae Miko", "Xingqiu", "Yelan", "Zhongli", "Ayato", "Beidou"," Childe", "Cyno", "Dendro Traveler", "Diluc", "Diona","Jean","Keqing","Mona","Nilou","Scaramouche","Shikanoin Heizou","Sucrose","Tighnari","Xiao","Yoimiya","Barbara","Collei","Faruzan","Gorou","Kaeya","Klee","Kujou Sara","Kuku Shinobu","Layla","Nigguang","Noelle","Razor","Rosaria","Shenhe","Yanfei","Yaoyao","Aloy","Candace","Chongyoun","Dori","Electro Traveler","Geo Traveler","Lisa","Qiqi","Sayu","Amber","Anemo Traveler","Xinyan"];

  charactersCHECK = ["Kaeya", "Bennett", "Amber", "Ganyu", "Rosaria"];
}

function winresult(){
    console.log(keycharacterimage);
    var winimg = document.createElement('img');
    winimg.src = `/charsw/Character_${keycharacterimage}_Thumb.webp`;
    winimg.style.width = "50px";
    winimg.style.height = "50px";
    
    document.getElementById('winresultcharacter').innerHTML = keycharacterimage;
    document.getElementById('winfooter').appendChild(winimg);
    document.getElementById('winfooter').style.display = "block";
    document.getElementById('wininfo').style.display = "block";
    document.getElementById('numberoftries').innerHTML = tries;
}

function scroll(){
    
    document.getElementById("winfooter").scrollIntoView({block: "start" ,behavior: "smooth"
    })
    
}

setInterval(function (){
var date = new Date();
var hour = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();

var hour = 24 - hour;
var minutes = 60 - minutes;
var seconds = 60 - seconds;

if(seconds < 10){
    seconds = "0" + seconds;
}

if(minutes < 10){
    minutes = "0" + minutes;
}

if(hour < 10){
    hour = "0" + hour;
}

var time = hour + ":" + minutes + ":" + seconds;

document.getElementById('time').innerHTML = time;

},1000)
