function lookchang(){
    document.getElementById("click").setAttribute("hidden", "")
}

function play(){
    var audio = new Audio('music.mp3');
    audio.play();
}

async function colrotation(){
    i = 1;
    do{ 
    document.getElementById("word1").style.color = 'red';
    await sleep(498)
    document.getElementById("word1").style.color = 'white';
    document.getElementById("word2").style.color = 'red';
    await sleep(498)
    document.getElementById("word2").style.color = 'white';
    document.getElementById("word3").style.color = 'red';
    await sleep(498)
    document.getElementById("word3").style.color = 'white';
    document.getElementById("word4").style.color = 'red';
    await sleep(498)
    document.getElementById("word4").style.color = 'white';
    } while ( i = 1);
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  