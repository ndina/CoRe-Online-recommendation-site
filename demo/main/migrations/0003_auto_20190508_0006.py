# Generated by Django 2.2.1 on 2019-05-08 00:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='main.Category'),
        ),
    ]
