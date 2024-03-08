from datetime import datetime
from math import ceil

import sqlalchemy.exc
from flask import Blueprint, jsonify, request
from sqlalchemy import cast, func
from app.extensions import db
from app.models.book import Book
from app.models.transaction import Transaction
import requests

bp = Blueprint('books', __name__)


def convert_date(date_str):
    """
    Convert a date string to the YYYY-MM-DD format.

    Args:
        date_str (str): Date string in the format "MM/DD/YYYY".

    Returns:
        str: Date string in the format "YYYY-MM-DD".
    """
    date_obj = datetime.strptime(date_str, "%m/%d/%Y")
    formatted_date = date_obj.strftime("%Y-%m-%d")
    return formatted_date


@bp.route('/', methods=['GET'])
def get_books():
    """
    Retrieve all books from the database and return them as JSON.

    Returns:
        dict: A JSON object containing information about all books.
    """
    books = Book.query.all()
    return jsonify({'books': [book.to_dict() for book in books]})


@bp.route('/import/preview', methods=['POST'])
def preview_imported_books():
    """
    Preview books to be imported from an external source.

    Returns:
        dict: A JSON object containing preview information about the imported books.
    """
    data = request.get_json()
    qty = int(data['quantity'])

    all_books = []

    pages = ceil(qty / 20)

    for x in range(pages):
        books = requests.get(f"https://frappe.io/api/method/frappe-library?page={x + 1}&title={data['title']}&authors={data['author']}&publisher={data['publisher']}&isbn={data['isbn']}").json()['message']
        all_books.extend(books)
        if len(books) < 20:
            break

    all_books = all_books[:qty]

    return jsonify({"books": all_books})


@bp.route('/import', methods=['POST'])
def add_imported_books():
    """
    Add imported books to the database.

    Returns:
        dict: A JSON object containing a message about the import process.
    """
    data = request.get_json()
    failed_imports = []
    message = 'Books imported successfully'
    try:
        for book in data['books']:
            try:
                new_book = Book(id=book['bookID'],
                                title=book['title'],
                                author=book['authors'],
                                average_rating=book['average_rating'],
                                isbn=book['isbn'],
                                isbn13=book['isbn13'],
                                language_code=book['language_code'],
                                num_pages=book['num_pages'],
                                ratings_count=book['ratings_count'],
                                text_reviews_count=book['text_reviews_count'],
                                publication_date=convert_date(book['publication_date']),
                                publisher=book['publisher'],
                                total_qty=book['total_qty'],
                                available_qty=book['total_qty'],
                                currently_rented=0)
                db.session.add(new_book)
                db.session.commit()
            except sqlalchemy.exc.IntegrityError:
                db.session.rollback()
                failed_imports.append(book)

        if len(failed_imports) > 0:
            message = f"{len(failed_imports)}/{len(data['books'])} failed to import (Duplicate ID)"

        return jsonify({'message': message, "failed_imports": failed_imports})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected Error occurred'}), 500


@bp.route('/', methods=['POST'])
def add_book():
    """
    Add a new book to the database.

    Returns:
        dict: A JSON object containing a message about the book addition.
    """
    data = request.get_json()
    try:
        new_book = Book(title=data['title'],
                        author=data['author'],
                        average_rating=data['average_rating'],
                        isbn=data['isbn'],
                        isbn13=data['isbn13'],
                        language_code=data['language_code'],
                        num_pages=data['num_pages'],
                        ratings_count=data['ratings_count'],
                        text_reviews_count=data['text_reviews_count'],
                        publication_date=data['publication_date'],
                        publisher=data['publisher'],
                        total_qty=data['total_qty'],
                        available_qty=data['available_qty'],
                        currently_rented=data['currently_rented'])
        db.session.add(new_book)
        db.session.commit()
        return jsonify({'message': 'Book created successfully', 'book': new_book.to_dict()})
    except:
        return jsonify({'error': 'Unexpected Error occurred'}), 500


@bp.route('/<int:book_id>', methods=['GET'])
def get_book(book_id):
    """
    Retrieve a book by its ID.

    Args:
        book_id (int): The ID of the book to retrieve.

    Returns:
        dict: A JSON object containing information about the requested book.
    """
    book = Book.query.get(book_id)
    if book:
        return jsonify({'book': book.to_dict()})
    else:
        return jsonify({'error': 'Book not found'}), 404


@bp.route('/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    """
    Update information about a book.

    Args:
        book_id (int): The ID of the book to update.

    Returns:
        dict: A JSON object containing a message about the update process.
    """
    book = Book.query.get(book_id)
    if book:
        data = request.get_json()
        db.session.query(Book).filter(Book.id == book_id).update(data)
        db.session.commit()
        return jsonify({'message': 'Data updated successfully'})
    else:
        return jsonify({'error': 'Book not found'}), 404


@bp.route('/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    """
    Delete a book from the database.

    Args:
        book_id (int): The ID of the book to delete.

    Returns:
        dict: A JSON object containing a message about the deletion process.
    """
    book = Book.query.get(book_id)
    if book:
        isRented = book.to_dict()['currently_rented']
        if isRented > 0:
            return jsonify({"error": "Book cannot be deleted. Ensure all borrowed books were returned"})

        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Book deleted successfully'})
    else:
        return jsonify({'error': 'Book not found'}), 404


@bp.route('/by/rating', methods=['GET'])
def get_books_quality():
    """
    Get the count of books for every rating.

    Returns:
        dict: A JSON object containing the count of books for every rating.
    """
    score_count = (
        db.session.query(
            cast(Book.average_rating, sqlalchemy.types.INTEGER).label('rating'),
            func.count(cast(Book.average_rating, sqlalchemy.types.INTEGER)).label('count')
        )
        .group_by(cast(Book.average_rating, sqlalchemy.types.INTEGER))
        .all()
    )

    results = [{"rating": result.rating, "count": result.count} for result in score_count]

    return jsonify({"result": results})