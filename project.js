//Once the page loads, run the initPage function
document.addEventListener('DOMContentLoaded', initPage);


//A function that initializes the javascript for my entire site.

function initPage(){

  //Set the variable slideIndex to 1 and pass it into the showDivs function.
  var slide = 1;
  showSlide(slide);


  //A function that changes the slide based on the value passed in 
  function changeSlide(n) {
    showSlide(slide += n);
  }


  //use the number passed in to determine which slide to go to
  
  function showSlide(n) {
    var x = document.getElementsByClassName("slides");
	if (x.length > 0) {
      if (n > x.length) {slide = 1}  //If the number passed in is beyond the last slide, point to the beginning
      if (n < 1) {slide = x.length};  //If the number passed in is less than the first slide, point to the end
      for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";  //Hide all slides
      }
      x[slide-1].style.display = "block";  //unhide the one slide referenced
	}
  }
  
  
  //Set the slide to 0 and run the carousel function.
  slide = 0;
  carousel();


  //Automatically does what the showSlide function does manually
  function carousel() {
    var x = document.getElementsByClassName("slides");
	if (x.length > 0){  //Only run if the we are on a page with the slideshow
      for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slide++;
      if (slide > x.length) {slide = 1}
      x[slide-1].style.display = "block";
      setTimeout(carousel, 16000); // Change image every 16 seconds
	}
  }
  
  
  /*If we are on the Welcome page and the 'Prev' button is clicked,
    move the slideshow back one slide*/
	
  var left = document.getElementById('left')
  if (left){
    left.addEventListener('click', function(event){
	  changeSlide(-1)
    });
  };
  
  
  /*If we are on the Welcome page and the 'Next' button is clicked,
    move the slideshow forward one slide*/
	
  var right = document.getElementById('right')
  if (left){
    right.addEventListener('click', function(event){
	  changeSlide(+1)
    });
  };
  
  
  /*If we are on the skills page and someone clicks the link to my
    github, take them to that page in a new tab*/
    var out_lin1 = document.getElementById('out-link1')
  if (out_lin1){
    out_lin1.addEventListener('click',function(event){
	  window.open('https://github.com/RedWolf625')
    })
  }
  
  
  /*If we are on the skills page and someone clicks the link to my
    LinkedIn, take them to that page in a new tab*/
	
  var out_lin2 = document.getElementById('out-link2')
  if (out_lin2){
    out_lin2.addEventListener('click',function(event){
	  window.open('https://www.linkedin.com/in/nathan-shelby-ab3a728a/')
    })
  }


  /*Submit a post request to httpbin.org, place the status code in a div,
    and log the response*/
	
  var cont_sub = document.getElementById('contact_submit')
  if (cont_sub) {
    cont_sub.addEventListener('click',function(event){
	  var req = new XMLHttpRequest();
	  var payload = {name:null,email:null,company:null,salary:null,role:null};
	  payload.name = document.getElementById('name').value;
	  payload.email = document.getElementById('email').value;
	  payload.company = document.getElementById('company').value
	  payload.salary = document.getElementById('salary').value
	  payload.role = document.getElementById('role').value
	  req.open('POST', 'http://httpbin.org/post', true);
	  req.setRequestHeader('Content-Type', 'application/json');
	  req.addEventListener('load', function(){
		  if(req.status >=200 && req.status < 400){
			  var stat = JSON.parse(req.status);
			  document.getElementById('response-status').textContent = 'Status Code: ' + stat + ' Object in console.'
			  console.log(JSON.parse(req.responseText))
		  } else {
			  console.log('error in network request: ' + req.statusText);
	      }});
		  req.send(JSON.stringify(payload));
		  event.preventDefault();
	});
  };
};