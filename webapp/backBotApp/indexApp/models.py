from django.db import models
from django.utils.safestring import mark_safe


class GradeModel(models.Model):
    name = models.CharField(max_length=64, unique=True)
    photo = models.ImageField(upload_to='photoUser', blank=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    general = models.IntegerField(default=0)
    def image_show(self):
        if self.photo:
            print(f'{self.photo.url} printed')
            return mark_safe(u'<img src="{0}" width="100"/>'.format(self.photo.url))
        else:
            return '(Нет изображения)'

    image_show.short_description = 'PHOTO_show'
    image_show.allow_tags = True

class UserTelegram(models.Model):
    id_tg = models.CharField(max_length=64, unique=True, default=None)
    userName = models.TextField(unique=True)
    amount_likes = models.IntegerField(default=6)
    amount_dislikes = models.IntegerField(default=2)

class DislikeTable(models.Model):
    userName = models.ForeignKey(UserTelegram,
                on_delete=models.CASCADE, default=None, to_field='userName')
    for_model = models.ForeignKey(GradeModel,
                                 on_delete=models.CASCADE,to_field='name', default=None)
                                    
    reason = models.CharField(max_length=32)
    description = models.CharField(max_length=200)



class LikeTable(models.Model):
    userName = models.ForeignKey(UserTelegram,
                on_delete=models.CASCADE, default=None, to_field='userName')
    for_model = models.ForeignKey('GradeModel', on_delete=models.CASCADE,
                                to_field='name', default=None)
    reason = models.CharField(max_length=32)
    description = models.CharField(max_length=200)
    



