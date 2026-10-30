import { Component, Input } from '@angular/core';

import { IComment } from '../../models/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  standalone: false,
})
export class CommentComponent {

  @Input({ required: true }) comment!: IComment;

  get initial(): string {
    return (this.comment.name || '?').charAt(0).toUpperCase();
  }
}
