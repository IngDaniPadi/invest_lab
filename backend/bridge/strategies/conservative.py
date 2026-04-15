from bridge.strategies.strategy import Strategy

class ConservativeStrategy(Strategy):

    def execute(self, engine, amount, duration):
        risk = 0.2
        return engine.run(amount, duration, risk)