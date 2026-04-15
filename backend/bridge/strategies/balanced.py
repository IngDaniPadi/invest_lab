from bridge.strategies.strategy import Strategy

class BalancedStrategy(Strategy):

    def execute(self, engine, amount, duration):
        risk = 0.5
        return engine.run(amount, duration, risk)