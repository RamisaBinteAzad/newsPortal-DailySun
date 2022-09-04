const loadNewsCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error => console.log(error))
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
            <a class=" text-decoration-none  pe-3 me-3" aria-current="page"   href="#" onclick="loadNewsDetail('${category.category_id}','${category.category_name}')">${category.category_name}</a>
        </li>
        `


        newsCategories.appendChild(categoryli);

    })
}
const loadNewsDetail = (categoryId, link) => {
    processSearch();

    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data, link));
}
const displayNewsDetail = (allNews, categoryName) => {
    console.log(allNews);
    allNews.sort((a, b) => b.total_view - a.total_view);
    console.log(allNews);
    const categoryNews = document.getElementById('categoryNews');
    // ?  phone.mainFeatures.displaySize :'No Storage Information Found'

    categoryNews.innerHTML = `
    <div class="w-100 mt-3 rounded-2 bg-white d-flex justify-content-start align-items-center">
        <h6 class="ps-4 text-dark pt-3 fw-bold ">${allNews.length === 0 ? 'NO' : allNews.length} items found for Category ${categoryName === undefined ? 'All News' : categoryName}</h6>
      </div>
    `

    const newsDetailsContainer = document.getElementById('news-details-container');

    newsDetailsContainer.innerHTML = ``;

    allNews.forEach(news => {
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
                 
                <p class=" text-muted card-text mt-4   ">${news.details.length > 240 ? news.details.slice(0, 240) + '...' : news.details}</p>
                <br>
 
                
                <div class="d-flex  justify-content-between mx-auto align-items-center  ">
                    <div class="d-flex   author-div-width justify-content-start align-items-center px-auto ">
                         
                            <img src="${news.author.img}" class="img-fluid img-width me-2 rounded-circle" alt="">
                                <div class="d-flex flex-column   align-self-center  ">
                                    <p class="card-text h5 fw-bold pt-3"><small class="text-black">${news.author.name !== null && news.author.name != '' ? news.author.name : 'No Data AvailAble'} </small></p>
                                    <p  ><small>${news.author.published_date}</small></p>
                                </div>
                         
                        
                    </div>
                       
                    
                       
                    <div class="d-flex justify-content-center align-items-center  ">
                      <i class="fa-regular fa-eye"></i>
                      <p class="card-text h6 p-3 fw-bold"><small class="text-black"><span>${news.total_view!== null?news.total_view:news.total_view=0}</span></small></p>
                       
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
                     
                     
                    <a href="#" onclick="loadNewsDetailsAll('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class=" ms-auto text-color pe-2 fa fa-arrow-right"></i></a> 
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            `;
        newsDetailsContainer.appendChild(newsDetailsDiv);



    });
    toggleSpinner(false);
}
const loadNewsDetailsAll = newsId => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayNewsDetailsAll(data.data[0]))
        .catch(error => console.log(error))
}

const displayNewsDetailsAll = newsAll => {

    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = newsAll.title;

    const newsDetailsAll = document.getElementById('news-details');
    newsDetailsAll.innerHTML = `
    <p class="text-muted font-family-style"> <span class="text-dark fw-bold">Author:</span> ${newsAll.author.name !== null && newsAll.author.name != '' ? newsAll.author.name : 'No Data AvailAble'}</p>
    <p class="font-family-style text-muted"> <span class="text-dark fw-bold">Published Date:</span> ${newsAll.author.published_date ? newsAll.author.published_date : 'No Data AvailAble'}</p>
    <img src="${newsAll.image_url}"
                    class=" img-fluid w-100 p-2 mx-auto rounded-start  " alt="...">
       
        <p class="font-family-style text-muted ">${newsAll.details.length > 70 ? newsAll.details.slice(0, 70) + '...' : newsAll.details}</p>
        <div class="d-flex   justify-content-between align-items-center">
        <p class="font-family-style text-muted"> <span class="text-dark fw-bold">Total View:</span> ${newsAll.total_view ? newsAll.total_view : 'No Data AvailAble'}</p>
        <p class="font-family-style text-muted "> <span class="text-dark fw-bold">Rating:</span> ${newsAll.rating ? newsAll.rating.number : 'No Data AvailAble'}</p>
    </div>
 
   
   `


}
const processSearch = () => {
    toggleSpinner(true);

}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadNewsCategories();