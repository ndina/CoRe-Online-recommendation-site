from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers



# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    description = models.CharField(max_length=400, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description":self.description,
            "created_at": self.created_at,
            "created_by":self.created_by
        }


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.CharField(max_length=200)
    created_at = models.DateTimeField(null=True)
    product_list = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class CommentManager(models.Manager):
    def product_filter(self, product):
        return self.filter(product=product)


class Comment(models.Model):
    name=models.CharField(max_length=100, blank=True, null=True)
    content = models.CharField(max_length=400)
    created_by=models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=1)
    rating = models.IntegerField(default=0)

    objects = CommentManager()

    def __str__(self):
        return '{}: {}'.format(self.id, self.content)
