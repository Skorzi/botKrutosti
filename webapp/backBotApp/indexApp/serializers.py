from rest_framework import serializers
from .models import GradeModel, LikeTable, DislikeTable, UserTelegram

class GradeModelListSerializers(serializers.ModelSerializer):
    class Meta:
        model = GradeModel
        fields = ('id', 'name', 'photo', 'likes', 'dislikes', 'general')

class LikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = LikeTable
        fields = ('userName', 'for_model', 'reason', 'description')

class DislikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = DislikeTable
        fields = ('userName', 'for_model', 'reason', 'description')

class UserTelegramListSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserTelegram
        fields = ('userName', 'amount_likes', 'amount_dislikes')


