// script.js

function updateResults() {
    var testString = document.getElementById('test_string').value;
    var regexPattern = document.getElementById('regex_pattern').value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById('results').innerHTML = xhr.responseText;
                // Reapply hover functionality after updating results
                addHoverFunctionality();
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.open('POST', '/regex_matcher/results', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('regex_pattern=' + encodeURIComponent(regexPattern) + '&test_string=' + encodeURIComponent(testString));
}

// Function to add hover functionality to matched strings
function addHoverFunctionality() {
    var matchedStrings = document.querySelectorAll('.highlight');
    matchedStrings.forEach(function(element) {
        element.addEventListener('click', function() {
            var startIndex = parseInt(element.dataset.start);
            var endIndex = parseInt(element.dataset.end);
            highlightOriginalText(startIndex, endIndex, 'yellow');
        });
    });
}

function highlightInputText(start, end, color) {
    console.log('Clicked on matched string:', start, end, color);
    var textarea = document.getElementById('test_string');
    textarea.focus();
    textarea.setSelectionRange(start, end);
}