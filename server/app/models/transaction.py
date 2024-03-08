from sqlalchemy import func

from app.extensions import db


class Transaction(db.Model):
    """
    Represents a transaction within the library system.

    Attributes:
        id (Integer): Unique identifier for the transaction.
        member_id (Integer): Foreign key referencing the ID of the member involved in the transaction.
        book_id (Integer): Foreign key referencing the ID of the book involved in the transaction.
        total (Float): Total amount for the transaction.
        amount_paid (Float): Amount paid for the transaction.
        per_day_fee (Float): Fee charged per day for borrowing the book.
        borrowed_date (TIMESTAMP): Date and time when the book was borrowed.
        returned_date (TIMESTAMP): Date and time when the book was returned, nullable.

    Methods:
        to_dict(): Converts the Transaction object into a dictionary.
        __repr__(): String representation of the Transaction object.
    """
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id", ondelete='SET NULL'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id", ondelete='SET NULL'), nullable=False)
    total = db.Column(db.Float)
    amount_paid = db.Column(db.Float)
    per_day_fee = db.Column(db.Float, nullable=False)
    borrowed_date = db.Column(db.TIMESTAMP, default=func.now())
    returned_date = db.Column(db.TIMESTAMP, nullable=True)

    # member = db.relationship("Member", backref="transactions")
    # book = db.relationship("Book", backref="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "member_id": self.member_id,
            "book_id": self.book_id,
            "total": self.total,
            "amount_paid": self.amount_paid,
            "per_day_fee": self.per_day_fee,
            "borrowed_date": self.borrowed_date,
            "returned_date": self.returned_date,
        }

    def __repr__(self):
        return f"<Transaction(id={self.id}, member_id={self.member_id}, book_id={self.book_id}, total={self.total}, bdate={self.borrowed_date})>"
