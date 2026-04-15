from flask import Flask
from flask_cors import CORS
from flask_restx import Api

from routes.simulate import simulate_ns

app = Flask(__name__)
CORS(app)

# API RESTX
api = Api(
    app,
    title="InvestLab API",
    version="1.0",
    description="Investment simulation API using Bridge Pattern"
)

# registrar namespace
api.add_namespace(simulate_ns, path="/simulate")

if __name__ == "__main__":
    app.run(debug=True)