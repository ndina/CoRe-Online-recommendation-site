from rest_framework import serializers
from django.contrib.auth.models import User
from main.models import Category, Product, Comment
from django.db import models



class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)

    def create(self, validated_data):
        category = Category(**validated_data)
        category.save()
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email' )

class CategorySerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'created_by')
        # fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required=True)
    image = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True)
    product_list = CategorySerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'image', 'created_at', 'product_list', 'created_by',)


class CommentSerializer(serializers.ModelSerializer):
    name=serializers.CharField(max_length=100)
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(max_length=400, required=True)
    product = ProductSerializer(required=True),
    created_by = UserSerializer(read_only=True),
    rating = serializers.IntegerField(required=True)

    def create(self, validated_data):
        comment = Comment(**validated_data)
        comment.save()
        return comment

    class Meta:
        model = Comment
        fields = ('name','id', 'content', 'product', 'created_by', 'rating')

class CommentSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(max_length=400, required=True)
    product = ProductSerializer(required=True),
    created_by = UserSerializer(read_only=True),
    created_by_id = serializers.IntegerField(required=True)
    rating = serializers.IntegerField(required=True)

    class Meta:
        model = Comment
        fields = '__all__'




