from django.db import models

class Crypto(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    last_price = models.DecimalField(max_digits=10, decimal_places=2)
    change_percent = models.DecimalField(max_digits=5, decimal_places=2)
    volume = models.BigIntegerField()
    high = models.DecimalField(max_digits=10, decimal_places=2)
    low = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.symbol
