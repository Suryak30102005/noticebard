
    document.addEventListener("DOMContentLoaded", function() {
const ErrArr = [
    "Invalid email format. Please enter a valid email number.",
    "Email is required. Please enter your email number.",
    "Password must be at least 8 characters long.",
    "Password is required. Please enter your password.",
    "Unexpected error occurred. Please try again later.",
    "Unable to connect to the server. Please check your internet connection.",
    "OTP is required. Please enter the OTP sent to your email/phone.",
    "Full Name is required. Please enter your Full Name",
    "Email is required. Please enter your email",
    "Invalid phone format. Please enter a valid phone number."
]


function checkPasswordReset() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('password-reset') === 'true') {
        const element = document.getElementById('pass_reset');
        const element2 = document.getElementById('loginpopuplogin');
        if (element) {
          element.style.display = 'flex';
          element2.style.display = 'flex';
        }
      }
    }

    // Call the function when the script loads
    checkPasswordReset();
    
//setCookies 
function setCookieforredriection(cookieName, cookieValue, minutesToExpire) {
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (minutesToExpire * 60 * 1000));

    var cookieString = cookieName + "=" + encodeURIComponent(cookieValue) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = cookieString;

    // Check if the cookie was created successfully
    var cookies = document.cookie.split(';');
    var cookieExists = false;

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + "=") === 0) {
            cookieExists = true;
            break;
        }
    }

    if (cookieExists) {
        console.log("Cookie '" + cookieName + "' was created successfully.");
    } else {
        console.log("Cookie '" + cookieName + "' creation failed.");
    }
}

// add singup link on add to cart links for logout users



const APIURL = 'wp-json/custom-development-apis/v1/index.html';
var singinTitle = document.querySelector('.singinTitle');
const signInlink = document.querySelector('#login');
const popuploginlink = document.querySelector('.scrollpopuplogin .popuploginlink');
const popuploginlink1 = document.querySelector('.popuploginlink1');





// colselogin the login popuplogin when the colselogin button is clicked
var showpassword = document.querySelector('.showpassword');
var loginsbBtn = document.querySelector('.loginsbBtn');



function openlogin() {
    document.getElementById("loginpopuplogin").style.display = "flex";
    //document.getElementById("forgotpopup").style.display = "none";
    document.getElementById("formState").value = "0";
    removeErr();
}

if(popuploginlink){
     popuploginlink.addEventListener("click", function() {
        openlogin();
    }); 
    popuploginlink1.addEventListener("click", function() {
        openlogin();
    });
    
}

if (signInlink) {

    signInlink.addEventListener("click", function() {
      
        openlogin();
    });
    
    

    // Prevent clicks inside the popuplogin from closing it
    document.querySelector("#loginpopuplogin .popuplogin-content").addEventListener("click", function(event) {
        event.stopPropagation();
    });





//login function 
var loginBtn = document.getElementById('loginBtn');
var formLogin = document.getElementById('loginForm');
if(formLogin){
formLogin.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    let isErr = 0;
 
    var formData = new FormData(formLogin);
     let formState = document.getElementById("formState").value;
    let usernameEle =''; 
        if(formState == 0){
            usernameEle=document.querySelector('.loginForm .username');
        }else {
             usernameEle=document.querySelector('#emailHidden');
             formData.append('username',  usernameEle.value);
        }
    let username = usernameEle.value;
    
    if (!username) {
        isErr = 1;
        usernameEle.focus();
        document.querySelector('.loginForm .usernameErr').innerHTML = ErrArr[1];
        document.querySelector('.loginForm .usernameErr').classList.remove('displayNone');
    }
   

    let apis = APIURL + 'verify-user?' + getRandomIntVal(1, 1000) + '&';
    if (formState == 0) {
      
        apis = APIURL + 'verify-user?' + getRandomIntVal(1, 1000) + '&';
    } else if (formState == 1) {
      
        apis = APIURL + 'login-user?' + getRandomIntVal(1, 1000) + '&';
          // Create a new FormData object with the form data
        let passwordEle = document.querySelector("#password");
        if (passwordEle) {
            let password = passwordEle.value;
            let passwordBase64 = btoa(password);
            formData.delete('password');
            formData.append('password', passwordBase64);
            if (!password) {
                passwordEle.focus();
                document.querySelector('.passwordErr').innerHTML = ErrArr[3];
                document.querySelector('.passwordErr').classList.remove('displayNone');
                isErr = 1;
            }
        }
    }
    else if (formState == 2) {

        apis = APIURL + 'register-user?' + getRandomIntVal(1, 1000) + '&';
        // Create a new FormData object with the form data
        let passwordEle = document.querySelector("#password");
        if (passwordEle) {
            let password = passwordEle.value;
            let passwordBase64 = btoa(password);
            formData.delete('password');
            formData.append('password', passwordBase64);
            if (!password) {
                passwordEle.focus();
                document.querySelector('.passwordErr').innerHTML = ErrArr[3];
                document.querySelector('.passwordErr').classList.remove('displayNone');
                isErr = 1;
            }
        }
    }

    if (isErr == 0) {
        addLoader(loginBtn, 'Sign in', true);
        // Serialize the form data into a query string
        var serializedData = new URLSearchParams(formData).toString();


        // Send the form data to the server
        fetch(apis + serializedData)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(function(data) {
                // Handle the server response
                if (formState == 0) {
                    if (data.status == '2') {
                        let emailId=document.querySelector("#usernameLogin").value;
                         document.querySelector('.loginForm #formState').value='2';
                         document.querySelector('.loginpopuptext').classList.add('hideElement');
                         document.querySelector('.singinTitle').textContent="Create your Noticebard account";
                         document.querySelector('.loginForm #emailHidden').value=emailId;
                         
                         changeemail("Enter your details to create your account with",emailId);
                            showSignupgroup(".loginForm",true);
                            addLoader(loginBtn, 'Create Account', false);
                            showSnackbar(data.msg);
                        
                    }
                    else if (data.status == '1') {
                            let emailId=document.querySelector("#usernameLogin").value;
                            document.querySelector('.loginForm #formState').value='1';
                            document.querySelector('.loginpopuptext').classList.add('hideElement');
                            document.querySelector('.singinTitle').textContent="Enter your password";
                             document.querySelector('.loginForm #emailHidden').value=emailId;
                              changeemail("Enter your password to login into your account with",emailId);
                            showpasswordgroup(".loginForm",true);
                             addLoader(loginBtn, 'Sign In', false);
                            
                       // afterRedirect(data.redirect_url);
                    } else {
                         showSnackbar(data.msg);
                        // addLoader(loginBtn, 'Sign in', false);
                        // document.querySelector('.loginForm .otpErrInvalid').innerHTML = data.msg;
                        // document.querySelector('.loginForm .otpErrInvalid').style.color = "#ff0000";
                        // document.querySelector('.loginForm  .otpErrInvalid').classList.remove('displayNone');

                    }
                } else if (formState == 1) {
                    if (data.status == '-1') {
                         showSnackbar(data.msg);
                        afterRedirect("");
                    } else {
                        addLoader(loginBtn, 'Sign in', false);
                        showSnackbar(data.msg);
                    }
                }else if (formState == 2) {
                    
                    if (data.status == '-1') {
                         showSnackbar(data.msg);
                        addLoader(loginBtn, 'Sign in', false);
                        afterRedirect("");
                     
                    } else {
                         showSnackbar(data.msg);
                    }
                }

            
            })
            .catch(function(error) {
                // Handle any errors that occurred during the request
                console.log(error);
                 showSnackbar(error);
                //document.querySelector('.loginForm  .usernameErr').innerHTML = error;
                addLoader(loginBtn, 'Sign in', false);
            });

    }

});
}
function showSnackbar(msg) {
    console.log("showSnackbar called"); // Debugging output
    var x = document.getElementById("snackbarcus");
    console.log("x:", x); // Debugging output
    x.className = "show";
    x.innerHTML = msg;
    setTimeout(function() {
        x.classList.remove('show');
    }, 10000);
}

function addLoader(ele, txt, con) {
    if (con) {
        ele.innerHTML = `<span class="custom-login-spinner" > </span> <span id="submitText">Checking...</span>`;
    } else {
        ele.innerHTML = txt;
    }
    loginBtn.disabled = con;
}




// Get all input elements on the page
var inputElements = document.querySelectorAll("input");

// Add event listener for keypress to each input element
inputElements.forEach(function(inputElement) {
    inputElement.addEventListener("keypress", function(event) {

        var nextPElement = inputElement.nextElementSibling;
        if (nextPElement && nextPElement.tagName === "P") {
            nextPElement.classList.add('displayNone');
        }
    });
});


function checkPassword(password, ele) {
    // Password validation pattern
    var passwordPattern = /^(?=.*[\d!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,60}$/;


    // Validate the password
    if (passwordPattern.test(password)) {
        return true;
    } else {
        return false;
    }

}

function getRandomIntVal(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateIndianMobileNumber(number) {
    // Regular expression pattern for Indian mobile numbers
    var pattern = /^[6-9]\d{9}$/;

    // Remove any non-digit characters from the number
    var cleanNumber = number.replace(/\D/g, '');

    // Check if the cleaned number matches the pattern
    return pattern.test(cleanNumber);
}


// Get all elements with the "username" class
var usernameInputs = document.querySelectorAll('.username');

// Attach keyup event listener to each input element
usernameInputs.forEach(function(input) {
    input.addEventListener('keyup', function() {
        // Find the next sibling <p> element
        var nextParagraph = input.nextElementSibling;
        var inputValue = input.value.trim();
        var isNumberOnly = /^\d+$/.test(inputValue);
        var currentFrom = input.getAttribute('data-f');
    });
});




function afterRedirect(redirect_url) {
    var currentUrl = new URL(window.location.html);

    // Get the value of the "redirect_to" parameter
    var redirectParam = currentUrl.searchParams.get('redirect_to');

    // Check if the "redirect_to" parameter exists
    if (redirectParam) {
        window.location.href = redirectParam + "&" + getRandomIntVal(1, 1000);
    } else {
        if (redirect_url) {
            window.location.href = redirect_url;
        } else {
            window.location.href = "?q=" + getRandomIntVal(1, 1000);
        }
    }

}
//Profile code


// keyboard handled 
// Function to check if the virtual keyboard is open
function isVirtualKeyboardOpen() {
    // Check if the focused element is an input or textarea
    var activeElement = document.activeElement;
    if (
        activeElement &&
        (activeElement.tagName.toLowerCase() === 'input' ||
            activeElement.tagName.toLowerCase() === 'textarea')
    ) {
        // Check if the element is obscured by the virtual keyboard
        var keyboardHeight = window.innerHeight * 0.5;
        var elementBounds = activeElement.getBoundingClientRect();
        var elementBottom = elementBounds.bottom;
        var viewportHeight = window.innerHeight;
        var keyboardThreshold = viewportHeight - keyboardHeight;

        return elementBottom > keyboardThreshold;
    }

    return false;
}

// Function to handle the virtual keyboard open event
function handleVirtualKeyboardOpen() {
    if (isVirtualKeyboardOpen()) {
        // Add a CSS class to all the popup containers to adjust the layout
        var popupContainers = document.querySelectorAll('.custompopup');
        popupContainers.forEach(function(popupContainer) {
            popupContainer.classList.add('keyboard-open');
        });
    }
}

// Function to handle the virtual keyboard close event
function handleVirtualKeyboardClose() {
    // Remove the CSS class from all the popup containers
    var popupContainers = document.querySelectorAll('.custompopup');
    popupContainers.forEach(function(popupContainer) {
        popupContainer.classList.remove('keyboard-open');
    });
}


// Event listeners for virtual keyboard open/close events
window.addEventListener('resize', function() {
    if (isVirtualKeyboardOpen()) {
        handleVirtualKeyboardOpen();
    } else {
        handleVirtualKeyboardClose();
    }
});
window.addEventListener('scroll', function() {
    if (isVirtualKeyboardOpen()) {
        handleVirtualKeyboardOpen();
    } else {
        handleVirtualKeyboardClose();
    }
});

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


const loginParam = getURLParameter('login');
if (loginParam === 'popup') {
    openlogin();
}

function removeErr(){
    const errElements = document.querySelectorAll('.err');
errElements.forEach((element) => {
  element.classList.add("displayNone");
});

}


    //change email
function changeemail(txt,emailid){
 var loginInfoContainer = document.getElementById("editEmailSection");

    // Create the first span element
    var enterPasswordSpan = document.createElement("span");
    enterPasswordSpan.textContent =txt; ;
    loginInfoContainer.appendChild(enterPasswordSpan);

    // Add a line break
    loginInfoContainer.appendChild(document.createElement("br"));

    // Create the second span element with ID "userEmail"
    var userEmailSpan = document.createElement("span");
    userEmailSpan.className = "text-base";
    userEmailSpan.id = "userEmail";
    userEmailSpan.textContent = emailid;
    loginInfoContainer.appendChild(userEmailSpan);

    // Add a space
    loginInfoContainer.appendChild(document.createTextNode(" "));

    // Create the "edit" link with ID "editLink"
    var editLink = document.createElement("a");
    editLink.href = "#";
    editLink.className = "text-primary";
    editLink.textContent = "edit";
    editLink.id = "editLink";
    editLink.addEventListener("click", function(event) {
           emailgroup();
    });
    loginInfoContainer.appendChild(editLink);
    
}    


    function emailgroup(){
          document.querySelector('.loginForm #formState').value='0';
          document.querySelector('.loginpopuptext').classList.remove('hideElement');
          document.querySelector('#editEmailSection').innerHTML=""
            document.querySelector('.singinTitle').textContent="Enter your email";
        var inputGroupLogin = document.createElement("div");
        inputGroupLogin.className = "input-grouglogin";
        
        // Create the div with class "emailboxlabel"
        var emailBoxLabel = document.createElement("div");
        emailBoxLabel.className = "emailboxlabel";
        
        // Create the label for the username input
        var usernameLabel = document.createElement("label");
        usernameLabel.htmlFor = "usernameLogin";
        usernameLabel.className = "usernamelable";
        usernameLabel.textContent = "Email";
        
        // Create the div for the input and error message
        var inputContainer = document.createElement("div");
        
        // Create the email input
        var emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.id = "usernameLogin";
        emailInput.className = "username";
        emailInput.name = "username";
        emailInput.autocomplete = "username";
        emailInput.required=true;

        emailInput.placeholder = "";
        emailInput.value =  document.querySelector('.loginForm #emailHidden').value;
        
        // Create the error message for the email input
        var usernameErr = document.createElement("p");
        usernameErr.className = "usernameErr err displayNone";
        
        // Append the label to the "emailboxlabel" div
        emailBoxLabel.appendChild(usernameLabel);
        
        // Append the input and error message to the container div
        inputContainer.appendChild(emailInput);
        inputContainer.appendChild(usernameErr);
        
        // Append the "emailboxlabel" and container div to the "input-grouglogin" div
        inputGroupLogin.appendChild(emailBoxLabel);
        inputGroupLogin.appendChild(inputContainer);
        var forminputs = document.querySelector(".forminputs");
        forminputs.innerHTML = ''
        forminputs.appendChild(inputGroupLogin);
        loginsbBtn.textContent = "Sign in";
       
       
    }
    function showpasswordgroup(fele, isChange) {
          
       
        var existingPasswordField1 = document.querySelector(fele+' .input-grouglogin');
            if (existingPasswordField1) {
                existingPasswordField1.remove();
            }
       
        
            var passwordInput = document.createElement("input");
            passwordInput.type = "password";
            passwordInput.id = "password";
            passwordInput.name = "password";
            passwordInput.placeholder = "";
            passwordInput.autocomplete = "password";
            passwordInput.required=true;

            // passwordInput.addEventListener("keypress", function(event) {

            //     passwordInput.nextElementSibling.classList.add('displayNone');
            // });

            var inputEye = document.createElement('span');
            inputEye.classList.add('password-toggle-icon');
            
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "24");
    svgElement.setAttribute("height", "24");
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("fill", "none");
    svgElement.classList.add('eye');
    // Create a group element with the clip-path
    const groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupElement.setAttribute("clip-path", "url(#clip0_178_13892)");

    // Create the path element with the specified attributes
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill-rule", "evenodd");
    pathElement.setAttribute("clip-rule", "evenodd");
    pathElement.setAttribute("d", "M12.0011 18C8.63237 18 5.4638 16.0754 2.44714 11.9998C5.46419 7.92435 8.63259 6 12.0011 6C15.3699 6 18.5384 7.9246 21.5551 12.0002C18.5381 16.0757 15.3697 18 12.0011 18ZM12.0011 4C7.5541 4 3.72153 6.69306 0.396231 11.4248L-0.0078125 11.9997L0.396182 12.5747C3.72105 17.3066 7.55383 20 12.0011 20C16.4481 20 20.2807 17.3069 23.606 12.5752L24.0101 12.0003L23.6061 11.4253C20.2812 6.69339 16.4484 4 12.0011 4ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z");
    pathElement.setAttribute("fill", "#86898F");

    // Append path element to the group
    groupElement.appendChild(pathElement);

    // Append group element to the SVG
    svgElement.appendChild(groupElement);
       
       
       //hide 
        const svgElement1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement1.setAttribute("width", "24");
    svgElement1.setAttribute("height", "24");
    svgElement1.setAttribute("viewBox", "0 0 24 24");
    svgElement1.setAttribute("fill", "none");
        svgElement1.classList.add('eye-slash');

    // Create a group element with the clip-path
    const groupElement1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupElement1.setAttribute("clip-path", "url(#clip0_57_3880)");

    // Create the path element with the specified attributes
    const pathElement1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement1.setAttribute("fill-rule", "evenodd");
    pathElement1.setAttribute("clip-rule", "evenodd");
    pathElement1.setAttribute("d", "M21.666 4.74742C22.0788 4.3805 22.1159 3.74843 21.749 3.33565C21.3821 2.92286 20.75 2.88568 20.3373 3.2526L17.6904 5.60537C15.9141 4.55556 14.021 3.99998 12.0011 3.99998C7.5541 3.99998 3.72153 6.69304 0.396231 11.4248L-0.0078125 11.9997L0.396182 12.5746C1.72195 14.4615 3.12847 16.0242 4.62251 17.2213L2.33725 19.2526C1.92447 19.6195 1.88729 20.2516 2.25421 20.6644C2.62113 21.0772 3.2532 21.1143 3.66598 20.7474L6.31249 18.395C8.08863 19.4445 9.98151 20 12.0011 20C16.4481 20 20.2807 17.3069 23.606 12.5752L24.0101 12.0003L23.6061 11.4253C22.2805 9.53872 20.8741 7.97616 19.3803 6.77915L21.666 4.74742ZM16.1043 7.0152C14.7689 6.33295 13.4023 5.99998 12.0011 5.99998C8.63259 5.99998 5.46419 7.92433 2.44714 11.9998C3.65324 13.6293 4.88362 14.9149 6.14137 15.8712L7.67403 14.5088C7.24544 13.7714 7 12.9143 7 12C7 9.23856 9.23858 6.99998 12 6.99998C13.1248 6.99998 14.1629 7.37142 14.9983 7.99834L16.1043 7.0152ZM16.3271 9.49309L17.8614 8.12923C19.119 9.08545 20.3492 10.3709 21.5551 12.0002C18.5381 16.0756 15.3697 18 12.0011 18C10.6001 18 9.23379 17.6671 7.89858 16.9851L9.00349 16.003C9.83855 16.6291 10.876 17 12 17C14.7614 17 17 14.7614 17 12C17 11.0864 16.755 10.2301 16.3271 9.49309ZM13.4511 9.37364C13.0211 9.13554 12.5264 8.99998 12 8.99998C10.3431 8.99998 9 10.3431 9 12C9 12.401 9.07868 12.7836 9.22146 13.1333L13.4511 9.37364ZM10.551 14.6274L14.7794 10.8688C14.9216 11.2179 15 11.5998 15 12C15 13.6568 13.6569 15 12 15C11.4745 15 10.9805 14.8649 10.551 14.6274Z");
    pathElement1.setAttribute("fill", "#86898F");

    // Append path element to the group
    groupElement1.appendChild(pathElement1);

    // Append group element to the SVG
    svgElement1.appendChild(groupElement1);

       inputEye.appendChild(svgElement1);

      
       //hide
       
            inputEye.addEventListener("click", function(event) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    
                    inputEye.removeChild(svgElement1);
                    inputEye.appendChild(svgElement);

                } else {
                    passwordInput.type = 'password';
                    inputEye.removeChild(svgElement);
                    inputEye.appendChild(svgElement1);
                }

            });

            var passwordInputErr = document.createElement("p");
            passwordInputErr.classList.add('passwordErr');
            passwordInputErr.classList.add('err');

            passwordInputErr.classList.add('displayNone');

            var labelGroupLogin = document.createElement("div");
            labelGroupLogin.className = "emailboxlabel";
            // Create the labels
            var passwordLabel = document.createElement("label");
            passwordLabel.htmlFor = "password";
            passwordLabel.textContent = "Password";

            // Create the div container
            var inputGroupLogin = document.createElement("div");
            inputGroupLogin.className = "input-grouglogin";
            labelGroupLogin.appendChild(passwordLabel);
            inputGroupLogin.appendChild(labelGroupLogin);
            inputGroupLogin.appendChild(passwordInput);
            inputGroupLogin.appendChild(inputEye);
            inputGroupLogin.appendChild(passwordInputErr);

            // Append the div container to the frominputs class
            var forminputs = document.querySelector(".forminputs");
             
            forminputs.appendChild(inputGroupLogin);
            loginsbBtn.textContent = "Sign in";

        }
        
   function showSignupgroup(fele, isChange) {
    // Remove any existing password field
    var existingPasswordField = document.querySelector('.input-grouglogin');
    if (existingPasswordField) {
        existingPasswordField.remove();
    }

    // Create the first name input
    var firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.id = "first_name";
    firstNameInput.name = "first_name";
    firstNameInput.placeholder = "First Name";
    firstNameInput.required=true;

    // Create the last name input
    var lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.id = "last_name";
    lastNameInput.name = "last_name";
    lastNameInput.placeholder = "Last Name";
    lastNameInput.required=true;

    // Create the password input
    var passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    passwordInput.autocomplete = "password";
    passwordInput.required=true;

    passwordInput.addEventListener("keypress", function(event) {
if (passwordInput.nextElementSibling && passwordInput.nextElementSibling.tagName.toLowerCase() === 'p') {
    // Add the 'displayNone' class to the next 'p' element
    passwordInput.nextElementSibling.classList.add('displayNone');
}
    });


    // Create the password visibility toggle icon
    var inputEye = document.createElement('i');
        
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "24");
    svgElement.setAttribute("height", "24");
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("fill", "none");
    svgElement.classList.add('eye');
    // Create a group element with the clip-path
    const groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupElement.setAttribute("clip-path", "url(#clip0_178_13892)");

    // Create the path element with the specified attributes
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill-rule", "evenodd");
    pathElement.setAttribute("clip-rule", "evenodd");
    pathElement.setAttribute("d", "M12.0011 18C8.63237 18 5.4638 16.0754 2.44714 11.9998C5.46419 7.92435 8.63259 6 12.0011 6C15.3699 6 18.5384 7.9246 21.5551 12.0002C18.5381 16.0757 15.3697 18 12.0011 18ZM12.0011 4C7.5541 4 3.72153 6.69306 0.396231 11.4248L-0.0078125 11.9997L0.396182 12.5747C3.72105 17.3066 7.55383 20 12.0011 20C16.4481 20 20.2807 17.3069 23.606 12.5752L24.0101 12.0003L23.6061 11.4253C20.2812 6.69339 16.4484 4 12.0011 4ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z");
    pathElement.setAttribute("fill", "#86898F");

    // Append path element to the group
    groupElement.appendChild(pathElement);

    // Append group element to the SVG
    svgElement.appendChild(groupElement);
       
       
       //hide 
        const svgElement1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement1.setAttribute("width", "24");
    svgElement1.setAttribute("height", "24");
    svgElement1.setAttribute("viewBox", "0 0 24 24");
    svgElement1.setAttribute("fill", "none");
        svgElement1.classList.add('eye-slash');

    // Create a group element with the clip-path
    const groupElement1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupElement1.setAttribute("clip-path", "url(#clip0_57_3880)");

    // Create the path element with the specified attributes
    const pathElement1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement1.setAttribute("fill-rule", "evenodd");
    pathElement1.setAttribute("clip-rule", "evenodd");
    pathElement1.setAttribute("d", "M21.666 4.74742C22.0788 4.3805 22.1159 3.74843 21.749 3.33565C21.3821 2.92286 20.75 2.88568 20.3373 3.2526L17.6904 5.60537C15.9141 4.55556 14.021 3.99998 12.0011 3.99998C7.5541 3.99998 3.72153 6.69304 0.396231 11.4248L-0.0078125 11.9997L0.396182 12.5746C1.72195 14.4615 3.12847 16.0242 4.62251 17.2213L2.33725 19.2526C1.92447 19.6195 1.88729 20.2516 2.25421 20.6644C2.62113 21.0772 3.2532 21.1143 3.66598 20.7474L6.31249 18.395C8.08863 19.4445 9.98151 20 12.0011 20C16.4481 20 20.2807 17.3069 23.606 12.5752L24.0101 12.0003L23.6061 11.4253C22.2805 9.53872 20.8741 7.97616 19.3803 6.77915L21.666 4.74742ZM16.1043 7.0152C14.7689 6.33295 13.4023 5.99998 12.0011 5.99998C8.63259 5.99998 5.46419 7.92433 2.44714 11.9998C3.65324 13.6293 4.88362 14.9149 6.14137 15.8712L7.67403 14.5088C7.24544 13.7714 7 12.9143 7 12C7 9.23856 9.23858 6.99998 12 6.99998C13.1248 6.99998 14.1629 7.37142 14.9983 7.99834L16.1043 7.0152ZM16.3271 9.49309L17.8614 8.12923C19.119 9.08545 20.3492 10.3709 21.5551 12.0002C18.5381 16.0756 15.3697 18 12.0011 18C10.6001 18 9.23379 17.6671 7.89858 16.9851L9.00349 16.003C9.83855 16.6291 10.876 17 12 17C14.7614 17 17 14.7614 17 12C17 11.0864 16.755 10.2301 16.3271 9.49309ZM13.4511 9.37364C13.0211 9.13554 12.5264 8.99998 12 8.99998C10.3431 8.99998 9 10.3431 9 12C9 12.401 9.07868 12.7836 9.22146 13.1333L13.4511 9.37364ZM10.551 14.6274L14.7794 10.8688C14.9216 11.2179 15 11.5998 15 12C15 13.6568 13.6569 15 12 15C11.4745 15 10.9805 14.8649 10.551 14.6274Z");
    pathElement1.setAttribute("fill", "#86898F");

    // Append path element to the group
    groupElement1.appendChild(pathElement1);

    // Append group element to the SVG
    svgElement1.appendChild(groupElement1);
       inputEye.appendChild(svgElement1);

    inputEye.classList.add('password-toggle-icon');
    inputEye.addEventListener("click", function(event) {
    if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    
                    inputEye.removeChild(svgElement1);
                    inputEye.appendChild(svgElement);

                } else {
                    passwordInput.type = 'password';
                    inputEye.removeChild(svgElement);
                    inputEye.appendChild(svgElement1);
                }
    });

    // Create the error message for the password
    var passwordInputErr = document.createElement("p");
    passwordInputErr.classList.add('passwordErr', 'err', 'displayNone');

    // Create the container div for the inputs
    var inputGroupLogin = document.createElement("div");
    inputGroupLogin.className = "input-grouglogin";

    // Append first name, last name, password inputs, and toggle icon to the container
    inputGroupLogin.appendChild(firstNameInput);
    inputGroupLogin.appendChild(lastNameInput);
    inputGroupLogin.appendChild(passwordInput);
    inputGroupLogin.appendChild(inputEye);
    inputGroupLogin.appendChild(passwordInputErr);

    // Append the container to the form inputs
    var forminputs = document.querySelector(".forminputs");
    forminputs.appendChild(inputGroupLogin);
    
    // Update the button text
    loginsbBtn.textContent = "Create Account";
}


 function setCookiecu(cookieName, cookieValue) {
  var date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  var expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// add signin botton on add to cart
var signinLinks = document.querySelectorAll(".login2");

// Add click event listener to each anchor tag
signinLinks.forEach(function(link) {
    console.log("click event added");
  link.addEventListener("click", function(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();
    
    // Get the value from the data-href attribute
    var dataHref = this.getAttribute("data-cart-link");
    
    var currentUrl = window.location.href;

// Check if the URL already has query parameters
var separator = currentUrl.includes('?') ? '&' : '?';

// New parameter and its value
var newParam = 'redirect_to';
var paramValue = dataHref;

// Create a URLSearchParams object to handle the URL parameters
var urlParams = new URLSearchParams(window.location.search);

// Check if the parameter already exists in the URL
if (urlParams.has(newParam)) {
  // Parameter already exists, replace its value
  urlParams.set(newParam, paramValue);
} else {
  // Parameter does not exist, add it
  urlParams.append(newParam, paramValue);
   
}


// Split the URL string at the '?' character to separate the query string
const urlParts = dataHref.split('?');
 let addToCartValue=""
if (urlParts.length === 2) {
  const queryString = urlParts[1];
  
  // Split the query string at the '=' character to separate parameter and value
  const parameterParts = queryString.split('=');

  if (parameterParts.length === 2 && parameterParts[0] === 'add-to-cart') {
      addToCartValue= parameterParts[1];
    //console.log("Value of 'add-to-cart' parameter: " + addToCartValue);
  } else {
    //console.log("'add-to-cart' parameter not found or invalid URL.");
  }
} else {
  console.log("Invalid URL format.");
}

var cookieName = "redirecttocart";
var minutesToExpire = 5;

       //setCookiecu(cookieName, addToCartValue);




// Update the URL with the modified parameters
var newUrl = window.location.pathname + '?' + urlParams.toString();
window.history.pushState({}, '', newUrl);
   openlogin(0);

  });
});

    }






function togglePassword(thisele, ele) {
    let passwordInput = document.getElementById(ele);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        thisele.classList.remove('fa-eye');
        thisele.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        thisele.classList.remove('fa-eye-slash');
        thisele.classList.add('fa-eye');
    }
}

 var colseloginElement = document.querySelector('.colselogin');

        // Check if the element exists
        if (colseloginElement) {
            // Add a click event to the element
            colseloginElement.addEventListener('click', function() {
               document.getElementById("loginpopuplogin").style.display = "none";
            });
        }

   });
