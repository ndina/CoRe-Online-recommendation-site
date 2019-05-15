from main.models import Category, Comment, Product
from main.serializers import CategorySerializer,CategorySerializer2, CommentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2


class CommentList(generics.ListCreateAPIView):

    serializer_class = CommentSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ("name",)
    def get_queryset(self):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
        except:
            raise Http404

        return Comment.objects.product_filter(product=product)
        #
        # name = self.request.query_params.get('name', None)
        # if name is not None:
        #     queryset=queryset.filter(name=name)
        # return queryset


    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)




