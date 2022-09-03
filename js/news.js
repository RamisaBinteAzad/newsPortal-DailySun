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
                                    <p class="card-text h5 fw-bold pt-3"><small class="text-black">${news.author.name!==null && news.author.name!='' ? news.author.name: 'No Data AvailAble'} </small></p>
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
}
const loadNewsDetailsAll = newsId => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayNewsDetailsAll (data.data[0]))
        .catch(error =>console.log(error))
}
// {_id: '0282e0e58a5c404fbd15261f11c2ab6b', others_info: {…}, category_id: '03', rating: {…}, total_view: 488, …}
// author: {name: 'Jimmy Dane', published_date: '2022-08-24 17:27:34', img: 'https://images.unsplash.com/photo-1633332755192-72…HxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}
// category_id: "03"
// details: "Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro, Europe, Joe Biden, Military, News, Russia, Security, UK, Ukraine, United States, Worthy News (Worthy News) – U.S. President Joe Biden has announced nearly $3 billion in new U.S. military aid for Kyiv as Ukraine marked its independence day six months after Russia invaded the country.'The United States of America is committed to supporting the people of Ukraine as they continue the fight to defend their sovereignty. As part of that commitment, I am proud to announce our biggest tranche of security assistance to date: approximately $2."
// image_url: "https://i.ibb.co/M23fhxm/unsplash-Eh-Tc-C9s-YXsw.png"
// others_info: {is_todays_pick: false, is_trending: true}
// rating: {number: 4.5, badge: 'Excellent'}
// thumbnail_url: "https://i.ibb.co/QnwC4sG/unsplash-Eh-Tc-C9s-YXsw-11.png"
// title: "Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet"
// total_view: 488
// _id: "0282e0e58a5c404fbd15261f11c2ab6b"
const displayNewsDetailsAll =newsAll => {
    console.log(newsAll);
   const modalTitle = document.getElementById('newsDetailModalLabel');
   modalTitle.innerText = newsAll.title;
   
   const newsDetailsAll = document.getElementById('news-details');
   newsDetailsAll.innerHTML = `
    <p class="text-muted font-family-style"> <span class="text-dark fw-bold">Author:</span> ${newsAll.author.name!==null && newsAll.author.name!='' ? newsAll.author.name : 'No Data AvailAble'}</p>
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
 
 
loadNewsCategories();