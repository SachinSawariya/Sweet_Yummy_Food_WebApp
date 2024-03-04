import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer';

function Home() {

    const [search, setSearch]=useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    
    const loadData = async()=>{

      try{
        let response = await fetch("http://localhost:5000/api/foodData",{
        method:"POST",
        headers: {
            'content-Type':'application/json'
        }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);

  }
  catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
useEffect(()=>{
   loadData()
},[])



  return (
    <>
      <div>
        <Navbar />
      </div>
      <div >
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <button class="btn btn-outline-success text-white bg-primary" type="submit">Search</button>
              </div>

            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>
      <div className="container overflow-hidden">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                      ></Card>
                    </div>
                  ))
              ) : (
                <div>no such data found</div>
              )}
            </div>
          ))
        ) : null}
      </div>
            
          <Footer/>
    </>

  )
}

export default Home
