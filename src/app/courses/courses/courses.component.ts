import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/component/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  courses$: Observable <Course[]>;//SEMPRE DAR PREFERENCIA AO ANGULAR OBSERVABLE
  displayedColumns = ['_id', 'name', 'category', 'actions'];

  //CoursesService: CoursesService;

  constructor(private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    // this.courses = [];
    //this.CoursesService = new CoursesService();
    this.courses$ = this.CoursesService
    .list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os cursos =(');
        console.log(error);
        return of([]);
      }
    ));
    //this.coursesService.list().subscribe(courses => this.courses = courses);// | async
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  ngOnInit(): void {}

  onAdd() {
    //console.log('Clicou em adicionar');
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
