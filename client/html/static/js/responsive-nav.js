const topHeads = document.getElementsByClassName('top-head');
const topNavDropItems = document.getElementsByClassName('top-nav__item--has-drop');
const dropNavs = document.getElementsByClassName('drop-nav');

function closeDropNavs(){
  Array.from(dropNavs).forEach((dropNav) => {
    dropNav.classList.remove('drop-nav--show');
  });
}

Array.from(topHeads).forEach((topHead) => {
  let ham = topHead.getElementsByClassName('top-head__drop-ham')[0];
  let main = topHead.getElementsByClassName('top-head__main')[0];

  ham.addEventListener('click', () => {
    closeDropNavs();

    main.classList.toggle('top-head__main--show');
  });
});

Array.from(topNavDropItems).forEach((navItem) => {
  let dropButton = navItem.getElementsByClassName('top-nav__drop-button')[0];
  let dropNav = navItem.getElementsByClassName('drop-nav')[0];

  dropButton.addEventListener('click', () => {
    if(!dropNav.classList.contains('drop-nav--show')) closeDropNavs();

    dropNav.classList.toggle('drop-nav--show');
  });
});
