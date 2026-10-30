import json
from pathlib import Path

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.dateparse import parse_datetime

from main.models import Category, Comment, Product

FIXTURE = Path(__file__).resolve().parents[2] / "fixtures" / "demo_data.json"


class Command(BaseCommand):
    help = "Create a demo user and load the sample categories, products and reviews."

    def add_arguments(self, parser):
        parser.add_argument("--username", default="demo")
        parser.add_argument("--password", default="demo-password-123")

    @transaction.atomic
    def handle(self, *args, **opts):
        user, created = User.objects.get_or_create(username=opts["username"])
        if created:
            user.set_password(opts["password"])
            user.save()

        data = json.loads(FIXTURE.read_text(encoding="utf-8"))
        for obj in data:
            f = obj["fields"]
            if obj["model"] == "main.category":
                Category.objects.update_or_create(id=obj["pk"], defaults={
                    "name": f["name"], "description": f["description"],
                    "created_at": parse_datetime(f["created_at"]), "created_by": user,
                })
            elif obj["model"] == "main.product":
                Product.objects.update_or_create(id=obj["pk"], defaults={
                    "name": f["name"], "description": f["description"], "image": f["image"],
                    "created_at": parse_datetime(f["created_at"]) if f["created_at"] else None,
                    "product_list_id": f["product_list"],
                })
            elif obj["model"] == "main.comment":
                Comment.objects.update_or_create(id=obj["pk"], defaults={
                    "name": f["name"], "content": f["content"], "rating": f["rating"],
                    "product_id": f["product"], "created_by": user,
                })

        msg = f"Loaded {len(data)} objects."
        if created:
            msg += f" Demo login: {opts['username']} / {opts['password']}"
        self.stdout.write(self.style.SUCCESS(msg))
