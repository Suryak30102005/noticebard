document.addEventListener('DOMContentLoaded', function () {
    var postlink=window.location.href;
    
    window.addEventListener('scroll', handleScroll);
function postnumner(postlink){
    let randomNumber = Math.random();
    var xhr = new XMLHttpRequest();
     const ajaxurl = 'wp-admin/admin-ajax.php';
    xhr.open('GET.html', ajaxurl + '?action=get_user_info&'+randomNumber, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            // Handle response data
            // console.log(response);
            if(response.success === true){
            if(response.data.user_id) {
                // document.querySelector(".myprofilehide").style.display = "flex";
                // document.querySelector(".myprofilehidemobile").style.display = "flex";
                
                //console.log("user id found if working");
            if(response.data.expiry_date <= response.data.current_date && response.data.post_count > 2 ){
                document.querySelector("#sub_popup").style.display="flex";
                document.body.classList.add('overflowhidebody');
                //console.log("Subscribe Now");
            }
            
             if(response.data.expiry_date <= response.data.current_date ){
              // console.log("user is not subscribed");
                               // Create a new script element
var script = document.createElement('script');
script.async = true;
script.src = "../pagead2.googlesyndication.com/pagead/js/f4da1.txt?client=ca-pub-4563683461580735";
script.crossOrigin = "anonymous";
document.head.appendChild(script);
            }
            
            
        } else {
            console.log("");
        }
            } else{
                //console.log("user is not loggedin");
                // document.querySelector(".loginbutton").style.display = "flex";
                // Create a new script element
var script = document.createElement('script');
script.async = true;
script.src = "../pagead2.googlesyndication.com/pagead/js/f4da1.txt?client=ca-pub-4563683461580735";
script.crossOrigin = "anonymous";
document.head.appendChild(script);
            }
        
        
            
        }
    };
    xhr.send();
}


function handleScroll(){
     var nextUrl=window.location.href;
        
        if(!areUrlsEqual(postlink, nextUrl)){
            postlink=nextUrl;
          postnumner(postlink);
            
        }
        
}

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

// postnumner(postlink);

// Function to detect 50% scroll
function onScroll() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight / 2) {
        window.removeEventListener('scroll', onScroll); // Remove event to prevent multiple executions
        postnumner();
    }
}

// Attach scroll event listener
window.addEventListener('scroll', onScroll);

});
