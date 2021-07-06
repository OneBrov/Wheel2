from django.urls import path, include, re_path
from .views import GenreView, GameList

urlpatterns = [
    path('genre/all/', GenreView.as_view()),
    re_path(r'^game*', GameList.as_view())
]
