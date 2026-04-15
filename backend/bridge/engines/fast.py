from bridge.engines.engine import Engine

class FastEngine(Engine):

    def run(self, amount, duration, risk):
        growth_rate = 0.01 + (risk * 0.02)

        history = []
        current = amount

        for day in range(duration):
            current += current * growth_rate

            history.append({
                "day": day + 1,
                "value": round(current, 2)
            })

        return current, history