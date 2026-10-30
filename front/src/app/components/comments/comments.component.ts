import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComment } from '../../models/models';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: false,
})
export class CommentsComponent implements OnInit {

  productId = 0;
  productName = '';
  comments: IComment[] = [];
  error = '';

  constructor(private route: ActivatedRoute, public provider: ProviderService) {}

  async ngOnInit(): Promise<void> {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    const last = this.provider.lastProduct;
    this.productName = last && last.id === this.productId ? last.name : '';
    try {
      this.comments = await this.provider.getComments(this.productId);
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    }
  }
}
