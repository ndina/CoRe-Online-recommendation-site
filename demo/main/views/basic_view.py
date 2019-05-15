from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from main.models import Category
from main.serializers import CategorySerializer, ProductSerializer


from rest_framework import status
from main.fitler import ProductFilter



# Create your views here.

@csrf_exempt
# The CSRF middleware and template tag provides easy-to-use protection against Cross Site Request Forgeries.(e.g malicious link)

def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors)

@csrf_exempt
def category_product(request, pk):
    try:
        category = Category.objects.get(id=pk)
    except Category.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    products = category.product_set.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)





