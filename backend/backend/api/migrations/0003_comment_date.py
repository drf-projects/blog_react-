# Generated by Django 5.2.3 on 2025-07-10 16:05

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_category_options_post_tag_alter_post_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
