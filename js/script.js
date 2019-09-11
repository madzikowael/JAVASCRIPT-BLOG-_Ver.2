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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post p.post-author',
  optTagsListSelector =  '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ''){
  console.log(customSelector);
  /* remove contents of titleList */

const titleList = document.querySelector(optTitleListSelector);
//console.log(titleList)

clearTitleList();

 /* for each article */
 const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function calculateTagsParams(tags){
  //console.log(calculateTagsParams, 'tagsParams');
 const params =
 {
   max: 0,
   min: 999999
 }
 for(let tag in tags){
   if(tags[tag] > params.max){
     params.max = tags[tag];
   } else {
     if (tags[tag] < params.min){
       params.min = tags[tag];
     }
   }
   //console.log(tag + 'is used ' + tags[tag] + ' times');
 }
 return params;
}

function calculateTagClass(count, params){
  /* Looking for a count, which is a subtract beetween a value out tag(6) vs. params.min*/
  const normalizedCount = count - params.min;
  /* Do const as subtract beetween params.max & params.min*/
  const normalizedMax = params.max - params.min;
  /* do percentage beetwen normalizedCount & normalizedMax*/
  const percentage = normalizedCount / normalizedMax;
  /* do const classNumber as algorithm integer lottery draw*/
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return(optCloudClassPrefix, classNumber);
}

function generateTags(){
  /*[NEW] create a new vairable allTags with an empty object*/
  let allTags = {};

  /* find all articles */
const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
   // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
   // console.log(articleTagsArray);
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        //console.log(tag);
      /* generate HTML of the link */
        const linkHTML = `<li><a href=#${tag}>${tag}</a></li>`;
       // console.log(linkHTML);
      /* add generated code to html variable */
      tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /*[NEW] add tag to allTags obbject*/
        allTags[tag] = 1;
      } else {
          allTags[tag]++;
        }


    /* END LOOP: for each tag */
      html = html + linkHTML;
      }
    /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }

  /*[NEW] find list of tags in right column*/
  const tagList = document.querySelector('.tags');

  /*[NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

 /* [NEW] create variable for all links HTML code */
 let allTagsHTML = '';

 /* {NEW} START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /* [NEW] generate code of link and add it to allTagsHTML */

    allTagsHTML += `<li><a class="${'#' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)}" href="#${tag}"><span>${tag} (${allTags[tag]})</span></a></li>`;
    //const tagLinkHTML = '<li><a class"' + calculateTagClass(allTags[tag], tagsParams) + '"</a></li>';

   // allTagsHTML += tagLinkHTML;

    //console.log('tagLinkHTML:', tagLinkHTML);
  }
  /* [NEW] END LOOP : for each tag in allTAgs: */
  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();
addClickListenersToTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
    /* remove class active */
      activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
    /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a');
    /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */

}
/* _____________________________________
GENERATE AUTHORS function
________________________________________
 */

function generateAuthors(){
  /* find all authors */
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  //console.log('Those are authors:', authors);
  /* START LOOP for each authors */
  for(let author of authors){
    const authorWrapper = author.querySelector(optArticleAuthorSelector);
   // console.log("Here is author wrapper", authorWrapper);
      /* make html variable with empty string */
    let html = '';
      /* get authors from data-authors attribute */
    const articleAuthor = author.getAttribute('data-author');
     // console.log('get authors from attribute', articleAuthor);
      /* generate HTML of the link of author */
    const authorHTML = '<a href="#' + articleAuthor + '">' + articleAuthor + '</a>';
       //  console.log('link: ', authorHTML);
       /* add generated code to html variable */
    html = html + authorHTML;
      /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;
      /* END LOOP: for every author: */
      }
}
generateAuthors();


function addClickListenersToAuthors () {
  /* find all links to authors */
const authorsLinks = document.querySelectorAll('href');
/* START LOOP: for each link */
  for(let authorLink of authorsLinks){
  /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
/* END LOOP: for each link */
}
addClickListenersToAuthors();

function authorClickHandler(event) {
  /*prevent action for this event*/
  event.preventDefault();
  /*make new const named clickedElement and give it value this*/
  const clickedElement = this;
  /* make a new const 'href' and read the attribute href of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new const 'author' and extract author from the 'href' constant */
  const author = href.replace('#', '');
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
    /*START LOOP: for each active author Link*/
    for(let activeAuthorLink of activeAuthorLinks){
      /*remove class active*/
      activeAuthorLink.classList.remove('active');
      /*END LOOP: for each active author link*/
    }
  /* find all author links with 'href' attribute equal to the 'href' constant*/
  const authorLinks = document.querySelectorAll('a[href=' + href + '"]');
    /* Start LOOP: for each found author link */
    for(let authorLink of authorLinks){
      /*add active class*/
      authorLink.classList.add('active');
      /* END LOOP: for each found author link*/
    }

  /*execute function 'generateTitleLinks' with author selector as argument*/

  generateTitleLinks('[data-author="' + author + '"]');


}
