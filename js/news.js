const loadNewsCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error =>console.log(error))
}
const displayNewsCategories = categories => {
    
    const newsCategories = document.getElementById('news-categories');
     
    categories.forEach(category => {
        loadNewsDetail(`${category.category_id}`);
    // console.log(category.category_id)
        const categoryli = document.createElement('li');
       
        // 
        categoryli.innerHTML = `
        
        <li class="nav-item me-4"  >
            <a class=" text-decoration-none  pe-3 me-3" aria-current="page"   href="#" onclick="loadNewsDetail('${category.category_id}')">${category.category_name}</a>
        </li>
        `
         
         
        newsCategories.appendChild(categoryli);
        
    })
}
const loadNewsDetail = (categoryId) => {
  
     fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId }`)
    .then(res => res.json())
    .then(data =>displayNewsDetail(data.data));
}
const displayNewsDetail = (allNews) => {
     
    console.log(allNews);
    const newsDetailsContainer = document.getElementById('news-details-container');
    newsDetailsContainer.innerHTML = ``;
     
    allNews .forEach(news => {
        const newsDetailsDiv = document.createElement('div');
        newsDetailsDiv.classList.add('col');
        // 
        newsDetailsDiv.innerHTML = `
        <div class="col mb-2">
        <div class="card">
          <div class="row mx-auto">
            <div class="col-md-3    col-lg-3 d-flex justify-content-center align-items-center">
              <img src="${news.thumbnail_url}"
                class=" img-fluid w-100 p-2 mx-auto rounded-start  " alt="...">
            </div>
            <div class="col-md-9  col-lg-9 mx-auto ">
              <div class="card-body ">
                <h5 class="text-dark pt-4 fw-bold ">${news.title}</h5>
                 
                <p class=" text-muted card-text mt-4   ">${news.details.length > 240? news.details.slice(0,240) + '...' : news.details}</p>
                <br>
 
                
                <div class="d-flex  justify-content-between mx-auto align-items-center  ">
                    <div class="d-flex   author-div-width justify-content-start align-items-center px-auto ">
                         
                            <img src="${news.author.img}" class="img-fluid img-width me-2 rounded-circle" alt="">
                                <div class="d-flex flex-column   align-self-center  ">
                                    <p class="card-text h5 fw-bold pt-3"><small class="text-black">${news.author.name}</small></p>
                                    <p  ><small>June 10,2022</small></p>
                                </div>
                         
                        
                    </div>
                       
                    
                       
                    <div class="d-flex justify-content-center align-items-center  ">
                      <i class="fa-regular fa-eye"></i>
                      <p class="card-text h6 p-3 fw-bold"><small class="text-black"><span>${news.total_view}</span></small></p>
                       
                    </div>
                   
                    <div class="d-flex   justify-content-center align-items-center">
                    <div >
                      <i class="fa-regular fa-star-half-stroke"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      </div>
                      <div class='pt-3 fw-bold ps-2'>
                      <p>${news.rating.number}</p>
                      </div>
                   
                      
                      
                      </div>
                     
                     
                    <a href="#"><i class=" ms-auto text-color pe-2 fa fa-arrow-right"></i></a> 
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            `;
            newsDetailsContainer.appendChild(newsDetailsDiv);

    });
}
 
 
loadNewsCategories();