from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum
# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime

# Others
import json
import random

# Custom Imports
from api import serializers as api_serializer
from api import models as api_models



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=api_serializer.MyTokenObtainPairSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset=api_models.User.objects.all()
    permission_classes=[AllowAny]
    serializer_class=api_serializer.RegisterSerializer
    
    
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class=api_serializer.ProfileSerializer
    permission_classes=[AllowAny]
    
    def get_object(self):
        user_id=self.kwargs['user_id']
        user=api_models.User.objects.get(id=user_id)
        profile=api_models.Profile.objects.get(user=user)
        return profile

class CategoryListAPIView(generics.ListAPIView):
    serializer_class=api_serializer.CategorySerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        return api_models.Category.objects.all()
    
class PostCategoryListAPIView(generics.ListAPIView):
    serializer_class=api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        category_slug=self.kwargs['category_slug']
        category=api_models.Category.objects.get(slug=category_slug)
        return api_models.Post.objects.filter(category=category,status='Active')
    
class  PostListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        return api_models.Post.objects.filter(status='Active')
    

class PostDetailAPIView(generics.RetrieveAPIView):
    serializer_class=api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def get_object(self):
        slug=self.kwargs['slug']
        post=api_models.Post.objects.get(slug=slug,status="Active")
        post.view+=1
        post.save()
        return post
    
class LikePostAPIView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'post_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
    )
    def post(self,request):
        user_id=request.data['user_id']
        post_id=request.data['post_id']
        
        user=api_models.User.objects.get(id=user_id)
        post=api_models.Post.objects.get(id=post_id)
        
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'message':'Post Disliked'},status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            api_models.Notification.objects.create(
                user=post.user,
                post=post,
                type="Like"
            )
            return Response({"message":"Post Liked"},status=status.HTTP_201_CREATED)


class PostCommentAPIView(APIView):
    @swagger_auto_schema(
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'post_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'name': openapi.Schema(type=openapi.TYPE_STRING),
                    'email':openapi.Schema(type=openapi.TYPE_STRING),
                    'comment':openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
        )
   
    def post(self,request):
        post_id=request.data['post_id']
        name=request.data['name']
        email=request.data['email']
        comment=request.data['comment']
        
        post=api_models.Post.objects.get(id=post_id)
        
        api_models.Comment.objects.create(
            post=post,
            name=name,
            email=email,
            comment=comment
        )
        
        api_models.Notification.objects.create(
            user=post.user,
            post=post,
            type='Comment'
        )
        return Response({"message": "Comment posted successfully"}, status=status.HTTP_201_CREATED)

class BookmarkPostAPIView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_id':openapi.Schema(type=openapi.TYPE_INTEGER),
                'post_id':openapi.Schema(type=openapi.TYPE_INTEGER)
            }
        )
    )
    def post(self,request):
        user_id=request.data['user_id']
        post_id=request.data['post_id']
        
        user=api_models.User.objects.get(id=user_id)
        post=api_models.Post.objects.get(id=post_id)
        
        bookmark=api_models.Bookmark.objects.filter(post=post,user=user).first()
        
        if bookmark:
            bookmark.delete()
            return Response({'message':'Post Un-Bookmarked'},status=status.HTTP_200_OK)
        else:
            api_models.Bookmark.objects.create(
                user=user,
                post=post,
            )
            
            api_models.Notification.objects.create(
                user=post.user,
                post=post,
                type="Bookmark"
            )
            
            return Response({"message":"Post Bookmarked"},status=status.HTTP_201_CREATED)
        
class DashboardStats(generics.ListAPIView):
    serializer_class=api_serializer.AuthorSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        user_id=self.kwargs['user_id']
        user=api_models.User.objects.get(id=user_id)
        
        views=api_models.Post.objects.filter(user=user).aggregate(view=Sum("view"))['view']
        posts=api_models.Post.objects.filter(user=user).count()
        likes = api_models.Post.objects.filter(user=user).aggregate(total_likes=Sum("likes"))['total_likes']
        bookmarks=api_models.Bookmark.objects.filter(post__user=user).count()
        
        return[{
            "views":views,
            "posts":posts,
            "likes":likes,
            "bookmarks":bookmarks,
        }]
        
    def list(self,request,*args,**kwargs):
        queryset=self.get_queryset()
        serializer=self.get_serializer(queryset,many=True )
        return Response(serializer.data)
    
    
class DashboardPostLists(generics.ListAPIView):
    serializer_class=api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        user_id=self.kwargs['user_id']
        user=api_models.User.objects.get(id=user_id)
        return api_models.Post.objects.filter(user=user).order_by("-id")

class DashboardCommentLists(generics.ListAPIView):
    serializer_class=api_serializer.CommentSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        user_id=self.kwargs['user_id']
        user=api_models.User.objects.get(id=user_id)
        return api_models.Comment.objects.all()
    

class DashboardNotificationsList(generics.ListAPIView):
    serializer_class=api_serializer.NotificationSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        user_id=self.kwargs['user_id']
        user=api_models.User.objects.get(id=user_id)
        
        return api_models.Notification.objects.all(seen=False,user=user)
    
class  DashboardMarkNotificationAsSeen(APIView):
    def post(self,request):
        noti_id=request.data['noti_id']
        noti=api_models.Notification.objects.get(id=noti_id)
        
        noti.seen=True
        noti.save()
    
        return Response({'message':"Noti marked as Seen"},status=status.HTTP_200_OK)

class DashboardReplyCommentAPIView(APIView):
    
    def post(self,request):
        comment_id=request.data['commit_id']
        reply=request.data['reply']
        comment=api_models.Comment.objects.get(id=comment_id)
        comment.save()
        
        return Response({"message":"Comment response send"},status=status.HTTP_201_CREATED)

class DashboardPostCreatedAPIView(generics.CreateAPIView):
    serializer_class=api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def create(self,request,*args,**kwargs):
        print(request.data)
        
        user_id=request.data.get("user_id")
        title=request.data.get("title")
        image=request.data.get('image')
        description=request.data.get('description')
        tags=request.data.get("tags")
        category_id=request.data.get('category')
        post_status=request.data.get("post_status")
        
        user=api_models.User.objects.get(id=user_id)
        category=api_models.Category.objects.get(id=category_id)
        
        api_models.Post.objects.create(
            user=user,
            title=title,
            image=image,
            description=description,
            tags=tags,
            category=category,
            status=post_status
        )
        
        return Response({"message":"Post created successfully"},status=status.HTTP_201_CREATED)


class DashboardPostEditAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=api_serializer.PostSerializer
    permission_classes=[AllowAny]
    
    def get_objects(self):
        user_id=self.kwargs['user_id']
        post_id=self.kwargs['post_id']
        user=api_models.User.objects.get(id=user_id)
        
        return api_models.Post.objects.get(id=post_id,user=user)
    
    def update(self,request,*args,**kwargs):
        post_instance=self.get_object()
        title=request.data.get('title')
        image=request.data.get('image')
        description=request.data.get('description')
        tags=request.data.get("category")
        category_id=request.date.get('category')
        post_status=request.data.get("post_status")
        
        category=api_models.Category.objects.get(id=category_id)
        
        post_instance.title=title
        if image !="undefined":
            post_instance.image=image
        post_instance.description=description
        post_instance.tags=tags
        post_instance.category=category
        post_instance.status=post_status
        post_instance.save()
        
        return Response({"message":"Post updated successfully"},status=status.HTTP_200_OK)