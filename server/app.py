#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource, Api

# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Patient, Review, Appointment


# Views go here!

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

api = Api(app)

class PatientList(Resource):
    def get(self):
        response_body= [patient.to_dict(only=('id','name', 'email', 'phone', 'address')) for patient in Patient.query.all()]
        return make_response(response_body, 200)
    
    def post(self):
        data = request.get_json()
        patient = Patient(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            address=data['address'],
            password=data['password']
        )
        db.session.add(patient)
        db.session.commit()
        return make_response(patient.to_dict(only=('id','name', 'email', 'phone', 'address')), 201)
    
api.add_resource(PatientList, '/patients')


class PatientById(Resource):
    def get(self, id):
        response_body= Patient.query.get_or_404(id).to_dict(only=('id','name', 'email', 'phone', 'address', 'password'))
        return make_response(response_body, 200)
    
    def delete(self, id):
       patient = Patient.query.filter(Patient.id == id).first()

       if patient:
           db.session.delete(patient)
           db.session.commit()
           response_body = {}
           return make_response(response_body, 204)
       
       else:
           response_body = {'message': 'Patient not found'}
           return make_response(response_body, 404)
    def patch(self, id):
        patient = Patient.query.get_or_404(id)
        data = request.get_json()
        for field in data:
            setattr(patient, field, data[field])
        db.session.add(patient)
        db.session.commit()
        return make_response(patient.to_dict(only=('id','name', 'email', 'phone', 'address')), 200)
    
api.add_resource(PatientById, '/patients/<int:id>')

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        patient = Patient.query.filter_by(email=email, password=password).first()
        if patient:
            response_body = patient.to_dict(only=('id','name', 'email', 'phone', 'address'))
            return make_response(response_body, 200)
        else:
            response_body = {'message': 'Invalid email or password'}
            return make_response(response_body, 401)

api.add_resource(Login, '/login')
class DoctorList(Resource):
    def get(self):
        response_body= [doctor.to_dict(only=('id','name', 'email', 'phone', 'specialty', 'address')) for doctor in Doctor.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(DoctorList, '/doctors')


class AllAppointments(Resource):
    def get(self):
        response_body= [appointment.to_dict(only=('id','patient_id', 'doctor_id', 'doctor_address', 'date', 'time')) for appointment in Appointment.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(AllAppointments, '/appointments')


class AllReviews(Resource):
    def get(self):
        response_body= [review.to_dict(only=('id','patient_id', 'doctor_id', 'rating', 'comment')) for review in Review.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(AllReviews, '/reviews')



class CheckSession(Resource):
    def get(self):
        response_body = {}
        return make_response(response_body, 200)
    
api.add_resource(CheckSession, '/checksession')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

