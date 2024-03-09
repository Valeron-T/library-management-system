from datetime import datetime, timedelta
import sqlalchemy.types
from flask import Blueprint, jsonify, request
from sqlalchemy import func, cast, Date
from app.extensions import db
from app.models.transaction import Transaction
from app.models.member import Member
from app.models.book import Book

bp = Blueprint('transactions', __name__)


@bp.route('/', methods=['GET'])
def get_transactions():
    """
    Retrieve all transactions from the database and return them as JSON.

    Returns:
        dict: A JSON object containing information about all transactions.
    """
    transactions = Transaction.query.all()
    return jsonify({'transactions': [transaction.to_dict() for transaction in transactions]})


@bp.route('/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    """
    Retrieve a transaction by its ID.

    Args:
        transaction_id (int): The ID of the transaction to retrieve.

    Returns:
        dict: A JSON object containing information about the requested transaction.
    """
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        return jsonify({'transaction': transaction.to_dict()})
    else:
        return jsonify({'error': 'Transaction not found'}), 404


@bp.route('/', methods=['POST'])
def issue_book():
    """
    Issue a book to a member.

    Returns:
        dict: A JSON object containing a message about the issue process.
    """
    data = request.get_json()
    transaction = Transaction(member_id=data['member_id'], book_id=data['book_id'], per_day_fee=data['per_day_fee'],
                              borrowed_date=data['borrowed_date'])

    member = Member.query.get(data['member_id'])
    current_debt = int(member.to_dict()['debt'])

    # If debt limit exceeded, raise error.
    if current_debt > 500:
        return jsonify({"error": "Debt limit exceeded"})

    book = Book.query.get(data['book_id'])
    book_stock = int(book.to_dict()['available_qty'])

    # Check book stock before issuing book
    if book_stock < 1:
        return jsonify({"error": "Book out of stock"})

    db.session.query(Book).filter(Book.id == data['book_id']).update(
        {'available_qty': Book.available_qty - 1, 'currently_rented': Book.currently_rented + 1})
    db.session.add(transaction)
    db.session.commit()
    return jsonify({'message': 'Book Issued successfully'})


@bp.route('/<int:transaction_id>/return', methods=['PUT'])
def return_book(transaction_id):
    """
    Return a borrowed book.

    Args:
        transaction_id (int): The ID of the transaction associated with the returned book.

    Returns:
        dict: A JSON object containing a message about the return process.
    """
    transaction = Transaction.query.get(transaction_id)

    if transaction:
        data = request.get_json()

        debt = int(data['total']) - int(data['amount_paid'])

        db.session.query(Member).filter(Member.id == data['member_id']).update(
            {'debt': Member.debt + debt, 'amount_spent': Member.amount_spent + int(data['total'])})
        db.session.query(Book).filter(Book.id == data['book_id']).update(
            {'available_qty': Book.available_qty + 1, 'currently_rented': Book.currently_rented - 1})
        db.session.query(Transaction).filter(Transaction.id == transaction_id).update(data)
        db.session.commit()
        return jsonify({'message': 'Return recorded successfully'})
    else:
        return jsonify({'error': 'Transaction not found'}), 404


@bp.route('/latest/<int:time_in_days>', methods=['GET'])
def fetch_latest_transactions(time_in_days):
    """
    Retrieve the latest transactions within a specified time frame.

    Args:
        time_in_days (int): The number of days to look back for transactions.

    Returns:
        dict: A JSON object containing information about the latest transactions.
    """
    duration = datetime.now() - timedelta(days=time_in_days)
    transactions = db.session.query(cast(Transaction.borrowed_date, Date),
                                    func.count(cast(Transaction.borrowed_date, Date))).filter(
        cast(Transaction.borrowed_date, Date) >= duration).group_by(cast(Transaction.borrowed_date, Date)).all()
    return jsonify(
        {'transactions': [{"date": date.strftime("%d-%m-%y"), "count": count} for date, count in transactions]})


@bp.route('/avg-days-book-held', methods=['GET'])
def get_avg_days_book_held():
    """
    Calculate the average number of days a book is held by members.

    Returns:
        dict: A JSON object containing the average days book held.
    """
    average_days_held = (
        db.session.query(
            Book.title,
            func.avg(func.DATEDIFF(Transaction.returned_date, Transaction.borrowed_date)).label('average_days_held')
        ).join(Book).filter(Transaction.book_id.isnot(None), Transaction.returned_date.isnot(None))
        .group_by(Transaction.book_id)
        .having(func.avg(func.DATEDIFF(Transaction.returned_date, Transaction.borrowed_date)) > 0)
        .all()
    )

    print(average_days_held)

    results = [{"book_id": result.title, "average_days_held": result.average_days_held} for result in
               average_days_held]

    return jsonify({"result": results})
