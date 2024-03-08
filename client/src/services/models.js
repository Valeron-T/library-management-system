// Models for various items

export const MemberModel = {
    name: '',
    email: '',
    phone: '',
    debt: 0,
    amount_spent: 0,
    reg_date: ''
}

export const BookModel = {
    'title': '',
    'author': '',
    'average_rating': '',
    'isbn': '',
    'isbn13': '',
    'language_code': '',
    'num_pages': '',
    'ratings_count': '',
    'text_reviews_count': '',
    'publication_date': '',
    'publisher': '',
    'total_qty': 1,
    'available_qty': 1,
    'currently_rented': 0,
}

export const ImportModel = {
    'title':"",
    'author': '',
    'isbn': '',
    'publisher': '',
    'quantity':""
}

export const TransactionModel = {
    'member_id':'',
    'book_id':'',
    'total':0,
    'amount_paid':0,
    'per_day_fee':0,
    'borrowed_date':'',
    'returned_date':'',
}