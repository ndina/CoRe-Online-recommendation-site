from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from main.filters import ProductFilter
from main.models import Category, Comment, Product
from main.serializers import (
    CategoryDetailSerializer,
    CategorySerializer,
    CommentSerializer,
    ProductSerializer,
)


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("id")
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, created_at=timezone.now())


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CategoryProducts(generics.ListAPIView):
    """Products of one category. Supports ?name=... search."""

    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get_queryset(self):
        category = get_object_or_404(Category, pk=self.kwargs["pk"])
        return Product.objects.filter(product_list=category).order_by("id")


class CommentList(generics.ListCreateAPIView):
    """Reviews of one product. Anyone can read them; you must be logged in to write one."""

    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filterset_fields = ("name",)

    def get_product(self):
        return get_object_or_404(Product, pk=self.kwargs["pk"])

    def get_queryset(self):
        return Comment.objects.product_filter(product=self.get_product()).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(product=self.get_product(), created_by=self.request.user)
