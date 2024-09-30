

function funkcja(min, max) {
    var random = Math.floor(Math.random() * 999999);
    document.getElementById('display').innerHTML = random;
    var avalue = document.getElementById('visit');
    avalue.setAttribute("href", `https://rule34.xxx/index.php?page=post&s=view&id=${random}`)

  }