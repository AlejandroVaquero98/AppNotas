from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        #fields = ('id','title','description','done')
        fields = '__all__' #selec todos los campos 