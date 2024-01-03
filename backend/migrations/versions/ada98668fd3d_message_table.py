"""Message Table

Revision ID: ada98668fd3d
Revises: f088ea4beb6f
Create Date: 2024-01-03 12:51:26.391277

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ada98668fd3d'
down_revision = 'f088ea4beb6f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('chats', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('sender_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('receiver_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('timestamp', sa.DateTime(), nullable=True))
        batch_op.drop_constraint('chats_name_key', type_='unique')
        batch_op.drop_constraint('chats_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['sender_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['receiver_id'], ['id'])
        batch_op.drop_column('name')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('chats', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=50), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('chats_user_id_fkey', 'users', ['user_id'], ['id'])
        batch_op.create_unique_constraint('chats_name_key', ['name'])
        batch_op.drop_column('timestamp')
        batch_op.drop_column('receiver_id')
        batch_op.drop_column('sender_id')
        batch_op.drop_column('content')

    # ### end Alembic commands ###
