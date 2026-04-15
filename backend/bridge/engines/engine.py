from abc import ABC, abstractmethod

class Engine(ABC):

    @abstractmethod
    def run(self, amount, duration, risk):
        pass