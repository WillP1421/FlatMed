#!/usr/bin/env python3

# Local imports
from app import app, db
from models import Patient, Doctor, Appointment, Review, User
from random import choice as random_choice
from faker import Faker

from datetime import time

with app.app_context():

    fake = Faker()

    def format_phone(raw_phone):
        return f"({raw_phone[0:3]}) {raw_phone[3:6]}-{raw_phone[6:]}"

    custom_specialties = ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic Surgeon', 'Neurologist', 'Gynecologist', 'Ophthalmologist', 'General Practitioner', 'Urologist', 'ENT', 'Plastic Surgeon']
    specialty_addresses = {
        'Cardiologist': '123 Main St, Anytown, USA',
        'Dermatologist': '456 Oak St, Anytown, USA',
        'Pediatrician': '789 Pine St, Anytown, USA',
        'Orthopedic Surgeon': '321 Elm St, Anytown, USA',
        'Neurologist': '654 Maple St, Anytown, USA',
        'Gynecologist': '987 Cedar St, Anytown, USA',
        'Ophthalmologist': '159 Birch St, Anytown, USA',
        'General Practitioner': '753 Spruce St, Anytown, USA',
        'Urologist': '246 Oak St, Anytown, USA',
        'ENT': '369 Pine St, Anytown, USA',
        'Plastic Surgeon': '159 Birch St, Anytown, USA',
    }
    db.session.query(Patient).delete()
    patients = []

    for n in range(100):
        email = fake.email()
        while Patient.query.filter_by(email=email).first() is not None:
            email = fake.email()
        raw_phone = fake.numerify(text='##########')
        formatted_phone = format_phone(raw_phone)
        
        patient = Patient(
            name=fake.name(),
            email=email,
            phone=formatted_phone,
            address=fake.address(),
            password=fake.password()
        )
        patients.append(patient)

    db.session.query(Doctor).delete()
    doctors = []

    for n in range(75):
        specialty = random_choice(custom_specialties)
        email = fake.email()
        while Doctor.query.filter_by(email=email).first() is not None:
            email = fake.email()
        raw_phone = fake.numerify(text='##########')
        formatted_phone = format_phone(raw_phone)

        doctor = Doctor(
            name=fake.name(),
            email=email,
            phone=formatted_phone,
            specialty=specialty,
            address=specialty_addresses[specialty], 
        )
        doctors.append(doctor)

    db.session.add_all(patients)
    db.session.add_all(doctors)

    users = []

    for n in range(30):
        email = fake.email()
        while User.query.filter_by(email=email).first() is not None:
            email = fake.email()
        raw_password = fake.password()
        
        user = User(
            email=email,
            password=raw_password,
            admin=fake.boolean(chance_of_getting_true=20) 
        )
        users.append(user)

    db.session.query(User).delete()
    db.session.add_all(users)
    

    appointments = []

    for n in range(50):
        patient = random_choice(Patient.query.all())
        doctor = random_choice(doctors)
        date = fake.date_between(start_date='today', end_date='+30d')

        time_obj = time(fake.random_int(0, 23), fake.random_int(0, 59), fake.random_int(0, 59))


        appointment = Appointment(
            patient_id=patient.id,
            doctor_id=doctor.id,
            doctor_address=doctor.address,
            date=date,
            time=time_obj,
        )
        appointments.append(appointment)

    try:
        db.session.add_all(appointments)
        db.session.commit()
    except IntegrityError:
        
        db.session.rollback()

