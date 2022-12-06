import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-page-pagination',
  templateUrl: './page-pagination.component.html',
  styleUrls: ['./page-pagination.component.css'],
})
export class PagePaginationComponent implements OnInit {
  @Input() length!: number;
  pageSize = 20;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  @Output() newItemEvent = new EventEmitter<number>();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.newItemEvent.emit(e.pageIndex + 1);
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.pageIndex = 0;
  }
}
