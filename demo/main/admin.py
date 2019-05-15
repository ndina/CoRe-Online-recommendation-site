from django.contrib import admin
from main.models import Category, Product, Comment
from django.contrib.auth.models import User


# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Comment)



