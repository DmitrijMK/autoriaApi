import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AutoriaService } from './services/autoria.service';
import { HeaderComponent } from './component/header/header.component';
import { SearchComponent } from './component/search/search.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchoptionsComponent } from './component/searchoptions/searchoptions.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [HeaderComponent, SearchComponent, SearchoptionsComponent],
  providers: [AutoriaService],
  exports: [HeaderComponent, SearchComponent, SearchoptionsComponent]
})
export class SharedModule {
}
