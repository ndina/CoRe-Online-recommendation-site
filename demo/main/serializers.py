from django.contrib.auth.models import User
from rest_framework import serializers

from main.models import Category, Comment, Product


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class CategorySerializer(serializers.ModelSerializer):
    """Short form used by the category list and inside products."""

    class Meta:
        model = Category
        fields = ("id", "name", "description")


class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "description", "created_at", "created_by")
        read_only_fields = ("created_at", "created_by")


class ProductSerializer(serializers.ModelSerializer):
    product_list = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("id", "name", "description", "image", "created_at", "product_list")
        read_only_fields = ("image", "created_at")


class CommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=400)
    rating = serializers.IntegerField(min_value=1, max_value=10)

    class Meta:
        model = Comment
        fields = ("id", "name", "content", "rating", "product", "created_by")
        # Both are filled in by the view: the product from the URL,
        # the author from the logged-in user.
        read_only_fields = ("product", "created_by")
