const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if(entry.isIntersecting){
      entry.target.classList.add('intersect-flyin--active');
    }else{
      entry.target.classList.remove('intersect-flyin--active');
    }
  });
};

const intersectFlyins = document.querySelectorAll(".intersect-flyin");

const observer = new IntersectionObserver(handleIntersect);
intersectFlyins.forEach((element) => observer.observe(element));
