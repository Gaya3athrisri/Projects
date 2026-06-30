from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='store_admin_index'),
    path('products/', views.product_list, name='product_list'),
]