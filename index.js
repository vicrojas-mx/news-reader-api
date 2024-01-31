const baseUrl = "https://newsapi.org/v2";
const newsA = "/top-headlines?country=us&apiKey=";
const apiKey = "9fa17e85b4f64ec581f60c422d362e89";

const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const backupImage = "https://images.unsplash.com/photo-1683009427500-71296178737f?q=80&w=1077";

async function dataRequest(url){
    //console.log(url);
    try {
        const response = await fetch(baseUrl + url + apiKey);
        const json = response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }

}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(article => { 
            //console.log(article);
            cards.innerHTML += 
            `<div class="card">
                <div class="image">
                    <img src="${article.urlToImage ? article.urlToImage : backupImage}" alt="${article.title}">
                </div>
                <div class="information">
                    <div>
                        <p class="title">${article.title}</p>
                        <p class="description">${article.description}</p>
                        <p class="time">
                            <span>${article.publishedAt.replace("Z", "").split("T")[0]}</span>
                            <span>${article.publishedAt.replace("Z", "").split("T")[1]}</span>
                        </p>                                       
                    </div>
                    <div class="other">
                        <span class="source">${article.source.name}</span>
                        <a class="url" href="${article.url}" target="_blank">Read article <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>`;
        });
    })
}

category.addEventListener("click", event => {
    if (event.target.tagName === "SPAN") {
        clearCards();
        clearTabs();
        urlRequest(event.target.dataset.id);
        event.target.classList.add("active");    
    }
});

function clearCards() {
    cards.innerHTML = "";
}

function clearTabs(){
    const tabs = document.querySelectorAll(".category span");
    tabs.forEach(tab => tab.classList.remove("active"));
}

urlRequest(newsA);

