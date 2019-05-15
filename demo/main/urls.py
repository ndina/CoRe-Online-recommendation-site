from django.urls import path
from main import views


urlpatterns = [
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('categories/<int:pk>/products/', views.category_product),
    path('login/', views.login),
    path('logout/', views.logout),
    path('users/create/', views.UserCreate.as_view()),
    path('users/', views.UserList.as_view()),
    path('products/<int:pk>/comments/', views.CommentList.as_view()),
    path('', views.index)

]