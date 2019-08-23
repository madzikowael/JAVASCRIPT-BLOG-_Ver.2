'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);
  
    /* [DONE] remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

    /* [DONE] add class 'active' to the clicked link */
  
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

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
  //console.log('targetArticle', targetArticle);
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


  //-------- GENERATE LIST OF TITLES ----------------//

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
  console.log('titleList', titleList);

  document.querySelectorAll('li').remove;

  /* for each article */
  
  const articles = document.querySelectorAll(optArticleSelector);

  for(article of articles);

    /* get the article id */
  const articleId = clickedElement.getAttribute('id');
    /* find the title element */

  const articleTitle = article.querySelector(optTitleListSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    /* create HTML of the link */
  titleList.innerHTML = titleList.innerHTML + linkHTML;
  
    /* insert link into titleList */



generateTitleLinks();
}