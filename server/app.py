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
        response_body= [patient.to_dict(only=('id','name', 'email', 'phone', 'address', 'password')) for patient in Patient.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(PatientList, '/patients')

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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

