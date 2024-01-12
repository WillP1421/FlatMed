#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource, Api
from datetime import datetime, time
# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Patient, Review, Appointment, User


# Views go here!

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

api = Api(app)

class AdminUser(Resource):

    def get(self):
        response_body = [user.to_dict(only=('id', 'email', 'admin', 'password')) for user in User.query.all()]
        return make_response(response_body, 200)
    
    def post(self):
        data = request.get_json()
        user = User(
            email=data['email'],
            password=data['password'],
            admin=data['admin']
        )
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(only=('id', 'email', 'admin', 'password')), 201)
    
api.add_resource(AdminUser, '/users')

class UserById(Resource):

    def get(self, id):
        response_body = User.query.get_or_404(id).to_dict(only=('id', 'email', 'admin', 'password'))
        return make_response(response_body, 200)
    
    def patch(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        for field in data:
            setattr(user, field, data[field])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(only=('id', 'email', 'admin', 'password')), 200)
    
    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        response_body = {}
        return make_response(response_body, 204)
    
api.add_resource(UserById, '/users/<int:id>')

class AdminUserLogin(Resource):

    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email'], password=data['password']).first()
        if user:
            response_body = user.to_dict(only=('id', 'email', 'admin', 'password'))
            return make_response(response_body, 200)
        else:
            response_body = {'message': 'Invalid email or password'}
            return make_response(response_body, 401)
        

api.add_resource(AdminUserLogin, '/admin/login')

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
        response_body = [
            appointment.to_dict(only=('id', 'patient_id', 'doctor_id', 'doctor_name', 'doctor_address', 'date', 'time'))
            for appointment in Appointment.query.all()
        ]
        return make_response(response_body, 200)

api.add_resource(AllAppointments, '/appointments')

class PatientAppointments(Resource):
    def get(self, patient_id):
        patient = Patient.query.get(patient_id)
        if not patient:
            return make_response({'error': 'Patient not found'}, 404)

        appointments = [
            appointment.to_dict(only=('id', 'doctor_id', 'doctor_name', 'doctor_address', 'date', 'time'))
            for appointment in patient.appointments
        ]
        return make_response(appointments, 200)

api.add_resource(PatientAppointments, '/patients/<int:patient_id>/appointments')

class GetAppointmentById(Resource):
    def get(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return make_response({'error': 'Appointment not found'}, 404)

        response_body = appointment.to_dict(only=('id', 'patient_id', 'doctor_id', 'doctor_name', 'doctor_address', 'date', 'time'))
        return make_response(response_body, 200)
    
    def patch(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return make_response({'error': 'Appointment not found'}, 404)

        data = request.get_json()

        # Check if 'date' and 'time' are present in the incoming data
        if 'date' in data and 'time' in data:
            # Convert the date string to a Python date object
            new_date_str = data['date']
            new_date_obj = datetime.strptime(new_date_str, '%Y-%m-%dT%H:%M:%S.%fZ').date()

            # Convert the time string to a Python time object
            new_time_str = data['time']
            new_time_obj = datetime.strptime(new_time_str, '%H:%M').time()

            # Update the appointment date and time with the new values
            appointment.date = new_date_obj
            appointment.time = new_time_obj

        # Update other fields in a similar manner
        for field in data:
            if field not in ['date', 'time']:
                setattr(appointment, field, data[field])

        db.session.add(appointment)
        db.session.commit()
        return make_response(appointment.to_dict(only=('id', 'patient_id', 'doctor_id', 'doctor_name', 'doctor_address', 'date', 'time')), 200)
    def delete(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return make_response({'error': 'Appointment not found'}, 404)

        db.session.delete(appointment)
        db.session.commit()
        response_body = {}
        return make_response(response_body, 204)
    
api.add_resource(GetAppointmentById, '/appointments/<int:appointment_id>')
class AddAppointment(Resource):
    def post(self, patient_id):
        data = request.get_json()

        # Assuming you have appropriate validation and error handling
        doctor_id = data.get('doctor_id')
        doctor = Doctor.query.filter_by(id=doctor_id).first()

        if not doctor:
            return make_response({'error': 'Doctor not found'}, 404)

        # Convert the date string to a Python date object
        date_str = data.get('date')
        if date_str is None:
            return make_response({'error': 'Date is missing'}, 400)

        date_object = datetime.strptime(date_str, '%Y-%m-%d').date()

        # Convert the time string to a Python time object
        time_str = data.get('time')
        if time_str is None:
            return make_response({'error': 'Time is missing'}, 400)

        time_object = datetime.strptime(time_str, '%H:%M').time()

        new_appointment = Appointment(
            patient_id=patient_id,
            doctor_id=doctor_id,
            doctor_address=doctor.address,
            doctor_name=doctor.name,
            date=date_object,
            time=time_object,  # Use the Python time object
        )

        db.session.add(new_appointment)
        db.session.commit()

        return make_response({'message': 'Appointment added successfully'}, 201)
    
    
api.add_resource(AddAppointment, '/patients/<int:patient_id>/add_appointment')

class AllReviews(Resource):
    def get(self):
        response_body = [review.to_dict(only=('id','patient_id', 'doctor_id', 'rating', 'comment')) for review in Review.query.all()]
        return make_response(response_body, 200)

    def post(self, patient_id):
        data = request.get_json()
        new_review = Review(
            patient_id=patient_id, 
            doctor_id=data.get('doctor_id'),
            rating=data.get('rating'),
            comment=data.get('comment')
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response({'message': 'Review added successfully'}, 201)

api.add_resource(AllReviews, '/reviews/<int:patient_id>')

class DoctorReviews(Resource):
    def get(self, doctor_id):
        response_body = [review.to_dict(only=('id', 'patient_id', 'doctor_id', 'rating', 'comment')) for review in Review.query.filter_by(doctor_id=doctor_id).all()]
        return make_response(response_body, 200)

api.add_resource(DoctorReviews, '/doctors/reviews/<int:doctor_id>')


class CheckSession(Resource):
    def get(self):
        response_body = {}
        return make_response(response_body, 200)
    
api.add_resource(CheckSession, '/checksession')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
