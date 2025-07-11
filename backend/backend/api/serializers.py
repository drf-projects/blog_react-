from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from api  import models as api_models
import random
import string
from api.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        token['full_name']=user.full_name
        token['email']=user.email
        token['username']=user.username
        return token
    
  
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = api_models.User
        fields = ['full_name', 'email', 'password', 'password2']

    def validate(self, attr):
        if attr['password'] != attr['password2']:
            raise serializers.ValidationError({'password': "Password fields didn't match"})
        return attr

    @staticmethod
    def generate_unique_username(base):
        while True:
            random_suffix = ''.join(random.choices(string.digits, k=4))
            username = f"{base}_{random_suffix}"
            if not api_models.User.objects.filter(username=username).exists():
                return username

    def create(self, validated_data):
        validated_data.pop('password2')  
        email_username = validated_data['email'].split('@')[0]
        unique_username = self.generate_unique_username(email_username)

        user = api_models.User(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            username=unique_username
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.User
        fields="__all__"
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=api_models.Profile
        fields="__all__"
        

class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    
    def get_post_count(self, category):
        return category.posts.count()
    
    class Meta:
        model=api_models.Category
        fields=["id","title","Image","slug","post_count"]
        
    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=api_models.Comment
        fields="__all__"
        
    def __init__(self,*args,**kwargs):
        super(CommentSerializer,self).__init__(*args,**kwargs)
        request=self.context.get("request")
        if request and request.method=="POST":
            self.Meta.depth=0
        else:
            self.Meta.depth=1
            
            
class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    class Meta:
        model=api_models.Post
        fields="__all__"
    
    def __init__(self,*args,**kwargs):
        super(PostSerializer,self).__init__(*args,**kwargs)
        request=self.context.get("request")
        if request and request.method=='POST':
            self.Meta.depth=0
        else:
            self.Meta.depth=1

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model=api_models.Bookmark
        fields="__all__"
        
    def __init__(self,*args,**kwargs):
        super(BookmarkSerializer,self).__init__(*args,**kwargs)
        request=self.context.get("request")
        if request and request.method=='POST':
            self.Meta.depth=0
        else:
            self.Meta.depth=1
            
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=api_models.Notification
        fields="__all__"
        
    def __init__(self,*args,**kwargs):
        super(NotificationSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        if request and request.method=='POST':
            self.Meta.depth=0
        else:
            self.Meta.depth=1
            
class AuthorSerializer(serializers.Serializer):
    views=serializers.IntegerField(default=0)
    posts=serializers.IntegerField(default=0)
    likes=serializers.IntegerField(default=0)
    bookmarks=serializers.IntegerField(default=0)