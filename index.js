/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const acc = document.getElementsByClassName("accordion")

for (let i = 0; i <acc.length; i++){
    acc[i].addEventListener("click", function(){
        this.classList.toggle("active")
        let panel = this.nextElementSibling
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }      
    })
}