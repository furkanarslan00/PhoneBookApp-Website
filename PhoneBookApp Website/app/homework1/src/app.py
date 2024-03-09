# Import necessary libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Create Flask app and configure CORS
app = Flask(__name__)
CORS(app)

# Configure MSSQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:q@.\SQLEXPRESS/YourDatabase?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define SystemUser model
class SystemUser(db.Model):
    __tablename__ = 'system_user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Define Contact model
class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(50), nullable=False)
    phonenumber = db.Column(db.Integer, nullable=False)

# Create tables before the first request
with app.app_context():
    db.create_all()

# Route for adding new contact
@app.route("/contacts", methods=["POST"])
def add_contact():
    data = request.json
    name = data.get("name")
    phonenumber = data.get("phonenumber")

    # Check if all required fields are provided
    if not name or not phonenumber:
        return jsonify({"success": False, "message": "Name, surname, and phonenumber are required fields."}), 400

    # Create a new Contact object and add it to the database
    new_contact = Contact(name=name, phonenumber=phonenumber)
    db.session.add(new_contact)
    db.session.commit()

    return jsonify({"success": True, "message": "Contact added successfully"})

# Update the login route to use the database
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = SystemUser.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Update the get_contacts route to fetch contacts from the database
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    contact_list = [{"id": contact.id, "name": contact.name, "surname": contact.surname, "phone": contact.phonenumber} for contact in contacts]
    return jsonify(contact_list)

@app.route("/contacts/<int:id>", methods=["DELETE"])
def remove_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"success": False, "message": "Contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"success": True, "message": "Contact removed successfully"})


@app.route("/contacts/<int:id>", methods=["PUT"])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"success": False, "message": "Contact not found"}), 404

    data = request.json
    contact.name = data.get("name")
    contact.phonenumber = data.get("phonenumber")

    db.session.commit()

    return jsonify({"success": True, "message": "Contact updated successfully"})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
