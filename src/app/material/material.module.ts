import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule}from'@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {A11yModule} from '@angular/cdk/a11y';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
   imports: [
    MatListModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatNativeDateModule,
    MatButtonModule,MatFormFieldModule,MatInputModule,MatCardModule,MatDatepickerModule,MatProgressBarModule,
    MatSnackBarModule,MatAutocompleteModule,A11yModule,MatMenuModule,MatDividerModule,MatSelectModule,MatProgressSpinnerModule
  ],
  exports:[
    MatListModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatCardModule,MatDatepickerModule
,MatProgressBarModule,MatSnackBarModule,MatAutocompleteModule,A11yModule,MatMenuModule,MatDividerModule,MatSelectModule,MatProgressSpinnerModule  ]
})
export class MaterialModule { }
