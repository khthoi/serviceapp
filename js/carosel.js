window.addEventListener('load', () => {
    const testimonials = document.querySelectorAll('.single-testimonial');
    let maxHeight = 0;
  
    testimonials.forEach(testimonial => {
      maxHeight = Math.max(maxHeight, testimonial.offsetHeight);
    });
  
    testimonials.forEach(testimonial => {
      testimonial.style.height = maxHeight + 'px';
    });
  });
  
  window.addEventListener('resize', () => {
    const testimonials = document.querySelectorAll('.single-testimonial');
    testimonials.forEach(testimonial => testimonial.style.height = 'auto');
  
    let maxHeight = 0;
    testimonials.forEach(testimonial => {
      maxHeight = Math.max(maxHeight, testimonial.offsetHeight);
    });
  
    testimonials.forEach(testimonial => {
      testimonial.style.height = maxHeight + 'px';
    });
  });
  