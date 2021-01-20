from django.db import models
from django.db.models import fields
from django.db.models.fields import Field
from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description')