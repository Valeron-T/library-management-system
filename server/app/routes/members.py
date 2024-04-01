from datetime import datetime, timedelta

import sqlalchemy.exc
from flask import Blueprint, jsonify, request
from sqlalchemy import Date, cast, func

from app.extensions import db
from app.models.member import Member
from app.models.transaction import Transaction

bp = Blueprint('members', __name__)


@bp.route('/', methods=['GET'])
def get_members():
    """
    Retrieve all members from the database and return them as JSON.

    Returns:
        dict: A JSON object containing information about all members.
    """
    users = Member.query.all()
    return jsonify({'members': [user.to_dict() for user in users]})


@bp.route('/<int:member_id>', methods=['GET'])
def get_member(member_id):
    """
    Retrieve a member by their ID.

    Args:
        member_id (int): The ID of the member to retrieve.

    Returns:
        dict: A JSON object containing information about the requested member.
    """
    member = Member.query.get(member_id)
    if member:
        return jsonify({'member': member.to_dict()})
    else:
        return jsonify({'error': 'Member not found'}), 404


@bp.route('/', methods=['POST'])
def create_member():
    """
    Create a new member and add them to the database.

    Returns:
        dict: A JSON object containing a message about the member creation.
    """
    data = request.get_json()
    try:
        new_user = Member(name=data['name'], email=data['email'], phone=data['phone'], debt=data['debt'],
                          amount_spent=data['amount_spent'], reg_date=data['reg_date'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Member created successfully', 'user': new_user.to_dict()})
    except:
        return jsonify({'error': 'Unexpected Error occurred'}), 500


@bp.route('/<int:member_id>', methods=['PUT'])
def update_user(member_id):
    """
    Update information about a member.

    Args:
        member_id (int): The ID of the member to update.

    Returns:
        dict: A JSON object containing a message about the update process.
    """
    user = Member.query.get(member_id)
    if user:
        data = request.get_json()
        db.session.query(Member).filter(Member.id == member_id).update(data)
        db.session.commit()
        return jsonify({'message': 'Data updated successfully'})
    else:
        return jsonify({'error': 'Member not found'}), 404


@bp.route('/<int:member_id>', methods=['DELETE'])
def delete_user(member_id):
    """
    Delete a member from the database.

    Args:
        member_id (int): The ID of the member to delete.

    Returns:
        dict: A JSON object containing a message about the deletion process.
    """
    user = Member.query.get(member_id)
    if user:
        if int(user.to_dict()['debt']) > 0:
            return jsonify({'error': 'Member has debt'})

        borrowed_books = len(db.session.query(Transaction).filter((Transaction.member_id == member_id) & (Transaction.returned_date.is_(None))).all())
        if borrowed_books > 0:
            return jsonify({"error": "Member cannot be deleted. Ensure all borrowed books were returned"})

        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'Member deleted successfully'})
    else:
        return jsonify({'error': 'Member not found'}), 404


@bp.route('/latest/<int:time_in_days>', methods=['GET'])
def fetch_latest_members(time_in_days):
    """
    Retrieve the count of members registered within the specified time period.

    Args:
        time_in_days (int): The number of days to look back for member registrations.

    Returns:
        dict: A JSON object containing the count of members registered each day within the specified time period.
    """
    duration = datetime.now() - timedelta(days=time_in_days)
    members = db.session.query(cast(Member.reg_date, Date), func.count(cast(Member.reg_date, Date))).filter(cast(Member.reg_date, Date) >= duration).group_by(cast(Member.reg_date, Date)).all()
    return jsonify({'members': [{"date": date.strftime("%d-%m-%y"), "count": count} for date, count in members]})


@bp.route('/new', methods=['GET'])
def get_new_members():
    """
    Retrieve all members from the database and return them as JSON.

    Returns:
        dict: A JSON object containing information about all members.
    """
    users = db.session.query(Member.id, Member.name, Member.email, Member.amount_spent).order_by(Member.reg_date.desc()).limit(5).all()

    results = [{"id": result[0], "name": result[1], "email": result[2], "spending": result[3]} for result in users]

    return jsonify({'result': results})