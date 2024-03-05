from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/regex_matcher")
def regex_matcher():
    return render_template("regex_matcher.html")


@app.route("/validate_email")
def validate_email_form():
    return render_template("email_validation.html")


email_regex_pattern = r'^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$'


@app.route("/validate_email", methods=["POST"])
def validate_email():
    email = request.form["email"]
    if re.match(email_regex_pattern, email):
        if "." not in email or "@" not in email:
            return jsonify({"result": "The email address is incomplete."})
        elif email.count("@") > 1:
            return jsonify(
                {"result": 'The email address contains more than one "@" symbol.'}
            )
        else:
            return jsonify({"result": "Valid email address"})
    else:
        return jsonify({"result": "Invalid email address"})


@app.route("/regex_matcher/results", methods=["POST"])
def results():
    test_string = request.form["test_string"]
    regex_pattern = request.form["regex_pattern"]
    matches = []
    for match in re.finditer(regex_pattern, test_string):
        matches.append(
            {"text": match.group(0), "start": match.start(), "end": match.end()}
        )
    return render_template(
        "results.html",
        test_string=test_string,
        regex_pattern=regex_pattern,
        matches=matches,
    )


if __name__ == "__main__":
    app.run(debug=True)
