const animatedElements = document.querySelectorAll(
    '.animate-left, .animate-right, .animate-top'
);
   const observer = new IntersectionObserver(
   (entries) => {
   entries.forEach((entry) => {
   if (entry.isIntersecting) {
   entry.target.classList.add('show');
                observer.unobserve(entry.target);
   }
     });
    },
    {
        threshold: 0.2
    }
);
animatedElements.forEach((element) => {
observer.observe(element);
});

