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
generateTitleLinks();

const optArticleTagsSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';

/*function calculateTagsParams(tags){
  const params {'max:0', 'min:999999'}

  for (let tag in tags){
    params.max = Math.max(tags[tag],params.max);
    params.min = Math.min(tags[tag],params.min);

    console.log(tag + 'is used' + tags[tag] + 'times');
  }
}*/

const optCloudClassCount = 5,
  optCloudClassPrefix = tag-size-;

/*function calculateTagClass(count, params){



 }
 */

function generateTags(customSelector = ''){

  /*[NEW]create a new variable allTags wths an empty object*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles',articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tag = article.querySelector(optArticleTagsSelector);
    console.log('tag', tag);
    
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

      /*[NEW]check if this link is not already in allTags*/
      if (!allTags.hasOwnProperty(tag)){
      /*[NEW] add tag to allTags object */
        allTags[tag]=1;
      }else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tag.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /*[NEW] find links of tags in right column*/
  const tagList = document.querySelector(optTagsListSelector);

  //params

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  /*[NEW] create variable for all link HTML code*/
  let allTagsHTML = '';
  
  /*[NEW] start loop fot each tag in allTags*/
  for(let tag in allTags){

    /*[NEW] generate code of a link and add it to allTagsHTML*/
    allTagsHTML+= tagLinkHTML;
  }

  const tagLinkHTML = '<li>'+ calculateTagClass(allTags[tag], tagsParam) + '</li>';
  console.log('tagLinkHTML:', tagLinkHTML);

  /*[NEW] end loop for each tag in allTags*/
  
  /*[NEW] add HTML from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML ;
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
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

tagClickHandler();

function addClickListenersToTags(){
  /* find all links to tags */
  const linksTag = document.querySelectorAll('.post-tags .list');

  /* START LOOP: for each link */
  for(let link of linksTag){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', titleClickHandler);
 
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const optArticleAuthorSelector = '.post-author';

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
 
    /* find authors wrapper */
    const wrapper = article.querySelector(optArticleAuthorSelector);
    console.log('wrapper', wrapper);
 
    /* make html variable with empty string */
    let html='';

    /* get author from data-author attribute */
    const articleAuthors = article.getAttribute('data-author');
    console.log('articleAuthors', articleAuthors);

    /*find the author from the title element*/
    const authorTitle = article.querySelector('.post-author').innerHTML;
      
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthors + '">'+ authorTitle +'</a></li>';
    console.log('linkHTML',linkHTML);
 
    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}
generateAuthors();


function authorClickHandler(event){
/* [DONE] prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href',href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replase('#author-','');
  console.log('author',author);

  /* find all author links with class active */
  const allActiveLinksAuthor = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('allActiveLinksAuthor,allActiveLinksAuthor');

  /* START LOOP: for each active author link */
  for(let activeAuthor of allActiveLinksAuthor){

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthor = document.querySelectorAll('a[href="'+ href + '"]');
  console.log('allAuthor',allAuthor);

  /* START LOOP: for each found author link */
  for (let activeAuthor of allAuthor) {

    /* add class active */
    activeAuthor.classList.add('activ');
    
  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
authorClickHandler();

function addClickListenersToAuthors() {
  /* find all links to authors */
  const LinksAuthor = document.querySelectorAll('.post-author');

  /* START LOOP: for each link */
  for(let link of LinksAuthor){

    /* add authorClickHandler as event listener for that link */

    link.addEventListener('click', titleClickHandler);
 
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();



