from django.shortcuts import render
from indexApp.models import *
from django.views import generic
from django.http import JsonResponse

class DelView(generic.View):
    def post(self, request):
        # print(len(GradeModel.objects.all()))
        for grademodel in GradeModel.objects.all():
            grademodel.likes = 0
            grademodel.dislikes = 0
            grademodel.general = 0
            grademodel.save()
        for tguser in UserTelegram.objects.all():
            tguser.amount_likes = 6
            tguser.amount_dislikes = 2
            tguser.save()
        LikeTable.objects.all().delete()
        DislikeTable.objects.all().delete()

        response = JsonResponse({"OK": "true"})

        return response


    def get(self, request):
        pass

