//= require jquery
//= require jquery_ujs
//= require jquery.turbolinks
//= require turbolinks
//= require materialize
//= require_tree

var ready;
ready = function() {
    var number2dial;
    Materialize.updateTextFields();
    $('select').material_select();
    $('.ml_ukr').mlKeyboard({
        layout: 'ua_UK'
    });
    $('.ml_eng').mlKeyboard({
        layout: 'en_US'
    });
    $('#print_button').click(function () {
        window.print();
    });
    //$('#doctor_first_name').focus();
    $('#doctor_city').focus(function() {
        geolocate();
    });
    $('input').focus(function() {
       if ((this.id != 'doctor_phone') && (this.id != 'doctor_phone')) {
           $('#numpad').addClass('disabled');
       }
    });
    $('.dialpad').focus(function() {
        $('#numpad').removeClass('disabled');
        console.log(this);
        number2dial = this;
        if (number2dial.value == '') {
            if (number2dial.id == 'doctor_phone') {
                number2dial.value = '+380'
            }
            if (number2dial.id == 'doctor_console') {
                number2dial.value = ' '
            }
        }
    });
    $('label[for=doctor_city]').removeClass('active');
    $('div').last().addClass('mlkeyboard_eng');

    create_and_show_numpad();

    function create_and_show_numpad() {
        const numbers = "123456789";
        const buttonClass = 'numpad';
        const buttonBackspace = 'backspace';

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('numpad-container');

        function addButton(number) {
            var button = document.createElement('button');
            button.innerHTML = number;
            button.classList.add(buttonClass);
            buttonContainer.appendChild(button);
        }

        function addBackspace() {
            var button = document.createElement('button');
            button.innerHTML = "&larr;";
            button.classList.add("backspace");
            buttonContainer.appendChild(button);
        }

        numbers.split('').forEach(addButton);
        addBackspace();
        addButton('0');
        document.querySelector('.numpad_target').appendChild(buttonContainer);


        $('.backspace').click(function (e) {
            number2dial.value = number2dial.value.slice(0, -1);
        });

        $('.numpad').click(function (e) {
            number2dial.value += e.target.innerHTML;
        });
    }
}

$(document).on('turbolinks:load', ready);

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('doctor_city')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    console.log('geolocate');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}