'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
 const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
 clickedElement.classList.add('active');

 /* [DONE]remove class 'active' from all articles */
 const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

  /* [done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

  }

/* GENERATE TITLES LINKS */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post p.post-author',
  optTagsListSelector =  '.tags.list',
  optAuthorListSelector = '.list.authors',
  optCloudClassCount = 5,
  optCloudAuthorClassCount = 3,
  optCloudAuthorClassPrefix = 'author-size-',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
  console.log(customSelector);

  /* remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);

clearTitleList();

 /* for each article */
 const articles = document.querySelectorAll(optArticleSelector + customSelector);
 let html='';
   for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link*/
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into  html variable titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

      html = html + linkHTML;
    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }


function clearTitleList(){
 document.querySelector(optTitleListSelector).innerHTML = '';
}

/* GENERATE TAGS FUNCTION */

function calculateTagsParams(tags){
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
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      /* generate HTML of the link */
        const linkHTML = `<li><a href=#${tag}>${tag}</a></li>`;
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
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* {NEW} START LOOP: for each tag in allTags */
    for(let tag in allTags){
      /* [NEW] generate code of link and add it to allTagsHTML */
      allTagsHTML += `<li><a class="${optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)}" href="#${tag}"><span>${tag}</span></a></li>`;
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

/* _______GENERATE AUTHORS function______________________ */

function calculateAuthorsParams(authors){
  const params =
  {
    max: 0,
    min: 999999
  }
    for(let author in authors){
      if(authors[author] > params.max){
        params.max = authors[author];
      } else {
        if (authors[author] < params.min){
          params.min = authors[author];
        }
      }
    }
    return params;
}

function calculateAuthorClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const authorClassNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);

  return(optCloudClassPrefix, authorClassNumber);
}

function generateAuthors(){
  /*/[New] create a new vairable allAuthors with an empty objet*/
  let allAuthors = {};
  /* find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP for each authors */
    for(let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* generate HTML of the link of author */
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>'
      /* add generated code to html variable*/
      html = html + linkHTML;
      /*[NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors.hasOwnProperty(articleAuthor)){
        /* [NEW] add author to allAuthors object*/
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* add generated code to html variable */
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;
        /* END LOOP: for every author: */
    }

  /* [new] find list of authors in right column*/
  const authorList = document.querySelector('.authors');
  const authorsParams = calculateAuthorsParams(allAuthors);
  /* [new] create variable for all authors links HTML code */
  let allAuthorsHTML = '';
  /* [new] START LOOP: for each author in allAuthors */
    for(let author in allAuthors){
      /*[new] generate code of link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a class="' + optCloudClassPrefix + calculateAuthorClass(allAuthors[author], authorsParams) + '"' + 'href="#author-' + author + '"><span>' + author + '</span></a></li>';
      allAuthorsHTML = allAuthorsHTML + authorLinkHTML;
    }
  /* [new] add html from allAuthorsHTML to authorList*/
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();


function authorClickHandler(event) {
  /*prevent action for this event*/
  event.preventDefault();
  /*make new const named clickedElement and give it value this*/
  const clickedElement = this;
  /* make a new const 'href' and read the attribute href of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new const 'author' and extract author from the 'href' constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('[href^="#author-"]');
    /*START LOOP: for each active author Link*/
    for(let activeAuthorLink of activeAuthorLinks){
      /*remove class active*/
      activeAuthorLink.classList.remove('active');
    /*END LOOP: for each active author link*/
    }
  /* find all author links with 'href' attribute equal to the 'href' constant*/
  const authorLists = document.querySelectorAll(href);
    /* Start LOOP: for each found author link */
    for(let authorLink of authorLists){
      /*add active class*/
      authorLink.classList.add('active');
      /* END LOOP: for each found author link*/
    }
  /*execute function 'generateTitleLinks' with author selector as argument*/
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors () {
/* find all links to authors */
const authorsLinks = document.querySelectorAll('a[href^="#author-"');
  /* START LOOP: for each link */
  for(let authorLink of authorsLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
/* END LOOP: for each link */
}

addClickListenersToAuthors();

/*_______________________ SIDEBAR__________*/

function addClickListenersSidebarToAuthors () {
  const listSidebarAuthors = document.querySelectorAll('ul .list.authors a');
    for(let listSidebarAuthor of listSidebarAuthors){
      listSidebarAuthor.addEventListener('click', authorClickHandler)
  }
}

addClickListenersSidebarToAuthors();

function addClickListenersSidebarToTags () {
  const links = document.querySelectorAll('ul .list.tags a');
    for(let link of links){
      link.addEventListener('click', tagClickHandler);
    }
}

addClickListenersSidebarToTags();


