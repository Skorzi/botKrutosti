from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class GradeListView(generics.ListCreateAPIView):
    serializer_class = GradeModelListSerializers
    
    def get_queryset(self):
        queryset = GradeModel.objects.order_by('-general')
        return queryset


class CreateLike(APIView):

    def get(self, request, format=None):
        queryset = LikeTable.objects.all()
        serializer = LikeSerializers(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        id_tg = request.data['data']['grade_form']['userName']
        userTelegram = request.data['data']['tg']['username']

        if not UserTelegram.objects.filter(id_tg=id_tg).exists():
            UserTelegram.objects.create(id_tg=id_tg, userName=userTelegram)

        tg_user = UserTelegram.objects.get(id_tg=id_tg)

        if tg_user.amount_likes > 0:
            data_form = request.data['data']['grade_form']
            grademodel = GradeModel.objects.get(id=data_form['for_model'])
            data = request.data.get('data').get('grade_form')
            data.update({"userName":tg_user.userName})
            data.update({"for_model":grademodel.name})
            serializer = LikeSerializers(data=data)
        else:
            data = {'data': 'недостатотчно баллов крутости'}
            return Response(data, status=status.HTTP_202_ACCEPTED)    

        if serializer.is_valid():
            grademodel.likes += 1
            grademodel.general = grademodel.likes - grademodel.dislikes
            tg_user.amount_likes -= 1
            tg_user.save()
            grademodel.save()
            print(grademodel.likes)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateDisLike(APIView):

    def get(self, request, format=None):
        queryset = DislikeTable.objects.all()
        serializer = DislikeSerializers(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        id_tg = request.data['data']['grade_form']['userName']
        userTelegram = request.data['data']['tg']['username']

        if not UserTelegram.objects.filter(id_tg=id_tg).exists():
            UserTelegram.objects.create(id_tg=id_tg, userName=userTelegram)

        tg_user = UserTelegram.objects.get(id_tg=id_tg)

        if tg_user.amount_dislikes > 0:
            data_form = request.data['data']['grade_form']
            grademodel = GradeModel.objects.get(id=data_form['for_model'])
            data = request.data.get('data').get('grade_form')
            data.update({"userName":tg_user.userName})
            data.update({"for_model":grademodel.name})
            serializer = DislikeSerializers(data=data)
        else:
            data = {'data': 'недостатотчно баллов говна'}
            return Response(data, status=status.HTTP_202_ACCEPTED)    

        if serializer.is_valid():
            grademodel.dislikes += 1
            grademodel.general = grademodel.likes - grademodel.dislikes
            tg_user.amount_dislikes -= 1
            tg_user.save()
            grademodel.save()
            print(grademodel.likes)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetTelegUser(generics.ListCreateAPIView):
    serializer_class = UserTelegramListSerializers
    def get_queryset(self):
        queryset = UserTelegram.objects.all()
        try:
            username = self.request.query_params.get('username')
            if username is not None:
                queryset = queryset.filter(userName=username)
            return queryset
        except Exception:
            pass


# def CatchLog(request):
#     data = json.loads(request.body.decode('utf-8'))
#     print(data['data']['id'])
#     if not UserTelegram.objects.filter(userName=data['data']['id']).exists():
#         UserTelegram.objects.create(id_tg=data['data']['id'],
#                                     userName=data['data']['tguser'])
#     else:
#         # pass
#         print(GradeModel.objects.all()[0].name)
    
#     return HttpResponse('ok')