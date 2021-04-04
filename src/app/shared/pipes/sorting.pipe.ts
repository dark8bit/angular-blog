import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';
import { SortType } from '../enums/sort-type.enum';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  transform(posts: Post[], value: SortType): Post[] {

    if (!posts) {
      return;
    }

    if (value === SortType.date) {
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return posts.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  }
}
