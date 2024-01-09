"""added models

Revision ID: a9027579ee43
Revises: 7c43049cea6c
Create Date: 2024-01-08 17:22:37.783524

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9027579ee43'
down_revision = '7c43049cea6c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=80),
               nullable=True)
        batch_op.alter_column('phone',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=80),
               nullable=True)
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=80),
               nullable=True)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.create_foreign_key(batch_op.f('fk_reviews_doctor_name_doctors'), 'doctors', ['doctor_name'], ['name'])
        batch_op.create_foreign_key(batch_op.f('fk_reviews_patient_name_patients'), 'patients', ['patient_name'], ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_patient_name_patients'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_reviews_doctor_name_doctors'), type_='foreignkey')

    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('address',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.alter_column('phone',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###