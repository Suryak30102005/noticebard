document.addEventListener('DOMContentLoaded', function () {
    // Login popup show
    var isUserLoginedin=false;
    var isRequestComplete=false;// for ajax request 
    var isProfileCom=false;
    var showLoginPopup = false;
    var showProfilePopup = false;
    var showProfilePopupVerify = false;
    var currentUrl11=window.location.href;
    var postCountData=0;
    
    
    function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }

    return null;
}

    // Function to handle scroll
    function handleScroll() {
        var scrollPercentage =
            (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
            100;

        // Show the popup when the user has scrolled 40% of the page
        if (scrollPercentage >= 25) {
           
            if(isRequestComplete){
            if (isUserLoginedin) {
               if(isProfileCom){
                if(postCountData>2 && payingUser == 1 && profileComplete !== 1){
                    const loginpopup=document.querySelector('.scrollpopuplogin');
                    if(loginpopup){
                    loginpopup.classList.remove('hideElement');
                    document.body.classList.add('overflowhidebody');
                    }
                }
               }   
                
            }else{
                console.log("entered in withlogin")
                const loginpopup=document.querySelector('.scrollpopuplogin');
                if(loginpopup){
                     loginpopup.classList.remove('hideElement');
                document.body.classList.add('overflowhidebody');
                }
            }
            }
        }
        
        var nextUrl=window.location.href;
        
        if(!areUrlsEqual(currentUrl11, nextUrl)){
            currentUrl11=nextUrl;
           sendPostCount(nextUrl);
            
        }
        
       
    }

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener and class when the component unmounts
    window.addEventListener('beforeunload', function () {
        window.removeEventListener('scroll', handleScroll);

        document.body.classList.remove('overflowhidebody');
    });
    
    function areUrlsEqual(url1, url2) {
    const parsedUrl1 = new URL(url1.html);
    const parsedUrl2 = new URL(url2.html);

    // Compare individual components of the URLs
    return (
        parsedUrl1.protocol === parsedUrl2.protocol &&
        parsedUrl1.host === parsedUrl2.host &&
        parsedUrl1.pathname === parsedUrl2.pathname &&
        parsedUrl1.search === parsedUrl2.search
    );
}
var randomFloat = Math.random();
console.log('Random Float:', randomFloat);

// Generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
    function sendPostCount(posturl){
      var countP=0;
        const xhr = new XMLHttpRequest();
            let randString=getRandomInt(1, 1000000);
            // AJAX URL for WordPress
            const ajaxurl = '../../wp-admin/admin-ajaxd41d.html?'+randString;
               
           var formData = new FormData();
            formData.append('action', 'user_postcount_ajax_function'); // AJAX action name
            formData.append('url', posturl); // AJAX action name

            // Create and configure the AJAX request
            xhr.open('../../fellowships/post-doc-fellowship-at-iit-dhanbad/index.html', ajaxurl, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            // Define the callback function when the request is complete
            xhr.onload = function() {
                
                if (xhr.status === 200) {
                   
                var response = JSON.parse(xhr.responseText);
                    if(response){
                        isRequestComplete=true;
                        if(response.isLogin==1){
                            postCountData=response.counts;
                            payingUser=response.payingUser;
                            profileComplete=response.profilecomplete;
                            isUserLoginedin=true;
                            if(response.isProfileCom==0){
                                isProfileCom=true;
                            }
                        }
                    }
                }
            };

            // Send the AJAX request
            xhr.send(formData);
          
    }
   postCountData=sendPostCount(currentUrl11);
   
 
});

