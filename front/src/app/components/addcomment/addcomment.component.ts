import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css'],
  standalone: false,
})
export class AddcommentComponent implements OnInit {

  productId = 0;
  content = '';
  rating: number | null = null;
  name = '';
  error = '';
  saving = false;

  constructor(private route: ActivatedRoute, private router: Router, private provider: ProviderService) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  close(): void {
    this.router.navigate(['/products', this.productId, 'comments']);
  }

  async addComment(): Promise<void> {
    this.error = '';
    this.saving = true;
    try {
      await this.provider.createComment(this.productId, this.content, Number(this.rating), this.name);
      this.close();
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    } finally {
      this.saving = false;
    }
  }
}
