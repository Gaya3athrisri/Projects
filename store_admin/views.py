from django.shortcuts import render


def index(request):
    return render(request, 'store_admin/index.html')




def product_list(request):
    # htmx partial — returns just the fragment
    return render(request, 'store_admin/partials/product_list.html')