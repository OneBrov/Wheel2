from django.shortcuts import render
from rest_framework import generics
from .models import Genre, Game
from .serializers import GenreSerializer, GameSerializer
from django.db.models import Q

# Create your views here.
class GenreView(generics.ListAPIView):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class GameList(generics.ListAPIView):
	serializer_class = GameSerializer
	
	
	def get_queryset(self):
		queryset = Game.objects.all()
		count_games = self.request.query_params.get('countgames')
		price_more  = self.request.query_params.get('pricemore')
		price_less  = self.request.query_params.get('priceless')
		# Multi-field search
		print(count_games, price_more, price_less)
		if not count_games :
			count_games = 3
		else:
			count_games = int(count_games)

		if not price_more :
			price_more = 3
		else:
			price_more = int(price_more)

		if not price_less :
			price_less = 3
		else:
			price_less = int(price_less)
			
		myqueryset = queryset.order_by('?')[:count_games]	
	
	
		# if price_less:
		# 	price_less = int(price_less)
		# 	query.add(Q(ru_price__lte=price_less))
		# if price_more:
		# 	price_more = int(price_more)
		# 	query.add(Q(ru_price__gte=price_more))
		return myqueryset





