"""Added Tables&Models

Revision ID: 400811e213d2
Revises: 
Create Date: 2024-01-11 17:10:59.020028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '400811e213d2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('specialty', sa.String(length=80), nullable=True),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=80), nullable=True),
    sa.Column('phone', sa.String(length=80), nullable=True),
    sa.Column('address', sa.String(length=80), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('doctor_id', sa.Integer(), nullable=True),
    sa.Column('doctor_address', sa.String(length=120), nullable=False),
    sa.Column('doctor_name', sa.String(length=80), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], name=op.f('fk_appointments_doctor_id_doctors')),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], name=op.f('fk_appointments_patient_id_patients')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], name=op.f('fk_reviews_doctor_id_doctors')),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], name=op.f('fk_reviews_patient_id_patients')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('appointments')
    op.drop_table('patients')
    op.drop_table('doctors')
    # ### end Alembic commands ###
