'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /*remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);
  titleList.innerHTML ='';

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('artciles',articles);
  let html='';

  for(let article of articles){

    /*get the article id*/

    const articleId = article.getAttribute('id');

    /*find the title from the title element*/

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*create HTML of the link*/
    const linkHTML = '<li><a href="#' + articleId + '"><span>'+ articleTitle +'</span></a></li>';
    console.log('linkHTML',linkHTML);

    /*insert link into title List*/

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

} 

const optArticleTagsSelector = '.post-tags .list';

generateTitleLinks();

function generateTags (){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles',articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    console.log('wrapper', wrapper);
    
    /* make html variable with empty string */
    let html='';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray',articleTagsArray);

    /* START LOOP: for each tag */
    for (let articleTags of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + articleTags + '">'+ articleTagsArray +'</a></li>';
      console.log('linkHTML',linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    wrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href',href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replase('#tag-','');
  console.log('tag',tag);

  /* find all tag links with class active */
  const allActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('allLinks,allLinks');

  /* START LOOP: for each active tag link */
  for(let activeTag of allActiveLinks){

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTag = document.querySelectorAll('a[href="'+ href + '"]');
  console.log('allTag',allTag);

  /* START LOOP: for each found tag link */
  for (let activeTag of allTag) {

    /* add class active */
    activeTag.classList.add('activ');
    
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-tags~="' + tag +'"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
