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

// fetch("./data/trending.json")
// 	.then((response) => {
// 		response.json()
// 	})
// 	.then((data) => {
// 		console.log(data)
// 	})
// 	.catch((err) =>{
// 		console.error(err)
// 	});

let trending_data=[]

// fetch("./data/trending.json")
// .then((response) => response.json())
// .then((data) => trending_data=data)
// .catch((error) => console.log(error));

async function fetchData(){
  try{
    let request=await fetch("./data/trending.json");
    let trending_data=await request.json();
    console.log(trending_data);
  }catch(error){
    console.log(error);
  }
}

// fetchData();
console.log(trending_data)
JSON.parse("./data/trending.json")
	