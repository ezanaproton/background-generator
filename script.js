function rgbStringToArray(string){
    return string.substring(4, string.length-1)
    .replace(/ /g, '')
    .split(',');
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  
function setGradient(){
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
    css.textContent = `${body.style.background};`;
    // console.log(css.textContent);
}

function randomHex(){
    var first=[];
    for(var i=0;i<3;i++){
        first.push(Math.floor(Math.random()*256));
    }
    return rgbToHex(first[0], first[1], first[2]);
}

function extractRgb(str){
    str = str.split("t, ");
    str.shift();
    str = str[0].split("), ");
    str[0] += ")";
    return str;
}


let css = document.querySelector("h3");
let [color1, color2] = document.querySelectorAll(".color");
let colors = [color1, color2];
let body = document.getElementById("gradient");

colors.map(color=>(color.addEventListener("input", setGradient)));

let styles = document.defaultView.getComputedStyle(document.querySelector("body"));
css.textContent = `${styles.backgroundImage};`;

let gradientString = styles.backgroundImage.substring(0, styles.backgroundImage.length - 1);
let rgbStrings = extractRgb(gradientString);
let rgbArrays = rgbStrings.map(x=>rgbStringToArray(x));
let hexColors = rgbArrays.map(x=>rgbToHex(Number(x[0]), Number(x[1]), Number(x[2])));

colors.map((x,i)=>{x.setAttribute("value", hexColors[i])});

let button = document.querySelector(".random");
button.addEventListener("click",()=>{
    color1.value = randomHex();
    color2.value = randomHex();
    setGradient()});
