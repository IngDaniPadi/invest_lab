from flask_restx import Namespace, Resource, fields
from api.simulate_service import service


simulate_ns = Namespace("simulate", description="Simulation operations")

# DTO (lo que recibe el endpoint)
simulation_model = simulate_ns.model("Simulation", {
    "strategy": fields.String(required=True),
    "engine": fields.String(required=True),
    "amount": fields.Float(required=True),
    "duration": fields.Integer(required=True)
})


@simulate_ns.route("")
class Simulate(Resource):

    @simulate_ns.expect(simulation_model)
    def post(self):

        data = simulate_ns.payload

        try:
            result = service.simulate(
                strategy_name=data["strategy"],
                engine_name=data["engine"],
                amount=data["amount"],
                duration=data["duration"]
            )

            return {
                "success": True,
                "data": result
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }, 400