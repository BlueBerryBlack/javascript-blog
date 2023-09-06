'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-data-tags').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-data-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

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

function calculateTagsParams (tags){

  const params = { min: 999999, max: 0};
  
  for (let tag in tags){
    if ( tags[tag] > params.max ) {
      params.max = tags[tag];
    } if ( tags[tag] < params.min ){
      params.min = tags[tag];
    }
    console.log(tag + 'is used' + tags[tag] + 'times');
  }
  return params;
}

const optArticleTagsSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
const optCloudClassPrefix = 'tag-size-';

function calculateTagClass (count, params){

  const range = params.max - params.min;
  const position = (count - params.min) / range;

  if (position <= 0.2 ){
    return optCloudClassPrefix + 1;
  } if (position <= 0.4 ){
    return optCloudClassPrefix + 2;
  } if (position <= 0.6 ){
    return optCloudClassPrefix + 3;
  } if (position <= 0.8 ){
    return optCloudClassPrefix + 4;
  } else {
    return optCloudClassPrefix + 5;
  }

}

function generateTags(){

  /*[NEW]create a new variable allTags with an empty object*/
  let allTags = {};

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
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li>';
      //console.log('linkHTML', linkHTML);

      //Handlebars
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /*[NEW]check if this link is not already in allTags*/
      if (!allTags.hasOwnProperty(tag)){
        /*[NEW] add tag code to allTags object */
        allTags[tag]=1;
      }else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /*NEW find list of tags in right column*/
  const tagList = document.querySelector(optTagsListSelector);

  //NEW calculate tags params
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams',tagsParams);

  //NEW create variable for all links HTML code
  //let allTagsHTML = '';

  //Handlebars
  const allTagsData = {tags: []};

  //NEW start loop for each tag in allTags
  for (let tag in allTags){
    //NEW generate code of a link and add it to allTagsHTML
    //allTagsHTML += tagLinkHTML;

    //Handlebars
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
});

    //allTagsHTML += '<li><a href="#tag-' + tag + '"><span>' + tag +' (' + allTags[tag] + ')' + '</span></a></li>';
    // const tagLinkHTML = '<li><a href="#tag-' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + (allTags[tag], tagsParams) + '</span></a></li>';
    // const tagLinkHTML = calculateTagClass + (allTags[tag], tagsParams);
    //console.log('tagLinkHTML', tagLinkHTML);

    //allTagsHTML += tag + ' (' + allTags[tag] + ')';
    // '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li>';
  //NEW end loop for each tag in allTags
  }
  // NEW add html form allTagsHTML to tagList
  //tagList.innerHTML = allTagsHTML; 
  //Handlebars
  console.log('allTagsData', allTagsData);
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const linkTag = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let link of linkTag){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
 
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const  optArticleAuthorSelector = '.post-author';
const optAuthorsListSelector = '.authors.list';

function generateAuthors (){

  let allAuthors ={};

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
    //const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>'+ articleAuthor +'</span></a></li>';
    //console.log('linkHTML',linkHTML);

    //Handlebars
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorsLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;
    //NEW check if this link is not already in allAuthors
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      //NEW add generatde code to allAuthors array
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
      
    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;

  /* END LOOP: for every article: */
  }
  //NEW find list of authors in right column
  const authorsList = document.querySelector(optAuthorsListSelector);

  //NEW add html from allAuthors to authorsList
  //authorsList.innerHTML = allAuthors.join(' ');

  //NEW created new variable for all links html code
  //let allAuthorsHTML = '';
  //Handlebars
  let allAutgorsData = {authors:[]};
  //NEW start loop for each authors in allAuthors
  for (let author in allAuthors){
  //NEW generated code of a link and add it to allAuthorsHtml
  //allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';

    //Handlebars
    allAutgorsData.authors.push({
      author: author,
      count: allAuthors[author]

    });

  //NEW END LOOP for each authors in allAuthors
  }
  //NEW add html from allTagsHTML to tagList
  //authorsList.innerHTML = allAuthorsHTML;
  //Handlebars
  authorsList.innerHTML = templates.authorCloudLink(allAutgorsData);
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
  const linkAuthor = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for(let link of linkAuthor){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
 
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthor();

