import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgModule } from "@angular/core";
import { ApiService } from "../api/api.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientTestingModule
  ],
  providers: [ApiService],
  declarations: [],
})
export class ApiTestingModule {}
