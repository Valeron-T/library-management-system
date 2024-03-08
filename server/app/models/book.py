from app.extensions import db


class Book(db.Model):
    """
    Represents a book within the library system.

    Attributes:
        id (Integer): Unique identifier for the book.
        title (String): Title of the book.
        author (String): Author of the book.
        average_rating (Float): Average rating of the book.
        isbn (String): International Standard Book Number (ISBN) of the book (10 digits).
        isbn13 (String): ISBN-13 of the book (13 digits).
        language_code (String): Language code of the book (ISO 639-2/B code).
        num_pages (Integer): Number of pages in the book.
        ratings_count (Integer): Total number of ratings for the book.
        text_reviews_count (Integer): Total number of text reviews for the book.
        publication_date (Date): Date of publication of the book.
        publisher (String): Publisher of the book.
        total_qty (Integer): Total quantity of the book available in the library.
        available_qty (Integer): Quantity of the book currently available for borrowing.
        currently_rented (Integer): Quantity of the book currently rented by members.

    Methods:
        to_dict(): Converts the Book object into a dictionary.
        __repr__(): String representation of the Book object.
    """

    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    average_rating = db.Column(db.Float)
    isbn = db.Column(db.String(10), nullable=False)
    isbn13 = db.Column(db.String(13), nullable=False)
    language_code = db.Column(db.String(3), nullable=False)
    num_pages = db.Column(db.Integer, nullable=False)
    ratings_count = db.Column(db.Integer, nullable=False)
    text_reviews_count = db.Column(db.Integer, nullable=False)
    publication_date = db.Column(db.Date, nullable=False)
    publisher = db.Column(db.String(255), nullable=False)
    total_qty = db.Column(db.Integer, nullable=False)
    available_qty = db.Column(db.Integer, nullable=False)
    currently_rented = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        """
        String representation of the Book object.

        Returns:
            str: A string representation of the Book object.
        """
        return f"<Book: {self.title} by {self.author}>"

    def to_dict(self):
        """
        Converts the Book object into a dictionary.

        Returns:
            dict: A dictionary containing book details.
        """
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'average_rating': self.average_rating,
            'isbn': self.isbn,
            'isbn13': self.isbn13,
            'language_code': self.language_code,
            'num_pages': self.num_pages,
            'ratings_count': self.ratings_count,
            'text_reviews_count': self.text_reviews_count,
            'publication_date': self.publication_date,
            'publisher': self.publisher,
            'total_qty': self.total_qty,
            'available_qty': self.available_qty,
            'currently_rented': self.currently_rented,
        }
