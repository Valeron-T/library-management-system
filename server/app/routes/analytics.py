from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request
from sqlalchemy import func, cast, Date
from app.extensions import db
from app.models.transaction import Transaction
from app.models.member import Member
from app.models.book import Book

bp = Blueprint('analytics', __name__)


@bp.route('/members/<int:time_in_days>', methods=['GET'])
def fetch_new_member_count(time_in_days):

    duration = datetime.now() - timedelta(days=time_in_days)
    query_result = db.session.query(func.count(Member.id).label("new_members_count")) \
        .filter(Member.reg_date >= duration) \
        .scalar()

    return jsonify({'result': query_result})


@bp.route('/books/borrowed/<int:time_in_days>', methods=['GET'])
def fetch_bor_books_count(time_in_days):

    duration = datetime.now() - timedelta(days=time_in_days)
    query_result = db.session.query(func.count(Transaction.id)) \
        .filter(Transaction.borrowed_date >= duration) \
        .scalar()

    return jsonify({'result': query_result})


@bp.route('/books/returned/<int:time_in_days>', methods=['GET'])
def fetch_ret_books_count(time_in_days):

    duration = datetime.now() - timedelta(days=time_in_days)
    query_result = db.session.query(func.count(Transaction.id)) \
        .filter(Transaction.returned_date >= duration) \
        .scalar()

    return jsonify({'result': query_result})


@bp.route('/revenue/<int:time_in_days>', methods=['GET'])
def fetch_revenue(time_in_days):

    duration = datetime.now() - timedelta(days=time_in_days)
    query_result = db.session.query(func.sum(Transaction.total).label("total_amount_spent")) \
        .filter(Transaction.returned_date >= duration) \
        .scalar()

    if query_result is None:
        query_result = 0

    return jsonify({'result': query_result})
