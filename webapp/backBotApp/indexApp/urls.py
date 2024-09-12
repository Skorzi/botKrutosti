from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *


urlpatterns = [
    path('modellist', GradeListView.as_view()),
    path('createlike', CreateLike.as_view()),
    # path('catchlog', CatchLog),
    path('createdislike', CreateDisLike.as_view()),
    path('getUserTg', GetTelegUser.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)