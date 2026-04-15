from bridge.strategies.agressive import AggressiveStrategy
from bridge.strategies.conservative import ConservativeStrategy
from bridge.strategies.balanced import BalancedStrategy

from bridge.engines.fast import FastEngine
from bridge.engines.realistic import RealisticEngine


class SimulationService:

    def get_strategy(self, name):
        strategies = {
            "aggressive": AggressiveStrategy(),
            "conservative": ConservativeStrategy(),
            "balanced": BalancedStrategy()
        }

        if name not in strategies:
            raise ValueError(f"Invalid strategy: {name}")

        return strategies[name]

    def get_engine(self, name):
        engines = {
            "fast": FastEngine(),
            "realistic": RealisticEngine()
        }

        if name not in engines:
            raise ValueError(f"Invalid engine: {name}")

        return engines[name]

    def simulate(self, strategy_name, engine_name, amount, duration):

        strategy = self.get_strategy(strategy_name)
        engine = self.get_engine(engine_name)

        final_amount, history = strategy.execute(engine, amount, duration)

        profit = final_amount - amount

        return {
            "initial_amount": amount,
            "final_amount": round(final_amount, 2),
            "profit": round(profit, 2),
            "profit_percentage": round((profit / amount) * 100, 2),
            "history": history
        }