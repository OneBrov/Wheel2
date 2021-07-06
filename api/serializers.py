from rest_framework import serializers
from .models import Genre, Game


class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre
		fields = ('__all__')


class GameSerializer(serializers.ModelSerializer):
	genres = serializers.StringRelatedField(many=True)
	languages = serializers.StringRelatedField(many=True)
	tags = serializers.StringRelatedField(many=True)
	developer = serializers.StringRelatedField(many=False)
	publisher = serializers.StringRelatedField(many=False)
	time_unit = serializers.StringRelatedField(many=False)
	label = serializers.StringRelatedField(many=False)

	class Meta:
		model = Game

		fields = ('__all__')