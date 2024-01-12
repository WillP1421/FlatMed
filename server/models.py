from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    admin = db.Column(db.Boolean, default=False)

    def to_dict(self, only=None):
        """Convert the user object to a dictionary."""
        if only is None:
            return {
                'id': self.id,
                'email': self.email,
                'admin': self.admin
            }
        return {field: getattr(self, field) for field in only}

    def __repr__(self):
        return f"User('{self.email}', admin={self.admin})"

class Patient(db.Model, SerializerMixin):
    __tablename__ = "patients"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(80))
    phone = db.Column(db.String(80)) 
    address = db.Column(db.String(80))
    password = db.Column(db.String(80))

    appointments = db.relationship("Appointment", back_populates="patient")
    reviews = db.relationship("Review", back_populates="patient")

    @validates('phone')
    def validate_phone(self, attr, value):
        if len(value) < 10:
            raise AssertionError
        else:
            return value

    def __repr__(self):
        return f"Patient('{self.name}', '{self.email}', '{self.phone}', '{self.address}', '{self.password}')"
    

class Doctor(db.Model, SerializerMixin):
    __tablename__ = "doctors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    specialty = db.Column(db.String(80))
    address = db.Column(db.String(120))

    appointments = db.relationship("Appointment", back_populates="doctor")
    reviews = db.relationship("Review", back_populates="doctor")

    @validates('phone')
    def validate_phone(self, attr, value):
        if len(value) < 10:
            raise AssertionError
        else:
            return value

    def __repr__(self):
        return f"Doctor('{self.name}', '{self.email}', '{self.phone}', '{self.specialty}', '{self.address}')"

    
class Appointment(db.Model, SerializerMixin):
    __tablename__ = "appointments"
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"))
    doctor_address = db.Column(db.String(120), nullable=False)
    doctor_name = db.Column(db.String(80),default="Dr. Unknown", nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)

    patient = db.relationship("Patient", back_populates="appointments")
    doctor = db.relationship("Doctor", back_populates="appointments")

    def __repr__(self):
        return f"Appointment('{self.patient_id}', '{self.doctor_id}','{self.doctor_address}', '{self.date}', '{self.time}')"
    

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)

    patient = db.relationship("Patient", back_populates="reviews")
    doctor = db.relationship("Doctor", back_populates="reviews")

    def __repr__(self):
        return f"Review('{self.patient_id}', '{self.doctor_id}', '{self.rating}', '{self.comment}')"
