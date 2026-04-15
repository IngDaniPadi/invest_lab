import random
from bridge.engines.engine import Engine


class RealisticEngine(Engine):

    def run(self, amount, duration, risk):
        history = []
        current = amount

        for day in range(duration):
            change = random.uniform(-risk, risk) * 0.05
            current += current * change

            history.append({
                "day": day + 1,
                "value": round(current, 2)
            })

        return current, history