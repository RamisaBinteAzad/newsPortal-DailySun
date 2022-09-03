const loadNewsCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error =>console.log(error))
}
const displayNewsCategories = categories => {
    const newsCategories = document.getElementById('news-categories');
    categories.forEach(category => {
    //    console.log(category.category_name)
        const categoryli = document.createElement('li');
        categoryli.innerHTML = `
        <li class="nav-item me-1">
        <a class="nav-link active text-black-50 me-3 ms-2" aria-current="page" href="#">${category.category_name}</a>
      </li>
        `
        newsCategories.appendChild(categoryli);
        
    })
}
loadNewsCategories();