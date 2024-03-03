# app.py

from flask import Flask, render_template, request
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/validate_email', methods=['POST'])
def validate_email():
    email = request.form['email']
    if re.match(r'^[\w\.-]+@[\w\.-]+$', email):
        return 'Valid email address'
    else:
        return 'Invalid email address'


@app.route('/results', methods=['POST'])
def results():
    test_string = request.form['test_string']
    regex_pattern = request.form['regex_pattern']
    matches = []
    for match in re.finditer(regex_pattern, test_string):
        matches.append({
            'text': match.group(0),
            'start': match.start(),
            'end': match.end()
        })
    return render_template('results.html', test_string=test_string, matches=matches)

if __name__ == '__main__':
    app.run(debug=True)
