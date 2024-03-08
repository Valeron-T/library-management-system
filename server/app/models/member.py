from app.extensions import db
from sqlalchemy.sql import func


class Member(db.Model):
    """
    Represents a member in the library system.

    Attributes:
        id (Integer): Unique identifier for the member.
        name (String): Name of the member.
        phone (String): Phone number of the member.
        email (String): Email address of the member.
        reg_date (TIMESTAMP): Registration date of the member.
        debt (Float): Debt amount of the member.
        amount_spent (Float): Total amount spent by the member.

    Methods:
        to_dict(): Converts the Member object into a dictionary.
    """

    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100), nullable=False)
    reg_date = db.Column(db.TIMESTAMP, default=func.now())
    debt = db.Column(db.FLOAT, nullable=False)
    amount_spent = db.Column(db.FLOAT, nullable=False)
    # children = db.relationship("Transaction", backref="members")

    def to_dict(self):
        """
        Converts the Member object into a dictionary.

        Returns:
            dict: A dictionary containing member details.
        """
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'reg_date': self.reg_date,
            'debt': self.debt,
            'amount_spent': self.amount_spent,
        }
