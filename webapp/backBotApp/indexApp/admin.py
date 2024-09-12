from django.contrib import admin
from .models import *

@admin.register(GradeModel)
class GradeModel(admin.ModelAdmin):
    list_display = [field.name for field in GradeModel._meta.get_fields()]
    list_display.remove('liketable')
    list_display.remove('disliketable')
    list_display.append('image_show')
    # list_display.append('liketable')

@admin.register(LikeTable)
class LikeTable(admin.ModelAdmin):
    list_display = [field.name for field in LikeTable._meta.get_fields()]

@admin.register(DislikeTable)
class DislikeTable(admin.ModelAdmin):
    list_display = [field.name for field in DislikeTable._meta.get_fields()]

@admin.register(UserTelegram)
class UserTelegram(admin.ModelAdmin):
    list_display = [field.name for field in UserTelegram._meta.get_fields()]
    list_display.remove('liketable')
    list_display.remove('disliketable')

