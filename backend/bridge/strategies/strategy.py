from abc import ABC, abstractmethod

class Strategy(ABC):

    @abstractmethod
    def execute(self, engine, amount, duration):
        pass
