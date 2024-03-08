from flask import Flask
from flask_cors import CORS
from app.extensions import db
from config import Config


def create_app(config_class=Config):
    """
    Create and configure the Flask application.

    Args:
        config_class: Configuration class to use for the Flask app.

    Returns:
        Flask: The configured Flask application.
    """
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    db.init_app(app)

    # Register blueprints here
    from app.routes.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.routes.members import bp as members_bp
    app.register_blueprint(members_bp, url_prefix='/members')

    from app.routes.books import bp as books_bp
    app.register_blueprint(books_bp, url_prefix='/books')

    from app.routes.transactions import bp as transactions_bp
    app.register_blueprint(transactions_bp, url_prefix='/transactions')

    return app
