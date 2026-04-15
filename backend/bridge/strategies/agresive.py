from bridge.strategies.strategy import Strategy

class AggressiveStrategy(Strategy):

    def execute(self, engine, amount, duration):
        risk = 0.9
        return engine.run(amount, duration, risk)