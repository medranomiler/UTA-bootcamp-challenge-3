// Traversing the DOM to use elements in the JavaScript file
var result = document.getElementById('password');


// putting random character functions into an object - refer to line 100 and beyond
const randomCharacterFunction = {
	lowercase: randomLower,
	uppercase: randomUpper,
	number: randomNumber,
	symbol: randomSymbol
}

// event listener for generateThePassword function to begin when generate button is clicked

generate.addEventListener('click', generateThePassword);

// Generate the password function which includes determining what criteria to include in password via prompts
function generateThePassword(){

// console log message to confirm that the button was clicked and function was triggered
    console.log("The generate password button was clicked");

// declaring variable for the character length of password based on the user's response to the window alert, and converting the value from a string to a number
    var characterLength = Number(prompt("How many characters do you want in your password? Enter a NUMBER between 8 and 128: "));

// declaring variables as booleans that are true or false based on responses to the window alerts
	var containsLower = confirm("Do you want to include lowercase letters?");
	var containsUpper = confirm('Do you want to include uppercase letters?');
	var containsNumber = confirm('Do you want to include numbers?');
	var containsSymbol = confirm('Do you want to include symbols?');

// console logging each var as true/false, and the character length of the password based on user response to prompts
	console.log("The password contains lowercase: " + containsLower);	
	console.log("The password contains uppercase: " + containsUpper);	
	console.log("The password contains numbers: " + containsNumber);	
	console.log("The password contains symbols: " + containsSymbol);
	console.log("The password character length is: " + characterLength);	

// script that inputs value of password generating function in the text box
	result.innerText = generatePassword(
		containsLower, 
		containsUpper, 
		containsNumber, 
		containsSymbol, 
		characterLength
	);
};

// generate password function
function generatePassword(lowercase, uppercase, number, symbol, characterLength) {
		// 1. Initialize password variable. String that we will add to based on legth of password
		// 2. Filter out undesired character types 
		// 3. Loop over length call generator function for each character type
		// 4. Add the final password to the password variable and return 

// 1. Initialize password variable. "generatedPassword" set to an empty string.
	let generatedPassword = '';
// count the number of desired character types and log to console.
	const characterTypesCount = lowercase + uppercase + number + symbol;
	console.log('The number of character types is: ' + characterTypesCount);
// creating a character types array. This is an array of objects.
	// using .filter method to filter out any types that have a value of false. In other words, they are not the character types chosen by the user to be included in the password.
	const typesArr = [{lowercase}, {uppercase}, {number}, {symbol}].filter(item => Object.values(item)[0]);

// if statements for invalid inputs to window alerts such as invalid character length and no character types chosen. Displays error messages in the text box and window alerts, and asks the user to try again. The error messages are also logged in the console. 
	// no character type was chosen. Cannot generate a password of any length if there is no character type criteria
	if(characterTypesCount === 0) {
		alert('The password was not generated due to invalid character input. Try again, but make sure to choose at least 1 of the following character types to be included in your password: Uppercase, Lowercase, Numbers, Symbols. ')
        console.log('The password was not generated due to invalid character input. No character types were chosen');
        result.style.color = "red";
		return 'The password was not generated due to invalid character input. Try again, but make sure to choose at least 1 of the following character types to be included in your password: Uppercase, Lowercase, Numbers, Symbols. ';

	}
	// invalid character length. The value entered in reponse to the character length prompt was not a number between 8 and 128
	if(characterLength < 8 || characterLength > 128) {
		alert('The password was not generated because the password character length provided was not a number between 8 and 128. Try again, but make sure the password character length is a NUMBER between 8 and 128')
        console.log('The password was not generated because the password character length provided was not a number between 8 and 128.');
        result.style.color = "red";
        return 'Please try again. The password was not generated because the password character length provided was not a number between 8 and 128.'
    }
	// the value entered in reponse to the character length prompt was not a number
	if(isNaN(characterLength)) {
		alert('The password was not generated because the password character length provided was not a number. Try again, but make sure the password character length is a NUMBER between 8 and 128.')
        console.log('The password was not generated because the password character length provided was not a number.');
        result.style.color = "red";
        return 'Please try again. The password was not generated because the password character length provided was not a number. Make sure the password character length is a NUMBER between 8 and 128.'
    }else{
    // created a loop that increments by the number of character types count.
	for(let i=0; i<characterLength; i+=characterTypesCount) {
		typesArr.forEach(type => {
			const functionName = Object.keys(type)[0];
			generatedPassword += randomCharacterFunction[functionName]();
		});
	}

// Here we are declaring the variable "password" as the result of generatedPassword function. We are also using the .slice method instead of the .vauleOf method because the for loop is incrementing by the number of character types. Ex: If using 4 different character types but your password length was not a factor of 4 (ex: 10), the password would end up being 12 characters long because it looped 3 times. The .slice method will remove the excess characters in that case.
	var password = generatedPassword.slice(0, characterLength);

	// valid password is displayed in green text and also logged in the console
    result.style.color = "green";
   	console.log("Congratulations! Your password is: " + password);
	
	return password;
}}

// random character functions using CharCode map referenced from https://www.net-comber.com/charset.html. functions generate a number between 1 and 26 then add either 97, 65, or 48 to choose either a lowercase, uppercase, or a number. lowercase letters begin at 97, uppercase letters begin at 65, and numbers begin at 48. Symbols used are declared in string. 


function randomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.~`:;|'
	return symbols[Math.floor(Math.random() * symbols.length)];
}
