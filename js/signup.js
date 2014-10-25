/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

function onReady () {
	// Populates all of the state values into the state drop down list.
	var signup = document.getElementById('signup');
    var usStatesSelect = signup.elements['state'];
    var idx;
    var option;
    var state;
    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        state = usStates[idx];
        option.value = state.name;
        option.innerHTML = state.code;
        usStatesSelect.appendChild(option);
    }

    // If other is selected, reveals a new field to type info into.
    var occupation = document.getElementById('occupation');
    var occupationOther = document.getElementById('occupationOther');
	occupation.addEventListener('change', function() {
        if (occupation.value === "other") {
            occupationOther.style.display = 'block';
        }
        else {
        	occupationOther.style.display = 'none';
        	occupationOther.value = ''; // Resets the value.
        }
    });
    
    // Button brings user to google if they choose yes in alert box.
    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
        if (window.confirm('Are you sure?')) {
           window.location = 'http://www.google.com';
        }
    });

    signup.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
    var valid = validateForm(this);
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
	if (occupation.value === "other") {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate', 'occupationOther'];
    }
    else {
		var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    }
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    document.addEventListener('change', function() {
		
    });
    
    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;
    if (valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    if (field.name === "birthdate") {
    	if (calculateAge(field.value) < 13) {
		    document.getElementById("birthdateMessage").innerHTML = ("You must be at least 13 years old!");
		}
    }
    if (field.name === "zip") {
    	var zipRegExp = new RegExp('^\\d{5}$');
    	if (!zipRegExp.test(field.value)) {
    		field.className = 'form-control invalid-field';
    	}
    }
    return valid;
}

function calculateAge(dob) {
    dob = new Date(dob);
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    return yearsDiff;
}
document.addEventListener('DOMContentLoaded', onReady);