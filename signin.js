let signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
    signup_data = [];
}

let formel=document.querySelector("form");
formel.addEventListener("submit", (element)=>{
//    element.preventDefault()
    for(let i=0;i<signup_data.length;i++){
        // console.log("data"+signup_data[i].name)
        // console.log(formel.username.value)
        if(formel.username.value==signup_data[i].name&&formel.pass.value==signup_data[i].pass){
            let success=true;
            alert("LOGIN SUCCESSFUL!");
            window.location.href = "./index.html"
        }else{
            alert("Invalid Username/Password");
        }
        if(success==true){
            window.location.href = "./index.html"
        }
    }
})
// localStorage.clear()


function home(){
    window.location = '/'
}

// slideshow header
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides_fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); 
}