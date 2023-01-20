// Tops data fetch
let topsData=[]
fetchTopsData();
async function fetchTopsData(){
  try{
    let request=await fetch("./data/tops.json");
    let tops_data=await request.json();
    display_products(tops_data);
    console.log(tops_data);
    topsData=[...tops_data]
  }catch(error){
    console.log(error);
  }
}

// products data display function 

let products=JSON.parse(localStorage.getItem("available"));
if(products==null){
  products=[];
}

let displayel=document.querySelector("tbody");

function display_products(data){
displayel.innerHTML=null;
data.forEach((element,index)=>{
  let tr=document.createElement("tr")

  let id=document.createElement("td");
  id.innerText=element.id;

  let title=document.createElement("td");
  title.innerText=element.name;

  let brand=document.createElement("td");
  brand.innerText=element.brand;;

  let tag=document.createElement("td");
  tag.innerText=element.tag;

  let rating=document.createElement("td");
  rating.innerText=element.rating;

  let desc=document.createElement("td");
  desc.innerText=element.desc;

  let price=document.createElement("td");
  price.innerText="₹ "+element.price;

  let removeBtn = document.createElement("td");
  removeBtn.innerText = "Remove Item";
removeBtn.style.cursor="pointer";
removeBtn.style.color="red";

  removeBtn.addEventListener("click", () => {
    products = topsData.filter((el, i) => {
        return index !== i;
      })
      localStorage.setItem("available", JSON.stringify(products));
      display_products(products);
})


tr.append(id,title, brand, desc, tag, price, rating, removeBtn);
displayel.append(tr);
})
}

// filter function

document.getElementById("brand").addEventListener("change", (e) => {
  let filter = e.target.value;
  filtered = topsData.filter((el, index) => {
    if (filter === "") {
      return el;
    } else {
      return el.brand === filter;
    }
  })
  display_products(filtered);
})

document.getElementById("price").addEventListener("change", (e) => {
  let filter = e.target.value;
  // console.log(filter)
  pricefiltered = topsData.filter((el, index) => {
    if (filter === "") {
      return el;
    } else if(filter === "high"){
      return el.price>=3000;
    }else if(filter === "medium"){
      return el.price >=1500 && el.price<3000;
    }else if(filter === "low"){
      return el.price >=0 && el.price<1500;
    }else if(filter==="limited"){
      return el.tag=="Limited Time Price!"
    }else if(filter==="perfect"){
      return el.tag=="Perfect Price!"
    }
  })
  display_products(pricefiltered);
})
  
  //sort function
  
  function sort_asc(a,b){
    return b-a;
  }
  function sort_des(a,b){
    return a-b;
  }
  
  document.getElementById("sort").addEventListener("change", (e) => {
    let sort = e.target.value;
    console.log(sort);
    // let arr=getdata();
    sorted = topsData.filter((el, index) => {
      if (sort === "") {
        return el;
      } else if(sort === "topRated"){
        return sort_asc(el.rating);
      }else if(sort === "highestPrice"){
        return sort_asc(el.price);
      }else if(sort === "lowestPrice"){
        return sort_des(el.price);
      }
    })
    display_products(sorted);
  })
