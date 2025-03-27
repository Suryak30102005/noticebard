document.addEventListener('DOMContentLoaded', function() {
    // Check if the popup has been closed previously
    if (!getCookie('popupClosed')) {
        // Make an AJAX request to check the condition
        const ajaxurl = 'wp-admin/admin-ajax8d12.json?action=get_user_info';
        fetch(ajaxurl)
            .then(response => response.json())
            .then(response => {
                
                if (response.success === true) {
                    document.querySelector(".myprofilehide").style.display = "flex";
                document.querySelector(".myprofilehidemobile").style.display = "flex";
               // console.log('expiry date'+ response.data.expiry_date);
                
                const currentTimestamp = response.data.current_date * 1000;
               // console.log('current date'+ currentTimestamp);
                // Expiry timestamp from the response
                const expiryTimestamp = response.data.expiry_date * 1000;
                
                // Calculate the difference in milliseconds between the expiry timestamp and the current timestamp
                const timeDifference = expiryTimestamp - currentTimestamp;
               // console.log('time difference'+timeDifference);
                
                // Convert milliseconds to days
                const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
               // console.log('day difference'+daysDifference);
                // Check if expiry date is within 7, 3, 2, or 1 day(s) from the current date
                if (daysDifference == 7 && daysDifference > 0) {
                    document.getElementById('popup-renewal').style.display = 'flex';
                } else if (daysDifference == 3 && daysDifference > 0) {
                    document.getElementById('popup-renewal').style.display = 'flex';
                } else if (daysDifference == 2 && daysDifference > 0) {
                   document.getElementById('popup-renewal').style.display = 'flex';
                } else if (daysDifference === 1) {
                   document.getElementById('popup-renewal').style.display = 'flex';
                }
                
            } else {
               // console.log('responce is not true');
               document.querySelector(".loginbutton").style.display = "flex";
            } 
            })
            .catch(error => console.error('Error:', error));
    }

    // Close the popup and set a cookie
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popup-renewal').style.display = 'none';
        setCookie('popupClosed', 'true', 1); // Set the cookie for 1 day
    });
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
