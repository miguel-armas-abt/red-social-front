import { Injectable } from '@angular/core';
import { Seguidor } from '../models/seguidor';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends CommonService<Seguidor>{

  protected baseEndpoint = 'http://localhost:3800/api/follows';

  constructor(http: HttpClient) {
    super(http);
   }
}
