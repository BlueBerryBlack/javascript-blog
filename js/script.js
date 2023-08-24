'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this
  console.log('Link was clicked!', event);
  

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

      for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }

    /* add class 'active' to the clicked link */
      clickedElement.classList.add('activ');
      console.log('clickedElement',clickedElement);

    /* [DONE] remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts .active');

        for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute('href');
      console.log('articleSelector', articleSelector);
      

    /* find the correct article using the selector (value of 'href' attribute) */
      const targetArticle = document.querySelector(articleSelector);
      console.log('targetArticle', targetArticle);


    /* add class 'active' to the correct article */
      targetArticle.classList.add('active');
      console.log('targetArticle',targetArticle);
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



const optArticleSelector = '.posts',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';

function generateTitleLinks() {

  /*remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);
  titleList.innerHTML ='';

  

} 

generateTitleLinks();