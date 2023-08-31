'use strict';

const templates = {
 
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-data-author').innerHTML)
}

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

function generateTitleLinks(customSelector = ''){

  /*remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);
  titleList.innerHTML ='';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('artciles',articles);
  let html='';

  for(let article of articles){

    /*get the article id*/

    const articleId = article.getAttribute('id');

    /*find the title from the title element*/

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*create HTML of the link*/
    //New code Handlebars
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

function generateTags(){

  /*[NEW]create a new variable allTags with an empty object*/
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */

    const wrapper = article.querySelector(optArticleTagsSelector);
    console.log ('wrapper',wrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log('tag', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li>';
      console.log('linkHTML', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /*[NEW]check if this link is not already in allTags*/
      if (allTags.indexOf(linkHTML) == -1){
        /*NEW add generated code to allTags array */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /*NEW find list of tags in right column*/
  const tagList = document.querySelector(optTagsListSelector);
  //NEW add html from all tags to tag list
  tagList.innerHTML = allTags.join(' ');
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log('tag',tag);

  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of tagActiveLinks){
    console.log('activeTag', activeTag);

    /* remove class active */
    activeTag.classList.remove('active');
    
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagsLinksHref){
    /* add class active */
    tagLink.classList.add('active');
    console.log('tagLink',tagLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linkTag = document.querySelectorAll('.post-tags .list');

  /* START LOOP: for each link */
  for(let link of linkTag){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', titleClickHandler);
 
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const  optArticleAuthorSelector = '.post-author';

function generateAuthors (){
  /* find all authors */
  const articles = document.querySelectorAll('.post');

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find author wrapper */
    const author = article.querySelector(optArticleAuthorSelector);
    console.log ('author',author);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>'+ articleAuthor +'</span></a></li>';
    console.log('linkHTML',linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;

  /* END LOOP: for every article: */
  }
}
generateAuthors ();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author =  href.replace('#author-','');
  console.log('author',author);
  /* find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('authorActiveLinks',authorActiveLinks);
  /* START LOOP: for each active author link */
  for (let authorlink of authorActiveLinks){
    /* remove class active */
    authorlink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let authorActiv of tagsLinksHref){
    /* add class active */
    authorActiv.classList.add('active');
    console.log('authorActiveLinks',authorActiveLinks);

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
  /* find all links to tags */
  const linkAuthor = document.querySelectorAll(optArticleAuthorSelector);

  /* START LOOP: for each link */
  for(let link of linkAuthor){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', titleClickHandler);
 
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();

