'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!', event);

    /* [DONE] remove class 'active' from all article links  */

 const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

    /* [DONE] add class 'active' to the clicked link */

 clickedElement.classList.add('active');
 //console.log('clickedElement:', clickedElement);

    /* [DONE]remove class 'active' from all articles */

 const activeArticles = document.querySelectorAll('.post.active');
    //console.log('This is activeArticles', activeArticles);

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

    /* [done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);


    /* [done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);

    /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  //console.log(targetArticle);
  }

/* GENERATE TITLES LINKS */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

const titleList = document.querySelector(optTitleListSelector);
//console.log(titleList)

clearTitleList();

  /* for each article */
const articles = document.querySelectorAll(optArticleSelector);
  let html='';
    for(let article of articles){

        /* get the article id */
        const articleId = article.getAttribute('id');
        //console.log(articleId);

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link*/

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        //console.log(linkHTML);

        /* insert link into  html variable titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);

        html = html + linkHTML;
      }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

 for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function clearTitleList(){
  document.querySelector(optTitleListSelector).innerHTML = '';
}


/* GENERATE TAGS FUNCTION */

function generateTags(){
  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
